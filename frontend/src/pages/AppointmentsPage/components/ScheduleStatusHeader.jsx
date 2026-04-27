import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';

const ScheduleStatusHeader = ({ pendingCount }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d]">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center">
            <CalendarDays size={28} className="text-[#8B5CF6]" />
          </div>
        </div>
        <div>
          <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
            Clinical Schedule
          </h1>
          <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
            <Clock size={14} className="text-[#8B5CF6]" />
            Manage Patient Consultations
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4 px-8 py-4 bg-[#ecf0f3] dark:bg-[#1a2235] rounded-3xl shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d] border border-white/40">
         <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
         <span className="text-[0.8rem] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">{pendingCount} Pending Requests</span>
      </div>
    </div>
  );
};

export default ScheduleStatusHeader;
