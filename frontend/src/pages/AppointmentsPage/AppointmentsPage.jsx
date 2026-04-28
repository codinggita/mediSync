import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import DoctorAppointmentsPage from './components/DoctorAppointmentsPage';
import AppointmentsCalendar from './components/AppointmentsCalendar';
import BookingModal from './components/BookingModal';
import AppointmentsHeader from './components/AppointmentsHeader';
import AppointmentsDecorations from './components/AppointmentsDecorations';
import AppointmentsListContent from './components/AppointmentsListContent';
import AppointmentSearch from './components/AppointmentSearch';
import { useAuth } from '../../context/AuthContext';
import useAppointments from './hooks/useAppointments';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const {
    appointments, doctors, loading, selectedDate, setSelectedDate,
    showBookingModal, setShowBookingModal, newAppointment, setNewAppointment,
    monthName, calendarDays, nextMonth, prevMonth, handleBookSession
  } = useAppointments(user);

  const onBookSubmit = async (e) => {
    const result = await handleBookSession(e);
    if (result.success) {
      alert('Appointment booked successfully!');
    } else {
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
        onSubmit={onBookSubmit}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        doctors={doctors}
      />
    </div>
  );
};

export default AppointmentsPage;
