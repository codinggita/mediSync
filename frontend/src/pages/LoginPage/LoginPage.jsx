import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Activity, Loader2, AlertCircle } from 'lucide-react';
import './LoginPage.css';
import loginBg from '../../assets/images/login-bg.png';
import brandingBg from '../../assets/images/branding-bg.png';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simulate network request for premium feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!formData.email.includes('@')) {
        throw new Error('Please enter a valid email address.');
      }
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      
      console.log('Login successful:', formData);
      // Connect page: Redirect to the dashboard upon successful authentication
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center font-sans relative overflow-hidden" style={{ backgroundImage: `url(${loginBg})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-[8px] flex items-center justify-center p-5">
        
        {/* Main Glass Panel */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/85 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden animate-slideUp md:h-[85vh] md:max-h-[650px]">
          
          {/* Left Side - Branding & Value Prop */}
          <div className="flex-1 bg-cover bg-center text-white p-8 md:p-10 flex flex-col relative overflow-hidden" style={{ backgroundImage: `url(${brandingBg})` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/85 to-emerald-600/95 z-0"></div>
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 font-extrabold shadow-md">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19 10h-5V5c0-1.1-.9-2-2-2s-2 .9-2 2v5H5c-1.1 0-2 .9-2 2s.9 2 2 2h5v5c0 1.1.9 2 2 2s2-.9 2-2v-5h5c1.1 0 2-.9 2-2s-.9-2-2-2z"/>
                </svg>
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">Medi<span className="opacity-80">Sync</span></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="flex flex-col gap-3 my-auto relative z-10 hidden md:flex">
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 w-fit shadow-xl animate-floatBadge">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base text-white tracking-wide">100% Secure</span>
                  <span className="text-sm text-white/90 mt-0.5">HIPAA Compliant</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 w-fit shadow-xl animate-floatBadge ml-12" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white text-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                  <Activity size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base text-white tracking-wide">24/7 Access</span>
                  <span className="text-sm text-white/90 mt-0.5">Real-time Sync</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 md:mt-0">
              <h1 className="text-3xl md:text-[2.5rem] font-extrabold leading-tight mb-3 drop-shadow-sm">Your Health,<br/>Synchronized.</h1>
              <p className="text-base text-white/90 leading-relaxed mb-6 max-w-[90%]">Experience the next generation of healthcare management. Secure, fast, and always at your fingertips.</p>
              
              <ul className="flex flex-col gap-3 hidden md:flex">
                {[
                  "Secure Health Records",
                  "Smart Medicine Tracking",
                  "Direct Doctor Access"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-base font-medium text-white/95">
                    <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                      <CheckCircle2 size={16} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="flex-[1.2] p-8 md:p-10 flex items-center justify-center bg-transparent">
            <div className="w-full max-w-[400px]">
              <div className="mb-5 text-center md:text-left">
                <h2 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 mb-1">Welcome back</h2>
                <p className="text-sm text-gray-500">Please enter your details to sign in.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 animate-slideUp">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Email address</label>
                  <div className="relative flex items-center group">
                    <Mail className="absolute left-4 text-gray-400 transition-colors group-focus-within:text-emerald-500" size={20} />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full py-3 pl-11 pr-4 border-[1.5px] border-gray-200 rounded-xl text-base bg-white/90 transition-all outline-none text-gray-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-gray-400"
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <div className="relative flex items-center group">
                    <Lock className="absolute left-4 text-gray-400 transition-colors group-focus-within:text-emerald-500" size={20} />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full py-3 pl-11 pr-4 border-[1.5px] border-gray-200 rounded-xl text-base bg-white/90 transition-all outline-none text-gray-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white placeholder:text-gray-400"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mt-[-4px]">
                  <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="peer sr-only" 
                      />
                      <div className="w-[18px] h-[18px] bg-white border-[1.5px] border-gray-300 rounded peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all group-hover:border-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white hidden peer-checked:block" viewBox="0 0 14 10" fill="none">
                          <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    Remember for 30 days
                  </label>
                  <Link to="/forgot-password" className="text-emerald-500 font-semibold hover:text-emerald-600 transition-colors">Forgot password?</Link>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-[14px] rounded-xl font-semibold text-base mt-2 shadow-[0_4px_6px_rgba(16,185,129,0.2)] hover:bg-emerald-600 hover:-translate-y-[2px] hover:shadow-[0_6px_12px_rgba(16,185,129,0.3)] active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none transition-all group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4 my-5 text-gray-400 text-[0.85rem] font-medium">
                <div className="flex-1 h-px bg-gray-200"></div>
                OR
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <button type="button" className="flex items-center justify-center gap-3 w-full bg-white border-[1.5px] border-gray-200 py-[12px] rounded-xl font-semibold text-[0.95rem] text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-[1px] hover:shadow-sm transition-all">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>

              <div className="text-center mt-6 text-[0.85rem] text-gray-500">
                Don't have an account? 
                <Link to="/signup" className="text-emerald-500 font-bold ml-1.5 hover:text-emerald-600 hover:underline transition-colors">Sign up</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
