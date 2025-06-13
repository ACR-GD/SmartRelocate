import { 
  conversations, 
  emailCaptures, 
  userProfiles, 
  visaStatusAlerts,
  consultationBookings,
  adminUsers,
  pdfPurchases,
  type Conversation, 
  type InsertConversation, 
  type EmailCapture, 
  type InsertEmailCapture, 
  type UserProfile,
  type InsertUserProfile,
  type VisaStatusAlert,
  type InsertVisaStatusAlert,
  type ConsultationBooking,
  type InsertConsultationBooking,
  type AdminUser,
  type InsertAdminUser,
  type PdfPurchase,
  type InsertPdfPurchase,
  type ChatMessage 
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(sessionId: string): Promise<Conversation | undefined>;
  updateConversation(sessionId: string, updates: Partial<InsertConversation>): Promise<Conversation | undefined>;
  addMessageToConversation(sessionId: string, message: ChatMessage): Promise<void>;
  createEmailCapture(emailCapture: InsertEmailCapture): Promise<EmailCapture>;
  getAllEmailCaptures(): Promise<EmailCapture[]>;
  
  // User Profile Management
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getUserProfile(sessionId: string): Promise<UserProfile | undefined>;
  getUserProfileByEmail(email: string): Promise<UserProfile | undefined>;
  updateUserProfile(sessionId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;
  saveUserProfile(sessionId: string, email: string): Promise<UserProfile | undefined>;
  getSavedProfiles(email: string): Promise<UserProfile[]>;
  
  // Visa Status Alerts
  createVisaAlert(alert: InsertVisaStatusAlert): Promise<VisaStatusAlert>;
  getUserAlerts(profileId: number): Promise<VisaStatusAlert[]>;
  markAlertAsRead(alertId: number): Promise<void>;
  getUnreadAlertsCount(profileId: number): Promise<number>;
  
  // Consultation Bookings
  createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking>;
  getConsultationBookings(): Promise<ConsultationBooking[]>;
  getConsultationBooking(id: number): Promise<ConsultationBooking | undefined>;
  updateConsultationBooking(id: number, updates: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined>;
  getBookingsByProfile(profileId: number): Promise<ConsultationBooking[]>;
  
  // Admin Management
  createAdminUser(admin: InsertAdminUser): Promise<AdminUser>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  getAllAdmins(): Promise<AdminUser[]>;
  updateAdminLastLogin(id: number): Promise<void>;
  
  // PDF Purchase Management
  createPdfPurchase(purchase: InsertPdfPurchase): Promise<PdfPurchase>;
  getPdfPurchaseByEmail(email: string): Promise<PdfPurchase | undefined>;
  getPdfPurchaseBySessionId(sessionId: string): Promise<PdfPurchase | undefined>;
  updatePdfPurchase(id: number, updates: Partial<InsertPdfPurchase>): Promise<PdfPurchase | undefined>;
  incrementDownloadCount(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conversation] = await db
      .insert(conversations)
      .values({
        sessionId: insertConversation.sessionId,
        userCountry: insertConversation.userCountry || null,
        userProfession: insertConversation.userProfession || null,
        userFamily: insertConversation.userFamily || null,
        userIncome: insertConversation.userIncome || null,
        userTimeline: insertConversation.userTimeline || null,
        messages: insertConversation.messages || [],
        eligibilityScore: insertConversation.eligibilityScore || null,
        recommendedVisa: insertConversation.recommendedVisa || null,
        completed: insertConversation.completed || false,
      })
      .returning();
    return conversation;
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.sessionId, sessionId));
    return conversation || undefined;
  }

  async updateConversation(sessionId: string, updates: Partial<InsertConversation>): Promise<Conversation | undefined> {
    // Filter out undefined values to avoid "No values to set" error
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    if (Object.keys(filteredUpdates).length === 0) {
      // If no valid updates, return existing conversation
      return this.getConversation(sessionId);
    }

    const [updated] = await db
      .update(conversations)
      .set(filteredUpdates)
      .where(eq(conversations.sessionId, sessionId))
      .returning();
    return updated || undefined;
  }

  async addMessageToConversation(sessionId: string, message: ChatMessage): Promise<void> {
    const existing = await this.getConversation(sessionId);
    if (!existing) return;

    const messages = Array.isArray(existing.messages) ? existing.messages : [];
    const updatedMessages = [...messages, message];
    
    await db
      .update(conversations)
      .set({ messages: updatedMessages })
      .where(eq(conversations.sessionId, sessionId));
  }

  async createEmailCapture(insertEmailCapture: InsertEmailCapture): Promise<EmailCapture> {
    const [emailCapture] = await db
      .insert(emailCaptures)
      .values({
        email: insertEmailCapture.email,
        conversationId: insertEmailCapture.conversationId || null,
      })
      .returning();
    return emailCapture;
  }

  async getAllEmailCaptures(): Promise<EmailCapture[]> {
    const emails = await db.select().from(emailCaptures).orderBy(emailCaptures.createdAt);
    return emails;
  }

  // User Profile Management
  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const [profile] = await db
      .insert(userProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  async getUserProfile(sessionId: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.sessionId, sessionId));
    return profile;
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.email, email));
    return profile;
  }

  async updateUserProfile(sessionId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const [profile] = await db
      .update(userProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(userProfiles.sessionId, sessionId))
      .returning();
    return profile;
  }

  async saveUserProfile(sessionId: string, email: string): Promise<UserProfile | undefined> {
    const [profile] = await db
      .update(userProfiles)
      .set({ email, isSaved: true, updatedAt: new Date() })
      .where(eq(userProfiles.sessionId, sessionId))
      .returning();
    return profile;
  }

  async getSavedProfiles(email: string): Promise<UserProfile[]> {
    const profiles = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.email, email))
      .orderBy(userProfiles.updatedAt);
    return profiles;
  }



  // Visa Status Alerts
  async createVisaAlert(insertAlert: InsertVisaStatusAlert): Promise<VisaStatusAlert> {
    const [alert] = await db
      .insert(visaStatusAlerts)
      .values(insertAlert)
      .returning();
    return alert;
  }

  async getUserAlerts(profileId: number): Promise<VisaStatusAlert[]> {
    const alerts = await db
      .select()
      .from(visaStatusAlerts)
      .where(eq(visaStatusAlerts.profileId, profileId))
      .orderBy(visaStatusAlerts.createdAt);
    return alerts;
  }

  async markAlertAsRead(alertId: number): Promise<void> {
    await db
      .update(visaStatusAlerts)
      .set({ isRead: true })
      .where(eq(visaStatusAlerts.id, alertId));
  }

  async getUnreadAlertsCount(profileId: number): Promise<number> {
    const result = await db
      .select({ count: visaStatusAlerts.id })
      .from(visaStatusAlerts)
      .where(eq(visaStatusAlerts.profileId, profileId));
    return result.length;
  }

  // Consultation Bookings
  async createConsultationBooking(insertBooking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const bookingData = {
      ...insertBooking,
      preferredDate: new Date(insertBooking.preferredDate),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const [booking] = await db
      .insert(consultationBookings)
      .values(bookingData)
      .returning();
    return booking;
  }

  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return await db
      .select()
      .from(consultationBookings)
      .orderBy(consultationBookings.createdAt);
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    const [booking] = await db
      .select()
      .from(consultationBookings)
      .where(eq(consultationBookings.id, id));
    return booking;
  }

  async updateConsultationBooking(id: number, updates: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined> {
    const [booking] = await db
      .update(consultationBookings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(consultationBookings.id, id))
      .returning();
    return booking;
  }

  async getBookingsByProfile(profileId: number): Promise<ConsultationBooking[]> {
    return await db
      .select()
      .from(consultationBookings)
      .where(eq(consultationBookings.profileId, profileId))
      .orderBy(consultationBookings.createdAt);
  }

  // Admin Management
  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const [admin] = await db
      .insert(adminUsers)
      .values(insertAdmin)
      .returning();
    return admin;
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email));
    return admin;
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    return await db
      .select()
      .from(adminUsers)
      .orderBy(adminUsers.createdAt);
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, id));
  }

  // PDF Purchase Management
  async createPdfPurchase(insertPurchase: InsertPdfPurchase): Promise<PdfPurchase> {
    const [purchase] = await db
      .insert(pdfPurchases)
      .values(insertPurchase)
      .returning();
    return purchase;
  }

  async getPdfPurchaseByEmail(email: string): Promise<PdfPurchase | undefined> {
    const [purchase] = await db
      .select()
      .from(pdfPurchases)
      .where(eq(pdfPurchases.email, email));
    return purchase;
  }

  async getPdfPurchaseBySessionId(sessionId: string): Promise<PdfPurchase | undefined> {
    const [purchase] = await db
      .select()
      .from(pdfPurchases)
      .where(eq(pdfPurchases.stripeSessionId, sessionId));
    return purchase;
  }

  async updatePdfPurchase(id: number, updates: Partial<InsertPdfPurchase>): Promise<PdfPurchase | undefined> {
    const [purchase] = await db
      .update(pdfPurchases)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(pdfPurchases.id, id))
      .returning();
    return purchase;
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const current = await db
      .select({ downloadCount: pdfPurchases.downloadCount })
      .from(pdfPurchases)
      .where(eq(pdfPurchases.id, id));
    
    if (current.length > 0 && current[0]) {
      await db
        .update(pdfPurchases)
        .set({ 
          downloadCount: (current[0].downloadCount || 0) + 1,
          updatedAt: new Date()
        })
        .where(eq(pdfPurchases.id, id));
    }
  }
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;
  private emailCaptures: Map<number, EmailCapture>;
  private userProfiles: Map<string, UserProfile>;
  private visaAlerts: Map<number, VisaStatusAlert>;
  private consultationBookings: Map<number, ConsultationBooking>;
  private adminUsers: Map<number, AdminUser>;
  private currentConversationId: number;
  private currentEmailId: number;
  private currentProfileId: number;
  private currentAlertId: number;
  private currentBookingId: number;
  private currentAdminId: number;

  constructor() {
    this.conversations = new Map();
    this.emailCaptures = new Map();
    this.userProfiles = new Map();
    this.visaAlerts = new Map();
    this.consultationBookings = new Map();
    this.adminUsers = new Map();
    this.currentConversationId = 1;
    this.currentEmailId = 1;
    this.currentProfileId = 1;
    this.currentAlertId = 1;
    this.currentBookingId = 1;
    this.currentAdminId = 1;
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.currentConversationId++;
    const conversation: Conversation = {
      id,
      sessionId: insertConversation.sessionId,
      userCountry: insertConversation.userCountry || null,
      userProfession: insertConversation.userProfession || null,
      userFamily: insertConversation.userFamily || null,
      userIncome: insertConversation.userIncome || null,
      userTimeline: insertConversation.userTimeline || null,
      messages: insertConversation.messages || [],
      eligibilityScore: insertConversation.eligibilityScore || null,
      recommendedVisa: insertConversation.recommendedVisa || null,
      completed: insertConversation.completed || false,
      createdAt: new Date(),
    };
    this.conversations.set(conversation.sessionId, conversation);
    return conversation;
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    return this.conversations.get(sessionId);
  }

  async updateConversation(sessionId: string, updates: Partial<InsertConversation>): Promise<Conversation | undefined> {
    const existing = this.conversations.get(sessionId);
    if (!existing) return undefined;

    const updated: Conversation = { ...existing, ...updates };
    this.conversations.set(sessionId, updated);
    return updated;
  }

  async addMessageToConversation(sessionId: string, message: ChatMessage): Promise<void> {
    const existing = this.conversations.get(sessionId);
    if (!existing) return;

    const messages = Array.isArray(existing.messages) ? existing.messages : [];
    const updatedMessages = [...messages, message];
    
    const updated: Conversation = { ...existing, messages: updatedMessages };
    this.conversations.set(sessionId, updated);
  }

  async createEmailCapture(insertEmailCapture: InsertEmailCapture): Promise<EmailCapture> {
    const id = this.currentEmailId++;
    const emailCapture: EmailCapture = {
      id,
      email: insertEmailCapture.email,
      conversationId: insertEmailCapture.conversationId || null,
      createdAt: new Date(),
    };
    this.emailCaptures.set(id, emailCapture);
    return emailCapture;
  }

  async getAllEmailCaptures(): Promise<EmailCapture[]> {
    return Array.from(this.emailCaptures.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // User Profile Management
  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = this.currentProfileId++;
    const profile: UserProfile = {
      id,
      sessionId: insertProfile.sessionId,
      email: insertProfile.email || null,
      name: insertProfile.name || null,
      nationality: insertProfile.nationality || null,
      age: insertProfile.age || null,
      profession: insertProfile.profession || null,
      experience: insertProfile.experience || null,
      income: insertProfile.income || null,
      familyStatus: insertProfile.familyStatus || null,
      education: insertProfile.education || null,
      languageSkills: insertProfile.languageSkills || null,
      assets: insertProfile.assets || null,
      hasJobOffer: insertProfile.hasJobOffer || null,
      criminalRecord: insertProfile.criminalRecord || null,
      healthStatus: insertProfile.healthStatus || null,
      targetCountry: insertProfile.targetCountry || null,
      recommendedVisa: insertProfile.recommendedVisa || null,
      eligibilityScore: insertProfile.eligibilityScore || null,
      profileData: insertProfile.profileData || null,
      isSaved: insertProfile.isSaved || false,
      notificationsEnabled: insertProfile.notificationsEnabled || true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.userProfiles.set(profile.sessionId, profile);
    return profile;
  }

  async getUserProfile(sessionId: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(sessionId);
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(p => p.email === email);
  }

  async updateUserProfile(sessionId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const existing = this.userProfiles.get(sessionId);
    if (!existing) return undefined;

    const updated: UserProfile = { ...existing, ...updates, updatedAt: new Date() };
    this.userProfiles.set(sessionId, updated);
    return updated;
  }

  async saveUserProfile(sessionId: string, email: string): Promise<UserProfile | undefined> {
    const existing = this.userProfiles.get(sessionId);
    if (!existing) return undefined;

    const updated: UserProfile = { ...existing, email, isSaved: true, updatedAt: new Date() };
    this.userProfiles.set(sessionId, updated);
    return updated;
  }

  async getSavedProfiles(email: string): Promise<UserProfile[]> {
    return Array.from(this.userProfiles.values())
      .filter(p => p.email === email && p.isSaved)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  // Visa Status Alerts
  async createVisaAlert(insertAlert: InsertVisaStatusAlert): Promise<VisaStatusAlert> {
    const id = this.currentAlertId++;
    const alert: VisaStatusAlert = {
      id,
      profileId: insertAlert.profileId,
      visaType: insertAlert.visaType,
      alertType: insertAlert.alertType,
      title: insertAlert.title,
      message: insertAlert.message,
      actionRequired: insertAlert.actionRequired || false,
      dueDate: insertAlert.dueDate || null,
      isRead: insertAlert.isRead || false,
      priority: insertAlert.priority || 'medium',
      createdAt: new Date(),
    };
    this.visaAlerts.set(id, alert);
    return alert;
  }

  async getUserAlerts(profileId: number): Promise<VisaStatusAlert[]> {
    return Array.from(this.visaAlerts.values())
      .filter(a => a.profileId === profileId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markAlertAsRead(alertId: number): Promise<void> {
    const alert = this.visaAlerts.get(alertId);
    if (alert) {
      this.visaAlerts.set(alertId, { ...alert, isRead: true });
    }
  }

  async getUnreadAlertsCount(profileId: number): Promise<number> {
    return Array.from(this.visaAlerts.values())
      .filter(a => a.profileId === profileId && !a.isRead).length;
  }

  // Consultation Bookings
  async createConsultationBooking(insertBooking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const id = this.currentBookingId++;
    const booking: ConsultationBooking = {
      id,
      ...insertBooking,
      status: insertBooking.status || "pending",
      paymentStatus: insertBooking.paymentStatus || "pending",
      customerPhone: insertBooking.customerPhone || null,
      specificQuestions: insertBooking.specificQuestions || null,
      meetingLink: insertBooking.meetingLink || null,
      stripePaymentIntentId: insertBooking.stripePaymentIntentId || null,
      adminNotes: insertBooking.adminNotes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.consultationBookings.set(id, booking);
    return booking;
  }

  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return Array.from(this.consultationBookings.values())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    return this.consultationBookings.get(id);
  }

  async updateConsultationBooking(id: number, updates: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined> {
    const existing = this.consultationBookings.get(id);
    if (!existing) return undefined;
    
    const updated: ConsultationBooking = { 
      ...existing, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.consultationBookings.set(id, updated);
    return updated;
  }

  async getBookingsByProfile(profileId: number): Promise<ConsultationBooking[]> {
    return Array.from(this.consultationBookings.values())
      .filter(b => b.profileId === profileId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Admin Management
  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
    const admin: AdminUser = {
      id,
      ...insertAdmin,
      role: insertAdmin.role || "admin",
      isActive: insertAdmin.isActive !== undefined ? insertAdmin.isActive : true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.adminUsers.set(id, admin);
    return admin;
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values())
      .find(admin => admin.email === email);
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values())
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    const admin = this.adminUsers.get(id);
    if (admin) {
      this.adminUsers.set(id, { ...admin, lastLoginAt: new Date() });
    }
  }
}

// Import Supabase storage
import { supabaseStorage } from "./supabase-storage";

// Use Supabase for enhanced data storage and real-time capabilities
export const storage = supabaseStorage;
