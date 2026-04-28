import React from 'react';
import firstAidImg from '../../../assets/images/first_aid.png';

const EmptyRecordDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] p-10 text-center animate-in fade-in duration-700">
      <div className="w-48 h-48 mb-8 relative group">
        <div className="absolute inset-0 bg-[#2A7FFF]/10 rounded-full blur-3xl group-hover:bg-[#2A7FFF]/20 transition-all duration-500" />
        <img 
          src={firstAidImg} 
          alt="Vault" 
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl animate-bounce duration-[4s]" 
        />
      </div>
      <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white mb-2">
        Select a biological record
      </h3>
      <p className="text-[0.9rem] font-medium text-slate-400 max-w-[280px]">
        Choose a snapshot from the timeline to view detailed clinical analysis and secured documents.
      </p>
    </div>
  );
};

export default EmptyRecordDetail;
