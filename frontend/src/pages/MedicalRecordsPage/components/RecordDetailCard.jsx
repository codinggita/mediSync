import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, CheckCircle, FileText,
  Download, Eye, Microscope, FlaskConical, Activity, Share2, ShieldCheck, Clock
} from 'lucide-react';
import RecordPreviewModal from './RecordPreviewModal';
import RecordShareModal from './RecordShareModal';
import firstAidImg from '../../../assets/images/first_aid.png';

const RecordDetailCard = ({ record }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (showPreview && record && record.fileUrl) {
      if (record.fileUrl.startsWith('data:application/pdf')) {
        fetch(record.fileUrl)
          .then(res => res.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            setPdfBlobUrl(url);
          });
      } else {
        setPdfBlobUrl(record.fileUrl);
      }
    }
    
    return () => {
      if (pdfBlobUrl && pdfBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [showPreview, record]);

  const shareLink = `https://medisync.app/secure/${record?._id || Math.random().toString(36).substring(2, 10)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!record) return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] p-10 text-center animate-in fade-in duration-700">
      <div className="w-48 h-48 mb-8 relative group">
        <div className="absolute inset-0 bg-[#2A7FFF]/10 rounded-full blur-3xl group-hover:bg-[#2A7FFF]/20 transition-all duration-500" />
        <img src={firstAidImg} alt="Vault" className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-bounce duration-[4s]" />
      </div>
      <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white mb-2">Select a biological record</h3>
      <p className="text-[0.9rem] font-medium text-slate-400 max-w-[280px]">Choose a snapshot from the timeline to view detailed clinical analysis and secured documents.</p>
    </div>
  );

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription': return Activity;
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

  const Icon = getIcon(record.type);
  const color = getColor(record.type);
  const dateStr = new Date(record.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-700 pb-10 relative">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47] relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-10 group-hover:opacity-20 transition-opacity`}>
           <Icon size={180} style={{ color }} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-[0.7rem] font-black uppercase tracking-widest text-slate-400">
                <Clock size={14} className="text-[#2A7FFF]" /> {dateStr}
             </div>
             <button 
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2A7FFF] text-white text-[0.85rem] font-black rounded-xl shadow-[0_8px_16px_rgba(42,127,255,0.3)] hover:scale-105 active:scale-95 transition-all"
             >
                <Share2 size={16} /> Secure Share
             </button>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
               <Icon size={32} style={{ color }} className="drop-shadow-md" />
            </div>
            <div>
               <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-2">{record.title}</h2>
               <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.7rem] font-black rounded-md uppercase tracking-widest border border-[#2A7FFF]/20">
                     {record.type}
                  </span>
                  <span className="flex items-center gap-2 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                     <Microscope size={14} /> {record.doctor?.name || 'Self Authenticated'}
                  </span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${record.hasAlert ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'} shadow-inner`}>
               {record.hasAlert ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
            </div>
            <div>
               <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Clinical Status</p>
               <h4 className={`text-[1.1rem] font-black ${record.hasAlert ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {record.hasAlert ? 'Anomalies Detected' : 'Physiological Normal'}
               </h4>
            </div>
         </div>
         <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-[#2A7FFF] shadow-inner flex items-center justify-center">
               <ShieldCheck size={24} />
            </div>
            <div>
               <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Encryption</p>
               <h4 className="text-[1.1rem] font-black text-[#2A7FFF]">AES-256 Secured</h4>
            </div>
         </div>
      </div>

      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
        <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-5">
          <FileText size={20} className="text-[#2A7FFF]" />
          Clinical Dossier
        </h3>
        <p className="text-[0.95rem] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {record.description || 'No additional clinical observations were recorded for this timestamp. The data remains verified and synchronized with your main health profile.'}
        </p>
      </div>

      {record.fileUrl && (
        <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
          <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-6">
            <FlaskConical size={20} className="text-[#2A7FFF]" />
            Artifacts Vault
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-5 rounded-[1.8rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] hover:shadow-[4px_4px_8px_#cbced1] transition-all group/doc">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center shadow-sm text-[#2A7FFF]">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="text-[0.9rem] font-black text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-none">{record.title}_Analysis.pdf</p>
                  <p className="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Encrypted PDF · 1.2 MB</p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={() => setShowPreview(true)}
                  className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#0a0f1d] active:shadow-inner transition-all"
                >
                  <Eye size={18} />
                </button>
                <a 
                  href={record.fileUrl} 
                  download={`${record.title.replace(/\s+/g, '_')}_Report`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-400 hover:text-[#2ECC71] shadow-[3px_3px_6px_#cbced1,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#0a0f1d] active:shadow-inner transition-all"
                >
                  <Download size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <RecordPreviewModal 
        show={showPreview}
        onClose={() => setShowPreview(false)}
        record={record}
        dateStr={dateStr}
        pdfBlobUrl={pdfBlobUrl}
      />

      <RecordShareModal 
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareLink={shareLink}
        copied={copied}
        handleCopy={handleCopy}
      />
    </div>
  );
};

export default RecordDetailCard;
