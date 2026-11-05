import React from 'react';
import { MessageSquareText, Layers, LineChart, AlertCircle } from 'lucide-react';

export const WhyParticipateSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-y border-[#EEECE7]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#EEECE7] text-[#171717] text-xs font-bold uppercase tracking-widest">
            TRANSPARENT PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            How Your Voice Creates Transparency
          </h2>
          <p className="text-base sm:text-lg text-[#171717]/70 font-normal">
            Three straightforward steps to break the silence surrounding youth employment in India.
          </p>
        </div>

        {/* Three Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-[#FAF9F6] border border-[#EEECE7] rounded-3xl p-8 space-y-5 hover:border-[#F15B48] transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#F15B48]/10 text-[#F15B48] flex items-center justify-center font-bold text-xl group-hover:bg-[#F15B48] group-hover:text-white transition-colors">
              <MessageSquareText className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#F15B48] font-bold">
                STEP 01
              </div>
              <h3 className="text-xl font-bold text-[#171717]">
                SHARE YOUR EXPERIENCE
              </h3>
              <p className="text-sm text-[#171717]/70 leading-relaxed font-normal">
                Answer six straightforward, anonymous questions about your education, current status, and journey. Takes less than 90 seconds.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF9F6] border border-[#EEECE7] rounded-3xl p-8 space-y-5 hover:border-[#FF8A3D] transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#FF8A3D]/10 text-[#FF8A3D] flex items-center justify-center font-bold text-xl group-hover:bg-[#FF8A3D] group-hover:text-white transition-colors">
              <Layers className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#FF8A3D] font-bold">
                STEP 02
              </div>
              <h3 className="text-xl font-bold text-[#171717]">
                ADD YOUR VOICE
              </h3>
              <p className="text-sm text-[#171717]/70 leading-relaxed font-normal">
                Your response instantly combines with tens of thousands of other young Indians into an encrypted, public-interest research observatory.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF9F6] border border-[#EEECE7] rounded-3xl p-8 space-y-5 hover:border-[#176B52] transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-[#176B52]/10 text-[#176B52] flex items-center justify-center font-bold text-xl group-hover:bg-[#176B52] group-hover:text-white transition-colors">
              <LineChart className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-[#176B52] font-bold">
                STEP 03
              </div>
              <h3 className="text-xl font-bold text-[#171717]">
                SEE THE BIGGER PICTURE
              </h3>
              <p className="text-sm text-[#171717]/70 leading-relaxed font-normal">
                Explore real interactive charts, state-by-state comparisons, and engineering outcomes to help students and researchers understand reality.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Voluntary Demarcation Callout */}
        <div className="bg-[#FAF9F6] border border-[#EEECE7] rounded-2xl p-5 flex items-start sm:items-center gap-3.5 text-xs text-[#171717]/80 leading-relaxed font-sans">
          <AlertCircle className="w-5 h-5 text-[#F15B48] shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <strong>Important Clarification:</strong> This platform is an independent, voluntary public research project created for civic awareness. It is not an official government census, voting exercise, or statutory labour survey by MOSPI/PLFS.
          </div>
        </div>
      </div>
    </section>
  );
};
