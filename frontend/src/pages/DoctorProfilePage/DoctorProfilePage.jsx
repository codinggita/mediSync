import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';

import ProfileSidebar from './components/ProfileSidebar';
import SentimentAnalysis from './components/SentimentAnalysis';
import DoctorClinicalBio from './components/DoctorClinicalBio';
import DoctorLocationCard from './components/DoctorLocationCard';
import DoctorProfileHero from './components/DoctorProfileHero';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = {
    name: 'Dr. Arpit Khanna',
    specialty: 'Senior Cardiologist',
    experience: '12+ Years',
    rating: 4.9,
    reviews: 1240,
    education: 'MBBS, MD - Cardiology (AIIMS Delhi)',
    about: 'Dr. Arpit Khanna is a world-renowned cardiologist with over 12 years of experience in interventional cardiology and heart failure management. He has successfully performed over 2,000+ cardiac procedures and is dedicated to providing personalized care to his patients.',
    availability: 'Mon - Sat (09:00 AM - 05:00 PM)',
    location: 'MediSync Super Specialty Hospital, Sector 62, Noida',
    consultationFee: '₹1200',
    tags: ['Heart Specialist', 'Interventional Cardiology', 'Hyper Tension'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600&h=600',
    phone: '+919876543210'
  };

  const handleVideoConsultation = () => {
    alert('Initiating High-Definition Secure Video Link...');
    navigate('/appointments');
  };

  const handleBookAppointment = () => navigate('/appointments');
  
  const handleMapNavigation = () => {
    const query = encodeURIComponent(doctor.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello ${doctor.name}, I would like to consult regarding my heart health.`);
    window.open(`https://wa.me/${doctor.phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleCall = (e) => {
    e.stopPropagation();
    window.location.href = `tel:${doctor.phone}`;
  };

  return (
    <div className="flex h-screen bg-[#F0F4F8] dark:bg-[#0B1121] transition-colors duration-300 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide pb-24 md:pb-6">
          <DoctorProfileHero 
            name={doctor.name} 
            specialty={doctor.specialty} 
          />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
            <ProfileSidebar 
              doctor={doctor} 
              handleVideoConsultation={handleVideoConsultation} 
              handleBookAppointment={handleBookAppointment} 
              handleWhatsApp={handleWhatsApp} 
              handleCall={handleCall} 
            />

            <div className="xl:col-span-8 space-y-12">
              <DoctorClinicalBio doctor={doctor} />
              <DoctorLocationCard location={doctor.location} onNavigate={handleMapNavigation} />
              <SentimentAnalysis reviews={doctor.reviews} navigate={navigate} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfilePage;


