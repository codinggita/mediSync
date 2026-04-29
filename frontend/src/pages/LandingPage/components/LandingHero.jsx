import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import medicalHeroImg from '../../../assets/images/medical_hero.png';

const LandingHero = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-text-child', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power4.out',
      })
        .from(
          '.hero-image-container',
          {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'expo.out',
          },
          '-=0.4'
        )
        .from(
          '.hero-badge',
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        );

      // Continuous float animation for badges
      gsap.to('.floating-badge', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5,
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={comp}
      className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-6 sm:px-8 relative overflow-hidden bg-[#ecf0f3] dark:bg-[#090E1A]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2A7FFF]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2ECC71]/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="hero-text-child inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#151E32] nm-button text-[#2A7FFF] text-[0.6rem] sm:text-[0.7rem] font-black uppercase tracking-[0.2em] mb-8 border border-white/40">
            <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
            System Status: Optimal
          </div>
          <h1 className="hero-text-child text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-black text-slate-900 dark:text-white leading-[1] sm:leading-[0.95] mb-6 sm:mb-8 tracking-tighter">
            Next-Gen <br className="hidden sm:block" />
            <span className="text-[#2A7FFF]">Clinical</span> <br className="hidden sm:block" />
            Protocol.
          </h1>
          <p className="hero-text-child text-[1rem] sm:text-[1.2rem] font-medium text-slate-500 dark:text-slate-400 mb-10 sm:mb-14 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Synchronize specialist consultations, pharmacy fulfillments, and patient diagnostics in
            a unified, post-quantum encrypted environment.
          </p>

          <div className="hero-text-child flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-7 nm-button text-[#2A7FFF] dark:text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-[0.9rem] sm:text-[1.1rem] uppercase tracking-[0.2em] hover:-translate-y-2 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              Start Protocol{' '}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-7 nm-button text-slate-900 dark:text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-[0.9rem] sm:text-[1.1rem] uppercase tracking-[0.2em] hover:bg-white/40 transition-all">
              Watch Vision
            </button>
          </div>
        </div>

        <div className="hero-image-container w-full lg:w-1/2 relative group mt-12 lg:mt-0">
          {/* Neumorphic Image Wrapper */}
          <div className="relative p-6 sm:p-10 nm-flat rounded-[3rem] sm:rounded-[5rem] border border-white/40 dark:border-white/5 transition-transform duration-700 hover:scale-[1.02]">
            <div className="rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden nm-inset p-3 sm:p-4 relative group">
              <img
                src={medicalHeroImg}
                alt="Clinical Visualization"
                className="w-full h-auto rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2A7FFF]/20 to-transparent z-20 pointer-events-none" />
            </div>

            {/* Floating Tactical Badges - Hidden on very small screens to avoid clutter */}
            <div className="hidden sm:block hero-badge floating-badge absolute -top-6 -right-6 p-6 nm-flat rounded-[2rem] border border-white/60 z-30">
              <Shield size={32} className="text-[#2ECC71]" />
            </div>
            <div className="hidden sm:block hero-badge floating-badge absolute -bottom-10 -left-10 p-8 nm-flat rounded-[3rem] border border-white/60 z-30">
              <Activity size={40} className="text-[#2A7FFF]" />
            </div>

            <div className="hero-badge absolute -bottom-6 right-6 sm:top-1/2 sm:-right-12 sm:-translate-y-1/2 bg-white/90 dark:bg-[#151E32]/90 p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-white/40 z-40">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2 sm:mb-4">
                <Activity size={18} sm:size={24} />
              </div>
              <p className="text-[1rem] sm:text-[1.2rem] font-black text-slate-900 dark:text-white">
                99.9%
              </p>
              <p className="text-[0.5rem] sm:text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">
                Sync Accuracy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
