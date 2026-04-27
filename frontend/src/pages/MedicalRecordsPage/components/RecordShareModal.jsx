import React from 'react';
import { Share2, ShieldCheck, X, CheckCircle, FileText } from 'lucide-react';

const RecordShareModal = ({ show, onClose, shareLink, copied, handleCopy }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 animate-in fade-in duration-300">
       <div 
         className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-all"
         onClick={onClose}
       />
       <div className="bg-[#ecf0f3] dark:bg-[#151E32] w-full max-w-md rounded-[3rem] p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),inset_2px_2px_4px_#ffffff,inset_-2px_-2px_4px_#cbced1] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),inset_2px_2px_4px_#202d47,inset_-2px_-2px_4px_#0a0f1d] relative z-10 animate-in zoom-in-95 duration-500">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all"
          >
             <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center mb-8">
             <div className="w-20 h-20 rounded-[2rem] bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] mb-4 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                <Share2 size={36} className="relative z-10 drop-shadow-md" />
             </div>
             <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white leading-tight">Secure Share Protocol</h3>
             <p className="text-[0.8rem] font-bold text-slate-400 mt-2">Generate an encrypted, 24-hour access link for your physician or biological analyst.</p>
          </div>

          <div className="bg-white/50 dark:bg-[#0B1121]/50 rounded-[2rem] p-6 border border-white/40 dark:border-white/5 mb-6">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck size={14} className="text-emerald-500" /> AES-256 Encrypted URL
                </span>
                <span className="text-[0.65rem] font-black text-amber-500 uppercase tracking-widest px-2 py-1 bg-amber-500/10 rounded-lg">Exp: 24h</span>
             </div>
             <div className="flex items-center gap-3">
                <input 
                   type="text" 
                   readOnly 
                   value={shareLink} 
                   className="flex-1 bg-white dark:bg-[#151E32] rounded-xl px-4 py-3 text-[0.8rem] font-black text-slate-600 dark:text-slate-300 outline-none border border-slate-200 dark:border-white/5 truncate"
                />
                <button 
                   onClick={handleCopy}
                   className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-[#2A7FFF] text-white shadow-[#2A7FFF]/30 hover:scale-105'}`}
                >
                   {copied ? <CheckCircle size={20} /> : <FileText size={20} />}
                </button>
             </div>
          </div>

          <button className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[0.9rem] uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
             Send via Secure Email
          </button>
       </div>
    </div>
  );
};

export default RecordShareModal;
