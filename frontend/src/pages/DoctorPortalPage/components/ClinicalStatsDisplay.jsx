import React from 'react';
import { Activity, Clock } from 'lucide-react';
import VitalStatsRow from './VitalStatsRow';
import ClinicalHistory from './ClinicalHistory';

const ClinicalStatsDisplay = ({ activePatient }) => {
  return (
    <>
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center border border-[#2A7FFF]/20 shadow-inner">
            <Activity className="text-[#2A7FFF]" size={24} />
          </div>
          Real-Time Vitals
        </h3>

        <div className="relative z-10">
          <VitalStatsRow patient={activePatient} />
        </div>
      </div>

      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center border border-[#2A7FFF]/20 shadow-inner">
            <Clock className="text-[#2A7FFF]" size={24} />
          </div>
          Clinical History
        </h3>

        <div className="relative z-10">
          <ClinicalHistory patient={activePatient} />
        </div>
      </div>
    </>
  );
};

export default ClinicalStatsDisplay;
