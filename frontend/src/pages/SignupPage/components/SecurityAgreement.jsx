import React from 'react';
import { Lock, Shield, Loader2, ArrowRight } from 'lucide-react';
import TermsCheckbox from './TermsCheckbox';
import SignupInputField from './SignupInputField';

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
        <SignupInputField 
          label="Password"
          icon={Lock}
          name="password"
          placeholder="••••••"
          type="password"
          formik={formik}
        />

        <SignupInputField 
          label="Confirm Password"
          icon={Shield}
          name="confirmPassword"
          placeholder="••••••"
          type="password"
          formik={formik}
        />
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
