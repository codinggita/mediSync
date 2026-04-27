import { User, Mail } from 'lucide-react';
import RoleSelector from './RoleSelector';
import SignupInputField from './SignupInputField';

const BasicInfo = ({ step, formik, setStep }) => {
  if (step !== 1) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <RoleSelector 
        currentRole={formik.values.role} 
        setFieldValue={formik.setFieldValue} 
        setStep={setStep} 
      />

      <SignupInputField 
        label="Full Name"
        icon={User}
        name="name"
        placeholder="John Doe"
        formik={formik}
      />

      <SignupInputField 
        label="Email address"
        icon={Mail}
        name="email"
        placeholder="you@example.com"
        type="email"
        formik={formik}
      />

      <SignupInputField 
        label="Mobile Number"
        prefix="+91"
        name="phone"
        placeholder="9999999999"
        maxLength={10}
        formik={formik}
      />
    </div>
  );
};

export default BasicInfo;
