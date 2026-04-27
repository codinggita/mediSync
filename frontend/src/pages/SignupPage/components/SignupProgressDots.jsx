import React from 'react';

const SignupProgressDots = ({ step }) => {
  if (step === 0) return null;

  return (
    <div className="flex justify-center gap-2 mb-4">
      {[1, 2, 3].map(s => (
        <div 
          key={s} 
          className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-[#2A7FFF] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]' : 'w-3 bg-[#cbced1] shadow-[inset_1px_1px_2px_#cbced1]'}`} 
        />
      ))}
    </div>
  );
};

export default SignupProgressDots;
