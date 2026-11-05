export interface MacroMetrics {
  total_respondents: number;
  total_employed: number;
  total_unemployed: number;
  employed_percentage: number;
  unemployed_percentage: number;
  median_unemployed_age?: number;
  most_represented_stream?: string;
  last_refreshed_at: string;
  sample_notice: string;
}

export interface StateAggregate {
  state_id: string;
  state_name: string;
  state_type: string;
  total_respondents: number;
  employed_count: number;
  unemployed_count: number;
  sample_unemployed_ratio: number;
  average_age?: number;
}

export interface EngineeringStreamAggregate {
  stream_id: string;
  stream_name: string;
  total_respondents: number;
  employed_count: number;
  unemployed_count: number;
  sample_unemployed_ratio: number;
}

export interface AgeDistributionPoint {
  age: number;
  total_respondents: number;
  employed_count: number;
  unemployed_count: number;
}

export interface QualificationAggregate {
  qualification_id: string;
  qualification_name: string;
  tier_order: number;
  total_respondents: number;
  employed_count: number;
  unemployed_count: number;
  sample_unemployed_ratio: number;
}

export interface DashboardOverviewData {
  macro: MacroMetrics;
  states: StateAggregate[];
  engineering_streams: EngineeringStreamAggregate[];
  age_distribution: AgeDistributionPoint[];
  qualifications: QualificationAggregate[];
}

export interface DashboardFilterState {
  stateId: string; // 'ALL' or specific state id
  minAge: number;
  maxAge: number;
  qualificationId: string; // 'ALL' or specific
  streamId: string; // 'ALL' or specific
  status: 'ALL' | 'EMPLOYED' | 'UNEMPLOYED';
  datePeriod: 'ALL' | '7D' | '30D' | '6M';
}
