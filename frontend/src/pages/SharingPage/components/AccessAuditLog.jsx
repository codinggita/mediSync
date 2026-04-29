import React from 'react';
import { History, Clock } from 'lucide-react';

const AccessAuditLog = ({ history }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden flex flex-col h-full min-h-[300px]">
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
          <History size={20} className="text-[#2A7FFF]" />
        </div>
        Access Log
      </h3>

      {history && history.length > 0 ? (
        <div className="space-y-8 relative z-10 overflow-y-auto scrollbar-hide pr-2">
          {history.map((item) => (
            <div key={item.id} className="flex gap-5 group">
              <div className="w-1.5 h-auto bg-[#ecf0f3] dark:bg-[#0B1121] rounded-full shadow-[inset_1px_1px_2px_#cbced1,inset_-1px_-1px_2px_#ffffff] dark:shadow-none relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2A7FFF] rounded-full border-4 border-[#ecf0f3] dark:border-[#151E32] shadow-[0_0_10px_rgba(42,127,255,0.4)] group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex-1 pb-4 bg-transparent group-hover:translate-x-2 transition-transform duration-300">
                <p className="text-[0.95rem] font-black text-slate-900 dark:text-white leading-tight mb-1">
                  {item.patient}
                </p>
                <div className="inline-block px-3 py-1 bg-[#2A7FFF]/10 rounded-lg border border-[#2A7FFF]/20 mb-2">
                  <p className="text-[0.65rem] font-black text-[#2A7FFF] uppercase tracking-widest">
                    {item.action}
                  </p>
                </div>
                <p className="text-[0.7rem] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                  <Clock size={12} /> {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 py-8 text-center bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#0a0f1d,inset_-8px_-8px_16px_#202d47] border border-white/20 dark:border-white/5 relative z-10">
          <History size={32} className="text-slate-400 mb-4 opacity-50" />
          <p className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest">
            No Recent Access
          </p>
          <p className="text-[0.7rem] text-slate-400 font-bold mt-1 opacity-80">
            Audit logs will appear here when files are shared.
          </p>
        </div>
      )}
    </div>
  );
};

export default AccessAuditLog;
