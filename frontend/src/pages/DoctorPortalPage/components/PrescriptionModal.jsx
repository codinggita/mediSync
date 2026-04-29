import React from 'react';
import { X, Check, FileText } from 'lucide-react';

const PrescriptionModal = ({
  show,
  onClose,
  prescriptionData,
  setPrescriptionData,
  handleSubmit,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#0B1121]/80 backdrop-blur-md transition-all">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] w-full max-w-lg shadow-2xl border border-white/40 overflow-hidden transform transition-all">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-[#2ECC71]/10 to-transparent">
          <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2ECC71] text-white flex items-center justify-center shadow-lg">
              <FileText size={24} />
            </div>
            E-Prescription Pad
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-6">
          <div>
            <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-widest mb-2">
              Medication Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Amoxicillin 500mg"
              value={prescriptionData.medicine}
              onChange={(e) =>
                setPrescriptionData({ ...prescriptionData, medicine: e.target.value })
              }
              className="w-full px-6 py-4 bg-white dark:bg-[#0B1121] rounded-[1.5rem] border-none outline-none focus:ring-2 focus:ring-[#2ECC71] text-slate-700 dark:text-white font-bold shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-5 bg-[#2ECC71] text-white rounded-[1.5rem] font-black text-[1rem] shadow-xl hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
          >
            <Check size={20} /> Authorize Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionModal;
