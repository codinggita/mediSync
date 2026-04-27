import React from 'react';
import { Heart, ShieldCheck, Share2 } from 'lucide-react';

const ClinicalIdCard = () => {
  const handleShareId = () => {
    navigator.clipboard.writeText('O+, Penicillin Allergy');
    alert('ID Shared');
  };

  return (
    <div className="bg-white dark:bg-[#090E1A] rounded-[2rem] p-10 border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group/id">
      <div className="absolute -top-10 -right-10 p-12 opacity-[0.03] dark:opacity-5 group-hover/id:rotate-12 transition-transform duration-1000 pointer-events-none">
        <Heart size={280} className="text-[#E11D48]" />
      </div>
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[1.2rem] bg-[#E11D48]/10 flex items-center justify-center text-[#E11D48]">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white tracking-tight leading-none">Clinical ID</h3>
            <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Tier-1 Responder Access</p>
          </div>
        </div>
        <button 
          onClick={handleShareId} 
          className="w-12 h-12 rounded-[0.8rem] bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-[#E11D48] transition-all flex items-center justify-center border border-slate-200 dark:border-white/5"
        >
          <Share2 size={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="p-7 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-all">
          <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Biometric</p>
          <p className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tighter">O Positive</p>
        </div>
        <div className="p-7 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-all">
          <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Critical Allergy</p>
          <p className="text-[1.8rem] font-black text-rose-500 tracking-tighter">Penicillin</p>
        </div>
      </div>
    </div>
  );
};

export default ClinicalIdCard;
