import { supabaseAdmin } from './supabase';
import {
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
  type ChatMessage,
} from "@shared/schema";
import { IStorage } from "./storage";

export class SupabaseStorage implements IStorage {
  // Conversation Management
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .insert({
        session_id: insertConversation.sessionId,
        user_country: insertConversation.userCountry,
        user_profession: insertConversation.userProfession,
        user_family: insertConversation.userFamily,
        user_income: insertConversation.userIncome,
        user_timeline: insertConversation.userTimeline,
        messages: insertConversation.messages || [],
        eligibility_score: insertConversation.eligibilityScore,
        recommended_visa: insertConversation.recommendedVisa,
        completed: insertConversation.completed || false,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseConversation(data);
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined; // Not found
      throw error;
    }
    return this.mapSupabaseConversation(data);
  }

  async updateConversation(sessionId: string, updates: Partial<InsertConversation>): Promise<Conversation | undefined> {
    const updateData: any = {};
    if (updates.userCountry !== undefined) updateData.user_country = updates.userCountry;
    if (updates.userProfession !== undefined) updateData.user_profession = updates.userProfession;
    if (updates.userFamily !== undefined) updateData.user_family = updates.userFamily;
    if (updates.userIncome !== undefined) updateData.user_income = updates.userIncome;
    if (updates.userTimeline !== undefined) updateData.user_timeline = updates.userTimeline;
    if (updates.messages !== undefined) updateData.messages = updates.messages;
    if (updates.eligibilityScore !== undefined) updateData.eligibility_score = updates.eligibilityScore;
    if (updates.recommendedVisa !== undefined) updateData.recommended_visa = updates.recommendedVisa;
    if (updates.completed !== undefined) updateData.completed = updates.completed;

    const { data, error } = await supabaseAdmin
      .from('conversations')
      .update(updateData)
      .eq('session_id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseConversation(data);
  }

  async addMessageToConversation(sessionId: string, message: ChatMessage): Promise<void> {
    const conversation = await this.getConversation(sessionId);
    if (!conversation) throw new Error('Conversation not found');

    const updatedMessages = [...conversation.messages, message];
    await this.updateConversation(sessionId, { messages: updatedMessages });
  }

  // Email Capture Management
  async createEmailCapture(insertEmailCapture: InsertEmailCapture): Promise<EmailCapture> {
    const { data, error } = await supabaseAdmin
      .from('email_captures')
      .insert({
        email: insertEmailCapture.email,
        source: insertEmailCapture.source,
        user_country: insertEmailCapture.userCountry,
        user_profession: insertEmailCapture.userProfession,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseEmailCapture(data);
  }

  async getAllEmailCaptures(): Promise<EmailCapture[]> {
    const { data, error } = await supabaseAdmin
      .from('email_captures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseEmailCapture);
  }

  // User Profile Management
  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        session_id: insertProfile.sessionId,
        nationality: insertProfile.nationality,
        age: insertProfile.age,
        profession: insertProfile.profession,
        experience: insertProfile.experience,
        income: insertProfile.income,
        family_status: insertProfile.familyStatus,
        education: insertProfile.education,
        language_skills: insertProfile.languageSkills,
        assets: insertProfile.assets,
        has_job_offer: insertProfile.hasJobOffer,
        criminal_record: insertProfile.criminalRecord,
        health_status: insertProfile.healthStatus,
        email: insertProfile.email,
        is_saved: insertProfile.isSaved || false,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseUserProfile(data);
  }

  async getUserProfile(sessionId: string): Promise<UserProfile | undefined> {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabaseUserProfile(data);
  }

  async getUserProfileByEmail(email: string): Promise<UserProfile | undefined> {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .eq('is_saved', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabaseUserProfile(data);
  }

  async updateUserProfile(sessionId: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const updateData: any = {};
    if (updates.nationality !== undefined) updateData.nationality = updates.nationality;
    if (updates.age !== undefined) updateData.age = updates.age;
    if (updates.profession !== undefined) updateData.profession = updates.profession;
    if (updates.experience !== undefined) updateData.experience = updates.experience;
    if (updates.income !== undefined) updateData.income = updates.income;
    if (updates.familyStatus !== undefined) updateData.family_status = updates.familyStatus;
    if (updates.education !== undefined) updateData.education = updates.education;
    if (updates.languageSkills !== undefined) updateData.language_skills = updates.languageSkills;
    if (updates.assets !== undefined) updateData.assets = updates.assets;
    if (updates.hasJobOffer !== undefined) updateData.has_job_offer = updates.hasJobOffer;
    if (updates.criminalRecord !== undefined) updateData.criminal_record = updates.criminalRecord;
    if (updates.healthStatus !== undefined) updateData.health_status = updates.healthStatus;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.isSaved !== undefined) updateData.is_saved = updates.isSaved;

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .update(updateData)
      .eq('session_id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseUserProfile(data);
  }

  async saveUserProfile(sessionId: string, email: string): Promise<UserProfile | undefined> {
    return this.updateUserProfile(sessionId, { email, isSaved: true });
  }

  async getSavedProfiles(email: string): Promise<UserProfile[]> {
    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .eq('is_saved', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseUserProfile);
  }

  // Visa Status Alerts
  async createVisaAlert(insertAlert: InsertVisaStatusAlert): Promise<VisaStatusAlert> {
    const { data, error } = await supabaseAdmin
      .from('visa_status_alerts')
      .insert({
        profile_id: insertAlert.profileId,
        alert_type: insertAlert.alertType,
        message: insertAlert.message,
        is_read: insertAlert.isRead || false,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseVisaAlert(data);
  }

  async getUserAlerts(profileId: number): Promise<VisaStatusAlert[]> {
    const { data, error } = await supabaseAdmin
      .from('visa_status_alerts')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseVisaAlert);
  }

  async markAlertAsRead(alertId: number): Promise<void> {
    const { error } = await supabaseAdmin
      .from('visa_status_alerts')
      .update({ is_read: true })
      .eq('id', alertId);

    if (error) throw error;
  }

  async getUnreadAlertsCount(profileId: number): Promise<number> {
    const { count, error } = await supabaseAdmin
      .from('visa_status_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', profileId)
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  }

  // Consultation Bookings
  async createConsultationBooking(insertBooking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const { data, error } = await supabaseAdmin
      .from('consultation_bookings')
      .insert({
        profile_id: insertBooking.profileId,
        consultation_type: insertBooking.consultationType,
        preferred_date: insertBooking.preferredDate,
        time_slot: insertBooking.timeSlot,
        timezone: insertBooking.timezone,
        customer_name: insertBooking.customerName,
        customer_email: insertBooking.customerEmail,
        customer_phone: insertBooking.customerPhone,
        specific_questions: insertBooking.specificQuestions,
        status: insertBooking.status || 'pending',
        meeting_link: insertBooking.meetingLink,
        price: insertBooking.price,
        payment_status: insertBooking.paymentStatus || 'pending',
        stripe_payment_intent_id: insertBooking.stripePaymentIntentId,
        admin_notes: insertBooking.adminNotes,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseConsultationBooking(data);
  }

  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    const { data, error } = await supabaseAdmin
      .from('consultation_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseConsultationBooking);
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    const { data, error } = await supabaseAdmin
      .from('consultation_bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabaseConsultationBooking(data);
  }

  async updateConsultationBooking(id: number, updates: Partial<InsertConsultationBooking>): Promise<ConsultationBooking | undefined> {
    const updateData: any = {};
    if (updates.consultationType !== undefined) updateData.consultation_type = updates.consultationType;
    if (updates.preferredDate !== undefined) updateData.preferred_date = updates.preferredDate;
    if (updates.timeSlot !== undefined) updateData.time_slot = updates.timeSlot;
    if (updates.timezone !== undefined) updateData.timezone = updates.timezone;
    if (updates.customerName !== undefined) updateData.customer_name = updates.customerName;
    if (updates.customerEmail !== undefined) updateData.customer_email = updates.customerEmail;
    if (updates.customerPhone !== undefined) updateData.customer_phone = updates.customerPhone;
    if (updates.specificQuestions !== undefined) updateData.specific_questions = updates.specificQuestions;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.meetingLink !== undefined) updateData.meeting_link = updates.meetingLink;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.paymentStatus !== undefined) updateData.payment_status = updates.paymentStatus;
    if (updates.stripePaymentIntentId !== undefined) updateData.stripe_payment_intent_id = updates.stripePaymentIntentId;
    if (updates.adminNotes !== undefined) updateData.admin_notes = updates.adminNotes;

    const { data, error } = await supabaseAdmin
      .from('consultation_bookings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseConsultationBooking(data);
  }

  async getBookingsByProfile(profileId: number): Promise<ConsultationBooking[]> {
    const { data, error } = await supabaseAdmin
      .from('consultation_bookings')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseConsultationBooking);
  }

  // Admin Management
  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .insert({
        email: insertAdmin.email,
        password_hash: insertAdmin.passwordHash,
        role: insertAdmin.role || 'admin',
        is_active: insertAdmin.isActive !== undefined ? insertAdmin.isActive : true,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabaseAdminUser(data);
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabaseAdminUser(data);
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapSupabaseAdminUser);
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    const { error } = await supabaseAdmin
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  }

  // PDF Purchase Management
  async createPdfPurchase(insertPurchase: InsertPdfPurchase): Promise<PdfPurchase> {
    const { data, error } = await supabaseAdmin
      .from('pdf_purchases')
      .insert({
        email: insertPurchase.email,
        paid: insertPurchase.paid || false,
        stripe_session_id: insertPurchase.stripeSessionId,
        download_count: insertPurchase.downloadCount || 0,
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabasePdfPurchase(data);
  }

  async getPdfPurchaseByEmail(email: string): Promise<PdfPurchase | undefined> {
    const { data, error } = await supabaseAdmin
      .from('pdf_purchases')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabasePdfPurchase(data);
  }

  async getPdfPurchaseBySessionId(sessionId: string): Promise<PdfPurchase | undefined> {
    const { data, error } = await supabaseAdmin
      .from('pdf_purchases')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw error;
    }
    return this.mapSupabasePdfPurchase(data);
  }

  async updatePdfPurchase(id: number, updates: Partial<InsertPdfPurchase>): Promise<PdfPurchase | undefined> {
    const updateData: any = {};
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.paid !== undefined) updateData.paid = updates.paid;
    if (updates.stripeSessionId !== undefined) updateData.stripe_session_id = updates.stripeSessionId;
    if (updates.downloadCount !== undefined) updateData.download_count = updates.downloadCount;

    const { data, error } = await supabaseAdmin
      .from('pdf_purchases')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return this.mapSupabasePdfPurchase(data);
  }

  async incrementDownloadCount(id: number): Promise<void> {
    const { error } = await supabaseAdmin
      .rpc('increment_download_count', { purchase_id: id });

    if (error) throw error;
  }

  // Mapping functions to convert Supabase snake_case to camelCase
  private mapSupabaseConversation(data: any): Conversation {
    return {
      id: data.id,
      sessionId: data.session_id,
      userCountry: data.user_country,
      userProfession: data.user_profession,
      userFamily: data.user_family,
      userIncome: data.user_income,
      userTimeline: data.user_timeline,
      messages: data.messages || [],
      eligibilityScore: data.eligibility_score,
      recommendedVisa: data.recommended_visa,
      completed: data.completed,
      createdAt: new Date(data.created_at),
    };
  }

  private mapSupabaseEmailCapture(data: any): EmailCapture {
    return {
      id: data.id,
      email: data.email,
      source: data.source,
      userCountry: data.user_country,
      userProfession: data.user_profession,
      createdAt: new Date(data.created_at),
    };
  }

  private mapSupabaseUserProfile(data: any): UserProfile {
    return {
      id: data.id,
      sessionId: data.session_id,
      nationality: data.nationality,
      age: data.age,
      profession: data.profession,
      experience: data.experience,
      income: data.income,
      familyStatus: data.family_status,
      education: data.education,
      languageSkills: data.language_skills || [],
      assets: data.assets,
      hasJobOffer: data.has_job_offer,
      criminalRecord: data.criminal_record,
      healthStatus: data.health_status,
      email: data.email,
      isSaved: data.is_saved,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  private mapSupabaseVisaAlert(data: any): VisaStatusAlert {
    return {
      id: data.id,
      profileId: data.profile_id,
      alertType: data.alert_type,
      message: data.message,
      isRead: data.is_read,
      createdAt: new Date(data.created_at),
    };
  }

  private mapSupabaseConsultationBooking(data: any): ConsultationBooking {
    return {
      id: data.id,
      profileId: data.profile_id,
      consultationType: data.consultation_type,
      preferredDate: new Date(data.preferred_date),
      timeSlot: data.time_slot,
      timezone: data.timezone,
      customerName: data.customer_name,
      customerEmail: data.customer_email,
      customerPhone: data.customer_phone,
      specificQuestions: data.specific_questions,
      status: data.status,
      meetingLink: data.meeting_link,
      price: data.price,
      paymentStatus: data.payment_status,
      stripePaymentIntentId: data.stripe_payment_intent_id,
      adminNotes: data.admin_notes,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  private mapSupabaseAdminUser(data: any): AdminUser {
    return {
      id: data.id,
      email: data.email,
      passwordHash: data.password_hash,
      role: data.role,
      isActive: data.is_active,
      lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  private mapSupabasePdfPurchase(data: any): PdfPurchase {
    return {
      id: data.id,
      email: data.email,
      paid: data.paid,
      stripeSessionId: data.stripe_session_id,
      downloadCount: data.download_count,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}

export const supabaseStorage = new SupabaseStorage();