import React from 'react';
import { FileText } from 'lucide-react';

const RecordDossier = ({ description }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
      <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-5">
        <FileText size={20} className="text-[#2A7FFF]" />
        Clinical Dossier
      </h3>
      <p className="text-[0.95rem] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        {description || 'No additional clinical observations were recorded for this timestamp. The data remains verified and synchronized with your main health profile.'}
      </p>
    </div>
  );
};

export default RecordDossier;
