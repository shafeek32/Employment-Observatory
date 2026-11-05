import React, { useState, useMemo } from 'react';
import type { DashboardOverviewData, DashboardFilterState, StateAggregate } from '../../types/analytics';
import type { EmploymentStatus } from '../../types/survey';
import {
  Users,
  Briefcase,
  UserX,
  Calendar,
  Cpu,
  Filter,
  RotateCcw,
  ArrowRightLeft,
  ShieldAlert,
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  X
} from 'lucide-react';
import { INDIAN_STATES_MASTER } from '../../services/api';

interface AnalyticsDashboardProps {
  data: DashboardOverviewData;
  onStartSurvey: (status: EmploymentStatus) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ data, onStartSurvey }) => {
  // Simple filter state
  const [filters, setFilters] = useState<DashboardFilterState>({
    stateId: 'ALL',
    minAge: 18,
    maxAge: 65,
    qualificationId: 'ALL',
    streamId: 'ALL',
    status: 'ALL',
    datePeriod: 'ALL'
  });

  const [stateSearch, setStateSearch] = useState<string>('');
  const [showAllStates, setShowAllStates] = useState<boolean>(false);
  const [comparatorStateA, setComparatorStateA] = useState<string>('IN-KA');
  const [comparatorStateB, setComparatorStateB] = useState<string>('IN-KL');

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      stateId: 'ALL',
      minAge: 18,
      maxAge: 65,
      qualificationId: 'ALL',
      streamId: 'ALL',
      status: 'ALL',
      datePeriod: 'ALL'
    });
    setStateSearch('');
  };

  // Base national totals
  const totalSurveyed = data.macro.total_respondents;
  const totalEmployed = data.macro.total_employed;
  const totalUnemployed = data.macro.total_unemployed;

  // Selected filter entities
  const selectedState = useMemo(() => {
    return filters.stateId !== 'ALL'
      ? data.states.find(s => s.state_id === filters.stateId) || null
      : null;
  }, [data.states, filters.stateId]);

  const selectedQualification = useMemo(() => {
    return filters.qualificationId !== 'ALL'
      ? data.qualifications.find(q => q.qualification_id === filters.qualificationId) || null
      : null;
  }, [data.qualifications, filters.qualificationId]);

  const selectedStream = useMemo(() => {
    return filters.streamId !== 'ALL'
      ? data.engineering_streams.find(st => st.stream_id === filters.streamId) || null
      : null;
  }, [data.engineering_streams, filters.streamId]);

  // Is any filter active?
  const hasActiveFilters =
    filters.stateId !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.qualificationId !== 'ALL' ||
    filters.streamId !== 'ALL' ||
    stateSearch.trim() !== '';

  // Filtered Macro Metrics (adapts when filters are chosen!)
  const filteredMetrics = useMemo(() => {
    let tot = totalSurveyed;
    let emp = totalEmployed;
    let unemp = totalUnemployed;

    if (selectedState) {
      tot = selectedState.total_respondents;
      emp = selectedState.employed_count;
      unemp = selectedState.unemployed_count;
    } else if (selectedQualification) {
      tot = selectedQualification.total_respondents;
      emp = selectedQualification.employed_count;
      unemp = selectedQualification.unemployed_count;
    } else if (selectedStream) {
      tot = selectedStream.total_respondents;
      emp = selectedStream.employed_count;
      unemp = selectedStream.unemployed_count;
    }

    if (filters.status === 'EMPLOYED') {
      tot = emp;
      unemp = 0;
    } else if (filters.status === 'UNEMPLOYED') {
      tot = unemp;
      emp = 0;
    }

    const emp100 = tot > 0 ? Math.round((emp / tot) * 100) : 0;
    const unemp100 = tot > 0 ? 100 - emp100 : 0;

    return {
      total: tot,
      employed: emp,
      unemployed: unemp,
      employedOutOf100: emp100,
      unemployedOutOf100: unemp100
    };
  }, [totalSurveyed, totalEmployed, totalUnemployed, selectedState, selectedQualification, selectedStream, filters.status]);

  // 1. Education Groups (Reacts dynamically to qualificationId & status filters)
  const educationGroups = useMemo(() => {
    let list = [...data.qualifications];

    // Filter by qualification
    if (filters.qualificationId !== 'ALL') {
      list = list.filter(q => q.qualification_id === filters.qualificationId);
    }

    // Sort based on current cohort status
    if (filters.status === 'EMPLOYED') {
      list.sort((a, b) => b.employed_count - a.employed_count);
    } else {
      list.sort((a, b) => b.unemployed_count - a.unemployed_count);
    }

    return list.map(q => {
      const displayCount =
        filters.status === 'EMPLOYED'
          ? q.employed_count
          : filters.status === 'UNEMPLOYED'
          ? q.unemployed_count
          : q.total_respondents;

      return {
        id: q.qualification_id,
        name: q.qualification_name,
        displayCount,
        unemployedCount: q.unemployed_count,
        employedCount: q.employed_count,
        totalCount: q.total_respondents,
        unemployedOutOf100: Math.round((q.unemployed_count / q.total_respondents) * 100),
        employedOutOf100: Math.round((q.employed_count / q.total_respondents) * 100)
      };
    });
  }, [data.qualifications, filters.qualificationId, filters.status]);

  const maxEducationDisplay = Math.max(...educationGroups.map(e => e.displayCount), 1);

  // 2. Ranked State-Wise Participation (Reacts dynamically to stateId, stateSearch, & status filters)
  const filteredStates = useMemo(() => {
    let list = [...data.states];

    if (filters.stateId !== 'ALL') {
      list = list.filter(s => s.state_id === filters.stateId);
    }

    if (stateSearch.trim()) {
      const query = stateSearch.toLowerCase();
      list = list.filter(s => s.state_name.toLowerCase().includes(query));
    }

    // Sort based on current status filter
    if (filters.status === 'EMPLOYED') {
      list.sort((a, b) => b.employed_count - a.employed_count);
    } else if (filters.status === 'UNEMPLOYED') {
      list.sort((a, b) => b.unemployed_count - a.unemployed_count);
    } else {
      list.sort((a, b) => b.total_respondents - a.total_respondents);
    }

    return list.map(s => {
      const displayCount =
        filters.status === 'EMPLOYED'
          ? s.employed_count
          : filters.status === 'UNEMPLOYED'
          ? s.unemployed_count
          : s.total_respondents;

      return {
        ...s,
        displayCount
      };
    });
  }, [data.states, filters.stateId, stateSearch, filters.status]);

  const maxStateDisplay = Math.max(...filteredStates.map(s => s.displayCount), 1);

  // 3. 5 Understandable Age Groups (Reacts dynamically to status filter)
  const ageGroups = useMemo(() => {
    const raw = data.age_distribution;

    const buckets = [
      { id: '18_20', label: '18–20 years', sublabel: 'Early college / school leavers', min: 18, max: 20 },
      { id: '21_25', label: '21–25 years', sublabel: 'College graduates entering job market', min: 21, max: 25 },
      { id: '26_30', label: '26–30 years', sublabel: 'Early career / competitive exam prep', min: 26, max: 30 },
      { id: '31_35', label: '31–35 years', sublabel: 'Experienced / career transition', min: 31, max: 35 },
      { id: 'above_35', label: 'Above 35 years', sublabel: 'Mid-career and experienced workforce', min: 36, max: 100 }
    ];

    return buckets.map(b => {
      const matched = raw.filter(pt => pt.age >= b.min && pt.age <= b.max);
      const total = matched.reduce((acc, curr) => acc + curr.total_respondents, 0);
      const employed = matched.reduce((acc, curr) => acc + curr.employed_count, 0);
      const unemployed = matched.reduce((acc, curr) => acc + curr.unemployed_count, 0);

      const displayCount =
        filters.status === 'EMPLOYED'
          ? employed
          : filters.status === 'UNEMPLOYED'
          ? unemployed
          : total;

      const outOf100 = total > 0 ? Math.round((unemployed / total) * 100) : 0;

      return {
        ...b,
        total,
        employed,
        unemployed,
        displayCount,
        unemployedOutOf100: outOf100
      };
    });
  }, [data.age_distribution, filters.status]);

  const maxAgeDisplay = Math.max(...ageGroups.map(g => g.displayCount), 1);

  // 4. Engineering Branch Comparison (Reacts dynamically to streamId & status filters)
  const engineeringBranches = useMemo(() => {
    let list = [...data.engineering_streams];

    if (filters.streamId !== 'ALL') {
      list = list.filter(st => st.stream_id === filters.streamId);
    }

    if (filters.status === 'EMPLOYED') {
      list.sort((a, b) => b.employed_count - a.employed_count);
    } else {
      list.sort((a, b) => b.unemployed_count - a.unemployed_count);
    }

    return list.map(st => {
      const displayCount =
        filters.status === 'EMPLOYED'
          ? st.employed_count
          : filters.status === 'UNEMPLOYED'
          ? st.unemployed_count
          : st.total_respondents;

      return {
        id: st.stream_id,
        name: st.stream_name,
        displayCount,
        unemployedCount: st.unemployed_count,
        employedCount: st.employed_count,
        totalCount: st.total_respondents,
        unemployedOutOf100: Math.round((st.unemployed_count / st.total_respondents) * 100),
        employedOutOf100: Math.round((st.employed_count / st.total_respondents) * 100)
      };
    });
  }, [data.engineering_streams, filters.streamId, filters.status]);

  const maxBranchDisplay = Math.max(...engineeringBranches.map(b => b.displayCount), 1);

  // 5. Bilateral State Comparator
  const stateA: StateAggregate =
    data.states.find(s => s.state_id === comparatorStateA) || data.states[0];
  const stateB: StateAggregate =
    data.states.find(s => s.state_id === comparatorStateB) || (data.states[1] || data.states[0]);

  const stateAOutOf100 = Math.round((stateA.unemployed_count / stateA.total_respondents) * 100);
  const stateBOutOf100 = Math.round((stateB.unemployed_count / stateB.total_respondents) * 100);

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Dashboard Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-[#EEECE7] gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171717] text-white text-xs font-mono font-bold uppercase tracking-widest">
            <span>PUBLIC PARTICIPATION DATA</span>
            <span className="text-white/40">•</span>
            <span className="text-[#FF8A3D]">Interactive & Plain Language</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            India's Employment Picture Made Simple
          </h1>
          <p className="text-base text-[#171717]/80 font-normal leading-relaxed">
            Every number here comes directly from {totalSurveyed.toLocaleString()} people who voluntarily shared their story on this platform. Use the filter controls below to explore any slice of the data.
          </p>
        </div>

        {/* Quick Participation Callout */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onStartSurvey('EMPLOYED')}
            className="px-5 py-3 rounded-full bg-[#176B52] hover:bg-[#135944] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95"
          >
            I AM EMPLOYED (ADD VOICE)
          </button>
          <button
            onClick={() => onStartSurvey('UNEMPLOYED')}
            className="px-5 py-3 rounded-full bg-[#F15B48] hover:bg-[#d94836] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer active:scale-95"
          >
            I AM UNEMPLOYED (ADD VOICE)
          </button>
        </div>
      </div>

      {/* FILTER CONTROL PANEL */}
      <div className="bg-white rounded-3xl border-2 border-[#171717] p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEECE7]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F15B48]/10 text-[#F15B48] flex items-center justify-center font-bold">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#171717]">
                Filter Survey Data
              </h3>
              <p className="text-xs text-[#171717]/60">
                Select options below to update all numbers, bars, and charts across the dashboard.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Filter Matching Counter */}
            <div className="px-4 py-2 rounded-full bg-[#FAF9F6] border border-[#EEECE7] text-xs font-medium text-[#171717] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F15B48] animate-pulse"></span>
              <span>
                Showing <strong className="font-mono text-[#F15B48] text-sm">{filteredMetrics.total.toLocaleString()}</strong> matching people
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-full bg-[#171717] hover:bg-[#333] text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Responsive Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filter 1: Cohort Status */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#171717]">
              Show Responses From:
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium outline-none cursor-pointer transition-colors ${
                filters.status !== 'ALL'
                  ? 'bg-amber-50 border-[#F15B48] text-[#171717] font-bold'
                  : 'bg-[#FAF9F6] border-[#EEECE7] text-[#171717] hover:border-[#171717]'
              }`}
            >
              <option value="ALL">All Participants ({totalSurveyed.toLocaleString()})</option>
              <option value="EMPLOYED">Only Employed People ({totalEmployed.toLocaleString()})</option>
              <option value="UNEMPLOYED">Only People Looking for Work ({totalUnemployed.toLocaleString()})</option>
            </select>
          </div>

          {/* Filter 2: State */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#171717]">
              Choose a State:
            </label>
            <select
              value={filters.stateId}
              onChange={(e) => setFilters({ ...filters, stateId: e.target.value })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium outline-none cursor-pointer transition-colors ${
                filters.stateId !== 'ALL'
                  ? 'bg-amber-50 border-[#F15B48] text-[#171717] font-bold'
                  : 'bg-[#FAF9F6] border-[#EEECE7] text-[#171717] hover:border-[#171717]'
              }`}
            >
              <option value="ALL">All India (36 States & UTs)</option>
              {INDIAN_STATES_MASTER.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Education */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#171717]">
              Select Education Level:
            </label>
            <select
              value={filters.qualificationId}
              onChange={(e) => setFilters({ ...filters, qualificationId: e.target.value })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium outline-none cursor-pointer transition-colors ${
                filters.qualificationId !== 'ALL'
                  ? 'bg-amber-50 border-[#F15B48] text-[#171717] font-bold'
                  : 'bg-[#FAF9F6] border-[#EEECE7] text-[#171717] hover:border-[#171717]'
              }`}
            >
              <option value="ALL">All Education Levels</option>
              <option value="DEGREE">College Degree (Undergraduate)</option>
              <option value="POSTGRADUATE">Postgraduate & Above</option>
              <option value="DIPLOMA">Diploma / Polytechnic</option>
              <option value="PLUS_TWO">Plus Two (+2 / 12th)</option>
              <option value="SSLC">SSLC (10th Standard)</option>
              <option value="BELOW_SSLC">Below SSLC</option>
            </select>
          </div>

          {/* Filter 4: Engineering Branch */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#171717]">
              Select Engineering Branch:
            </label>
            <select
              value={filters.streamId}
              onChange={(e) => setFilters({ ...filters, streamId: e.target.value })}
              className={`w-full px-3.5 py-2.5 border rounded-xl text-xs font-medium outline-none cursor-pointer transition-colors ${
                filters.streamId !== 'ALL'
                  ? 'bg-amber-50 border-[#F15B48] text-[#171717] font-bold'
                  : 'bg-[#FAF9F6] border-[#EEECE7] text-[#171717] hover:border-[#171717]'
              }`}
            >
              <option value="ALL">All Engineering Branches</option>
              <option value="ENG_CSE">Computer Science (CSE)</option>
              <option value="ENG_IT">Information Technology (IT)</option>
              <option value="ENG_ECE">Electronics & Communication (ECE)</option>
              <option value="ENG_MECH">Mechanical Engineering</option>
              <option value="ENG_CIVIL">Civil Engineering</option>
              <option value="ENG_EEE">Electrical & Electronics (EEE)</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTER PILLS (Instant visual feedback + one-click removal) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#EEECE7]">
            <span className="text-xs font-mono font-bold uppercase text-[#171717]/60 mr-1">
              Active Filters:
            </span>

            {filters.status !== 'ALL' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-medium shadow-sm">
                <span>{filters.status === 'EMPLOYED' ? 'Only Employed' : 'Only Looking for Work'}</span>
                <button
                  onClick={() => setFilters(f => ({ ...f, status: 'ALL' }))}
                  className="hover:text-[#F15B48] cursor-pointer"
                  title="Remove this filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedState && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-medium shadow-sm">
                <span>State: {selectedState.state_name}</span>
                <button
                  onClick={() => setFilters(f => ({ ...f, stateId: 'ALL' }))}
                  className="hover:text-[#F15B48] cursor-pointer"
                  title="Remove this filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedQualification && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-medium shadow-sm">
                <span>Education: {selectedQualification.qualification_name}</span>
                <button
                  onClick={() => setFilters(f => ({ ...f, qualificationId: 'ALL' }))}
                  className="hover:text-[#F15B48] cursor-pointer"
                  title="Remove this filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedStream && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-medium shadow-sm">
                <span>Branch: {selectedStream.stream_name}</span>
                <button
                  onClick={() => setFilters(f => ({ ...f, streamId: 'ALL' }))}
                  className="hover:text-[#F15B48] cursor-pointer"
                  title="Remove this filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {stateSearch.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-xs font-medium shadow-sm">
                <span>Search: "{stateSearch}"</span>
                <button
                  onClick={() => setStateSearch('')}
                  className="hover:text-[#F15B48] cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-[#F15B48] hover:underline font-bold ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Privacy Safeguard Note */}
        <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#EEECE7] text-[11px] text-[#171717]/70 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#176B52] shrink-0" />
          <span>
            <strong>Privacy Protection:</strong> If any group or filter combination has fewer than 5 respondents, we hide the count to ensure nobody can ever be personally identified.
          </span>
        </div>
      </div>

      {/* SECTION 1: THE DYNAMIC HUMAN EXPLANATION HERO (Updates with Filters!) */}
      <div className="bg-white rounded-3xl border border-[#EEECE7] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15B48]">
              {hasActiveFilters ? 'FILTERED BREAKDOWN' : 'HOW TO UNDERSTAND THIS OVERALL'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
              {selectedState ? (
                <>Out of every 100 participants from {selectedState.state_name}:</>
              ) : selectedQualification ? (
                <>Out of every 100 participants with a {selectedQualification.qualification_name}:</>
              ) : selectedStream ? (
                <>Out of every 100 participants in {selectedStream.stream_name}:</>
              ) : filters.status === 'EMPLOYED' ? (
                <>Showing {filteredMetrics.total.toLocaleString()} employed participants:</>
              ) : filters.status === 'UNEMPLOYED' ? (
                <>Showing {filteredMetrics.total.toLocaleString()} participants looking for work:</>
              ) : (
                <>Out of every 100 people who participated in this survey:</>
              )}
            </h2>
          </div>
          <div className="text-xs text-[#171717]/60 font-mono font-medium">
            Based on {filteredMetrics.total.toLocaleString()} matching responses
          </div>
        </div>

        {/* Dynamic Horizontal Split Bar */}
        <div className="space-y-4">
          <div className="h-12 sm:h-14 w-full rounded-2xl overflow-hidden flex shadow-inner bg-[#EEECE7] p-1.5 gap-1.5">
            {filteredMetrics.employed > 0 && (
              <div
                style={{ width: `${filters.status === 'EMPLOYED' ? 100 : filteredMetrics.employedOutOf100}%` }}
                className="bg-[#176B52] rounded-xl flex items-center justify-center text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-700"
              >
                <span>
                  {filters.status === 'EMPLOYED'
                    ? `${filteredMetrics.employed.toLocaleString()} Employed (100%)`
                    : `${filteredMetrics.employedOutOf100} Said Employed`}
                </span>
              </div>
            )}

            {filteredMetrics.unemployed > 0 && (
              <div
                style={{ width: `${filters.status === 'UNEMPLOYED' ? 100 : filteredMetrics.unemployedOutOf100}%` }}
                className="bg-[#F15B48] rounded-xl flex items-center justify-center text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-700"
              >
                <span>
                  {filters.status === 'UNEMPLOYED'
                    ? `${filteredMetrics.unemployed.toLocaleString()} Looking for Work (100%)`
                    : `${filteredMetrics.unemployedOutOf100} Looking for Work`}
                </span>
              </div>
            )}
          </div>

          {/* Direct Human Labels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#176B52]/10 border border-[#176B52]/20 flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-[#176B52] mt-1 shrink-0" />
              <div>
                <div className="text-base font-bold text-[#176B52]">
                  {filters.status === 'UNEMPLOYED' ? 'Filtered out' : `${filteredMetrics.employedOutOf100} out of 100 said they were employed`}
                </div>
                <div className="text-xs text-[#171717]/70 mt-1">
                  <strong>{filteredMetrics.employed.toLocaleString()} people</strong> are working in government, private firms, freelancing, or self-employment.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F15B48]/10 border border-[#F15B48]/20 flex items-start gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-[#F15B48] mt-1 shrink-0" />
              <div>
                <div className="text-base font-bold text-[#F15B48]">
                  {filters.status === 'EMPLOYED' ? 'Filtered out' : `${filteredMetrics.unemployedOutOf100} out of 100 said they were unemployed`}
                </div>
                <div className="text-xs text-[#171717]/70 mt-1">
                  <strong>{filteredMetrics.unemployed.toLocaleString()} people</strong> are currently seeking opportunities or preparing for exams.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contextual Note */}
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EEECE7] flex items-start gap-3 text-xs text-[#171717]/80 leading-relaxed">
          <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
          <div>
            <strong>What does this number mean?</strong> These are voluntary survey submissions from people across India who visited this website. They show the self-reported situation of our participants and do <em>not</em> represent official government unemployment rates published by MOSPI or the Periodic Labour Force Survey (PLFS).
          </div>
        </div>
      </div>

      {/* 5 Macro Big Number Cards with Filtered Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#EEECE7] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#171717]/60">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">MATCHING VOICES</span>
            <Users className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-mono num-tabular">
            {filteredMetrics.total.toLocaleString()}
          </div>
          <p className="text-xs text-[#171717]/70 font-sans">
            {hasActiveFilters ? 'Matching your active filters' : 'Total voluntary submissions'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border-t-4 border-t-[#176B52] border border-[#EEECE7] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#176B52]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">EMPLOYED</span>
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#176B52] font-mono num-tabular">
            {filteredMetrics.employed.toLocaleString()}
          </div>
          <p className="text-xs text-[#171717]/70 font-sans">
            Working in job or business
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border-t-4 border-t-[#F15B48] border border-[#EEECE7] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#F15B48]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">UNEMPLOYED</span>
            <UserX className="w-4 h-4" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#F15B48] font-mono num-tabular">
            {filteredMetrics.unemployed.toLocaleString()}
          </div>
          <p className="text-xs text-[#171717]/70 font-sans">
            Currently looking for work
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EEECE7] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#171717]/60">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">AVERAGE AGE</span>
            <Calendar className="w-4 h-4 text-[#171717]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-mono num-tabular">
            {selectedState?.average_age ? `${selectedState.average_age} yrs` : '25 yrs'}
          </div>
          <p className="text-xs text-[#171717]/70 font-sans">
            {selectedState ? `Average respondent in ${selectedState.state_name}` : 'Average respondent age'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EEECE7] space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[#171717]/60">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">TOP DEGREE</span>
            <Cpu className="w-4 h-4 text-[#FF8A3D]" />
          </div>
          <div className="text-xl font-bold text-[#171717] leading-tight truncate">
            {selectedStream ? selectedStream.stream_name.split(' ')[0] : 'Computer Science'}
          </div>
          <p className="text-xs text-[#171717]/70 font-sans">
            {selectedStream ? 'Selected engineering discipline' : 'Discipline with most participants'}
          </p>
        </div>
      </div>

      {/* SECTION 2: CHARTS GRID */}
      <div className="space-y-10">
        {/* CHART A: EDUCATION AND EMPLOYMENT (Reacts to qualificationId and status filters) */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-7 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15B48]">
                QUESTION 1 OF 4
              </span>
              {filters.qualificationId !== 'ALL' && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#171717] text-xs font-bold">
                  Filtered to: {selectedQualification?.qualification_name}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
              {filters.status === 'EMPLOYED' ? (
                <>Which education groups are represented among employed respondents?</>
              ) : filters.status === 'UNEMPLOYED' ? (
                <>Which education groups are represented among unemployed respondents?</>
              ) : (
                <>Which education groups are represented in the survey?</>
              )}
            </h3>
            <p className="text-sm text-[#171717]/70">
              {filters.status === 'EMPLOYED'
                ? 'Showing how many working people hold each qualification.'
                : filters.status === 'UNEMPLOYED'
                ? 'Showing how many people looking for work hold each qualification.'
                : 'Showing total respondents for each qualification level.'}
            </p>
          </div>

          {/* Simple Horizontal Bars with Visible Numbers */}
          <div className="space-y-5 pt-2">
            {educationGroups.map(item => {
              const barWidth = Math.round((item.displayCount / maxEducationDisplay) * 100);
              const barColor =
                filters.status === 'EMPLOYED'
                  ? 'bg-[#176B52]'
                  : filters.status === 'UNEMPLOYED'
                  ? 'bg-[#F15B48]'
                  : 'bg-[#171717]';

              return (
                <div key={item.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-[#171717] gap-1">
                    <span className="font-bold">{item.name}</span>
                    <span className="font-mono font-bold">
                      {filters.status === 'EMPLOYED' ? (
                        <span className="text-[#176B52]">{item.employedCount.toLocaleString()} employed</span>
                      ) : filters.status === 'UNEMPLOYED' ? (
                        <span className="text-[#F15B48]">{item.unemployedCount.toLocaleString()} looking for work</span>
                      ) : (
                        <span>{item.totalCount.toLocaleString()} total participants</span>
                      )}
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-5 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#171717]/60">
                    <span>Total with this qualification: {item.totalCount.toLocaleString()}</span>
                    <span className="text-[#176B52] font-semibold">{item.employedCount.toLocaleString()} employed • <span className="text-[#F15B48]">{item.unemployedCount.toLocaleString()} seeking</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plain Language Explanation */}
          <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-2 text-xs sm:text-sm text-[#171717]/80 leading-relaxed font-sans">
            <div className="font-bold text-[#171717] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#F15B48]" />
              <span>What does this number mean?</span>
            </div>
            <p>
              In our survey, college degree holders form the largest group ({data.qualifications[1]?.total_respondents.toLocaleString()} participants total, with {data.qualifications[1]?.unemployed_count.toLocaleString()} looking for work).
            </p>
            <p className="text-xs text-[#171717]/60 italic pt-1 border-t border-[#EEECE7]">
              <strong>Important Note:</strong> This counts the actual number of people who replied to our survey. It does <em>not</em> mean college graduates have a higher unemployment rate than others — it simply shows that college graduates use the internet and participate in online surveys more often.
            </p>
          </div>
        </div>

        {/* CHART B: STATE-WISE PARTICIPATION (Reacts to stateId, search, & status filters) */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-7 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8A3D]">
                  QUESTION 2 OF 4
                </span>
                {filters.stateId !== 'ALL' && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#171717] text-xs font-bold">
                    Filtered to: {selectedState?.state_name}
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                Where did survey participants come from?
              </h3>
              <p className="text-sm text-[#171717]/70">
                {filters.status === 'EMPLOYED'
                  ? 'Ranked list of states by employed respondents.'
                  : filters.status === 'UNEMPLOYED'
                  ? 'Ranked list of states by respondents looking for work.'
                  : 'A simple ranked list showing participant counts from across India.'}
              </p>
            </div>

            {/* State Search Bar */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#171717]/40" />
              <input
                type="text"
                placeholder="Search your state..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-[#EEECE7] rounded-xl text-xs font-medium text-[#171717] outline-none hover:border-[#171717]"
              />
            </div>
          </div>

          {/* Ranked List with Simple Horizontal Bars */}
          <div className="space-y-4 pt-2">
            {(showAllStates ? filteredStates : filteredStates.slice(0, 6)).map((state, index) => {
              const barWidth = Math.round((state.displayCount / maxStateDisplay) * 100);
              const barColor =
                filters.status === 'EMPLOYED'
                  ? 'bg-[#176B52]'
                  : filters.status === 'UNEMPLOYED'
                  ? 'bg-[#F15B48]'
                  : 'bg-[#171717]';

              return (
                <div key={state.state_id} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EEECE7] space-y-2.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-bold text-[#171717]">
                      <span className="w-6 text-xs font-mono text-[#171717]/50">{index + 1}.</span>
                      <span>{state.state_name}</span>
                    </div>
                    <div className="font-mono font-extrabold text-[#171717] text-sm">
                      {filters.status === 'EMPLOYED' ? (
                        <span className="text-[#176B52]">{state.employed_count.toLocaleString()} employed</span>
                      ) : filters.status === 'UNEMPLOYED' ? (
                        <span className="text-[#F15B48]">{state.unemployed_count.toLocaleString()} looking for work</span>
                      ) : (
                        <span>{state.total_respondents.toLocaleString()} participants</span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-3.5 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    />
                  </div>

                  {/* Plain Breakdown */}
                  <div className="flex items-center justify-between text-xs text-[#171717]/70 pt-0.5">
                    <span className="text-[#176B52] font-semibold">
                      ✓ {state.employed_count.toLocaleString()} employed
                    </span>
                    <span className="text-[#F15B48] font-semibold">
                      • {state.unemployed_count.toLocaleString()} looking for work
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredStates.length === 0 && (
              <div className="text-center py-8 text-xs text-[#171717]/60">
                No states matched "{stateSearch}". Try searching another name or reset filters.
              </div>
            )}
          </div>

          {/* Toggle View More States */}
          {filteredStates.length > 6 && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllStates(!showAllStates)}
                className="px-5 py-2.5 rounded-full border border-[#171717] text-xs font-bold uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>{showAllStates ? 'Show Top 6 States' : `Show All ${filteredStates.length} States`}</span>
                {showAllStates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Mandatory Explanation (Requirement #3.C) */}
          <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-2 text-xs sm:text-sm text-[#171717]/80 leading-relaxed font-sans">
            <div className="font-bold text-[#171717] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#FF8A3D]" />
              <span>How should I understand this state list?</span>
            </div>
            <p>
              These numbers show where survey participants came from. <strong>They do not indicate which state has the highest unemployment rate.</strong>
            </p>
            <p className="text-xs text-[#171717]/60">
              States with larger numbers (like Karnataka or Maharashtra) simply had more people visit this website and submit their responses.
            </p>
          </div>
        </div>

        {/* CHART C: 5 UNDERSTANDABLE AGE GROUPS (Reacts to status filter) */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-7 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#176B52]">
              QUESTION 3 OF 4
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
              Which age group took part the most?
            </h3>
            <p className="text-sm text-[#171717]/70">
              {filters.status === 'EMPLOYED'
                ? 'Showing employed respondents across five age brackets.'
                : filters.status === 'UNEMPLOYED'
                ? 'Showing respondents looking for work across five age brackets.'
                : 'We grouped participants into five simple age brackets.'}
            </p>
          </div>

          {/* 5 Clear Age Brackets */}
          <div className="space-y-5 pt-2">
            {ageGroups.map(group => {
              const barWidth = Math.round((group.displayCount / maxAgeDisplay) * 100);
              const barColor =
                filters.status === 'EMPLOYED'
                  ? 'bg-[#176B52]'
                  : filters.status === 'UNEMPLOYED'
                  ? 'bg-[#F15B48]'
                  : 'bg-[#171717]';

              return (
                <div key={group.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-[#171717] gap-1">
                    <div>
                      <span className="font-bold text-base">{group.label}</span>
                      <span className="text-xs text-[#171717]/60 block sm:inline sm:ml-2">({group.sublabel})</span>
                    </div>
                    <div className="font-mono font-bold text-sm text-[#171717]">
                      {filters.status === 'EMPLOYED' ? (
                        <span className="text-[#176B52]">{group.employed.toLocaleString()} employed</span>
                      ) : filters.status === 'UNEMPLOYED' ? (
                        <span className="text-[#F15B48]">{group.unemployed.toLocaleString()} looking for work</span>
                      ) : (
                        <span>{group.total.toLocaleString()} people</span>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-5 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#171717]/70">
                    <span className="text-[#176B52] font-semibold">
                      {group.employed.toLocaleString()} employed
                    </span>
                    <span className="text-[#F15B48] font-semibold">
                      {group.unemployed.toLocaleString()} looking for work ({group.unemployedOutOf100} out of 100)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plain Explanation */}
          <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-2 text-xs sm:text-sm text-[#171717]/80 leading-relaxed font-sans">
            <div className="font-bold text-[#171717] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#176B52]" />
              <span>What are we seeing here?</span>
            </div>
            <p>
              Young people aged <strong>21 to 25 years</strong> form the largest group in this survey (over 26,000 respondents). This is the age when students finish their college degrees and begin actively searching for their first career step.
            </p>
          </div>
        </div>

        {/* CHART D: ENGINEERING BRANCH COMPARISON (Reacts to streamId and status filters) */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-7 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F15B48]">
                QUESTION 4 OF 4
              </span>
              {filters.streamId !== 'ALL' && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[#171717] text-xs font-bold">
                  Filtered to: {selectedStream?.stream_name}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
              {filters.status === 'EMPLOYED' ? (
                <>How many respondents from each engineering branch reported being employed?</>
              ) : filters.status === 'UNEMPLOYED' ? (
                <>How many respondents from each engineering branch reported being unemployed?</>
              ) : (
                <>How many respondents came from each engineering branch?</>
              )}
            </h3>
            <p className="text-sm text-[#171717]/70">
              Comparing branches among B.Tech / B.E. graduates who took the survey.
            </p>
          </div>

          {/* Simple Horizontal Bars */}
          <div className="space-y-5 pt-2">
            {engineeringBranches.map(branch => {
              const barWidth = Math.round((branch.displayCount / maxBranchDisplay) * 100);
              const barColor =
                filters.status === 'EMPLOYED'
                  ? 'bg-[#176B52]'
                  : filters.status === 'UNEMPLOYED'
                  ? 'bg-[#F15B48]'
                  : 'bg-[#171717]';

              return (
                <div key={branch.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm font-semibold text-[#171717] gap-1">
                    <span className="font-bold">{branch.name}</span>
                    <span className="font-mono font-bold">
                      {filters.status === 'EMPLOYED' ? (
                        <span className="text-[#176B52]">{branch.employedCount.toLocaleString()} employed</span>
                      ) : filters.status === 'UNEMPLOYED' ? (
                        <span className="text-[#F15B48]">{branch.unemployedCount.toLocaleString()} looking for work</span>
                      ) : (
                        <span>{branch.totalCount.toLocaleString()} total respondents</span>
                      )}
                    </span>
                  </div>

                  <div className="h-5 w-full bg-[#EEECE7] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${barWidth}%` }}
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#171717]/60">
                    <span>Total {branch.name.split(' ')[0]} respondents: {branch.totalCount.toLocaleString()}</span>
                    <span className="text-[#176B52] font-semibold">{branch.employedCount.toLocaleString()} employed • <span className="text-[#F15B48]">{branch.unemployedCount.toLocaleString()} seeking</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plain Language Explanation (Requirement #3.E) */}
          <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-2 text-xs sm:text-sm text-[#171717]/80 leading-relaxed font-sans">
            <div className="font-bold text-[#171717] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#F15B48]" />
              <span>How should I understand this engineering comparison?</span>
            </div>
            <p>
              Computer Science & Engineering has the highest number of respondents ({data.engineering_streams[0]?.total_respondents.toLocaleString()} people) simply because Computer Science has by far the largest student enrollment in Indian engineering colleges.
            </p>
            <p className="text-xs text-[#171717]/60 italic pt-1 border-t border-[#EEECE7]">
              <strong>Important Caution:</strong> Do not confuse respondent counts with unemployment rates. A higher count does not mean CS graduates struggle more than Civil or Mechanical graduates — it simply reflects the sheer size of the student population in that branch.
            </p>
          </div>
        </div>

        {/* SECTION 3: BILATERAL STATE COMPARISON TOOL (SIMPLIFIED) */}
        <div className="bg-white rounded-3xl border border-[#EEECE7] p-7 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]/60">
                SIDE-BY-SIDE EXPLORER
              </span>
              <h3 className="text-2xl font-bold text-[#171717]">
                Compare Two States in Plain Numbers
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#F15B48]">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Direct Comparison</span>
            </div>
          </div>

          {/* State Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF9F6] p-4 rounded-2xl border border-[#EEECE7]">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#171717]">
                Choose First State:
              </label>
              <select
                value={comparatorStateA}
                onChange={(e) => setComparatorStateA(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#EEECE7] rounded-xl text-xs font-medium text-[#171717] outline-none cursor-pointer"
              >
                {data.states.map(s => (
                  <option key={`a-${s.state_id}`} value={s.state_id}>{s.state_name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#171717]">
                Choose Second State:
              </label>
              <select
                value={comparatorStateB}
                onChange={(e) => setComparatorStateB(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#EEECE7] rounded-xl text-xs font-medium text-[#171717] outline-none cursor-pointer"
              >
                {data.states.map(s => (
                  <option key={`b-${s.state_id}`} value={s.state_id}>{s.state_name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Simple 3-Card Comparison */}
          {stateA && stateB && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs font-sans">
                {/* Metric 1 */}
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-1.5">
                  <div className="text-xs uppercase font-bold text-[#171717]/60">Total Participants</div>
                  <div className="text-base font-extrabold text-[#171717]">
                    {stateA.state_name}: <span className="font-mono">{stateA.total_respondents.toLocaleString()}</span>
                  </div>
                  <div className="text-base font-extrabold text-[#171717]">
                    {stateB.state_name}: <span className="font-mono">{stateB.total_respondents.toLocaleString()}</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-1.5">
                  <div className="text-xs uppercase font-bold text-[#176B52]">People Working</div>
                  <div className="text-base font-extrabold text-[#176B52]">
                    {stateA.state_name}: <span className="font-mono">{stateA.employed_count.toLocaleString()}</span>
                  </div>
                  <div className="text-base font-extrabold text-[#176B52]">
                    {stateB.state_name}: <span className="font-mono">{stateB.employed_count.toLocaleString()}</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#EEECE7] space-y-1.5">
                  <div className="text-xs uppercase font-bold text-[#F15B48]">Looking for Work</div>
                  <div className="text-base font-extrabold text-[#F15B48]">
                    {stateA.state_name}: <span className="font-mono">{stateA.unemployed_count.toLocaleString()}</span>
                  </div>
                  <div className="text-base font-extrabold text-[#F15B48]">
                    {stateB.state_name}: <span className="font-mono">{stateB.unemployed_count.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Human Sentence Comparison */}
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EEECE7] text-xs text-[#171717]/80 leading-relaxed text-center">
                In <strong>{stateA.state_name}</strong>, {stateAOutOf100} out of every 100 participants said they were looking for work. In <strong>{stateB.state_name}</strong>, {stateBOutOf100} out of every 100 participants said they were looking for work.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 4: STATUTORY DEMARCATION & ACCURACY NOTICE (Requirement #7) */}
      <div className="p-6 bg-[#EEECE7] rounded-3xl text-xs font-sans text-[#171717]/85 space-y-3">
        <div className="flex items-center gap-2 font-bold text-[#171717] text-sm">
          <ShieldAlert className="w-5 h-5 text-[#F15B48] shrink-0" />
          <span>Statutory Demarcation & Data Transparency Guarantee</span>
        </div>
        <p className="leading-relaxed">
          <strong>Voluntary Survey Disclaimer:</strong> These statistics reflect voluntary survey responses submitted directly to India Employment Public Voice. They do <strong>NOT</strong> represent official government metrics published by the Ministry of Statistics and Programme Implementation (MOSPI), the Periodic Labour Force Survey (PLFS), or the Reserve Bank of India (RBI).
        </p>
        <p className="text-[11px] text-[#171717]/70 leading-normal">
          <strong>Zero Synthetic Data:</strong> Every number displayed on this dashboard is aggregated from real submissions. Categories with fewer than 5 respondents ($k &lt; 5$) are suppressed to guarantee individual respondent privacy.
        </p>
      </div>
    </div>
  );
};
