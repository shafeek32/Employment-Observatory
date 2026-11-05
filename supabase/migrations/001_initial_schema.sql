-- 001_initial_schema.sql
-- Master Schema for India Employment Intelligence Platform

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Reference Lookup Tables
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

-- 2. Core Survey Submissions Table
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
    -- For Unemployed: duration, seeking_domain, work_type
    -- For Employed: employment_category, industry_sector, compensation_band, experience_years, field_alignment, satisfaction_score
    additional_attributes JSONB DEFAULT '{}'::jsonb,
    
    -- Privacy & Security Attributes
    deletion_key VARCHAR(32) NOT NULL,
    ip_hash VARCHAR(64) NOT NULL,
    client_fingerprint VARCHAR(64)
);

-- 3. Optimization Indexes for High-Density Filtering and Aggregation
CREATE INDEX IF NOT EXISTS idx_survey_status ON survey_submissions(status);
CREATE INDEX IF NOT EXISTS idx_survey_state ON survey_submissions(state_id);
CREATE INDEX IF NOT EXISTS idx_survey_qualification ON survey_submissions(qualification_id);
CREATE INDEX IF NOT EXISTS idx_survey_degree ON survey_submissions(degree_id);
CREATE INDEX IF NOT EXISTS idx_survey_stream ON survey_submissions(stream_id);
CREATE INDEX IF NOT EXISTS idx_survey_age ON survey_submissions(age);
CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_composite_agg ON survey_submissions(status, state_id, qualification_id);
CREATE INDEX IF NOT EXISTS idx_survey_deletion ON survey_submissions(deletion_key);
