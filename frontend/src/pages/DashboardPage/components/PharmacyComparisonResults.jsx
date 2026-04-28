import React from 'react';
import { AlertTriangle } from 'lucide-react';
import PharmacyCard from './PharmacyCard';

const PharmacyComparisonResults = ({ selectedMed, onSelectPharmacy, onClear }) => {
  if (!selectedMed) return null;

  if (selectedMed.pharmacies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-center">
         <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <AlertTriangle size={36} className="text-amber-500" />
         </div>
         <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2">No Nearby Hubs found for "{selectedMed.name}"</h4>
         <p className="text-[0.8rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            Our clinical sourcing engine couldn't locate this medicine nearby.
         </p>
         <button onClick={onClear} className="mt-8 px-8 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded-xl font-black text-[0.75rem] uppercase tracking-widest border border-slate-200 dark:border-slate-700">
            Clear Search
         </button>
      </div>
    );
  }

  const sorted = [...selectedMed.pharmacies].sort((a, b) => a.price - b.price);
  const bestPrice = sorted[0].price;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#0B1121] rounded-2xl border border-slate-200/60 dark:border-slate-800 mb-6">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#2A7FFF] rounded-full" />
            <h4 className="text-[0.8rem] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em]">Compare {sorted.length} Pharmacies</h4>
         </div>
      </div>
      
      {sorted.map((pharm, idx) => (
        <PharmacyCard 
          key={idx}
          pharm={pharm}
          isBest={pharm.price === bestPrice}
          onClick={() => onSelectPharmacy({ ...pharm, medName: selectedMed.name })}
        />
      ))}
    </div>
  );
};

export default PharmacyComparisonResults;
