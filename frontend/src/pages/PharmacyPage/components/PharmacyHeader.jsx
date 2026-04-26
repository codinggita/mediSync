import React, { useState } from 'react';
import { Star, Bookmark, Send, CheckCircle, MapPin, Clock } from 'lucide-react';

const PharmacyHeader = () => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 p-6 pharmacy-section">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">

        {/* Left — Info */}
        <div className="flex flex-col gap-2.5">

          {/* Stock Badge */}
          <span className="inline-flex items-center gap-1.5 bg-green-50 text-[#2A7FFF] text-xs font-bold px-3 py-1 rounded-full w-fit border border-green-100">
            <CheckCircle size={12} />
            In Stock
          </span>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            MedPlus Pharmacy
          </h1>

          {/* Location & Hours */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#2A7FFF]" />
              Sector 18, Noida, UP
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#2A7FFF]" />
              Open · Closes 10 PM
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className={i <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">4.2</span>
            <span className="text-sm text-gray-400">(328 reviews)</span>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] border-[1.5px] font-semibold text-sm transition-all duration-200 ${
              saved
                ? 'bg-green-50 border-[#2A7FFF] text-[#2A7FFF]'
                : 'bg-white border-gray-200 text-gray-600 hover:border-[#2A7FFF] hover:text-[#2A7FFF]'
            }`}
          >
            <Bookmark size={16} className={saved ? 'fill-[#2A7FFF]' : ''} />
            {saved ? 'Saved' : 'Save'}
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#2A7FFF] text-white font-semibold text-sm shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1A66CC] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200">
            <Send size={15} />
            Send Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyHeader;
