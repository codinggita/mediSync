import React from 'react';
import { MessageSquare, Star } from 'lucide-react';

const SentimentAnalysis = ({ reviews, navigate }) => (
  <div className="bg-white dark:bg-[#151E32] rounded-[4rem] p-12 lg:p-16 border border-white dark:border-white/5 shadow-2xl relative">
    <div className="flex items-center justify-between mb-12">
      <h3 className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-5 leading-none">
        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-500">
           <MessageSquare size={28} />
        </div>
        Patient Sentiment
      </h3>
      <button 
        onClick={() => navigate('/appointments')}
        className="px-6 py-3 rounded-2xl bg-slate-50 dark:bg-[#0B1121] text-[0.8rem] font-black text-[#2A7FFF] uppercase tracking-widest hover:bg-blue-50 transition-all border border-slate-100 dark:border-white/5"
      >
        Analyze All {reviews} Reports
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { name: 'Rajesh S.', rating: 5, date: '2 days ago', text: 'Excellent experience. Dr. Khanna is very patient and explains everything clearly.', avatar: 'RS' },
        { name: 'Priya M.', rating: 5, date: '1 week ago', text: 'Highly recommend for heart-related issues. The best in the city!', avatar: 'PM' }
      ].map((review, i) => (
        <div key={i} className="p-8 rounded-[3rem] bg-[#F8FAFC] dark:bg-[#0B1121]/40 border border-white dark:border-white/5 hover:border-amber-400/30 transition-all group/rev">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-[0.9rem] font-black text-slate-600 dark:text-slate-400">
                  {review.avatar}
               </div>
               <div>
                  <p className="text-[1rem] font-black text-slate-900 dark:text-white">{review.name}</p>
                  <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">{review.date}</p>
               </div>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(review.rating)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
            </div>
          </div>
          <p className="text-[1.1rem] font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic group-hover/rev:text-slate-900 dark:group-hover/rev:text-white transition-colors">"{review.text}"</p>
        </div>
      ))}
    </div>
  </div>
);

export default SentimentAnalysis;
