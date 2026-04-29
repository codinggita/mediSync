import React from 'react';
import { Droplets, Users, ShieldCheck } from 'lucide-react';

const PatientDetails = ({ formik }) => {
  if (formik.values.role === 'Admin') {
    return (
      <div className="p-8 text-center bg-[#ecf0f3] rounded-[2rem] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
        <ShieldCheck size={48} className="mx-auto text-[#2A7FFF] mb-4 opacity-40" />
        <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest">
          Admin Credentials Required
        </p>
        <p className="text-[0.65rem] text-slate-400 mt-2">
          No additional biological data needed for Admin tier.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">
          Blood Group
        </label>
        <div className="relative flex items-center group">
          <Droplets
            className={`absolute left-4 transition-colors ${formik.errors.bloodGroup && formik.touched.bloodGroup ? 'text-red-400' : 'text-slate-400'}`}
            size={16}
          />
          <select
            {...formik.getFieldProps('bloodGroup')}
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all appearance-none shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff]"
          >
            <option value="" className="text-slate-400">
              Select
            </option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        {formik.touched.bloodGroup && formik.errors.bloodGroup && (
          <span className="text-[0.6rem] font-bold text-red-500 ml-2">
            {formik.errors.bloodGroup}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">
          Gender
        </label>
        <div className="relative flex items-center group">
          <Users
            className={`absolute left-4 transition-colors ${formik.errors.gender && formik.touched.gender ? 'text-red-400' : 'text-slate-400'}`}
            size={16}
          />
          <select
            {...formik.getFieldProps('gender')}
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all appearance-none shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff]"
          >
            <option value="" className="text-slate-400">
              Select
            </option>
            {['Male', 'Female', 'Other'].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.gender}</span>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
