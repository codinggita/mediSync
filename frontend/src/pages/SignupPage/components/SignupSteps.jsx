import React from 'react';
import { 
  ShieldCheck, Lock, ArrowRight, User, Stethoscope, Mail, Loader2
} from 'lucide-react';
import PlanSelection from './PlanSelection';
import RoleDetails from './RoleDetails';

const SignupSteps = ({ 
  step, 
  setStep, 
  formik, 
  selectedPlan, 
  setSelectedPlan, 
  isLoading,
  setError
}) => {
  return (
    <>
      {/* Step 0: Plan Selection */}
      {step === 0 && (
        <PlanSelection 
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          setStep={setStep}
        />
      )}

      {/* Step 1: Basic Info */}
      <div className={step === 1 ? 'flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}>
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Register As</label>
          <div className="grid grid-cols-3 gap-3 mt-1">
            {[
              { id: 'Patient', icon: User },
              { id: 'Doctor', icon: Stethoscope },
              { id: 'Admin', icon: ShieldCheck }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  formik.setFieldValue('role', r.id);
                  if (r.id !== 'Doctor') setStep(1); // Reset step if changing away from doctor
                }}
                className={`py-3 px-2 rounded-xl text-[0.75rem] font-bold transition-all flex flex-col items-center gap-1.5 ${
                  formik.values.role === r.id 
                    ? 'bg-[#ecf0f3] text-[#2A7FFF] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' 
                    : 'bg-[#ecf0f3] text-slate-500 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff]'
                }`}
              >
                <r.icon size={18} className={formik.values.role === r.id ? 'drop-shadow-md' : ''} />
                {r.id}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
          <div className="relative flex items-center group">
            <User className={`absolute left-4 transition-colors ${formik.errors.name && formik.touched.name ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
            <input 
              {...formik.getFieldProps('name')}
              placeholder="John Doe"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.name && formik.errors.name && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Email address</label>
          <div className="relative flex items-center group">
            <Mail className={`absolute left-4 transition-colors ${formik.errors.email && formik.touched.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
            <input 
              {...formik.getFieldProps('email')}
              placeholder="you@example.com"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.email && formik.errors.email && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.email}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Mobile Number</label>
          <div className="relative flex items-center group">
            <div className={`absolute left-4 transition-colors ${formik.errors.phone && formik.touched.phone ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'} text-[0.8rem] font-bold`}>+91</div>
            <input 
              {...formik.getFieldProps('phone')}
              placeholder="9999999999"
              maxLength={10}
              className="w-full py-3 pl-14 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400 font-bold tracking-widest"
            />
          </div>
          {formik.touched.phone && formik.errors.phone && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.phone}</span>}
        </div>
      </div>

      {/* Step 2: Role Details */}
      <RoleDetails step={step} formik={formik} />

      {/* Step 3: Security & Agreement */}
      <div className={step === 3 ? 'flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300' : 'hidden'}>
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

        <label className="flex items-center gap-3 text-slate-500 font-medium cursor-pointer mt-2 px-1">
          <div className="relative flex items-center justify-center w-5 h-5 rounded shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] bg-[#ecf0f3]">
            <input type="checkbox" {...formik.getFieldProps('agreeTerms')} className="opacity-0 absolute inset-0 cursor-pointer peer" />
            <div className="w-3 h-3 rounded-[2px] bg-[#2A7FFF] scale-0 peer-checked:scale-100 transition-transform" />
          </div>
          <span className="text-[0.75rem]">I agree to the <span className="text-[#2A7FFF] font-bold hover:underline">Terms</span> and <span className="text-[#2A7FFF] font-bold hover:underline">Privacy Policy</span>.</span>
        </label>
        {formik.touched.agreeTerms && formik.errors.agreeTerms && <span className="text-[0.6rem] font-bold text-red-500 pl-1">{formik.errors.agreeTerms}</span>}

        {step === 3 && (
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
        )}
      </div>

      {step > 0 && step < 3 && (
        <div className="flex gap-4 mt-3">
          {step === 2 && (
            <button 
              type="button" 
              onClick={() => setStep(prev => prev - 1)}
              className="flex-[0.5] py-4 rounded-xl font-bold text-[0.95rem] text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all bg-[#ecf0f3]"
            >
              Back
            </button>
          )}
          <button 
            type="button" 
            onClick={() => {
              setStep(prev => prev + 1);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#ecf0f3] text-[#2A7FFF] py-4 rounded-xl font-black text-[0.95rem] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all group"
          >
            Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </>
  );
};

export default SignupSteps;
