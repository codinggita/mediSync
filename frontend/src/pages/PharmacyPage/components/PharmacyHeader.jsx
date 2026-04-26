import React, { useState } from 'react';
import { Star, Bookmark, Send, CheckCircle, MapPin, Clock } from 'lucide-react';

const PharmacyHeader = () => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#0a0f1d] p-10 border border-white/40 relative overflow-hidden group">
      
      {/* Decorative Architecture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">

        {/* Left — Info Cluster */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
             <div className="px-5 py-2 bg-emerald-500/10 text-emerald-500 text-[0.7rem] font-black rounded-full border border-emerald-500/20 uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               Clinical Stock Active
             </div>
             <div className="px-5 py-2 bg-amber-500/10 text-amber-500 text-[0.7rem] font-black rounded-full border border-amber-500/20 uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
               High Demand
             </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
              MedPlus <span className="text-[#2A7FFF]">Intelligence</span>
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/40 dark:bg-black/10 rounded-2xl border border-white/40 shadow-sm transition-transform hover:scale-105">
                <MapPin size={18} className="text-[#2A7FFF]" />
                <span className="text-[0.95rem] font-black text-slate-600 dark:text-slate-300">Sector 18, Noida Node</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white/40 dark:bg-black/10 rounded-2xl border border-white/40 shadow-sm transition-transform hover:scale-105">
                <Clock size={18} className="text-[#2A7FFF]" />
                <span className="text-[0.95rem] font-black text-slate-600 dark:text-slate-300 tracking-tight">Syncs until 22:00</span>
              </div>
            </div>
          </div>

          {/* Star Rating — Precision Render */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 p-2 bg-white/50 dark:bg-black/20 rounded-2xl border border-white/60">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={18}
                  className={i <= 4 ? 'fill-amber-400 text-amber-400 drop-shadow-sm' : 'fill-slate-200 text-slate-200'}
                />
              ))}
            </div>
            <div className="flex flex-col">
               <span className="text-[1.2rem] font-black text-slate-900 dark:text-white leading-none">4.2 <span className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-widest ml-1">Precision</span></span>
               <span className="text-[0.7rem] text-slate-400 font-black mt-1">328 VERIFIED REVIEWS</span>
            </div>
          </div>
        </div>

        {/* Right — Strategic Actions */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <button
            onClick={() => setSaved(!saved)}
            className={`w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center gap-1 transition-all duration-500 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-none border border-white/40 group/btn ${
              saved
                ? 'bg-[#2A7FFF] text-white shadow-[#2A7FFF]/30'
                : 'bg-[#ecf0f3] dark:bg-[#151E32] text-slate-400 hover:text-[#2A7FFF]'
            }`}
          >
            <Bookmark size={24} className={saved ? 'fill-white' : 'group-hover/btn:scale-110 transition-transform'} />
            <span className="text-[0.65rem] font-black uppercase tracking-tighter">{saved ? 'Stored' : 'Archive'}</span>
          </button>

          <button className="h-20 px-10 rounded-[2rem] bg-gradient-to-br from-[#2A7FFF] to-[#1C71E1] text-white font-black text-[1rem] shadow-[0_20px_40px_rgba(42,127,255,0.4)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.5)] hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-5 border border-white/10 uppercase tracking-widest">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
               <Send size={18} />
            </div>
            Deploy Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHeader;
