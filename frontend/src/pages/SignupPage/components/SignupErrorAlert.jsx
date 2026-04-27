import React from 'react';
import { AlertCircle } from 'lucide-react';

const SignupErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-[#ecf0f3] rounded-xl flex items-start gap-2 text-red-500 animate-in fade-in slide-in-from-top-2 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <span className="text-[0.75rem] font-bold">{error}</span>
    </div>
  );
};

export default SignupErrorAlert;
