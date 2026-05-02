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
      {}
      <PlanSelection
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
      />

      {}
      <BasicInfo step={step} formik={formik} setStep={setStep} />

      {}
      <RoleDetails step={step} formik={formik} />

      {}
      <SecurityAgreement
        step={step}
        formik={formik}
        setStep={setStep}
        isLoading={isLoading}
        setError={setError}
      />

      {}
      <SignupNavigation step={step} setStep={setStep} formik={formik} />
    </>
  );
};

export default SignupSteps;
