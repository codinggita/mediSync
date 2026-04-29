import React, { useState } from 'react';
import { Users, Clock, XCircle, Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const initialShares = [
  {
    id: 1,
    doctor: 'Dr. Anjali Mehta',
    role: 'Endocrinologist',
    hospital: 'Apollo Hospital, Delhi',
    record: 'HbA1c Lab Result – Apr 2026',
    shared: '2 hours ago',
    expiresIn: '22h 14m',
    expiryPct: 92,
    pinEnabled: true,
    viewed: true,
    status: 'active',
  },
  {
    id: 2,
    doctor: 'Dr. Rakesh Patel',
    role: 'Cardiologist',
    hospital: 'Fortis Heart Institute',
    record: 'ECG Report – Feb 2026',
    shared: '1 day ago',
    expiresIn: '5h 30m',
    expiryPct: 23,
    pinEnabled: false,
    viewed: false,
    status: 'expiring',
  },
  {
    id: 3,
    doctor: 'Dr. Priya Nair',
    role: 'General Physician',
    hospital: 'Max Healthcare',
    record: 'Blood Test Report – Apr 2026',
    shared: '3 days ago',
    expiresIn: 'Expired',
    expiryPct: 0,
    pinEnabled: true,
    viewed: true,
    status: 'expired',
  },
];

const initials = (name) =>
  name
    .split(' ')
    .filter((w) => w.startsWith('Dr.') === false)
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

const ActiveSharesPanel = () => {
  const [shares, setShares] = useState(initialShares);

  const revoke = (id) => {
    setShares((prev) => prev.filter((s) => s.id !== id));
  };

  const statusCfg = {
    active: { label: 'Active', color: '#2ECC71', bg: '#2ECC7115' },
    expiring: { label: 'Expiring', color: '#F59E0B', bg: '#F59E0B15' },
    expired: { label: 'Expired', color: '#EF4444', bg: '#EF444415' },
  };

  const barColor = (pct) => {
    if (pct > 50) return '#2ECC71';
    if (pct > 20) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-2xl p-5 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
            <Users size={16} className="text-[#2A7FFF]" />
          </div>
          <div>
            <h3 className="text-[0.92rem] font-extrabold text-[#1F2937] dark:text-white leading-none">
              Active Shares
            </h3>
            <p className="text-[0.65rem] text-gray-400 mt-0.5">
              {shares.length} records currently shared
            </p>
          </div>
        </div>
        <span className="text-[0.65rem] font-bold px-2 py-1 rounded-full bg-[#E6F0FF] dark:bg-[#2A7FFF]/20 text-[#2A7FFF]">
          {shares.filter((s) => s.status === 'active').length} Active
        </span>
      </div>

      {/* Shares List */}
      {shares.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center">
            <Shield size={24} className="text-gray-300" />
          </div>
          <p className="text-[0.82rem] font-bold text-gray-400">No active shares</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {shares.map(
            ({
              id,
              doctor,
              role,
              hospital,
              record,
              shared,
              expiresIn,
              expiryPct,
              pinEnabled,
              viewed,
              status,
            }) => {
              const st = statusCfg[status];
              return (
                <div
                  key={id}
                  className={`border rounded-2xl p-4 transition-all hover:shadow-md group ${
                    status === 'expired'
                      ? 'opacity-60 border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-[#0B1121]/50'
                      : 'border-gray-100 dark:border-slate-700/50 bg-white dark:bg-[#1A2642]/40 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Doctor Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A7FFF] to-[#2ECC71] flex items-center justify-center text-white text-[0.7rem] font-extrabold shrink-0">
                      {initials(doctor)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[0.85rem] font-extrabold text-[#1F2937] dark:text-white truncate">
                          {doctor}
                        </p>
                        <span
                          className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ color: st.color, backgroundColor: st.bg }}
                        >
                          {st.label}
                        </span>
                      </div>
                      <p className="text-[0.72rem] text-gray-400 font-medium">
                        {role} · {hospital}
                      </p>
                    </div>

                    {/* Revoke */}
                    {status !== 'expired' && (
                      <button
                        onClick={() => revoke(id)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 text-[#EF4444] text-[0.68rem] font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
                      >
                        <XCircle size={12} />
                        Revoke
                      </button>
                    )}
                  </div>

                  {/* Record & Meta */}
                  <div className="mt-3 flex items-center gap-2 flex-wrap text-[0.7rem] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Lock size={10} /> {record}
                    </span>
                    {pinEnabled && (
                      <span className="flex items-center gap-1 text-[#8B5CF6] font-semibold">
                        · PIN ✓
                      </span>
                    )}
                    {viewed && (
                      <span className="flex items-center gap-1 text-[#2ECC71] font-semibold ml-auto">
                        <Eye size={10} /> Viewed
                      </span>
                    )}
                  </div>

                  {/* Expiry Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1 text-[0.65rem] text-gray-400 font-medium">
                        <Clock size={9} /> Shared {shared}
                      </span>
                      <span
                        className="text-[0.65rem] font-bold"
                        style={{ color: barColor(expiryPct) }}
                      >
                        {status === 'expired' ? (
                          <span className="flex items-center gap-1 text-red-400">
                            <AlertTriangle size={9} /> Link Expired
                          </span>
                        ) : (
                          <>Expires in {expiresIn}</>
                        )}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${expiryPct}%`, backgroundColor: barColor(expiryPct) }}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default ActiveSharesPanel;
