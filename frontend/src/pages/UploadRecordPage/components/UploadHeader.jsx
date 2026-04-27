import React from 'react';
import { UploadCloud, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate(-1)}
          className="w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] active:translate-y-0.5 transition-all"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="w-16 h-16 rounded-[2.2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-none p-1">
          <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#2A7FFF] to-[#1C71E1] flex items-center justify-center shadow-lg">
            <UploadCloud size={28} className="text-white" />
          </div>
        </div>

        <div>
          <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
            Biological <span className="text-[#2A7FFF]">Vault</span>
          </h1>
          <div className="text-[0.85rem] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             Secure Artifact Synchronization
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 px-8 py-4 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[2rem] shadow-2xl">
         <div className="flex flex-col items-end">
            <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status Protocol</span>
            <span className="text-[0.8rem] font-black text-emerald-500 uppercase">End-to-End Encrypted</span>
         </div>
         <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <ShieldCheck size={24} />
         </div>
      </div>
    </div>
  );
};

export default UploadHeader;
