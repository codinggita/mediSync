import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { Pill, Plus, Pencil, Trash2, Loader2, Save, X, Tag, Beaker, Search, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Antibiotic', 'Painkiller', 'Antiviral', 'Antifungal', 'Cardiovascular', 'Diabetes', 'Vitamins', 'Dermatology', 'Neurology', 'Other'];
const CAT_COLORS = { Antibiotic: '#2A7FFF', Painkiller: '#E11D48', Antiviral: '#8B5CF6', Antifungal: '#2ECC71', Cardiovascular: '#E11D48', Diabetes: '#F59E0B', Vitamins: '#06B6D4', Dermatology: '#F97316', Neurology: '#8B5CF6', Other: '#64748b' };

import MedicineModal from './MedicineModal';

const CAT_COLORS = { Antibiotic: '#2A7FFF', Painkiller: '#E11D48', Antiviral: '#8B5CF6', Antifungal: '#2ECC71', Cardiovascular: '#E11D48', Diabetes: '#F59E0B', Vitamins: '#06B6D4', Dermatology: '#F97316', Neurology: '#8B5CF6', Other: '#64748b' };

const AdminMedicineTab = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      api.get(`/admin/medicines${search ? `?search=${search}` : ''}`).then(r => setMedicines(r.data)).finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleSave = (saved, type) => {
    if (type === 'add') setMedicines(prev => [saved, ...prev]);
    else setMedicines(prev => prev.map(m => m._id === saved._id ? saved : m));
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove "${name}"?`)) return;
    await api.delete(`/admin/medicines/${id}`);
    setMedicines(prev => prev.filter(m => m._id !== id));
  };

  return (
    <div className="flex flex-col gap-10">
      {modal !== null && <MedicineModal medicine={modal === 'add' ? null : modal} onSave={handleSave} onClose={() => setModal(null)} />}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            Medicine <span className="text-[#F59E0B]">Inventory</span>
          </h1>
          <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Global registry management</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`relative flex-1 min-w-[280px] ${isDarkMode ? 'bg-[#151E32] shadow-inner' : 'bg-[#ecf0f3] shadow-inner'} rounded-[1.5rem] px-5 py-3.5 flex items-center gap-3`}>
            <Search size={18} className="text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-500" />
          </div>
          <button onClick={() => setModal('add')} className="px-8 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white font-black uppercase tracking-widest text-[0.7rem] shadow-lg"><Plus size={18} /> New Medicine</button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 border-t-[#F59E0B] rounded-full animate-spin shadow-xl" />
            <Beaker size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F59E0B]" />
          </div>
          <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-[0.4em]">Querying Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
          {medicines.map(m => {
            const catColor = CAT_COLORS[m.category] || '#64748b';
            return (
              <div key={m._id} className={`group relative overflow-hidden rounded-[2.5rem] p-7 transition-all duration-500 hover:scale-[1.02] ${isDarkMode ? 'bg-[#151E32] shadow-lg' : 'bg-[#ecf0f3] shadow-md'}`}>
                <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-3xl" style={{ backgroundColor: catColor }} />
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all ${isDarkMode ? 'bg-black/20' : 'bg-white shadow-md'}`}><Pill size={24} style={{ color: catColor }} /></div>
                  <span className="px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest" style={{ color: m.stockStatus === 'In Stock' ? '#2ECC71' : '#E11D48' }}>{m.stockStatus}</span>
                </div>
                <div className="mb-8">
                  <h4 className={`text-xl font-black leading-tight truncate ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{m.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-[0.8rem] font-black px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5" style={{ color: catColor }}>{m.dosage}</p>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <p className="text-[0.7rem] font-bold text-slate-500 truncate">{m.manufacturer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-8">
                  <Tag size={12} style={{ color: catColor }} />
                  <span className="text-[0.7rem] font-black uppercase tracking-[0.1em] text-slate-400">{m.category}</span>
                </div>
                <div className="flex gap-4 pt-6 border-t border-black/5 dark:border-white/5">
                  <button onClick={() => setModal(m)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[0.7rem] font-black transition-all hover:scale-105 active:scale-95 bg-black/5 dark:bg-white/5 text-[#2A7FFF]"><Pencil size={12} /> Edit</button>
                  <button onClick={() => handleDelete(m._id, m.name)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[0.7rem] font-black transition-all hover:scale-105 active:scale-95 bg-black/5 dark:bg-white/5 text-[#E11D48]"><Trash2 size={12} /> Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminMedicineTab;
