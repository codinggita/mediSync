import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Activity, Loader2, CheckCircle
} from 'lucide-react';
import api from '../../../utils/api';
import SharedRecordCard from './SharedRecordCard';
import AccessAuditLog from './AccessAuditLog';

const DoctorSharingPage = () => {
  const [sharedRecords, setSharedRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([
    { id: 1, action: 'Access Granted', patient: 'James Wilson', time: 'Oct 25, 2026 - 10:00 AM' },
    { id: 2, action: 'Data Synced', patient: 'Sarah Connor', time: 'Oct 24, 2026 - 02:30 PM' }
  ]);

  useEffect(() => {
    const fetchSharedRecords = async () => {
      try {
        const { data } = await api.get('/records');
        setSharedRecords(data);
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
    <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20 text-slate-800 dark:text-white">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d]">
            <div className="w-12 h-12 rounded-2xl bg-[#2ECC71]/10 flex items-center justify-center">
              <ShieldCheck size={28} className="text-[#2ECC71]" />
            </div>
          </div>
          <div>
            <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight flex items-center gap-4">
              Shared Archives
              <span className="px-4 py-1.5 bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.65rem] rounded-full font-black uppercase tracking-widest border border-[#2A7FFF]/20">Incoming Data</span>
            </h1>
            <p className="text-[0.85rem] text-slate-400 mt-2 font-bold uppercase tracking-[0.25em] flex items-center gap-3">
              <Lock size={14} className="text-[#2ECC71]" />
              Authorized Patient Record Access
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* ── LEFT: Incoming Shared Records Panel ────────────────────────────────── */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                <Activity size={28} className="text-[#2A7FFF]" />
                Authorized Clinical Artifacts
              </h3>
            </div>

            <div className="space-y-6">
               {loading ? (
                 <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 size={48} className="animate-spin text-[#2A7FFF]" />
                    <p className="text-slate-400 font-black uppercase tracking-widest">Decrypting Vault Access...</p>
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
                 <div className="py-24 text-center flex flex-col items-center gap-6 bg-[#0B1121]/5 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                    <ShieldCheck size={64} className="text-slate-200" />
                    <div className="space-y-2">
                       <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No shared artifacts detected</p>
                       <p className="text-[0.8rem] text-slate-400 font-bold opacity-60">Incoming shared records from patients will appear here.</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Access Audit & Stats ───────────────────────────────── */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          {/* Security Status */}
          <div className="bg-[#0B1121] p-10 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden group">
             <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#2ECC71]/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
             <div className="flex items-center gap-4 mb-6">
                <ShieldCheck size={32} className="text-[#2ECC71]" />
                <p className="text-[1.4rem] font-black text-white">Vault Encrypted</p>
             </div>
             <p className="text-[0.9rem] text-slate-400 font-medium leading-relaxed mb-8">
                Your portal is currently synchronized with the MediSync Clinical Node. All shared data is session-locked.
             </p>
             <div className="flex items-center gap-3 text-[#2ECC71] text-[0.7rem] font-black uppercase tracking-widest bg-[#2ECC71]/10 px-5 py-3 rounded-2xl w-fit border border-[#2ECC71]/20">
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
