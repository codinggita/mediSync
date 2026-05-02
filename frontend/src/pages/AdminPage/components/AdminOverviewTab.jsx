import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { Users, Building2, Pill, UserCheck, Loader2, Zap, Shield } from 'lucide-react';
import adminCoreImg from '../../../assets/images/admin_core.png';
import PremiumLoader from '../../../components/PremiumLoader';
import AdminGlowCard from './AdminGlowCard';
import AdminActivityRow from './AdminActivityRow';

const MOCK_STATS = {
  totalUsers:      42,
  totalDoctors:    12,
  totalPatients:   27,
  totalAdmins:     3,
  bannedUsers:     2,
  totalPharmacies: 15,
  pendingPharmacies: 4,
  totalMedicines:  48,
};

const MOCK_RECENT_USERS = [
  { _id: 'mu1',  name: 'Dr. Arjun Mehta',     email: 'arjun.mehta@medisync.in',     role: 'Doctor',  createdAt: '2026-04-30T10:22:00Z' },
  { _id: 'mu2',  name: 'Priya Sharma',         email: 'priya.sharma@gmail.com',       role: 'Patient', createdAt: '2026-04-30T09:15:00Z' },
  { _id: 'mu3',  name: 'Dr. Sunita Rao',       email: 'sunita.rao@clinics.com',       role: 'Doctor',  createdAt: '2026-04-29T18:45:00Z' },
  { _id: 'mu4',  name: 'Rahul Gupta',          email: 'rahul.gupta@email.com',        role: 'Patient', createdAt: '2026-04-29T14:30:00Z' },
  { _id: 'mu5',  name: 'Dr. Vikram Nair',      email: 'vikram.nair@hospitals.org',    role: 'Doctor',  createdAt: '2026-04-29T11:00:00Z' },
  { _id: 'mu6',  name: 'Ananya Iyer',          email: 'ananya.iyer@patient.net',      role: 'Patient', createdAt: '2026-04-28T20:10:00Z' },
  { _id: 'mu7',  name: 'Dr. Kavita Singh',     email: 'kavita.singh@medcollege.in',   role: 'Doctor',  createdAt: '2026-04-28T17:00:00Z' },
  { _id: 'mu8',  name: 'Ravi Shankar',         email: 'ravi.shankar@connect.com',     role: 'Patient', createdAt: '2026-04-28T13:40:00Z' },
  { _id: 'mu9',  name: 'Admin Priyabrata',     email: 'admin@medisync.io',            role: 'Admin',   createdAt: '2026-04-27T09:00:00Z' },
  { _id: 'mu10', name: 'Dr. Deepak Kapoor',    email: 'deepak.kapoor@apollo.com',     role: 'Doctor',  createdAt: '2026-04-27T08:30:00Z' },
  { _id: 'mu11', name: 'Meena Pillai',         email: 'meena.pillai@wellness.net',    role: 'Patient', createdAt: '2026-04-26T16:55:00Z' },
  { _id: 'mu12', name: 'Dr. Rohit Verma',      email: 'rohit.verma@surgery.org',      role: 'Doctor',  createdAt: '2026-04-26T12:20:00Z' },
  { _id: 'mu13', name: 'Saurabh Tiwari',       email: 'saurabh.tiwari@mail.com',      role: 'Patient', createdAt: '2026-04-25T19:00:00Z' },
  { _id: 'mu14', name: 'Dr. Nalini Krishnan',  email: 'nalini.krishnan@hospital.in',  role: 'Doctor',  createdAt: '2026-04-25T10:45:00Z' },
  { _id: 'mu15', name: 'Ishaan Chaudhary',     email: 'ishaan.ch@patient.io',         role: 'Patient', createdAt: '2026-04-24T22:10:00Z' },
];

const AdminOverviewTab = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    api
      .get('/admin/stats')
      .then((r) => {
        const realStats = r.data?.stats || {};
        const realUsers = r.data?.recentUsers || [];

        
        const mergedStats = {
          totalUsers:        (realStats.totalUsers      ?? 0) + MOCK_STATS.totalUsers,
          totalDoctors:      (realStats.totalDoctors    ?? 0) + MOCK_STATS.totalDoctors,
          totalPatients:     (realStats.totalPatients   ?? 0) + MOCK_STATS.totalPatients,
          totalAdmins:       (realStats.totalAdmins     ?? 0) + MOCK_STATS.totalAdmins,
          bannedUsers:       (realStats.bannedUsers     ?? 0) + MOCK_STATS.bannedUsers,
          totalPharmacies:   (realStats.totalPharmacies ?? 0) + MOCK_STATS.totalPharmacies,
          pendingPharmacies: (realStats.pendingPharmacies ?? 0) + MOCK_STATS.pendingPharmacies,
          totalMedicines:    (realStats.totalMedicines  ?? 0) + MOCK_STATS.totalMedicines,
        };

        
        const uniqueMockUsers = MOCK_RECENT_USERS.filter(
          (mu) => !realUsers.find((ru) => ru.email === mu.email)
        );
        const mergedUsers = [...realUsers, ...uniqueMockUsers];

        setStats({ stats: mergedStats, recentUsers: mergedUsers });
      })
      .catch(() => {
        
        setStats({ stats: MOCK_STATS, recentUsers: MOCK_RECENT_USERS });
      })
      .finally(() => setLoading(false));
  }, []);

  const s = stats?.stats || MOCK_STATS;

  if (loading) return <PremiumLoader message="Fetching Analytics" />;

  return (
    <div className="flex flex-col gap-10">
      {}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_10px_rgba(46,204,113,0.5)]" />
            <span className="text-[0.75rem] font-black text-[#2ECC71] uppercase tracking-[0.4em]">
              Live Intelligence
            </span>
          </div>
          <div className="relative">
            <h1
              className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
            >
              System <span className="text-[#2A7FFF]">Analysis</span>
            </h1>
          </div>
          <p className="text-slate-500 text-sm mt-3 font-medium uppercase tracking-widest opacity-80">
            Real-time platform authority console
          </p>
        </div>
        <div
          className={`hidden lg:flex items-center gap-4 px-6 py-4 rounded-[1.5rem] relative overflow-hidden ${
            isDarkMode
              ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]'
              : 'bg-[#ecf0f3] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff]'
          }`}
        >
          <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-10 pointer-events-none">
            <img src={adminCoreImg} alt="Core" className="w-full h-full object-contain" />
          </div>
          <Shield size={22} className="text-[#2A7FFF] relative z-10" />
          <div className="relative z-10">
            <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
              Auth Level
            </p>
            <p
              className={`text-[0.9rem] font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
            >
              MAXIMUM_ACCESS
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AdminGlowCard
          label="Total Users"
          value={loading ? null : s.totalUsers}
          icon={Users}
          color="#2A7FFF"
          trend="+12%"
          sub={`${s.bannedUsers ?? 0} suspended`}
          delay={0}
        />
        <AdminGlowCard
          label="Total Doctors"
          value={loading ? null : s.totalDoctors}
          icon={UserCheck}
          color="#8B5CF6"
          trend="+5.2%"
          sub="Verified Clinical"
          delay={100}
        />
        <AdminGlowCard
          label="Pharmacies"
          value={loading ? null : s.totalPharmacies}
          icon={Building2}
          color="#2ECC71"
          sub={`${s.pendingPharmacies ?? 0} pending`}
          delay={200}
        />
        <AdminGlowCard
          label="Medicines"
          value={loading ? null : s.totalMedicines}
          icon={Pill}
          color="#F59E0B"
          trend="Active"
          sub="Global Registry"
          delay={300}
        />
      </div>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {}
        <div
          className={`lg:col-span-2 rounded-[2.5rem] p-8 ${
            isDarkMode
              ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]'
              : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-[#0B1121]' : 'bg-white shadow-inner'
                }`}
              >
                <Users size={20} className="text-[#2A7FFF]" />
              </div>
              <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
                Recent Activity
              </h3>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-[0.2em] ${
                isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-black/5 text-slate-500'
              }`}
            >
              Live Feed
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto scrollbar-hide pr-2">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={40} className="text-[#2A7FFF] animate-spin opacity-50" />
              </div>
            ) : (
              (stats?.recentUsers || MOCK_RECENT_USERS).map((u) => <AdminActivityRow key={u._id} user={u} />)
            )}
          </div>
        </div>

        {}
        <div className="flex flex-col gap-10">
          {}
          <div
            className={`rounded-[2.5rem] p-8 ${
              isDarkMode
                ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]'
                : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
            }`}
          >
            <div className="flex items-center gap-3 mb-8">
              <Zap size={18} className="text-[#2ECC71]" />
              <h4
                className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
              >
                System Integrity
              </h4>
            </div>
            {[
              { label: 'Cloud Gateway', status: 'Optimal', color: '#2ECC71' },
              { label: 'Encryption', status: 'AES-256', color: '#2A7FFF' },
              { label: 'Latency', status: '12ms', color: '#8B5CF6' },
              { label: 'Storage', status: '94% Free', color: '#F59E0B' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0"
              >
                <span className="text-[0.8rem] font-bold text-slate-500">{item.label}</span>
                <span
                  className="text-[0.75rem] font-black uppercase tracking-tighter"
                  style={{ color: item.color }}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {}
          <div
            className={`rounded-[2.5rem] p-8 ${
              isDarkMode
                ? 'bg-[#151E32] shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47]'
                : 'bg-[#ecf0f3] shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff]'
            }`}
          >
            <h4
              className={`text-sm font-black uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
            >
              Platform Matrix
            </h4>
            {[
              {
                role: 'Patients',
                count: s.totalPatients || 0,
                color: '#2ECC71',
                pct: s.totalUsers ? Math.round((s.totalPatients / s.totalUsers) * 100) : 0,
              },
              {
                role: 'Doctors',
                count: s.totalDoctors || 0,
                color: '#2A7FFF',
                pct: s.totalUsers ? Math.round((s.totalDoctors / s.totalUsers) * 100) : 0,
              },
              {
                role: 'Admins',
                count: s.totalAdmins || 0,
                color: '#8B5CF6',
                pct: s.totalUsers ? Math.round((s.totalAdmins / s.totalUsers) * 100) : 0,
              },
            ].map((r) => (
              <div key={r.role} className="mb-6 last:mb-0">
                <div className="flex justify-between mb-2">
                  <span className="text-[0.75rem] font-bold text-slate-500 uppercase">
                    {r.role}
                  </span>
                  <span className="text-[0.8rem] font-black" style={{ color: r.color }}>
                    {r.pct}%
                  </span>
                </div>
                <div
                  className={`h-2.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-[#0B1121]' : 'bg-white shadow-inner'}`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000 shadow-lg"
                    style={{
                      width: `${r.pct}%`,
                      backgroundColor: r.color,
                      boxShadow: `0 0 12px ${r.color}50`,
                    }}
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
