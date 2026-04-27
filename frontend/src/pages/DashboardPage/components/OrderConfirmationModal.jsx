import React from 'react';
import { X, ShoppingBag, ShieldCheck, CheckCircle, Navigation } from 'lucide-react';

const OrderConfirmationModal = ({ pharmacy, orderSuccess, onOrder, onClose, onDirections }) => {
  if (!pharmacy) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
       {!orderSuccess ? (
         <div className="bg-white dark:bg-[#0F172A] w-full max-w-xl rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative animate-in zoom-in-95 duration-300">
            <button onClick={onClose} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white hover:bg-slate-200 transition-all hover:rotate-90 z-20">
              <X size={24} />
            </button>
            
            <div className="p-12">
               <div className="flex items-center gap-6 mb-10">
                  <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-[#2A7FFF] to-[#1A6FFF] flex items-center justify-center text-white shadow-xl shadow-[#2A7FFF]/20">
                     <ShoppingBag size={36} />
                  </div>
                  <div>
                     <h3 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">{pharmacy.name}</h3>
                     <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                           <ShieldCheck size={14} className="text-emerald-500" />
                           <span className="text-emerald-500 font-black uppercase text-[0.65rem] tracking-widest">Verified Store</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-6 mb-10">
                  <div className="p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                     <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest mb-3">Prescription Item</p>
                     <div className="flex items-center justify-between">
                        <h4 className="text-[1.2rem] font-black text-slate-800 dark:text-white">{pharmacy.medName}</h4>
                        <p className="text-[1.5rem] font-black text-[#2A7FFF]">₹{Math.round(pharmacy.price)}</p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col gap-4">
                  <button 
                    onClick={onOrder}
                    className="w-full py-6 bg-gradient-to-r from-[#2A7FFF] to-[#1A6FFF] text-white rounded-[2.2rem] text-[1.1rem] font-black shadow-2xl shadow-[#2A7FFF]/30 hover:scale-[1.02] transition-all"
                  >
                     Secure Order Now
                  </button>
                  <div className="flex gap-4">
                     <button onClick={() => onDirections(pharmacy)} className="flex-1 py-4.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[1.8rem] text-[0.9rem] font-black flex items-center justify-center gap-2">
                        <Navigation size={18} /> Directions
                     </button>
                  </div>
               </div>
            </div>
         </div>
       ) : (
         <div className="bg-white dark:bg-[#0F172A] w-full max-w-sm rounded-[48px] p-12 text-center shadow-2xl border border-white/20 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30">
               <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Order Confirmed!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">Sync Complete.</p>
         </div>
       )}
    </div>
  );
};

export default OrderConfirmationModal;
