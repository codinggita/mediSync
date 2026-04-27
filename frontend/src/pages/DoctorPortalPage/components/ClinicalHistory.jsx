import React, { useState, useEffect } from 'react';
import { FileText, Pill, Calendar, AlertTriangle, CheckCircle, ChevronRight, Clock, Loader2, Activity } from 'lucide-react';
import api from '../../../utils/api';

const ClinicalHistory = ({ patient }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!patient?._id) {
         setLoading(false);
         return;
      }
      setLoading(true);
      try {
        const { data } = await api.get(`/records?patientId=${patient._id}`);
        if (data && data.length > 0) {
           setRecords(data);
        } else {
           throw new Error('No records');
        }
      } catch (error) {
        console.error('Error fetching clinical history:', error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [patient]);

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription': return Pill;
      case 'lab report': return Activity;
      case 'x-ray': return FileText;
      case 'scan': return Activity;
      default: return FileText;
    }
  };

  const getColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription': return '#8B5CF6';
      case 'lab report': return '#F59E0B';
      case 'x-ray': return '#2A7FFF';
      case 'scan': return '#2ECC71';
      default: return '#2A7FFF';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-black text-[#1F2937] dark:text-white flex items-center gap-2.5 text-[1rem]">
            <Clock size={18} className="text-[#2A7FFF]" />
            Clinical History
          </h3>
          <p className="text-[0.7rem] text-gray-400 mt-0.5 uppercase tracking-widest font-bold">Chronological Logs</p>
        </div>
        <button className="text-[0.75rem] text-[#2A7FFF] font-bold hover:underline flex items-center gap-1 transition-all">
          Full Timeline <ChevronRight size={13} />
        </button>
      </div>

      <div className="relative flex flex-col gap-0 flex-1 min-h-[300px]">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <Loader2 className="animate-spin text-[#2A7FFF]" size={24} />
            <p className="text-gray-400 font-bold text-[0.7rem] uppercase tracking-wider">Syncing records...</p>
          </div>
        ) : records.length > 0 ? (
          <>
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#2A7FFF]/40 via-gray-100 dark:via-slate-800 to-transparent" />
            {records.map((rec, i) => {
              const Icon = getIcon(rec.type);
              const color = getColor(rec.type);
              const dateStr = new Date(rec.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <div key={rec._id} className="flex gap-6 group mb-8 last:mb-0">
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-10 h-10 rounded-[1rem] flex items-center justify-center bg-white dark:bg-[#0B1121] transition-all duration-300 group-hover:scale-110 shadow-sm border border-slate-100 dark:border-slate-800"
                      style={{ color: color }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pb-2">
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <h4 className="text-[0.92rem] font-bold text-[#1F2937] dark:text-white group-hover:text-[#2A7FFF] transition-colors">
                        {rec.title}
                      </h4>
                      <span className="text-[0.68rem] text-gray-400 font-bold bg-gray-50 dark:bg-[#0B1121] px-2 py-0.5 rounded-lg border border-gray-100 dark:border-slate-800">
                        {dateStr}
                      </span>
                    </div>
                    
                    <p className="text-[0.78rem] text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {rec.description || 'Routine clinical documentation and health summary.'}
                    </p>

                    <button className="flex items-center gap-1.5 text-[0.75rem] font-black text-[#2A7FFF] hover:text-[#1565C0] transition-colors group/btn">
                      View Full Details
                      <ChevronRight size={12} className="transform transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center border border-dashed border-gray-200 dark:border-slate-800">
              <FileText size={20} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-bold text-[0.75rem]">No clinical records found for this patient.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalHistory;
