import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const LocationSection = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 p-6 pharmacy-section">
      <h2 className="text-base font-bold text-gray-800 mb-4">Location</h2>

      <div className="flex flex-col md:flex-row gap-5">

        {/* Map Preview */}
        <div className="flex-1 min-h-[200px] rounded-[12px] overflow-hidden relative map-wrapper group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
            alt="Map location"
            className="w-full h-full object-cover map-img transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Pin marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-[#2A7FFF] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <MapPin size={18} className="text-white" />
            </div>
            <div className="w-3 h-3 bg-[#2A7FFF] rotate-45 mx-auto -mt-1 shadow-md" />
          </div>

          {/* Address chip */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-white/95 text-[#2A7FFF] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <MapPin size={11} />
              Sector 18, Noida
            </span>
          </div>
        </div>

        {/* Address Card + CTA */}
        <div className="flex flex-col justify-between gap-4 md:w-56">

          {/* Address */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-[10px] border border-gray-100">
              <MapPin size={16} className="text-[#2A7FFF] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Shop No. 14, Market Complex,<br />
                Sector 18, Noida,<br />
                Uttar Pradesh – 201301
              </p>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-2 text-sm text-gray-400 px-1">
              <div className="w-2 h-2 rounded-full bg-[#2A7FFF] pulse-dot" />
              1.2 km from your location
            </div>
          </div>

          {/* Directions Button */}
          <button className="flex items-center justify-center gap-2 bg-[#2A7FFF] text-white text-sm font-bold py-3 rounded-[10px] shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1A66CC] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200">
            <Navigation size={15} />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
