import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';
import PriceModificationForm from './PriceModificationForm';
import MarketComparisonTable from './MarketComparisonTable';

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

  if (loading) return <PremiumLoader message="Indexing Market Trends" />;

  return (
    <div className="flex flex-col gap-10 relative overflow-hidden min-h-[600px]">
      <div className="absolute -right-20 top-20 w-[600px] h-[600px] opacity-[0.02] pointer-events-none scale-150">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        <div>
          <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            Market <span className="text-[#8B5CF6]">Dynamics</span>
          </h1>
          <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Overseeing system-wide pharmaceutical pricing governance</p>
        </div>

        <PriceModificationForm 
          form={form}
          setForm={setForm}
          medicines={medicines}
          pharmacies={pharmacies}
          onUpsert={handleUpsert}
          saving={saving}
          isDarkMode={isDarkMode}
        />

        <MarketComparisonTable 
          prices={prices}
          getPriceHighlight={getPriceHighlight}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default AdminPriceTab;
