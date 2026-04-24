import React from 'react';
import PharmacyHeader from './components/PharmacyHeader';
import PharmacyInfoCard from './components/PharmacyInfoCard';
import PricingMatrix from './components/PricingMatrix';
import LocationSection from './components/LocationSection';
import ReviewsSection from './components/ReviewsSection';
import './PharmacyPage.css';

const PharmacyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-5">
        <PharmacyHeader />
        <PharmacyInfoCard />
        <PricingMatrix />
        <LocationSection />
        <ReviewsSection />
      </div>
    </div>
  );
};

export default PharmacyPage;
