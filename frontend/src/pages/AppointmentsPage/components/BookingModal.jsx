import React from 'react';
import { Calendar as CalendarIcon, X } from 'lucide-react';

const BookingModal = ({ 
  show, 
  onClose, 
  onSubmit, 
  newAppointment, 
  setNewAppointment, 
  doctors 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#0B1121]/80 backdrop-blur-md transition-all">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] w-full max-w-lg shadow-[20px_20px_60px_rgba(0,0,0,0.2)] dark:shadow-none border border-white/40 overflow-hidden transform transition-all">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-[1.4rem] font-black text-slate-900 dark:text-white flex items-center gap-3">
            <CalendarIcon className="text-[#2A7FFF]" size={24} />
            Book Clinical Session
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-200/50 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-8 flex flex-col gap-6">
          <div>
            <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-widest mb-2">Select Doctor</label>
            <select required value={newAppointment.doctorId} onChange={(e) => setNewAppointment({...newAppointment, doctorId: e.target.value})} className="w-full px-5 py-4 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#2A7FFF] text-slate-700 dark:text-white font-bold appearance-none">
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>{doc.name} - {doc.specialty}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-widest mb-2">Session Type</label>
            <select value={newAppointment.type} onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})} className="w-full px-5 py-4 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#2A7FFF] text-slate-700 dark:text-white font-bold appearance-none">
              <option>Video Consult</option>
              <option>In Person</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-widest mb-2">Date</label>
              <input required type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})} className="w-full px-5 py-4 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#2A7FFF] text-slate-700 dark:text-white font-bold" />
            </div>
            <div>
              <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-widest mb-2">Time</label>
              <input required type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})} className="w-full px-5 py-4 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#2A7FFF] text-slate-700 dark:text-white font-bold" />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="w-full py-5 bg-[#2A7FFF] text-white rounded-[1.5rem] font-black text-[1rem] shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.4)] transition-all">
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
