import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Activity, Shield } from 'lucide-react';
import loginBg from '../../assets/images/login-bg.png';
import brandingBg from '../../assets/images/branding-bg.png';
import logoImg from '../../assets/MediSync_Logo.png';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import AdminForm from './components/AdminForm';

const SignupPage = () => {
  const [role, setRole] = useState('Patient'); // 'Patient', 'Doctor', 'Admin'
  const roles = ['Patient', 'Doctor', 'Admin'];

  const getRoleSubtitle = () => {
    if (role === 'Doctor') return 'Join as a healthcare professional';
    if (role === 'Admin') return 'Restricted system access';
    return 'Create your personal health account';
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed font-sans" style={{ backgroundImage: `url(${loginBg})` }}>
      {/* Overlay with safe scrolling */}
      <div className="min-h-screen w-full bg-[#2A7FFF]/5 backdrop-blur-[8px] overflow-y-auto px-4 py-8 md:py-12 flex justify-center">
        
        {/* Main Glass Panel */}
        <div className="m-auto flex flex-col md:flex-row w-full max-w-5xl bg-white/95 backdrop-blur-3xl border border-white/60 rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden animate-slideUp">
          
          {/* Left Side - Branding */}
          <div className="flex-[0.95] bg-cover bg-center text-white p-10 md:p-12 flex flex-col relative overflow-hidden hidden md:flex" style={{ backgroundImage: `url(${brandingBg})` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#2A7FFF]/90 to-[#1B5E20]/95 z-0"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md overflow-hidden">
                <img src={logoImg} alt="MediSync Logo" className="w-full h-full object-contain scale-[1.25]" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">Medi<span className="opacity-80">Sync</span></div>
            </div>
            
            {/* Added Content to fill space */}
            <div className="relative z-10 mb-auto animate-slideUp">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 mb-5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[0.7rem] font-bold tracking-widest text-white/90 uppercase">Live System Active</span>
              </div>
              <p className="text-[0.95rem] text-white/85 leading-relaxed max-w-[90%] font-medium">
                Join thousands of healthcare professionals and patients who trust MediSync for seamless, secure, and lightning-fast medical record management.
              </p>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-col gap-4 my-8 relative z-10">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 w-fit shadow-xl animate-floatBadge">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#2A7FFF] shadow-sm">
                  <Shield size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.9rem] text-white tracking-wide">Secure & Encrypted</span>
                  <span className="text-xs text-white/80 mt-0.5">End-to-end protection</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 w-fit shadow-xl ml-8 animate-floatBadge" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-blue-600 shadow-sm">
                  <ShieldCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.9rem] text-white tracking-wide">HIPAA Compliant</span>
                  <span className="text-xs text-white/80 mt-0.5">Federally verified</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 w-fit shadow-xl ml-16 animate-floatBadge" style={{ animationDelay: '1.6s' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white text-blue-500 shadow-sm">
                  <Activity size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[0.9rem] text-white tracking-wide">24/7 Real-time</span>
                  <span className="text-xs text-white/80 mt-0.5">Always in sync</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-auto animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h1 className="text-3xl font-extrabold leading-tight mb-3 drop-shadow-sm">Join the Future<br/>of Healthcare.</h1>
              
              <ul className="flex flex-col gap-3 mt-4">
                {[
                  "Secure health records",
                  "Price transparency",
                  "Doctor collaboration"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <div className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full">
                      <CheckCircle2 size={14} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Side - Dynamic Form Container */}
          <div className="flex-[1.25] px-6 py-10 md:px-12 md:py-12 flex flex-col bg-transparent">
            <div className="w-full max-w-[460px] mx-auto">
              
              <div className="mb-7 text-center md:text-left">
                <h2 className="text-[1.85rem] font-extrabold text-gray-900 mb-1.5 tracking-tight">Create an Account</h2>
                <p className="text-[0.95rem] text-gray-500 font-medium transition-all">{getRoleSubtitle()}</p>
              </div>

              {/* Role Selection Segmented Buttons */}
              <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-7 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] border border-gray-200/50">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2.5 text-[0.85rem] font-bold rounded-[12px] transition-all duration-200 ${
                      role === r 
                        ? 'bg-[#2A7FFF] text-white shadow-md transform scale-[1.02]' 
                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/60'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Dynamic Forms Rendered Here */}
              <div className="animate-slideUp" key={role}>
                {role === 'Patient' && <PatientForm />}
                {role === 'Doctor' && <DoctorForm />}
                {role === 'Admin' && <AdminForm />}
              </div>

              {/* Return to Login */}
              <div className="text-center mt-6 text-[0.85rem] text-gray-500 font-medium">
                Already have an account? 
                <Link to="/login" className="text-[#2A7FFF] font-bold ml-1.5 hover:text-[#1B5E20] hover:underline transition-colors">Log in</Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignupPage;
