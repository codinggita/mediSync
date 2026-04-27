import React from 'react';
import { History } from 'lucide-react';

const RecordsBranding = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
        <History size={30} className="text-[#2A7FFF] drop-shadow-[0_4px_8px_rgba(42,127,255,0.3)]" />
      </div>
      <div>
        <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
          Medical Vault
        </h1>
        <p className="text-[0.8rem] font-bold text-gray-400 mt-1 uppercase tracking-widest">
          Secure Biological Data History
        </p>
      </div>
    </div>
  );
};

export default RecordsBranding;
