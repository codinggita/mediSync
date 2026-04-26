import React, { useState, useEffect } from 'react';
import TopBar from '../DashboardPage/components/TopBar';
import AdminOverviewTab from './components/AdminOverviewTab';
import AdminPharmacyTab from './components/AdminPharmacyTab';
import AdminMedicineTab from './components/AdminMedicineTab';
import AdminPriceTab from './components/AdminPriceTab';
import AdminUsersTab from './components/AdminUsersTab';
import AdminAnalyticsTab from './components/AdminAnalyticsTab';
import AdminAlertsTab from './components/AdminAlertsTab';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Pill, DollarSign, Users,
  BarChart3, Bell, ShieldCheck, LogOut, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import adminCoreImg from '../../assets/images/admin_core.png';

const TABS = [
  { id: 'overview',  label: 'Overview',   icon: LayoutDashboard, color: '#2A7FFF' },
  { id: 'pharmacy',  label: 'Pharmacies', icon: Building2,       color: '#2ECC71' },
  { id: 'medicines', label: 'Medicines',  icon: Pill,            color: '#F59E0B' },
  { id: 'prices',    label: 'Prices',     icon: DollarSign,      color: '#8B5CF6' },
  { id: 'users',     label: 'Users',      icon: Users,           color: '#06B6D4' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3,       color: '#E11D48' },
  { id: 'alerts',    label: 'Alerts',     icon: Bell,            color: '#F97316' },
];

const AdminPage = () => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [alertCount, setAlertCount] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!user || user.role !== 'Admin') navigate('/dashboard');
  }, [user, navigate]);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':  return <AdminOverviewTab />;
      case 'pharmacy':  return <AdminPharmacyTab />;
      case 'medicines': return <AdminMedicineTab />;
      case 'prices':    return <AdminPriceTab />;
      case 'users':     return <AdminUsersTab />;
      case 'analytics': return <AdminAnalyticsTab />;
      case 'alerts':    return <AdminAlertsTab onCountChange={setAlertCount} />;
      default:          return <AdminOverviewTab />;
    }
  };

  const activeTabData = TABS.find(t => t.id === activeTab);

  // Mode-aware style tokens
  const sidebar = isDarkMode
    ? { bg: 'linear-gradient(180deg,#0D1526 0%,#0B1121 100%)', border: 'rgba(255,255,255,0.06)', text: '#fff', sub: '#475569', profileBg: 'rgba(42,127,255,0.12)', profileBorder: 'rgba(42,127,255,0.2)' }
    : { bg: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)', border: 'rgba(0,0,0,0.07)', text: '#1e293b', sub: '#94a3b8', profileBg: 'rgba(42,127,255,0.06)', profileBorder: 'rgba(42,127,255,0.15)' };

  const main = isDarkMode
    ? { bg: '#090E1A', breadcrumb: 'rgba(13,21,38,0.9)', breadcrumbBorder: 'rgba(255,255,255,0.05)' }
    : { bg: '#F0F4F8', breadcrumb: 'rgba(248,250,252,0.95)', breadcrumbBorder: 'rgba(0,0,0,0.06)' };

  return (
    <div className="flex h-screen overflow-hidden font-sans transition-colors duration-300" style={{ backgroundColor: main.bg }}>
      {/* Ambient glows — only in dark */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#2A7FFF]/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-[#8B5CF6]/6 rounded-full blur-[100px]" />
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`relative z-20 flex flex-col h-full transition-all duration-500 shrink-0 shadow-xl ${collapsed ? 'w-[76px]' : 'w-[260px]'}`}
        style={{ background: sidebar.bg, borderRight: `1px solid ${sidebar.border}` }}>

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #2A7FFF80, transparent)' }} />

        {/* Brand */}
        <div className="flex items-center h-[70px] px-4 gap-3 border-b relative" style={{ borderColor: sidebar.border }}>
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center shadow-lg"
              style={{ boxShadow: '0 0 18px rgba(42,127,255,0.35)' }}>
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#2ECC71] rounded-full border-2 animate-pulse"
              style={{ borderColor: isDarkMode ? '#0D1526' : '#fff' }} />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[1rem] font-black leading-none" style={{ color: sidebar.text }}>MediSync</p>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] mt-0.5 text-[#2ECC71]">Admin Console</p>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:shadow-md z-10"
            style={{ backgroundColor: isDarkMode ? '#151E32' : '#fff', border: `1px solid ${sidebar.border}`, color: '#94a3b8' }}>
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        {/* Admin profile */}
        {!collapsed && (
          <div className="mx-3 mt-4 p-3.5 rounded-2xl relative overflow-hidden group/admin"
            style={{ background: sidebar.profileBg, border: `1px solid ${sidebar.profileBorder}` }}>
            
            {/* Decorative Core Image */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 opacity-20 group-hover/admin:opacity-40 transition-opacity pointer-events-none grayscale group-hover/admin:grayscale-0 group-hover/admin:scale-110 transition-all duration-500">
               <img src={adminCoreImg} alt="Core" className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center text-white text-[0.85rem] font-black shadow-md">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-black truncate leading-tight" style={{ color: sidebar.text }}>{user?.name || 'Admin'}</p>
                <p className="text-[0.6rem] truncate" style={{ color: sidebar.sub }}>{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <Zap size={10} className="text-[#F59E0B]" />
              <span className="text-[0.55rem] font-black text-[#F59E0B] uppercase tracking-widest">Full System Authority</span>
            </div>
          </div>
        )}

        {/* Clock */}
        {!collapsed && (
          <div className="mx-3 mt-2 px-3.5 py-2 rounded-xl" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', border: `1px solid ${sidebar.border}` }}>
            <p className="text-[0.55rem] font-black uppercase tracking-widest" style={{ color: sidebar.sub }}>System Time</p>
            <p className="text-[0.85rem] font-black font-mono mt-0.5" style={{ color: sidebar.text }}>{time.toLocaleTimeString()}</p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1 scrollbar-hide">
          {!collapsed && <p className="text-[0.5rem] font-black uppercase tracking-[0.3em] px-2 mb-2" style={{ color: isDarkMode ? '#334155' : '#cbd5e1' }}>Navigation</p>}
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3 w-full rounded-2xl transition-all duration-300 relative overflow-hidden ${collapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
                style={active
                  ? { background: isDarkMode ? `${tab.color}18` : `${tab.color}12`, border: `1px solid ${tab.color}35`, boxShadow: isDarkMode ? `0 0 18px ${tab.color}15` : `0 4px 14px ${tab.color}18` }
                  : { border: '1px solid transparent', background: 'transparent' }}>
                {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full" style={{ backgroundColor: tab.color }} />}

                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                  style={active
                    ? { backgroundColor: `${tab.color}20`, boxShadow: `0 0 12px ${tab.color}25` }
                    : { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                  <Icon size={16} style={{ color: active ? tab.color : sidebar.sub }} />
                </div>

                {!collapsed && (
                  <>
                    <span className="text-[0.82rem] font-black flex-1 text-left transition-colors" style={{ color: active ? sidebar.text : sidebar.sub }}>
                      {tab.label}
                    </span>
                    {tab.id === 'alerts' && alertCount > 0 && (
                      <span className="text-[0.55rem] font-black px-2 py-0.5 rounded-full text-white bg-[#F97316]"
                        style={{ boxShadow: '0 0 8px #F9731660' }}>{alertCount}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t" style={{ borderColor: sidebar.border }}>
          <button onClick={() => { logout?.(); navigate('/login'); }}
            className={`flex items-center gap-3 w-full rounded-2xl p-3 transition-all group hover:bg-rose-500/10 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors shrink-0">
              <LogOut size={15} className="text-rose-500" />
            </div>
            {!collapsed && <span className="text-[0.82rem] font-black text-rose-500">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <TopBar />

        {/* Breadcrumb */}
        <div className="px-8 py-3 flex items-center gap-3 border-b transition-colors"
          style={{ backgroundColor: main.breadcrumb, borderColor: main.breadcrumbBorder, backdropFilter: 'blur(10px)' }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activeTabData?.color}18` }}>
            {activeTabData && <activeTabData.icon size={13} style={{ color: activeTabData.color }} />}
          </div>
          <span className="text-[0.65rem] font-black uppercase tracking-widest" style={{ color: sidebar.sub }}>Admin</span>
          <span style={{ color: sidebar.sub }}>›</span>
          <span className="text-[0.65rem] font-black uppercase tracking-widest" style={{ color: activeTabData?.color }}>{activeTabData?.label}</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse" />
            <span className="text-[0.6rem] font-black text-[#2ECC71] uppercase tracking-widest">System Online</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide pb-24 md:pb-6">
          {renderTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
