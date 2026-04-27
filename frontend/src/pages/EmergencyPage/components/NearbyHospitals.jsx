import React from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';

const HOSPITALS = [
  {
    name: 'Apollo Hospital',
    address: 'Sector 26, Noida',
    distance: '0.8 km',
    open: true,
    eta: '3 min',
  },
  {
    name: 'Fortis Hospital',
    address: 'Sector 62, Noida',
    distance: '2.1 km',
    open: true,
    eta: '7 min',
  },
  {
    name: 'Max Super Specialty',
    address: 'Vaishali, Ghaziabad',
    distance: '3.4 km',
    open: true,
    eta: '11 min',
  },
  {
    name: 'Kailash Hospital',
    address: 'Sector 27, Noida',
    distance: '4.0 km',
    open: false,
    eta: '—',
  },
];

const NearbyHospitals = () => {
  return (
    <div className="bg-white rounded-[14px] border border-red-100 shadow-sm p-5 em-card3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          Nearby Hospitals
        </h2>
        <span className="text-[11px] font-bold text-[#2A7FFF] bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full">
          {HOSPITALS.filter((h) => h.open).length} Open Now
        </span>
      </div>

      <div className="flex flex-col divide-y divide-gray-50">
        {HOSPITALS.map((h, i) => (
          <button
            key={i}
            className="flex items-center gap-4 py-3.5 hover:bg-red-50/50 transition-colors duration-150 rounded-[10px] px-2 -mx-2 group text-left w-full"
          >
            {/* Distance badge */}
            <div className={`w-12 h-12 rounded-[10px] flex flex-col items-center justify-center flex-shrink-0 ${h.open ? 'bg-red-50' : 'bg-gray-100'}`}>
              <MapPin size={14} className={h.open ? 'text-[#D32F2F]' : 'text-gray-400'} />
              <span className={`text-[10px] font-bold mt-0.5 ${h.open ? 'text-[#D32F2F]' : 'text-gray-400'}`}>
                {h.distance}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{h.name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{h.address}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${h.open ? 'bg-green-50 text-[#2A7FFF] border-green-100' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                  {h.open ? 'Open' : 'Closed'}
                </span>
                {h.open && (
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <Clock size={9} />
                    {h.eta} away
                  </span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#D32F2F] transition-colors flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitals;
