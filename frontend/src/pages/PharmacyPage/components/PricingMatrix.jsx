import React from 'react';
import { TrendingDown, RefreshCw } from 'lucide-react';

const PRICING_DATA = [
  { dosage: '500mg', form: 'Tablet', qty: 10, price: 45, cheapest: false },
  { dosage: '500mg', form: 'Capsule', qty: 10, price: 38, cheapest: true },
  { dosage: '250mg', form: 'Tablet', qty: 20, price: 52, cheapest: false },
  { dosage: '1000mg', form: 'Tablet', qty: 5, price: 65, cheapest: false },
  { dosage: '500mg', form: 'Syrup 100ml', qty: 1, price: 78, cheapest: false },
];

const PricingMatrix = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 p-6 pharmacy-section">
      {}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-gray-800">Pricing Matrix</h2>
          <p className="text-sm text-gray-400 mt-0.5">Paracetamol — All available variants</p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-green-50 text-[#2A7FFF] text-xs font-bold px-3 py-1.5 rounded-full border border-green-100">
          <RefreshCw size={11} />
          Updated Today
        </span>
      </div>

      {}
      <div className="overflow-x-auto rounded-[10px] border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-gray-100">
              {['Dosage', 'Form', 'Qty', 'Price'].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider ${h === 'Price' ? 'text-right' : 'text-left'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRICING_DATA.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gray-50 pricing-row transition-colors duration-150 ${
                  row.cheapest ? 'bg-green-50/50' : 'bg-white'
                } ${i === PRICING_DATA.length - 1 ? 'border-b-0' : ''}`}
              >
                <td className="px-4 py-3.5 font-semibold text-gray-700">{row.dosage}</td>
                <td className="px-4 py-3.5 text-gray-500">{row.form}</td>
                <td className="px-4 py-3.5 text-gray-500">{row.qty} strips</td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {row.cheapest && (
                      <span className="inline-flex items-center gap-1 bg-[#2A7FFF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        <TrendingDown size={9} />
                        Best Price
                      </span>
                    )}
                    <span
                      className={`font-bold text-[15px] ${row.cheapest ? 'text-[#2A7FFF]' : 'text-gray-800'}`}
                    >
                      ₹{row.price}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingMatrix;
