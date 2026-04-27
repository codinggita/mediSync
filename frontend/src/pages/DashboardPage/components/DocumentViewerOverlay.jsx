import React from 'react';
import { FileText, ShieldCheck, Download, X, Clock } from 'lucide-react';
import reportPreviewImg from '../../../assets/images/medical_report_preview.png';

const DocumentViewerOverlay = ({ record, pdfBlobUrl, onClose }) => {
  if (!record) return null;

  const isImage = (url) => {
    if (!url) return false;
    if (url.startsWith('data:image/')) return true;
    return url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
       <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-all" onClick={onClose} />
       
       <div className="bg-white dark:bg-[#0F172A] w-full max-w-4xl max-h-[90vh] rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative z-10 animate-in zoom-in-95 duration-500 flex flex-col">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white/50 dark:bg-white/5 backdrop-blur-md">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                   <FileText size={28} />
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">{record.title}</h3>
                   <div className="flex items-center gap-3 mt-2">
                      <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(record.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                         <ShieldCheck size={10} className="text-emerald-500" />
                         <span className="text-[0.55rem] font-black text-emerald-500 uppercase tracking-tighter">Verified</span>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <a href={record.fileUrl} download={`${record.title.replace(/\s+/g, '_')}_Report`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#2A7FFF] text-white rounded-2xl font-black text-[0.8rem] uppercase tracking-widest shadow-lg shadow-[#2A7FFF]/20 hover:scale-105 transition-all">
                   <Download size={16} /> Download
                </a>
                <button type="button" onClick={onClose} className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                   <X size={24} />
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-[#0B1121] flex justify-center">
             <div className="w-full max-w-2xl bg-white dark:bg-[#151E32] rounded-[32px] shadow-2xl overflow-hidden relative group min-h-[400px] flex items-center justify-center">
                {isImage(record.fileUrl) ? (
                  <img src={record.fileUrl} alt="Clinical Report" className="w-full h-auto object-contain animate-in fade-in zoom-in duration-500 max-h-[60vh]" onError={(e) => { e.target.src = reportPreviewImg; }} />
                ) : (
                  <div className="w-full h-[60vh] relative bg-slate-100 dark:bg-[#1A2235]">
                     {pdfBlobUrl ? (
                       <iframe src={pdfBlobUrl} title={record.title} className="w-full h-full border-0 animate-in fade-in duration-500" />
                     ) : (
                       <div className="flex items-center justify-center h-full text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Secure Document...</div>
                     )}
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-30deg]">
                   <span className="text-[5rem] font-black text-slate-900 dark:text-white border-8 border-current px-12 py-6 rounded-[2rem]">MEDISYNC SECURE</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-between shadow-2xl translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF]"><Clock size={18} /></div>
                      <div>
                         <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest leading-none">Last Synced</p>
                         <p className="text-[0.8rem] font-black text-slate-800 dark:text-white">Recent</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest leading-none">Access Level</p>
                      <p className="text-[0.8rem] font-black text-emerald-500 uppercase">Restricted</p>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="p-8 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#2ECC71] animate-pulse" />
                <span className="text-[0.75rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Clinical AI Analysis: Ready</span>
             </div>
             <p className="text-[0.75rem] font-bold text-slate-400 italic">"No significant abnormalities detected."</p>
          </div>
       </div>
    </div>
  );
};

export default DocumentViewerOverlay;
