import React, { useState, useEffect } from 'react';
import TopBar from '../DashboardPage/components/TopBar';
import AdminSidebar from './components/AdminSidebar';
import AdminBreadcrumb from './components/AdminBreadcrumb';
import AdminGlows from './components/AdminGlows';
import AdminTabContent from './components/AdminTabContent';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import {
  LayoutDashboard, Building2, Pill, DollarSign, Users,
  BarChart3, Bell
} from 'lucide-react';

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

  const activeTabData = TABS.find(t => t.id === activeTab);

  // Mode-aware style tokens
  const sidebar = isDarkMode
    ? { bg: 'linear-gradient(180deg,#0D1526 0%,#0B1121 100%)', border: 'rgba(255,255,255,0.06)', text: '#fff', sub: '#475569', profileBg: 'rgba(42,127,255,0.12)', profileBorder: 'rgba(42,127,255,0.2)' }
    : { bg: 'linear-gradient(180deg,#ffffff 0%,#f8fafc 100%)', border: 'rgba(0,0,0,0.07)', text: '#1e293b', sub: '#94a3b8', profileBg: 'rgba(42,127,255,0.06)', profileBorder: 'rgba(42,127,255,0.15)' };

  const main = isDarkMode
    ? { bg: '#0B1121', breadcrumb: 'rgba(13,21,38,0.9)', breadcrumbBorder: 'rgba(255,255,255,0.05)' }
    : { bg: '#ecf0f3', breadcrumb: 'rgba(248,250,252,0.95)', breadcrumbBorder: 'rgba(0,0,0,0.06)' };

  return (
    <div className="flex h-screen overflow-hidden font-sans transition-colors duration-300" style={{ backgroundColor: main.bg }}>
      <SEO title={`${activeTabData?.label} | Admin Control`} />
      <AdminGlows isDarkMode={isDarkMode} />

      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        isDarkMode={isDarkMode}
        sidebar={sidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={alertCount}
        TABS={TABS}
        onLogout={() => { logout?.(); navigate('/login'); }}
      />

      {/* ── MAIN ── */}
      <div className="flex flex-col flex-1 overflow-hidden relative z-10">
        <TopBar />

        <AdminBreadcrumb activeTabData={activeTabData} sidebar={sidebar} main={main} />

        <main className="flex-1 overflow-y-auto px-8 py-6 scrollbar-hide pb-24 md:pb-6">
          <AdminTabContent activeTab={activeTab} setAlertCount={setAlertCount} />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
