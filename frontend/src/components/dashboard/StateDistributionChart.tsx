import React, { useState } from 'react';
import type { StateAggregate } from '../../types/analytics';
import { HairlineCard } from '../common/HairlineCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ArrowUpDown, Table, BarChart2 } from 'lucide-react';

interface StateDistributionChartProps {
  states: StateAggregate[];
}

export const StateDistributionChart: React.FC<StateDistributionChartProps> = ({ states }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [sortBy, setSortBy] = useState<'volume' | 'ratio'>('volume');

  const sortedStates = [...states].sort((a, b) => {
    if (sortBy === 'volume') {
      return b.total_respondents - a.total_respondents;
    }
    return b.sample_unemployed_ratio - a.sample_unemployed_ratio;
  });

  const chartData = sortedStates.slice(0, 10).map(s => ({
    name: s.state_name.length > 12 ? s.state_name.substring(0, 10) + '...' : s.state_name,
    fullName: s.state_name,
    employed: s.employed_count,
    unemployed: s.unemployed_count,
    ratio: s.sample_unemployed_ratio
  }));

  return (
    <HairlineCard variant="white" className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E6E3DB] gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold block">
            GEOGRAPHIC DISTRIBUTION // 28 STATES & 8 UTS
          </span>
          <h3 className="font-serif text-xl font-bold text-[#191B1A]">
            State-by-State Contribution & Employment Ratio
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Button */}
          <button
            onClick={() => setSortBy(sortBy === 'volume' ? 'ratio' : 'volume')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E6E3DB] bg-[#F7F5EF] hover:border-[#191B1A] text-xs font-mono text-[#191B1A] transition-editorial cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort: {sortBy === 'volume' ? 'Sample Volume' : 'Unemployed %'}</span>
          </button>

          {/* View Toggle */}
          <div className="flex border border-[#E6E3DB] overflow-hidden">
            <button
              onClick={() => setViewMode('chart')}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'chart' ? 'bg-[#191B1A] text-white' : 'bg-[#F7F5EF] text-[#64645F] hover:text-[#191B1A]'}`}
              title="Bar Chart View"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === 'table' ? 'bg-[#191B1A] text-white' : 'bg-[#F7F5EF] text-[#64645F] hover:text-[#191B1A]'}`}
              title="Tabular Data View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'chart' ? (
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#64645F', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
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
                formatter={(value) => (value === 'employed' ? 'Employed (Count)' : 'Unemployed (Count)')}
              />
              <Bar dataKey="employed" fill="#176B52" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="unemployed" fill="#B84A35" stackId="a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Dense Editorial Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#191B1A] bg-[#F7F5EF] text-[#64645F]">
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold">State / UT</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold text-right">Total Sample</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold text-right text-[#176B52]">Employed</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold text-right text-[#B84A35]">Unemployed</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold text-right">Sample % Unemployed</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-semibold text-right">Mean Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DB]">
              {sortedStates.map((st) => (
                <tr key={st.state_id} className="hover:bg-[#F7F5EF]/80 transition-colors">
                  <td className="py-2 px-3 font-sans font-medium text-[#191B1A]">
                    {st.state_name}
                    <span className="text-[10px] text-[#64645F] ml-1.5 font-mono">({st.state_type})</span>
                  </td>
                  <td className="py-2 px-3 text-right num-tabular font-bold text-[#191B1A]">
                    {st.total_respondents.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right num-tabular text-[#176B52]">
                    {st.employed_count.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right num-tabular text-[#B84A35]">
                    {st.unemployed_count.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right num-tabular font-bold">
                    {st.sample_unemployed_ratio}%
                  </td>
                  <td className="py-2 px-3 text-right num-tabular text-[#64645F]">
                    {st.average_age || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-[11px] font-mono text-[#64645F] pt-2 border-t border-[#E6E3DB] flex items-center justify-between">
        <span>Displaying {sortedStates.length} Indian administrative jurisdictions.</span>
        <span>Source: Voluntary Survey Aggregates</span>
      </div>
    </HairlineCard>
  );
};
