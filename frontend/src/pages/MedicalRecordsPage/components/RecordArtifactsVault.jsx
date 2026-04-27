import React from 'react';
import { FlaskConical, FileText, Eye, Download } from 'lucide-react';

const RecordArtifactsVault = ({ record, onShowPreview }) => {
  if (!record.fileUrl) return null;

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
      <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-6">
        <FlaskConical size={20} className="text-[#2A7FFF]" />
        Artifacts Vault
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-5 rounded-[1.8rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] hover:shadow-[4px_4px_8px_#cbced1] transition-all group/doc">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center shadow-sm text-[#2A7FFF]">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-[0.9rem] font-black text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-none">{record.title}_Analysis.pdf</p>
              <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Encrypted PDF · 1.2 MB</p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={onShowPreview}
              className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#0a0f1d] active:shadow-inner transition-all"
            >
              <Eye size={18} />
            </button>
            <a 
              href={record.fileUrl} 
              download={`${record.title.replace(/\s+/g, '_')}_Report`}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2ECC71] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#0a0f1d] active:shadow-inner transition-all"
            >
              <Download size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordArtifactsVault;
