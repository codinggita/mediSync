import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlertCircle } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import LoginBranding from './components/LoginBranding';
import LoginRoleSelector from './components/LoginRoleSelector';
import AuthDecorations from './components/AuthDecorations';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('Patient');
  const navigate = useNavigate();
  const { login } = useAuth();

  const roles = ['Patient', 'Doctor', 'Admin'];

  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    validationSchema: Yup.object({
      email: role === 'Admin' ? Yup.string().required('Admin ID is required') : Yup.string().required('Email or Mobile Number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      setError(null);
      setIsLoading(true);
      try {
        const { data } = await api.post('/auth/login', { email: values.email, password: values.password, role });
        login(data);
        const routes = { Patient: '/dashboard', Doctor: '/doctor-portal', Admin: '/admin' };
        navigate(routes[data.role]);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid credentials.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleGoogleSuccess = async (res) => {
    setIsLoading(true);
    setError(null);
    try {
      const decoded = jwtDecode(res.credential);
      const { data } = await api.post('/auth/google-login', { email: decoded.email, name: decoded.name });
      login(data);
      const routes = { Patient: '/dashboard', Doctor: '/doctor-portal', Admin: '/admin' };
      navigate(routes[data.role]);
    } catch (err) {
      if (err.response?.status === 404) navigate('/signup', { state: { googleData: jwtDecode(res.credential) } });
      else setError('Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-sans relative overflow-hidden bg-[#ecf0f3] dark:bg-[#121826]">
      <AuthDecorations />
      
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden z-10 md:min-h-[650px] m-4 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-none">
        <LoginBranding />
        
        <div className="flex-[1.2] px-8 py-10 md:px-12 flex flex-col justify-center bg-transparent">
          <div className="w-full max-w-[420px] mx-auto">
            <div className="mb-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight">Welcome back</h2>
              <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 font-bold mt-1 uppercase tracking-widest">Secure Portal Access</p>
            </div>

            <LoginRoleSelector role={role} setRole={setRole} roles={roles} />

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-red-600 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span className="text-[0.8rem] font-medium">{error}</span>
              </div>
            )}

            <LoginForm formik={formik} role={role} isLoading={isLoading} />

            {role !== 'Admin' && (
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-6 text-slate-400 text-[0.65rem] font-black uppercase tracking-widest">
                  <div className="flex-1 h-[1px] bg-slate-100"></div> OR <div className="flex-1 h-[1px] bg-slate-100"></div>
                </div>
                <div className="w-full flex justify-center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in failed')} theme="outline" size="large" width="420" />
                </div>
              </div>
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
