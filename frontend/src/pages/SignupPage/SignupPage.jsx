import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { AlertCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import loginBg from '../../assets/images/login-bg.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import SignupBranding from './components/SignupBranding';
import SignupSteps from './components/SignupSteps';
import SignupSuccessOverlay from './components/SignupSuccessOverlay';
import SignupProgressDots from './components/SignupProgressDots';
import SignupHeader from './components/SignupHeader';
import SignupGoogleAuth from './components/SignupGoogleAuth';
import { SignupSchema } from './utils/SignupValidation';
import { INITIAL_SIGNUP_VALUES } from './utils/SignupConstants';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0); // 0: Plan Selection, 1: Basic Info, 2: Details, 3: Security
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();

  // Handle pre-fill from Google if redirected from Login page
  useEffect(() => {
    if (location.state?.googleData) {
      const { name, email } = location.state.googleData;
      formik.setFieldValue('name', name);
      formik.setFieldValue('email', email);
      // If we are at step 0 or 1, move to details step
      if (step <= 1) setStep(2);
    }
  }, [location.state]);

  const formik = useFormik({
    initialValues: INITIAL_SIGNUP_VALUES,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          phone: values.phone,
          plan: selectedPlan,
        };

        if (values.role === 'Patient') {
          payload.bloodGroup = values.bloodGroup;
          payload.gender = values.gender;
        } else if (values.role === 'Doctor') {
          payload.specialty = values.specialty;
          payload.hospital = values.hospital;
          payload.medicalLicenseId = values.medicalLicenseId;
          payload.orgEmail = values.orgEmail;
          payload.licenseCertificateUrl = values.licenseCertificateUrl;
          payload.profilePic = values.profilePic;
        }

        const { data } = await api.post('/auth/register', payload);
        
        setIsLoading('success');
        
        setTimeout(() => {
          signup(data);
          if (data.role === 'Doctor') {
            navigate('/doctor-portal');
          } else if (data.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Registration failed.');
        setIsLoading(false);
      }
    }
  });

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      formik.setFieldValue('name', decoded.name);
      formik.setFieldValue('email', decoded.email);
      if (step <= 1) setStep(2);
      setError(null);
    } catch (err) {
      setError('Google data import failed.');
    }
  };

  const handleGoogleError = () => setError('Google sign-in failed.');

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      
      <SignupSuccessOverlay show={isLoading === 'success'} />

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white/95 backdrop-blur-3xl border border-white rounded-3xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden z-10 m-4 max-h-[90vh]">
        <SignupBranding />
        
        <div className="flex-[1.2] px-6 py-6 md:px-10 flex flex-col justify-start bg-[#ecf0f3] overflow-y-auto scrollbar-hide rounded-r-3xl z-10">
          <div className="w-full max-w-[400px] mx-auto">
            <SignupHeader />

            {error && (
              <div className="mb-4 p-3 bg-[#ecf0f3] rounded-xl flex items-start gap-2 text-red-500 animate-in fade-in slide-in-from-top-2 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span className="text-[0.75rem] font-bold">{error}</span>
              </div>
            )}

            <SignupProgressDots step={step} />

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <SignupSteps 
                step={step}
                setStep={setStep}
                formik={formik}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                isLoading={isLoading}
                setError={setError}
              />
            </form>

            <SignupGoogleAuth 
              role={formik.values.role}
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            <div className="text-center mt-6 text-[0.85rem] text-slate-500 font-medium pb-4">
              Already have an account? <Link to="/login" className="text-[#2A7FFF] font-bold hover:underline">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;



