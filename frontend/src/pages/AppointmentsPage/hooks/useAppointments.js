import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { generateCalendarDays } from '../utils/calendarUtils';

const useAppointments = (user) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'Video Consult',
  });
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); 

  useEffect(() => {
    const fetchData = async () => {
      if (!user || user.role === 'Doctor') {
        setLoading(false);
        return;
      }
      try {
        const [appRes, docRes] = await Promise.all([
          api.get('/appointments'),
          api.get('/users/doctors'),
        ]);

        setAppointments(appRes.data || []);
        setDoctors(docRes.data || []);

        if (docRes.data && docRes.data.length > 0) {
          setNewAppointment((prev) => ({
            ...prev,
            doctorId: docRes.data[0]._id,
          }));
        }
      } catch (error) {
        console.error('Error fetching clinical data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  const calendarDays = generateCalendarDays(currentMonth);

  const handleBookSession = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/appointments', {
        doctorId: newAppointment.doctorId,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type,
      });
      setAppointments((prev) => [data, ...prev]);
      setShowBookingModal(false);
      setNewAppointment((prev) => ({ ...prev, date: '', time: '' }));
      return { success: true };
    } catch (error) {
      console.error('Error booking appointment:', error);
      return { success: false, message: error.response?.data?.message || 'Booking failed' };
    }
  };

  return {
    appointments,
    doctors,
    loading,
    selectedDate,
    setSelectedDate,
    showBookingModal,
    setShowBookingModal,
    newAppointment,
    setNewAppointment,
    currentMonth,
    monthName,
    calendarDays,
    nextMonth,
    prevMonth,
    handleBookSession,
  };
};

export default useAppointments;
