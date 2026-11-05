-- seed_data.sql
-- Canonical Seed Data for India Employment Intelligence Platform

-- 1. States and Union Territories of India (ISO 3166-2:IN canonical references)
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

-- 2. Educational Qualifications Hierarchy
INSERT INTO education_qualifications (id, name, tier_order) VALUES
('POSTGRADUATE', 'Postgraduate & Above (Masters, Ph.D., Postdoc)', 1),
('DEGREE', 'Degree (Undergraduate / Bachelor''s)', 2),
('DIPLOMA', 'Diploma (Polytechnic / Vocational)', 3),
('PLUS_TWO', 'Plus Two (+2 / Higher Secondary / 12th Standard)', 4),
('SSLC', 'SSLC (10th Standard / Matriculation)', 5),
('BELOW_SSLC', 'Below SSLC', 6),
('OTHER', 'Other Qualification', 7)
ON CONFLICT (id) DO NOTHING;

-- 3. Degree Types (Undergraduate Level)
INSERT INTO degree_types (id, qualification_id, name) VALUES
('DEG_BTECH', 'DEGREE', 'B.Tech / B.E. (Engineering)'),
('DEG_BSC', 'DEGREE', 'B.Sc. (Bachelor of Science)'),
('DEG_BCOM', 'DEGREE', 'B.Com. (Bachelor of Commerce)'),
('DEG_BA', 'DEGREE', 'B.A. (Bachelor of Arts)'),
('DEG_BCA', 'DEGREE', 'BCA (Bachelor of Computer Applications)'),
('DEG_BBA', 'DEGREE', 'BBA / BMS (Business Administration)'),
('DEG_OTHER', 'DEGREE', 'Other Bachelor''s Degree')
ON CONFLICT (id) DO NOTHING;

-- 4. Academic Streams (Engineering Branches & Higher Secondary Streams)
-- Engineering Branches
INSERT INTO academic_streams (id, degree_type_id, name, is_engineering) VALUES
('ENG_CSE', 'DEG_BTECH', 'Computer Science & Engineering (CSE)', TRUE),
('ENG_IT', 'DEG_BTECH', 'Information Technology (IT)', TRUE),
('ENG_ECE', 'DEG_BTECH', 'Electronics & Communication (ECE)', TRUE),
('ENG_EEE', 'DEG_BTECH', 'Electrical & Electronics (EEE)', TRUE),
('ENG_MECH', 'DEG_BTECH', 'Mechanical Engineering', TRUE),
('ENG_CIVIL', 'DEG_BTECH', 'Civil Engineering', TRUE),
('ENG_OTHER', 'DEG_BTECH', 'Other Engineering Branch', TRUE)
ON CONFLICT (id) DO NOTHING;
