import React from 'react';
import { CheckCircle } from 'lucide-react';

const SignupSuccessOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ecf0f3] dark:bg-[#0B1121] transition-all duration-500">
      <div className="flex flex-col items-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-[#151E32] flex items-center justify-center shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] mb-6">
          <CheckCircle size={48} className="text-[#2ECC71] animate-bounce" />
        </div>
        <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white mb-2">Vault Secured</h2>
        <p className="text-[0.9rem] font-bold text-slate-500 uppercase tracking-[0.3em]">Syncing Biometrics...</p>
      </div>
    </div>
  );
};

export default SignupSuccessOverlay;
