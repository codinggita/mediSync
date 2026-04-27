import React from 'react';
import { Activity } from 'lucide-react';
import VitalStatsRow from './VitalStatsRow';
import ClinicalHistory from './ClinicalHistory';

const ClinicalStatsDisplay = ({ activePatient }) => {
  return (
    <>
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-2xl border border-white/40">
        <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-3">
          <Activity className="text-[#2A7FFF]" /> Real-Time Vitals
        </h3>
        <VitalStatsRow patient={activePatient} />
      </div>
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 shadow-2xl border border-white/40">
        <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8">Clinical History</h3>
        <ClinicalHistory patient={activePatient} />
      </div>
    </>
  );
};

export default ClinicalStatsDisplay;
