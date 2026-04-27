import React from 'react';
import { X, Users, Mail, Lock, Stethoscope, Building, Award, Phone as PhoneIcon, MessageCircle, MapPin, Loader2 } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const SpecialistOnboardingModal = ({ 
  show, onClose, onSubmit, editingUser, formData, setFormData, formLoading 
}) => {
  const { isDarkMode } = useTheme();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-2xl rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#151E32]' : 'bg-[#ecf0f3]'}`}>
        <div className="px-10 py-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
              {editingUser ? 'Edit Clinical Dossier' : 'Onboard New Specialist'}
            </h2>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#2A7FFF] mt-1">Credential Verification Protocol Active</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-10 flex-1 overflow-y-auto scrollbar-hide max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1"><Users size={12} /> Full Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. Jane Smith" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1"><Mail size={12} /> Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="clinical.id@medisync.app" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            {!editingUser && (
              <div className="space-y-2">
                <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1"><Lock size={12} /> Temporary Password</label>
                <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2A7FFF] flex items-center gap-2 px-1"><Stethoscope size={12} /> Specialist Sector</label>
              <input required value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} placeholder="e.g. Neurologist" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2A7FFF] flex items-center gap-2 px-1"><Building size={12} /> Primary Hospital</label>
              <input required value={formData.hospital} onChange={e => setFormData({...formData, hospital: e.target.value})} placeholder="e.g. Apollo Hospital" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2A7FFF] flex items-center gap-2 px-1"><Award size={12} /> Medical License ID</label>
              <input required value={formData.medicalLicenseId} onChange={e => setFormData({...formData, medicalLicenseId: e.target.value})} placeholder="DL-MED-2026-XXXXX" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2ECC71] flex items-center gap-2 px-1"><PhoneIcon size={12} /> Emergency Phone</label>
              <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-[#2ECC71] flex items-center gap-2 px-1"><MessageCircle size={12} /> WhatsApp Bridge</label>
              <input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="+91 XXXXX XXXXX" className={`w-full px-6 py-4 rounded-2xl border-none outline-none font-bold text-sm ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1"><MapPin size={12} /> Facility Address</label>
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Full facility address..." className={`w-full px-6 py-4 rounded-[2rem] border-none outline-none font-bold text-sm min-h-[100px] resize-none ${isDarkMode ? 'bg-[#0B1121] text-white' : 'bg-white shadow-inner text-slate-600'}`} />
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button type="button" onClick={onClose} className={`flex-1 py-5 rounded-[1.8rem] font-black text-sm uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-white shadow-md text-slate-500 hover:shadow-xl'}`}>Cancel</button>
            <button disabled={formLoading} className="flex-[2] py-5 rounded-[1.8rem] bg-[#2A7FFF] text-white font-black text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.4)] transition-all flex items-center justify-center gap-3">
              {formLoading ? <Loader2 size={20} className="animate-spin" /> : (editingUser ? 'Update Dossier' : 'Execute Onboarding')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialistOnboardingModal;
