import React from 'react';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

const ResetPasswordForm = ({ 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  handleSubmit, 
  isLoading, 
  error 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-[0.8rem] font-bold animate-in fade-in slide-in-from-top-2">
           <AlertCircle size={18} />
           {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest pl-4">New Password</label>
        <div className="relative group">
           <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2A7FFF] transition-colors" size={20} />
           <input 
             type="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             placeholder="••••••••"
             className="w-full pl-16 pr-8 py-5 bg-slate-50/50 dark:bg-[#0B1121]/50 border border-slate-100 dark:border-white/5 rounded-3xl text-[1rem] outline-none font-bold text-slate-800 dark:text-white focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
           />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest pl-4">Confirm Synchronization</label>
        <div className="relative group">
           <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2A7FFF] transition-colors" size={20} />
           <input 
             type="password" 
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
             placeholder="••••••••"
             className="w-full pl-16 pr-8 py-5 bg-slate-50/50 dark:bg-[#0B1121]/50 border border-slate-100 dark:border-white/5 rounded-3xl text-[1rem] outline-none font-bold text-slate-800 dark:text-white focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
           />
        </div>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full py-6 bg-[#2ECC71] text-white rounded-[2.2rem] text-[1.1rem] font-black shadow-xl shadow-[#2ECC71]/30 hover:bg-emerald-600 hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
      >
         {isLoading ? <><Loader2 className="animate-spin" size={20} /> Updating Registry...</> : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
