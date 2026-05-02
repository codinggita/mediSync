import React, { useState } from 'react';
import { X, User, Stethoscope, Shield, Mail, Lock, Phone, CreditCard } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const AddUserModal = ({ show, onClose, onUserAdded, isDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Patient',
    phone: '',
    specialty: '', 
    hospital: '',  
    medicalLicenseId: '',
  });

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', formData);
      toast.success(`${formData.role} Registry Initialized Successfully`);
      onUserAdded(data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registry Handshake Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
      <div className={`w-full max-w-lg p-10 rounded-[3.5rem] ${isDarkMode ? 'bg-[#151E32] shadow-[25px_25px_50px_#0a0f1d]' : 'bg-[#ecf0f3] shadow-[25px_25px_50px_#cbced1]'} border border-white/20 animate-in fade-in zoom-in duration-300 relative`}>
        <button
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-400 hover:text-rose-500 transition-colors"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <h2 className={`text-[2rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
          Initialize <span className="text-[#8B5CF6]">Citizen</span>
        </h2>
        <p className="text-slate-400 text-[0.7rem] font-black uppercase tracking-[0.2em] mb-10">
          Injecting New Identity Into Platform Matrix
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-4">
            {['Patient', 'Doctor', 'Admin'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setFormData({ ...formData, role })}
                className={`flex-1 py-3 rounded-2xl text-[0.7rem] font-black uppercase tracking-widest transition-all ${
                  formData.role === role
                    ? 'bg-[#8B5CF6] text-white shadow-[0_8px_16px_rgba(139,92,246,0.3)]'
                    : 'bg-[#ecf0f3] dark:bg-[#0B1121] text-slate-400 shadow-inner'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="relative">
            <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="relative">
            <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
            <input
              type="email"
              placeholder="Email Address"
              required
              className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
            <input
              type="password"
              placeholder="Secure Access Key"
              required
              className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {formData.role === 'Doctor' && (
            <>
              <div className="relative animate-in slide-in-from-left-2 duration-300">
                <Stethoscope size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
                <input
                  type="text"
                  placeholder="Medical Specialty"
                  required
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                />
              </div>
              <div className="relative animate-in slide-in-from-left-2 duration-300">
                <Shield size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
                <input
                  type="text"
                  placeholder="Primary Hospital"
                  required
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                />
              </div>
              <div className="relative animate-in slide-in-from-left-2 duration-300">
                <CreditCard size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#8B5CF6]" />
                <input
                  type="text"
                  placeholder="Medical License ID"
                  required
                  className={`w-full pl-14 pr-6 py-4 rounded-2xl text-[0.85rem] font-black outline-none transition-all ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-[#ecf0f3] text-slate-700 shadow-inner placeholder:text-slate-400'}`}
                  value={formData.medicalLicenseId}
                  onChange={(e) => setFormData({ ...formData, medicalLicenseId: e.target.value })}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-5 rounded-3xl bg-[#8B5CF6] text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Initializing...' : 'Confirm Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
