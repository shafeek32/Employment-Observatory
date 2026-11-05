import React from 'react';
import type { EngineeringStreamAggregate } from '../../types/analytics';
import { HairlineCard } from '../common/HairlineCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface EngineeringBranchChartProps {
  streams: EngineeringStreamAggregate[];
}

export const EngineeringBranchChart: React.FC<EngineeringBranchChartProps> = ({ streams }) => {
  const sorted = [...streams].sort((a, b) => b.sample_unemployed_ratio - a.sample_unemployed_ratio);

  return (
    <HairlineCard variant="white" className="space-y-4">
      <div className="pb-3 border-b border-[#E6E3DB]">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold block">
          ENGINEERING DISCIPLINES // B.TECH / B.E. FOCUS
        </span>
        <h3 className="font-serif text-xl font-bold text-[#191B1A]">
          Branch-Wise Engineering Unemployment Ratio in Sample
        </h3>
        <p className="font-sans text-xs text-[#64645F] mt-1">
          Comparing employment outcomes across engineering specializations (Computer Science, Core Engineering, Electronics).
        </p>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sorted}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis
              type="number"
              unit="%"
              domain={[0, 60]}
              tick={{ fill: '#64645F', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="stream_name"
              width={140}
              tick={{ fill: '#191B1A', fontSize: 11, fontFamily: 'Inter' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload as EngineeringStreamAggregate;
                  return (
                    <div className="bg-[#191B1A] text-[#F7F5EF] p-3 text-xs font-mono space-y-1 shadow-lg border border-[#2A2D2B]">
                      <div className="font-bold border-b border-white/20 pb-1">{d.stream_name}</div>
                      <div>Sample Total: {d.total_respondents.toLocaleString()}</div>
                      <div className="text-[#176B52]">Employed: {d.employed_count.toLocaleString()}</div>
                      <div className="text-[#B84A35]">Unemployed: {d.unemployed_count.toLocaleString()}</div>
                      <div className="font-bold text-[#B84A35]">Unemployed Ratio: {d.sample_unemployed_ratio}%</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="sample_unemployed_ratio" radius={[0, 3, 3, 0]}>
              {sorted.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.sample_unemployed_ratio > 45 ? '#B84A35' : '#191B1A'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#E6E3DB] text-xs font-mono">
        <div className="p-2.5 bg-[#F7F5EF] border border-[#E6E3DB]">
          <span className="text-[#64645F] block text-[10px] uppercase">Lowest Unemployment</span>
          <span className="font-bold text-[#176B52]">Information Tech (29.7%)</span>
        </div>
        <div className="p-2.5 bg-[#F7F5EF] border border-[#E6E3DB]">
          <span className="text-[#64645F] block text-[10px] uppercase">Highest Unemployment</span>
          <span className="font-bold text-[#B84A35]">Civil Engineering (51.8%)</span>
        </div>
        <div className="p-2.5 bg-[#F7F5EF] border border-[#E6E3DB]">
          <span className="text-[#64645F] block text-[10px] uppercase">Largest Inflow</span>
          <span className="font-bold text-[#191B1A]">Computer Science (N=12,450)</span>
        </div>
      </div>
    </HairlineCard>
  );
};
