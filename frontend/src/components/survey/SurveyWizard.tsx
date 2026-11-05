import React, { useState } from 'react';
import { INDIAN_STATES_MASTER, submitSurvey } from '../../services/api';
import type { SurveyFormData, EmploymentStatus, QualificationLevel, DegreeType, EngineeringStream } from '../../types/survey';
import { Check, Copy, ArrowLeft, ArrowRight, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';

interface SurveyWizardProps {
  initialStatus: EmploymentStatus;
  onComplete: () => void;
  onCancel: () => void;
}

export const SurveyWizard: React.FC<SurveyWizardProps> = ({
  initialStatus,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{ deletionKey: string; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [formData, setFormData] = useState<SurveyFormData>({
    status: initialStatus,
    fullName: '',
    age: '',
    stateId: '',
    qualificationId: '',
    degreeId: '',
    streamId: '',
    customQualification: '',
    additionalDetails: {},
    consentGiven: true
  });

  const isEmployed = formData.status === 'EMPLOYED';

  const handleNextStep = () => {
    setErrorMsg('');

    if (currentStep === 2) {
      if (formData.age === '' || Number(formData.age) < 14 || Number(formData.age) > 100) {
        setErrorMsg('Please enter a valid age between 14 and 100 years.');
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.stateId) {
        setErrorMsg('Please select your state or union territory.');
        return;
      }
    }

    if (currentStep === 4) {
      if (!formData.qualificationId) {
        setErrorMsg('Please select your highest educational qualification.');
        return;
      }
    }

    if (currentStep === 5) {
      if (formData.qualificationId === 'DEGREE' && !formData.degreeId) {
        setErrorMsg('Please select your undergraduate degree.');
        return;
      }
      if (formData.degreeId === 'DEG_BTECH' && !formData.streamId) {
        setErrorMsg('Please select your engineering discipline.');
        return;
      }
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await submitSurvey(formData);
      if (res.success) {
        setSubmissionResult({
          deletionKey: res.deletionKey,
          message: res.message
        });
      } else {
        setErrorMsg('Submission failed. Please check your connection and retry.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyKey = () => {
    if (submissionResult?.deletionKey) {
      navigator.clipboard.writeText(submissionResult.deletionKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    }
  };

  // Completion View
  if (submissionResult) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-8 sm:p-12 text-center space-y-8 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#176B52]/10 text-[#176B52] flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#176B52]/10 text-[#176B52] text-xs font-mono font-bold uppercase tracking-wider">
              VOICE VERIFIED & RECORDED
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Thank You for Speaking Up.
            </h2>
            <p className="text-base text-[#171717]/70 max-w-lg mx-auto font-normal leading-relaxed">
              Your experience has been securely and anonymously added to India's collective employment dataset. You have helped create transparency for millions of students and job seekers.
            </p>
          </div>

          {/* Deletion Key Box */}
          <div className="bg-[#FAF9F6] border border-[#EEECE7] rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#F15B48]" />
                <span className="font-bold text-xs uppercase tracking-wider text-[#171717]">
                  Your Personal Deletion Key
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#171717]/60">
                DPDPA 2023 GUARANTEE
              </span>
            </div>

            <div className="flex items-center justify-between bg-white border border-[#EEECE7] rounded-xl px-4 py-3 shadow-inner">
              <span className="font-mono text-lg font-bold text-[#171717] tracking-wider select-all">
                {submissionResult.deletionKey}
              </span>
              <button
                type="button"
                onClick={handleCopyKey}
                className="flex items-center gap-1.5 text-xs font-bold text-[#171717] hover:text-[#F15B48] transition-colors cursor-pointer"
              >
                {copiedKey ? <Check className="w-4 h-4 text-[#176B52]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <p className="text-xs text-[#171717]/70 leading-relaxed font-sans">
              Save this key. Under India's Digital Personal Data Protection Act, you can permanently erase your survey submission at any time using this key without creating an account or providing contact details.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onComplete}
              className="w-full sm:w-auto px-8 py-4 bg-[#171717] hover:bg-[#2a2a2a] text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Explore National Analytics
            </button>
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#EEECE7] text-[#171717] border border-[#EEECE7] rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Wizard Screen
  const progressPercent = Math.round((currentStep / 6) * 100);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      {/* Wizard Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isEmployed ? 'bg-[#176B52]' : 'bg-[#F15B48]'}`}></span>
            <span className="font-bold uppercase tracking-wider text-[#171717]">
              {isEmployed ? 'EMPLOYED COHORT' : 'UNEMPLOYED COHORT'}
            </span>
          </div>
          <span className="font-bold text-[#171717]">
            Question {currentStep} of 6 ({progressPercent}%)
          </span>
        </div>

        <div className="h-2 w-full bg-[#EEECE7] rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-full transition-all duration-300 rounded-full ${
              isEmployed ? 'bg-[#176B52]' : 'bg-[#F15B48]'
            }`}
          />
        </div>
      </div>

      {/* Main Question Card (One Question Per Screen) */}
      <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-8 sm:p-12 space-y-8 shadow-lg">
          {errorMsg && (
            <div className="p-4 bg-[#F15B48]/10 border border-[#F15B48]/30 rounded-2xl flex items-center gap-2.5 text-xs text-[#F15B48] font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================= QUESTION 1 ================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 01 // VOLUNTARY IDENTITY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  What is your name?
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  This field is completely optional. You can leave it blank for complete anonymity. Your name will never appear in any public chart or export.
                </p>
              </div>

              <div>
                <label htmlFor="fullNameInput" className="sr-only">Full Name (Optional)</label>
                <input
                  type="text"
                  id="fullNameInput"
                  name="fullName"
                  autoComplete="name"
                  placeholder="Optional — Leave blank for anonymous voice"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-5 py-4 bg-[#FAF9F6] border-2 border-[#EEECE7] focus:border-[#171717] focus:bg-white rounded-2xl text-base text-[#171717] outline-none transition-all min-h-[52px]"
                />
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#176B52] bg-[#176B52]/5 p-3.5 rounded-xl border border-[#176B52]/20">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero Exposure Guarantee: Stored in an encrypted column isolated from analytics.</span>
              </div>
            </div>
          )}

          {/* ================= QUESTION 2 ================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 02 // DEMOGRAPHIC AGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  What is your exact age in years?
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  Enter your exact age (e.g., 23). Precise numeric ages help us map single-year graduate transitions accurately rather than using vague ranges.
                </p>
              </div>

              <div className="max-w-xs">
                <label htmlFor="ageField" className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-2">
                  Age in Years (14 to 100)
                </label>
                <input
                  type="text"
                  id="ageField"
                  name="age"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  placeholder="e.g. 23"
                  value={formData.age}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, age: val ? Number(val) : '' });
                  }}
                  className="w-full px-5 py-4 bg-[#FAF9F6] border-2 border-[#EEECE7] focus:border-[#171717] focus:bg-white rounded-2xl text-2xl font-mono font-bold text-[#171717] outline-none transition-all min-h-[52px]"
                  required
                />
              </div>
            </div>
          )}

          {/* ================= QUESTION 3 ================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 03 // JURISDICTION & GEOGRAPHY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  {isEmployed ? 'In which State / UT do you currently work?' : 'Which Indian State / UT do you live in?'}
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  Helps identify regional job density and geographic disparities across India.
                </p>
              </div>

              <div>
                <label htmlFor="stateDropdown" className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-2">
                  Select State or Union Territory
                </label>
                <select
                  id="stateDropdown"
                  name="stateId"
                  value={formData.stateId}
                  onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                  className="w-full px-5 py-4 bg-[#FAF9F6] border-2 border-[#EEECE7] focus:border-[#171717] focus:bg-white rounded-2xl text-base text-[#171717] outline-none transition-all min-h-[52px] cursor-pointer"
                  required
                >
                  <option value="">— Choose State / Territory —</option>
                  {INDIAN_STATES_MASTER.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ================= QUESTION 4 ================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 04 // EDUCATIONAL ATTAINMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  What is your highest educational qualification?
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  Select the highest level you have successfully completed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'POSTGRADUATE', label: 'Postgraduate & Above (Masters / Ph.D.)' },
                  { id: 'DEGREE', label: 'Degree (Undergraduate / Bachelor’s)' },
                  { id: 'DIPLOMA', label: 'Diploma (Polytechnic / Vocational)' },
                  { id: 'PLUS_TWO', label: 'Plus Two (+2 / Higher Secondary / 12th)' },
                  { id: 'SSLC', label: 'SSLC (10th Standard / Matriculation)' },
                  { id: 'BELOW_SSLC', label: 'Below SSLC' },
                  { id: 'OTHER', label: 'Other Qualification' }
                ].map((qual) => (
                  <button
                    key={qual.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, qualificationId: qual.id as QualificationLevel, degreeId: '', streamId: '', customQualification: '' })}
                    className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all min-h-[56px] flex items-center justify-between cursor-pointer ${
                      formData.qualificationId === qual.id
                        ? 'border-[#171717] bg-[#171717] text-white shadow-md'
                        : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717] hover:border-[#171717]'
                    }`}
                  >
                    <span>{qual.label}</span>
                    {formData.qualificationId === qual.id && <Check className="w-5 h-5 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= QUESTION 5 ================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 05 // STREAM & SPECIALIZATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  Specify your degree or stream details
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  Enables granular outcome analysis across university disciplines.
                </p>
              </div>

              {/* BRANCH A: DEGREE */}
              {formData.qualificationId === 'DEGREE' && (
                <div className="space-y-5">
                  <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70">
                    Select Undergraduate Degree:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'DEG_BTECH', label: 'B.Tech / B.E. (Engineering)' },
                      { id: 'DEG_BSC', label: 'B.Sc. (Bachelor of Science)' },
                      { id: 'DEG_BCOM', label: 'B.Com. (Bachelor of Commerce)' },
                      { id: 'DEG_BA', label: 'B.A. (Bachelor of Arts)' },
                      { id: 'DEG_BCA', label: 'BCA (Computer Applications)' },
                      { id: 'DEG_BBA', label: 'BBA / BMS (Business Admin)' },
                      { id: 'DEG_OTHER', label: 'Other Bachelor’s Degree' }
                    ].map((deg) => (
                      <button
                        key={deg.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, degreeId: deg.id as DegreeType, streamId: '' })}
                        className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all min-h-[52px] flex items-center justify-between cursor-pointer ${
                          formData.degreeId === deg.id
                            ? 'border-[#171717] bg-[#171717] text-white'
                            : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717] hover:border-[#171717]'
                        }`}
                      >
                        <span>{deg.label}</span>
                        {formData.degreeId === deg.id && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {/* B.Tech Specific Engineering Branches */}
                  {formData.degreeId === 'DEG_BTECH' && (
                    <div className="pt-4 border-t border-[#EEECE7] space-y-3">
                      <label className="block text-xs font-mono font-bold uppercase text-[#F15B48]">
                        Select Engineering Branch:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: 'ENG_CSE', label: 'Computer Science (CSE)' },
                          { id: 'ENG_IT', label: 'Information Technology (IT)' },
                          { id: 'ENG_ECE', label: 'Electronics & Communication (ECE)' },
                          { id: 'ENG_EEE', label: 'Electrical & Electronics (EEE)' },
                          { id: 'ENG_MECH', label: 'Mechanical Engineering' },
                          { id: 'ENG_CIVIL', label: 'Civil Engineering' },
                          { id: 'ENG_OTHER', label: 'Other Engineering Branch' }
                        ].map((eng) => (
                          <button
                            key={eng.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, streamId: eng.id as EngineeringStream })}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all min-h-[48px] flex items-center justify-between cursor-pointer ${
                              formData.streamId === eng.id
                                ? 'border-[#176B52] bg-[#176B52] text-white font-bold'
                                : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717] hover:border-[#176B52]'
                            }`}
                          >
                            <span>{eng.label}</span>
                            {formData.streamId === eng.id && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BRANCH B: PLUS TWO */}
              {formData.qualificationId === 'PLUS_TWO' && (
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70">
                    Plus Two Stream:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Science', 'Commerce', 'Humanities / Arts', 'Vocational Stream', 'Other'].map(stream => (
                      <button
                        key={stream}
                        type="button"
                        onClick={() => setFormData({ ...formData, streamId: stream })}
                        className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all min-h-[52px] ${
                          formData.streamId === stream
                            ? 'border-[#171717] bg-[#171717] text-white'
                            : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717]'
                        }`}
                      >
                        {stream}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BRANCH C: SSLC */}
              {formData.qualificationId === 'SSLC' && (
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70">
                    SSLC Examination Board:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['State Syllabus Board', 'CBSE', 'ICSE', 'Open Schooling (NIOS)', 'Other'].map(board => (
                      <button
                        key={board}
                        type="button"
                        onClick={() => setFormData({ ...formData, streamId: board })}
                        className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all min-h-[52px] ${
                          formData.streamId === board
                            ? 'border-[#171717] bg-[#171717] text-white'
                            : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717]'
                        }`}
                      >
                        {board}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BRANCH D: BELOW SSLC */}
              {formData.qualificationId === 'BELOW_SSLC' && (
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70">
                    Highest Class Completed:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Class 9 Completed', 'Class 8 Completed', 'Class 7 Completed', 'Class 6 or below', 'No formal schooling'].map(cls => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setFormData({ ...formData, streamId: cls })}
                        className={`p-4 rounded-2xl border-2 text-left font-medium text-sm transition-all min-h-[52px] ${
                          formData.streamId === cls
                            ? 'border-[#171717] bg-[#171717] text-white'
                            : 'border-[#EEECE7] bg-[#FAF9F6] text-[#171717]'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BRANCH E: OTHER / POSTGRADUATE / DIPLOMA */}
              {(formData.qualificationId === 'OTHER' || formData.qualificationId === 'POSTGRADUATE' || formData.qualificationId === 'DIPLOMA') && (
                <div className="space-y-2">
                  <label htmlFor="customInput" className="block text-xs font-mono font-bold uppercase text-[#171717]/70">
                    Specify Discipline / Specialization:
                  </label>
                  <input
                    type="text"
                    id="customInput"
                    placeholder="e.g. M.Sc. Data Science, Diploma in Mechanical Engineering"
                    value={formData.customQualification || ''}
                    onChange={(e) => setFormData({ ...formData, customQualification: e.target.value, streamId: e.target.value })}
                    className="w-full px-5 py-4 bg-[#FAF9F6] border-2 border-[#EEECE7] focus:border-[#171717] focus:bg-white rounded-2xl text-base text-[#171717] outline-none transition-all min-h-[52px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* ================= QUESTION 6 ================= */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                  QUESTION 06 // CONTEXT (STRICTLY OPTIONAL)
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                  {isEmployed ? 'Additional Employment Attributes' : 'Additional Search Context'}
                </h3>
                <p className="text-sm text-[#171717]/70 font-normal leading-relaxed">
                  All fields in this step are optional. You can answer any or submit immediately.
                </p>
              </div>

              {isEmployed ? (
                /* EMPLOYED OPTIONAL ATTRIBUTES */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                      Employment Sector:
                    </label>
                    <select
                      value={formData.additionalDetails?.employmentCategory || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalDetails: { ...formData.additionalDetails, employmentCategory: e.target.value as any }
                      })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                    >
                      <option value="">— Select Sector (Optional) —</option>
                      <option value="Private Sector">Private Sector</option>
                      <option value="Central / State Government">Central / State Government</option>
                      <option value="Public Sector Undertaking (PSU)">Public Sector Undertaking (PSU)</option>
                      <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                      <option value="Freelancer / Gig Economy">Freelancer / Gig Economy</option>
                      <option value="Informal / Daily Wage">Informal / Daily Wage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                      Monthly In-Hand Compensation:
                    </label>
                    <select
                      value={formData.additionalDetails?.monthlySalaryRange || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalDetails: { ...formData.additionalDetails, monthlySalaryRange: e.target.value as any }
                      })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                    >
                      <option value="">— Select Salary Band (Optional) —</option>
                      <option value="< ₹15,000">&lt; ₹15,000</option>
                      <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                      <option value="₹30,000 – ₹50,000">₹30,000 – ₹50,000</option>
                      <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                      <option value="₹1,00,000 – ₹2,00,000">₹1,00,000 – ₹2,00,000</option>
                      <option value="> ₹2,00,000">&gt; ₹2,00,000</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                        Work Experience:
                      </label>
                      <select
                        value={formData.additionalDetails?.experienceYears || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          additionalDetails: { ...formData.additionalDetails, experienceYears: e.target.value as any }
                        })}
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                      >
                        <option value="">— Select Experience —</option>
                        <option value="< 1 year">&lt; 1 year</option>
                        <option value="1–3 years">1–3 years</option>
                        <option value="3–5 years">3–5 years</option>
                        <option value="5–10 years">5–10 years</option>
                        <option value="10+ years">10+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                        Working in Field of Study?
                      </label>
                      <select
                        value={formData.additionalDetails?.fieldAlignment || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          additionalDetails: { ...formData.additionalDetails, fieldAlignment: e.target.value as any }
                        })}
                        className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                      >
                        <option value="">— Select Alignment —</option>
                        <option value="Yes">Yes (Working in studied field)</option>
                        <option value="No">No (Different industry)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                /* UNEMPLOYED OPTIONAL ATTRIBUTES */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                      Duration of Job Search:
                    </label>
                    <select
                      value={formData.additionalDetails?.duration || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalDetails: { ...formData.additionalDetails, duration: e.target.value as any }
                      })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                    >
                      <option value="">— Select Duration (Optional) —</option>
                      <option value="< 6 months">&lt; 6 months</option>
                      <option value="6–12 months">6–12 months</option>
                      <option value="1–2 years">1–2 years</option>
                      <option value="2+ years">2+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#171717]/70 mb-1.5">
                      Primary Domain Currently Seeking:
                    </label>
                    <select
                      value={formData.additionalDetails?.seekingDomain || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        additionalDetails: { ...formData.additionalDetails, seekingDomain: e.target.value as any }
                      })}
                      className="w-full px-4 py-3 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-sm text-[#171717] outline-none"
                    >
                      <option value="">— Select Domain —</option>
                      <option value="IT / Software">IT / Software Development</option>
                      <option value="Govt / Public Exams">Govt / Public Exams (UPSC, SSC, PSC)</option>
                      <option value="Core Engineering">Core Engineering (Mech, Civil, Electrical)</option>
                      <option value="Teaching & Academia">Teaching & Academia</option>
                      <option value="Banking & Finance">Banking & Finance</option>
                      <option value="Open to Any">Open to Any Domain</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Voluntary Consent Confirmation */}
              <div className="pt-4 border-t border-[#EEECE7]">
                <label className="flex items-start gap-3 text-xs text-[#171717]/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-0.5 rounded text-[#F15B48]"
                    required
                  />
                  <span>
                    I contribute my response to the public research observatory, and acknowledge that all data is aggregated anonymously without individual identification.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-[#EEECE7] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="px-5 py-3 rounded-full border border-[#EEECE7] hover:bg-[#FAF9F6] text-xs font-bold uppercase tracking-wider text-[#171717] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-bold text-[#171717]/60 hover:text-[#171717] uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3.5 rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98] ${
                isEmployed ? 'bg-[#176B52] hover:bg-[#135944]' : 'bg-[#F15B48] hover:bg-[#d94836]'
              }`}
            >
              <span>{currentStep === 6 ? (isSubmitting ? 'Submitting...' : 'Submit My Voice') : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
