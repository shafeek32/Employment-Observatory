import React from 'react';
import { Compass, GraduationCap, Sparkles, BookOpen } from 'lucide-react';

export const HumanStorytellingSection: React.FC = () => {
  const stories = [
    {
      icon: GraduationCap,
      category: 'The First-Generation Dream',
      headline: 'Four years of sacrifice to cross the degree line.',
      body: 'In hundreds of Tier-2 and Tier-3 colleges across India, parents invest life savings into an engineering degree. Yet on graduation day, without campus placement drives or insider referrals, young graduates face months of quiet uncertainty.',
      reflection: 'Education gave them the degree, but the job market demands connections they never had.'
    },
    {
      icon: Compass,
      category: 'The Government Aspirant',
      headline: 'The quiet rooms of competitive exam preparation.',
      body: 'From Mukherjee Nagar in Delhi to libraries in Patna, Prayagraj, and Kozhikode, millions of youth spend their mid-twenties preparing for SSC, UPSC, and State PSC examinations — caught between family hopes and delayed exam calendars.',
      reflection: 'They are not idle. They are putting life on hold for a sliver of economic security.'
    },
    {
      icon: BookOpen,
      category: 'The Forced Career Pivot',
      headline: 'Studying core sciences, coding by midnight.',
      body: 'Mechanical, Civil, and Electrical graduates who dreamed of building physical infrastructure, but found zero core openings. Today, they teach themselves web development at night to qualify for entry-level tech roles.',
      reflection: 'Adaptability is high, but the national waste of specialized talent is heartbreaking.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-white border-b border-[#EEECE7]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF8A3D]/10 text-[#FF8A3D] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE HUMAN REALITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            Behind every number, there is a person.
          </h2>
          <p className="text-base sm:text-lg text-[#171717]/70 font-normal">
            Macro percentages often mask the daily quiet resilience, family expectations, and sleepless nights of India's youth.
          </p>
        </div>

        {/* Narrative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => {
            const Icon = story.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF9F6] border border-[#EEECE7] rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15B48]">
                      {story.category}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F15B48]/10 text-[#F15B48] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#171717] leading-snug">
                    {story.headline}
                  </h3>

                  <p className="text-sm text-[#171717]/75 leading-relaxed font-normal">
                    {story.body}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEECE7] text-xs font-sans italic text-[#171717]/80 leading-normal">
                  "{story.reflection}"
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Disclosure Badge */}
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EEECE7] text-[11px] font-mono text-[#171717]/70">
            * Note: These stories are illustrative composites reflecting recurring patterns documented across survey responses, not real named individuals.
          </span>
        </div>
      </div>
    </section>
  );
};
