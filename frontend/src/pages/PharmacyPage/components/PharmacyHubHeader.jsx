import React from 'react';
import { Pill, Zap } from 'lucide-react';

const PharmacyHubHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-3xl bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#263350]">
          <div className="w-10 h-10 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
            <Pill size={26} className="text-[#2A7FFF] drop-shadow-sm" />
          </div>
        </div>
        <div>
          <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-3">
            Pharmacy Hub
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[0.6rem] rounded-full font-black uppercase tracking-widest border border-emerald-500/20">
              Active Intelligence
            </span>
          </h1>
          <p className="text-[0.8rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Zap size={12} className="text-amber-500" />
            Find, Compare & Track Clinical Artifacts
          </p>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHubHeader;
