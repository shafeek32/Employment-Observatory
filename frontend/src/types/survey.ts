export type EmploymentStatus = 'EMPLOYED' | 'UNEMPLOYED';

export type QualificationLevel =
  | 'POSTGRADUATE'
  | 'DEGREE'
  | 'DIPLOMA'
  | 'PLUS_TWO'
  | 'SSLC'
  | 'BELOW_SSLC'
  | 'OTHER';

export type DegreeType =
  | 'DEG_BTECH'
  | 'DEG_BSC'
  | 'DEG_BCOM'
  | 'DEG_BA'
  | 'DEG_BCA'
  | 'DEG_BBA'
  | 'DEG_OTHER';

export type EngineeringStream =
  | 'ENG_CSE'
  | 'ENG_IT'
  | 'ENG_ECE'
  | 'ENG_EEE'
  | 'ENG_MECH'
  | 'ENG_CIVIL'
  | 'ENG_OTHER';

export interface UnemployedDetails {
  duration?: '< 6 months' | '6–12 months' | '1–2 years' | '2+ years';
  seekingDomain?: 'IT / Software' | 'Govt / Public Exams' | 'Core Engineering' | 'Teaching & Academia' | 'Banking & Finance' | 'Open to Any';
  workType?: 'Full-time' | 'Part-time' | 'Apprenticeship / Internship' | 'Remote';
}

export interface EmployedDetails {
  employmentCategory?: 'Private Sector' | 'Central / State Government' | 'Public Sector Undertaking (PSU)' | 'Self-Employed / Business Owner' | 'Freelancer / Gig Economy' | 'Informal / Daily Wage';
  industrySector?: 'Information Technology / Software' | 'Manufacturing / Industrial' | 'BFSI (Banking, Financial Services, Insurance)' | 'Healthcare / Pharma' | 'Education / EdTech' | 'Retail / E-Commerce' | 'Agriculture / Allied' | 'Construction / Real Estate' | 'Other';
  monthlySalaryRange?: '< ₹15,000' | '₹15,000 – ₹30,000' | '₹30,000 – ₹50,000' | '₹50,000 – ₹1,00,000' | '₹1,00,000 – ₹2,00,000' | '> ₹2,00,000' | 'Prefer not to say';
  experienceYears?: '< 1 year' | '1–3 years' | '3–5 years' | '5–10 years' | '10+ years';
  fieldAlignment?: 'Yes' | 'No';
  jobSatisfaction?: number; // 1 to 5
}

export interface SurveyFormData {
  status: EmploymentStatus;
  fullName?: string; // Q1: Strictly optional
  age: number | ''; // Q2: 14 to 100
  stateId: string; // Q3: ISO code
  qualificationId: QualificationLevel | ''; // Q4
  degreeId?: DegreeType | ''; // Q5
  streamId?: EngineeringStream | string; // Q5 sub
  customQualification?: string; // Q5 custom
  additionalDetails?: UnemployedDetails & EmployedDetails; // Q6
  consentGiven: boolean;
}
