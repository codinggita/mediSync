import React from 'react';
import { CheckCircle, XCircle, MoreVertical, Eye, MapPin, Calendar, ExternalLink } from 'lucide-react';

const pharmacies = [
  {
    id: 1,
    name: 'Apollo Pharmacy',
    location: 'Sector 62, Noida',
    status: 'Verified',
    date: 'Apr 20, 2026',
    email: 'contact@apollo.com',
  },
  {
    id: 2,
    name: 'Wellness Forever',
    location: 'Andheri West, Mumbai',
    status: 'Pending',
    date: 'Apr 22, 2026',
    email: 'admin@wellness.in',
  },
  {
    id: 3,
    name: 'MedPlus Store #42',
    location: 'HSR Layout, Bangalore',
    status: 'Verified',
    date: 'Apr 15, 2026',
    email: 'blr42@medplus.com',
  },
  {
    id: 4,
    name: 'City Care Pharma',
    location: 'Salt Lake, Kolkata',
    status: 'Rejected',
    date: 'Apr 10, 2026',
    email: 'citycare@gmail.com',
  },
  {
    id: 5,
    name: 'Guardian Lifecare',
    location: 'Gurgaon, Haryana',
    status: 'Pending',
    date: 'Apr 23, 2026',
    email: 'onboarding@guardian.com',
  },
];

const PharmacyVerificationTable = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-800/50 flex items-center justify-between bg-white dark:bg-[#151E32]">
        <div>
          <h3 className="text-[1rem] font-black text-[#1F2937] dark:text-white leading-none">Pharmacy Verification</h3>
          <p className="text-[0.68rem] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Manage onboarding requests</p>
        </div>
        <div className="flex gap-2">
          <button className="text-[0.7rem] font-bold px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700 text-gray-500 hover:bg-gray-50 transition-all">Export CSV</button>
          <button className="text-[0.7rem] font-bold px-3 py-1.5 rounded-lg bg-[#2A7FFF] text-white hover:bg-[#1565C0] transition-all">View All</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-[#0B1121]/50 border-b border-gray-50 dark:border-slate-800">
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Pharmacy Details</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Date Applied</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[0.65rem] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            {pharmacies.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-[#1A2642]/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2A7FFF] to-[#1565C0] flex items-center justify-center text-white text-[0.75rem] font-black shadow-sm group-hover:scale-110 transition-transform">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[0.85rem] font-bold text-[#1F2937] dark:text-white leading-tight">{p.name}</p>
                      <p className="text-[0.68rem] text-gray-400 font-medium mt-0.5">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[0.78rem] text-gray-500 dark:text-slate-400 font-medium">
                    <MapPin size={12} className="text-gray-300" />
                    {p.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[0.78rem] text-gray-500 dark:text-slate-400 font-medium">
                    <Calendar size={12} className="text-gray-300" />
                    {p.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[0.65rem] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${
                    p.status === 'Verified' ? 'bg-green-50 text-green-500 border border-green-100' :
                    p.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
                    'bg-red-50 text-red-500 border border-red-100'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button title="Review Details" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center text-gray-400 hover:text-[#2A7FFF] hover:bg-[#E6F0FF] transition-all">
                      <Eye size={14} />
                    </button>
                    {p.status === 'Pending' && (
                      <>
                        <button title="Approve" className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500 hover:bg-green-100 transition-all active:scale-90">
                          <CheckCircle size={14} />
                        </button>
                        <button title="Reject" className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-100 transition-all active:scale-90">
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-50 dark:border-slate-800/50 bg-gray-50/30 dark:bg-[#0B1121]/30 flex items-center justify-between">
         <p className="text-[0.7rem] text-gray-400 font-bold">Showing 5 of 24 applications</p>
         <div className="flex gap-1">
            <button className="w-8 h-8 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-400 disabled:opacity-50" disabled>1</button>
            <button className="w-8 h-8 rounded-lg border border-transparent flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-[#151E32]">2</button>
            <button className="w-8 h-8 rounded-lg border border-transparent flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-[#151E32]">3</button>
         </div>
      </div>
    </div>
  );
};

export default PharmacyVerificationTable;
