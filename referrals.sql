-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referrer_email TEXT NOT NULL,
  referrer_name TEXT NOT NULL,
  lead_name TEXT NOT NULL,
  lead_business TEXT,
  lead_email TEXT,
  lead_phone TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'closed_won', 'closed_lost', 'paid'
  commission_earned NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional depending on how you want to handle it, but for a simple setup without auth context, we disable or set public)
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- If you want anyone to insert (e.g. from the public form) and anyone to view (if you are just filtering by email in the dashboard):
CREATE POLICY "Allow public insert" ON referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON referrals FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON referrals FOR UPDATE USING (true);
