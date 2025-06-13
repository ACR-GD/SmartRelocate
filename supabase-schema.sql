-- Supabase Database Schema for SmartRelocate.ai
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  user_country TEXT,
  user_profession TEXT,
  user_family TEXT,
  user_income INTEGER,
  user_timeline TEXT,
  messages JSONB DEFAULT '[]'::jsonb,
  eligibility_score INTEGER,
  recommended_visa TEXT,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Email captures table
CREATE TABLE IF NOT EXISTS email_captures (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,
  user_country TEXT,
  user_profession TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  nationality TEXT NOT NULL,
  age INTEGER NOT NULL,
  profession TEXT NOT NULL,
  experience INTEGER NOT NULL,
  income INTEGER NOT NULL,
  family_status TEXT NOT NULL,
  education TEXT NOT NULL,
  language_skills TEXT[] DEFAULT '{}',
  assets INTEGER NOT NULL,
  has_job_offer BOOLEAN NOT NULL,
  criminal_record BOOLEAN NOT NULL,
  health_status TEXT NOT NULL,
  email TEXT,
  is_saved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Visa status alerts table
CREATE TABLE IF NOT EXISTS visa_status_alerts (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Consultation bookings table
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id SERIAL PRIMARY KEY,
  profile_id INTEGER NOT NULL,
  consultation_type TEXT NOT NULL,
  preferred_date TIMESTAMP WITH TIME ZONE NOT NULL,
  time_slot TEXT NOT NULL,
  timezone TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  specific_questions TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  meeting_link TEXT,
  price INTEGER NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PDF purchases table
CREATE TABLE IF NOT EXISTS pdf_purchases (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  paid BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_email_captures_email ON email_captures(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_session_id ON user_profiles(session_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_visa_alerts_profile_id ON visa_status_alerts(profile_id);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_profile_id ON consultation_bookings(profile_id);
CREATE INDEX IF NOT EXISTS idx_consultation_bookings_email ON consultation_bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_pdf_purchases_email ON pdf_purchases(email);
CREATE INDEX IF NOT EXISTS idx_pdf_purchases_session_id ON pdf_purchases(stripe_session_id);

-- Create function to increment download count atomically
CREATE OR REPLACE FUNCTION increment_download_count(purchase_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE pdf_purchases 
  SET download_count = download_count + 1,
      updated_at = timezone('utc'::text, now())
  WHERE id = purchase_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS) for better security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE visa_status_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (allows full access for server operations)
CREATE POLICY "Service role can manage conversations" ON conversations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage email captures" ON email_captures
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage user profiles" ON user_profiles
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage visa alerts" ON visa_status_alerts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage consultation bookings" ON consultation_bookings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage admin users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage pdf purchases" ON pdf_purchases
  FOR ALL USING (auth.role() = 'service_role');

-- Create triggers to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_bookings_updated_at 
  BEFORE UPDATE ON consultation_bookings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_purchases_updated_at 
  BEFORE UPDATE ON pdf_purchases 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();