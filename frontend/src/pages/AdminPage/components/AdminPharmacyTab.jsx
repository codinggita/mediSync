import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { Building2, CheckCircle2, XCircle, Trash2, Loader2, RefreshCw, MapPin, Shield, Clock, Search, Check } from 'lucide-react';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';

const STATUS_COLORS = {
  Verified: { color: '#2ECC71', glow: 'rgba(46,204,113,0.3)' },
  Pending:  { color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  Rejected: { color: '#E11D48', glow: 'rgba(225,29,72,0.3)' },
};

import PharmacyCard from './PharmacyCard';

const STATUS_COLORS = {
  Verified: { color: '#2ECC71', glow: 'rgba(46,204,113,0.3)' },
  Pending:  { color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  Rejected: { color: '#E11D48', glow: 'rgba(225,29,72,0.3)' },
};

const AdminPharmacyTab = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [actionLoading, setActionLoading] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [search, setSearch] = useState('');
  const { isDarkMode } = useTheme();

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/pharmacies/pending');
      setPharmacies(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPharmacies(); }, []);

  const handleVerify = async (id, action) => {
    setActionLoading(id + action);
    try {
      await api.patch(`/pharmacies/${id}/status`, { status: action });
      setPharmacies(prev => prev.map(p => p._id === id ? { ...p, verificationStatus: action } : p));
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 2000);
    } catch (e) { alert('Action failed'); }
    finally { setActionLoading(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Permanently delete pharmacy "${name}"?`)) return;
    try {
      await api.delete(`/pharmacies/${id}`);
      setPharmacies(prev => prev.filter(p => p._id !== id));
    } catch (e) { alert('Delete failed'); }
  };

  const counts = {
    All: pharmacies.length,
    Pending:  pharmacies.filter(p => p.verificationStatus === 'Pending').length,
    Verified: pharmacies.filter(p => p.verificationStatus === 'Verified').length,
    Rejected: pharmacies.filter(p => p.verificationStatus === 'Rejected').length,
  };

  const displayed = pharmacies.filter(p => {
    const matchesFilter = filter === 'All' || p.verificationStatus === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.address.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <PremiumLoader message="Verifying Registries" />;

  return (
    <div className="flex flex-col gap-10 relative overflow-hidden min-h-[600px]">
      <div className="absolute -left-20 top-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none -rotate-12">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
              Pharmacy <span className="text-[#2ECC71]">Logistics</span>
            </h1>
            <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Managing pharmacy authentications</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`relative flex-1 min-w-[280px] ${isDarkMode ? 'bg-[#151E32] shadow-inner' : 'bg-[#ecf0f3] shadow-inner'} rounded-[1.5rem] px-5 py-3.5 flex items-center gap-3`}>
              <Search size={18} className="text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter records..." className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-500" />
            </div>
            <button onClick={fetchPharmacies} className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#151E32]' : 'bg-[#ecf0f3] shadow-md'}`}><RefreshCw size={20} /></button>
          </div>
        </div>

        <div className={`flex flex-wrap gap-4 p-3 rounded-[2rem] ${isDarkMode ? 'bg-[#0B1121] shadow-inner' : 'bg-[#e0e5ec] shadow-inner'}`}>
          {Object.entries(counts).map(([f, count]) => {
            const active = filter === f;
            const color = f === 'All' ? '#2A7FFF' : STATUS_COLORS[f]?.color || '#94a3b8';
            return (
              <button key={f} onClick={() => setFilter(f)} className={`flex items-center gap-3 px-8 py-3.5 rounded-[1.5rem] text-[0.8rem] font-black uppercase tracking-widest transition-all ${active ? (isDarkMode ? 'bg-[#151E32] shadow-lg' : 'bg-[#ecf0f3] shadow-md') : 'opacity-50'}`} style={{ color: active ? color : '#64748b' }}>
                {f} <span className="px-2.5 py-0.5 rounded-full text-[0.6rem] font-black bg-black/5 dark:bg-white/10">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {displayed.map(p => (
            <PharmacyCard key={p._id} pharmacy={p} onVerify={handleVerify} onDelete={handleDelete} actionLoading={actionLoading} successId={successId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPharmacyTab;
