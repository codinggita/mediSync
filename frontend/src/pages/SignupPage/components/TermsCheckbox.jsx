import React from 'react';

const TermsCheckbox = ({ fieldProps, error, touched }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-3 text-slate-500 font-medium cursor-pointer mt-2 px-1">
        <div className="relative flex items-center justify-center w-5 h-5 rounded shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] bg-[#ecf0f3]">
          <input type="checkbox" {...fieldProps} className="opacity-0 absolute inset-0 cursor-pointer peer" />
          <div className="w-3 h-3 rounded-[2px] bg-[#2A7FFF] scale-0 peer-checked:scale-100 transition-transform" />
        </div>
        <span className="text-[0.75rem]">
          I agree to the <span className="text-[#2A7FFF] font-bold hover:underline">Terms</span> and <span className="text-[#2A7FFF] font-bold hover:underline">Privacy Policy</span>.
        </span>
      </label>
      {touched && error && <span className="text-[0.6rem] font-bold text-red-500 pl-1">{error}</span>}
    </div>
  );
};

export default TermsCheckbox;
