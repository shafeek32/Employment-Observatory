import React from 'react';
import { Globe, Mail, ArrowUpRight } from 'lucide-react';

export const CreatorSection: React.FC = () => {
  return (
    <section 
      aria-label="About the Creator"
      className="bg-[#FAF9F6] py-16 sm:py-24 px-4 sm:px-8 border-t border-[#EEECE7]"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#171717]"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#171717]/60">
            ABOUT THE CREATOR & BUILDER
          </span>
        </div>

        {/* Modern Campaign Container */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Creator Bio */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-[#EEECE7] text-xs font-mono font-semibold text-[#171717]">
              Software Engineer • Full-Stack Developer • AI & Systems Builder
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Shafeek Latheef
            </h3>

            <p className="text-base text-[#171717]/80 leading-relaxed font-normal max-w-xl">
              A Computer Science graduate from Kerala, India, passionate about building useful technology products and exploring how technology can solve real-world problems.
            </p>

            <div className="pt-2 text-xs font-mono text-[#171717]/60 leading-normal border-t border-[#EEECE7]">
              Built as an independent public-interest research and participation initiative to document grassroots educational realities and employment dynamics across India.
            </div>
          </div>

          {/* Right Column: Clickable Channels Grid */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60 mb-1">
              Personal Channels & Portfolio
            </span>

            {/* Portfolio Link */}
            <a
              href="https://shafeektech.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#171717] hover:text-white border border-[#EEECE7] transition-all duration-200 min-h-[52px]"
              aria-label="Visit Shafeek Latheef's Portfolio"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#171717] group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="font-bold text-xs uppercase tracking-wider">
                    Personal Portfolio
                  </div>
                  <div className="text-xs text-[#171717]/60 group-hover:text-white/70 font-mono">
                    shafeektech.site
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#171717]/40 group-hover:text-white transition-colors" />
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/shafeek32"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#171717] hover:text-white border border-[#EEECE7] transition-all duration-200 min-h-[52px]"
              aria-label="Visit Shafeek Latheef's GitHub"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 fill-current text-[#171717] group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <div className="text-left">
                  <div className="font-bold text-xs uppercase tracking-wider">
                    GitHub Profile
                  </div>
                  <div className="text-xs text-[#171717]/60 group-hover:text-white/70 font-mono">
                    github.com/shafeek32
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#171717]/40 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/shafeek-latheef/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#171717] hover:text-white border border-[#EEECE7] transition-all duration-200 min-h-[52px]"
              aria-label="Visit Shafeek Latheef's LinkedIn"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 fill-current text-[#171717] group-hover:text-white transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.59 1.59 0 1 0 1.59 1.59c0-.88-.71-1.59-1.59-1.59z" />
                </svg>
                <div className="text-left">
                  <div className="font-bold text-xs uppercase tracking-wider">
                    LinkedIn Network
                  </div>
                  <div className="text-xs text-[#171717]/60 group-hover:text-white/70 font-mono">
                    linkedin.com/in/shafeek-latheef
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#171717]/40 group-hover:text-white transition-colors" />
            </a>

            {/* Email Link */}
            <a
              href="mailto:shafeekl2002@gmail.com"
              className="group flex items-center justify-between p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#171717] hover:text-white border border-[#EEECE7] transition-all duration-200 min-h-[52px]"
              aria-label="Email Shafeek Latheef"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#171717] group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="font-bold text-xs uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-xs text-[#171717]/60 group-hover:text-white/70 font-mono">
                    shafeekl2002@gmail.com
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#171717]/40 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
