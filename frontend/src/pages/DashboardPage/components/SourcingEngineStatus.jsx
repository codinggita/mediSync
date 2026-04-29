import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';

const SourcingEngineStatus = () => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
        Medicine <span className="text-[#2A7FFF]">Intelligence</span>
      </h3>
      <p className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
        Compare prices across 500+ verified pharmacies
      </p>
    </div>
  );
};

export default SourcingEngineStatus;
