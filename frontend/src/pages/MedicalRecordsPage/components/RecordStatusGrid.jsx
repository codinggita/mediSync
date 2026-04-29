import React from 'react';
import { AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

const RecordStatusGrid = ({ hasAlert }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center gap-5">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${hasAlert ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'} shadow-inner`}
        >
          {hasAlert ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
        </div>
        <div>
          <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
            Clinical Status
          </p>
          <h4
            className={`text-[1.1rem] font-black ${hasAlert ? 'text-amber-600' : 'text-emerald-600'}`}
          >
            {hasAlert ? 'Anomalies Detected' : 'Physiological Normal'}
          </h4>
        </div>
      </div>
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-[#2A7FFF] shadow-inner flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
            Encryption
          </p>
          <h4 className="text-[1.1rem] font-black text-[#2A7FFF]">AES-256 Secured</h4>
        </div>
      </div>
    </div>
  );
};

export default RecordStatusGrid;
