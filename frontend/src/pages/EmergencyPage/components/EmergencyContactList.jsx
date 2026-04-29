import React from 'react';
import { User, Phone, MessageSquare, AlertTriangle } from 'lucide-react';

const CONTACTS = [
  {
    id: 1,
    name: 'Sagar Sahoo',
    relation: 'Primary Guardian',
    phone: '+91 98765 43210',
    active: true,
  },
  {
    id: 2,
    name: 'Dr. Anjali Verma',
    relation: 'Family Physician',
    phone: '+91 87654 32109',
    active: false,
  },
];

const EmergencyContactList = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] border border-white/40">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <AlertTriangle size={24} className="text-red-500" />
          Trusted Network
        </h2>
        <button className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest hover:underline">
          Manage Broadcast
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {CONTACTS.map((c) => (
          <div
            key={c.id}
            className="p-8 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-none border border-white/40 group flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center text-slate-400 group-hover:text-[#2A7FFF] transition-colors">
                <User size={32} />
              </div>
              <div>
                <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white">
                  {c.name}
                </h3>
                <p className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest">
                  {c.relation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all">
                <Phone size={24} />
              </button>
              <button className="w-14 h-14 rounded-2xl bg-[#2A7FFF] text-white flex items-center justify-center shadow-lg shadow-[#2A7FFF]/20 hover:scale-110 active:scale-95 transition-all">
                <MessageSquare size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactList;
