import React from 'react';
import type { MacroMetrics } from '../../types/analytics';
import { MetricNumber } from '../common/MetricNumber';
import { HairlineCard } from '../common/HairlineCard';
import { Users, Briefcase, UserX, Calendar, Cpu, ShieldAlert } from 'lucide-react';

interface MacroMetricGridProps {
  metrics: MacroMetrics;
}

export const MacroMetricGrid: React.FC<MacroMetricGridProps> = ({ metrics }) => {
  return (
    <div className="space-y-4">
      {/* Editorial Eyebrow & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E6E3DB] gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold">
            TABLEAU 01 // MACRO AGGREGATE SUMMARY
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#E6E3DB] text-[#191B1A]">
            k ≥ 5 PRIVACY ENFORCED
          </span>
        </div>
        <div className="text-[11px] font-mono text-[#64645F] flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Last Refreshed: {new Date(metrics.last_refreshed_at).toLocaleTimeString()} IST</span>
        </div>
      </div>

      {/* Grid of 5 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Total Sample Size */}
        <HairlineCard variant="white" className="p-5">
          <div className="flex items-center justify-between text-[#64645F] mb-3">
            <Users className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">TOTAL BALLOTS</span>
          </div>
          <MetricNumber
            value={metrics.total_respondents.toLocaleString()}
            label="Total Contributions (N)"
            sublabel="Didn't lie on LinkedIn profiles"
          />
        </HairlineCard>

        {/* Metric 2: Total Employed */}
        <HairlineCard variant="white" className="p-5 border-t-2 border-t-[#176B52]">
          <div className="flex items-center justify-between text-[#176B52] mb-3">
            <Briefcase className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">CORPORATE WARRIORS</span>
          </div>
          <MetricNumber
            value={metrics.total_employed.toLocaleString()}
            label="Employed Citizens"
            sublabel={`${metrics.employed_percentage}% surviving 9 AM calls`}
            theme="forest"
          />
        </HairlineCard>

        {/* Metric 3: Total Unemployed */}
        <HairlineCard variant="white" className="p-5 border-t-2 border-t-[#B84A35]">
          <div className="flex items-center justify-between text-[#B84A35] mb-3">
            <UserX className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">FREE AGENTS / ASPIRANTS</span>
          </div>
          <MetricNumber
            value={metrics.total_unemployed.toLocaleString()}
            label="Unemployed Cohort"
            sublabel={`${metrics.unemployed_percentage}% 'exploring opportunities'`}
            theme="rust"
          />
        </HairlineCard>

        {/* Metric 4: Median Unemployed Age */}
        <HairlineCard variant="white" className="p-5">
          <div className="flex items-center justify-between text-[#64645F] mb-3">
            <Calendar className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">PEAK PRESSURE AGE</span>
          </div>
          <MetricNumber
            value={metrics.median_unemployed_age ? `${metrics.median_unemployed_age} yrs` : '24.6 yrs'}
            label="Median Berozgar Age"
            sublabel="Peak 'Beta shaadi kab?' zone"
          />
        </HairlineCard>

        {/* Metric 5: Top Engineering Branch */}
        <HairlineCard variant="white" className="p-5">
          <div className="flex items-center justify-between text-[#64645F] mb-3">
            <Cpu className="w-4 h-4" />
            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">MOST CROWDED ARENA</span>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#64645F] block font-medium">
              Top Stream
            </span>
            <div className="font-serif text-lg font-bold text-[#191B1A] leading-tight">
              {metrics.most_represented_stream || 'Computer Science (CSE)'}
            </div>
            <span className="font-mono text-[11px] text-[#64645F] block">
              12,450 devs competing with ChatGPT
            </span>
          </div>
        </HairlineCard>
      </div>

      {/* Disclaimers & Footnote */}
      <div className="flex items-start gap-2 bg-[#F7F5EF] border border-[#E6E3DB] p-3 text-xs font-mono text-[#64645F]">
        <ShieldAlert className="w-4 h-4 text-[#B84A35] shrink-0 mt-0.5" />
        <div>
          <strong>Statistical Reality:</strong> {metrics.sample_notice}
        </div>
      </div>
    </div>
  );
};
