import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { 
  Calendar as CalendarIcon, Clock, Video, Navigation,
  MapPin, Search, 
  User, Loader2, Plus, 
  CalendarDays,
  Activity, MessageCircle, Phone
} from 'lucide-react';
import api from '../../utils/api';
import medicineBoxImg from '../../assets/images/medicine_box.png';
import inhalerImg from '../../assets/images/inhaler.png';
import DoctorAppointmentsPage from './components/DoctorAppointmentsPage';
import AppointmentsCalendar from './components/AppointmentsCalendar';
import BookingModal from './components/BookingModal';
import { useAuth } from '../../context/AuthContext';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ doctorId: '', date: '', time: '', type: 'Video Consult' });
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === 'Doctor') return;
      try {
        const [appRes, docRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/users/doctors')
        ]);
        setAppointments(appRes.data);
        setDoctors(docRes.data);
        if (docRes.data.length > 0) {
          setNewAppointment(prev => ({ ...prev, doctorId: docRes.data[0]._id }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isPrev: true });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    const totalCells = 42;
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false, isNext: true });
    }
    return days;
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const calendarDays = generateCalendarDays();

  const handleBookSession = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/appointments', {
        doctorId: newAppointment.doctorId,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type
      });
      setAppointments([data, ...appointments]);
      setShowBookingModal(false);
      setNewAppointment(prev => ({ ...prev, date: '', time: '' }));
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      
      {/* Floating 3D Artifacts */}
      <div className="absolute top-[15%] right-[5%] animate-float opacity-30 pointer-events-none">
        <img src={medicineBoxImg} alt="" className="w-56 object-contain drop-shadow-2xl" />
      </div>
      <div className="absolute bottom-[10%] left-[20%] animate-float-slow opacity-10 pointer-events-none">
        <img src={inhalerImg} alt="" className="w-44 object-contain drop-shadow-2xl -rotate-12 grayscale" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        
        {user?.role === 'Doctor' ? (
          <DoctorAppointmentsPage />
        ) : (
        <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
          
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d]">
                <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center">
                  <CalendarDays size={28} className="text-[#2A7FFF]" />
                </div>
              </div>
              <div>
                <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                  Clinical <span className="text-[#2A7FFF]">Schedule</span>
                </h1>
                <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
                  <Activity size={14} className="text-[#2A7FFF]" />
                  Synchronized Medical Appointments
                </p>
              </div>
            </div>

            <button onClick={() => setShowBookingModal(true)} className="hidden lg:flex items-center gap-4 px-10 py-5 bg-[#2A7FFF] text-white rounded-[1.8rem] font-black text-[1rem] shadow-[0_20px_40px_rgba(42,127,255,0.3)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.4)] hover:-translate-y-1 transition-all active:scale-95 group">
               <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
               Book New Session
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <AppointmentsCalendar 
              monthName={monthName}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              calendarDays={calendarDays}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            {/* ── RIGHT: Appointment Dossiers ────────────────────────────────────── */}
            <div className="xl:col-span-8 flex flex-col gap-6">
              <div className="relative mb-4">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                 <input 
                   type="text" 
                   placeholder="Identify Doctor or Clinical Specialty..." 
                   className="w-full pl-16 pr-8 py-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] border border-white/40 shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-none text-[1rem] text-slate-700 dark:text-slate-200 outline-none focus:border-[#2A7FFF]/50 transition-all font-bold placeholder:text-slate-400" 
                 />
              </div>

              <div className="flex flex-col gap-6 pb-20">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                    <Loader2 className="animate-spin text-[#2A7FFF]" size={40} />
                    <p className="text-slate-400 font-black uppercase tracking-widest">Synchronizing Schedule...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  appointments.map((app, idx) => (
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
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                    <CalendarDays className="text-slate-200" size={64} />
                    <p className="text-slate-400 font-black uppercase tracking-widest">No Active Sessions Detected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        )}
      </div>

      <BookingModal 
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSubmit={handleBookSession}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        doctors={doctors}
      />
    </div>
  );
};

export default AppointmentsPage;
