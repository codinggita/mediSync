import React, { useState } from 'react';
import { Pill, X, Save, Loader2 } from 'lucide-react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';

const CATEGORIES = ['Antibiotic', 'Painkiller', 'Antiviral', 'Antifungal', 'Cardiovascular', 'Diabetes', 'Vitamins', 'Dermatology', 'Neurology', 'Other'];

const MedicineModal = ({ medicine, onSave, onClose }) => {
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState(medicine || { name: '', dosage: '', category: 'Other', manufacturer: '', description: '', stockStatus: 'In Stock' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (medicine?._id) { const { data } = await api.put(`/admin/medicines/${medicine._id}`, form); onSave(data, 'edit'); }
      else { const { data } = await api.post('/admin/medicines', form); onSave(data, 'add'); }
      onClose();
    } catch (err) { alert(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const inputClass = `w-full px-5 py-4 rounded-2xl font-bold text-sm outline-none transition-all duration-300 ${
    isDarkMode ? 'bg-[#151E32] shadow-inner text-white' : 'bg-[#ecf0f3] shadow-inner text-[#1F2937]'
  }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
      <div className={`w-full max-w-xl rounded-[3rem] p-10 transition-all ${isDarkMode ? 'bg-[#151E32] shadow-2xl' : 'bg-[#ecf0f3] shadow-2xl'}`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"><Pill size={24} className="text-[#F59E0B]" /></div>
            <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{medicine ? 'Modify Entry' : 'New Medicine'}</h3>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md hover:scale-110 transition-all"><X size={20} className="text-slate-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest ml-2">Proprietary Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Lipitor 20mg" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest ml-2">Dosage Unit</label>
              <input value={form.dosage} onChange={e => setForm({...form, dosage: e.target.value})} placeholder="e.g. 10mg" className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest ml-2">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest ml-2">Manufacturer</label>
            <input value={form.manufacturer} onChange={e => setForm({...form, manufacturer: e.target.value})} placeholder="e.g. Pfizer" className={inputClass} />
          </div>

          <div className="space-y-2">
            <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest ml-2">Stock Level</label>
            <div className="flex gap-4">
              {['In Stock', 'Out of Stock'].map(s => (
                <button type="button" key={s} onClick={() => setForm({...form, stockStatus: s})} className={`flex-1 py-4 rounded-2xl text-[0.75rem] font-black uppercase tracking-widest transition-all ${form.stockStatus === s ? (isDarkMode ? 'bg-[#151E32] shadow-inner text-[#2ECC71]' : 'bg-[#ecf0f3] shadow-inner text-[#2ECC71]') : 'opacity-50'}`}>{s}</button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} className="mt-6 w-full py-5 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white font-black text-sm flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95">
            {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {medicine ? 'Commit Changes' : 'Initialize Record'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MedicineModal;
