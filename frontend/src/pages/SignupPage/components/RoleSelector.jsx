import React from 'react';
import { User, Stethoscope, ShieldCheck } from 'lucide-react';

const RoleSelector = ({ currentRole, setFieldValue, setStep }) => {
  const roles = [
    { id: 'Patient', icon: User },
    { id: 'Doctor', icon: Stethoscope },
    { id: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">
        Register As
      </label>
      <div className="grid grid-cols-3 gap-3 mt-1">
        {roles.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setFieldValue('role', r.id);
              if (r.id !== 'Doctor') setStep(1);
            }}
            className={`py-3 px-2 rounded-xl text-[0.75rem] font-bold transition-all flex flex-col items-center gap-1.5 ${
              currentRole === r.id
                ? 'bg-[#ecf0f3] text-[#2A7FFF] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]'
                : 'bg-[#ecf0f3] text-slate-500 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff]'
            }`}
          >
            <r.icon size={18} className={currentRole === r.id ? 'drop-shadow-md' : ''} />
            {r.id}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
