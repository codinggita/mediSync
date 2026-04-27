import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { BarChart3, Users, Pill, Building2, Loader2, TrendingUp, Activity, Zap, ChevronRight, Target } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PALETTE = ['#2A7FFF', '#8B5CF6', '#2ECC71', '#F59E0B', '#E11D48', '#06B6D4', '#F97316', '#84CC16'];

const GlowBar = ({ data, label, color }) => {
  const { isDarkMode } = useTheme();
  if (!data?.length) return <div className="text-slate-600 text-sm text-center py-12 font-black uppercase tracking-widest">Insufficient Data</div>;
  const max = Math.max(...data.map(d => d.count), 1);
  
  return (
    <div className="mt-8">
      <div className="flex items-end gap-3 h-48 px-2">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-3 group">
            <span className={`text-[0.6rem] font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>{d.count}</span>
            <div className={`w-full rounded-t-2xl transition-all duration-700 relative overflow-hidden flex flex-col justify-end ${
              isDarkMode 
                ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' 
                : 'shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff]'
            }`} style={{ height: `${Math.max((d.count / max) * 100, 8)}%` }}>
              <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(180deg, ${color}, ${color}88)` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-4 px-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center text-[0.55rem] font-black uppercase tracking-[0.1em] text-slate-500">
            {d._id?.month ? MONTHS[(d._id.month - 1)] : String(d._id).substring(0, 4)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgressChart = ({ data }) => {
  const { isDarkMode } = useTheme();
  if (!data?.length) return null;
  const total = data.reduce((s, d) => s + d.count, 0);
  
  return (
    <div className="flex flex-col gap-6">
      {data.map((d, i) => {
        const pct = ((d.count / total) * 100).toFixed(0);
        const color = PALETTE[i % PALETTE.length];
        return (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[0.8rem] font-black flex items-center gap-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                <div className={`w-3 h-3 rounded-full shrink-0 shadow-lg`} style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}80` }} />
                {d._id || 'Unclassified'}
              </span>
              <div className="flex items-center gap-3">
                <span className={`text-[0.8rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{d.count}</span>
                <span className="text-[0.7rem] font-bold text-slate-400">({pct}%)</span>
              </div>
            </div>
            <div className={`h-3 rounded-full p-0.5 overflow-hidden ${isDarkMode ? 'bg-black/30 shadow-inner' : 'bg-black/5 shadow-inner'}`}>
              <div className="h-full rounded-full transition-all duration-1000 shadow-lg" 
                style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 10px ${color}40` }} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AdminAnalyticsTab = () => {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    Promise.all([api.get('/admin/analytics'), api.get('/admin/stats')])
      .then(([a, s]) => {
        setData({ ...a.data, userGrowth: s.data.userGrowth });
        setStats(s.data.stats);
      })
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-slate-200 border-t-[#2A7FFF] rounded-full animate-spin shadow-xl" />
        <BarChart3 size={30} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2A7FFF]" />
      </div>
      <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-[0.4em]">Aggregating Intelligence...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          Platform <span className="text-[#2A7FFF]">Intelligence</span>
        </h1>
        <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Holistic system performance & growth trajectory</p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users',    val: stats?.totalUsers,    color: '#2A7FFF', icon: Users },
          { label: 'Doctor Hub',     val: stats?.totalDoctors,  color: '#8B5CF6', icon: Activity },
          { label: 'Pharma Registry',val: stats?.totalMedicines,color: '#F59E0B', icon: Pill },
          { label: 'Network Points', val: stats?.totalPharmacies,color: '#2ECC71', icon: Building2 },
        ].map(c => (
          <div key={c.label} className={`rounded-[2rem] p-6 transition-all duration-300 hover:scale-[1.05] ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
              : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
          }`}>
            <c.icon size={20} style={{ color: c.color }} className="mb-4" />
            <p className={`text-[2rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{c.val ?? '—'}</p>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] mt-3 opacity-60" style={{ color: c.color }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Analytics Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Appointments Activity */}
        <div className={`rounded-[3rem] p-10 ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
        }`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
            }`}><BarChart3 size={20} className="text-[#2A7FFF]" /></div>
            <div>
              <h3 className={`text-[1.1rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Consultation Flux</h3>
              <p className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mt-1">6 Month Activity Log</p>
            </div>
          </div>
          <GlowBar data={data?.appointmentsByMonth} label="Appointments" color="#2A7FFF" />
        </div>

        {/* Identity Matrix */}
        <div className={`rounded-[3rem] p-10 ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
        }`}>
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
            }`}><Users size={20} className="text-[#8B5CF6]" /></div>
            <div>
              <h3 className={`text-[1.1rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Identity Composition</h3>
              <p className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mt-1">Role-based user distribution</p>
            </div>
          </div>
          <ProgressChart data={data?.userRoles} />
        </div>

        {/* Global Inventory breakdown */}
        <div className={`rounded-[3rem] p-10 ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
        }`}>
          <div className="flex items-center gap-4 mb-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
            }`}><Pill size={20} className="text-[#F59E0B]" /></div>
            <div>
              <h3 className={`text-[1.1rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Pharmacopeia Matrix</h3>
              <p className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mt-1">Therapeutic category spread</p>
            </div>
          </div>
          <ProgressChart data={data?.medicineCategoryBreakdown} />
        </div>

        {/* Growth Trajectory */}
        <div className={`rounded-[3rem] p-10 ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
        }`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
            }`}><TrendingUp size={20} className="text-[#2ECC71]" /></div>
            <div>
              <h3 className={`text-[1.1rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Expansion Vector</h3>
              <p className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mt-1">Monthly registration volume</p>
            </div>
          </div>
          <GlowBar data={data?.userGrowth || []} label="Registrations" color="#2ECC71" />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsTab;
