import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../../components/SEO';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import PlatformSection from './components/PlatformSection';
import SolutionsSection from './components/SolutionsSection';
import SecuritySection from './components/SecuritySection';
import DeepDiveSection from './components/DeepDiveSection';
import ClinicalClusters from './components/ClinicalClusters';
import EnterpriseSection from './components/EnterpriseSection';
import PartnerTicker from './components/PartnerTicker';
import LandingFooter from './components/LandingFooter';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from('.platform-content > *', {
        scrollTrigger: { trigger: '#platform', start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });

      
      gsap.from('.solution-card', {
        scrollTrigger: { trigger: '#solutions', start: 'top 70%' },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      });

      
      gsap.from('.security-inner', {
        scrollTrigger: { trigger: '#security', start: 'top 70%' },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      
      gsap.from('.enterprise-content > *', {
        scrollTrigger: { trigger: '#enterprise', start: 'top 80%' },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      
      gsap.from('.footer-content > *', {
        scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });

      
      gsap.to('.security-shield', { rotateY: 360, duration: 20, repeat: -1, ease: 'none' });

      
      const sCards = document.querySelectorAll('.solution-card');
      sCards.forEach((card) => {
        const inner = card.querySelector('.inner-card');
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 10;
          const y = (e.clientY - rect.top - rect.height / 2) / 10;
          gsap.to(inner, { rotateY: x, rotateX: -y, duration: 0.5, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.5 });
        });
      });

      
      const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        gsap.to('.scroll-progress', { width: scrolled + '%', duration: 0.1 });
      };
      window.addEventListener('scroll', updateProgress);

      
      const hSection = document.querySelector('#deep-dive');
      const hContainer = document.querySelector('.horizontal-scroll-container');
      if (hContainer && hSection) {
        const getX = (index) => () => {
          const cards = hContainer.children;
          if (cards.length > 0) {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseFloat(window.getComputedStyle(hContainer).gap) || 0;
            return -(index * (cardWidth + gap));
          }
          return 0;
        };

        const tl = gsap.timeline({ repeat: -1 });
        const slide = (idx, color, prog) => {
          tl.to(hContainer, { x: getX(idx), duration: 1.5, ease: 'power3.inOut', delay: 3 })
            .to(hSection, { backgroundColor: color, duration: 1.5 }, '<')
            .to('.horizontal-progress-bar', { width: prog, duration: 1.5 }, '<');
        };

        slide(1, '#f5f3ff', '25%');
        slide(2, '#ecfdf5', '50%');
        slide(3, '#fffbeb', '75%');
        slide(4, '#fdf2f8', '100%');
        tl.to(hContainer, { x: 0, duration: 1.5, ease: 'power3.inOut', delay: 3 })
          .to(hSection, { backgroundColor: '#ecf0f3', duration: 1.5 }, '<')
          .to('.horizontal-progress-bar', { width: '0%', duration: 1.5 }, '<');
      }

      return () => window.removeEventListener('scroll', updateProgress);
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500 selection:bg-[#2A7FFF] selection:text-white overflow-x-hidden"
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
    >
      <SEO
        title="Welcome to MediSync"
        description="Experience the future of clinical coordination with MediSync."
      />
      <div className="scroll-progress" />
      <LandingNavbar />

      <main>
        <LandingHero />

        {}
        <div className="py-12 bg-white/30 dark:bg-black/10 backdrop-blur-md border-y border-white/40 dark:border-white/5 overflow-hidden relative group">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#ecf0f3] dark:from-[#0B1121] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#ecf0f3] dark:from-[#0B1121] to-transparent z-10 pointer-events-none" />
          <div className="animate-scroll whitespace-nowrap flex items-center gap-20">
            {[1, 2, 3].map((i) =>
              [
                'Global Health Network',
                'Post-Quantum Encryption',
                'ISO 27001 Certified',
                'HIPAA Compliant',
              ].map((text, idx) => (
                <div key={`${i}-${idx}`} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2A7FFF]" />
                  <span className="text-[1rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
                    {text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <PlatformSection />
        <SolutionsSection />
        <SecuritySection />
        <DeepDiveSection />
        <ClinicalClusters />
        <EnterpriseSection />
        <PartnerTicker />
        <LandingFooter />
      </main>
    </div>
  );
};

export default LandingPage;
