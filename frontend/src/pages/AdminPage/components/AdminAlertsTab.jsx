import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { ShieldAlert, RefreshCw, ShieldCheck } from 'lucide-react';
import AdminStatSummary from './AdminStatSummary';
import AdminAlertItem from './AdminAlertItem';

const AdminAlertsTab = ({ onCountChange }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { isDarkMode } = useTheme();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/alerts');
      setAlerts(data.alerts || []);
      onCountChange?.(data.criticalCount || 0);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAlerts(); }, []);

  const counts = {
    All:      alerts.length,
    Critical: alerts.filter(a => a.severity === 'critical').length,
    Warning:  alerts.filter(a => a.severity === 'warning').length,
    Info:     alerts.filter(a => a.severity === 'info').length,
  };
  const displayed = filter === 'All' ? alerts : alerts.filter(a => a.severity === filter.toLowerCase());

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            Threat <span className="text-[#E11D48]">Protocol</span>
          </h1>
          <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Autonomous system surveillance and anomaly monitoring</p>
        </div>
        
        <button onClick={fetchAlerts} className={`px-8 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.05] active:scale-95 ${isDarkMode ? 'bg-[#151E32] text-slate-300' : 'bg-[#ecf0f3] text-slate-600'} font-black uppercase tracking-widest text-[0.7rem]`}>
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Force Sync
        </button>
      </div>

      <AdminStatSummary alerts={alerts} isDarkMode={isDarkMode} />

      <div className={`flex flex-wrap gap-4 p-3 rounded-[2rem] ${isDarkMode ? 'bg-[#0B1121]' : 'bg-[#e0e5ec]'}`}>
        {Object.entries(counts).map(([f, count]) => (
          <button 
            key={f} onClick={() => setFilter(f)}
            className={`flex items-center gap-4 px-8 py-3.5 rounded-[1.5rem] text-[0.8rem] font-black uppercase tracking-widest transition-all duration-300 ${filter === f ? (isDarkMode ? 'bg-[#151E32] text-white' : 'bg-[#ecf0f3] text-[#2A7FFF]') : 'opacity-50 hover:opacity-100'}`}
          >
            {f} <span className="px-2.5 py-1 rounded-full text-[0.6rem] font-black bg-black/5 dark:bg-white/5">{count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 border-t-[#E11D48] rounded-full animate-spin" />
            <ShieldAlert size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E11D48]" />
          </div>
          <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-[0.4em]">Scanning System Protocols...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-10">
          {displayed.map((alert, i) => <AdminAlertItem key={i} alert={alert} isDarkMode={isDarkMode} />)}
          {!displayed.length && (
            <div className="py-40 rounded-[3rem] flex flex-col items-center justify-center gap-6 border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 rounded-full bg-[#2ECC71]/10 flex items-center justify-center"><ShieldCheck size={40} className="text-[#2ECC71]" /></div>
              <div className="text-center">
                <p className="text-xl font-black text-[#2ECC71] uppercase tracking-[0.3em]">Sector Secure</p>
                <p className="text-sm text-slate-500 mt-2 font-bold italic">No anomalies detected in the current cycle</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAlertsTab;
