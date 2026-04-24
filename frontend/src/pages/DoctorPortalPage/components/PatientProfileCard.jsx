import React from 'react';
import { CalendarDays, UserRound, Droplets, FilePlus, Users } from 'lucide-react';

const CONDITIONS = ['Hypertension', 'Type 2 Diabetes', 'Mild Anemia'];

const PatientProfileCard = () => {
  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 doctor-card">
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-[#2A7FFF] flex items-center justify-center shadow-lg text-white text-2xl font-bold select-none">
            AK
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-blue-400 border-2 border-white rounded-full" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Amit Kumar</h2>
            <p className="text-sm text-gray-400 font-medium">Patient ID: MDS-2024-00847</p>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-[#2A7FFF]" />
              42 yrs · 12 Jan 1983
            </span>
            <span className="flex items-center gap-1.5">
              <UserRound size={14} className="text-[#2A7FFF]" />
              Male
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets size={14} className="text-[#D32F2F]" />
              <span className="font-bold text-[#D32F2F]">B+</span>
            </span>
          </div>

          {/* Condition Tags */}
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => (
              <span
                key={c}
                className="px-3 py-0.5 bg-red-50 border border-red-100 text-[#D32F2F] text-xs font-semibold rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] border-[1.5px] border-gray-200 text-gray-600 text-sm font-semibold hover:border-[#2A7FFF] hover:text-[#2A7FFF] transition-all duration-200">
            <Users size={15} />
            View Demographics
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#2A7FFF] text-white text-sm font-semibold shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1A66CC] hover:-translate-y-[1px] transition-all duration-200">
            <FilePlus size={15} />
            Add Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
