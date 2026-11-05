-- ==============================================================================
-- SEED SAMPLE SUBMISSIONS FOR SUPABASE
-- ==============================================================================
-- Run this script in Supabase SQL Editor if you want to populate your
-- survey_submissions table with realistic demo survey entries.
-- ==============================================================================

-- 1. Insert realistic sample submissions
INSERT INTO survey_submissions (
    status,
    age,
    state_id,
    qualification_id,
    degree_id,
    stream_id,
    additional_attributes,
    deletion_key,
    ip_hash
)
SELECT
    CASE WHEN random() > 0.38 THEN 'EMPLOYED' ELSE 'UNEMPLOYED' END AS status,
    (20 + floor(random() * 12))::int AS age, -- Ages 20 to 32
    (ARRAY[
        'IN-KA', 'IN-MH', 'IN-TN', 'IN-UP', 'IN-KL', 'IN-DL', 'IN-TG', 'IN-BR', 'IN-WB', 'IN-GJ'
    ])[floor(random() * 10 + 1)] AS state_id,
    'DEGREE' AS qualification_id,
    'DEG_BTECH' AS degree_id,
    (ARRAY[
        'ENG_CSE', 'ENG_ECE', 'ENG_MECH', 'ENG_IT', 'ENG_CIVIL', 'ENG_EEE'
    ])[floor(random() * 6 + 1)] AS stream_id,
    '{"sample": true}'::jsonb AS additional_attributes,
    substring(md5(random()::text) from 1 for 16) AS deletion_key,
    md5(random()::text) AS ip_hash
FROM generate_series(1, 250);

-- 2. Insert some non-engineering degree submissions
INSERT INTO survey_submissions (
    status,
    age,
    state_id,
    qualification_id,
    degree_id,
    stream_id,
    additional_attributes,
    deletion_key,
    ip_hash
)
SELECT
    CASE WHEN random() > 0.45 THEN 'EMPLOYED' ELSE 'UNEMPLOYED' END AS status,
    (19 + floor(random() * 10))::int AS age,
    (ARRAY[
        'IN-KL', 'IN-KA', 'IN-TN', 'IN-MH', 'IN-DL'
    ])[floor(random() * 5 + 1)] AS state_id,
    (ARRAY['POSTGRADUATE', 'DEGREE', 'DIPLOMA', 'PLUS_TWO'])[floor(random() * 4 + 1)] AS qualification_id,
    NULL AS degree_id,
    NULL AS stream_id,
    '{"sample": true}'::jsonb AS additional_attributes,
    substring(md5(random()::text) from 1 for 16) AS deletion_key,
    md5(random()::text) AS ip_hash
FROM generate_series(1, 50);

-- 3. Refresh materialized views so dashboard reflects the newly seeded rows
SELECT refresh_employment_aggregates();
