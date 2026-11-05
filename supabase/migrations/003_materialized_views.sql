-- 003_materialized_views.sql
-- Pre-aggregated views for lightning-fast dashboard queries

-- 1. Macro Overview Summary
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_dashboard_overview AS
SELECT
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE status = 'EMPLOYED') AS total_employed,
    COUNT(*) FILTER (WHERE status = 'UNEMPLOYED') AS total_unemployed,
    ROUND(
        (COUNT(*) FILTER (WHERE status = 'EMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1
    ) AS employed_percentage,
    ROUND(
        (COUNT(*) FILTER (WHERE status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1
    ) AS unemployed_percentage,
    ROUND(AVG(age) FILTER (WHERE status = 'UNEMPLOYED')::numeric, 1) AS median_unemployed_age,
    NOW() AS last_refreshed_at
FROM survey_submissions;

-- 2. State-Wise Employment Distribution
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_state_employment_aggregates AS
SELECT 
    s.state_id,
    g.name AS state_name,
    g.type AS state_type,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND(
        (COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1
    ) AS sample_unemployed_ratio,
    ROUND(AVG(s.age)::numeric, 1) AS average_age
FROM survey_submissions s
JOIN geo_states g ON s.state_id = g.id
GROUP BY s.state_id, g.name, g.type;

-- 3. Engineering Stream Breakdown
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_engineering_stream_aggregates AS
SELECT 
    str.id AS stream_id,
    str.name AS stream_name,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND(
        (COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1
    ) AS sample_unemployed_ratio
FROM survey_submissions s
JOIN academic_streams str ON s.stream_id = str.id
WHERE str.is_engineering = TRUE
GROUP BY str.id, str.name;

-- 4. Single-Year Age Distribution
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_age_distribution_aggregates AS
SELECT 
    age,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE status = 'UNEMPLOYED') AS unemployed_count
FROM survey_submissions
GROUP BY age
ORDER BY age ASC;

-- 5. Qualification Level Breakdown
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_qualification_aggregates AS
SELECT 
    eq.id AS qualification_id,
    eq.name AS qualification_name,
    eq.tier_order,
    COUNT(*) AS total_respondents,
    COUNT(*) FILTER (WHERE s.status = 'EMPLOYED') AS employed_count,
    COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED') AS unemployed_count,
    ROUND(
        (COUNT(*) FILTER (WHERE s.status = 'UNEMPLOYED')::numeric / NULLIF(COUNT(*), 0) * 100), 1
    ) AS sample_unemployed_ratio
FROM survey_submissions s
JOIN education_qualifications eq ON s.qualification_id = eq.id
GROUP BY eq.id, eq.name, eq.tier_order
ORDER BY eq.tier_order ASC;

-- Unique indexes to enable REFRESH MATERIALIZED VIEW CONCURRENTLY
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_overview_single ON mv_dashboard_overview ((true));
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_state_id ON mv_state_employment_aggregates(state_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_stream_id ON mv_engineering_stream_aggregates(stream_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_age_id ON mv_age_distribution_aggregates(age);
CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_qualification_id ON mv_qualification_aggregates(qualification_id);

-- Helper Stored Procedure to Refresh all Materialized Views
CREATE OR REPLACE FUNCTION refresh_all_analytics_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_dashboard_overview;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_state_employment_aggregates;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_engineering_stream_aggregates;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_age_distribution_aggregates;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_qualification_aggregates;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
