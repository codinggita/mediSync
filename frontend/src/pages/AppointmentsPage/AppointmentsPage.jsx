import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import api from '../../utils/api';
import DoctorAppointmentsPage from './components/DoctorAppointmentsPage';
import AppointmentsCalendar from './components/AppointmentsCalendar';
import BookingModal from './components/BookingModal';
import AppointmentsHeader from './components/AppointmentsHeader';
import AppointmentsDecorations from './components/AppointmentsDecorations';
import AppointmentsListContent from './components/AppointmentsListContent';
import AppointmentSearch from './components/AppointmentSearch';
import { generateCalendarDays } from './utils/calendarUtils';
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

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const calendarDays = generateCalendarDays(currentMonth);

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
      <AppointmentsDecorations />

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
              <AppointmentSearch />

              <AppointmentsListContent 
                loading={loading}
                appointments={appointments}
                user={user}
              />
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
