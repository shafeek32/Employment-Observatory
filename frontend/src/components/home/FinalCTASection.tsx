import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FinalCTASectionProps {
  onAddVoice: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onAddVoice }) => {
  return (
    <section className="relative overflow-hidden bg-[#171717] text-white py-24 sm:py-32 px-4 sm:px-8">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F15B48]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>JOIN THE COLLECTIVE PICTURE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
          Your experience should not remain invisible.
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed font-normal">
          Whether you are navigating job boards or working in your dream role, your voluntary submission helps build genuine transparency for Indian youth.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onAddVoice}
            className="w-full sm:w-auto px-10 py-5 bg-[#F15B48] hover:bg-[#d94836] active:scale-[0.98] text-white rounded-full font-extrabold text-base tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl hover:shadow-[#F15B48]/30 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>ADD MY VOICE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted at rest</span>
          </div>
          <span>•</span>
          <div>Zero government paperwork</div>
          <span>•</span>
          <div>Takes under 90 seconds</div>
        </div>
      </div>
    </section>
  );
};
