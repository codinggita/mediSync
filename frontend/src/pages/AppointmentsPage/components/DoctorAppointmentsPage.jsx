import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, Calendar as CalendarIcon, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import DoctorAppointmentCard from './DoctorAppointmentCard';
import ScheduleStatusHeader from './ScheduleStatusHeader';

const DoctorAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/appointments');
        let fetchedAppointments = data;

        // Inject Premium Mock Data if DB is empty so the user can test the UI!
        if (fetchedAppointments.length === 0) {
          const today = new Date();
          fetchedAppointments = [
            {
              _id: 'mock_app_1',
              patient: { name: 'Sarah Connor', email: 'sarah@example.com' },
              date: today.toISOString(),
              time: '14:30',
              type: 'Video Consultation',
              status: 'Pending',
              reason: 'Follow-up on recent asthma flare-up and medication review.',
              meetingLink: 'https://meet.google.com/mock-123'
            },
            {
              _id: 'mock_app_2',
              patient: { name: 'James Wilson', email: 'james@example.com' },
              date: new Date(today.getTime() + 86400000).toISOString(), // Tomorrow
              time: '09:00',
              type: 'In-Person',
              status: 'Confirmed',
              reason: 'Routine cardiac checkup and blood pressure monitoring.'
            }
          ];
        }

        setAppointments(fetchedAppointments);
      } catch (error) {
        console.error('Error fetching doctor appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.patch(`/appointments/${id}/status`, { status: newStatus });
      setAppointments(prev => prev.map(app => app._id === id ? data : app));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleStartSession = () => {
    const confirm = window.confirm('Initializing Secure Tele-Health Stream. Do you wish to proceed to the Clinical Portal for synchronized documentation?');
    if (confirm) navigate('/doctor-portal');
  };

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
      <ScheduleStatusHeader pendingCount={pendingCount} />

      <div className="grid grid-cols-1 gap-8">
        {/* Main Appointment List */}
        <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                 <CalendarIcon size={24} className="text-[#8B5CF6]" />
                 Upcoming Consultations
              </h3>
           </div>

           <div className="flex flex-col gap-6">
              {appointments.map(appointment => (
                 <DoctorAppointmentCard 
                    key={appointment._id} 
                    appointment={appointment} 
                    onStatusChange={handleStatusChange} 
                    onStartSession={handleStartSession}
                 />
              ))}

              {loading ? (
                 <div className="flex flex-col items-center justify-center py-24 gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                    <Loader2 size={64} className="text-[#8B5CF6] animate-spin" />
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em]">Syncing Appointments...</p>
                 </div>
              ) : appointments.length === 0 ? (
                 <div className="py-20 text-center flex flex-col items-center gap-4 bg-[#ecf0f3] dark:bg-[#0B1121]/20 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                    <CalendarDays size={64} className="text-slate-300" />
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No Appointments Scheduled</p>
                 </div>
              ) : null}
           </div>
        </div>
      </div>
    </main>
  );
};

export default DoctorAppointmentsPage;
