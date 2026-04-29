import React from 'react';
import { HeartPulse, Calendar, RefreshCw, Search } from 'lucide-react';

const ClinicalHeader = ({
  refreshing,
  handleRefresh,
  activeAppointment,
  patients,
  selectedPatientId,
  setSelectedPatientId,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-5">
      <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-lg">
        <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
          <HeartPulse size={28} className="text-[#2A7FFF]" />
        </div>
      </div>
      <div>
        <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
          Clinical <span className="text-[#2A7FFF]">Command</span>
        </h1>
        <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
          <Calendar size={14} className="text-[#2A7FFF]" /> Active Patient Workspace
        </p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="hidden xl:flex flex-col items-end border-r border-slate-300 dark:border-slate-800 pr-6 mr-6">
        <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
          Next Patient
        </span>
        <span className="text-[0.9rem] font-black text-[#2A7FFF] truncate max-w-[150px]">
          {activeAppointment?.patient?.name || patients[0]?.name || 'No Pending'}
        </span>
      </div>

      <button
        onClick={handleRefresh}
        className={`w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] shadow-md transition-all ${refreshing ? 'animate-spin' : ''}`}
      >
        <RefreshCw size={20} />
      </button>

      <div className="hidden lg:flex items-center gap-4 p-2 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] shadow-inner border border-white/40">
        <div className="pl-6 pr-4 py-2 border-r border-slate-300 dark:border-slate-700">
          <span className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.1em]">
            Patient Node
          </span>
        </div>
        <div className="relative group min-w-[200px]">
          <select
            value={selectedPatientId || ''}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full appearance-none bg-transparent px-4 py-2 text-[1rem] font-black text-[#2A7FFF] outline-none cursor-pointer"
          >
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.patientId || 'NEW'})
              </option>
            ))}
          </select>
          <Search
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ClinicalHeader;
