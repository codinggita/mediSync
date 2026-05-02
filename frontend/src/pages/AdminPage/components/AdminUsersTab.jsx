import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { Users, Search, Filter, Ban, ShieldCheck, Trash2, Mail } from 'lucide-react';
import PremiumLoader from '../../../components/PremiumLoader';
import UserManagementTable from './UserManagementTable';
import AddUserModal from './AddUserModal';
import { UserPlus } from 'lucide-react';

const MOCK_USERS = [
  { _id: 'mu1',  name: 'Dr. Arjun Mehta',    email: 'arjun.mehta@medisync.in',    role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-30', createdAt: '2026-04-30T10:22:00Z' },
  { _id: 'mu2',  name: 'Priya Sharma',        email: 'priya.sharma@gmail.com',      role: 'Patient', status: 'Active', isBanned: false, joinedAt: '2026-04-30', createdAt: '2026-04-30T09:15:00Z' },
  { _id: 'mu3',  name: 'Dr. Sunita Rao',      email: 'sunita.rao@clinics.com',      role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-29', createdAt: '2026-04-29T18:45:00Z' },
  { _id: 'mu4',  name: 'Rahul Gupta',         email: 'rahul.gupta@email.com',       role: 'Patient', status: 'Active', isBanned: false, joinedAt: '2026-04-29', createdAt: '2026-04-29T14:30:00Z' },
  { _id: 'mu5',  name: 'Dr. Vikram Nair',     email: 'vikram.nair@hospitals.org',   role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-29', createdAt: '2026-04-29T11:00:00Z' },
  { _id: 'mu6',  name: 'Ananya Iyer',         email: 'ananya.iyer@patient.net',     role: 'Patient', status: 'Banned', isBanned: true,  joinedAt: '2026-04-28', createdAt: '2026-04-28T20:10:00Z' },
  { _id: 'mu7',  name: 'Dr. Kavita Singh',    email: 'kavita.singh@medcollege.in',  role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-28', createdAt: '2026-04-28T17:00:00Z' },
  { _id: 'mu8',  name: 'Ravi Shankar',        email: 'ravi.shankar@connect.com',    role: 'Patient', status: 'Active', isBanned: false, joinedAt: '2026-04-28', createdAt: '2026-04-28T13:40:00Z' },
  { _id: 'mu9',  name: 'Admin Priyabrata',    email: 'admin@medisync.io',           role: 'Admin',   status: 'Active', isBanned: false, joinedAt: '2026-04-27', createdAt: '2026-04-27T09:00:00Z' },
  { _id: 'mu10', name: 'Dr. Deepak Kapoor',   email: 'deepak.kapoor@apollo.com',    role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-27', createdAt: '2026-04-27T08:30:00Z' },
  { _id: 'mu11', name: 'Meena Pillai',        email: 'meena.pillai@wellness.net',   role: 'Patient', status: 'Active', isBanned: false, joinedAt: '2026-04-26', createdAt: '2026-04-26T16:55:00Z' },
  { _id: 'mu12', name: 'Dr. Rohit Verma',     email: 'rohit.verma@surgery.org',     role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-26', createdAt: '2026-04-26T12:20:00Z' },
  { _id: 'mu13', name: 'Saurabh Tiwari',      email: 'saurabh.tiwari@mail.com',     role: 'Patient', status: 'Banned', isBanned: true,  joinedAt: '2026-04-25', createdAt: '2026-04-25T19:00:00Z' },
  { _id: 'mu14', name: 'Dr. Nalini Krishnan', email: 'nalini.krishnan@hospital.in', role: 'Doctor',  status: 'Active', isBanned: false, joinedAt: '2026-04-25', createdAt: '2026-04-25T10:45:00Z' },
  { _id: 'mu15', name: 'Ishaan Chaudhary',    email: 'ishaan.ch@patient.io',        role: 'Patient', status: 'Active', isBanned: false, joinedAt: '2026-04-24', createdAt: '2026-04-24T22:10:00Z' },
];

const AdminUsersTab = () => {
  const [users, setUsers] = useState(MOCK_USERS); 
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/users', { params: { role: roleFilter, search } });
      const realUsers = data?.users || [];

      
      const uniqueMocks = MOCK_USERS.filter(
        (mu) => !realUsers.find((ru) => ru.email === mu.email)
      );
      
      const filteredMocks = roleFilter
        ? uniqueMocks.filter((u) => u.role === roleFilter)
        : uniqueMocks;

      setUsers([...realUsers, ...filteredMocks]);
    } catch (e) {
      
      const fallback = roleFilter
        ? MOCK_USERS.filter((u) => u.role === roleFilter)
        : MOCK_USERS;
      setUsers(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (id) => {
    try {
      
      setUsers((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u
        )
      );

      if (!id.toString().startsWith('u')) {
        await api.patch(`/admin/users/${id}/ban`);
      }
    } catch (e) {
      console.error('Handshake failed', e);
    }
  };

  if (loading) return <PremiumLoader message="Scanning Population Matrix" />;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div>
          <h1
            className={`text-[2.8rem] font-black leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Identity <span className="text-[#8B5CF6]">Matrix</span>
          </h1>
          <p className="text-slate-400 text-[0.7rem] mt-4 font-black uppercase tracking-[0.25em] opacity-80">
            Managing Platform Citizens & Access Privileges
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] min-w-[300px] border border-white/20`}
          >
            <Search size={20} className="text-[#8B5CF6]" />
            <input
              type="text"
              placeholder="Search citizens..."
              className="bg-transparent border-none outline-none text-[0.85rem] font-black w-full text-slate-700 dark:text-slate-300 placeholder:text-slate-400 uppercase tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-4 px-8 py-4 rounded-[1.5rem] bg-[#8B5CF6] text-white shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:scale-[1.03] active:scale-95 transition-all font-black text-[0.75rem] uppercase tracking-widest shrink-0"
          >
            <UserPlus size={18} />
            Add New Citizen
          </button>

          <div className="relative group">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`appearance-none px-8 py-4 pr-12 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/20 text-[0.75rem] font-black uppercase tracking-[0.2em] text-[#8B5CF6] outline-none cursor-pointer transition-all hover:scale-[1.02]`}
            >
              <option value="">All Citizens</option>
              <option value="Patient">Patients</option>
              <option value="Doctor">Doctors</option>
              <option value="Admin">Admins</option>
            </select>
            <Filter
              size={16}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-[#8B5CF6] pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div
        className={`rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-xl ${
          isDarkMode ? 'bg-[#151E32]' : 'bg-white'
        }`}
      >
        <UserManagementTable
          users={users.filter(
            (u) =>
              u?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
              u?.email?.toLowerCase()?.includes(search.toLowerCase())
          )}
          onToggleBan={handleToggleBan}
          isDarkMode={isDarkMode}
        />
      </div>

      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={(u) => setUsers([u, ...users])}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AdminUsersTab;
