import React from 'react';
import {
  User, Plus, Calendar, AlertCircle,
  ChevronRight, Clock, Shield, Droplets, Info,
  FileText, BrainCircuit
} from 'lucide-react';

const conditions = [
  { label: 'Type 2 Diabetes', color: '#F59E0B', bg: '#F59E0B15' },
  { label: 'Hypertension', color: '#EF4444', bg: '#EF444415' },
];

const PatientProfileCard = ({ patient, onPrescribe, onAiDiagnosis, onAddRecord }) => {
  if (!patient) return null;

  // Calculate age from dateOfBirth
  const age = patient.dateOfBirth 
    ? new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear() 
    : 'N/A';
  
  const dob = patient.dateOfBirth 
    ? new Date(patient.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'N/A';

  return (
    <div className="relative bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-all duration-300 group">
      {/* Premium Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2A7FFF]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Decorative top strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#2A7FFF] via-[#2ECC71] to-[#2A7FFF] opacity-80" />

      <div className="p-7 flex flex-col lg:flex-row gap-8 items-center lg:items-start relative z-10">
        {/* Patient Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#1565C0] flex items-center justify-center shadow-xl border-[6px] border-white dark:border-[#151E32] transform transition-transform group-hover:scale-105 duration-500">
              <User size={42} className="text-white" />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#2ECC71] rounded-full border-4 border-white dark:border-[#151E32] shadow-sm" title="Active Session" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-4 justify-center sm:justify-start flex-wrap">
              <h2 className="text-[1.6rem] font-black text-[#1F2937] dark:text-white tracking-tight leading-tight">
                {patient.name}
              </h2>
              <div className="flex gap-2">
                <span className="text-[0.68rem] font-black px-3 py-1 rounded-full bg-[#E6F0FF] dark:bg-[#2A7FFF]/20 text-[#2A7FFF] border border-[#2A7FFF]/20 uppercase tracking-wider">
                  {patient.patientId || 'MS-2026-X'}
                </span>
                <span className="text-[0.68rem] font-black px-3 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20 uppercase tracking-wider">
                  Patient
                </span>
              </div>
            </div>

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5">
              {[
                { label: `${age} Years`, sub: 'Age', icon: Clock },
                { label: patient.gender || 'Other', sub: 'Gender', icon: Shield },
                { label: patient.bloodGroup || 'N/A', sub: 'Blood Group', icon: Droplets, color: 'text-red-500' },
                { label: dob, sub: 'DOB', icon: Calendar },
              ].map(({ label, sub, icon: Icon, color }) => (
                <div key={sub} className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-xl bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center shrink-0 border border-gray-100 dark:border-slate-800 shadow-sm transition-colors group-hover:border-[#2A7FFF]/30">
                    <Icon size={15} className={color || "text-gray-400 group-hover:text-[#2A7FFF] transition-colors"} />
                  </div>
                  <div>
                    <p className="text-[0.85rem] font-extrabold text-[#1F2937] dark:text-white leading-none">{label}</p>
                    <p className="text-[0.65rem] font-bold text-gray-400 mt-1.5 uppercase tracking-[0.1em]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conditions Tags */}
            <div className="flex items-center gap-3 mt-6 justify-center sm:justify-start flex-wrap">
              <span className="text-[0.72rem] font-black text-gray-400 flex items-center gap-1.5 uppercase tracking-wider">
                <AlertCircle size={13} /> Status:
              </span>
              <span className="text-[0.75rem] font-black px-4 py-1.5 rounded-xl border border-green-100 bg-green-50 text-green-600 dark:bg-green-500/10 dark:border-green-500/20 shadow-sm">
                Stable
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Divider for Large screens */}
        <div className="hidden lg:block w-px h-32 bg-gray-100 dark:bg-slate-800 self-center opacity-50" />

        {/* Action Buttons Group */}
        <div className="flex flex-row lg:flex-col gap-3 w-full lg:w-[220px] shrink-0">
          <button onClick={onPrescribe} className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#2ECC71] hover:bg-[#27AE60] text-white text-[0.9rem] font-black rounded-2xl shadow-[0_8px_20px_rgba(46,204,113,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(46,204,113,0.4)] active:scale-[0.97]">
            <FileText size={18} strokeWidth={3} />
            Prescribe
          </button>
          <button onClick={onAiDiagnosis} className="flex-1 lg:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[0.9rem] font-black rounded-2xl shadow-[0_8px_20px_rgba(139,92,246,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(139,92,246,0.4)] active:scale-[0.97]">
            <BrainCircuit size={18} strokeWidth={3} />
            AI Diagnosis
          </button>
          
          <div className="flex flex-row gap-3 mt-1">
             <button onClick={onAddRecord} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-[#1A2642] border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-[0.75rem] font-black rounded-xl hover:bg-gray-50 dark:hover:bg-[#1E2C4D] transition-all hover:shadow-md border-b-4 active:border-b-0 active:translate-y-1">
               <Plus size={16} className="text-[#2A7FFF]" /> Record
             </button>
             <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white dark:bg-[#1A2642] border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-[0.75rem] font-black rounded-xl hover:bg-gray-50 dark:hover:bg-[#1E2C4D] transition-all hover:shadow-md border-b-4 active:border-b-0 active:translate-y-1">
               <Info size={16} className="text-[#2A7FFF]" /> Details
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
