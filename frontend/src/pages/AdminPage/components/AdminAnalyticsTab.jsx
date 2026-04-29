import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { BarChart2, TrendingUp, Activity, PieChart, Download } from 'lucide-react';
import PremiumLoader from '../../../components/PremiumLoader';
import AdminAnalytics from './AdminAnalytics';

const AdminAnalyticsTab = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    api.get('/admin/analytics')
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleExport = () => {
    const csvContent = "Metric,Value,Context\nNetwork Health,99.98%,Uptime over last 30 cycles\nUser Velocity,+24.5%,Onboarding acceleration rate\nMarket Share,62%,Regional pharmaceutical capture";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediSync_Strategic_Intelligence_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) return <PremiumLoader message="Synthesizing Platform Intelligence" />;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
          <h1 className={`text-[2.8rem] font-black leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Strategic <span className="text-[#2A7FFF]">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-[0.7rem] mt-4 font-black uppercase tracking-[0.25em] opacity-80">Deep-Dive Into Platform Health & Market Growth</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 mr-4">
             <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] shadow-[0_0_12px_#2ECC71]" />
             <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#2ECC71]">System Online</span>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-3 bg-[#2A7FFF] hover:bg-[#1D68CC] text-white px-8 py-4 rounded-[1.5rem] font-black text-[0.75rem] uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:scale-[1.03] active:scale-95 group"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            <span>Export Matrix</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { title: 'Network Health', val: '99.98%', desc: 'Uptime over last 30 cycles', icon: Activity, col: '#2ECC71' },
          { title: 'User Velocity', val: '+24.5%', desc: 'Onboarding acceleration rate', icon: TrendingUp, col: '#2A7FFF' },
          { title: 'Market Share', val: '62%', desc: 'Regional pharmaceutical capture', icon: PieChart, col: '#8B5CF6' }
        ].map((card, i) => (
          <div key={i} className={`p-10 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5' 
              : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
          }`}>
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/10`} style={{ backgroundColor: `${card.col}15`, color: card.col }}>
                <card.icon size={22} strokeWidth={2.5} />
              </div>
              <h3 className={`text-[0.75rem] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{card.title}</h3>
            </div>
            <div className="text-[2.8rem] font-black tracking-tight mb-3" style={{ color: card.col }}>{card.val}</div>
            <p className="text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <AdminAnalytics isDarkMode={isDarkMode} />
    </div>
  );
};

export default AdminAnalyticsTab;
