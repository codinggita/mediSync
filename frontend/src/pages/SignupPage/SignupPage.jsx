import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import loginBg from '../../assets/images/login-bg.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import SignupBranding from './components/SignupBranding';
import SignupSteps from './components/SignupSteps';
import SignupSuccessOverlay from './components/SignupSuccessOverlay';
import SignupProgressDots from './components/SignupProgressDots';

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
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Patient',
      bloodGroup: '',
      gender: '',
      specialty: '',
      hospital: '',
      medicalLicenseId: '',
      orgEmail: '',
      licenseCertificateUrl: '',
      profilePic: '',
      phone: '',
      agreeTerms: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      role: Yup.string().oneOf(['Patient', 'Doctor', 'Admin']).required('Role is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Mobile number is required'),
      agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
      
      // Patient Specific
      bloodGroup: Yup.string().when('role', {
        is: 'Patient',
        then: (schema) => schema.required('Blood group is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      gender: Yup.string().when('role', {
        is: 'Patient',
        then: (schema) => schema.required('Gender is required'),
        otherwise: (schema) => schema.notRequired()
      }),

      // Doctor Specific
      specialty: Yup.string().when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('Specialty is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      hospital: Yup.string().when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('Hospital is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      medicalLicenseId: Yup.string().when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('License ID is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      orgEmail: Yup.string().email('Invalid email').when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('Org email is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      licenseCertificateUrl: Yup.string().when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('Certificate is required'),
        otherwise: (schema) => schema.notRequired()
      }),
      profilePic: Yup.string().when('role', {
        is: 'Doctor',
        then: (schema) => schema.required('Profile image is required'),
        otherwise: (schema) => schema.notRequired()
      })
    }),
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
            <div className="mb-5 text-center">
              <h2 className="text-[1.8rem] font-black text-slate-700 leading-tight drop-shadow-sm">Create Account</h2>
              <p className="text-[0.8rem] text-slate-500 mt-1 font-medium">Setup your professional or patient portal.</p>
            </div>

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

            {formik.values.role !== 'Admin' && (
              <>
                <div className="flex items-center gap-4 my-6 text-slate-400 text-[0.65rem] font-black uppercase tracking-widest px-4">
                  <div className="flex-1 h-[2px] rounded-full shadow-[inset_1px_1px_2px_#cbced1,inset_-1px_-1px_2px_#ffffff] bg-[#ecf0f3]"></div> OR <div className="flex-1 h-[2px] rounded-full shadow-[inset_1px_1px_2px_#cbced1,inset_-1px_-1px_2px_#ffffff] bg-[#ecf0f3]"></div>
                </div>
                <div className="w-full flex justify-center scale-95 origin-top relative z-20">
                  <div className="p-1 rounded-full shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] bg-[#ecf0f3]">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} theme="outline" size="large" width="350" />
                  </div>
                </div>
              </>
            )}

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



