import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';

const SourcingEngineStatus = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
      <div>
        <h3 className="text-[1.1rem] sm:text-xl font-black text-[#1F2937] dark:text-white flex items-center gap-2 sm:gap-3">
          <ShoppingBag size={20} className="text-[#2A7FFF] sm:w-6 sm:h-6" />
          Price Intelligence
        </h3>
        <p className="text-[0.65rem] sm:text-[0.75rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time sourcing from NIH global database</p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2A7FFF]/10 rounded-full border border-[#2A7FFF]/20 self-start sm:self-auto">
         <Zap size={12} className="text-[#2A7FFF]" />
         <span className="text-[0.6rem] font-black text-[#2A7FFF] uppercase">Live API Active</span>
      </div>
    </div>
  );
};

export default SourcingEngineStatus;
