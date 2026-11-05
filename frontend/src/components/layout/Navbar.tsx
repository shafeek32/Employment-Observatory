import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Flame } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  activeView: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'about';
  onNavigate: (view: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'about') => void;
  onScrollToParticipate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  activeView,
  onNavigate,
  onScrollToParticipate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'about') => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EEECE7]">
      {/* Top Movement Ticker */}
      <div className="bg-[#171717] text-white px-4 sm:px-8 py-2 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F15B48] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F15B48]"></span>
          </span>
          <span className="font-semibold tracking-wide">NATIONAL CITIZEN VOICE MOVEMENT</span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-white/70">Voluntary Crowdsourced Economic Reality</span>
        </div>
        <div className="flex items-center gap-3 font-semibold text-white">
          <span className="text-[#FF8A3D] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-[#FF8A3D]" />
            <span className="num-tabular font-bold">{totalCount.toLocaleString()}</span>
          </span>
          <span className="text-white/80">Voices Counted</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNav('home')}
          className="text-left group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-[#F15B48] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            V
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl text-[#171717] tracking-tight leading-none group-hover:text-[#F15B48] transition-colors">
              Public Voice India
            </div>
            <div className="text-[11px] font-medium text-[#171717]/60 tracking-wider uppercase mt-0.5">
              Employment Observatory
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#171717]">
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors cursor-pointer hover:text-[#F15B48] ${
              activeView === 'home' ? 'text-[#F15B48] border-b-2 border-[#F15B48] pb-1' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              if (activeView === 'home') {
                onScrollToParticipate();
              } else {
                handleNav('home');
                setTimeout(onScrollToParticipate, 100);
              }
            }}
            className="transition-colors cursor-pointer hover:text-[#F15B48]"
          >
            Participate
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className={`transition-colors cursor-pointer hover:text-[#F15B48] ${
              activeView === 'dashboard' ? 'text-[#F15B48] border-b-2 border-[#F15B48] pb-1' : ''
            }`}
          >
            Employment Data
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`transition-colors cursor-pointer hover:text-[#F15B48] ${
              activeView === 'about' ? 'text-[#F15B48] border-b-2 border-[#F15B48] pb-1' : ''
            }`}
          >
            About
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              if (activeView === 'home') {
                onScrollToParticipate();
              } else {
                handleNav('home');
                setTimeout(onScrollToParticipate, 100);
              }
            }}
            className="px-5 py-2.5 bg-[#F15B48] hover:bg-[#d94836] active:scale-[0.98] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <span>COUNT MY VOICE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#171717] hover:bg-[#EEECE7] transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EEECE7] bg-[#FAF9F6] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 font-semibold text-base">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 hover:text-[#F15B48]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (activeView === 'home') {
                  onScrollToParticipate();
                } else {
                  handleNav('home');
                  setTimeout(onScrollToParticipate, 150);
                }
              }}
              className="text-left py-2 hover:text-[#F15B48]"
            >
              Participate
            </button>
            <button
              onClick={() => handleNav('dashboard')}
              className="text-left py-2 hover:text-[#F15B48]"
            >
              Employment Data
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 hover:text-[#F15B48]"
            >
              About
            </button>
          </div>

          <div className="pt-2 border-t border-[#EEECE7]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToParticipate();
              }}
              className="w-full py-3.5 bg-[#F15B48] text-white rounded-full font-bold text-sm uppercase tracking-wider text-center cursor-pointer shadow-md"
            >
              COUNT MY VOICE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
