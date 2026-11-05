from typing import List, Optional
from pydantic import BaseModel

class MacroMetrics(BaseModel):
    total_respondents: int
    total_employed: int
    total_unemployed: int
    employed_percentage: float
    unemployed_percentage: float
    median_unemployed_age: Optional[float] = None
    most_represented_stream: Optional[str] = None
    last_refreshed_at: str
    sample_notice: str

class StateAggregate(BaseModel):
    state_id: str
    state_name: str
    state_type: str
    total_respondents: int
    employed_count: int
    unemployed_count: int
    sample_unemployed_ratio: float
    average_age: Optional[float] = None

class EngineeringStreamAggregate(BaseModel):
    stream_id: str
    stream_name: str
    total_respondents: int
    employed_count: int
    unemployed_count: int
    sample_unemployed_ratio: float

class AgeDistributionPoint(BaseModel):
    age: int
    total_respondents: int
    employed_count: int
    unemployed_count: int

class QualificationAggregate(BaseModel):
    qualification_id: str
    qualification_name: str
    tier_order: int
    total_respondents: int
    employed_count: int
    unemployed_count: int
    sample_unemployed_ratio: float

class DashboardOverviewResponse(BaseModel):
    macro: MacroMetrics
    states: List[StateAggregate]
    engineering_streams: List[EngineeringStreamAggregate]
    age_distribution: List[AgeDistributionPoint]
    qualifications: List[QualificationAggregate]
