import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, Clock, MapPin, ShieldCheck, 
  MessageSquare, Phone, Video, Calendar, 
  Award, BookOpen, Heart, Activity, ArrowUpRight
} from 'lucide-react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';

import ProfileSidebar from './components/ProfileSidebar';
import SentimentAnalysis from './components/SentimentAnalysis';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = {
    name: 'Dr. Arpit Khanna',
    specialty: 'Senior Cardiologist',
    experience: '12+ Years',
    rating: 4.9,
    reviews: 1240,
    education: 'MBBS, MD - Cardiology (AIIMS Delhi)',
    about: 'Dr. Arpit Khanna is a world-renowned cardiologist with over 12 years of experience in interventional cardiology and heart failure management. He has successfully performed over 2,000+ cardiac procedures and is dedicated to providing personalized care to his patients.',
    availability: 'Mon - Sat (09:00 AM - 05:00 PM)',
    location: 'MediSync Super Specialty Hospital, Sector 62, Noida',
    consultationFee: '₹1200',
    tags: ['Heart Specialist', 'Interventional Cardiology', 'Hyper Tension'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=600',
    phone: '+919876543210'
  };

  const handleVideoConsultation = () => {
    alert('Initiating High-Definition Secure Video Link...');
    navigate('/appointments');
  };

  const handleBookAppointment = () => navigate('/appointments');
  const handleMapNavigation = () => {
    const query = encodeURIComponent(doctor.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello ${doctor.name}, I would like to consult regarding my heart health.`);
    window.open(`https://wa.me/${doctor.phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleCall = (e) => {
    e.stopPropagation();
    window.location.href = `tel:${doctor.phone}`;
  };

  return (
    <div className="flex h-screen bg-[#F0F4F8] dark:bg-[#0B1121] transition-colors duration-300 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide pb-24 md:pb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-4 mb-12 group w-fit">
            <div className="w-12 h-12 rounded-[20px] bg-white dark:bg-[#151E32] flex items-center justify-center shadow-lg border border-white dark:border-white/5 group-hover:bg-[#2A7FFF] group-hover:text-white transition-all transform active:scale-95"><ArrowLeft size={20} /></div>
            <span className="font-black text-[0.9rem] uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">Back to Intelligence Center</span>
          </button>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <ProfileSidebar 
              doctor={doctor} 
              handleVideoConsultation={handleVideoConsultation} 
              handleBookAppointment={handleBookAppointment} 
              handleWhatsApp={handleWhatsApp} 
              handleCall={handleCall} 
            />

            <div className="xl:col-span-8 space-y-12">
              <div className="bg-white dark:bg-[#151E32] rounded-[4rem] p-12 lg:p-16 border border-white dark:border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A7FFF]/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="flex items-center gap-5 mb-12 relative z-10">
                  <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl"><Award size={32} /></div>
                  <div>
                    <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">Professional Protocol</h2>
                    <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em]">Verified Clinical Credential</p>
                  </div>
                </div>

                <div className="space-y-12 relative z-10">
                  <section>
                    <h3 className="text-[0.75rem] font-black text-[#2A7FFF] uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><Activity size={16} /> Expert Insight</h3>
                    <p className="text-[1.25rem] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{doctor.about}</p>
                  </section>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <section>
                      <h3 className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Academic Foundation</h3>
                      <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#0B1121]/50 border border-slate-100 dark:border-white/5 flex items-start gap-5 shadow-inner">
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center text-[#2A7FFF] shadow-md shrink-0"><BookOpen size={24} /></div>
                        <p className="text-[1.1rem] font-black text-slate-800 dark:text-white leading-tight">{doctor.education}</p>
                      </div>
                    </section>
                    <section>
                      <h3 className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Clinical Focus</h3>
                      <div className="flex flex-wrap gap-4">
                        {doctor.tags.map(tag => (
                          <div key={tag} className="px-6 py-3 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-white/10 rounded-[20px] text-[0.8rem] font-black text-slate-700 dark:text-slate-300 shadow-sm hover:border-[#2A7FFF] transition-all cursor-default">{tag}</div>
                        ))}
                      </div>
                    </section>
                  </div>
                  <section className="p-10 rounded-[3.5rem] bg-[#0B1121] dark:bg-black/40 relative overflow-hidden group/map" onClick={handleMapNavigation}>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                       <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-[#2A7FFF] flex items-center justify-center text-white"><MapPin size={20} /></div><h3 className="text-[1rem] font-black text-white uppercase tracking-widest">Clinic Coordinates</h3></div>
                       <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-[#2A7FFF] transition-all"><ArrowUpRight size={20} /></button>
                    </div>
                    <p className="text-[1.1rem] font-bold text-slate-400 mb-8 relative z-10 max-w-lg">{doctor.location}</p>
                    <div className="h-64 bg-slate-800/50 rounded-[2.5rem] overflow-hidden relative border border-white/5 flex flex-col items-center justify-center cursor-pointer">
                       <div className="w-12 h-12 rounded-full border-4 border-[#2A7FFF] border-t-transparent animate-spin"></div>
                       <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-[0.4em] mt-4">Synchronizing Satellite View...</span>
                    </div>
                   section>
                </div>
              </div>
              <SentimentAnalysis reviews={doctor.reviews} navigate={navigate} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfilePage;

