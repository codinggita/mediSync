import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import RecoveryEmailForm from './components/RecoveryEmailForm';
import RecoverySentState from './components/RecoverySentState';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await api.post('/auth/forgot-password', { email });
      setIsSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Synchronization failed. Please verify your clinical email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1121] flex flex-col items-center justify-center p-6 transition-colors duration-500 font-sans relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2A7FFF]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2ECC71]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-[#151E32] rounded-[48px] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white dark:border-white/5 text-center transition-all animate-in zoom-in-95 duration-500">
           
           {!isSent ? (
             <>
               <div className="w-24 h-24 rounded-[32px] bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-10 shadow-inner group">
                  <ShieldAlert size={48} className="text-[#2A7FFF] group-hover:rotate-12 transition-transform duration-500" />
               </div>

               <h1 className="text-[2.5rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                  Access <br /> Recovery
               </h1>
               
               <p className="text-[0.95rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                  Enter your clinical email to synchronize a secure password reset protocol.
               </p>

               <RecoveryEmailForm 
                 email={email}
                 setEmail={setEmail}
                 handleSubmit={handleSubmit}
                 isLoading={isLoading}
                 error={error}
               />
             </>
           ) : (
             <RecoverySentState email={email} />
           )}

           <button 
             onClick={() => navigate('/login')}
             className="flex items-center justify-center gap-3 text-slate-400 dark:text-slate-500 hover:text-[#2A7FFF] font-black text-[0.8rem] uppercase tracking-widest mx-auto mt-10 transition-all group"
           >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Login
           </button>
        </div>

        <p className="mt-12 text-center text-[0.75rem] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">
           MediSync Security Protocol v2.4.0
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
