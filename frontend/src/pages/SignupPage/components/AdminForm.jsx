import React, { useState } from 'react';
import { Mail, Lock, Shield, Key, AlertCircle, Loader2 } from 'lucide-react';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    adminId: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (!formData.termsAccepted) {
      return setError('You must accept the system terms.');
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      console.log('Admin Signup Data:', formData);
    } catch (err) {
      setError(err.message || 'Authorization failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      {error && (
        <div className="mb-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-[#D32F2F] animate-slideUp shadow-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Admin ID / Username</label>
        <div className="relative flex items-center group">
          <Shield className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
          <input 
            type="text" name="adminId" value={formData.adminId} onChange={handleChange}
            placeholder="ADM-0000" required
            className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Official System Email</label>
        <div className="relative flex items-center group">
          <Mail className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="admin@medisync.com" required
            className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
          <div className="relative flex items-center group">
            <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Secure password" required
              className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Confirm</label>
          <div className="relative flex items-center group">
            <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
            <input 
              type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
              placeholder="Confirm" required
              className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Security / Invite Code <span className="text-red-500">*</span></label>
        <div className="relative flex items-center group">
          <Key className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
          <input 
            type="text" name="inviteCode" value={formData.inviteCode} onChange={handleChange}
            placeholder="XXXX-XXXX-XXXX" required
            className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-red-200 rounded-xl text-sm bg-red-50/50 focus:bg-white outline-none text-gray-800 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all"
          />
        </div>
        <p className="text-[0.65rem] text-gray-500 font-medium">Required for system access authorization.</p>
      </div>

      <label className="flex items-start gap-2.5 text-sm mt-1 cursor-pointer group">
        <div className="relative flex items-center mt-0.5">
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="peer sr-only" required />
          <div className="w-4 h-4 bg-white border-[1.5px] border-gray-300 rounded-[4px] peer-checked:bg-[#2A7FFF] peer-checked:border-[#2A7FFF] transition-all group-hover:border-[#2A7FFF] flex items-center justify-center shadow-sm">
            <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <span className="text-gray-600 font-medium leading-tight text-[0.8rem]">
          I agree to the strict <a href="#" className="text-[#2A7FFF] hover:underline">System Admin Policy</a>
        </span>
      </label>

      <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-[#2A7FFF] text-white py-3 rounded-xl font-bold text-[0.95rem] mt-2 shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1B5E20] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(46,125,50,0.35)] active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none transition-all duration-200">
        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Authorizing...</> : <><Shield size={18} /> Request Admin Access</>}
      </button>

      {/* Admin Restrictions Note */}
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-2 text-gray-500">
        <AlertCircle size={16} className="mt-0.5 shrink-0" />
        <p className="text-[0.7rem] font-medium leading-relaxed">
          Admin accounts are strictly restricted and require manual authorization from IT. Single Sign-On (Google) is disabled for this role.
        </p>
      </div>
    </form>
  );
};

export default AdminForm;
