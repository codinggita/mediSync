import React from 'react';
import { Calendar } from 'lucide-react';

const TimelineHeader = ({ count }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3">
          <Calendar size={20} className="text-[#2A7FFF]" />
          Timeline
        </h3>
        <p className="text-[0.7rem] font-black text-gray-400 mt-1 uppercase tracking-widest">{count} Biological Snapshots</p>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_3px_3px_6px_#cbced1,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0a0f1d,inset_-3px_-3px_6px_#202d47] flex items-center justify-center text-[#2A7FFF] font-black text-[0.8rem]">
         {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default TimelineHeader;
