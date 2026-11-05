import React from 'react';
import { ArrowRight, BarChart2, ShieldCheck, Users } from 'lucide-react';

interface HeroSectionProps {
  totalCount: number;
  onVoiceClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalCount,
  onVoiceClick,
  onExploreClick
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#EEECE7]">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#FF8A3D]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#F15B48]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 text-center space-y-8">
        {/* Movement Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#EEECE7] text-[#171717] text-xs sm:text-sm font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#F15B48] animate-pulse"></span>
          <span>A Citizen-Driven Voice Movement Across 36 States & Union Territories</span>
        </div>

        {/* Commanding Oversized Headline */}
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-extrabold text-[#171717] tracking-tight leading-[1.06]">
            India has millions of dreams.
            <span className="block text-[#F15B48] mt-1 sm:mt-2">
              How many are still waiting for a job?
            </span>
          </h1>
        </div>

        {/* Empathetic Supporting Subhead */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[#171717]/80 font-normal leading-relaxed">
          Employment is more than a statistic. Every person's experience tells a story. Share yours and help create a clearer, honest picture of employment across India.
        </p>

        {/* Prominent Action CTA Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onVoiceClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#F15B48] hover:bg-[#d94836] active:scale-[0.98] text-white rounded-full font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:shadow-[#F15B48]/25 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>I WANT MY VOICE COUNTED</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#EEECE7] text-[#171717] border-2 border-[#171717] rounded-full font-bold text-sm sm:text-base tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <BarChart2 className="w-5 h-5" />
            <span>EXPLORE INDIA'S EMPLOYMENT PICTURE</span>
          </button>
        </div>

        {/* Live Verified Contribution Ticker */}
        <div className="pt-8 border-t border-[#EEECE7] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#171717]/70">
          <div className="flex items-center gap-2 font-semibold text-[#171717]">
            <Users className="w-4 h-4 text-[#F15B48]" />
            <span className="font-mono text-base font-bold num-tabular">{totalCount.toLocaleString()}</span>
            <span>Voices Added to Public Dataset</span>
          </div>
          <span className="hidden sm:inline text-[#EEECE7]">|</span>
          <div className="flex items-center gap-1.5 text-xs text-[#171717]/60">
            <ShieldCheck className="w-4 h-4 text-[#176B52]" />
            <span>100% Voluntary • Anonymous • Zero PII Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};
