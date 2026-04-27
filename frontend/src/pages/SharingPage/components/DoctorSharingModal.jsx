import React from 'react';
import { 
  XCircle, Lock, FileText, CheckCircle, CheckCircle2, Loader2, ShieldCheck 
} from 'lucide-react';

const DoctorSharingModal = ({ 
  show, 
  onClose, 
  selectedDoctor, 
  records, 
  selectedRecordId, 
  setSelectedRecordId, 
  onConfirm, 
  isSharing, 
  successMessage 
}) => {
  if (!show || !selectedDoctor) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => !isSharing && onClose()} />
       <div className="bg-[#ecf0f3] dark:bg-[#151E32] w-full max-w-xl rounded-[4rem] p-12 shadow-2xl relative z-10 border border-white/20">
          {successMessage ? (
            <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
               <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 border-4 border-emerald-500/20 shadow-inner">
                  <CheckCircle2 size={48} className="animate-bounce" />
               </div>
               <h3 className="text-[2rem] font-black text-slate-900 dark:text-white mb-2">Success!</h3>
               <p className="text-[1.1rem] font-bold text-slate-400 leading-relaxed">{successMessage}</p>
            </div>
          ) : (
            <>
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all"
              >
                <XCircle size={24} />
              </button>

              <div className="flex flex-col items-center text-center mb-10">
                 <div className="w-20 h-20 rounded-[2rem] bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] mb-6 shadow-inner">
                    <Lock size={32} />
                 </div>
                 <h3 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-tight">Secure Record Transfer</h3>
                 <p className="text-[0.9rem] font-bold text-slate-400 mt-2 italic">Initiating clinical data handshake with Dr. {selectedDoctor.name}</p>
              </div>

              <div className="space-y-8">
                 <div>
                    <label className="block text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Select Clinical Artifact</label>
                    <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide">
                       {records.length > 0 ? (
                         records.map(record => (
                           <div 
                             key={record._id} 
                             onClick={() => setSelectedRecordId(record._id)}
                             className={`p-6 rounded-[1.8rem] border-2 cursor-pointer transition-all flex items-center gap-5 ${selectedRecordId === record._id ? 'bg-[#2A7FFF] border-[#2A7FFF] shadow-lg shadow-[#2A7FFF]/30 translate-x-2' : 'bg-white dark:bg-[#0B1121] border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-100'}`}
                           >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRecordId === record._id ? 'bg-white/20 text-white' : 'bg-[#ecf0f3] dark:bg-[#151E32] text-[#2A7FFF]'}`}>
                                 <FileText size={22} />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className={`text-[1rem] font-black truncate ${selectedRecordId === record._id ? 'text-white' : 'text-slate-800 dark:text-white'}`}>{record.title}</p>
                                 <p className={`text-[0.7rem] font-bold uppercase tracking-widest ${selectedRecordId === record._id ? 'text-white/70' : 'text-slate-400'}`}>{record.type} · {new Date(record.createdAt).toLocaleDateString()}</p>
                              </div>
                              {selectedRecordId === record._id && <CheckCircle size={24} className="text-white" />}
                           </div>
                         ))
                       ) : (
                         <div className="p-10 text-center bg-white dark:bg-[#0B1121] rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-400 font-bold">No records found to share.</p>
                         </div>
                       )}
                    </div>
                 </div>

                 <button 
                   onClick={onConfirm}
                   disabled={isSharing || !selectedRecordId}
                   className="w-full py-6 bg-[#2A7FFF] text-white rounded-[2rem] font-black text-[1.1rem] uppercase tracking-widest shadow-[0_20px_40px_rgba(42,127,255,0.3)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.4)] hover:-translate-y-2 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:translate-y-0"
                 >
                    {isSharing ? <Loader2 size={24} className="animate-spin" /> : <ShieldCheck size={24} />}
                    {isSharing ? 'Establishing Secure Link...' : 'Authorize Clinical Transfer'}
                 </button>
              </div>
            </>
          )}
       </div>
    </div>
  );
};

export default DoctorSharingModal;
