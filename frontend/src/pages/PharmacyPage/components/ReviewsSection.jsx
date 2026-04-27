import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    time: '2 days ago',
    comment:
      'Excellent service! Got my medicines delivered within 2 hours. The pharmacist was very helpful and patient.',
    helpful: 12,
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Rahul Mehta',
    avatar: 'RM',
    rating: 4,
    time: '1 week ago',
    comment:
      'Good stock availability. Prices are competitive compared to other pharmacies in the area. Highly recommended.',
    helpful: 8,
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Anjali Singh',
    avatar: 'AS',
    rating: 4,
    time: '2 weeks ago',
    comment:
      'Very professional staff. They helped me find a generic alternative that saved a lot of money without compromising quality.',
    helpful: 5,
    color: 'bg-amber-100 text-amber-700',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={13}
        className={i <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 p-6 pharmacy-section">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-800 text-sm">4.2</span>
          </div>
          <span className="text-sm text-gray-400">· 328 reviews</span>
        </div>
      </div>

      {/* Review Cards */}
      <div className="flex flex-col gap-3">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="p-4 rounded-[12px] border border-gray-100 bg-[#F8FAFC]/60 hover:border-green-100 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start gap-3">

              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}
              >
                {review.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                  <span className="text-xs text-gray-400">{review.time}</span>
                </div>
                <div className="mt-0.5 mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#2A7FFF] mt-2.5 transition-colors duration-150 font-medium">
                  <ThumbsUp size={12} />
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
