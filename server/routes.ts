import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { supabaseAdmin } from "./supabase";
import path from "path";
import fs from "fs";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});
import { insertConversationSchema, insertEmailCaptureSchema, type ChatMessage, type AssessmentResponse, type VisaEligibilityResult } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";
import { relocationData, getCountriesByContinent, getRelocationInfo } from "@shared/relocationData";
import { EligibilityScorer, type UserProfile } from "@shared/eligibilityScoring";
import { buildSystemPrompt, buildPersonalizedPrompt } from "@shared/buildSystemPrompt";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Create or get conversation
  app.post("/api/conversation", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      let conversation = await storage.getConversation(sessionId);
      
      if (!conversation) {
        const newConversation = {
          sessionId,
          messages: [],
          completed: false,
        };
        
        conversation = await storage.createConversation(newConversation);
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error creating/getting conversation:", error);
      res.status(500).json({ error: "Failed to create or get conversation" });
    }
  });

  // Send message and get AI response
  app.post("/api/conversation/:sessionId/message", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { message, userInfo } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const conversation = await storage.getConversation(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: Date.now(),
      };

      await storage.addMessageToConversation(sessionId, userMessage);

      // Update user info if provided
      if (userInfo) {
        await storage.updateConversation(sessionId, userInfo);
      }

      // Get AI response
      const aiResponse = await generateAIResponse(message, conversation, userInfo);

      // Add AI message
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: Date.now() + 1,
      };

      await storage.addMessageToConversation(sessionId, aiMessage);

      // Update conversation with recommendations if provided
      if (aiResponse.recommendations) {
        await storage.updateConversation(sessionId, {
          recommendedVisa: aiResponse.recommendations.visa,
          eligibilityScore: aiResponse.recommendations.eligibility,
        });
      }

      res.json({
        message: aiMessage,
        recommendations: aiResponse.recommendations,
        followUpQuestions: aiResponse.followUpQuestions,
      });

    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Get conversation
  app.get("/api/conversation/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const conversation = await storage.getConversation(sessionId);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error getting conversation:", error);
      res.status(500).json({ error: "Failed to get conversation" });
    }
  });

  // Get relocation info by country
  app.get("/api/relocate-info/:countrySlug", async (req, res) => {
    try {
      const { countrySlug } = req.params;
      
      // Import relocation data
      const { getRelocationInfo } = await import("@shared/relocationData");
      const countryInfo = getRelocationInfo(countrySlug);
      
      if (!countryInfo) {
        return res.status(404).json({ error: "Country information not found" });
      }
      
      res.json(countryInfo);
    } catch (error) {
      console.error("Error fetching relocation info:", error);
      res.status(500).json({ error: "Failed to fetch relocation information" });
    }
  });

  // Get all visa types
  app.get("/api/visa-types", async (req, res) => {
    try {
      const visaTypes = await storage.getAllVisaTypes();
      res.json(visaTypes);
    } catch (error) {
      console.error("Error fetching visa types:", error);
      res.status(500).json({ error: "Failed to fetch visa types" });
    }
  });

  // Get specific visa type by slug
  app.get("/api/visa-types/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const visaType = await storage.getVisaTypeBySlug(slug);
      
      if (!visaType) {
        return res.status(404).json({ error: "Visa type not found" });
      }
      
      res.json(visaType);
    } catch (error) {
      console.error("Error fetching visa type:", error);
      res.status(500).json({ error: "Failed to fetch visa type" });
    }
  });

  // Get countries by continent
  app.get("/api/countries/:continent", async (req, res) => {
    try {
      const { continent } = req.params;
      
      // Import relocation data
      const { getCountriesByContinent } = await import("@shared/relocationData");
      const countries = getCountriesByContinent(decodeURIComponent(continent));
      
      res.json({ countries });
    } catch (error) {
      console.error("Error fetching countries:", error);
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  });

  // Capture email
  app.post("/api/email-capture", async (req, res) => {
    try {
      const emailData = insertEmailCaptureSchema.parse(req.body);
      const emailCapture = await storage.createEmailCapture(emailData);
      res.json(emailCapture);
    } catch (error) {
      console.error("Error capturing email:", error);
      res.status(500).json({ error: "Failed to capture email" });
    }
  });

  // Get all captured emails
  app.get("/api/email-captures", async (req, res) => {
    try {
      const emails = await storage.getAllEmailCaptures();
      res.json(emails);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ error: "Failed to fetch emails" });
    }
  });

  // Export emails as CSV
  app.get("/api/email-captures/export", async (req, res) => {
    try {
      const emails = await storage.getAllEmailCaptures();
      
      // Create CSV content
      const csvHeader = "Email,Date Captured,Has Conversation,Conversation ID\n";
      const csvRows = emails.map(email => {
        const date = new Date(email.createdAt).toISOString().split('T')[0];
        const hasConversation = email.conversationId ? "Yes" : "No";
        const conversationId = email.conversationId || "";
        return `${email.email},${date},${hasConversation},${conversationId}`;
      }).join("\n");
      
      const csvContent = csvHeader + csvRows;
      
      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="smartrelocate-emails-${new Date().toISOString().split('T')[0]}.csv"`);
      
      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting emails:", error);
      res.status(500).json({ error: "Failed to export emails" });
    }
  });

  // Calculate visa eligibility scores
  app.post("/api/visa-eligibility", async (req, res) => {
    try {
      const { userProfile, visaTypes } = req.body;

      if (!userProfile) {
        return res.status(400).json({ error: "User profile is required" });
      }

      // Use simplified smart recommendations with authentic Malaysian visa data
      const smartRecommendationsResult = EligibilityScorer.getSmartVisaRecommendations(userProfile);
      
      const results = smartRecommendationsResult.recommendations;
      
      res.json({ results });
    } catch (error) {
      console.error("Error calculating visa eligibility:", error);
      res.status(500).json({ error: "Failed to calculate visa eligibility" });
    }
  });

  // Get best visa recommendations for a user profile
  app.post("/api/visa-recommendations", async (req, res) => {
    try {
      const userProfile: UserProfile = req.body;
      const { availableVisas } = req.body;

      if (!userProfile || !availableVisas || !Array.isArray(availableVisas)) {
        return res.status(400).json({ error: "User profile and available visas are required" });
      }

      const recommendations = EligibilityScorer.getSmartVisaRecommendations(userProfile);
      
      res.json({ recommendations });
    } catch (error) {
      console.error("Error getting visa recommendations:", error);
      res.status(500).json({ error: "Failed to get visa recommendations" });
    }
  });

  // User Profile Management Routes
  app.post("/api/profile", async (req, res) => {
    try {
      const profile = await storage.createUserProfile(req.body);
      res.json(profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Failed to create profile" });
    }
  });

  app.get("/api/profile/:sessionId", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(req.params.sessionId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put("/api/profile/:sessionId", async (req, res) => {
    try {
      const profile = await storage.updateUserProfile(req.params.sessionId, req.body);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.post("/api/profile/:sessionId/save", async (req, res) => {
    try {
      const { email, profileData } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // Check if profile exists, if not create it
      let profile = await storage.getUserProfile(req.params.sessionId);
      if (!profile && profileData) {
        // Create profile first with the provided data
        profile = await storage.createUserProfile({
          sessionId: req.params.sessionId,
          email,
          name: profileData.name || `${profileData.profession || 'Professional'}`,
          ...profileData,
          isSaved: true
        });
      } else if (profile) {
        // Update existing profile to save it
        profile = await storage.saveUserProfile(req.params.sessionId, email);
      }
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found and no data provided to create one" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  app.get("/api/profiles/:email", async (req, res) => {
    try {
      const profiles = await storage.getSavedProfiles(req.params.email);
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching saved profiles:", error);
      res.status(500).json({ message: "Failed to fetch saved profiles" });
    }
  });

  // Consultation Booking Routes
  app.post("/api/consultations", async (req, res) => {
    try {
      const bookingData = req.body;
      
      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: bookingData.price, // Amount in cents
        currency: "usd",
        metadata: {
          consultationType: bookingData.consultationType,
          customerEmail: bookingData.customerEmail,
          customerName: bookingData.customerName
        }
      });

      // Create booking with payment intent ID
      const booking = await storage.createConsultationBooking({
        ...bookingData,
        stripePaymentIntentId: paymentIntent.id,
        status: "pending",
        paymentStatus: "pending"
      });

      res.json({ 
        booking, 
        clientSecret: paymentIntent.client_secret 
      });
    } catch (error) {
      console.error("Error creating consultation booking:", error);
      res.status(500).json({ message: "Failed to create consultation booking" });
    }
  });

  app.get("/api/consultations", async (req, res) => {
    try {
      const bookings = await storage.getConsultationBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching consultation bookings:", error);
      res.status(500).json({ message: "Failed to fetch consultation bookings" });
    }
  });

  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const booking = await storage.getConsultationBooking(parseInt(req.params.id));
      if (!booking) {
        return res.status(404).json({ message: "Consultation booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error fetching consultation booking:", error);
      res.status(500).json({ message: "Failed to fetch consultation booking" });
    }
  });

  app.patch("/api/consultations/:id", async (req, res) => {
    try {
      const updates = req.body;
      const booking = await storage.updateConsultationBooking(parseInt(req.params.id), updates);
      if (!booking) {
        return res.status(404).json({ message: "Consultation booking not found" });
      }
      res.json(booking);
    } catch (error) {
      console.error("Error updating consultation booking:", error);
      res.status(500).json({ message: "Failed to update consultation booking" });
    }
  });

  app.get("/api/profiles/:profileId/consultations", async (req, res) => {
    try {
      const bookings = await storage.getBookingsByProfile(parseInt(req.params.profileId));
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching profile consultations:", error);
      res.status(500).json({ message: "Failed to fetch profile consultations" });
    }
  });

  // Supabase configuration endpoint for client
  app.get("/api/supabase-config", (req, res) => {
    res.json({
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY
    });
  });

  // PDF Purchase - Record simulated purchase
  app.post("/api/pdf-purchases", async (req, res) => {
    try {
      const { email, sessionId, paymentStatus, amount, currency, paymentMethod } = req.body;
      
      const purchase = await storage.createPdfPurchase({
        email,
        sessionId,
        paymentStatus,
        amount,
        currency,
        paymentMethod: paymentMethod || "simulated",
        downloadCount: 0
      });
      
      res.json(purchase);
    } catch (error) {
      console.error("Error recording PDF purchase:", error);
      res.status(500).json({ message: "Failed to record purchase" });
    }
  });

  // PDF Purchase - Create Stripe Checkout Session
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      // Generate a unique session ID for tracking
      const sessionId = `pdf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Save the email lead first
      const purchase = await storage.createPdfPurchase({ 
        email,
        sessionId,
        paymentStatus: "pending"
      });

      try {
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [{
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Malaysia Relocation Guide - Complete PDF Checklist",
                description: "Comprehensive visa requirements, costs, and step-by-step relocation process"
              },
              unit_amount: 1900, // $19.00 in cents
            },
            quantity: 1,
          }],
          success_url: `${req.protocol}://${req.get('host')}/pdf-guide/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.protocol}://${req.get('host')}/pdf-guide`,
          customer_email: email,
          metadata: { 
            email, 
            purchaseId: purchase.id.toString(),
            sessionId
          }
        });

        // Update the purchase with session ID
        await storage.updatePdfPurchase(purchase.id, {
          stripeSessionId: session.id
        });

        res.json({ url: session.url });
      } catch (stripeError) {
        console.error("Stripe error (account under review):", stripeError);
        
        // For testing while Stripe account is under review, create a test session
        const testSessionId = `test_session_${Date.now()}_${purchase.id}`;
        await storage.updatePdfPurchase(purchase.id, {
          stripeSessionId: testSessionId,
          paymentStatus: "completed" // Mark as paid for testing
        });

        // Redirect directly to success page for testing
        const testSuccessUrl = `${req.protocol}://${req.get('host')}/success?session_id=${testSessionId}`;
        res.json({ url: testSuccessUrl });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // PDF Download endpoint
  app.get("/api/download-pdf/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      
      // Verify the purchase exists and is paid
      const purchase = await storage.getPdfPurchaseBySessionId(sessionId);
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (purchase.paymentStatus !== "completed") {
        return res.status(403).json({ message: "Payment not completed" });
      }

      // Increment download count
      await storage.updatePdfPurchase(purchase.id, {
        downloadCount: (purchase.downloadCount || 0) + 1
      });

      // For now, return a JSON response indicating successful verification
      // In a real implementation, this would serve the actual PDF file
      res.json({
        message: "PDF download authorized",
        filename: "malaysia-relocation-guide.pdf",
        email: purchase.email,
        downloadCount: (purchase.downloadCount || 0) + 1
      });
    } catch (error) {
      console.error("Error processing PDF download:", error);
      res.status(500).json({ message: "Failed to process download" });
    }
  });

  // PDF Download Success Page (legacy endpoint)
  app.get("/success", async (req, res) => {
    try {
      const sessionId = req.query.session_id as string;
      
      if (!sessionId) {
        return res.status(400).send("Missing session ID");
      }

      let email: string;
      let purchase;

      // Handle test sessions (while Stripe account is under review)
      if (sessionId.startsWith('test_session_')) {
        purchase = await storage.getPdfPurchaseBySessionId(sessionId);
        if (!purchase) {
          return res.status(404).send("Purchase not found");
        }
        email = purchase.email;
      } else {
        // Handle real Stripe sessions
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);

          if (session.payment_status !== "paid") {
            return res.status(403).send("Payment not confirmed");
          }

          email = session.metadata?.email || session.customer_email || "";
          if (!email) {
            return res.status(400).send("Missing email in session metadata");
          }

          // Mark purchase as completed
          purchase = await storage.getPdfPurchaseBySessionId(sessionId);
          if (purchase) {
            await storage.updatePdfPurchase(purchase.id, { paymentStatus: "completed" });
          }
        } catch (stripeError) {
          console.error("Error retrieving Stripe session:", stripeError);
          return res.status(400).send("Invalid session");
        }
      }

      // Increment download count
      if (purchase) {
        await storage.incrementDownloadCount(purchase.id);
      }

      // Generate PDF content (simplified for now)
      const pdfContent = `
Malaysia Relocation Guide - Complete Checklist

VISA COMPARISON CHART
====================

1. DE RANTAU NOMAD PASS
- Processing Time: 15-30 days
- Cost: $200-500
- Income Requirement: $24,000/year
- Duration: 12 months (renewable)

2. MM2H (MY SECOND HOME)
- Processing Time: 3-6 months  
- Cost: $2,000-5,000
- Income Requirement: $10,000/month
- Duration: 10 years (renewable)

3. EMPLOYMENT PASS
- Processing Time: 7-14 days
- Cost: $50-200
- Income Requirement: $2,500/month
- Duration: Up to 5 years

COST BREAKDOWN BY VISA TYPE
===========================

De Rantau Pass:
- Application Fee: $200
- Medical Check: $100
- Document Processing: $50-200
- Total Initial Cost: $350-500

MM2H Program:
- Application Fee: $500
- Government Levy: $500/year
- Medical Insurance: $500-1,500/year
- Fixed Deposit: $100,000-350,000
- Total Initial Cost: $2,000-5,000

Employment Pass:
- Application Fee: $50
- Medical Exam: $100
- Visa Fee: $50
- Total Initial Cost: $200

STEP-BY-STEP APPLICATION PROCESS
===============================

Phase 1: Document Preparation
1. Passport (6+ months validity)
2. Educational certificates
3. Employment letter/contract
4. Bank statements (3-6 months)
5. Medical report
6. Criminal background check
7. Passport photos

Phase 2: Application Submission
1. Online application via official portal
2. Document upload and verification
3. Application fee payment
4. Biometric appointment (if required)

Phase 3: Processing & Approval
1. Review period (7-90 days depending on visa)
2. Additional document requests (if any)
3. Approval notification
4. Visa collection/delivery

LIVING COSTS BY MAJOR CITIES
============================

Kuala Lumpur:
- Rent (1BR): $300-800/month
- Food: $200-400/month
- Transportation: $30-80/month
- Utilities: $30-60/month
- Total Monthly: $560-1,340

Penang:
- Rent (1BR): $200-500/month
- Food: $150-300/month
- Transportation: $20-50/month
- Utilities: $25-50/month
- Total Monthly: $395-900

Johor Bahru:
- Rent (1BR): $180-400/month
- Food: $120-250/month
- Transportation: $20-40/month
- Utilities: $20-40/month
- Total Monthly: $340-730

ESSENTIAL CONTACTS
==================

Immigration Department: +603-8880 1000
Malaysia Digital Hub: digital@mdec.my
MM2H Official Portal: mm2h.gov.my
Healthcare: 999 (Emergency)

This guide was generated for: ${email}
Download Date: ${new Date().toISOString().split('T')[0]}
Purchase ID: ${purchase?.id || 'N/A'}

For latest updates and personalized guidance, visit SmartRelocate.ai
      `;

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", "attachment; filename=malaysia-relocation-guide.txt");
      res.send(Buffer.from(pdfContent, "utf-8"));
    } catch (error) {
      console.error("Error processing download:", error);
      res.status(500).send("Error processing download");
    }
  });

  // Free PDF Download endpoint
  app.get("/api/download-free-pdf", async (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "public", "pdfs", "free-malaysia-relocation-guide.pdf");
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Free PDF not available yet" });
      }

      // Set appropriate headers for PDF download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=free-malaysia-relocation-guide.pdf");
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
    } catch (error) {
      console.error("Error downloading free PDF:", error);
      res.status(500).json({ message: "Failed to download free PDF" });
    }
  });

  // Stripe webhook for payment confirmations
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const event = req.body;

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        
        // Find booking by payment intent ID and update status
        const bookings = await storage.getConsultationBookings();
        const booking = bookings.find(b => b.stripePaymentIntentId === paymentIntent.id);
        
        if (booking) {
          await storage.updateConsultationBooking(booking.id, {
            paymentStatus: 'paid',
            status: 'confirmed'
          });
        }
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const email = session.metadata?.email;
        
        if (email) {
          const purchase = await storage.getPdfPurchaseBySessionId(session.id);
          if (purchase) {
            await storage.updatePdfPurchase(purchase.id, { paymentStatus: "completed" });
          }
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Stripe webhook error:", error);
      res.status(400).json({ message: "Webhook error" });
    }
  });

  // Admin API Routes for Real-Time Dashboard
  app.get("/api/admin/pdf-purchases", async (req, res) => {
    try {
      // Get all PDF purchases for dashboard
      const { data, error } = await supabaseAdmin
        .from('pdf_purchases')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(data || []);
    } catch (error) {
      console.error("Error fetching PDF purchases:", error);
      res.json([]); // Return empty array for dashboard
    }
  });

  app.get("/api/admin/alerts", async (req, res) => {
    try {
      // Get all alerts for dashboard
      const { data, error } = await supabaseAdmin
        .from('visa_status_alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(data || []);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.json([]); // Return empty array for dashboard
    }
  });

  // Admin Management Routes
  app.post("/api/admin/users", async (req, res) => {
    try {
      const adminData = req.body;
      const admin = await storage.createAdminUser(adminData);
      res.json(admin);
    } catch (error) {
      console.error("Error creating admin user:", error);
      res.status(500).json({ message: "Failed to create admin user" });
    }
  });

  app.get("/api/admin/users", async (req, res) => {
    try {
      const admins = await storage.getAllAdmins();
      res.json(admins);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      res.status(500).json({ message: "Failed to fetch admin users" });
    }
  });

  app.get("/api/admin/users/:email", async (req, res) => {
    try {
      const admin = await storage.getAdminByEmail(req.params.email);
      if (!admin) {
        return res.status(404).json({ message: "Admin user not found" });
      }
      res.json(admin);
    } catch (error) {
      console.error("Error fetching admin user:", error);
      res.status(500).json({ message: "Failed to fetch admin user" });
    }
  });

  // Visa Status Alerts Routes
  app.post("/api/alerts", async (req, res) => {
    try {
      const alert = await storage.createVisaAlert(req.body);
      res.json(alert);
    } catch (error) {
      console.error("Error creating alert:", error);
      res.status(500).json({ message: "Failed to create alert" });
    }
  });

  app.get("/api/alerts/:profileId", async (req, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const alerts = await storage.getUserAlerts(profileId);
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.put("/api/alerts/:alertId/read", async (req, res) => {
    try {
      const alertId = parseInt(req.params.alertId);
      await storage.markAlertAsRead(alertId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  app.get("/api/alerts/:profileId/unread-count", async (req, res) => {
    try {
      const profileId = parseInt(req.params.profileId);
      const count = await storage.getUnreadAlertsCount(profileId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread alerts count:", error);
      res.status(500).json({ message: "Failed to fetch unread alerts count" });
    }
  });

  // Admin authentication routes
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"; // Use environment variable in production
  const adminSessions = new Set<string>(); // Simple in-memory session store

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a simple token (in production, use JWT or similar)
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      adminSessions.add(token);

      res.json({ 
        token,
        message: "Login successful" 
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/verify", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.substring(7);
      
      if (!adminSessions.has(token)) {
        return res.status(401).json({ message: "Invalid token" });
      }

      res.json({ message: "Token valid" });
    } catch (error) {
      console.error("Admin verify error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        adminSessions.delete(token);
      }

      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Admin logout error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function generateAIResponse(
  message: string, 
  conversation: any, 
  userInfo?: any
): Promise<AssessmentResponse> {
  try {
    // Determine user language from conversation or default to English
    const userLanguage = conversation.language || 'English';
    
    // Build dynamic system prompt based on context
    let systemPrompt: string;
    
    if (userInfo?.recommendedVisa && userInfo?.userProfile) {
      // Use personalized prompt for users with assessment results
      systemPrompt = buildPersonalizedPrompt({
        userProfile: userInfo.userProfile,
        recommendedVisa: userInfo.recommendedVisa,
        userLanguage
      });
    } else if (userInfo?.visaSlug) {
      // Use visa-specific prompt for targeted guidance
      systemPrompt = buildSystemPrompt({
        visaSlug: userInfo.visaSlug,
        userLanguage
      });
    } else {
      // Use general Malaysia relocation prompt
      systemPrompt = buildSystemPrompt({
        visaSlug: '',
        userLanguage
      });
    }
    
    // Add conversation context and response format instructions
    const contextualPrompt = `${systemPrompt}

CONVERSATION CONTEXT:
- User Country: ${userInfo?.userCountry || conversation.userCountry || 'Not specified'}
- Profession: ${userInfo?.userProfession || conversation.userProfession || 'Not specified'} 
- Family Status: ${userInfo?.userFamily || conversation.userFamily || 'Not specified'}
- Income: ${userInfo?.userIncome || conversation.userIncome || 'Not specified'}
- Timeline: ${userInfo?.userTimeline || conversation.userTimeline || 'Not specified'}

Previous conversation: ${conversation.messages?.slice(-3).map((m: any) => `${m.role}: ${m.content}`).join('\n') || 'None'}

RESPONSE FORMAT: Respond in JSON format with this structure:
{"message": "your response", "recommendations": {"visa": "visa name", "eligibility": number, "reasons": ["reason1"], "nextSteps": ["step1"]}, "followUpQuestions": ["question1", "question2"]}

Provide authentic, actionable guidance based on official Malaysian visa data.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: contextualPrompt },
        { role: "user", content: message }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      message: result.message || "I'd be happy to help you with your relocation to Malaysia. Could you tell me more about your situation?",
      recommendations: result.recommendations,
      followUpQuestions: result.followUpQuestions,
    };

  } catch (error) {
    console.error("Error generating AI response:", error);
    
    // Check if it's a quota/billing issue
    if (error instanceof Error && error.message.includes('quota')) {
      return {
        message: "The AI service is currently unavailable due to API quota limits. Please contact support or try again later with a valid API key.",
        error: "quota_exceeded"
      };
    }
    
    // Check if it's an authentication issue
    if (error instanceof Error && error.message.includes('401')) {
      return {
        message: "The AI service authentication failed. Please check the API configuration.",
        error: "auth_failed"
      };
    }
    
    return {
      message: "The AI service is currently unavailable. Please try again later or contact support.",
      error: "service_unavailable"
    };
  }
}
