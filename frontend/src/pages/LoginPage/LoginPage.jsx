import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Mail, Lock, ArrowRight, ShieldCheck, 
  Activity, Loader2, AlertCircle, Shield 
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import logoImg from '../../assets/MediSync_Logo.png';
import loginBg from '../../assets/images/login-bg.png';
import medicalHeroImg from '../../assets/images/medical_hero.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('Patient'); // 'Patient', 'Doctor', 'Admin'
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = ['Patient', 'Doctor', 'Admin'];

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: role === 'Admin' 
        ? Yup.string().required('Admin ID is required')
        : Yup.string().test('email-or-phone', 'Enter a valid email or 10-digit mobile number', (value) => {
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            const phoneRegex = /^[0-9]{10}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
          }).required('Email or Mobile Number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        const { data } = await api.post('/auth/login', {
          email: values.email,
          password: values.password,
          role: role
        });
        login(data);
        if (data.role === 'Patient') navigate('/dashboard');
        else if (data.role === 'Doctor') navigate('/doctor-portal');
        else if (data.role === 'Admin') navigate('/admin');
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  // Google OAuth handlers
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      try {
        // Try to login with Google email
        const { data } = await api.post('/auth/google-login', { 
          email: decoded.email,
          name: decoded.name 
        });
        
        login(data);
        // Role-based navigation
        if (data.role === 'Patient') navigate('/dashboard');
        else if (data.role === 'Doctor') navigate('/doctor-portal');
        else if (data.role === 'Admin') navigate('/admin');
        
      } catch (err) {
        if (err.response?.status === 404) {
          // User doesn't exist, redirect to signup with pre-filled data
          navigate('/signup', { 
            state: { 
              googleData: { 
                name: decoded.name, 
                email: decoded.email 
              } 
            } 
          });
        } else {
          setError(err.response?.data?.message || 'Google sign-in failed.');
        }
      }
    } catch (err) {
      setError('Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => setError('Google sign-in failed.');

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden bg-[#ecf0f3] dark:bg-[#121826]"
    >
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl neu-flat rounded-3xl overflow-hidden z-10 md:min-h-[650px] m-4 border-none shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]">
        
        {/* Left Side - Branding */}
        <div className="flex-1 p-12 flex flex-col relative overflow-hidden hidden md:flex border-none bg-gradient-to-br from-[#ecf0f3] to-[#e0e5ec] dark:from-[#121826] dark:to-[#1a2133] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] m-4 rounded-[2rem] group/brand">
          
          {/* Background Hero Image */}
          <div className="absolute inset-0 opacity-10 group-hover/brand:opacity-20 transition-opacity pointer-events-none group-hover/brand:scale-110 transition-transform duration-[10s]">
            <img src={medicalHeroImg} alt="Branding" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-3 mb-10 relative z-10">
            <div className="w-14 h-14 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] p-1 border-none">
              <img src={logoImg} alt="MediSync" className="w-full h-full object-contain scale-[1.2]" />
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">Medi<span className="text-[#2A7FFF]">Sync</span></div>
          </div>
          
          <div className="relative z-10 my-auto animate-in fade-in slide-in-from-left-8 duration-700">
            <h1 className="text-[3.2rem] font-black text-slate-900 dark:text-white leading-[1.1] mb-6 drop-shadow-md">
              Healthcare,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">
                Elevated.
              </span>
            </h1>
            <p className="text-[1.1rem] text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-[90%]">
              The enterprise-grade platform connecting patients, doctors, and pharmacies with zero friction.
            </p>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="flex-[1.2] px-8 py-10 md:px-12 flex flex-col justify-center bg-transparent">
          <div className="w-full max-w-[420px] mx-auto">
            <div className="mb-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight drop-shadow-sm">Welcome back</h2>
              <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 font-bold mt-1 uppercase tracking-widest">Secure Portal Authentication</p>
            </div>

            {/* Role Selection */}
            <div className="flex bg-[#ecf0f3] dark:bg-[#151E32] p-1.5 rounded-2xl mb-8 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
              {roles.map((r) => (
                <button
                  key={r} type="button" onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 text-[0.8rem] font-black rounded-xl transition-all ${
                    role === r 
                      ? 'bg-[#2A7FFF] text-white shadow-[0_4px_12px_rgba(42,127,255,0.4)] translate-y-[-1px]' 
                      : 'text-slate-500 hover:text-[#2A7FFF] dark:hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-red-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span className="text-[0.8rem] font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">{role === 'Admin' ? 'Admin ID' : 'Email or Mobile Number'}</label>
                <div className="relative flex items-center group">
                  <Mail className={`absolute left-4 transition-colors z-10 ${formik.errors.email && formik.touched.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
                  <input 
                    {...formik.getFieldProps('email')}
                    placeholder={role === 'Doctor' ? 'hospital.id@medisync.app' : 'you@example.com or 9999999999'}
                    className={`w-full py-4 pl-12 pr-4 neu-input text-[0.9rem] font-bold text-slate-800 dark:text-white ${formik.errors.email && formik.touched.email ? 'ring-2 ring-red-400/20' : ''}`}
                    autoComplete="off"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                  />
                </div>
                {formik.touched.email && formik.errors.email && <span className="text-[0.65rem] font-bold text-red-500 ml-1">{formik.errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Password</label>
                <div className="relative flex items-center group">
                  <Lock className={`absolute left-4 transition-colors z-10 ${formik.errors.password && formik.touched.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
                  <input 
                    type="password" {...formik.getFieldProps('password')}
                    placeholder="••••••••"
                    className={`w-full py-4 pl-12 pr-4 neu-input text-[0.9rem] font-bold text-slate-800 dark:text-white ${formik.errors.password && formik.touched.password ? 'ring-2 ring-red-400/20' : ''}`}
                    autoComplete="new-password"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                  />
                </div>
                {formik.touched.password && formik.errors.password && <span className="text-[0.65rem] font-bold text-red-500 ml-1">{formik.errors.password}</span>}
              </div>

              <div className="flex items-center justify-between text-[0.75rem] mt-1 font-bold">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700">
                  <input type="checkbox" {...formik.getFieldProps('rememberMe')} className="w-4 h-4 rounded border-slate-300 text-[#2A7FFF] focus:ring-[#2A7FFF]/30" />
                  Remember device
                </label>
                <Link to="/forgot-password" title="Recover access" className="text-[#2A7FFF] hover:underline">Recover access</Link>
              </div>

              <button 
                type="submit" disabled={isLoading}
                className="flex items-center justify-center gap-3 bg-[#2A7FFF] text-white py-4 rounded-2xl font-black text-[1rem] mt-6 shadow-[0_12px_24px_rgba(42,127,255,0.3)] hover:bg-[#1C71E1] hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-70 group"
              >
                {isLoading ? <><Loader2 size={20} className="animate-spin" /> Authenticating...</> : <>Access Portal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>

            {role !== 'Admin' && (
              <>
                <div className="flex items-center gap-4 my-6 text-slate-400 text-[0.65rem] font-black uppercase tracking-widest">
                  <div className="flex-1 h-[1px] bg-slate-100"></div> OR <div className="flex-1 h-[1px] bg-slate-100"></div>
                </div>
                <div className="w-full flex justify-center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} theme="outline" size="large" width="420" />
                </div>
              </>
            )}

            {role === 'Patient' && (
              <div className="text-center mt-6 text-[0.85rem] text-slate-500 font-medium">
                New to MediSync? <Link to="/signup" className="text-[#2A7FFF] font-black hover:underline">Create account</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
