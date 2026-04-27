import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const SignupGoogleAuth = ({ role, onSuccess, onError }) => {
  if (role === 'Admin') return null;

  return (
    <>
      <div className="flex items-center gap-4 my-6 text-slate-400 text-[0.65rem] font-black uppercase tracking-widest px-4">
        <div className="flex-1 h-[2px] rounded-full shadow-[inset_1px_1px_2px_#cbced1,inset_-1px_-1px_2px_#ffffff] bg-[#ecf0f3]"></div> OR <div className="flex-1 h-[2px] rounded-full shadow-[inset_1px_1px_2px_#cbced1,inset_-1px_-1px_2px_#ffffff] bg-[#ecf0f3]"></div>
      </div>
      <div className="w-full flex justify-center scale-95 origin-top relative z-20">
        <div className="p-1 rounded-full shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] bg-[#ecf0f3]">
          <GoogleLogin 
            onSuccess={onSuccess} 
            onError={onError} 
            theme="outline" 
            size="large" 
            width="350" 
          />
        </div>
      </div>
    </>
  );
};

export default SignupGoogleAuth;
