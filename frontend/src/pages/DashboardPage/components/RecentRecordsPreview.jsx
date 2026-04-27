import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronRight, Upload, Loader2, Check, Eye, X, Download, ShieldCheck, Clock } from 'lucide-react';
import api from '../../../utils/api';
import reportPreviewImg from '../../../assets/images/medical_report_preview.png';

const RecentRecordsPreview = ({ 
  isUploading, setIsUploading, uploadSuccess, setUploadSuccess 
}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRecord && selectedRecord.fileUrl && selectedRecord.fileUrl.startsWith('data:application/pdf')) {
      fetch(selectedRecord.fileUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl(url);
        });
    } else if (selectedRecord) {
      setPdfBlobUrl(selectedRecord.fileUrl);
    }
    
    return () => {
      if (pdfBlobUrl && pdfBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [selectedRecord]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await api.get('/records');
        setRecords(data.slice(0, 3)); // show only top 3
      } catch (err) {
        console.error('Failed to fetch records', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const isImage = (url) => {
    if (!url) return false;
    if (url.startsWith('data:image/')) return true;
    return url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex flex-col h-full transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[1.1rem] font-black text-[#1F2937] dark:text-white flex items-center gap-2.5">
          <FileText size={20} className="text-[#F59E0B]" />
          Recent Records
        </h3>
        <button 
          type="button"
          onClick={() => navigate('/records')}
          className="text-[0.75rem] font-black text-[#2A7FFF] hover:underline uppercase tracking-widest"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4 flex-1">
        {records.length > 0 ? records.map((rec, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] transition-all group relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0a0f1d,-2px_-2px_4px_#202d47] shrink-0">
              <FileText size={18} className="text-gray-400 group-hover:text-[#F59E0B] transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-black text-[#1F2937] dark:text-white truncate">{rec.title}</p>
              <p className="text-[0.68rem] text-gray-400 font-bold uppercase mt-0.5">{new Date(rec.createdAt).toLocaleDateString()} · {rec.hospital || 'MediSync Lab'}</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 type="button"
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   setSelectedRecord(rec);
                 }}
                 className="w-8 h-8 rounded-lg bg-white/50 dark:bg-white/5 flex items-center justify-center text-[#2A7FFF] hover:bg-[#2A7FFF] hover:text-white transition-all shadow-sm"
                 title="Quick View"
               >
                  <Eye size={16} />
               </button>
               <ChevronRight size={14} className="text-gray-300" />
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-30 py-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3">
              <FileText size={24} className="text-slate-300" />
            </div>
            <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest leading-relaxed">No medical records <br /> uploaded yet</p>
          </div>
        )}
      </div>

      <div 
        onClick={handleUpload}
        className={`mt-6 p-5 rounded-[24px] ${uploadSuccess ? 'bg-[#ecf0f3] text-emerald-500 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]'} flex flex-col items-center text-center group cursor-pointer transition-all relative overflow-hidden`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
             <Loader2 size={24} className="text-[#F59E0B] animate-spin mb-3" />
             <p className="text-[0.85rem] font-black text-slate-900 dark:text-white">Analyzing Report...</p>
             <p className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase tracking-widest">Applying AI Classification</p>
          </div>
        ) : uploadSuccess ? (
          <div className="flex flex-col items-center animate-in zoom-in duration-500">
             <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                <Check size={24} className="text-white" />
             </div>
             <p className="text-[0.85rem] font-black text-emerald-500">Upload Complete</p>
             <p className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase tracking-widest">Added to Clinical Timeline</p>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center mb-3 group-hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] group-hover:-translate-y-1 transition-all">
              <Upload size={18} className="text-[#F59E0B]" />
            </div>
            <p className="text-[0.85rem] font-black text-[#1F2937] dark:text-white">Quick Upload</p>
            <p className="text-[0.65rem] text-gray-400 font-bold mt-1 uppercase">PDF, PNG or JPG (Max 10MB)</p>
          </>
        )}
      </div>
import DocumentViewerOverlay from './DocumentViewerOverlay';

const RecentRecordsPreview = ({ 
  isUploading, setIsUploading, uploadSuccess, setUploadSuccess 
}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRecord && selectedRecord.fileUrl && selectedRecord.fileUrl.startsWith('data:application/pdf')) {
      fetch(selectedRecord.fileUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl(url);
        });
    } else if (selectedRecord) {
      setPdfBlobUrl(selectedRecord.fileUrl);
    }
    
    return () => {
      if (pdfBlobUrl && pdfBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
    };
  }, [selectedRecord]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await api.get('/records');
        setRecords(data.slice(0, 3)); // show only top 3
      } catch (err) {
        console.error('Failed to fetch records', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (isUploading) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex flex-col h-full transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[1.1rem] font-black text-[#1F2937] dark:text-white flex items-center gap-2.5">
          <FileText size={20} className="text-[#F59E0B]" />
          Recent Records
        </h3>
        <button 
          type="button"
          onClick={() => navigate('/records')}
          className="text-[0.75rem] font-black text-[#2A7FFF] hover:underline uppercase tracking-widest"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4 flex-1">
        {records.length > 0 ? records.map((rec, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] transition-all group relative"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0a0f1d,-2px_-2px_4px_#202d47] shrink-0">
              <FileText size={18} className="text-gray-400 group-hover:text-[#F59E0B] transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-black text-[#1F2937] dark:text-white truncate">{rec.title}</p>
              <p className="text-[0.68rem] text-gray-400 font-bold uppercase mt-0.5">{new Date(rec.createdAt).toLocaleDateString()} · {rec.hospital || 'MediSync Lab'}</p>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 type="button"
                 onClick={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                   setSelectedRecord(rec);
                 }}
                 className="w-8 h-8 rounded-lg bg-white/50 dark:bg-white/5 flex items-center justify-center text-[#2A7FFF] hover:bg-[#2A7FFF] hover:text-white transition-all shadow-sm"
                 title="Quick View"
               >
                  <Eye size={16} />
               </button>
               <ChevronRight size={14} className="text-gray-300" />
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-30 py-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3">
              <FileText size={24} className="text-slate-300" />
            </div>
            <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest leading-relaxed">No medical records <br /> uploaded yet</p>
          </div>
        )}
      </div>

      <div 
        onClick={handleUpload}
        className={`mt-6 p-5 rounded-[24px] ${uploadSuccess ? 'bg-[#ecf0f3] text-emerald-500 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]' : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]'} flex flex-col items-center text-center group cursor-pointer transition-all relative overflow-hidden`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
             <Loader2 size={24} className="text-[#F59E0B] animate-spin mb-3" />
             <p className="text-[0.85rem] font-black text-slate-900 dark:text-white">Analyzing Report...</p>
             <p className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase tracking-widest">Applying AI Classification</p>
          </div>
        ) : uploadSuccess ? (
          <div className="flex flex-col items-center animate-in zoom-in duration-500">
             <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                <Check size={24} className="text-white" />
             </div>
             <p className="text-[0.85rem] font-black text-emerald-500">Upload Complete</p>
             <p className="text-[0.6rem] text-slate-400 font-bold mt-1 uppercase tracking-widest">Added to Clinical Timeline</p>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center mb-3 group-hover:shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] group-hover:-translate-y-1 transition-all">
              <Upload size={18} className="text-[#F59E0B]" />
            </div>
            <p className="text-[0.85rem] font-black text-[#1F2937] dark:text-white">Quick Upload</p>
            <p className="text-[0.65rem] text-gray-400 font-bold mt-1 uppercase">PDF, PNG or JPG (Max 10MB)</p>
          </>
        )}
      </div>

      <DocumentViewerOverlay 
        record={selectedRecord}
        pdfBlobUrl={pdfBlobUrl}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

export default RecentRecordsPreview;
