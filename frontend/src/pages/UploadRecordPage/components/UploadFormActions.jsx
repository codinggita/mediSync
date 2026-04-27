import React from 'react';
import { CheckCircle, UploadCloud } from 'lucide-react';

const UploadFormActions = ({ file, submitted, onCancel }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <button
        type="submit"
        disabled={!file || submitted}
        className={`w-full py-4 rounded-2xl text-[0.9rem] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3
          ${submitted
            ? 'bg-[#2ECC71] text-white shadow-[0_10px_20px_rgba(46,204,113,0.3)]'
            : !file
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50'
              : 'bg-[#2A7FFF] hover:bg-[#1C71E1] text-white shadow-[0_10px_20px_rgba(42,127,255,0.3)] hover:-translate-y-1 active:translate-y-0.5'
          }`}
      >
        {submitted ? (
          <><CheckCircle size={18} /> Artifact Synchronized</>
        ) : (
          <><UploadCloud size={18} /> Commit to Vault</>
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] text-slate-400 font-black text-[0.8rem] uppercase tracking-widest hover:text-red-500 active:shadow-inset transition-all"
      >
        Abort Protocol
      </button>
    </div>
  );
};

export default UploadFormActions;
