import React from 'react';
import { CheckCircle } from 'lucide-react';

const ResetSuccessState = () => {
  return (
    <div className="animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/30">
        <CheckCircle size={48} className="text-white" />
      </div>
      <h2 className="text-[2rem] font-black text-slate-900 dark:text-white leading-tight mb-4">
        Registry Updated
      </h2>
      <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
        Your new credentials have been successfully synchronized. Redirecting to the secure login
        terminal...
      </p>
      <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#2ECC71] animate-[progress_3s_linear]" />
      </div>
    </div>
  );
};

export default ResetSuccessState;
