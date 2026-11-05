import React from 'react';
import { Briefcase, UserX, ArrowRight, Shield, Clock } from 'lucide-react';
import type { EmploymentStatus } from '../../types/survey';

interface ParticipationSectionProps {
  onSelectStatus: (status: EmploymentStatus) => void;
}

export const ParticipationSection: React.FC<ParticipationSectionProps> = ({ onSelectStatus }) => {
  return (
    <section id="participate-section" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#F15B48]/10 text-[#F15B48] text-xs font-bold uppercase tracking-widest">
            THE NATIONAL PARTICIPATION ARENA
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            Stand Up and Make Your Reality Count
          </h2>
          <p className="text-base sm:text-lg text-[#171717]/70 font-normal">
            Every entry bridges the gap between official silence and lived reality. Select your current status to contribute your anonymous voice.
          </p>
        </div>

        {/* Two Massive Visually Distinct Participation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card A: I AM EMPLOYED */}
          <div className="relative rounded-3xl bg-[#171717] text-white p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#171717] hover:border-[#176B52] group">
            {/* Top Badge & Icon */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#176B52] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                ACTIVE WORKFORCE
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                I AM EMPLOYED
              </h3>
              <p className="text-base text-white/80 leading-relaxed font-normal">
                Working today? Share your employment experience and help understand India's workforce.
              </p>
              <div className="text-xs text-white/60 font-mono flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-[#176B52]" />
                <span>Takes less than 90 seconds • 6 simple questions</span>
              </div>
            </div>

            {/* Big Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectStatus('EMPLOYED')}
                className="w-full py-5 px-6 rounded-2xl bg-[#176B52] hover:bg-[#135944] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg group-hover:shadow-emerald-900/40"
              >
                <span>COUNT MY VOICE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card B: I AM UNEMPLOYED */}
          <div className="relative rounded-3xl bg-white text-[#171717] p-8 sm:p-12 flex flex-col justify-between space-y-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#F15B48] group">
            {/* Top Badge & Icon */}
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-[#F15B48] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-200 animate-pulse"></span>
                LOOKING FOR WORK
              </span>
              <div className="w-12 h-12 rounded-2xl bg-[#F15B48]/10 flex items-center justify-center text-[#F15B48]">
                <UserX className="w-6 h-6" />
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                I AM UNEMPLOYED
              </h3>
              <p className="text-base text-[#171717]/80 leading-relaxed font-normal">
                Looking for work? Your experience matters. Help show the reality behind the numbers.
              </p>
              <div className="text-xs text-[#171717]/60 font-mono flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-[#F15B48]" />
                <span>Takes less than 90 seconds • Completely anonymous</span>
              </div>
            </div>

            {/* Big Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onSelectStatus('UNEMPLOYED')}
                className="w-full py-5 px-6 rounded-2xl bg-[#F15B48] hover:bg-[#d94836] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg group-hover:shadow-rose-900/25"
              >
                <span>COUNT MY VOICE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Reassuring Guarantee Notice */}
        <div className="bg-[#EEECE7] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#171717]/70">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#176B52]" />
            <span>Strict K-Anonymity guarantee ($k \ge 5$) • No phone numbers or Aadhaar • DPDPA 2023 deletion keys</span>
          </div>
          <div>
            100% Non-governmental public research
          </div>
        </div>
      </div>
    </section>
  );
};
