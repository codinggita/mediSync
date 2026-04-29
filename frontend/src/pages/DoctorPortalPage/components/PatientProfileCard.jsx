import React from 'react';
import { CalendarDays, UserRound, Droplets, FilePlus, Users, Hash } from 'lucide-react';

const PatientProfileCard = ({ patient, onPrescribe, onAiDiagnosis, onAddRecord }) => {
  if (!patient) return null;

  // Extract initials dynamically
  const initials = patient.name 
    ? patient.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
    : '??';

  const conditions = patient.conditions && patient.conditions.length > 0 
    ? patient.conditions 
    : ['No documented conditions'];

  // Calculate Age dynamically if dob exists
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference).getUTCFullYear() - 1970;
    return `${age} yrs`;
  };

  const formattedDob = patient.dateOfBirth 
    ? new Date(patient.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Unknown DOB';

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 md:p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start lg:items-center relative z-10 w-full">
        
        {/* Avatar */}
        <div className="relative flex-shrink-0 self-center lg:self-auto">
          <div className="w-28 h-28 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 flex items-center justify-center text-[#2A7FFF] text-[2.5rem] font-black tracking-tighter select-none">
            {initials}
          </div>
          <span className="absolute bottom-1 right-1 w-6 h-6 bg-[#2ECC71] border-4 border-[#ecf0f3] dark:border-[#151E32] rounded-full shadow-sm" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 w-full flex flex-col gap-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <h2 className="text-[2rem] md:text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight break-words truncate">{patient.name}</h2>
            
            {/* Patient ID Pill */}
            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/20 w-fit shrink-0">
               <Hash size={14} className="text-[#2A7FFF]" />
               <span className="text-[0.75rem] text-[#2A7FFF] font-black uppercase tracking-[0.2em] whitespace-nowrap">ID: {patient.patientId || 'NEW'}</span>
            </div>
          </div>

          {/* Meta Data Boxes */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/40 dark:border-white/5">
              <CalendarDays size={16} className="text-[#2A7FFF] shrink-0" />
              <span className="text-[0.75rem] md:text-[0.8rem] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest whitespace-nowrap">
                {calculateAge(patient.dateOfBirth)} <span className="opacity-50 font-normal mx-1">·</span> {formattedDob}
              </span>
            </div>
            
            <div className="flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/40 dark:border-white/5">
              <UserRound size={16} className="text-[#2A7FFF] shrink-0" />
              <span className="text-[0.75rem] md:text-[0.8rem] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest whitespace-nowrap">
                {patient.gender || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/40 dark:border-white/5">
              <Droplets size={16} className="text-[#D32F2F] shrink-0" />
              <span className="text-[#D32F2F] font-black text-[0.8rem] md:text-[0.85rem] whitespace-nowrap">
                {patient.bloodGroup || 'N/A'}
              </span>
            </div>
          </div>

          {/* Condition Tags */}
          <div className="flex flex-wrap gap-3 mt-1">
            {conditions.map((c, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_3px_3px_6px_#cbced1,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#0a0f1d,inset_-3px_-3px_6px_#202d47] text-slate-600 dark:text-slate-400 text-[0.65rem] font-black uppercase tracking-widest rounded-xl whitespace-nowrap"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Actions - Vertical Stack on Mobile, Horizontal on Desktop */}
        <div className="flex flex-col w-full xl:w-auto gap-4 flex-shrink-0 mt-4 xl:mt-0">
          <button className="w-full xl:w-48 flex items-center justify-center gap-3 px-6 py-4 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[1.5rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] text-slate-500 hover:text-[#2A7FFF] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:active:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/40 dark:border-white/5 transition-all text-[0.75rem] font-black uppercase tracking-widest whitespace-nowrap">
            <Users size={16} />
            Demographics
          </button>
          <button onClick={onAddRecord} className="w-full xl:w-48 flex items-center justify-center gap-3 px-6 py-4 bg-[#2A7FFF] text-white rounded-[1.5rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-none hover:bg-[#1565C0] transition-all text-[0.75rem] font-black uppercase tracking-widest active:scale-95 whitespace-nowrap border border-[#2A7FFF]/20">
            <FilePlus size={16} />
            Add Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
