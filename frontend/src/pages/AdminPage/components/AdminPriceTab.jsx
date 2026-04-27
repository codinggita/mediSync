import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { DollarSign, ArrowDown, ArrowUp, Loader2, Sparkles, TrendingDown, TrendingUp, Search, Building2, Pill, Check } from 'lucide-react';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';

const AdminPriceTab = () => {
  const [prices, setPrices] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ medicineId: '', pharmacyId: '', price: '', discount: '' });
  const [saving, setSaving] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    Promise.all([api.get('/admin/prices'), api.get('/admin/medicines'), api.get('/admin/pharmacies')])
      .then(([p, m, ph]) => {
        setPrices(p.data); setMedicines(m.data); setPharmacies(ph.data);
        if (m.data[0]) setForm(f => ({ ...f, medicineId: m.data[0]._id }));
        if (ph.data[0]) setForm(f => ({ ...f, pharmacyId: ph.data[0]._id }));
      }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleUpsert = async (e) => {
    e.preventDefault();
    if (!form.price) return;
    setSaving(true);
    try {
      const { data } = await api.post('/admin/prices', form);
      setPrices(prev => {
        const exists = prev.find(p => p._id === data._id);
        return exists ? prev.map(p => p._id === data._id ? data : p) : [data, ...prev];
      });
      setForm(f => ({ ...f, price: '', discount: '' }));
      setSaving('success');
      setTimeout(() => setSaving(false), 2000);
    } catch (e) { alert('Failed to save price'); setSaving(false); }
  };

  const getPriceHighlight = (price) => {
    const related = prices.filter(p => p.medicine?._id === price.medicine?._id).map(p => p.price);
    if (related.length < 2) return 'normal';
    if (price.price === Math.min(...related)) return 'lowest';
    if (price.price === Math.max(...related)) return 'highest';
    return 'normal';
  };

  const inputClass = `w-full px-5 py-3.5 rounded-2xl font-bold text-sm outline-none transition-all duration-300 ${
    isDarkMode 
      ? 'bg-[#151E32] shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] text-white focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
      : 'bg-[#ecf0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] text-[#1F2937] focus:shadow-[0_0_15px_rgba(139,92,246,0.2)]'
  }`;

  if (loading) return <PremiumLoader message="Indexing Market Trends" />;

  return (
    <div className="flex flex-col gap-10 relative overflow-hidden min-h-[600px]">
      {/* Background Accent */}
      <div className="absolute -right-20 top-20 w-[600px] h-[600px] opacity-[0.02] pointer-events-none scale-150">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
      {/* Header */}
      <div>
        <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          Market <span className="text-[#8B5CF6]">Dynamics</span>
        </h1>
        <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Overseeing system-wide pharmaceutical pricing governance</p>
      </div>

      {/* Set Price Form Panel */}
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

        <form onSubmit={handleUpsert} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-end">
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

      {/* Comparison Table Section */}
      <div className={`rounded-[2.5rem] overflow-hidden p-8 ${
        isDarkMode 
          ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
      }`}>
        <div className="flex items-center justify-between mb-8 px-4">
          <h3 className={`text-xl font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            <TrendingUp size={24} className="text-[#2ECC71]" /> Competitive Index
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2ECC71] shadow-[0_0_8px_#2ECC71]" />
              <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#2ECC71]">Market Minimum</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E11D48] shadow-[0_0_8px_#E11D48]" />
              <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#E11D48]">Market Maximum</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-[#8B5CF6] rounded-full animate-spin shadow-xl" />
            <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em]">Analyzing Market Trends...</p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/5">
                  {['Medication Identity', 'Unit', 'Source Pharmacy', 'List Price', 'Rebate', 'Effective Cost'].map(h => (
                    <th key={h} className="text-left px-6 py-5 text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {prices.map(p => {
                  const hl = getPriceHighlight(p);
                  const final = p.price - (p.price * (p.discount || 0) / 100);
                  return (
                    <tr key={p._id} className={`transition-all duration-300 group ${
                      hl === 'lowest' ? 'bg-emerald-500/5' : hl === 'highest' ? 'bg-rose-500/5' : 'hover:bg-black/2'
                    }`}>
                      <td className={`px-6 py-5 font-black text-[0.9rem] ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{p.medicine?.name || '—'}</td>
                      <td className="px-6 py-5 text-[0.8rem] font-bold text-slate-400">{p.medicine?.dosage || '—'}</td>
                      <td className={`px-6 py-5 text-[0.85rem] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{p.pharmacy?.name || '—'}</td>
                      <td className="px-6 py-5 text-[0.9rem] font-black text-slate-500">₹{p.price.toFixed(2)}</td>
                      <td className="px-6 py-5">
                        {p.discount ? (
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-black bg-black/5 dark:bg-white/5`}>
                            <TrendingDown size={12} className="text-[#8B5CF6]" />
                            <span className="text-[#8B5CF6]">{p.discount}%</span>
                          </div>
                        ) : <span className="text-slate-600 font-bold">—</span>}
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl transition-all duration-300 ${
                          isDarkMode 
                            ? (hl === 'lowest' ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'bg-black/20') 
                            : (hl === 'lowest' ? 'shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]' : 'bg-white shadow-inner')
                        }`}>
                          {hl === 'lowest'  && <ArrowDown size={14} className="text-[#2ECC71]" />}
                          {hl === 'highest' && <ArrowUp size={14} className="text-[#E11D48]" />}
                          <span className={`text-[1.1rem] font-black ${
                            hl === 'lowest' ? 'text-[#2ECC71]' : hl === 'highest' ? 'text-[#E11D48]' : (isDarkMode ? 'text-white' : 'text-[#1F2937]')
                          }`}>₹{final.toFixed(2)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!prices.length && (
              <div className="py-24 text-center flex flex-col items-center gap-4">
                <DollarSign size={40} className="text-slate-200" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No market data available</p>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminPriceTab;
