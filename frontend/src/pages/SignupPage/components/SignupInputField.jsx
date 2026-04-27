import React from 'react';

const SignupInputField = ({ label, icon: Icon, formik, name, placeholder, type = 'text', maxLength, prefix }) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1 w-full group">
      {label && <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">{label}</label>}
      <div className="relative flex items-center">
        {Icon && (
          <Icon 
            className={`absolute left-4 transition-colors ${hasError ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} 
            size={16} 
          />
        )}
        {prefix && (
          <div className={`absolute left-4 transition-colors ${hasError ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'} text-[0.8rem] font-bold`}>
            {prefix}
          </div>
        )}
        <input 
          type={type}
          {...formik.getFieldProps(name)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full py-3 ${Icon ? 'pl-11' : prefix ? 'pl-14' : 'px-4'} pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400 ${prefix ? 'font-bold tracking-widest' : ''}`}
        />
      </div>
      {hasError && <span className="text-[0.6rem] font-bold text-red-500 ml-2 animate-in fade-in slide-in-from-top-1">{formik.errors[name]}</span>}
    </div>
  );
};

export default SignupInputField;
