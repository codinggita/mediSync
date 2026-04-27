import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import {
  Users, Building2, Pill, BarChart3, AlertTriangle, UserCheck,
  TrendingUp, Activity, Loader2, ArrowUpRight, Zap, Shield,
  Clock, Award
} from 'lucide-react';
import adminCoreImg from '../../../assets/images/admin_core.png';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';

const GlowCard = ({ label, value, icon: Icon, color, sub, trend, delay = 0 }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      className={`relative overflow-hidden rounded-[2rem] p-7 transition-all duration-500 hover:scale-[1.02] group cursor-pointer ${
        isDarkMode 
          ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
          : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Accent Image */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-125 transition-transform duration-700">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div 
            className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all duration-300 ${
              isDarkMode 
                ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' 
                : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
            } group-hover:scale-110`}
          >
            <Icon size={24} style={{ color }} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[0.65rem] font-black ${
              isDarkMode ? 'bg-white/5' : 'bg-black/5'
            }`} style={{ color }}>
              <ArrowUpRight size={12} />{trend}
            </div>
          )}
        </div>

        <p className={`text-[2.5rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          {value ?? <Loader2 size={24} className="animate-spin opacity-40" />}
        </p>
        <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{label}</p>
        {sub && (
          <p className="text-[0.65rem] text-slate-500 mt-2 flex items-center gap-1.5 font-bold uppercase tracking-wider">
            <Clock size={11} />{sub}
          </p>
        )}
      </div>
    </div>
  );
};

const ActivityRow = ({ user: u }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01] group mb-2 ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]'
    }`}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center text-white text-[0.8rem] font-black shadow-lg shrink-0">
        {u.name?.[0]?.toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[0.9rem] font-black truncate ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{u.name}</p>
        <p className="text-[0.7rem] text-slate-500 truncate font-medium">{u.email}</p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-wider ${
          u.role === 'Admin'   ? 'bg-purple-500/10 text-purple-500' :
          u.role === 'Doctor'  ? 'bg-blue-500/10 text-blue-500' :
                               'bg-emerald-500/10 text-emerald-500'
        }`}>{u.role}</span>
        <span className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-tighter">{new Date(u.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const AdminOverviewTab = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const s = stats?.stats || {};

  if (loading) return <PremiumLoader message="Fetching Analytics" />;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_10px_rgba(46,204,113,0.5)]" />
            <span className="text-[0.75rem] font-black text-[#2ECC71] uppercase tracking-[0.4em]">Live Intelligence</span>
          </div>
          <div className="relative">
             <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
               System <span className="text-[#2A7FFF]">Analysis</span>
             </h1>
          </div>
          <p className="text-slate-500 text-sm mt-3 font-medium uppercase tracking-widest opacity-80">Real-time platform authority console</p>
        </div>
        <div className={`hidden lg:flex items-center gap-4 px-6 py-4 rounded-[1.5rem] relative overflow-hidden ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'
        }`}>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-10 pointer-events-none">
             <img src={adminCoreImg} alt="Core" className="w-full h-full object-contain" />
          </div>
          <Shield size={22} className="text-[#2A7FFF] relative z-10" />
          <div className="relative z-10">
            <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Auth Level</p>
            <p className={`text-[0.9rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>MAXIMUM_ACCESS</p>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <GlowCard label="Total Users" value={loading ? null : s.totalUsers} icon={Users} color="#2A7FFF" trend="+12%" sub={`${s.bannedUsers ?? 0} suspended`} delay={0} />
        <GlowCard label="Total Doctors" value={loading ? null : s.totalDoctors} icon={UserCheck} color="#8B5CF6" trend="+5.2%" sub="Verified Clinical" delay={100} />
        <GlowCard label="Pharmacies" value={loading ? null : s.totalPharmacies} icon={Building2} color="#2ECC71" sub={`${s.pendingPharmacies ?? 0} pending`} delay={200} />
        <GlowCard label="Medicines" value={loading ? null : s.totalMedicines} icon={Pill} color="#F59E0B" trend="Active" sub="Global Registry" delay={300} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Registrations Feed */}
        <div className={`lg:col-span-2 rounded-[2.5rem] p-8 ${
          isDarkMode 
            ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]' 
            : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDarkMode ? 'bg-[#0B1121]' : 'bg-white shadow-inner'
              }`}><Users size={20} className="text-[#2A7FFF]" /></div>
              <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Recent Activity</h3>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-[0.2em] ${
              isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-black/5 text-slate-500'
            }`}>Live Feed</div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto scrollbar-hide pr-2">
            {loading ? (
              <div className="flex items-center justify-center py-20"><Loader2 size={40} className="text-[#2A7FFF] animate-spin opacity-50" /></div>
            ) : (
              (stats?.recentUsers || []).map(u => <ActivityRow key={u._id} user={u} />)
            )}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="flex flex-col gap-10">
          {/* System Integrity */}
          <div className={`rounded-[2.5rem] p-8 ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]' 
              : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
          }`}>
            <div className="flex items-center gap-3 mb-8">
              <Zap size={18} className="text-[#2ECC71]" />
              <h4 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>System Integrity</h4>
            </div>
            {[
              { label: 'Cloud Gateway', status: 'Optimal', color: '#2ECC71' },
              { label: 'Encryption', status: 'AES-256', color: '#2A7FFF' },
              { label: 'Latency', status: '12ms', color: '#8B5CF6' },
              { label: 'Storage', status: '94% Free', color: '#F59E0B' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0">
                <span className="text-[0.8rem] font-bold text-slate-500">{item.label}</span>
                <span className="text-[0.75rem] font-black uppercase tracking-tighter" style={{ color: item.color }}>{item.status}</span>
              </div>
            ))}
          </div>

          {/* Distribution Map */}
          <div className={`rounded-[2.5rem] p-8 ${
            isDarkMode 
              ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]' 
              : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
          }`}>
            <h4 className={`text-sm font-black uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>Platform Matrix</h4>
            {[
              { role: 'Patients', count: s.totalPatients || 0, color: '#2ECC71', pct: s.totalUsers ? Math.round((s.totalPatients / s.totalUsers) * 100) : 0 },
              { role: 'Doctors',  count: s.totalDoctors  || 0, color: '#2A7FFF', pct: s.totalUsers ? Math.round((s.totalDoctors  / s.totalUsers) * 100) : 0 },
              { role: 'Admins',   count: s.totalAdmins   || 0, color: '#8B5CF6', pct: s.totalUsers ? Math.round((s.totalAdmins   / s.totalUsers) * 100) : 0 },
            ].map(r => (
              <div key={r.role} className="mb-6 last:mb-0">
                <div className="flex justify-between mb-2">
                  <span className="text-[0.75rem] font-bold text-slate-500 uppercase">{r.role}</span>
                  <span className="text-[0.8rem] font-black" style={{ color: r.color }}>{r.pct}%</span>
                </div>
                <div className={`h-2.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#0B1121]' : 'bg-white shadow-inner'}`}>
                  <div className="h-full rounded-full transition-all duration-1000 shadow-lg" 
                    style={{ width: `${r.pct}%`, backgroundColor: r.color, boxShadow: `0 0 12px ${r.color}50` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewTab;
