-- ==============================================================================
-- INDIA EMPLOYMENT PUBLIC VOICE — COMPLETE SUPABASE SETUP SCRIPT
-- ==============================================================================
-- Run this entire script in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. REFERENCE LOOKUP TABLES
CREATE TABLE IF NOT EXISTS geo_states (
    id VARCHAR(10) PRIMARY KEY, -- ISO 3166-2:IN code (e.g., 'IN-KA', 'IN-MH', 'IN-KL')
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('STATE', 'UT', 'OTHER')),
    census_code VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS education_qualifications (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    tier_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS degree_types (
    id VARCHAR(50) PRIMARY KEY,
    qualification_id VARCHAR(50) REFERENCES education_qualifications(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS academic_streams (
    id VARCHAR(50) PRIMARY KEY,
    degree_type_id VARCHAR(50) REFERENCES degree_types(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_engineering BOOLEAN DEFAULT FALSE
);

-- 3. CORE SURVEY SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS survey_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('EMPLOYED', 'UNEMPLOYED')),
    
    -- Q1: Full Name (Strictly Optional, Never publicly displayed)
    respondent_name VARCHAR(150),
    
    -- Q2: Exact Age (Integer 14 <= age <= 100)
    age INT NOT NULL CHECK (age >= 14 AND age <= 100),
    
    -- Q3: State / Location
    state_id VARCHAR(10) NOT NULL REFERENCES geo_states(id),
    
    -- Q4: Highest Educational Qualification
    qualification_id VARCHAR(50) NOT NULL REFERENCES education_qualifications(id),
    
    -- Q5: Degree & Stream
    degree_id VARCHAR(50) REFERENCES degree_types(id),
    stream_id VARCHAR(50) REFERENCES academic_streams(id),
    custom_qualification_detail VARCHAR(255),
    
    -- Q6: Additional Metadata (Structured JSONB)
    additional_attributes JSONB DEFAULT '{}'::jsonb,
    
    -- Privacy & Security Attributes
    deletion_key VARCHAR(32) NOT NULL,
    ip_hash VARCHAR(64) NOT NULL,
    client_fingerprint VARCHAR(64)
);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_survey_status ON survey_submissions(status);
CREATE INDEX IF NOT EXISTS idx_survey_state ON survey_submissions(state_id);
CREATE INDEX IF NOT EXISTS idx_survey_qualification ON survey_submissions(qualification_id);
CREATE INDEX IF NOT EXISTS idx_survey_degree ON survey_submissions(degree_id);
CREATE INDEX IF NOT EXISTS idx_survey_stream ON survey_submissions(stream_id);
CREATE INDEX IF NOT EXISTS idx_survey_age ON survey_submissions(age);
CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_composite_agg ON survey_submissions(status, state_id, qualification_id);
CREATE INDEX IF NOT EXISTS idx_survey_deletion ON survey_submissions(deletion_key);

-- 5. CANONICAL REFERENCE SEED DATA
INSERT INTO geo_states (id, name, type) VALUES
('IN-AN', 'Andaman and Nicobar Islands', 'UT'),
('IN-AP', 'Andhra Pradesh', 'STATE'),
('IN-AR', 'Arunachal Pradesh', 'STATE'),
('IN-AS', 'Assam', 'STATE'),
('IN-BR', 'Bihar', 'STATE'),
('IN-CH', 'Chandigarh', 'UT'),
('IN-CT', 'Chhattisgarh', 'STATE'),
('IN-DH', 'Dadra and Nagar Haveli and Daman and Diu', 'UT'),
('IN-DL', 'Delhi (NCT)', 'UT'),
('IN-GA', 'Goa', 'STATE'),
('IN-GJ', 'Gujarat', 'STATE'),
('IN-HR', 'Haryana', 'STATE'),
('IN-HP', 'Himachal Pradesh', 'STATE'),
('IN-JK', 'Jammu and Kashmir', 'UT'),
('IN-JH', 'Jharkhand', 'STATE'),
('IN-KA', 'Karnataka', 'STATE'),
('IN-KL', 'Kerala', 'STATE'),
('IN-LA', 'Ladakh', 'UT'),
('IN-LD', 'Lakshadweep', 'UT'),
('IN-MP', 'Madhya Pradesh', 'STATE'),
('IN-MH', 'Maharashtra', 'STATE'),
('IN-MN', 'Manipur', 'STATE'),
('IN-ML', 'Meghalaya', 'STATE'),
('IN-MZ', 'Mizoram', 'STATE'),
('IN-NL', 'Nagaland', 'STATE'),
('IN-OR', 'Odisha', 'STATE'),
('IN-PY', 'Puducherry', 'UT'),
('IN-PB', 'Punjab', 'STATE'),
('IN-RJ', 'Rajasthan', 'STATE'),
('IN-SK', 'Sikkim', 'STATE'),
('IN-TN', 'Tamil Nadu', 'STATE'),
('IN-TG', 'Telangana', 'STATE'),
('IN-TR', 'Tripura', 'STATE'),
('IN-UP', 'Uttar Pradesh', 'STATE'),
('IN-UT', 'Uttarakhand', 'STATE'),
('IN-WB', 'West Bengal', 'STATE'),
('IN-REMOTE', 'Working Remotely / Outside India', 'OTHER')
ON CONFLICT (id) DO NOTHING;

INSERT INTO education_qualifications (id, name, tier_order) VALUES
('POSTGRADUATE', 'Postgraduate & Above (Masters, Ph.D., Postdoc)', 1),
('DEGREE', 'Degree (Undergraduate / Bachelor''s)', 2),
('DIPLOMA', 'Diploma (Polytechnic / Vocational)', 3),
('PLUS_TWO', 'Plus Two (+2 / Higher Secondary / 12th Standard)', 4),
('SSLC', 'SSLC (10th Standard / Matriculation)', 5),
('BELOW_SSLC', 'Below SSLC', 6),
('OTHER', 'Other Qualification', 7)
ON CONFLICT (id) DO NOTHING;

INSERT INTO degree_types (id, qualification_id, name) VALUES
('DEG_BTECH', 'DEGREE', 'B.Tech / B.E. (Bachelor of Technology / Engineering)'),
('DEG_BSC', 'DEGREE', 'B.Sc. (Bachelor of Science)'),
('DEG_BCOM', 'DEGREE', 'B.Com. (Bachelor of Commerce)'),
('DEG_BA', 'DEGREE', 'B.A. (Bachelor of Arts)'),
('DEG_BCA', 'DEGREE', 'BCA (Bachelor of Computer Applications)'),
('DEG_BBA', 'DEGREE', 'BBA / BMS (Business Administration)'),
('DEG_OTHER', 'DEGREE', 'Other Degree Program')
ON CONFLICT (id) DO NOTHING;

INSERT INTO academic_streams (id, degree_type_id, name, is_engineering) VALUES
('ENG_CSE', 'DEG_BTECH', 'Computer Science & Engineering (CSE)', TRUE),
('ENG_IT', 'DEG_BTECH', 'Information Technology (IT)', TRUE),
('ENG_ECE', 'DEG_BTECH', 'Electronics & Communication Engineering (ECE)', TRUE),
('ENG_EEE', 'DEG_BTECH', 'Electrical & Electronics Engineering (EEE)', TRUE),
('ENG_MECH', 'DEG_BTECH', 'Mechanical Engineering', TRUE),
('ENG_CIVIL', 'DEG_BTECH', 'Civil Engineering', TRUE),
('ENG_OTHER', 'DEG_BTECH', 'Other Engineering Disciplines', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE degree_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_streams ENABLE ROW LEVEL SECURITY;

-- Public read-only for lookup tables
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only for geo_states') THEN
        CREATE POLICY "Public read-only for geo_states" ON geo_states FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only for education_qualifications') THEN
        CREATE POLICY "Public read-only for education_qualifications" ON education_qualifications FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only for degree_types') THEN
        CREATE POLICY "Public read-only for degree_types" ON degree_types FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read-only for academic_streams') THEN
        CREATE POLICY "Public read-only for academic_streams" ON academic_streams FOR SELECT TO anon, authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public anonymous survey submission insert') THEN
        CREATE POLICY "Allow public anonymous survey submission insert" ON survey_submissions FOR INSERT TO anon WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Service role full access') THEN
        CREATE POLICY "Service role full access" ON survey_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);
    END IF;
END $$;

-- 7. MATERIALIZED VIEWS FOR LIGHTNING-FAST AGGREGATION
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_dashboard_overview AS
SELECT
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE status = 'EMPLOYED') AS total_employed,
    COUNT(*) FILTER (WHERE status = 'UNEMPLOYED') AS total_unemployed,
    ROUND((COUNT(*) FILTER (WHERE status = 'EMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1) AS employed_percentage,
    ROUND((COUNT(*) FILTER (WHERE status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1) AS unemployed_percentage,
    ROUND(AVG(age) FILTER (WHERE status = 'UNEMPLOYED')::numeric, 1) AS median_unemployed_age,
    NOW() AS last_refreshed_at
FROM survey_submissions;

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_state_employment_aggregates AS
SELECT 
    s.state_id,
    g.name AS state_name,
    g.type AS state_type,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND((COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1) AS sample_unemployed_ratio,
    ROUND(AVG(s.age)::numeric, 1) AS average_age
FROM survey_submissions s
JOIN geo_states g ON s.state_id = g.id
GROUP BY s.state_id, g.name, g.type;

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_engineering_stream_aggregates AS
SELECT 
    str.id AS stream_id,
    str.name AS stream_name,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND((COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1) AS sample_unemployed_ratio
FROM survey_submissions s
JOIN academic_streams str ON s.stream_id = str.id
WHERE str.is_engineering = TRUE
GROUP BY str.id, str.name;

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_age_distribution_aggregates AS
SELECT 
    age,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE status = 'UNEMPLOYED') AS unemployed_count
FROM survey_submissions
GROUP BY age
ORDER BY age ASC;

CREATE MATERIALIZED VIEW IF NOT EXISTS mv_qualification_aggregates AS
SELECT 
    eq.id AS qualification_id,
    eq.name AS qualification_name,
    eq.tier_order,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND((COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1) AS sample_unemployed_ratio
FROM survey_submissions s
JOIN education_qualifications eq ON s.qualification_id = eq.id
GROUP BY eq.id, eq.name, eq.tier_order
ORDER BY eq.tier_order ASC;

-- 8. VIEW REFRESH FUNCTION
CREATE OR REPLACE FUNCTION refresh_employment_aggregates()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW mv_dashboard_overview;
    REFRESH MATERIALIZED VIEW mv_state_employment_aggregates;
    REFRESH MATERIALIZED VIEW mv_engineering_stream_aggregates;
    REFRESH MATERIALIZED VIEW mv_age_distribution_aggregates;
    REFRESH MATERIALIZED VIEW mv_qualification_aggregates;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. SCHEMA PERMISSIONS & GRANTS
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON survey_submissions TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;
GRANT EXECUTE ON FUNCTION refresh_employment_aggregates() TO service_role;

