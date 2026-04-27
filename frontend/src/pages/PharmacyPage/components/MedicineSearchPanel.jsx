import React from 'react';
import { Search, Pill, TrendingDown, ArrowRight } from 'lucide-react';

const MedicineSearchPanel = () => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] border border-white/40">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-tight">
            Medicine <span className="text-[#2A7FFF]">Intelligence</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-2 uppercase tracking-widest text-[0.8rem]">Compare prices across 500+ verified pharmacies</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2A7FFF] transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search for Paracetamol, Insulin, or Amoxicillin..."
            className="w-full py-6 pl-16 pr-8 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-3xl shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d,inset_-6px_-6px_12px_#202d47] border-none outline-none text-[1.1rem] font-bold text-slate-800 dark:text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-white/60 flex items-center gap-4 group cursor-pointer hover:bg-[#2A7FFF] hover:text-white transition-all">
             <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 group-hover:bg-white/20 flex items-center justify-center text-[#2A7FFF] group-hover:text-white">
                <Pill size={24} />
             </div>
             <div>
                <p className="text-[0.7rem] font-black uppercase tracking-widest opacity-60">Trending</p>
                <p className="text-[1rem] font-black">Azithromycin</p>
             </div>
          </div>
          <div className="p-6 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-white/60 flex items-center gap-4 group cursor-pointer hover:bg-[#2A7FFF] hover:text-white transition-all">
             <div className="w-12 h-12 rounded-2xl bg-[#2ECC71]/10 group-hover:bg-white/20 flex items-center justify-center text-[#2ECC71] group-hover:text-white">
                <TrendingDown size={24} />
             </div>
             <div>
                <p className="text-[0.7rem] font-black uppercase tracking-widest opacity-60">Price Drop</p>
                <p className="text-[1rem] font-black">Metformin</p>
             </div>
          </div>
          <div className="p-6 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-white/60 flex items-center gap-4 group cursor-pointer hover:bg-[#2A7FFF] hover:text-white transition-all">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 group-hover:bg-white/20 flex items-center justify-center text-amber-500 group-hover:text-white">
                <ArrowRight size={24} />
             </div>
             <div>
                <p className="text-[0.7rem] font-black uppercase tracking-widest opacity-60">Substitutes</p>
                <p className="text-[1rem] font-black">Find Generic</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineSearchPanel;
