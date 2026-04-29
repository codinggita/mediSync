import React from 'react';
import { CalendarDays, Activity, Plus } from 'lucide-react';

const AppointmentsHeader = ({ onBookClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d]">
          <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
            <CalendarDays size={28} className="text-[#2A7FFF]" />
          </div>
        </div>
        <div>
          <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
            Clinical <span className="text-[#2A7FFF]">Schedule</span>
          </h1>
          <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
            <Activity size={14} className="text-[#2A7FFF]" />
            Synchronized Medical Appointments
          </p>
        </div>
      </div>

      <button
        onClick={onBookClick}
        className="hidden lg:flex items-center gap-4 px-10 py-5 bg-[#2A7FFF] text-white rounded-[1.8rem] font-black text-[1rem] shadow-[0_20px_40px_rgba(42,127,255,0.3)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.4)] hover:-translate-y-1 transition-all active:scale-95 group"
      >
        <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
        Book New Session
      </button>
    </div>
  );
};

export default AppointmentsHeader;
