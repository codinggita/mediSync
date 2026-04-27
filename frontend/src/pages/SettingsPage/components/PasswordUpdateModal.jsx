import React from 'react';
import { X, Lock, Zap, Shield, Loader2 } from 'lucide-react';

const PasswordUpdateModal = ({ show, onClose, securityState, setSecurityState, onSubmit, isDarkMode }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
       <div className={`w-full max-w-lg rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#151E32]' : 'bg-[#ecf0f3]'}`}>
          <div className="px-10 py-8 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Update Credentials</h2>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-rose-500 mt-1">High-Level Encryption Protocol Active</p>
            </div>
            <button onClick={onClose} className="p-3 rounded-2xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-10 flex flex-col gap-6">
             <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                   <Lock size={12} /> Current Password
                </label>
                <input 
                   required type="password" 
                   value={securityState.passwords.current} 
                   onChange={e => setSecurityState(prev => ({ ...prev, passwords: { ...prev.passwords, current: e.target.value } }))}
                   placeholder="••••••••"
                   className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`}
                />
             </div>

             <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2A7FFF] flex items-center gap-2 px-1">
                   <Zap size={12} /> New Master Password
                </label>
                <input 
                   required type="password" 
                   value={securityState.passwords.new} 
                   onChange={e => setSecurityState(prev => ({ ...prev, passwords: { ...prev.passwords, new: e.target.value } }))}
                   placeholder="••••••••"
                   className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`}
                />
             </div>

             <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2A7FFF] flex items-center gap-2 px-1">
                   <Shield size={12} /> Confirm Clinical Hash
                </label>
                <input 
                   required type="password" 
                   value={securityState.passwords.confirm} 
                   onChange={e => setSecurityState(prev => ({ ...prev, passwords: { ...prev.passwords, confirm: e.target.value } }))}
                   placeholder="••••••••"
                   className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`}
                />
             </div>

             <div className="mt-4 flex gap-4">
                <button 
                   type="button" 
                   onClick={onClose}
                   className={`flex-1 py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-white shadow-md text-slate-500 hover:shadow-xl'}`}
                >
                   Cancel
                </button>
                <button 
                   disabled={securityState.updating}
                   className="flex-[2] py-5 rounded-[1.8rem] bg-[#2A7FFF] text-white font-black text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.4)] transition-all flex items-center justify-center gap-3"
                >
                   {securityState.updating ? <Loader2 size={20} className="animate-spin" /> : 'Synchronize'}
                </button>
             </div>
          </form>
       </div>
    </div>
  );
};

export default PasswordUpdateModal;
