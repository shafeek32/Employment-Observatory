import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'employed' | 'unemployed' | 'dashboard' | 'about') => void;
  onScrollToParticipate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToParticipate }) => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 px-4 sm:px-8 border-t border-[#171717]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Mission & Brand */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F15B48] flex items-center justify-center text-white font-bold text-sm">
                V
              </div>
              <h4 className="text-xl font-extrabold text-white tracking-tight">
                Public Voice India
              </h4>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed font-normal">
              An independent, public-interest awareness platform and collective voice movement. Documenting youth employment, educational outcomes, and economic transitions across India through voluntary citizen participation.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict K-Anonymity (k ≥ 5) • Zero Commercial Monetization</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white/40">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToParticipate}
                  className="text-[#F15B48] hover:text-[#ff7867] transition-colors cursor-pointer font-bold"
                >
                  Count My Voice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Employment Data & Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  About the Movement
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Demarcation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-white/40">
              Important Demarcation
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              These statistics reflect voluntary survey responses submitted to this independent platform. They do not represent official government metrics published by MOSPI, PLFS, or the Reserve Bank of India.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-4">
          <div className="flex items-center gap-1.5">
            <span>Built with dedication for India's youth</span>
            <Heart className="w-3.5 h-3.5 text-[#F15B48] fill-[#F15B48]" />
          </div>
          <div>
            © {new Date().getFullYear()} India Employment Public Voice • Open Public-Interest Project
          </div>
        </div>
      </div>
    </footer>
  );
};
