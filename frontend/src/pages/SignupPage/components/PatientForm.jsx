import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError(null);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 33;
    if (password.match(/[A-Z]/) && password.match(/[0-9]/)) strength += 33;
    if (password.match(/[^A-Za-z0-9]/)) strength += 34;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (!formData.termsAccepted) {
      return setError('You must accept the terms to continue.');
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      console.log('Patient Signup Data:', formData);
      // Navigate to dashboard
    } catch (err) {
      setError(err.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="mb-1 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-[#D32F2F] animate-slideUp shadow-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
        <div className="relative flex items-center group">
          <User className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
          <input 
            type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            placeholder="John Doe" required
            className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-[1.2]">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email</label>
          <div className="relative flex items-center group">
            <Mail className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="patient@example.com" required
              className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-[0.8]">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Phone <span className="text-gray-400 font-normal">(Opt)</span></label>
          <div className="relative flex items-center group">
            <Phone className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="tel" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="(555) 000"
              className="w-full py-3 pl-10 pr-3 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
          <div className="relative flex items-center group">
            <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Create password" required
              className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Confirm</label>
          <div className="relative flex items-center group">
            <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              placeholder="Confirm password" required
              className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Password Strength Indicator */}
      <div className="flex flex-col gap-1.5 mt-0.5 px-1">
        <div className="flex h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${strength < 50 ? 'bg-red-500' : strength < 100 ? 'bg-yellow-500' : 'bg-[#2A7FFF]'}`}
            style={{ width: `${strength}%` }}
          ></div>
        </div>
        <div className="flex justify-end">
          <p className="text-[0.65rem] text-gray-500 font-bold uppercase tracking-wider">
            {strength === 0 ? 'Enter a password' : strength < 50 ? 'Weak' : strength < 100 ? 'Good' : 'Strong'}
          </p>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm mt-1 cursor-pointer group">
        <div className="relative flex items-center justify-center shrink-0">
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="peer sr-only" required />
          <div className="w-[18px] h-[18px] bg-white border-[1.5px] border-gray-300 rounded-[5px] peer-checked:bg-[#2A7FFF] peer-checked:border-[#2A7FFF] transition-all group-hover:border-[#2A7FFF] flex items-center justify-center shadow-sm">
            <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="text-gray-600 font-medium leading-tight text-[0.8rem]">
          I agree to the <a href="#" className="text-[#2A7FFF] font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-[#2A7FFF] font-bold hover:underline">Privacy Policy</a>
        </span>
      </label>

      <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-[#2A7FFF] text-white py-[14px] rounded-xl font-bold text-[0.95rem] mt-2 shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1B5E20] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(46,125,50,0.35)] active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none transition-all duration-200">
        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Creating Account...</> : <><User size={18} /> Create Patient Account</>}
      </button>

      {/* Google Signup */}
      <div className="flex items-center gap-4 my-2 text-gray-300 text-[0.75rem] font-bold uppercase tracking-wider">
        <div className="flex-1 h-[1.5px] bg-gray-100"></div>
        OR
        <div className="flex-1 h-[1.5px] bg-gray-100"></div>
      </div>

      <button type="button" className="flex items-center justify-center gap-3 w-full bg-white border-[1.5px] border-gray-200 py-[12px] rounded-xl font-bold text-[0.95rem] text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-[1px] transition-all">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>
    </form>
  );
};

export default PatientForm;
