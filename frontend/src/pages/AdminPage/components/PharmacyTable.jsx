import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const PHARMACIES = [
  { name: 'MedPlus Sector 18', location: 'Noida, UP', status: 'Verified', date: '12 Apr 2026' },
  { name: 'Apollo Pharmacy', location: 'Connaught Pl.', status: 'Pending', date: '18 Apr 2026' },
  { name: 'Jan Aushadhi Store', location: 'Dwarka, Delhi', status: 'Pending', date: '20 Apr 2026' },
  { name: 'NetMeds Point', location: 'Gurugram, HR', status: 'Rejected', date: '09 Apr 2026' },
  { name: 'Wellness Forever', location: 'Pune, MH', status: 'Verified', date: '01 Apr 2026' },
  { name: 'Sanjivani Medical', location: 'Jaipur, RJ', status: 'Pending', date: '22 Apr 2026' },
];

const STATUS = {
  Verified: 'bg-green-50 text-[#2A7FFF] border-green-100',
  Pending: 'bg-amber-50 text-[#F59E0B] border-amber-100',
  Rejected: 'bg-red-50 text-[#D32F2F] border-red-100',
};

const PAGE_SIZE = 5;

const PharmacyTable = () => {
  const [page, setPage] = useState(0);
  const total = PHARMACIES.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const visible = PHARMACIES.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 admin-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Pharmacy Verification</h3>
          <p className="text-xs text-gray-400 mt-0.5">{total} pharmacies total</p>
        </div>
        <span className="text-xs font-bold text-[#F59E0B] bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
          3 Pending Review
        </span>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-gray-100">
              {['Pharmacy Name', 'Location', 'Status', 'Date Applied', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-[#F8FAFC] transition-colors duration-150 last:border-b-0"
              >
                <td className="px-4 py-3.5 font-semibold text-gray-800">{row.name}</td>
                <td className="px-4 py-3.5 text-gray-500">{row.location}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-gray-500 text-xs">{row.date}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
                      title="Review"
                    >
                      <Eye size={14} />
                    </button>
                    {row.status === 'Pending' && (
                      <>
                        <button
                          className="p-1.5 rounded-lg hover:bg-green-50 text-[#2A7FFF] transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-red-50 text-[#D32F2F] transition-colors"
                          title="Reject"
                        >
                          <XCircle size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
        <p className="text-xs text-gray-400">
          Showing {page * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE + PAGE_SIZE, total)} of {total}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page >= pages - 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyTable;
