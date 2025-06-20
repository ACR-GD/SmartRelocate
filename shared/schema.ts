import { pgTable, text, serial, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userCountry: text("user_country"),
  userProfession: text("user_profession"),
  userFamily: text("user_family"),
  userIncome: text("user_income"),
  userTimeline: text("user_timeline"),
  messages: jsonb("messages").notNull().default([]),
  eligibilityScore: integer("eligibility_score"),
  recommendedVisa: text("recommended_visa"),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const emailCaptures = pgTable("email_captures", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  conversationId: integer("conversation_id").references(() => conversations.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  email: text("email"),
  name: text("name"),
  nationality: text("nationality"),
  age: integer("age"),
  profession: text("profession"),
  experience: integer("experience"),
  income: integer("income"),
  familyStatus: text("family_status"),
  education: text("education"),
  languageSkills: text("language_skills").array(),
  assets: integer("assets"),
  hasJobOffer: boolean("has_job_offer"),
  criminalRecord: boolean("criminal_record"),
  healthStatus: text("health_status"),
  targetCountry: text("target_country"),
  recommendedVisa: text("recommended_visa"),
  eligibilityScore: integer("eligibility_score"),
  profileData: jsonb("profile_data"),
  isSaved: boolean("is_saved").default(false),
  notificationsEnabled: boolean("notifications_enabled").default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const visaStatusAlerts = pgTable("visa_status_alerts", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => userProfiles.id).notNull(),
  visaType: text("visa_type").notNull(),
  alertType: text("alert_type").notNull(), // 'deadline', 'requirement_change', 'status_update'
  title: text("title").notNull(),
  message: text("message").notNull(),
  actionRequired: boolean("action_required").default(false),
  dueDate: timestamp("due_date"),
  isRead: boolean("is_read").default(false),
  priority: text("priority").default('medium'), // 'high', 'medium', 'low'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultationBookings = pgTable("consultation_bookings", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => userProfiles.id).notNull(),
  consultationType: text("consultation_type").notNull(), // 'basic', 'premium', 'expert'
  preferredDate: timestamp("preferred_date").notNull(),
  timeSlot: text("time_slot").notNull(), // '09:00-10:00', '14:00-15:00', etc.
  timezone: text("timezone").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  specificQuestions: text("specific_questions"),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'completed', 'cancelled'
  meetingLink: text("meeting_link"),
  price: integer("price").notNull(), // in cents
  paymentStatus: text("payment_status").notNull().default("pending"), // 'pending', 'paid', 'refunded'
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"), // 'admin', 'super_admin'
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// PDF Purchase Leads
export const pdfPurchases = pgTable("pdf_purchases", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  sessionId: text("session_id").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"), // 'pending', 'completed', 'failed', 'refunded'
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull().default("19.00"),
  currency: text("currency").notNull().default("USD"),
  paymentMethod: text("payment_method").notNull().default("stripe"), // 'stripe', 'simulated', 'paypal', etc.
  stripeSessionId: text("stripe_session_id"),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const visaTypes = pgTable("visa_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  duration: text("duration").notNull(),
  eligibility: text("eligibility").notNull(),
  minimumIncome: text("minimum_income"),
  applicationFee: text("application_fee"),
  description: text("description"),
  requirements: text("requirements").array(),
  benefits: text("benefits").array(),
  applicationProcess: text("application_process").array(),
  requiredDocuments: text("required_documents").array(),
  processingTime: text("processing_time"),
  renewability: text("renewability"),
  familyInclusion: boolean("family_inclusion").default(false),
  workRights: boolean("work_rights").default(false),
  isPremium: boolean("is_premium").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertEmailCaptureSchema = createInsertSchema(emailCaptures).omit({
  id: true,
  createdAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVisaStatusAlertSchema = createInsertSchema(visaStatusAlerts).omit({
  id: true,
  createdAt: true,
});

export const insertConsultationBookingSchema = createInsertSchema(consultationBookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

export const insertPdfPurchaseSchema = createInsertSchema(pdfPurchases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVisaTypeSchema = createInsertSchema(visaTypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type EmailCapture = typeof emailCaptures.$inferSelect;
export type InsertEmailCapture = z.infer<typeof insertEmailCaptureSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type VisaStatusAlert = typeof visaStatusAlerts.$inferSelect;
export type InsertVisaStatusAlert = z.infer<typeof insertVisaStatusAlertSchema>;
export type ConsultationBooking = typeof consultationBookings.$inferSelect;
export type InsertConsultationBooking = z.infer<typeof insertConsultationBookingSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type PdfPurchase = typeof pdfPurchases.$inferSelect;
export type InsertPdfPurchase = z.infer<typeof insertPdfPurchaseSchema>;
export type VisaType = typeof visaTypes.$inferSelect;
export type InsertVisaType = z.infer<typeof insertVisaTypeSchema>;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface AssessmentResponse {
  message: string;
  recommendations?: {
    visa: string;
    eligibility: number;
    reasons: string[];
    nextSteps: string[];
  };
  followUpQuestions?: string[];
  error?: string;
}

export interface VisaEligibilityResult {
  visa: string;
  score: number;
  suitability: 'excellent' | 'good' | 'fair' | 'poor';
  breakdown: { [criterion: string]: { score: number; maxScore: number; reason: string } };
  recommendations: string[];
  primaryReasons: string[];
}
