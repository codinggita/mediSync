import React from 'react';
import { Sparkles, Pill, Building2, Check, Loader2, DollarSign } from 'lucide-react';

const PriceModificationForm = ({ form, setForm, medicines, pharmacies, onUpsert, saving, isDarkMode }) => {
  const inputClass = `w-full px-5 py-3.5 rounded-2xl font-bold text-sm outline-none transition-all duration-300 ${
    isDarkMode 
      ? 'bg-[#151E32] shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] text-white focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
      : 'bg-[#ecf0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-[#1F2937] focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]'
  }`;

  return (
    <div className={`rounded-[3rem] p-10 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
    }`}>
      <div className="flex items-center gap-4 mb-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
          isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
        }`}>
          <Sparkles size={24} className="text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Price Modification Interface</h3>
          <p className="text-[0.7rem] text-slate-500 font-bold uppercase tracking-widest mt-1">Updates existing or creates new market entries</p>
        </div>
      </div>

      <form onSubmit={onUpsert} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-end">
        <div className="space-y-3 lg:col-span-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Pill size={12} /> Medicine</label>
          <select value={form.medicineId} onChange={e => setForm({...form, medicineId: e.target.value})} className={inputClass}>
            {medicines.map(m => <option key={m._id} value={m._id} className={isDarkMode ? 'bg-[#0B1121]' : 'bg-white'}>{m.name}</option>)}
          </select>
        </div>

        <div className="space-y-3 lg:col-span-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Building2 size={12} /> Pharmacy</label>
          <select value={form.pharmacyId} onChange={e => setForm({...form, pharmacyId: e.target.value})} className={inputClass}>
            {pharmacies.map(p => <option key={p._id} value={p._id} className={isDarkMode ? 'bg-[#0B1121]' : 'bg-white'}>{p.name}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Base Unit Price</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
            <input required type="number" step="0.01" min="0" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" className={`${inputClass} pl-8`} />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Market Discount %</label>
          <input type="number" step="1" min="0" max="100" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} placeholder="0" className={inputClass} />
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className={`w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${
            saving === 'success' ? 'bg-[#2ECC71]' :
            isDarkMode 
              ? 'bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_0_20px_rgba(139,92,246,0.3)]' 
              : 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.4)]'
          } text-white uppercase tracking-widest`}
        >
          {saving === 'success' ? <Check size={18} className="animate-in zoom-in" /> : saving ? <Loader2 size={18} className="animate-spin" /> : <DollarSign size={18} />}
          {saving === 'success' ? 'Synchronized' : saving ? 'Committing...' : 'Commit Price'}
        </button>
      </form>
    </div>
  );
};

export default PriceModificationForm;
