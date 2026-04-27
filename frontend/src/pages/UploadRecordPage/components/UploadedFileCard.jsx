import React from 'react';
import { X, FileImage, FileText } from 'lucide-react';

const fileIcon = (type) => {
  if (type?.startsWith('image/')) return FileImage;
  return FileText;
};

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadedFileCard = ({ file, progress, onClear }) => {
  const Icon = fileIcon(file.type);

  return (
    <div className="w-full animate-in zoom-in-95 duration-500">
      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 relative group/card">
        <div className="w-20 h-20 rounded-2xl bg-[#2A7FFF] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(42,127,255,0.3)] shrink-0 transform group-hover/card:rotate-6 transition-transform">
          <Icon size={32} />
        </div>
        
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
             <p className="text-[1rem] font-black text-slate-900 dark:text-white truncate">{file.name}</p>
             <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] text-[0.6rem] font-black rounded-full uppercase tracking-widest self-center sm:self-start">Verified Checksum</span>
          </div>
          
          <div className="flex items-center gap-4 text-[0.75rem] font-bold text-slate-400 uppercase tracking-widest mb-4">
            <span>{formatBytes(file.size)}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{file.type.split('/')[1]?.toUpperCase()}</span>
          </div>

          {/* Tactical Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[0.65rem] font-black uppercase tracking-widest">
              <span className={progress === 100 ? 'text-[#2ECC71]' : 'text-[#2A7FFF]'}>
                {progress < 100 ? 'Analyzing Artifact…' : 'Biometrics Parsed'}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#ecf0f3] dark:bg-black/30 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(42,127,255,0.4)]"
                style={{
                  width: `${progress}%`,
                  backgroundColor: progress === 100 ? '#2ECC71' : '#2A7FFF',
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white dark:bg-[#151E32] shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition-all border border-gray-100 dark:border-slate-800"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default UploadedFileCard;
