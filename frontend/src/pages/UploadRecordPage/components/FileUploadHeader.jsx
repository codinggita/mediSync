import React from 'react';
import { CloudUpload } from 'lucide-react';

const FileUploadHeader = ({ dragging }) => {
  return (
    <>
      <div className={`relative flex items-center justify-center w-24 h-24 rounded-3xl transition-all duration-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47]
        ${dragging ? 'bg-[#2A7FFF] text-white rotate-12' : 'bg-[#ecf0f3] dark:bg-[#151E32] text-[#2A7FFF]'}`}
      >
        {dragging && (
          <span className="absolute inset-0 rounded-3xl border-4 border-[#2A7FFF] animate-ping opacity-20" />
        )}
        <CloudUpload size={44} className="relative z-10" />
      </div>

      <div className="text-center">
        <p className="text-[1.1rem] font-black text-slate-800 dark:text-white leading-tight">
          {dragging ? 'Release to Scan' : 'Synchronize Health Data'}
        </p>
        <p className="text-[0.8rem] text-slate-400 font-bold mt-2 uppercase tracking-widest">
          Drag artifacts or <span className="text-[#2A7FFF] underline underline-offset-4">browse local storage</span>
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-center opacity-60">
        {['PDF', 'PNG', 'JPG', 'WEBP'].map(f => (
          <span key={f} className="text-[0.6rem] font-black px-3 py-1 rounded-lg bg-white/50 dark:bg-black/20 text-slate-500 border border-white/40">
            {f}
          </span>
        ))}
      </div>
    </>
  );
};

export default FileUploadHeader;
