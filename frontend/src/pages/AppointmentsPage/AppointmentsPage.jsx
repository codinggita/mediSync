import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { 
  Search, Loader2, CalendarDays
} from 'lucide-react';
import api from '../../utils/api';
import medicineBoxImg from '../../assets/images/medicine_box.png';
import inhalerImg from '../../assets/images/inhaler.png';
import DoctorAppointmentsPage from './components/DoctorAppointmentsPage';
import AppointmentsCalendar from './components/AppointmentsCalendar';
import BookingModal from './components/BookingModal';
import AppointmentsHeader from './components/AppointmentsHeader';
import AppointmentCard from './components/AppointmentCard';
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
          
          <AppointmentsHeader onBookClick={() => setShowBookingModal(true)} />

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
                  appointments.map((app) => (
                    <AppointmentCard 
                      key={app._id} 
                      app={app} 
                      user={user} 
                    />
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
