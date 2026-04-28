import React, { useState, useEffect } from 'react';
import { FileText, Microscope } from 'lucide-react';
import RecordPreviewModal from './RecordPreviewModal';
import RecordShareModal from './RecordShareModal';
import RecordStatusGrid from './RecordStatusGrid';
import RecordArtifactsVault from './RecordArtifactsVault';
import EmptyRecordDetail from './EmptyRecordDetail';
import RecordDetailHeader from './RecordDetailHeader';
import RecordDossier from './RecordDossier';

const RecordDetailCard = ({ record }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (showPreview && record?.fileUrl) {
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
      if (pdfBlobUrl?.startsWith('blob:')) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [showPreview, record]);

  if (!record) return <EmptyRecordDetail />;

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription':
      case 'lab report':
      case 'x-ray':
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
  const shareLink = `https://medisync.app/secure/${record._id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-700 pb-10 relative">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-10 group-hover:opacity-20 transition-opacity">
           <Icon size={180} style={{ color }} />
        </div>
        
        <div className="relative z-10">
          <RecordDetailHeader record={record} dateStr={dateStr} onShare={() => setShowShareModal(true)} />

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
               <Icon size={32} style={{ color }} className="drop-shadow-md" />
            </div>
            <div>
               <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-2">{record.title}</h2>
               <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.7rem] font-black rounded-md uppercase tracking-widest border border-[#2A7FFF]/20">{record.type}</span>
                  <span className="flex items-center gap-2 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
                     <Microscope size={14} /> {record.doctor?.name || 'Self Authenticated'}
                  </span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <RecordStatusGrid hasAlert={record.hasAlert} />
      <RecordDossier description={record.description} />
      <RecordArtifactsVault record={record} onShowPreview={() => setShowPreview(true)} />

      <RecordPreviewModal 
        show={showPreview} onClose={() => setShowPreview(false)} 
        record={record} dateStr={dateStr} pdfBlobUrl={pdfBlobUrl} 
      />

      <RecordShareModal 
        show={showShareModal} onClose={() => setShowShareModal(false)} 
        shareLink={shareLink} copied={copied} handleCopy={handleCopy} 
      />
    </div>
  );
};

export default RecordDetailCard;
