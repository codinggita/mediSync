import React from 'react';
import { Share2, Activity, ShieldCheck } from 'lucide-react';

const SharingHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d]">
          <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
            <Share2 size={28} className="text-[#2A7FFF]" />
          </div>
        </div>
        <div>
          <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-4">
            Data Sharing Hub
            <span className="px-4 py-1.5 bg-[#2ECC71]/10 text-[#2ECC71] text-[0.65rem] rounded-full font-black uppercase tracking-widest border border-[#2ECC71]/20">
              Secure Sharing
            </span>
          </h1>
          <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
            <Activity size={14} className="text-[#2A7FFF]" />
            Share Medical Records with Specialists
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-4 px-8 py-4 bg-[#ecf0f3] dark:bg-[#1a2235] rounded-3xl shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d] border border-white/40">
        <ShieldCheck className="text-[#2ECC71]" size={22} />
        <span className="text-[0.8rem] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">
          HIPAA Compliant
        </span>
      </div>
    </div>
  );
};

export default SharingHeader;
