import React from 'react';
import { ArrowRight } from 'lucide-react';
import PlanSelection from './PlanSelection';
import RoleDetails from './RoleDetails';
import BasicInfo from './BasicInfo';
import SecurityAgreement from './SecurityAgreement';

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
      <PlanSelection 
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
      />

      {/* Step 1: Basic Info */}
      <BasicInfo 
        step={step} 
        formik={formik} 
        setStep={setStep} 
      />

      {/* Step 2: Role Details */}
      <RoleDetails 
        step={step} 
        formik={formik} 
      />

      {/* Step 3: Security & Agreement */}
      <SecurityAgreement 
        step={step} 
        formik={formik} 
        setStep={setStep} 
        isLoading={isLoading} 
        setError={setError} 
      />

      {/* Navigation for steps 1 and 2 */}
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
