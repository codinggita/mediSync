import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ExternalLink, Calendar, Star, ShieldCheck, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

const DoctorConnect = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const fallbackDoctors = [
        {
          id: 'kamlesh',
          name: 'Dr. Kamlesh',
          specialty: 'Cardiologist',
          experience: '15+ Years',
          rating: '4.9',
          online: true,
          phone: '+919979265140',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 'dhavnit',
          name: 'Dr. Dhavnit',
          specialty: 'General Physician',
          experience: '10+ Years',
          rating: '4.8',
          online: true,
          phone: '+918849299052',
          color: 'from-indigo-500 to-purple-600'
        }
      ];

      try {
        const { data } = await api.get('/users/doctors');
        if (Array.isArray(data) && data.length > 0) {
          // If API succeeds, try to find our specific doctors first, or use the first 2
          const kamlesh = data.find(d => d.name.includes('Kamlesh')) || fallbackDoctors[0];
          const dhavnit = data.find(d => d.name.includes('Dhavnit')) || fallbackDoctors[1];
          setDoctors([kamlesh, dhavnit]);
        } else {
          setDoctors(fallbackDoctors);
        }
      } catch (err) {
        console.error('Failed to fetch doctors, using fallback', err);
        setDoctors(fallbackDoctors);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleWhatsApp = (e, doc) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello ${doc.name}, I found your profile on MediSync and would like to consult with you.`);
    window.open(`https://wa.me/${doc.phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleCall = (e, doc) => {
    e.stopPropagation();
    window.location.href = `tel:${doc.phone}`;
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-6 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex flex-col transition-all relative overflow-hidden group">
      {/* Decorative Background Glow */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8B5CF6]/10 rounded-full blur-3xl group-hover:bg-[#8B5CF6]/20 transition-colors" />

      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                <Video size={18} className="text-[#8B5CF6]" />
             </div>
             <h3 className="text-[1.2rem] font-black text-slate-800 dark:text-white tracking-tight">
               Doctor Connect
             </h3>
          </div>
          <p className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-[0.2em] ml-10">Instant Medical Consultation</p>
        </div>
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-sm">
          <ShieldCheck size={14} className="text-[#8B5CF6]" />
          <span className="text-[0.65rem] font-black text-[#8B5CF6] uppercase tracking-widest">Verified</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        {doctors.length > 0 ? doctors.map((doc, i) => (
          <div 
            key={i} 
            onClick={() => navigate(`/doctor/${doc.id || doc._id}`)}
            className="p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] bg-[#F8FAFC] dark:bg-[#1E293B]/40 border border-transparent hover:border-indigo-500/30 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-[0_20px_40px_rgba(139,92,246,0.1)] transition-all duration-500 group/card cursor-pointer relative"
          >
            <div className="flex flex-col xs:flex-row gap-4 sm:gap-5">
              <div className="relative shrink-0 w-fit">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br ${doc.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center overflow-hidden shadow-lg group-hover/card:scale-105 transition-transform duration-500`}>
                   <div className="text-white font-black text-xl sm:text-2xl uppercase tracking-tighter drop-shadow-md">{doc.name.split(' ').map(n => n[0]).join('')}</div>
                   <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                </div>
                {doc.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] border-white dark:border-[#1E293B] bg-[#2ECC71] shadow-[0_0_10px_#2ECC71] animate-pulse" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-[0.95rem] sm:text-[1rem] font-black text-slate-900 dark:text-white transition-colors group-hover/card:text-indigo-600 leading-tight">
                    {doc.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-amber-500 font-black text-[0.7rem] sm:text-[0.8rem] shrink-0">
                    <Star size={12} fill="currentColor" /> {doc.rating || '5.0'}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                  <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-400 font-bold uppercase tracking-widest truncate">
                    {doc.specialty}
                  </p>
                  <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block" />
                  <p className="text-[0.65rem] sm:text-[0.7rem] text-[#2A7FFF] font-black uppercase tracking-[0.15em]">
                    {doc.experience || 'Verified'}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  {doc.online !== false ? (
                    <>
                      <button 
                        onClick={(e) => handleWhatsApp(e, doc)}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#2ECC71]/10 text-[#2ECC71] text-[0.65rem] sm:text-[0.7rem] font-black hover:bg-[#2ECC71] hover:text-white transition-all border border-[#2ECC71]/20"
                      >
                        <MessageSquare size={12} className="sm:size-[14px]" /> WhatsApp
                      </button>
                      <button 
                        onClick={(e) => handleCall(e, doc)}
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-indigo-500/10 text-indigo-600 text-[0.65rem] sm:text-[0.7rem] font-black hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/20"
                      >
                        <Phone size={12} className="sm:size-[14px]" /> Call Now
                      </button>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 text-[0.65rem] sm:text-[0.7rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                       <span>Opens at {doc.timing?.split(' - ')[0] || '9 AM'}</span>
                       <Calendar size={14} className="opacity-40" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div className="w-16 h-16 rounded-full bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] flex items-center justify-center mb-4">
              <Video size={32} className="text-slate-300" />
            </div>
            <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">No specialists online</p>
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate('/appointments')}
        className="w-full mt-8 flex items-center justify-center gap-3 py-5 rounded-[24px] bg-gradient-to-r from-indigo-600 via-[#8B5CF6] to-purple-600 text-[1rem] font-black text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(139,92,246,0.3)] group"
      >
        Explore Specialist Network
        <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default DoctorConnect;

