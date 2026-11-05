from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

INDIAN_STATES = [
    {"id": "IN-AN", "name": "Andaman and Nicobar Islands", "type": "UT"},
    {"id": "IN-AP", "name": "Andhra Pradesh", "type": "STATE"},
    {"id": "IN-AR", "name": "Arunachal Pradesh", "type": "STATE"},
    {"id": "IN-AS", "name": "Assam", "type": "STATE"},
    {"id": "IN-BR", "name": "Bihar", "type": "STATE"},
    {"id": "IN-CH", "name": "Chandigarh", "type": "UT"},
    {"id": "IN-CT", "name": "Chhattisgarh", "type": "STATE"},
    {"id": "IN-DH", "name": "Dadra and Nagar Haveli and Daman and Diu", "type": "UT"},
    {"id": "IN-DL", "name": "Delhi (NCT)", "type": "UT"},
    {"id": "IN-GA", "name": "Goa", "type": "STATE"},
    {"id": "IN-GJ", "name": "Gujarat", "type": "STATE"},
    {"id": "IN-HR", "name": "Haryana", "type": "STATE"},
    {"id": "IN-HP", "name": "Himachal Pradesh", "type": "STATE"},
    {"id": "IN-JK", "name": "Jammu and Kashmir", "type": "UT"},
    {"id": "IN-JH", "name": "Jharkhand", "type": "STATE"},
    {"id": "IN-KA", "name": "Karnataka", "type": "STATE"},
    {"id": "IN-KL", "name": "Kerala", "type": "STATE"},
    {"id": "IN-LA", "name": "Ladakh", "type": "UT"},
    {"id": "IN-LD", "name": "Lakshadweep", "type": "UT"},
    {"id": "IN-MP", "name": "Madhya Pradesh", "type": "STATE"},
    {"id": "IN-MH", "name": "Maharashtra", "type": "STATE"},
    {"id": "IN-MN", "name": "Manipur", "type": "STATE"},
    {"id": "IN-ML", "name": "Meghalaya", "type": "STATE"},
    {"id": "IN-MZ", "name": "Mizoram", "type": "STATE"},
    {"id": "IN-NL", "name": "Nagaland", "type": "STATE"},
    {"id": "IN-OR", "name": "Odisha", "type": "STATE"},
    {"id": "IN-PY", "name": "Puducherry", "type": "UT"},
    {"id": "IN-PB", "name": "Punjab", "type": "STATE"},
    {"id": "IN-RJ", "name": "Rajasthan", "type": "STATE"},
    {"id": "IN-SK", "name": "Sikkim", "type": "STATE"},
    {"id": "IN-TN", "name": "Tamil Nadu", "type": "STATE"},
    {"id": "IN-TG", "name": "Telangana", "type": "STATE"},
    {"id": "IN-TR", "name": "Tripura", "type": "STATE"},
    {"id": "IN-UP", "name": "Uttar Pradesh", "type": "STATE"},
    {"id": "IN-UT", "name": "Uttarakhand", "type": "STATE"},
    {"id": "IN-WB", "name": "West Bengal", "type": "STATE"},
    {"id": "IN-REMOTE", "name": "Working Remotely / Outside India", "type": "OTHER"}
]

@router.get("/states", response_model=List[Dict[str, Any]])
async def get_states():
    return INDIAN_STATES
