import React, { useState, useEffect } from 'react';
import { ShieldCheck, BarChart3, Clock, Vote } from 'lucide-react';

interface MastheadProps {
  totalCount: number;
  onNavigate: (view: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'methodology') => void;
  activeView: string;
}

export const Masthead: React.FC<MastheadProps> = ({
  totalCount,
  onNavigate,
  activeView
}) => {
  const [istTime, setIstTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setIstTime(`${new Intl.DateTimeFormat('en-GB', options).format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-[#E6E3DB] bg-[#F7F5EF] sticky top-0 z-40">
      {/* Top Utility Dispatch Bar */}
      <div className="border-b border-[#E6E3DB] px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#64645F] bg-[#F7F5EF]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#191B1A]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            LIVE BEROZGARI TALLY
          </span>
          <span className="hidden sm:inline text-[#E6E3DB]">/</span>
          <span className="hidden md:inline text-amber-800">☕ CHAI PE CHARCHA INDEX: CRITICAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#64645F]" />
            <span className="num-tabular">{istTime || '15:30:00 IST'}</span>
          </span>
          <span className="text-[#E6E3DB]">/</span>
          <span className="text-[#191B1A] font-bold">
            <span className="num-tabular">{totalCount.toLocaleString()}</span> VOTES CAST
          </span>
        </div>
      </div>

      {/* Primary Newspaper Brand Masthead */}
      <div className="px-4 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#64645F] font-bold mb-0.5">
              AN INDEPENDENT SATIRICAL PUBLIC-INTEREST OBSERVATORY
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#191B1A] font-black tracking-tight leading-none group-hover:text-[#64645F] transition-colors">
              India Employment Intelligence
            </h1>
          </button>
        </div>

        {/* Navigation Action Buttons — HIGHLIGHTED VOTING BUTTONS */}
        <nav className="flex items-center flex-wrap gap-2 sm:gap-2.5" aria-label="Main Navigation">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-2 font-mono text-xs uppercase tracking-wider font-semibold border transition-editorial flex items-center gap-1.5 cursor-pointer ${
              activeView === 'dashboard'
                ? 'bg-[#191B1A] text-[#F7F5EF] border-[#191B1A]'
                : 'bg-white text-[#191B1A] border-[#E6E3DB] hover:border-[#191B1A]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public</span> Dashboard
          </button>

          {/* HIGHLIGHTED VOTE BUTTON: EMPLOYED */}
          <button
            onClick={() => onNavigate('employed')}
            className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider font-bold border-2 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md ${
              activeView === 'employed'
                ? 'bg-[#176B52] text-[#F7F5EF] border-[#176B52]'
                : 'bg-[#176B52] text-white border-[#176B52] hover:bg-[#125541]'
            }`}
          >
            <Vote className="w-3.5 h-3.5 text-emerald-200" />
            <span>Vote Employed</span>
          </button>

          {/* HIGHLIGHTED VOTE BUTTON: UNEMPLOYED */}
          <button
            onClick={() => onNavigate('unemployed')}
            className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider font-bold border-2 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md ${
              activeView === 'unemployed'
                ? 'bg-[#B84A35] text-[#F7F5EF] border-[#B84A35]'
                : 'bg-[#B84A35] text-white border-[#B84A35] hover:bg-[#993b28]'
            }`}
          >
            <Vote className="w-3.5 h-3.5 text-amber-200" />
            <span>Vote Unemployed</span>
          </button>

          <button
            onClick={() => onNavigate('methodology')}
            className={`px-2.5 py-2 font-mono text-xs uppercase tracking-wider text-[#64645F] hover:text-[#191B1A] border border-transparent hover:border-[#E6E3DB] transition-editorial flex items-center gap-1 cursor-pointer ${
              activeView === 'methodology' ? 'font-bold text-[#191B1A] border-[#E6E3DB]' : ''
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Methodology</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
