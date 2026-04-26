import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import DropZone from './components/DropZone';
import UploadMetaForm from './components/UploadMetaForm';
import { UploadCloud, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const UploadRecordPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (meta) => {
    try {
      let fileDataUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

      if (file) {
        // Convert file to base64 for local demo purposes
        fileDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      const recordData = {
        title: meta.hospital || 'Medical Record',
        type: meta.category,
        description: meta.notes,
        hospital: meta.hospital,
        date: meta.date,
        fileUrl: fileDataUrl
      };
      await api.post('/records', recordData);
      navigate('/records');
    } catch (error) {
      console.error('Error uploading record:', error);
    }
  };

  const handleCancel = () => navigate('/dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-300 font-sans relative">
      {/* Floating 3D Artifacts for "Premium" Atmosphere */}
      <div className="absolute top-[15%] left-[10%] animate-float opacity-30 pointer-events-none overflow-hidden h-full w-full z-0">
        <img src="/src/assets/images/medicine_box.png" alt="" className="w-64 object-contain drop-shadow-2xl rotate-12" />
      </div>
      <div className="absolute bottom-[10%] right-[15%] animate-float-slow opacity-15 pointer-events-none z-0">
        <img src="/src/assets/images/first_aid.png" alt="" className="w-56 object-contain drop-shadow-2xl -rotate-12 grayscale" />
      </div>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide pb-24 md:pb-6">
          {/* Page Header - Premium Style */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate(-1)}
                className="w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] active:translate-y-0.5 transition-all"
              >
                <ArrowLeft size={22} />
              </button>

              <div className="w-16 h-16 rounded-[2.2rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-none p-1">
                <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#2A7FFF] to-[#1C71E1] flex items-center justify-center shadow-lg">
                  <UploadCloud size={28} className="text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                  Biological <span className="text-[#2A7FFF]">Vault</span>
                </h1>
                <div className="text-[0.85rem] text-slate-400 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   Secure Artifact Synchronization
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 px-8 py-4 bg-white/40 dark:bg-white/5 backdrop-blur-3xl border border-white/50 dark:border-white/10 rounded-[2rem] shadow-2xl">
               <div className="flex flex-col items-end">
                  <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status Protocol</span>
                  <span className="text-[0.8rem] font-black text-emerald-500 uppercase">End-to-End Encrypted</span>
               </div>
               <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ShieldCheck size={24} />
               </div>
            </div>
          </div>

          {/* Main Layout - Neumorphic Cards */}
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full pb-20">
            {/* Left: Tactical Drop Zone */}
            <div className="flex-1 min-w-0">
              <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[25px_25px_50px_#cbced1,-25px_-25px_50px_#ffffff] dark:shadow-[25px_25px_50px_#0a0f1d] border border-white/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                   <UploadCloud size={120} className="text-slate-900 dark:text-white" />
                </div>

                <div className="flex items-center justify-between mb-10 relative z-10">
                  <h3 className="text-[1.4rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] shadow-inner">
                       <UploadCloud size={20} />
                    </div>
                    Snapshot Selection
                  </h3>
                  <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[0.65rem] font-black uppercase tracking-widest shadow-xl">
                    Awaiting Source
                  </span>
                </div>

                <div className="relative z-10">
                  <DropZone
                    file={file}
                    onFileSelected={setFile}
                    onClear={() => setFile(null)}
                  />
                </div>

                {/* Tactical Tips - Inset Style */}
                <div className="mt-12 p-10 rounded-[3rem] bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-none border border-white/20 relative z-10">
                  <p className="text-[0.9rem] font-black text-[#2A7FFF] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#2A7FFF] rounded-full animate-pulse" /> Clinical Integrity Protocol
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { text: 'Biometric Clarity Verification', desc: 'Ensure all textual metadata is legible.' },
                      { text: 'High-Resolution Rendering', desc: 'Lossless scan ensures better AI analysis.' },
                      { text: 'Doctor Attribution Node', desc: 'Verify medical professional credentials.' }
                    ].map((tip, i) => (
                      <div key={i} className="flex flex-col gap-3 p-6 bg-white/40 dark:bg-white/5 rounded-3xl border border-white/60 dark:border-white/10 hover:shadow-xl transition-all">
                        <span className="text-[0.75rem] font-black text-slate-800 dark:text-white uppercase tracking-tight">{tip.text}</span>
                        <p className="text-[0.65rem] text-slate-400 font-bold leading-relaxed">{tip.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Metadata Form */}
            <div className="w-full lg:w-[480px] shrink-0">
              <UploadMetaForm
                file={file}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadRecordPage;
