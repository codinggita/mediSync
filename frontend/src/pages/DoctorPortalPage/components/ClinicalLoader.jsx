import React from 'react';
import { Loader2 } from 'lucide-react';

const ClinicalLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-2xl">
      <Loader2 className="animate-spin text-[#2A7FFF]" size={50} />
      <p className="text-slate-400 font-black uppercase tracking-widest">Synchronizing Clinical Data...</p>
    </div>
  );
};

export default ClinicalLoader;
