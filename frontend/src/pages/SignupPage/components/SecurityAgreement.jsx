import React from 'react';
import { Lock, Shield, Loader2, ArrowRight } from 'lucide-react';
import TermsCheckbox from './TermsCheckbox';

const SecurityAgreement = ({ 
  step, 
  formik, 
  setStep, 
  isLoading, 
  setError 
}) => {
  if (step !== 3) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Password</label>
          <div className="relative flex items-center group">
            <Lock className={`absolute left-4 transition-colors ${formik.errors.password && formik.touched.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
            <input 
              type="password" {...formik.getFieldProps('password')}
              placeholder="••••••"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.password && formik.errors.password && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.password}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Confirm Password</label>
          <div className="relative flex items-center group">
            <Shield className={`absolute left-4 transition-colors ${formik.errors.confirmPassword && formik.touched.confirmPassword ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
            <input 
              type="password" {...formik.getFieldProps('confirmPassword')}
              placeholder="••••••"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.confirmPassword}</span>}
        </div>
      </div>

      <TermsCheckbox 
        fieldProps={formik.getFieldProps('agreeTerms')} 
        error={formik.errors.agreeTerms} 
        touched={formik.touched.agreeTerms} 
      />

      <div className="flex gap-4 mt-3">
        <button 
          type="button" 
          onClick={() => setStep(prev => prev - 1)}
          className="flex-[0.5] py-4 rounded-xl font-bold text-[0.95rem] text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all bg-[#ecf0f3]"
        >
          Back
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          onClick={() => {
            const errors = Object.values(formik.errors);
            if (errors.length > 0) {
              setError(`Missing fields: ${errors[0]}`);
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-[#ecf0f3] text-[#2A7FFF] py-4 rounded-xl font-black text-[0.95rem] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] disabled:opacity-70 transition-all group"
        >
          {isLoading ? <><Loader2 size={18} className="animate-spin" /> Creating Vault...</> : <>Complete Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
        </button>
      </div>
    </div>
  );
};

export default SecurityAgreement;
