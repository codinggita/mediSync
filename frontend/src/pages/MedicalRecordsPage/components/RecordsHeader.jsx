import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecordsBranding from './RecordsBranding';
import RecordsSearch from './RecordsSearch';

const RecordsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
      <RecordsBranding />

      <div className="flex items-center gap-4">
        <RecordsSearch />
        
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
