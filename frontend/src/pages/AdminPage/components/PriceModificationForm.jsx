import React from 'react';
import { Sparkles, Pill, Building2, Check, Loader2, DollarSign } from 'lucide-react';

const PriceModificationForm = ({
  form,
  setForm,
  medicines,
  pharmacies,
  onUpsert,
  saving,
  isDarkMode,
}) => {
  const inputClass = `w-full px-5 py-3.5 rounded-2xl font-bold text-sm outline-none transition-all duration-300 ${
    isDarkMode
      ? 'bg-[#151E32] shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] text-white focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]'
      : 'bg-[#ecf0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-[#1F2937] focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]'
  }`;

  return (
    <div
      className={`rounded-[3rem] p-10 relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-[#151E32] shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/5'
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
      }`}
    >
      <div className="flex items-center gap-5 mb-12">
        <div
          className={`w-16 h-16 rounded-[22px] bg-[#ecf0f3] dark:bg-[#0B1121] flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] border border-white/20`}
        >
          <Sparkles size={28} strokeWidth={2.5} className="text-[#8B5CF6]" />
        </div>
        <div>
          <h3
            className={`text-[1.4rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}
          >
            Price Modification Interface
          </h3>
          <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
            Updates Existing or Creates New Market Entries
          </p>
        </div>
      </div>

      <form
        onSubmit={onUpsert}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-end"
      >
        <div className="space-y-4 lg:col-span-1">
          <label className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
            <Pill size={12} strokeWidth={3} className="text-[#8B5CF6]" /> Medicine
          </label>
          <select
            value={form.medicineId}
            onChange={(e) => setForm({ ...form, medicineId: e.target.value })}
            className={inputClass}
          >
            {medicines.map((m) => (
              <option
                key={m._id}
                value={m._id}
                className={isDarkMode ? 'bg-[#0B1121]' : 'bg-white'}
              >
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 lg:col-span-1">
          <label className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
            <Building2 size={12} strokeWidth={3} className="text-[#8B5CF6]" /> Pharmacy
          </label>
          <select
            value={form.pharmacyId}
            onChange={(e) => setForm({ ...form, pharmacyId: e.target.value })}
            className={inputClass}
          >
            {pharmacies.map((p) => (
              <option
                key={p._id}
                value={p._id}
                className={isDarkMode ? 'bg-[#0B1121]' : 'bg-white'}
              >
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] ml-2">
            Base Unit Price
          </label>
          <div className="relative group">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B5CF6] font-black text-[1rem]">
              ₹
            </span>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] ml-2">
            Market Discount %
          </label>
          <div className="relative">
            <input
              type="number"
              step="1"
              min="0"
              max="100"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              placeholder="0"
              className={inputClass}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[0.8rem]">
              %
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-5 rounded-[1.5rem] font-black text-xs transition-all duration-300 hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-3 ${
            saving === 'success'
              ? 'bg-[#2ECC71]'
              : isDarkMode
                ? 'bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_10px_30px_rgba(139,92,246,0.3)]'
                : 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] shadow-[0_12px_24px_rgba(139,92,246,0.4)]'
          } text-white uppercase tracking-[0.2em]`}
        >
          {saving === 'success' ? (
            <Check size={20} strokeWidth={3} className="animate-in zoom-in" />
          ) : saving ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <span className="text-[1.2rem] font-black">₹</span>
          )}
          {saving === 'success' ? 'Synchronized' : saving ? 'Committing...' : 'Commit Price'}
        </button>
      </form>
    </div>
  );
};

export default PriceModificationForm;
