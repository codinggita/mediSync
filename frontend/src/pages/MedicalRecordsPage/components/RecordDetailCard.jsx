import React, { useState, useEffect } from 'react';
import {
  FileText, Microscope, Share2, Clock
} from 'lucide-react';
import RecordPreviewModal from './RecordPreviewModal';
import RecordShareModal from './RecordShareModal';
import RecordStatusGrid from './RecordStatusGrid';
import RecordArtifactsVault from './RecordArtifactsVault';
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
      case 'prescription': return FileText;
      case 'lab report': return FileText;
      case 'x-ray': return FileText;
      case 'scan': return FileText;
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

      <RecordStatusGrid hasAlert={record.hasAlert} />

      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
        <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white flex items-center gap-3 mb-5">
          <FileText size={20} className="text-[#2A7FFF]" />
          Clinical Dossier
        </h3>
        <p className="text-[0.95rem] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {record.description || 'No additional clinical observations were recorded for this timestamp. The data remains verified and synchronized with your main health profile.'}
        </p>
      </div>

      <RecordArtifactsVault 
        record={record} 
        onShowPreview={() => setShowPreview(true)} 
      />

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
