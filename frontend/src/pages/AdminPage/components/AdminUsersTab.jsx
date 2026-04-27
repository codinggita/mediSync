import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, Ban, Trash2, Loader2, Search, ShieldOff, UserCheck, Crown, Stethoscope, RefreshCw, ShieldCheck, Check, Plus, Edit3, X, Mail, Lock, Building, Phone as PhoneIcon, Award, MapPin } from 'lucide-react';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';

import UserRow from './UserRow';
import SpecialistOnboardingModal from './SpecialistOnboardingModal';

const ROLE_CFG = {
  Admin:   { color: '#8B5CF6' },
  Doctor:  { color: '#2A7FFF' },
  Patient: { color: '#2ECC71' },
};

const AdminUsersTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [actionId, setActionId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'Doctor',
    specialty: '', hospital: '', phone: '', whatsapp: '', address: '', medicalLicenseId: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (roleFilter !== 'All') params.set('role', roleFilter);
      if (search) params.set('search', search);
      const { data } = await api.get(`/admin/users?${params.toString()}`);
      setUsers(data.users || []);
    } catch (e) { 
      if (e.response?.status === 401) { logout(); navigate('/login'); }
    } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(fetchUsers, 300); return () => clearTimeout(t); }, [search, roleFilter]);

  const handleBan = async (id) => {
    setActionId(id);
    try {
      const { data } = await api.patch(`/admin/users/${id}/ban`);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isBanned: data.isBanned } : u));
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 2000);
    } catch (e) { alert('Action failed'); }
    finally { setActionId(null); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Terminate user "${name}"?`)) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (e) { alert('Delete failed'); }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, { role });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    } catch (e) { alert('Role update failed'); }
  };

  const handleEdit = (u) => {
    setEditingUser(u);
    setFormData({
      name: u.name || '', email: u.email || '', password: '', role: u.role || 'Doctor',
      specialty: u.specialty || '', hospital: u.hospital || '', phone: u.phone || '',
      whatsapp: u.whatsapp || '', address: u.address || '', medicalLicenseId: u.medicalLicenseId || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser._id}`, formData);
        setUsers(prev => prev.map(u => u._id === editingUser._id ? { ...u, ...formData } : u));
      } else {
        await api.post('/admin/doctors', formData);
        fetchUsers();
      }
      setShowAddModal(false);
    } catch (e) { alert(e.response?.data?.message || 'Action failed'); }
    finally { setFormLoading(false); }
  };

  if (loading) return <PremiumLoader message="Syncing Identities" />;

  return (
    <div className="flex flex-col gap-10 relative overflow-hidden min-h-[600px]">
      <div className="absolute -right-20 top-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none rotate-45">
         <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
              User <span className="text-[#06B6D4]">Authority</span>
            </h1>
            <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Governance console</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`relative flex-1 min-w-[300px] ${isDarkMode ? 'bg-[#151E32] shadow-inner' : 'bg-[#ecf0f3] shadow-inner'} rounded-[1.5rem] px-5 py-3.5 flex items-center gap-3`}>
              <Search size={18} className="text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search identity..." className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-500" />
            </div>
            <button onClick={() => { setEditingUser(null); setShowAddModal(true); }} className="px-8 h-14 rounded-2xl bg-[#2A7FFF] text-white font-black uppercase tracking-widest text-[0.7rem] shadow-lg">
              <Plus size={18} /> Onboard Specialist
            </button>
            <button onClick={fetchUsers} className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#151E32]' : 'bg-[#ecf0f3] shadow-md'}`}><RefreshCw size={20} /></button>
          </div>
        </div>

        <div className={`flex flex-wrap gap-4 p-3 rounded-[2rem] ${isDarkMode ? 'bg-[#0B1121] shadow-inner' : 'bg-[#e0e5ec] shadow-inner'}`}>
          {['All', 'Patient', 'Doctor', 'Admin'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className={`px-8 py-3.5 rounded-[1.5rem] text-[0.8rem] font-black uppercase tracking-widest transition-all ${roleFilter === r ? (isDarkMode ? 'bg-[#151E32] shadow-lg' : 'bg-[#ecf0f3] shadow-md') : 'opacity-50'}`} style={{ color: roleFilter === r ? (ROLE_CFG[r]?.color || '#2A7FFF') : '#64748b' }}>{r}</button>
          ))}
        </div>

        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center justify-between px-8 mb-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={16} className="text-[#06B6D4]" />
              <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em]">{users.length} Identities Found</p>
            </div>
          </div>
          {users.map(u => <UserRow key={u._id} u={u} onBan={handleBan} onDelete={handleDelete} onRole={handleRoleChange} onEdit={handleEdit} actionId={actionId} successId={successId} />)}
        </div>
      </div>

      <SpecialistOnboardingModal 
        show={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleSubmit}
        editingUser={editingUser} formData={formData} setFormData={setFormData} formLoading={formLoading}
      />
    </div>
  );
};

export default AdminUsersTab;
