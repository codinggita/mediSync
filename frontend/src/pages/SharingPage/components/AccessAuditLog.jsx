import React from 'react';
import { History } from 'lucide-react';

const AccessAuditLog = ({ history }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-none border border-white/40">
      <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-8">
        <History size={20} className="text-[#2A7FFF]" /> Access Log
      </h3>
      <div className="space-y-8">
        {history.map((item) => (
          <div key={item.id} className="flex gap-5 group">
            <div className="w-1 h-auto bg-slate-200 dark:bg-slate-800 rounded-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2A7FFF] rounded-full border-2 border-white dark:border-[#151E32] shadow-sm" />
            </div>
            <div className="flex-1 pb-4">
              <p className="text-[0.85rem] font-black text-slate-800 dark:text-white leading-tight mb-1">{item.patient}</p>
              <p className="text-[0.7rem] font-bold text-[#2A7FFF] uppercase tracking-widest mb-2">{item.action}</p>
              <p className="text-[0.6rem] font-bold text-slate-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessAuditLog;
