import React from 'react';
import { Phone, Mail, Clock3, Truck, ShieldCheck } from 'lucide-react';

const INFO_ITEMS = [
  { icon: Phone,       label: 'Phone',    value: '+91 98765 43210' },
  { icon: Mail,        label: 'Email',    value: 'medplus.noida@pharmacy.in' },
  { icon: Clock3,      label: 'Hours',    value: 'Mon–Sun: 8 AM – 10 PM' },
  { icon: Truck,       label: 'Delivery', value: 'Same-day delivery available' },
  { icon: ShieldCheck, label: 'License',  value: 'PHR-UP-2024-00123' },
];

const PharmacyInfoCard = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 overflow-hidden pharmacy-section">
      <div className="flex flex-col md:flex-row">

        {/* Pharmacy Image */}
        <div className="md:w-72 h-52 md:h-auto overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80"
            alt="MedPlus Pharmacy interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-6 flex flex-col gap-5">

          {/* Description */}
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-1.5 uppercase tracking-wide">About this Pharmacy</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              MedPlus Pharmacy is a trusted healthcare provider offering a comprehensive range
              of medicines, health products, and wellness essentials. With certified pharmacists
              and same-day delivery, we ensure you receive the right medication at the best
              price — every time.
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-[10px] border border-gray-100/80"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg flex-shrink-0">
                  <Icon size={14} className="text-[#2A7FFF]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-gray-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyInfoCard;
