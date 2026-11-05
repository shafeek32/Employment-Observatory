import React from 'react';
import { AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const MethodologyNote: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E6E3DB] p-6 sm:p-8 my-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-[#B84A35]" />
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-bold">
          STATUTORY DEMARCATION & METHODOLOGY STATEMENT
        </span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl text-[#191B1A] font-bold mb-3 leading-snug">
        Voluntary Public Sample vs. Official National Statistics
      </h3>

      <div className="space-y-4 font-sans text-sm text-[#191B1A] leading-relaxed">
        <p className="p-3.5 bg-[#F7F5EF] border-l-2 border-[#191B1A] font-serif italic text-[#191B1A]">
          "These statistics reflect voluntary, anonymous survey responses submitted to the India Employment Intelligence Platform and do not represent official government metrics published by the Ministry of Statistics and Programme Implementation (MOSPI), the Periodic Labour Force Survey (PLFS), or the Reserve Bank of India (RBI)."
        </p>

        <p>
          Official national unemployment rates are generated via multi-stage stratified random sampling conducted by the National Sample Survey Office (NSSO). In contrast, this platform operates as an open-access, crowd-sourced demographic observatory designed to illuminate self-reported graduate realities, engineering branch trends, and young citizens' lived experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="border border-[#E6E3DB] p-4 bg-[#F7F5EF]/50">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#176B52] mb-2">
              <CheckCircle2 className="w-4 h-4" />
              Platform Guarantees
            </div>
            <ul className="text-xs text-[#64645F] space-y-1.5 list-disc list-inside">
              <li>Names are strictly optional and never published.</li>
              <li>No phone numbers, Aadhaar, or precise GPS collected.</li>
              <li>K-Anonymity floor ($k \ge 5$) applied on all filters.</li>
              <li>100% open-access public data without paywalls.</li>
            </ul>
          </div>

          <div className="border border-[#E6E3DB] p-4 bg-[#F7F5EF]/50">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#64645F] mb-2">
              <FileText className="w-4 h-4" />
              Reference Baselines
            </div>
            <ul className="text-xs text-[#64645F] space-y-1.5 list-disc list-inside">
              <li>Periodic Labour Force Survey (PLFS) Annual Reports.</li>
              <li>Ministry of Statistics & Programme Implementation (MOSPI).</li>
              <li>AISHE (All India Survey on Higher Education).</li>
              <li>Census of India demographic baselines.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
