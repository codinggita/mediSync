import React from 'react';
import { UploadCloud } from 'lucide-react';
import DropZone from './DropZone';
import TacticalTips from './TacticalTips';

const UploadSelectionContainer = ({ file, setFile }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[25px_25px_50px_#cbced1,-25px_-25px_50px_#ffffff] dark:shadow-[25px_25px_50px_#0a0f1d] border border-white/40 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
        <UploadCloud size={120} className="text-slate-900 dark:text-white" />
      </div>

      <div className="flex items-center justify-between mb-10 relative z-10">
        <h3 className="text-[1.4rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] shadow-inner">
            <UploadCloud size={20} />
          </div>
          Snapshot Selection
        </h3>
        <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-xl">
          {file ? 'Source Ready' : 'Awaiting Source'}
        </span>
      </div>

      <div className="relative z-10">
        <DropZone file={file} onFileSelected={setFile} onClear={() => setFile(null)} />
      </div>

      <TacticalTips />
    </div>
  );
};

export default UploadSelectionContainer;
