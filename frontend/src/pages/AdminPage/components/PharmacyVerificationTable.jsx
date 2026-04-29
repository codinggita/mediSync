import React from 'react';
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  MapPin,
  Calendar,
  ExternalLink,
} from 'lucide-react';

// Static data removed to favor props from parent state

const PharmacyVerificationTable = ({ pharmacies }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPharmacies = pharmacies.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(pharmacies.length / itemsPerPage) || 1;

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] border-none rounded-[3rem] overflow-hidden transition-all">
      <div className="px-6 py-8 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-[#ecf0f3] dark:bg-[#151E32] gap-6">
        <div>
          <h3 className="text-[1.3rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
            Onboarding Requests
          </h3>
          <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
            Active Network Intelligence
          </p>
        </div>
        <div className="flex gap-4">
          <button className="text-[0.75rem] font-black px-6 py-3.5 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] hover:text-[#2A7FFF] transition-all uppercase tracking-widest active:shadow-inner border border-white/40">
            Export CSV
          </button>
          <button className="text-[0.75rem] font-black px-8 py-3.5 rounded-2xl bg-[#2A7FFF] text-white shadow-[0_8px_16px_rgba(42,127,255,0.3)] hover:bg-[#1565C0] transition-all uppercase tracking-[0.15em]">
            View All Nodes
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#ecf0f3]/50 dark:bg-[#0B1121]/50 border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                Pharmacy Identity
              </th>
              <th className="px-6 py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                Geo Location
              </th>
              <th className="px-6 py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                Timeline
              </th>
              <th className="px-6 py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-6 py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">
                Protocol
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedPharmacies.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-white/30 dark:hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[18px] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-[#2A7FFF] text-[1rem] font-black shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] border border-white/40 group-hover:scale-110 transition-transform">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[1rem] font-black text-slate-900 dark:text-white leading-tight">
                        {p.name}
                      </p>
                      <p className="text-[0.75rem] text-slate-400 font-bold mt-1 tracking-tight">
                        {p.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-[0.85rem] text-slate-600 dark:text-slate-400 font-black tracking-tight">
                    <MapPin size={14} className="text-[#2A7FFF]" />
                    {p.location}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-[0.85rem] text-slate-600 dark:text-slate-400 font-black tracking-tight">
                    <Calendar size={14} className="text-slate-400" />
                    {p.date}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span
                    className={`text-[0.65rem] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest border shadow-sm ${
                      p.status === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        : p.status === 'Pending'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      title="Review Details"
                      className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] active:shadow-inner transition-all"
                    >
                      <Eye size={16} />
                    </button>
                    {p.status === 'Pending' && (
                      <>
                        <button
                          title="Approve"
                          className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm hover:bg-emerald-500/20 transition-all active:scale-90"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          title="Reject"
                          className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-sm hover:bg-rose-500/20 transition-all active:scale-90"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-6 border-t border-slate-200 dark:border-slate-800 bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-between">
        <p className="text-[0.75rem] text-slate-400 font-black uppercase tracking-widest">
          Network Load: {pharmacies.length} Entities Active
        </p>
        <div className="flex gap-3">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl font-black text-[0.8rem] transition-all ${
                currentPage === i + 1
                  ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47] text-[#2A7FFF]'
                  : 'text-slate-400 hover:bg-white/50 dark:hover:bg-[#151E32]'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyVerificationTable;
