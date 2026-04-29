import React from 'react';
import { Database, AlertTriangle, Trash2, FileText, Calendar, ChevronRight } from 'lucide-react';

const SettingsRecordsPanel = ({
  records,
  filterMode,
  setFilterMode,
  onDeleteRecord,
  onBulkPurge,
}) => {
  const totalSize = records.reduce((acc, r) => acc + parseFloat(r.size), 0);
  const legacySize = records
    .filter((r) => new Date(r.date).getFullYear() < 2024)
    .reduce((acc, r) => acc + parseFloat(r.size), 0);
  const maxCapacity = 500;
  const utilizedPercent = Math.min(100, (totalSize / maxCapacity) * 100);
  const legacyPercent = Math.min(100, (legacySize / maxCapacity) * 100);

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-tight">
            Secure Archive
          </h2>
          <p className="text-[0.8rem] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2 italic">
            Historical Medical Intelligence
          </p>
        </div>
        <div className="bg-amber-500/10 p-5 rounded-[1.8rem] border border-amber-500/20 flex items-center gap-5">
          <AlertTriangle size={24} className="text-amber-500" />
          <p className="text-[0.7rem] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest max-w-[180px] leading-relaxed">
            Purge protocol recommended for records older than 3 years.
          </p>
        </div>
      </div>

      {/* Storage Telemetry */}
      <div className="bg-slate-50 dark:bg-[#0B1121] p-8 rounded-[2.5rem] mb-10 border border-slate-100 dark:border-white/5 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest">
            Vault Capacity: {totalSize.toFixed(1)} MB / {maxCapacity} MB
          </span>
          <span className="text-[0.75rem] font-black text-[#2A7FFF] uppercase tracking-widest">
            {utilizedPercent.toFixed(1)}% Utilized
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-[#2A7FFF] transition-all duration-1000"
            style={{ width: `${utilizedPercent - legacyPercent}%` }}
          ></div>
          <div
            className="h-full bg-rose-500 transition-all duration-1000"
            style={{ width: `${legacyPercent}%` }}
          ></div>
        </div>
        <div className="mt-4 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2A7FFF]"></div>
            <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
              Active Records (
              {records.length - records.filter((r) => new Date(r.date).getFullYear() < 2024).length}
              )
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
              Legacy Purgeable (
              {records.filter((r) => new Date(r.date).getFullYear() < 2024).length})
            </span>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
        <div className="flex bg-slate-50 dark:bg-[#0B1121] p-1.5 rounded-[1.5rem] border border-slate-100 dark:border-white/5 w-full md:w-auto">
          {['All', 'Legacy', 'Large Files'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterMode(f)}
              className={`px-6 py-2.5 rounded-xl text-[0.7rem] font-black uppercase tracking-widest transition-all ${filterMode === f ? 'bg-white dark:bg-[#151E32] text-[#2A7FFF] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={onBulkPurge}
          className="flex items-center gap-3 px-8 py-3.5 bg-rose-500 text-white rounded-2xl font-black text-[0.75rem] uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
        >
          <Trash2 size={16} /> Purge All Legacy
        </button>
      </div>

      <div className="space-y-6">
        {records.map((record) => {
          const isOld = new Date(record.date).getFullYear() < 2024;
          return (
            <div
              key={record.id}
              className={`p-8 bg-slate-50 dark:bg-[#090E1A]/40 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 relative ${isOld ? 'border-l-4 border-l-rose-500' : 'border-l-4 border-l-[#2A7FFF]'}`}
            >
              <div className="flex items-center gap-8">
                <div
                  className={`w-16 h-16 rounded-[1.4rem] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-6 ${isOld ? 'bg-rose-500/10 text-rose-500' : 'bg-[#2A7FFF]/10 text-[#2A7FFF]'}`}
                >
                  <FileText size={28} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-[1.1rem] font-black text-slate-900 dark:text-white tracking-tight truncate max-w-[200px] md:max-w-none">
                      {record.name}
                    </p>
                    {isOld && (
                      <span className="px-3 py-0.5 bg-rose-500/10 text-rose-500 text-[0.55rem] font-black uppercase rounded-lg border border-rose-500/20 tracking-widest shrink-0">
                        Legacy
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest">
                        {record.date}
                      </span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-[0.8rem] font-bold text-slate-400">
                      {record.size} • {record.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-[1rem] bg-white dark:bg-white/5 text-slate-300 hover:text-[#2A7FFF] dark:hover:bg-[#2A7FFF]/10 transition-all flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5 active:scale-90">
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => onDeleteRecord(record.id)}
                  className="w-12 h-12 rounded-[1rem] bg-white dark:bg-rose-500/10 text-slate-300 hover:text-rose-500 dark:hover:bg-rose-500/20 transition-all flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5 active:scale-90"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}

        {records.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-[#0B1121] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
            <Database size={48} className="text-slate-200 mx-auto mb-6" />
            <p className="text-[1.2rem] font-black text-slate-400">Clinical Archive Empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsRecordsPanel;
