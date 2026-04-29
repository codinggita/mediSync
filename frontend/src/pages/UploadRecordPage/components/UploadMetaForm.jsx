import React, { useState } from 'react';
import { Tag, StickyNote } from 'lucide-react';
import UploadFormInputs from './UploadFormInputs';
import UploadFormActions from './UploadFormActions';

const categories = [
  'Lab Report',
  'Prescription',
  'X-Ray / Scan',
  'ECG Report',
  'Surgery Summary',
  'Vaccination',
  'Discharge Summary',
  'Other',
];

const UploadMetaForm = ({ file, onSubmit, onCancel, isLoading }) => {
  const [form, setForm] = useState({
    title: '',
    hospital: '',
    date: new Date().toISOString().split('T')[0],
    category: categories[0],
    notes: '',
  });

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) onSubmit?.(form);
  };

  const inputCls = `w-full text-[0.9rem] px-5 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121]
    shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]
    text-[#1F2937] dark:text-slate-200 border-none
    placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#2A7FFF]/40 transition-all`;

  const labelCls =
    'flex items-center gap-2 text-[0.7rem] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
        <Tag size={120} className="text-[#2A7FFF]" />
      </div>

      <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF]">
          <StickyNote size={18} />
        </div>
        Artifact Metadata
      </h3>

      <div className="flex flex-col gap-6">
        <UploadFormInputs
          form={form}
          set={set}
          categories={categories}
          inputCls={inputCls}
          labelCls={labelCls}
        />

        <UploadFormActions file={file} isLoading={isLoading} onCancel={onCancel} />

        {!file && (
          <p className="text-[0.65rem] text-[#F59E0B] font-black text-center uppercase tracking-widest animate-pulse">
            ⚠ Awaiting Artifact Verification
          </p>
        )}
      </div>
    </form>
  );
};

export default UploadMetaForm;
