import React from 'react';
import type { DashboardFilterState } from '../../types/analytics';
import { INDIAN_STATES_MASTER } from '../../services/api';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filters: DashboardFilterState;
  onChange: (filters: DashboardFilterState) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset
}) => {
  return (
    <div className="bg-white border border-[#E6E3DB] p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DB]">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#191B1A]">
          <Filter className="w-4 h-4 text-[#64645F]" />
          <span>FILTER OBSERVATORY</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-mono text-[#64645F] hover:text-[#191B1A] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter 1: State */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          State / UT Jurisdiction
        </label>
        <select
          value={filters.stateId}
          onChange={(e) => onChange({ ...filters, stateId: e.target.value })}
          className="w-full px-2.5 py-2 bg-[#F7F5EF] border border-[#E6E3DB] text-xs font-mono text-[#191B1A] outline-none cursor-pointer"
        >
          <option value="ALL">All India (36 States/UTs)</option>
          {INDIAN_STATES_MASTER.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.type})
            </option>
          ))}
        </select>
      </div>

      {/* Filter 2: Employment Status */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          Cohort Status
        </label>
        <div className="grid grid-cols-3 gap-1 border border-[#E6E3DB] p-1 bg-[#F7F5EF]">
          {[
            { id: 'ALL', label: 'All' },
            { id: 'EMPLOYED', label: 'Employed' },
            { id: 'UNEMPLOYED', label: 'Unemployed' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => onChange({ ...filters, status: st.id as any })}
              className={`py-1.5 font-mono text-[11px] uppercase tracking-wider transition-editorial text-center cursor-pointer ${
                filters.status === st.id
                  ? 'bg-[#191B1A] text-white font-bold'
                  : 'text-[#64645F] hover:text-[#191B1A]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter 3: Highest Qualification */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          Educational Attainment
        </label>
        <select
          value={filters.qualificationId}
          onChange={(e) => onChange({ ...filters, qualificationId: e.target.value })}
          className="w-full px-2.5 py-2 bg-[#F7F5EF] border border-[#E6E3DB] text-xs font-mono text-[#191B1A] outline-none cursor-pointer"
        >
          <option value="ALL">All Attainments</option>
          <option value="POSTGRADUATE">Postgraduate & Above</option>
          <option value="DEGREE">Degree (Undergraduate)</option>
          <option value="DIPLOMA">Diploma / Polytechnic</option>
          <option value="PLUS_TWO">Plus Two (+2 / 12th)</option>
          <option value="SSLC">SSLC (10th Standard)</option>
          <option value="BELOW_SSLC">Below SSLC</option>
        </select>
      </div>

      {/* Filter 4: Engineering Stream */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          Engineering Branch
        </label>
        <select
          value={filters.streamId}
          onChange={(e) => onChange({ ...filters, streamId: e.target.value })}
          className="w-full px-2.5 py-2 bg-[#F7F5EF] border border-[#E6E3DB] text-xs font-mono text-[#191B1A] outline-none cursor-pointer"
        >
          <option value="ALL">All Disciplines</option>
          <option value="ENG_CSE">Computer Science (CSE)</option>
          <option value="ENG_IT">Information Technology (IT)</option>
          <option value="ENG_ECE">Electronics & Communication (ECE)</option>
          <option value="ENG_EEE">Electrical & Electronics (EEE)</option>
          <option value="ENG_MECH">Mechanical Engineering</option>
          <option value="ENG_CIVIL">Civil Engineering</option>
        </select>
      </div>

      {/* Filter 5: Age Range Slider */}
      <div>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          <span>Max Age Threshold</span>
          <span className="font-bold text-[#191B1A] num-tabular">≤ {filters.maxAge} yrs</span>
        </div>
        <input
          type="range"
          min="18"
          max="65"
          value={filters.maxAge}
          onChange={(e) => onChange({ ...filters, maxAge: Number(e.target.value) })}
          className="w-full accent-[#191B1A] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-[#64645F] mt-1">
          <span>18 yrs</span>
          <span>40 yrs</span>
          <span>65 yrs</span>
        </div>
      </div>

      {/* Filter 6: Date Window */}
      <div>
        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#64645F] mb-1.5 font-medium">
          Observation Window
        </label>
        <div className="grid grid-cols-2 gap-1 border border-[#E6E3DB] p-1 bg-[#F7F5EF]">
          {[
            { id: '7D', label: 'Last 7 Days' },
            { id: '30D', label: 'Last 30 Days' },
            { id: '6M', label: 'Last 6 Months' },
            { id: 'ALL', label: 'All-Time' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => onChange({ ...filters, datePeriod: p.id as any })}
              className={`py-1 font-mono text-[10px] uppercase tracking-wider transition-editorial text-center cursor-pointer ${
                filters.datePeriod === p.id
                  ? 'bg-[#191B1A] text-white font-bold'
                  : 'text-[#64645F] hover:text-[#191B1A]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#F7F5EF] border border-[#E6E3DB] text-[10px] font-mono text-[#64645F] leading-tight">
        K-anonymity guarantee active: any filtered subset returning fewer than 5 rows is mathematically redacted to safeguard individual contributor privacy.
      </div>
    </div>
  );
};
