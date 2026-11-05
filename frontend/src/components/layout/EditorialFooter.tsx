import React from 'react';

interface EditorialFooterProps {
  onNavigate: (view: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'methodology') => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#191B1A] text-[#F7F5EF] pt-14 pb-12 px-4 sm:px-8 border-t border-[#191B1A]">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2A2D2B]">
          {/* Colophon & Identity */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E6E3DB]/60">
              NATIONAL CIVIC STATISTICAL OBSERVATORY
            </span>
            <h4 className="font-serif text-2xl font-bold tracking-tight text-[#F7F5EF]">
              India Employment Intelligence Platform
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#E6E3DB]/70 max-w-md leading-relaxed">
              An independent, public-interest research observatory analyzing graduate employment realities, engineering disciplines, and economic transitions across India through voluntary citizen contributions.
            </p>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#E6E3DB]/60 font-semibold">
              Index & Portals
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#E6E3DB]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Front Page & Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-[#E6E3DB]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Public Analytics Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('employed')}
                  className="text-[#176B52] hover:text-[#259b79] transition-colors cursor-pointer"
                >
                  Employed Cohort Survey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('unemployed')}
                  className="text-[#B84A35] hover:text-[#d45e46] transition-colors cursor-pointer"
                >
                  Unemployed Cohort Survey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="text-[#E6E3DB]/80 hover:text-white transition-colors cursor-pointer"
                >
                  Methodology & Demarcation
                </button>
              </li>
            </ul>
          </div>

          {/* Data Ethics & Disclaimers */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#E6E3DB]/60 font-semibold">
              Data Principles
            </span>
            <p className="text-xs text-[#E6E3DB]/70 leading-relaxed font-sans">
              Operates under strict data minimization. Zero resumes, zero job listings, zero advertiser tracking, zero paywalls. Differential privacy floor enforced at $k \ge 5$.
            </p>
          </div>
        </div>

        {/* Bottom Statutory Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-[#E6E3DB]/50 gap-4">
          <div>
            © {new Date().getFullYear()} India Employment Intelligence Platform. Public-interest open data project.
          </div>
          <div>
            Not affiliated with MOSPI, NSSO, or RBI.
          </div>
        </div>
      </div>
    </footer>
  );
};
