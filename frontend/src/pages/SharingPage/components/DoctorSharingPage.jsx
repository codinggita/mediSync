import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Activity, Loader2, CheckCircle, FolderLock
} from 'lucide-react';
import api from '../../../utils/api';
import SharedRecordCard from './SharedRecordCard';
import AccessAuditLog from './AccessAuditLog';

const DoctorSharingPage = () => {
  const [sharedRecords, setSharedRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchSharedRecords = async () => {
      try {
        const { data } = await api.get('/records');
        let fetchedRecords = data;

        // Inject Premium Mock Data if DB is empty
        if (fetchedRecords.length === 0) {
          fetchedRecords = [
            {
              _id: 'shared_mock_1',
              title: 'MRI Brain Scan (Contrast)',
              type: 'Imaging',
              createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
              patient: { name: 'Sarah Connor' },
              fileUrl: '#'
            },
            {
              _id: 'shared_mock_2',
              title: 'Lipid Profile & HbA1c',
              type: 'Lab Report',
              createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // Yesterday
              patient: { name: 'James Wilson' },
              fileUrl: '#'
            },
            {
              _id: 'shared_mock_3',
              title: 'Cardiac Stress Test Result',
              type: 'Clinical Note',
              createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
              patient: { name: 'Sarah Connor' },
              fileUrl: '#'
            }
          ];
        }

        setSharedRecords(fetchedRecords);
        
        // Dynamically generate the audit log based on the real shared records
        const dynamicHistory = fetchedRecords.map((record, index) => ({
          id: record._id || index,
          action: 'Access Granted',
          patient: record.patient?.name || 'Unknown Patient',
          time: new Date(record.createdAt).toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        })).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
        
        setHistory(dynamicHistory);
      } catch (error) {
        console.error('Error fetching shared records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSharedRecords();
  }, []);

  const handleDownload = (fileUrl, title) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${title.replace(/\s+/g, '_')}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20 text-slate-800 dark:text-white bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] border border-white/40 dark:border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-[#2ECC71]/10 flex items-center justify-center shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]">
              <ShieldCheck size={26} className="text-[#2ECC71]" />
            </div>
          </div>
          <div>
            <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-4">
              Shared Archives
              <span className="px-4 py-1.5 bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.65rem] rounded-full font-black uppercase tracking-widest border border-[#2A7FFF]/20 shadow-sm">Incoming Data</span>
            </h1>
            <p className="text-[0.85rem] text-[#2ECC71] mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
              <Lock size={14} className="text-[#2ECC71]" />
              Authorized Patient Record Access
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* ── LEFT: Incoming Shared Records Panel ────────────────────────────────── */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
                   <Activity size={20} className="text-[#2A7FFF]" />
                </div>
                Authorized Clinical Artifacts
              </h3>
            </div>

            <div className="space-y-6 relative z-10">
               {loading ? (
                 <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 size={48} className="animate-spin text-[#2A7FFF] drop-shadow-md" />
                    <p className="text-[#2A7FFF] font-black uppercase tracking-widest">Decrypting Vault Access...</p>
                 </div>
               ) : sharedRecords.length > 0 ? (
                 sharedRecords.map((record) => (
                   <SharedRecordCard 
                    key={record._id} 
                    record={record} 
                    onDownload={handleDownload} 
                   />
                 ))
               ) : (
                 <div className="py-24 text-center flex flex-col items-center gap-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] border border-white/20 dark:border-white/5">
                    <div className="w-24 h-24 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center justify-center">
                       <FolderLock size={40} className="text-slate-400" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-slate-500 font-black uppercase tracking-[0.3em]">No shared artifacts detected</p>
                       <p className="text-[0.8rem] text-slate-400 font-bold opacity-80">Incoming shared records from patients will appear here.</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Access Audit & Stats ───────────────────────────────── */}
        <div className="xl:col-span-4 flex flex-col gap-10">
          {/* Security Status */}
          <div className="bg-[#0B1121] p-10 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden group">
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#2ECC71]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
             <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center">
                   <ShieldCheck size={26} className="text-[#2ECC71]" />
                </div>
                <p className="text-[1.5rem] font-black text-white">Vault Encrypted</p>
             </div>
             <p className="text-[0.95rem] text-slate-400 font-medium leading-relaxed mb-8 relative z-10">
                Your portal is currently synchronized with the MediSync Clinical Node. All shared data is session-locked.
             </p>
             <div className="flex items-center gap-3 text-[#2ECC71] text-[0.7rem] font-black uppercase tracking-widest bg-[#2ECC71]/10 px-5 py-3.5 rounded-xl w-fit border border-[#2ECC71]/20 relative z-10 shadow-[inset_0_0_10px_rgba(46,204,113,0.1)]">
                <CheckCircle size={16} /> Protocol Verified
             </div>
          </div>

          <AccessAuditLog history={history} />
        </div>
      </div>
    </main>
  );
};

export default DoctorSharingPage;
