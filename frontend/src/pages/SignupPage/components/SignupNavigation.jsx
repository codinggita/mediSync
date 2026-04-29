import React from 'react';
import { ArrowRight } from 'lucide-react';

// Fields required at each step before advancing
const STEP_FIELDS = {
  1: ['role', 'name', 'email', 'phone'],
  2: ['bloodGroup', 'gender', 'specialty', 'hospital', 'medicalLicenseId'], 
};

const SignupNavigation = ({ step, setStep, formik }) => {
  if (step === 0 || step === 3) return null;

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[step] || [];
    // Touch all relevant fields to trigger error messages
    const touchedFields = {};
    fieldsToValidate.forEach(f => { touchedFields[f] = true; });
    await formik.setTouched({ ...formik.touched, ...touchedFields }, true);

    // Check if any of these fields have errors
    const currentErrors = await formik.validateForm();
    const hasErrors = fieldsToValidate.some(field => currentErrors[field]);

    if (!hasErrors) {
      setStep(prev => prev + 1);
    }
  };

  return (
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
        onClick={handleNext}
        className="flex-1 flex items-center justify-center gap-2 bg-[#ecf0f3] text-[#2A7FFF] py-4 rounded-xl font-black text-[0.95rem] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all group"
      >
        Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default SignupNavigation;
