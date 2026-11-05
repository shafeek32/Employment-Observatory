import { useState, useEffect } from 'react';
import { fetchDashboardOverview } from './services/api';
import type { DashboardOverviewData } from './types/analytics';
import type { EmploymentStatus } from './types/survey';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CreatorSection } from './components/layout/CreatorSection';

import { HeroSection } from './components/home/HeroSection';
import { ParticipationSection } from './components/home/ParticipationSection';
import { WhyParticipateSection } from './components/home/WhyParticipateSection';
import { PulseSection } from './components/home/PulseSection';
import { HumanStorytellingSection } from './components/home/HumanStorytellingSection';
import { FinalCTASection } from './components/home/FinalCTASection';

import { SurveyWizard } from './components/survey/SurveyWizard';
import { AnalyticsDashboard } from './components/dashboard/AnalyticsDashboard';

import { ShieldCheck, HeartHandshake, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'employed' | 'unemployed' | 'dashboard' | 'about'>('home');
  const [dashboardData, setDashboardData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchDashboardOverview();
      setDashboardData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalContributions = dashboardData?.macro.total_respondents ?? 0;

  const scrollToParticipate = () => {
    const el = document.getElementById('participate-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('home');
      setTimeout(() => {
        const target = document.getElementById('participate-section');
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleStartSurvey = (status: EmploymentStatus) => {
    setActiveView(status === 'EMPLOYED' ? 'employed' : 'unemployed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171717] font-sans selection:bg-[#F15B48] selection:text-white">
      {/* Site-wide Campaign Navbar */}
      <Navbar
        totalCount={totalContributions}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToParticipate={scrollToParticipate}
      />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* VIEW 1: COMPLETE REDESIGNED CAMPAIGN HOMEPAGE             */}
        {/* ========================================================= */}
        {activeView === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <HeroSection
              totalCount={totalContributions}
              onVoiceClick={scrollToParticipate}
              onExploreClick={() => {
                setActiveView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Participation Section (The Core Choice Arena) */}
            <ParticipationSection onSelectStatus={handleStartSurvey} />

            {/* 3. Why Participate Section (3 Transparent Steps) */}
            <WhyParticipateSection />

            {/* 4. National Employment Pulse (Real Aggregated Visualizations) */}
            {dashboardData && (
              <PulseSection
                data={dashboardData}
                onExploreFullData={() => {
                  setActiveView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 5. Human Storytelling Section ("Behind every number, there is a person") */}
            <HumanStorytellingSection />

            {/* 6. Final High-Impact Movement CTA */}
            <FinalCTASection onAddVoice={scrollToParticipate} />

            {/* 7. Creator Attribution Section (Shafeek Latheef) */}
            <CreatorSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: EMPLOYED SURVEY EXPERIENCE                        */}
        {/* ========================================================= */}
        {activeView === 'employed' && (
          <SurveyWizard
            initialStatus="EMPLOYED"
            onComplete={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 3: UNEMPLOYED SURVEY EXPERIENCE                      */}
        {/* ========================================================= */}
        {activeView === 'unemployed' && (
          <SurveyWizard
            initialStatus="UNEMPLOYED"
            onComplete={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCancel={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ========================================================= */}
        {/* VIEW 4: REDESIGNED CAMPAIGN ANALYTICS DASHBOARD           */}
        {/* ========================================================= */}
        {activeView === 'dashboard' && (
          <div>
            {loading || !dashboardData ? (
              <div className="py-24 text-center font-mono text-sm text-[#171717]/60">
                Loading aggregated national data...
              </div>
            ) : (
              <AnalyticsDashboard
                data={dashboardData}
                onStartSurvey={handleStartSurvey}
              />
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: ABOUT THE MOVEMENT                                */}
        {/* ========================================================= */}
        {activeView === 'about' && (
          <div className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#171717] text-white text-xs font-mono font-bold uppercase tracking-widest">
                CIVIC MISSION & PRINCIPLES
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#171717] tracking-tight">
                About India Employment Public Voice
              </h1>
              <p className="text-lg text-[#171717]/80 font-normal leading-relaxed">
                An independent, public-interest awareness platform documenting real-world employment and graduate outcomes across India.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-[#EEECE7] space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#F15B48]/10 text-[#F15B48] flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#171717]">Human-Centered</h3>
                <p className="text-sm text-[#171717]/70 leading-relaxed">
                  Moving beyond impersonal percentages to capture the real stories and career journeys of Indian graduates.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#EEECE7] space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#176B52]/10 text-[#176B52] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#171717]">Zero Surveillance</h3>
                <p className="text-sm text-[#171717]/70 leading-relaxed">
                  Zero phone numbers, no Aadhaar, no tracking cookies, and full deletion rights under DPDPA 2023.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#EEECE7] space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FF8A3D]/10 text-[#FF8A3D] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#171717]">Public Utility</h3>
                <p className="text-sm text-[#171717]/70 leading-relaxed">
                  Not a job board, recruitment firm, or resume database. Dedicated purely to public economic transparency.
                </p>
              </div>
            </div>

            {/* Demarcation Box */}
            <div className="bg-[#FAF9F6] border-2 border-[#EEECE7] rounded-3xl p-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#F15B48]">
                <AlertCircle className="w-5 h-5 text-[#F15B48]" />
                <span>Statutory Demarcation Statement</span>
              </div>
              <p className="text-sm text-[#171717]/80 leading-relaxed font-sans">
                These statistics reflect voluntary, self-selected survey responses contributed to this platform and do not represent official government metrics published by the Ministry of Statistics and Programme Implementation (MOSPI), the Periodic Labour Force Survey (PLFS), or the Reserve Bank of India (RBI).
              </p>
            </div>

            {/* Creator Attribution */}
            <CreatorSection />
          </div>
        )}
      </main>

      {/* Campaign Footer */}
      <Footer
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToParticipate={scrollToParticipate}
      />
    </div>
  );
}
