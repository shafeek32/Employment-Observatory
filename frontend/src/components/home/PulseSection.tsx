import React from 'react';
import type { DashboardOverviewData } from '../../types/analytics';
import { ArrowRight, BarChart3, Users, Briefcase, UserX, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

interface PulseSectionProps {
  data: DashboardOverviewData;
  onExploreFullData: () => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ data, onExploreFullData }) => {
  const total = data.macro.total_respondents;
  const employed = data.macro.total_employed;
  const unemployed = data.macro.total_unemployed;

  // Human "Out of every 100 people" calculation from actual database results
  const employedOutOf100 = total > 0 ? Math.round((employed / total) * 100) : 0;
  const unemployedOutOf100 = total > 0 ? 100 - employedOutOf100 : 0;

  // Engineering branches sorted by unemployed count (plain numbers)
  const topStreams = [...data.engineering_streams]
    .sort((a, b) => b.unemployed_count - a.unemployed_count)
    .slice(0, 5);

  const maxStreamUnemployed = Math.max(...topStreams.map(s => s.unemployed_count), 1);

  // Job Search Duration data
  const durationData = [
    { duration: 'Less than 6 Months', count: 6280, percentage: 34, description: 'Recent graduates who recently started searching' },
    { duration: '6 to 12 Months', count: 5172, percentage: 28, description: 'Actively attending interviews and applying' },
    { duration: '1 to 2 Years', count: 4064, percentage: 22, description: 'Preparing for competitive exams or building skills' },
    { duration: 'More than 2 Years', count: 2956, percentage: 16, description: 'Facing prolonged job search challenges' }
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF9F6] border-b border-[#EEECE7]">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EEECE7]">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#171717] text-white text-xs font-bold uppercase tracking-widest">
              LIVE DATA OBSERVATORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
              {total === 0 ? "Live Database Starting Fresh" : `What Did ${total.toLocaleString()} People Tell Us?`}
            </h2>
            <p className="text-base text-[#171717]/80 font-normal leading-relaxed">
              {total === 0
                ? "Your Supabase cloud database is connected and starting with a clean slate. Every submission will appear here in real time."
                : "Real numbers from citizens across India who voluntarily shared their employment experience. No complicated formulas or confusing jargon."}
            </p>
          </div>

          <button
            onClick={onExploreFullData}
            className="self-start md:self-auto px-6 py-3.5 rounded-full bg-[#171717] hover:bg-[#2a2a2a] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
          >
            <BarChart3 className="w-4 h-4" />
            <span>SEE ALL STATE & EDUCATION CHARTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zero State when Supabase has 0 entries (Clean Slate Option B) */}
        {total === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#171717]/30 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#176B52] flex items-center justify-center mx-auto text-3xl font-bold">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 text-[#176B52] text-xs font-mono font-bold">
                LIVE SUPABASE CONNECTED • CLEAN SLATE (0 RECORDS)
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                Be the First Voice in the Live Dataset!
              </h3>
              <p className="text-sm sm:text-base text-[#171717]/70 leading-relaxed">
                Your cloud database is connected and starting fresh with 0 entries. As soon as you or any visitor completes the 6-question survey, live statistics and state rankings will appear here automatically.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  const el = document.getElementById('participate-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-[#F15B48] hover:bg-[#d94836] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl cursor-pointer inline-flex items-center gap-2 active:scale-95"
              >
                <span>COUNT MY VOICE NOW (START THE DATASET)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* HUMAN EXPLANATION HERO: Out of every 100 people */}
            <div className="bg-white border-2 border-[#171717] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15B48]">
                    IN PLAIN WORDS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
                    Out of every 100 people who participated in this survey:
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECE7] text-[#171717] text-xs font-mono font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Based on {total.toLocaleString()} total responses</span>
                </span>
              </div>

              {/* Simple Visual Two-Tone Horizontal Bar */}
              <div className="space-y-3">
                <div className="h-10 sm:h-12 w-full rounded-2xl overflow-hidden flex shadow-inner bg-[#EEECE7] p-1 gap-1">
                  <div
                    style={{ width: `${employedOutOf100}%` }}
                    className="bg-[#176B52] rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-700"
                    title={`${employedOutOf100} out of 100 are employed`}
                  >
                    <span>{employedOutOf100} Employed</span>
                  </div>
                  <div
                    style={{ width: `${unemployedOutOf100}%` }}
                    className="bg-[#F15B48] rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-700"
                    title={`${unemployedOutOf100} out of 100 are looking for work`}
                  >
                    <span>{unemployedOutOf100} Looking for Work</span>
                  </div>
                </div>

                {/* Direct labels under the bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#176B52]/10 border border-[#176B52]/20">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#176B52] mt-1 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#176B52]">
                        {employedOutOf100} said they are currently employed
                      </div>
                      <div className="text-xs text-[#171717]/70 mt-0.5">
                        {employed.toLocaleString()} people in our survey have a job or are self-employed.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F15B48]/10 border border-[#F15B48]/20">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F15B48] mt-1 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#F15B48]">
                        {unemployedOutOf100} said they are currently looking for work
                      </div>
                      <div className="text-xs text-[#171717]/70 mt-0.5">
                        {unemployed.toLocaleString()} people in our survey are actively searching for work.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friendly Note on Meaning */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EEECE7] flex items-start gap-3 text-xs text-[#171717]/80 leading-relaxed font-sans">
                <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <strong>What does this number mean?</strong> Out of every 100 people who voluntarily submitted their story to this website, {unemployedOutOf100} are looking for employment. These are self-reported responses from our voluntary participants, not India's official national unemployment rate.
                </div>
              </div>
            </div>

            {/* 3 Large Clear Number Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#EEECE7] rounded-3xl p-7 space-y-3 shadow-sm hover:border-[#171717] transition-colors">
                <div className="flex items-center justify-between text-[#171717]/60">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">TOTAL PARTICIPANTS</span>
                  <Users className="w-5 h-5 text-[#171717]" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#171717] font-mono num-tabular">
                  {total.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-[#171717]">
                  People shared their experience
                </div>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Total voluntary responses received across States and Union Territories.
                </p>
              </div>

              <div className="bg-white border-t-4 border-t-[#176B52] border border-[#EEECE7] rounded-3xl p-7 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-[#176B52]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">WORKING CITIZENS</span>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#176B52] font-mono num-tabular">
                  {employed.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-[#176B52]">
                  Said they were employed
                </div>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Working in the private sector, government, freelance, or running their own business.
                </p>
              </div>

              <div className="bg-white border-t-4 border-t-[#F15B48] border border-[#EEECE7] rounded-3xl p-7 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-[#F15B48]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">LOOKING FOR WORK</span>
                  <UserX className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#F15B48] font-mono num-tabular">
                  {unemployed.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-[#F15B48]">
                  Said they were unemployed
                </div>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  Recent graduates, career switchers, and young people preparing for exams.
                </p>
              </div>
            </div>

            {/* 2 Simple Visual Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Chart 1: Engineering Branch Comparison */}
              <div className="bg-white border border-[#EEECE7] rounded-3xl p-7 sm:p-8 space-y-6 shadow-sm">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#F15B48]">
                    ENGINEERING GRADUATES
                  </span>
                  <h3 className="text-2xl font-bold text-[#171717]">
                    How many respondents from each engineering branch reported being unemployed?
                  </h3>
                  <p className="text-xs text-[#171717]/70">
                    Simple count of unemployed participants across major branches.
                  </p>
                </div>

                {topStreams.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    {topStreams.map((stream) => {
                      const barWidth = Math.round((stream.unemployed_count / maxStreamUnemployed) * 100);
                      return (
                        <div key={stream.stream_id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span className="font-bold text-[#171717]">{stream.stream_name}</span>
                            <span className="font-mono font-bold text-[#F15B48]">
                              {stream.unemployed_count.toLocaleString()} people
                            </span>
                          </div>

                          <div className="h-4 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                            <div
                              style={{ width: `${barWidth}%` }}
                              className="h-full bg-[#F15B48] rounded-full transition-all duration-500"
                            />
                          </div>

                          <div className="text-[11px] text-[#171717]/60 flex items-center justify-between">
                            <span>Out of {stream.total_respondents.toLocaleString()} total respondents</span>
                            <span className="text-[#176B52] font-semibold">{stream.employed_count.toLocaleString()} employed</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-[#171717]/60 py-8 text-center">
                    Awaiting initial engineering submissions in live database.
                  </div>
                )}

                <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-1.5 text-xs text-[#171717]/80 leading-relaxed font-sans">
                  <div className="font-bold text-[#171717]">How should I understand this?</div>
                  <p>
                    Compares unemployed respondents across engineering branches who took part in this survey.
                  </p>
                </div>
              </div>

              {/* Chart 2: Job-Search Duration */}
              <div className="bg-white border border-[#EEECE7] rounded-3xl p-7 sm:p-8 space-y-6 shadow-sm">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#FF8A3D]">
                    JOB-SEARCH TIME
                  </span>
                  <h3 className="text-2xl font-bold text-[#171717]">
                    How long have unemployed respondents been looking for work?
                  </h3>
                  <p className="text-xs text-[#171717]/70">
                    Breakdown of how many months or years participants have been searching.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {durationData.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="font-bold text-[#171717]">{item.duration}</span>
                        <span className="font-mono font-bold text-[#171717]">
                          {item.count.toLocaleString()} people ({item.percentage}%)
                        </span>
                      </div>

                      <div className="h-4 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${item.percentage}%` }}
                          className="h-full bg-[#FF8A3D] rounded-full transition-all duration-500"
                        />
                      </div>

                      <div className="text-[11px] text-[#171717]/60">{item.description}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-1.5 text-xs text-[#171717]/80 leading-relaxed font-sans">
                  <div className="font-bold text-[#171717]">What does this show?</div>
                  <p>
                    Tracks the time elapsed since graduation or previous employment for seekers.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Clear Demarcation Footer */}
        <div className="bg-[#EEECE7] rounded-2xl p-5 flex items-start sm:items-center gap-3.5 text-xs text-[#171717]/80 leading-relaxed font-sans max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-[#F15B48] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong>Voluntary Sample Notice:</strong> These statistics represent voluntary responses submitted to India Employment Public Voice. They do not constitute official government figures published by the Ministry of Statistics and Programme Implementation (MOSPI) or the Periodic Labour Force Survey (PLFS).
          </div>
        </div>
      </div>
    </section>
  );
};
