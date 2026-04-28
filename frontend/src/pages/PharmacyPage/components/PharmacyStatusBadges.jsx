import React from 'react';

const PharmacyStatusBadges = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="px-5 py-2 bg-emerald-500/10 text-emerald-500 text-[0.7rem] font-black rounded-full border border-emerald-500/20 uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Clinical Stock Active
      </div>
      <div className="px-5 py-2 bg-amber-500/10 text-amber-500 text-[0.7rem] font-black rounded-full border border-amber-500/20 uppercase tracking-[0.2em] flex items-center gap-2 shadow-sm">
        High Demand
      </div>
    </div>
  );
};

export default PharmacyStatusBadges;
