import React from 'react';

const MedicineModal = ({ selectedMedicine, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 rounded-[3rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[20px_20px_60px_rgba(0,0,0,0.2)] border border-white/40 animate-in fade-in zoom-in duration-300">
        <h2 className="text-[1.8rem] font-black mb-1 text-slate-900 dark:text-white leading-none">
          Registry <span className="text-[#F59E0B]">Node</span>
        </h2>
        <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
          Clinical Artifact Configuration
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-500 ml-2">
              Medicine Identity
            </label>
            <input
              id="med-name"
              type="text"
              defaultValue={selectedMedicine?.name}
              placeholder="e.g. Lisinopril"
              className="w-full px-6 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border-none outline-none font-bold text-slate-700 dark:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-500 ml-2">
                Dosage
              </label>
              <input
                id="med-dosage"
                type="text"
                defaultValue={selectedMedicine?.dosage}
                className="w-full px-6 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border-none outline-none font-bold text-slate-700 dark:text-slate-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-500 ml-2">
                Manufacturer
              </label>
              <input
                id="med-manufacturer"
                type="text"
                defaultValue={selectedMedicine?.manufacturer}
                className="w-full px-6 py-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border-none outline-none font-bold text-slate-700 dark:text-slate-300"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] hover:text-[#2A7FFF] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const name = document.getElementById('med-name').value;
                const dosage = document.getElementById('med-dosage').value;
                const manufacturer = document.getElementById('med-manufacturer').value;
                onSave({ name, dosage, manufacturer });
              }}
              className="flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-[#F59E0B] shadow-[0_8px_20px_rgba(245,158,11,0.3)] hover:bg-[#D97706] transition-all"
            >
              Save Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
