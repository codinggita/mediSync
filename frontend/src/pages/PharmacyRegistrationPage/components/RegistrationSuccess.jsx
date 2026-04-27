import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const RegistrationSuccess = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl w-full bg-white dark:bg-[#151E32] rounded-[4rem] p-16 text-center shadow-[20px_20px_60px_#cbced1,-20px_-20px_60px_#ffffff] dark:shadow-none border border-white/20"
      >
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white mb-6 leading-tight">Request Submitted!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold text-[1.1rem] leading-relaxed mb-10">
          Your pharmacy registration request has been submitted successfully. It will be reviewed by our clinical administration team.
        </p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="px-12 py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-[1rem] shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-3 mx-auto"
        >
          Return to Dashboard <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
