import React from 'react';
import { Zap, ShoppingBag, TrendingUp } from 'lucide-react';

const SavingsInsights = () => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] relative overflow-hidden group transition-all duration-500 hover:shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff]">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 group-hover:opacity-20 transition-opacity">
         <ShoppingBag size={120} className="text-[#2ECC71]" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[1rem] font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Zap size={20} className="text-[#2ECC71] animate-pulse" />
            Savings Insights
          </h3>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-[#2ECC71] text-[0.6rem] font-black rounded-full uppercase tracking-widest border border-emerald-500/20">Optimized</span>
        </div>
        
        <div className="mb-10">
           <p className="text-[0.7rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Total Savings This Month</p>
           <div className="flex items-baseline gap-2">
              <span className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tighter">₹2,480</span>
              <span className="text-[0.9rem] font-bold text-emerald-500 flex items-center gap-1">
                 <TrendingUp size={16} /> +12%
              </span>
           </div>
        </div>

        <div className="space-y-4">
           <div className="p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400">Medicine Cost Avoidance</span>
                 <span className="text-[0.75rem] font-black text-emerald-500">₹1,850</span>
              </div>
              <div className="h-2 bg-[#ecf0f3] dark:bg-[#151E32] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]">
                 <div className="h-full bg-emerald-500 w-[75%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] dark:shadow-[0_0_8px_rgba(46,204,113,0.5)]"></div>
              </div>
           </div>
           <div className="p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400">Consultation Efficiency</span>
                 <span className="text-[0.75rem] font-black text-[#2A7FFF]">₹630</span>
              </div>
              <div className="h-2 bg-[#ecf0f3] dark:bg-[#151E32] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]">
                 <div className="h-full bg-[#2A7FFF] w-[45%] rounded-full shadow-[0_0_8px_rgba(42,127,255,0.3)] dark:shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>
           </div>
        </div>

        <p className="mt-8 text-[0.7rem] text-slate-400 dark:text-slate-500 font-medium italic leading-relaxed">
           "By comparing prices across 12+ local pharmacies, you avoided a 35% price markup this month."
        </p>
      </div>
    </div>
  );
};

export default SavingsInsights;
