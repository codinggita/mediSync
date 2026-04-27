import React from 'react';
import { Video, MapPin, User, Calendar as CalendarIcon, Clock, Navigation, MessageCircle, Phone } from 'lucide-react';

const AppointmentCard = ({ app, user }) => {
  return (
    <div key={app._id} className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-10 flex flex-col lg:flex-row items-center gap-10 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
       
       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
          {app.type === 'Video Consult' ? <Video size={100} /> : <MapPin size={100} />}
       </div>

       <div className={`absolute top-10 right-10 px-5 py-2 rounded-full text-[0.65rem] font-black uppercase tracking-widest border ${app.status === 'Completed' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
          {app.status}
       </div>

       <div className="flex items-center gap-8 flex-1">
          <div className="w-24 h-24 rounded-[2.5rem] bg-white dark:bg-[#1a2235] flex items-center justify-center border-4 border-white dark:border-[#151E32] shadow-2xl group-hover:scale-105 transition-transform">
             <User className={app.status === 'Completed' ? 'text-slate-300' : 'text-[#2A7FFF]'} size={40} />
          </div>
          <div>
             <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white leading-tight mb-2">{app.doctorName}</h3>
             <p className="text-[0.95rem] font-black text-[#2A7FFF] uppercase tracking-[0.2em]">{app.specialty}</p>
             
             <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 font-bold text-[0.9rem]">
                   <CalendarIcon size={18} className="text-slate-400" />
                   {app.date}
                </div>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 font-bold text-[0.9rem]">
                   <Clock size={18} className="text-slate-400" />
                   {app.time}
                </div>
             </div>
          </div>
       </div>

       <div className="w-full lg:w-auto flex flex-col gap-4 shrink-0">
          {app.type === 'Video Consult' && app.status !== 'Completed' && (
             <button 
               onClick={() => {
                 const docPhone = app.doctor?.whatsapp || app.doctor?.phone || '';
                 if (docPhone) {
                   const cleanPhone = docPhone.replace(/\D/g, '');
                   const message = encodeURIComponent(`Hello Dr. ${app.doctorName},\n\nI am joining our scheduled *Video Consultation* on MediSync. Please initiate the video call when you are ready.\n\nThank you,\n${user.name}`);
                   window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
                 } else {
                   alert('Doctor contact information not available.');
                 }
               }}
               className="px-10 py-5 bg-[#8B5CF6] text-white rounded-[1.8rem] font-black text-[1rem] shadow-[0_15px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_20px_40px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-3 group/btn"
             >
                <Video size={20} className="group-hover/btn:animate-pulse" /> Join Clinical Call
             </button>
          )}
          {app.type === 'In Person' && app.status !== 'Completed' && (
             <button className="px-10 py-5 bg-[#2A7FFF] text-white rounded-[1.8rem] font-black text-[1rem] shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.4)] hover:-translate-y-1 transition-all active:scale-95 group/btn">
                <Navigation size={20} /> Navigate to Clinic
             </button>
          )}
          {app.doctor?.whatsapp && (
            <a
              href={`https://wa.me/${app.doctor.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-4 bg-[#25D366] text-white rounded-[1.8rem] font-black text-[0.9rem] shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={18} /> WhatsApp Doctor
            </a>
          )}
          {app.doctor?.phone && (
            <a
              href={`tel:${app.doctor.phone.replace(/[^0-9+]/g, '')}`}
              className="px-10 py-4 bg-white dark:bg-[#0B1121] text-emerald-600 dark:text-emerald-400 rounded-[1.8rem] font-black text-[0.9rem] border border-emerald-200 dark:border-emerald-900 shadow-[6px_6px_12px_#cbced1] dark:shadow-none hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={18} /> {app.doctor.phone}
            </a>
          )}
          <button className="px-10 py-4 bg-white dark:bg-[#0B1121] text-slate-400 rounded-[1.8rem] font-black text-[0.9rem] border border-white/20 shadow-[6px_6px_12px_#cbced1] dark:shadow-none hover:text-[#2A7FFF] transition-all">
             Reschedule Session
          </button>
       </div>
    </div>
  );
};

export default AppointmentCard;
