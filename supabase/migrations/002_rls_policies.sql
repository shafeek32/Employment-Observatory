-- 002_rls_policies.sql
-- Row Level Security (RLS) policies for India Employment Intelligence Platform

ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE degree_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_streams ENABLE ROW LEVEL SECURITY;

-- 1. Reference Lookup Tables: Public Read-Only Access
CREATE POLICY "Public read-only for geo_states" 
ON geo_states FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Public read-only for education_qualifications" 
ON education_qualifications FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Public read-only for degree_types" 
ON degree_types FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Public read-only for academic_streams" 
ON academic_streams FOR SELECT 
TO anon, authenticated 
USING (true);

-- 2. Raw Survey Submissions Table: Anonymous INSERT-Only
-- Public anonymous visitors can ONLY submit survey records.
-- Direct SELECT on raw records is strictly prohibited to the public anon role.
CREATE POLICY "Allow public anonymous survey submission insert" 
ON survey_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated service-role to perform all operations (used by backend)
CREATE POLICY "Service role full access" 
ON survey_submissions 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
