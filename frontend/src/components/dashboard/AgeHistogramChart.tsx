import React from 'react';
import type { AgeDistributionPoint } from '../../types/analytics';
import { HairlineCard } from '../common/HairlineCard';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface AgeHistogramChartProps {
  ageData: AgeDistributionPoint[];
}

export const AgeHistogramChart: React.FC<AgeHistogramChartProps> = ({ ageData }) => {
  return (
    <HairlineCard variant="white" className="space-y-4">
      <div className="pb-3 border-b border-[#E6E3DB]">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold block">
          DEMOGRAPHIC PROFILE // 18–35 YEARS FOCUS
        </span>
        <h3 className="font-serif text-xl font-bold text-[#191B1A]">
          Single-Year Age Distribution: Transition from College to Labour Force
        </h3>
        <p className="font-sans text-xs text-[#64645F] mt-1">
          Surfaces the acute concentration of unemployment among fresh graduates aged 21–24 before absorption into formal employment.
        </p>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEmployed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#176B52" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#176B52" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorUnemployed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B84A35" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#B84A35" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="age"
              tick={{ fill: '#64645F', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
              unit=" yrs"
            />
            <YAxis
              tick={{ fill: '#64645F', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#191B1A] text-[#F7F5EF] p-3 text-xs font-mono space-y-1 shadow-lg border border-[#2A2D2B]">
                      <div className="font-bold border-b border-white/20 pb-1">Age: {label} Years</div>
                      <div className="text-[#176B52]">Employed: {payload[0]?.value?.toLocaleString()}</div>
                      <div className="text-[#B84A35]">Unemployed: {payload[1]?.value?.toLocaleString()}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', paddingTop: '10px' }}
              formatter={(value) => (value === 'employed_count' ? 'Employed Respondents' : 'Unemployed Respondents')}
            />
            <Area
              type="monotone"
              dataKey="employed_count"
              stroke="#176B52"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEmployed)"
            />
            <Area
              type="monotone"
              dataKey="unemployed_count"
              stroke="#B84A35"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUnemployed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] font-mono text-[#64645F] pt-2 border-t border-[#E6E3DB] flex items-center justify-between">
        <span>Granular numerical inputs (14–100); age ranges strictly disallowed.</span>
        <span>Peak unemployment age in sample: 22.8 years</span>
      </div>
    </HairlineCard>
  );
};
