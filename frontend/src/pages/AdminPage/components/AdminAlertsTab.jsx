import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { ShieldAlert, AlertTriangle, Info, Loader2, RefreshCw, Clock, Zap, Activity, ShieldCheck, ChevronRight } from 'lucide-react';

const SEV = {
  critical: { color: '#E11D48', icon: ShieldAlert, bg: 'rgba(225,29,72,0.1)' },
  warning:  { color: '#F59E0B', icon: AlertTriangle, bg: 'rgba(245,158,11,0.1)' },
  info:     { color: '#2A7FFF', icon: Info, bg: 'rgba(42,127,255,0.1)' },
};

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
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
            Threat <span className="text-[#E11D48]">Protocol</span>
          </h1>
          <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Autonomous system surveillance and anomaly monitoring</p>
        </div>
        
        <button 
          onClick={fetchAlerts}
          className={`px-8 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.05] active:scale-95 ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] text-slate-300' 
              : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] text-slate-600'
          } font-black uppercase tracking-widest text-[0.7rem]`}
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Force Sync
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Logs',   count: alerts.length,                                       color: '#2A7FFF', icon: Activity },
          { label: 'Critical',      count: alerts.filter(a=>a.severity==='critical').length,   color: '#E11D48', icon: ShieldAlert },
          { label: 'Warnings',      count: alerts.filter(a=>a.severity==='warning').length,    color: '#F59E0B', icon: AlertTriangle },
          { label: 'Health OK',     status: '99.8%',                                          color: '#2ECC71', icon: ShieldCheck },
        ].map(s => (
          <div key={s.label} className={`rounded-[2rem] p-7 transition-all duration-300 hover:scale-[1.05] ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
              : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
          }`}>
            <s.icon size={22} style={{ color: s.color }} className="mb-4" />
            <p className={`text-[2.2rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{s.count ?? s.status}</p>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3 opacity-60" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Matrix */}
      <div className={`flex flex-wrap gap-4 p-3 rounded-[2rem] ${
        isDarkMode ? 'bg-[#0B1121] shadow-inner' : 'bg-[#e0e5ec] shadow-inner'
      }`}>
        {Object.entries(counts).map(([f, count]) => {
          const active = filter === f;
          const color = f === 'All' ? '#2A7FFF' : SEV[f.toLowerCase()]?.color || '#94a3b8';
          return (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`flex items-center gap-4 px-8 py-3.5 rounded-[1.5rem] text-[0.8rem] font-black uppercase tracking-widest transition-all duration-300 ${
                active 
                  ? (isDarkMode 
                      ? 'bg-[#151E32] shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47]' 
                      : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]')
                  : 'opacity-50 hover:opacity-100'
              }`}
              style={{ color: active ? color : '#64748b' }}
            >
              {f}
              <span className={`px-2.5 py-1 rounded-full text-[0.6rem] font-black ${
                active ? 'bg-white/10' : 'bg-black/5'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Alerts Matrix Feed */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 border-t-[#E11D48] rounded-full animate-spin shadow-xl" />
            <ShieldAlert size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E11D48]" />
          </div>
          <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-[0.4em]">Deep-Scanning System Protocols...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-10">
          {displayed.map((alert, i) => {
            const cfg = SEV[alert.severity] || SEV.info;
            const Icon = cfg.icon;
            return (
              <div key={i} className={`flex items-start sm:items-center gap-6 p-7 rounded-[2rem] transition-all duration-300 group ${
                isDarkMode 
                  ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
                  : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
              } hover:scale-[1.005]`}>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
                }`}>
                  <Icon size={24} style={{ color: cfg.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-[1.1rem] font-black leading-tight mb-2 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{alert.message}</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest flex items-center gap-2 ${
                      isDarkMode ? 'bg-black/20' : 'bg-white shadow-inner'
                    }`} style={{ color: cfg.color }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                      {alert.severity}
                    </span>
                    <span className="text-[0.65rem] font-bold text-slate-400 flex items-center gap-2">
                      <Clock size={12} /> {new Date(alert.timestamp).toLocaleString()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 text-slate-500`}>
                      {alert.type?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-2 transition-transform" />
              </div>
            );
          })}
          {!displayed.length && (
            <div className={`py-40 rounded-[3rem] flex flex-col items-center justify-center gap-6 border-2 border-dashed ${
              isDarkMode ? 'border-white/5 bg-white/2' : 'border-black/5 bg-black/2'
            }`}>
              <div className="w-20 h-20 rounded-full bg-[#2ECC71]/10 flex items-center justify-center shadow-inner">
                <ShieldCheck size={40} className="text-[#2ECC71]" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-[#2ECC71] uppercase tracking-[0.3em]">Sector Secure</p>
                <p className="text-sm text-slate-500 mt-2 font-bold italic">No anomalies detected in the current monitoring cycle</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAlertsTab;
