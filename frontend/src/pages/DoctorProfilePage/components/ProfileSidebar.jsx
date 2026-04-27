import React from 'react';
import { Star, Video, Calendar, ShieldCheck, MessageSquare, Phone, Clock } from 'lucide-react';

const ProfileSidebar = ({ doctor, handleVideoConsultation, handleBookAppointment, handleWhatsApp, handleCall }) => (
  <div className="xl:col-span-4 space-y-10">
    <div className="bg-white dark:bg-[#151E32] rounded-[4rem] p-12 shadow-2xl border border-white dark:border-white/5 relative overflow-hidden group/profile">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-[#2A7FFF] via-[#4F46E5] to-[#8B5CF6] opacity-90 transition-transform duration-700"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-48 h-48 rounded-[3.5rem] bg-white dark:bg-[#0B1121] p-2 shadow-2xl mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] rounded-[3.5rem] blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-full h-full rounded-[3rem] overflow-hidden relative z-10 border-4 border-white dark:border-[#151E32]">
            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover transition-transform duration-1000" />
          </div>
        </div>
        <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{doctor.name}</h1>
        <div className="px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 mb-8">
           <p className="text-[#2A7FFF] font-black uppercase tracking-[0.25em] text-[0.7rem]">{doctor.specialty}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 w-full mb-10">
          <div className="bg-[#F8FAFC] dark:bg-[#0B1121]/50 rounded-3xl p-5 text-center border border-white dark:border-white/5 shadow-inner">
            <p className="text-[1.5rem] font-black text-slate-900 dark:text-white leading-none mb-1">{doctor.rating}</p>
            <div className="flex items-center justify-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#0B1121]/50 rounded-3xl p-5 text-center border border-white dark:border-white/5 shadow-inner">
            <p className="text-[1.5rem] font-black text-[#2A7FFF] leading-none mb-1">{doctor.experience.split('+')[0]}</p>
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Years Experience</p>
          </div>
        </div>
        <div className="w-full space-y-5">
          <button onClick={handleVideoConsultation} className="w-full py-5 bg-[#2A7FFF] text-white rounded-[24px] font-black text-[1rem] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"><Video size={20} /> Start High-Def Consultation</button>
          <button onClick={handleBookAppointment} className="w-full py-5 bg-[#2ECC71] text-white rounded-[24px] font-black text-[1rem] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"><Calendar size={20} /> Book On-Site Visit</button>
        </div>
      </div>
    </div>
    <div className="bg-white/80 dark:bg-[#151E32]/80 backdrop-blur-2xl rounded-[3.5rem] p-10 border border-white dark:border-white/5 shadow-xl">
       <div className="flex items-center justify-between mb-8">
          <h3 className="text-[0.8rem] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3"><ShieldCheck size={20} className="text-[#2A7FFF]" /> Clinical Status</h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#2ECC71]"></span>
             <span className="text-[0.65rem] font-black text-emerald-500 uppercase tracking-widest">In-Surgery/Live</span>
          </div>
       </div>
       <div className="grid grid-cols-2 gap-5 mb-8">
          <button onClick={handleWhatsApp} className="py-5 bg-white dark:bg-[#0B1121] rounded-3xl font-black text-[0.8rem] text-slate-700 dark:text-slate-300 flex flex-col items-center gap-3 hover:bg-[#25D366] hover:text-white transition-all shadow-md group/wa"><MessageSquare size={24} className="text-[#25D366] group-hover/wa:text-white transition-colors" /> Quick Chat</button>
          <button onClick={handleCall} className="py-5 bg-white dark:bg-[#0B1121] rounded-3xl font-black text-[0.8rem] text-slate-700 dark:text-slate-300 flex flex-col items-center gap-3 hover:bg-[#2A7FFF] hover:text-white transition-all shadow-md group/call"><Phone size={24} className="text-[#2A7FFF] group-hover/call:text-white transition-colors" /> Tele-Call</button>
       </div>
       <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0B1121]/50 border border-slate-100 dark:border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-2 text-slate-400"><span className="text-[0.65rem] font-black uppercase tracking-widest">Protocol Hours</span><Clock size={16} /></div>
          <p className="text-[1rem] font-black text-slate-800 dark:text-white">{doctor.availability}</p>
       </div>
    </div>
  </div>
);

export default ProfileSidebar;
