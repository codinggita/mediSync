import React from 'react';
import { User, Stethoscope, Mail, ShieldCheck } from 'lucide-react';

const BasicInfo = ({ step, formik, setStep }) => {
  if (step !== 1) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Register As</label>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {[
            { id: 'Patient', icon: User },
            { id: 'Doctor', icon: Stethoscope },
            { id: 'Admin', icon: ShieldCheck }
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                formik.setFieldValue('role', r.id);
                if (r.id !== 'Doctor') setStep(1); // Reset step if changing away from doctor
              }}
              className={`py-3 px-2 rounded-xl text-[0.75rem] font-bold transition-all flex flex-col items-center gap-1.5 ${
                formik.values.role === r.id 
                  ? 'bg-[#ecf0f3] text-[#2A7FFF] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' 
                  : 'bg-[#ecf0f3] text-slate-500 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff]'
              }`}
            >
              <r.icon size={18} className={formik.values.role === r.id ? 'drop-shadow-md' : ''} />
              {r.id}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
        <div className="relative flex items-center group">
          <User className={`absolute left-4 transition-colors ${formik.errors.name && formik.touched.name ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
          <input 
            {...formik.getFieldProps('name')}
            placeholder="John Doe"
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
          />
        </div>
        {formik.touched.name && formik.errors.name && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Email address</label>
        <div className="relative flex items-center group">
          <Mail className={`absolute left-4 transition-colors ${formik.errors.email && formik.touched.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'}`} size={16} />
          <input 
            {...formik.getFieldProps('email')}
            placeholder="you@example.com"
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
          />
        </div>
        {formik.touched.email && formik.errors.email && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.email}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Mobile Number</label>
        <div className="relative flex items-center group">
          <div className={`absolute left-4 transition-colors ${formik.errors.phone && formik.touched.phone ? 'text-red-400' : 'text-slate-400 group-focus-within:text-[#2A7FFF]'} text-[0.8rem] font-bold`}>+91</div>
          <input 
            {...formik.getFieldProps('phone')}
            placeholder="9999999999"
            maxLength={10}
            className="w-full py-3 pl-14 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400 font-bold tracking-widest"
          />
        </div>
        {formik.touched.phone && formik.errors.phone && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.phone}</span>}
      </div>
    </div>
  );
};

export default BasicInfo;
