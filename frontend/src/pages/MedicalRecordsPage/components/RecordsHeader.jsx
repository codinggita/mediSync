import React from 'react';
import { History, Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecordsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
          <History size={30} className="text-[#2A7FFF] drop-shadow-[0_4px_8px_rgba(42,127,255,0.3)]" />
        </div>
        <div>
          <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
            Medical Vault
          </h1>
          <p className="text-[0.8rem] font-bold text-gray-400 mt-1 uppercase tracking-widest">
            Secure Biological Data History
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" />
          <input 
            type="text" 
            placeholder="Search vault..." 
            className="pl-12 pr-6 py-3.5 neu-input text-[0.85rem] text-slate-800 dark:text-white w-full sm:w-64"
          />
        </div>
        <button className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] hover:text-[#2A7FFF] transition-all active:shadow-[inset_3px_3px_6px_#cbced1]">
          <Filter size={20} />
        </button>
        <button 
          onClick={() => navigate('/upload-record')}
          className="flex items-center gap-3 px-8 py-3.5 bg-[#2A7FFF] text-white text-[0.9rem] font-black rounded-[1.8rem] shadow-[0_12px_24px_rgba(42,127,255,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          <span className="tracking-tight">Add Record</span>
        </button>
      </div>
    </div>
  );
};

export default RecordsHeader;
