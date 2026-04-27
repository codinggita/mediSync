import React from 'react';
import { Camera, CheckCircle2, User, Zap } from 'lucide-react';

const ProfileSettingsPanel = ({ userData, isDoctor, fileInputRef, onImageUpload, onUpdateDetail }) => {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-right-10 duration-700">
      {/* Profile Identity Hub */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-12 pb-12 border-b border-slate-100 dark:border-white/5">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[3.5rem] bg-gradient-to-br from-[#2A7FFF] via-[#2A7FFF] to-[#2ECC71] p-1 shadow-2xl transition-all duration-500 group-hover:rotate-6">
            <div className="w-full h-full rounded-[3.2rem] bg-slate-100 dark:bg-[#0B1121] flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#151E32]">
              {userData.profileImg ? (
                <img src={userData.profileImg} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[3rem] font-black text-slate-300 dark:text-slate-700">
                  {userData.firstName?.[0]}{userData.lastName?.[0]}
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-2 right-2 w-12 h-12 rounded-[1.2rem] bg-white dark:bg-[#2A7FFF] border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2A7FFF] dark:text-white shadow-xl hover:scale-110 transition-all hover:rotate-12 active:scale-90"
          >
            <Camera size={20} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onImageUpload} 
            className="hidden" 
            accept="image/*" 
          />
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
            <h2 className="text-[2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {userData.firstName} {userData.lastName}
            </h2>
            <CheckCircle2 size={24} className="text-[#2ECC71]" />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-3 justify-center md:justify-start">
            <span className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest bg-[#2A7FFF]/10 px-5 py-2 rounded-xl border border-[#2A7FFF]/20">
              {isDoctor ? 'Medical Professional' : 'Clinical Tier-1'}
            </span>
            <span className="text-[0.8rem] text-slate-400 font-bold tracking-tighter bg-slate-50 dark:bg-[#0B1121] px-5 py-2 rounded-xl border border-slate-100 dark:border-white/5">
              {userData.nodeId}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {[
          { label: 'First Name', name: 'firstName', val: userData.firstName },
          { label: 'Last Name', name: 'lastName', val: userData.lastName },
          { label: 'Secure Email', name: 'email', val: userData.email, type: 'email' },
          { label: 'Mobile Link', name: 'phone', val: userData.phone },
          { label: isDoctor ? 'Medical License / ID' : 'Biometric Class', name: 'bloodType', val: userData.bloodType },
          ...(isDoctor ? [{ label: 'Specialization', name: 'specialization', val: userData.specialization }] : [])
        ].map((field, i) => (
          <div key={i} className="flex flex-col gap-4 group">
            <label className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
              <User size={12} className="text-[#2A7FFF]" />
              {field.label}
            </label>
            <div className="relative transition-all">
              <input 
                type={field.type || 'text'} 
                name={field.name}
                value={field.val} 
                onChange={onUpdateDetail}
                className="w-full py-5 px-8 bg-slate-50 dark:bg-[#0B1121] border border-slate-100 dark:border-white/5 rounded-[1.8rem] text-[1rem] font-black text-slate-900 dark:text-white outline-none focus:border-[#2A7FFF] focus:bg-white dark:focus:bg-black transition-all shadow-inner placeholder:text-slate-300" 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Zap size={16} className="text-[#2A7FFF]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSettingsPanel;
