import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import logoImg from '../../assets/MediSync_Logo.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ecf0f3] flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2A7FFF]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-xl w-full text-center relative z-10 animate-in zoom-in duration-700">
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <div className="w-16 h-16 rounded-[1.5rem] bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] flex items-center justify-center mb-10 group hover:rotate-[360deg] transition-all duration-700">
            <img src={logoImg} alt="MediSync" className="w-10 h-10 object-contain scale-125" />
          </div>

          {/* Big 404 Error Display */}
          <div className="relative mb-12">
            <h1 className="text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 drop-shadow-sm select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="px-6 py-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow-xl flex items-center gap-3">
                  <AlertCircle size={20} className="text-rose-500" />
                  <span className="text-[0.9rem] font-black text-slate-800 uppercase tracking-widest">Protocol Failure</span>
               </div>
            </div>
          </div>

          <h2 className="text-[2.2rem] font-black text-slate-900 mb-4 leading-tight">Registry Node Not Found</h2>
          <p className="text-slate-500 text-[1.05rem] font-bold leading-relaxed mb-12 max-w-sm mx-auto">
            The clinical route you are trying to access has been decentralized or doesn't exist in our current medical directory.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            <button 
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#ecf0f3] text-slate-600 rounded-[2rem] font-black text-[1rem] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] hover:shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Return Back
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#2A7FFF] text-white rounded-[2rem] font-black text-[1rem] shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.4)] hover:-translate-y-1 transition-all active:scale-95"
            >
              <Home size={20} />
              Return Home
            </button>
          </div>

          {/* Compliance Footer */}
          <div className="mt-16 flex items-center gap-3 px-6 py-3 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/50 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest shadow-sm">
             <Shield size={14} className="text-[#2ECC71]" /> Secure Navigation Guaranteed
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
