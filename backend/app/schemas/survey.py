from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator
from enum import Enum

class EmploymentStatus(str, Enum):
    EMPLOYED = "EMPLOYED"
    UNEMPLOYED = "UNEMPLOYED"

class SurveySubmissionCreate(BaseModel):
    status: EmploymentStatus
    
    # Q1: Full Name (Optional)
    respondent_name: Optional[str] = Field(None, max_length=150)
    
    # Q2: Exact Age (Numeric)
    age: int = Field(..., ge=14, le=100, description="Exact age between 14 and 100")
    
    # Q3: State / UT
    state_id: str = Field(..., min_length=2, max_length=20)
    
    # Q4: Highest Educational Qualification
    qualification_id: str = Field(..., min_length=2, max_length=50)
    
    # Q5: Degree / Stream / Specialization
    degree_id: Optional[str] = Field(None, max_length=50)
    stream_id: Optional[str] = Field(None, max_length=50)
    custom_qualification_detail: Optional[str] = Field(None, max_length=255)
    
    # Q6: Optional Additional Information
    additional_attributes: Optional[Dict[str, Any]] = Field(default_factory=dict)
    
    # Anti-Abuse Honeypot (must remain empty)
    website_url: Optional[str] = None
    
    # Anti-Abuse Velocity & Bot Token
    form_start_epoch_ms: Optional[int] = None
    turnstile_token: Optional[str] = None
    client_fingerprint: Optional[str] = None

    @field_validator("website_url")
    @classmethod
    def validate_honeypot(cls, v):
        if v and len(v.strip()) > 0:
            raise ValueError("Invalid submission payload detected")
        return v

class SurveySubmissionResponse(BaseModel):
    success: bool
    message: str
    deletion_key: str
    status: EmploymentStatus
