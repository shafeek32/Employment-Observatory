import React, { useState } from 'react';
import type { StateAggregate } from '../../types/analytics';
import { HairlineCard } from '../common/HairlineCard';
import { ArrowRightLeft } from 'lucide-react';

interface InterStateComparatorProps {
  states: StateAggregate[];
}

export const InterStateComparator: React.FC<InterStateComparatorProps> = ({ states }) => {
  const [stateAId, setStateAId] = useState<string>('IN-KA'); // Karnataka default
  const [stateBId, setStateBId] = useState<string>('IN-KL'); // Kerala default

  const stateA = states.find(s => s.state_id === stateAId) || states[0];
  const stateB = states.find(s => s.state_id === stateBId) || states[1];

  return (
    <HairlineCard variant="white" className="space-y-5">
      <div className="pb-3 border-b border-[#E6E3DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#64645F] font-semibold block">
            COMPARATIVE ECONOMETRICS // DUAL JURISDICTION
          </span>
          <h3 className="font-serif text-xl font-bold text-[#191B1A]">
            Inter-State Comparative Lens
          </h3>
          <p className="font-sans text-xs text-[#64645F] mt-1">
            Compare voluntary employment ratios, youth engagement, and respondent volume between two Indian states.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#64645F]">
          <ArrowRightLeft className="w-4 h-4 text-[#191B1A]" />
          <span>BILATERAL BENCHMARK</span>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F5EF] p-4 border border-[#E6E3DB]">
        <div>
          <label className="block font-mono text-xs uppercase text-[#64645F] mb-1 font-semibold">
            Primary State A:
          </label>
          <select
            value={stateAId}
            onChange={(e) => setStateAId(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E6E3DB] font-mono text-xs text-[#191B1A] outline-none cursor-pointer"
          >
            {states.map(s => (
              <option key={`a-${s.state_id}`} value={s.state_id}>
                {s.state_name} ({s.state_type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase text-[#64645F] mb-1 font-semibold">
            Comparison State B:
          </label>
          <select
            value={stateBId}
            onChange={(e) => setStateBId(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-[#E6E3DB] font-mono text-xs text-[#191B1A] outline-none cursor-pointer"
          >
            {states.map(s => (
              <option key={`b-${s.state_id}`} value={s.state_id}>
                {s.state_name} ({s.state_type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Metrics Table */}
      {stateA && stateB && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#191B1A] bg-[#F7F5EF]">
                <th className="py-2.5 px-4 text-left font-semibold text-[#64645F] uppercase">Metric Parameter</th>
                <th className="py-2.5 px-4 text-center font-bold text-[#191B1A] uppercase border-l border-[#E6E3DB] bg-[#F7F5EF]/60">
                  {stateA.state_name}
                </th>
                <th className="py-2.5 px-4 text-center font-bold text-[#191B1A] uppercase border-l border-[#E6E3DB] bg-[#F7F5EF]/60">
                  {stateB.state_name}
                </th>
                <th className="py-2.5 px-4 text-center font-semibold text-[#64645F] uppercase border-l border-[#E6E3DB]">
                  Delta / Variance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DB]">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-[#191B1A]">Total Survey Contributions (N)</td>
                <td className="py-3 px-4 text-center num-tabular font-bold text-[#191B1A] border-l border-[#E6E3DB]">
                  {stateA.total_respondents.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular font-bold text-[#191B1A] border-l border-[#E6E3DB]">
                  {stateB.total_respondents.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#64645F] border-l border-[#E6E3DB]">
                  {Math.abs(stateA.total_respondents - stateB.total_respondents).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-[#191B1A]">Employed Respondents (Count)</td>
                <td className="py-3 px-4 text-center num-tabular text-[#176B52] font-semibold border-l border-[#E6E3DB]">
                  {stateA.employed_count.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#176B52] font-semibold border-l border-[#E6E3DB]">
                  {stateB.employed_count.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#176B52] border-l border-[#E6E3DB]">
                  {Math.abs(stateA.employed_count - stateB.employed_count).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-[#191B1A]">Unemployed Respondents (Count)</td>
                <td className="py-3 px-4 text-center num-tabular text-[#B84A35] font-semibold border-l border-[#E6E3DB]">
                  {stateA.unemployed_count.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#B84A35] font-semibold border-l border-[#E6E3DB]">
                  {stateB.unemployed_count.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#B84A35] border-l border-[#E6E3DB]">
                  {Math.abs(stateA.unemployed_count - stateB.unemployed_count).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-[#F7F5EF]/40 font-bold">
                <td className="py-3 px-4 font-sans text-[#191B1A]">Sample Unemployment Ratio (%)</td>
                <td className={`py-3 px-4 text-center num-tabular border-l border-[#E6E3DB] ${stateA.sample_unemployed_ratio > 40 ? 'text-[#B84A35]' : 'text-[#191B1A]'}`}>
                  {stateA.sample_unemployed_ratio}%
                </td>
                <td className={`py-3 px-4 text-center num-tabular border-l border-[#E6E3DB] ${stateB.sample_unemployed_ratio > 40 ? 'text-[#B84A35]' : 'text-[#191B1A]'}`}>
                  {stateB.sample_unemployed_ratio}%
                </td>
                <td className="py-3 px-4 text-center num-tabular border-l border-[#E6E3DB]">
                  {(Math.abs(stateA.sample_unemployed_ratio - stateB.sample_unemployed_ratio)).toFixed(1)}% pt
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-[#191B1A]">Mean Respondent Age</td>
                <td className="py-3 px-4 text-center num-tabular text-[#191B1A] border-l border-[#E6E3DB]">
                  {stateA.average_age || '—'} yrs
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#191B1A] border-l border-[#E6E3DB]">
                  {stateB.average_age || '—'} yrs
                </td>
                <td className="py-3 px-4 text-center num-tabular text-[#64645F] border-l border-[#E6E3DB]">
                  {stateA.average_age && stateB.average_age ? `${Math.abs(stateA.average_age - stateB.average_age).toFixed(1)} yrs` : '—'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </HairlineCard>
  );
};
