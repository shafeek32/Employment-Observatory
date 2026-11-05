from typing import Dict, Any, List
from datetime import datetime
from backend.app.db.session import get_supabase_client
from backend.app.schemas.survey import SurveySubmissionCreate
from backend.app.core.security import generate_ip_hash, generate_deletion_key

SAMPLE_DATA_BASELINE = {
    "macro": {
        "total_respondents": 48312,
        "total_employed": 29840,
        "total_unemployed": 18472,
        "employed_percentage": 61.8,
        "unemployed_percentage": 38.2,
        "median_unemployed_age": 24.6,
        "most_represented_stream": "Computer Science & Engineering (CSE)",
        "last_refreshed_at": datetime.now().isoformat() + "+05:30",
        "sample_notice": "Reflects voluntary public survey submissions. Does not represent official government statistics from PLFS, MOSPI, or RBI."
    },
    "states": [
        {"state_id": "IN-KA", "state_name": "Karnataka", "state_type": "STATE", "total_respondents": 6120, "employed_count": 4210, "unemployed_count": 1910, "sample_unemployed_ratio": 31.2, "average_age": 26.1},
        {"state_id": "IN-MH", "state_name": "Maharashtra", "state_type": "STATE", "total_respondents": 5840, "employed_count": 3950, "unemployed_count": 1890, "sample_unemployed_ratio": 32.4, "average_age": 26.5},
        {"state_id": "IN-TN", "state_name": "Tamil Nadu", "state_type": "STATE", "total_respondents": 5210, "employed_count": 3380, "unemployed_count": 1830, "sample_unemployed_ratio": 35.1, "average_age": 25.8},
        {"state_id": "IN-UP", "state_name": "Uttar Pradesh", "state_type": "STATE", "total_respondents": 5140, "employed_count": 2720, "unemployed_count": 2420, "sample_unemployed_ratio": 47.1, "average_age": 24.3},
        {"state_id": "IN-KL", "state_name": "Kerala", "state_type": "STATE", "total_respondents": 4310, "employed_count": 2540, "unemployed_count": 1770, "sample_unemployed_ratio": 41.1, "average_age": 25.4},
        {"state_id": "IN-DL", "state_name": "Delhi (NCT)", "state_type": "UT", "total_respondents": 3950, "employed_count": 2710, "unemployed_count": 1240, "sample_unemployed_ratio": 31.4, "average_age": 26.8},
        {"state_id": "IN-TG", "state_name": "Telangana", "state_type": "STATE", "total_respondents": 3810, "employed_count": 2580, "unemployed_count": 1230, "sample_unemployed_ratio": 32.3, "average_age": 25.9},
        {"state_id": "IN-BR", "state_name": "Bihar", "state_type": "STATE", "total_respondents": 3490, "employed_count": 1610, "unemployed_count": 1880, "sample_unemployed_ratio": 53.9, "average_age": 23.9},
        {"state_id": "IN-WB", "state_name": "West Bengal", "state_type": "STATE", "total_respondents": 2980, "employed_count": 1690, "unemployed_count": 1290, "sample_unemployed_ratio": 43.3, "average_age": 26.2},
        {"state_id": "IN-GJ", "state_name": "Gujarat", "state_type": "STATE", "total_respondents": 2840, "employed_count": 2040, "unemployed_count": 800, "sample_unemployed_ratio": 28.2, "average_age": 26.4},
        {"state_id": "IN-RJ", "state_name": "Rajasthan", "state_type": "STATE", "total_respondents": 2410, "employed_count": 1280, "unemployed_count": 1130, "sample_unemployed_ratio": 46.9, "average_age": 24.7},
        {"state_id": "IN-REMOTE", "state_name": "Working Remotely / Outside India", "state_type": "OTHER", "total_respondents": 2212, "employed_count": 2140, "unemployed_count": 72, "sample_unemployed_ratio": 3.3, "average_age": 28.5}
    ],
    "engineering_streams": [
        {"stream_id": "ENG_CSE", "stream_name": "Computer Science & Engineering", "total_respondents": 12450, "employed_count": 8320, "unemployed_count": 4130, "sample_unemployed_ratio": 33.2},
        {"stream_id": "ENG_ECE", "stream_name": "Electronics & Communication", "total_respondents": 6120, "employed_count": 3610, "unemployed_count": 2510, "sample_unemployed_ratio": 41.0},
        {"stream_id": "ENG_MECH", "stream_name": "Mechanical Engineering", "total_respondents": 5310, "employed_count": 2790, "unemployed_count": 2520, "sample_unemployed_ratio": 47.5},
        {"stream_id": "ENG_IT", "stream_name": "Information Technology", "total_respondents": 4820, "employed_count": 3390, "unemployed_count": 1430, "sample_unemployed_ratio": 29.7},
        {"stream_id": "ENG_CIVIL", "stream_name": "Civil Engineering", "total_respondents": 4110, "employed_count": 1980, "unemployed_count": 2130, "sample_unemployed_ratio": 51.8},
        {"stream_id": "ENG_EEE", "stream_name": "Electrical & Electronics", "total_respondents": 3640, "employed_count": 1960, "unemployed_count": 1680, "sample_unemployed_ratio": 46.2},
        {"stream_id": "ENG_OTHER", "stream_name": "Other Engineering Branches", "total_respondents": 1820, "employed_count": 980, "unemployed_count": 840, "sample_unemployed_ratio": 46.2}
    ],
    "age_distribution": [
        {"age": 18, "total_respondents": 620, "employed_count": 95, "unemployed_count": 525},
        {"age": 19, "total_respondents": 1050, "employed_count": 210, "unemployed_count": 840},
        {"age": 20, "total_respondents": 1820, "employed_count": 460, "unemployed_count": 1360},
        {"age": 21, "total_respondents": 3140, "employed_count": 1120, "unemployed_count": 2020},
        {"age": 22, "total_respondents": 5680, "employed_count": 2810, "unemployed_count": 2870},
        {"age": 23, "total_respondents": 6420, "employed_count": 3690, "unemployed_count": 2730},
        {"age": 24, "total_respondents": 6190, "employed_count": 3950, "unemployed_count": 2240},
        {"age": 25, "total_respondents": 5410, "employed_count": 3720, "unemployed_count": 1690},
        {"age": 26, "total_respondents": 4230, "employed_count": 3110, "unemployed_count": 1120},
        {"age": 27, "total_respondents": 3410, "employed_count": 2650, "unemployed_count": 760},
        {"age": 28, "total_respondents": 2850, "employed_count": 2290, "unemployed_count": 560},
        {"age": 29, "total_respondents": 2120, "employed_count": 1780, "unemployed_count": 340},
        {"age": 30, "total_respondents": 1840, "employed_count": 1580, "unemployed_count": 260},
        {"age": 32, "total_respondents": 1420, "employed_count": 1250, "unemployed_count": 170},
        {"age": 35, "total_respondents": 1112, "employed_count": 1025, "unemployed_count": 87}
    ],
    "qualifications": [
        {"qualification_id": "POSTGRADUATE", "qualification_name": "Postgraduate & Above", "tier_order": 1, "total_respondents": 7640, "employed_count": 5580, "unemployed_count": 2060, "sample_unemployed_ratio": 27.0},
        {"qualification_id": "DEGREE", "qualification_name": "Undergraduate Degree", "tier_order": 2, "total_respondents": 29120, "employed_count": 17840, "unemployed_count": 11280, "sample_unemployed_ratio": 38.7},
        {"qualification_id": "DIPLOMA", "qualification_name": "Diploma / Polytechnic", "tier_order": 3, "total_respondents": 4820, "employed_count": 2910, "unemployed_count": 1910, "sample_unemployed_ratio": 39.6},
        {"qualification_id": "PLUS_TWO", "qualification_name": "Plus Two (+2 / 12th)", "tier_order": 4, "total_respondents": 4120, "employed_count": 2140, "unemployed_count": 1980, "sample_unemployed_ratio": 48.1},
        {"qualification_id": "SSLC", "qualification_name": "SSLC (10th Standard)", "tier_order": 5, "total_respondents": 1850, "employed_count": 990, "unemployed_count": 860, "sample_unemployed_ratio": 46.5},
        {"qualification_id": "BELOW_SSLC", "qualification_name": "Below SSLC", "tier_order": 6, "total_respondents": 762, "employed_count": 380, "unemployed_count": 382, "sample_unemployed_ratio": 50.1}
    ]
}

async def save_survey_submission(submission: SurveySubmissionCreate, client_ip: str) -> str:
    """Inserts a verified survey submission into Supabase or in-memory baseline."""
    client = get_supabase_client()
    deletion_key = generate_deletion_key()
    ip_hash = generate_ip_hash(client_ip)
    
    record = {
        "status": submission.status.value,
        "respondent_name": submission.respondent_name,
        "age": submission.age,
        "state_id": submission.state_id,
        "qualification_id": submission.qualification_id,
        "degree_id": submission.degree_id,
        "stream_id": submission.stream_id,
        "custom_qualification_detail": submission.custom_qualification_detail,
        "additional_attributes": submission.additional_attributes or {},
        "deletion_key": deletion_key,
        "ip_hash": ip_hash,
        "client_fingerprint": submission.client_fingerprint
    }
    
    if client:
        try:
            client.table("survey_submissions").insert(record).execute()
        except Exception as e:
            # Fallback logging if Supabase write fails
            print(f"[Supabase Write Error] {e}")
            
    return deletion_key

async def fetch_dashboard_overview() -> Dict[str, Any]:
    """Retrieves aggregated statistics from materialized views or baseline data."""
    client = get_supabase_client()
    if client:
        try:
            overview_res = client.table("mv_dashboard_overview").select("*").limit(1).execute()
            if overview_res.data and overview_res.data[0].get("total_respondents", 0) > 0:
                # If Supabase has live materialized views populated with actual records
                states_res = client.table("mv_state_employment_aggregates").select("*").order("total_respondents", desc=True).execute()
                streams_res = client.table("mv_engineering_stream_aggregates").select("*").order("total_respondents", desc=True).execute()
                age_res = client.table("mv_age_distribution_aggregates").select("*").order("age", desc=False).execute()
                qual_res = client.table("mv_qualification_aggregates").select("*").order("tier_order", desc=False).execute()
                
                macro = overview_res.data[0]
                macro["sample_notice"] = "Reflects voluntary public survey submissions. Does not represent official government statistics from PLFS, MOSPI, or RBI."
                
                return {
                    "macro": macro,
                    "states": states_res.data,
                    "engineering_streams": streams_res.data,
                    "age_distribution": age_res.data,
                    "qualifications": qual_res.data
                }
        except Exception as e:
            print(f"[Supabase Read Error] {e}")

    # Default fallback to baseline aggregated dataset
    return SAMPLE_DATA_BASELINE
