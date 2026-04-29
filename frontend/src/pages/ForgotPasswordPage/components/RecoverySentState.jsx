import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const RecoverySentState = ({ email }) => {
  return (
    <div className="animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/30">
        <CheckCircle size={48} className="text-white" />
      </div>
      <h2 className="text-[2rem] font-black text-slate-900 dark:text-white leading-tight mb-4">
        Sync Initialized
      </h2>
      <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
        A secure reset protocol has been dispatched to <strong>{email}</strong>. Please check your
        inbox to complete synchronization.
      </p>
      <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/10 mb-10">
        <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <Clock size={12} /> Link expires in 10 minutes
        </p>
      </div>
    </div>
  );
};

export default RecoverySentState;
