import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CriticalCasesPanel = ({ criticalCases }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
      {/* Decorative Warning Background Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-[1.5rem] font-black text-red-500 flex items-center gap-4 mb-8 uppercase tracking-widest relative z-10">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
          <AlertTriangle size={20} className="animate-pulse" />
        </div>
        Critical Cases
      </h3>

      <div className="flex flex-col gap-5 relative z-10">
        {criticalCases.map((c) => (
          <div
            key={c.id}
            className="bg-[#ecf0f3] dark:bg-[#151E32] p-6 rounded-[24px] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border-l-4 border-l-red-500 relative overflow-hidden group hover:-translate-y-1 transition-transform"
          >
            <div className="absolute top-1/2 -translate-y-1/2 right-4 p-3 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <ShieldAlert size={60} className="text-red-500" />
            </div>
            <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white leading-tight">
              {c.name}
            </h4>
            <p className="text-[0.85rem] font-bold text-red-500 mt-1 uppercase tracking-wider">
              {c.condition}
            </p>
            <div className="mt-5 pt-4 border-t-2 border-slate-200/50 dark:border-slate-800/50 flex justify-between items-center relative z-10">
              <span className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest bg-white/50 dark:bg-black/20 px-3 py-1 rounded-md">
                {c.status}
              </span>
              <button
                onClick={() => navigate('/doctor-portal')}
                className="text-[0.75rem] font-black text-[#2A7FFF] hover:text-white hover:bg-[#2A7FFF] px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 uppercase tracking-widest"
              >
                Review Case
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate('/records')}
          className="w-full mt-4 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] text-red-500 font-black text-[0.8rem] uppercase tracking-widest hover:text-red-600 transition-colors active:scale-[0.98]"
        >
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default CriticalCasesPanel;
