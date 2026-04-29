import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { jwtDecode } from 'jwt-decode';
import { ShieldAlert } from 'lucide-react';
import loginBg from '../../assets/images/login-bg.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import SignupBranding from './components/SignupBranding';
import SignupSteps from './components/SignupSteps';
import SignupSuccessOverlay from './components/SignupSuccessOverlay';
import SignupProgressDots from './components/SignupProgressDots';
import SignupHeader from './components/SignupHeader';
import SignupGoogleAuth from './components/SignupGoogleAuth';
import SignupErrorAlert from './components/SignupErrorAlert';
import SignupFooter from './components/SignupFooter';
import { SignupSchema } from './utils/SignupValidation';
import { INITIAL_SIGNUP_VALUES } from './utils/SignupConstants';
import SEO from '../../components/SEO';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0); // 0: Plan Selection, 1: Basic Info, 2: Details, 3: Security
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();

  // Check both state and query params for sync failure
  const queryParams = new URLSearchParams(location.search);
  const isSyncFailure =
    location.state?.reason === 'session_missing' || queryParams.get('reason') === 'session_missing';

  // Handle pre-fill from Google if redirected from Login page
  useEffect(() => {
    if (location.state?.googleData) {
      const { name, email } = location.state.googleData;
      formik.setFieldValue('name', name);
      formik.setFieldValue('email', email);
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
        
        // 🔒 Phase 1: Secure Persistence
        signup(data);
        
        // 🚀 Phase 2: Success Animation
        setIsLoading('success');

        // ⏱️ Phase 3: Stability Buffer (Ensure localStorage is flushed)
        setTimeout(() => {
          if (data.role === 'Doctor') {
            navigate('/doctor-portal');
          } else if (data.role === 'Admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1200);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Registration failed.');
        setIsLoading(false);
      }
    },
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
      <SEO
        title="Create Account"
        description="Join MediSync's advanced clinical network. Create an account to synchronize your health data securely."
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      <SignupSuccessOverlay show={isLoading === 'success'} />

      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden z-10 m-4 max-h-[90vh] skeuo-card">
        <SignupBranding />

        <div className="flex-[1.2] px-6 py-6 md:px-10 flex flex-col justify-start bg-transparent overflow-y-auto scrollbar-hide z-10">
          <div className="w-full max-w-[400px] mx-auto">
            <SignupHeader />

            {isSyncFailure && !error && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-[20px] flex flex-col gap-2 text-amber-600 dark:text-amber-400 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={20} className="shrink-0" />
                  <span className="text-[0.85rem] font-black uppercase tracking-widest">
                    Sync Protocol Failed
                  </span>
                </div>
                <p className="text-[0.75rem] font-bold leading-relaxed opacity-80">
                  Session credentials missing. Please re-login to synchronize your clinical profile.
                </p>
              </div>
            )}

            <SignupErrorAlert error={error} />

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

            <SignupFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
