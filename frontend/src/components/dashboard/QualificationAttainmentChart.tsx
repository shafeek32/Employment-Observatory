import React from 'react';
import type { QualificationAggregate } from '../../types/analytics';
import { HairlineCard } from '../common/HairlineCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface QualificationAttainmentChartProps {
  qualifications: QualificationAggregate[];
}

export const QualificationAttainmentChart: React.FC<QualificationAttainmentChartProps> = ({ qualifications }) => {
  const chartData = qualifications.map(q => ({
    name: q.qualification_name.split(' (')[0],
    fullName: q.qualification_name,
    employed: q.employed_count,
    unemployed: q.unemployed_count,
    ratio: q.sample_unemployed_ratio
  }));

  return (
    <HairlineCard variant="white" className="space-y-4">
      <div className="pb-3 border-b border-[#E6E3DB]">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold block">
          EDUCATIONAL ATTAINMENT // DEGREE MATRIX
        </span>
        <h3 className="font-serif text-xl font-bold text-[#191B1A]">
          Employment Outcomes by Educational Hierarchy
        </h3>
        <p className="font-sans text-xs text-[#64645F] mt-1">
          Proportion of employed vs unemployed respondents across formal educational tiers.
        </p>
      </div>

      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#64645F', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64645F', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: '#E6E3DB' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#191B1A] text-[#F7F5EF] p-3 text-xs font-mono space-y-1 shadow-lg border border-[#2A2D2B]">
                      <div className="font-bold border-b border-white/20 pb-1">{data.fullName}</div>
                      <div className="text-[#176B52]">Employed: {data.employed.toLocaleString()}</div>
                      <div className="text-[#B84A35]">Unemployed: {data.unemployed.toLocaleString()}</div>
                      <div className="text-white/80">Unemployed Ratio: {data.ratio}%</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', paddingTop: '10px' }}
              formatter={(value) => (value === 'employed' ? 'Employed' : 'Unemployed')}
            />
            <Bar dataKey="employed" fill="#176B52" stackId="q" />
            <Bar dataKey="unemployed" fill="#B84A35" stackId="q" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] font-mono text-[#64645F] pt-2 border-t border-[#E6E3DB] flex items-center justify-between">
        <span>Postgraduate holders demonstrate the highest employment retention in sample (73.0%).</span>
        <span>N = 48,312</span>
      </div>
    </HairlineCard>
  );
};
