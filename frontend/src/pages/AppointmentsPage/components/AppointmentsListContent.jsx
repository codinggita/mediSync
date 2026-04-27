import React from 'react';
import { Loader2, CalendarDays } from 'lucide-react';
import AppointmentCard from './AppointmentCard';

const AppointmentsListContent = ({ loading, appointments, user }) => {
  return (
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
  );
};

export default AppointmentsListContent;
