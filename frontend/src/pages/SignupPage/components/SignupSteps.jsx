import React from 'react';
import PlanSelection from './PlanSelection';
import RoleDetails from './RoleDetails';
import BasicInfo from './BasicInfo';
import SecurityAgreement from './SecurityAgreement';
import SignupNavigation from './SignupNavigation';

const SignupSteps = ({
  step,
  setStep,
  formik,
  selectedPlan,
  setSelectedPlan,
  isLoading,
  setError,
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
      <BasicInfo step={step} formik={formik} setStep={setStep} />

      {/* Step 2: Role Details */}
      <RoleDetails step={step} formik={formik} />

      {/* Step 3: Security & Agreement */}
      <SecurityAgreement
        step={step}
        formik={formik}
        setStep={setStep}
        isLoading={isLoading}
        setError={setError}
      />

      {/* Navigation for steps 1 and 2 */}
      <SignupNavigation step={step} setStep={setStep} formik={formik} />
    </>
  );
};

export default SignupSteps;
