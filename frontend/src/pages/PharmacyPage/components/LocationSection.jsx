import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const LocationSection = () => {
  // Simpler and more reliable Google Maps embed URL
  const googleMapEmbedUrl =
    'https://www.google.com/maps?q=Sector+18+Noida+Uttar+Pradesh+India&output=embed';

  return (
    <div className="bg-white dark:bg-[#151E32] rounded-[14px] shadow-sm border border-gray-100 dark:border-slate-800 p-6 pharmacy-section transition-colors duration-300">
      <h2 className="text-base font-extrabold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <MapPin size={18} className="text-[#2A7FFF]" />
        Location
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Real Interactive Map */}
        <div className="flex-1 h-[280px] sm:h-[320px] rounded-[16px] overflow-hidden relative shadow-inner border border-gray-100 dark:border-slate-700 bg-gray-100 dark:bg-[#0B1121]">
          <iframe
            src={googleMapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[0.1] hover:grayscale-0 transition-all duration-500"
            title="Pharmacy Location Map"
          ></iframe>

          {/* Address chip overlay */}
          <div className="absolute bottom-4 left-4 pointer-events-none">
            <span className="bg-white/95 dark:bg-[#151E32]/95 text-[#2A7FFF] text-[0.7rem] font-black px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md border border-gray-100 dark:border-slate-700">
              <div className="w-2 h-2 rounded-full bg-[#2A7FFF] animate-pulse" />
              Sector 18, Noida
            </span>
          </div>
        </div>

        {/* Address Card + CTA */}
        <div className="flex flex-col justify-between gap-5 lg:w-[280px] shrink-0">
          {/* Address Details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-[#0B1121] rounded-[14px] border border-gray-100 dark:border-slate-800 shadow-sm transition-all hover:border-[#2A7FFF]/30">
              <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#2A7FFF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-bold text-gray-700 dark:text-slate-200 leading-relaxed">
                  Shop No. 14, Market Complex,
                  <br />
                  <span className="text-[#2A7FFF] font-extrabold">Sector 18, Noida,</span>
                  <br />
                  Uttar Pradesh – 201301
                </p>
              </div>
            </div>

            {/* Distance Info */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-[0.8rem] font-bold text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] shadow-[0_0_8px_#2ECC71] animate-pulse" />
                1.2 km from your location
              </div>
              <button className="text-[0.7rem] font-black text-[#2A7FFF] hover:underline flex items-center gap-1">
                More Info <ExternalLink size={10} />
              </button>
            </div>
          </div>

          {/* Directions Button */}
          <button className="group relative flex items-center justify-center gap-3 bg-[#2A7FFF] hover:bg-[#1565C0] text-white text-[0.9rem] font-black py-4 rounded-[14px] shadow-[0_8px_20px_rgba(42,127,255,0.25)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]">
            <Navigation size={18} className="group-hover:rotate-12 transition-transform" />
            Get Directions
            <div className="absolute inset-0 rounded-[14px] bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
