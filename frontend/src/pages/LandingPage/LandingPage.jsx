import React, { useLayoutEffect, useRef } from 'react';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import { ArrowRight, Zap, Shield, HeartPulse, Activity, Plus, Building2, Pill, Users, Mail, ArrowUp, FileText, Scale, Lock, CircleCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Platform Section Animation
      gsap.from(".platform-content > *", {
        scrollTrigger: {
          trigger: "#platform",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Solutions Cards Animation
      gsap.from(".solution-card", {
        scrollTrigger: {
          trigger: "#solutions",
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });

      // Security Section
      gsap.from(".security-inner", {
        scrollTrigger: {
          trigger: "#security",
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Enterprise Section
      gsap.from(".enterprise-content > *", {
        scrollTrigger: {
          trigger: "#enterprise",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
      // Footer Animation
      gsap.from(".footer-content > *", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Security Shield 3D Rotation
      gsap.to(".security-shield", {
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Solution Cards 3D Tilt Interaction
      const sCards = document.querySelectorAll(".solution-card");
      sCards.forEach(card => {
        const inner = card.querySelector(".inner-card");
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / 10;
          const y = (e.clientY - rect.top - rect.height / 2) / 10;
          gsap.to(inner, {
            rotateY: x,
            rotateX: -y,
            duration: 0.5,
            ease: "power2.out"
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.5 });
        });
      });

      // Scroll Progress Logic
      const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        gsap.to(".scroll-progress", { width: scrolled + "%", duration: 0.1 });
      };
      window.addEventListener("scroll", updateProgress);

      // Horizontal Auto-Scroll Animation (Every 3 seconds)
      const hSection = document.querySelector("#deep-dive");
      const hContainer = document.querySelector(".horizontal-scroll-container");
      if (hContainer && hSection) {
        // Calculate exact scroll distance dynamically using card width + gap
        const getX = (index) => {
          return () => {
             const cards = hContainer.children;
             if (cards && cards.length > 0) {
                const cardWidth = cards[0].offsetWidth;
                const gap = parseFloat(window.getComputedStyle(hContainer).gap) || 0;
                return -(index * (cardWidth + gap));
             }
             return 0;
          };
        };
        
        const tl = gsap.timeline({ repeat: -1 });

        // Slide 2
        tl.to(hContainer, { x: getX(1), duration: 1.5, ease: "power3.inOut", delay: 3 })
          .to(hSection, { backgroundColor: "#f5f3ff", duration: 1.5 }, "<")
          .to(".horizontal-progress-bar", { width: "25%", duration: 1.5 }, "<");

        // Slide 3
        tl.to(hContainer, { x: getX(2), duration: 1.5, ease: "power3.inOut", delay: 3 })
          .to(hSection, { backgroundColor: "#ecfdf5", duration: 1.5 }, "<")
          .to(".horizontal-progress-bar", { width: "50%", duration: 1.5 }, "<");

        // Slide 4
        tl.to(hContainer, { x: getX(3), duration: 1.5, ease: "power3.inOut", delay: 3 })
          .to(hSection, { backgroundColor: "#fffbeb", duration: 1.5 }, "<")
          .to(".horizontal-progress-bar", { width: "75%", duration: 1.5 }, "<");

        // Slide 5
        tl.to(hContainer, { x: getX(4), duration: 1.5, ease: "power3.inOut", delay: 3 })
          .to(hSection, { backgroundColor: "#fdf2f8", duration: 1.5 }, "<")
          .to(".horizontal-progress-bar", { width: "100%", duration: 1.5 }, "<");

        // Back to Slide 1
        tl.to(hContainer, { x: 0, duration: 1.5, ease: "power3.inOut", delay: 3 })
          .to(hSection, { backgroundColor: "#ecf0f3", duration: 1.5 }, "<")
          .to(".horizontal-progress-bar", { width: "0%", duration: 1.5 }, "<");

        // Subtle background text movement
        gsap.to(".parallax-bg-text", {
          x: -200,
          scrollTrigger: {
            trigger: hSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      return () => {
        window.removeEventListener("scroll", updateProgress);
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={mainRef} 
      className="min-h-screen bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500 font-sans selection:bg-[#2A7FFF] selection:text-white overflow-x-hidden"
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
    >
      <SEO 
        title="Welcome to MediSync" 
        description="Experience the future of clinical coordination with MediSync. Real-time patient monitoring, secure clinical records, and integrated pharmacy routing."
      />
      <div className="scroll-progress" />
      <LandingNavbar />
      
      <main>
        <LandingHero />

        {/* 🚀 Infinite Scroll Network Ticker */}
        <div className="py-12 bg-white/30 dark:bg-black/10 backdrop-blur-md border-y border-white/40 dark:border-white/5 overflow-hidden relative group">
           <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#ecf0f3] dark:from-[#0B1121] to-transparent z-10 pointer-events-none" />
           <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#ecf0f3] dark:from-[#0B1121] to-transparent z-10 pointer-events-none" />
           
           <div className="animate-scroll whitespace-nowrap flex items-center gap-20">
              {[
                'Global Health Network', 'Post-Quantum Encryption', 'ISO 27001 Certified', 'HIPAA Compliant',
                'Global Health Network', 'Post-Quantum Encryption', 'ISO 27001 Certified', 'HIPAA Compliant',
                'Global Health Network', 'Post-Quantum Encryption', 'ISO 27001 Certified', 'HIPAA Compliant'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#2A7FFF]" />
                   <span className="text-[1rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">{text}</span>
                </div>
              ))}
           </div>
        </div>

        {/* 🧬 Platform Section */}
        <section id="platform" className="py-6 px-8 relative overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#2ECC71]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
             <div className="flex flex-col lg:flex-row items-center gap-32">
                <div className="lg:w-[45%] platform-content">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.7rem] font-black uppercase tracking-[0.2em] mb-8 border border-[#2A7FFF]/20">
                      The Core Protocol
                   </div>
                   <h2 className="text-[3rem] font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                      The Operating System <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-300">for Modern Care.</span>
                   </h2>
                   <p className="text-[1.15rem] font-medium text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-xl">
                      MediSync isn't just a database; it's an intelligent coordination layer. We unify fragmented clinical streams into a single, real-time operating environment for practitioners and patients.
                   </p>
                   
                   <div className="grid grid-cols-1 gap-6">
                      {[
                        { title: 'Real-time Vitals Stream', desc: 'Zero-latency synchronization of patient metrics.' },
                        { title: 'Distributed Health Ledger', desc: 'Immutable, secure sharing across verified nodes.' },
                        { title: 'AI Diagnostics Overlay', desc: 'Predictive insights integrated into every view.' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-6 group">
                           <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#151E32] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#2ECC71] group-hover:bg-[#2ECC71] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                              <Zap size={20} />
                           </div>
                           <div>
                              <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1">{item.title}</h4>
                              <p className="text-[0.85rem] font-bold text-slate-400 uppercase tracking-wide">{item.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="lg:w-[55%] relative">
                   {/* 🖥️ Advanced Dashboard Mockup - NEUMORPHIC UPGRADE */}
                   <div className="relative z-10 p-8 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] nm-flat border border-white/20 dark:border-white/5 shadow-2xl">
                      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] overflow-hidden nm-inset p-8">
                         {/* Mock UI Header */}
                         <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF] nm-button flex items-center justify-center text-white shadow-lg">
                                  <Activity size={24} />
                               </div>
                               <div>
                                  <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-0.5">Patient Monitor</p>
                                  <h4 className="text-sm font-black text-slate-900 dark:text-white">ID: 982-SYNC-7</h4>
                               </div>
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-black uppercase tracking-widest border border-emerald-500/20">Active Sync</div>
                         </div>

                         {/* Mock UI Grid */}
                         <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="p-6 rounded-3xl nm-flat">
                               <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest mb-4">Heart Rate</p>
                               <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                                  72 <span className="text-[0.7rem] text-slate-400">BPM</span>
                               </div>
                               <div className="mt-4 h-10 w-full flex items-end gap-1">
                                  {[40, 70, 45, 90, 65, 30, 85, 55].map((h, i) => (
                                    <div key={i} className="flex-1 bg-[#2A7FFF]/20 rounded-full" style={{ height: `${h}%` }} />
                                  ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-3xl nm-flat">
                               <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest mb-4">Blood Glucose</p>
                               <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                                  5.4 <span className="text-[0.7rem] text-slate-400">mmol/L</span>
                               </div>
                               <div className="mt-4 flex items-center gap-2">
                                  <div className="flex-1 h-1.5 nm-inset rounded-full overflow-hidden">
                                     <div className="h-full w-[65%] bg-[#2ECC71]" />
                                  </div>
                               </div>
                            </div>
                         </div>

                         {/* Mock UI Bottom */}
                         <div className="p-6 rounded-3xl nm-flat">
                            <div className="flex items-center justify-between mb-4">
                               <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-widest">Recent Protocols</h5>
                               <Plus size={16} className="text-slate-400" />
                            </div>
                            <div className="space-y-3">
                               {[
                                 { t: 'Cardio Checkup', s: 'Verified' },
                                 { t: 'Neurology Sync', s: 'Pending' }
                               ].map((p, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 rounded-2xl nm-inset">
                                    <span className="text-[0.7rem] font-bold text-slate-700 dark:text-slate-300">{p.t}</span>
                                    <span className={`text-[0.5rem] font-black uppercase px-2 py-1 rounded-md ${p.s === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{p.s}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Floating Decorations */}
                   <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#2A7FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                   <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#2ECC71] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                   
                   <div className="absolute top-20 -right-10 bg-white dark:bg-[#151E32] p-6 rounded-[2rem] shadow-2xl border border-white/40 dark:border-slate-800 z-20 animate-bounce group hover:scale-110 transition-transform">
                      <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] mb-2">
                         <Shield size={20} />
                      </div>
                      <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Secure Sync</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* 💡 Solutions Section */}
        <section id="solutions" className="py-6 px-8 bg-[#ecf0f3] dark:bg-black/10 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[0.7rem] font-black uppercase tracking-[0.2em] mb-6 border border-[#8B5CF6]/20">The Ecosystem</div>
              <h2 className="text-[3rem] font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">Integrated <span className="text-[#8B5CF6]">Verticals.</span></h2>
              <p className="text-[1.1rem] font-bold text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto opacity-60">Modular power. Unified control.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { icon: Zap, title: 'Instant Sync', desc: 'Real-time record sharing with millisecond latency across verified specialist nodes.', color: '#2A7FFF' },
                { icon: Shield, title: 'Military Grade', desc: 'End-to-end encryption for all biological data and prescription artifacts.', color: '#2ECC71' },
                { icon: HeartPulse, title: 'Patient Hub', desc: 'A unified tactical dashboard for all your medical history and clinical stats.', color: '#F59E0B' },
                { icon: Building2, title: 'Clinic OS', desc: 'Distributed management system for specialist clinics and hospital nodes.', color: '#8B5CF6' },
                { icon: Pill, title: 'Smart Pharmacy', desc: 'Automated prescription routing and fulfillment with real-time stock sync.', color: '#EC4899' },
                { icon: Users, title: 'Global ID', desc: 'Decentralized identity protocol for seamless clinical mobility worldwide.', color: '#06B6D4' }
              ].map((f, i) => (
                <div key={i} className="solution-card group relative cursor-pointer" style={{ perspective: '1000px' }}>
                   <div 
                      className="relative nm-flat p-12 md:p-16 rounded-[4rem] border border-white/60 dark:border-white/5 transition-all duration-300 transform-gpu overflow-hidden inner-card"
                      style={{ transformStyle: 'preserve-3d' }}
                   >
                      {/* Decorative inner light */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      <div className="w-24 h-24 rounded-[2.5rem] nm-button flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500" style={{ color: f.color, transform: 'translateZ(30px)' }}>
                        <f.icon size={44} />
                      </div>
                      
                      <h3 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-6 tracking-tight" style={{ transform: 'translateZ(20px)' }}>{f.title}</h3>
                      <p className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-10" style={{ transform: 'translateZ(10px)' }}>{f.desc}</p>
                      
                      <div className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] group/link cursor-pointer" style={{ color: f.color, transform: 'translateZ(20px)' }}>
                         <span className="group-hover/link:mr-2 transition-all">Explore Module</span> <ArrowRight size={16} />
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔒 Security Section */}
        <section id="security" className="py-6 px-8">
           <div className="max-w-7xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71] rounded-[6rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
              
              <div className="security-inner relative bg-[#1F2937] dark:bg-[#151E32] rounded-[3rem] p-10 md:p-12 overflow-hidden border border-white/5 shadow-2xl">
                 {/* Cyber Grid Pattern */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                 
                 <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-[#2ECC71]/10 flex items-center justify-center text-[#2ECC71] mb-12 animate-pulse security-shield">
                       <Shield size={48} />
                    </div>
                    <h2 className="text-[3.5rem] font-black text-white mb-6 tracking-tighter leading-none max-w-4xl">Security Without <span className="text-[#2ECC71]">Compromise.</span></h2>
                    <p className="text-[1.3rem] font-medium text-slate-400 mb-16 max-w-3xl leading-relaxed">
                       MediSync utilizes post-quantum encryption standards to protect patient identity. Our zero-knowledge architecture ensures that even we cannot access your clinical history.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                       {['AES-256 Bit Encryption', 'Zero-Knowledge Proofs', 'Multi-Layer Biometrics', 'SOC2 Type II'].map(item => (
                          <div key={item} className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl text-white text-[0.8rem] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
                             {item}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 📑 Horizontal Feature Deep-Dive - PERFECTED AUTO-SCROLL */}
        <section id="deep-dive" className="min-h-screen w-full relative bg-[#ecf0f3] dark:bg-black/20 overflow-hidden flex flex-col justify-center py-20">
           {/* Background Parallax Elements */}
           <div className="absolute inset-0 pointer-events-none z-0">
              <span className="absolute top-[35%] left-[-5%] text-[18rem] font-black text-slate-900/5 dark:text-white/5 uppercase tracking-tighter select-none parallax-bg-text">Neural</span>
              <span className="absolute top-[45%] right-[-5%] text-[18rem] font-black text-slate-900/5 dark:text-white/5 uppercase tracking-tighter select-none parallax-bg-text">Protocol</span>
              <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-[#2A7FFF]/5 blur-[100px] animate-pulse" />
              <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#2ECC71]/5 blur-[120px] animate-pulse" />
           </div>

           <div className="relative w-full z-10 flex flex-col justify-center">
              {/* Scroll Progress Bar */}
              <div className="absolute top-[-5rem] left-0 w-full h-1 bg-slate-200 dark:bg-white/5 z-50">
                 <div className="h-full bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71] w-0 horizontal-progress-bar shadow-[0_0_10px_#2A7FFF]" />
              </div>

              <div className="max-w-7xl mx-auto px-8 text-center mb-16 relative z-20">
                 <h2 className="text-[4rem] md:text-[5rem] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">Unrivaled <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">Power.</span></h2>
                 <p className="text-[1.2rem] md:text-[1.4rem] font-medium text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Precision-engineered protocols for the modern clinical era. Swipe to explore the technical depth.
                 </p>
              </div>

              <div className="horizontal-scroll-container flex gap-24 px-[10vw] md:px-[20vw] lg:px-[25vw] items-center pb-32">
                 {[
                   { 
                     title: 'Neural Diagnosis Sync', 
                     subtitle: 'AI AT THE CORE', 
                     color: '#2A7FFF', 
                     icon: Zap,
                     desc: 'Real-time biological data processing using 128-bit neural hashing for instant diagnostic correlation across clinical nodes.',
                     stat: '0.2ms Latency'
                   },
                   { 
                     title: 'Global Clinical Ledger', 
                     subtitle: 'DECENTRALIZED DATA', 
                     color: '#8B5CF6', 
                     icon: Shield,
                     desc: 'Immutable distributed clinical history protocol ensuring patient mobility without compromising data integrity or security.',
                     stat: 'Zero-Knowledge'
                   },
                   { 
                     title: 'Tactical Throughput', 
                     subtitle: 'SCALE WITHOUT LIMITS', 
                     color: '#2ECC71', 
                     icon: Activity,
                     desc: 'Massive parallel processing for hospital-wide operations, handling millions of clinical events with military-grade precision.',
                     stat: '10M+ RPS'
                   },
                   {
                     title: 'Quantum Security Shield',
                     subtitle: 'IMPREGNABLE VAULT',
                     color: '#F59E0B',
                     icon: Lock,
                     desc: 'Post-quantum encryption algorithms securing every single data transmission across the MediSync network ecosystem.',
                     stat: 'AES-256 GCM'
                   },
                   {
                     title: 'Predictive Care Analytics',
                     subtitle: 'FUTURE INSIGHTS',
                     color: '#EC4899',
                     icon: HeartPulse,
                     desc: 'Advanced AI models forecasting patient health trajectories, enabling preemptive interventions before critical events.',
                     stat: '99.9% ACCURACY'
                   }
                 ].map((card, i) => (
                   <div key={i} className="min-w-[80vw] md:min-w-[60vw] lg:min-w-[50vw] h-[65vh] flex-shrink-0 group">
                      <div className="nm-flat p-2 rounded-[4rem] border border-white/60 dark:border-white/10 shadow-2xl overflow-hidden bg-white/50 dark:bg-[#151E32]/80 backdrop-blur-xl h-full relative transition-transform duration-700 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(42,127,255,0.1)]">
                         {/* Subtle Inner Glow */}
                         <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                         
                         <div className="p-12 md:p-16 flex flex-col justify-between h-full relative z-10">
                            <div>
                               <div className="flex items-center gap-4 mb-8">
                                  <div className="w-16 h-16 rounded-2xl nm-inset flex items-center justify-center relative overflow-hidden shrink-0">
                                     <div className="absolute inset-0 opacity-20 blur-xl" style={{ backgroundColor: card.color }} />
                                     <card.icon size={28} style={{ color: card.color }} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <span className="text-[0.75rem] font-black uppercase tracking-[0.4em]" style={{ color: card.color }}>{card.subtitle}</span>
                               </div>
                               <h3 className="text-[2.5rem] md:text-[3.5rem] font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">{card.title}</h3>
                               <p className="text-[1.1rem] md:text-[1.2rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                                  {card.desc}
                               </p>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                               <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full nm-inset text-slate-900 dark:text-white">
                                  <div className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: card.color }} />
                                  <span className="text-[0.75rem] font-black uppercase tracking-[0.2em]">{card.stat}</span>
                               </div>
                               <div className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.3em] opacity-50">
                                  Module 0{i + 1}
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* 📊 Bottom Clinical Status Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-white/40 dark:bg-[#0B1121]/80 backdrop-blur-2xl border-t border-white/60 dark:border-white/10 py-6">
                 <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-8 md:gap-16">
                       {[
                         { label: 'Throughput', val: 'Active' },
                         { label: 'Sync Status', val: '100%' },
                         { label: 'Protocol', val: 'v4.2.0' }
                       ].map(stat => (
                         <div key={stat.label} className="text-center md:text-left">
                            <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-1.5">{stat.label}</p>
                            <h4 className="text-[0.8rem] font-black text-slate-900 dark:text-white uppercase">{stat.val}</h4>
                         </div>
                       ))}
                    </div>
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2ECC71]/10 border border-[#2ECC71]/20">
                       <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
                       <span className="text-[0.65rem] font-black text-[#2ECC71] uppercase tracking-widest">System Nominal</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 🌈 Vibrant Clinical Clusters */}
        <section className="py-20 px-8 relative overflow-hidden bg-white/30 dark:bg-black/20">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { 
                     title: 'Pulse Analytics', 
                     icon: HeartPulse, 
                     grad: 'from-[#3B82F6] to-[#8B5CF6]', 
                     glow: 'rgba(59, 130, 246, 0.5)',
                     desc: 'High-fidelity physiological data streams synchronized in real-time.'
                   },
                   { 
                     title: 'Genetic Protocol', 
                     icon: Shield, 
                     grad: 'from-[#10B981] to-[#3B82F6]', 
                     glow: 'rgba(16, 185, 129, 0.5)',
                     desc: 'Post-quantum encryption for genomic sequences and clinical artifacts.'
                   },
                   { 
                     title: 'Neural Bridge', 
                     icon: Zap, 
                     grad: 'from-[#F59E0B] to-[#EF4444]', 
                     glow: 'rgba(245, 158, 11, 0.5)',
                     desc: 'Direct specialist consultation bridge with low-latency neural hashing.'
                   }
                 ].map((cluster, i) => (
                   <div key={i} className="group relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${cluster.grad} rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                      <div className="relative nm-flat p-12 rounded-[4rem] border border-white/60 dark:border-white/5 transition-all duration-500 hover:-translate-y-4 overflow-hidden group/card">
                         <div className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${cluster.grad} flex items-center justify-center text-white mb-10 shadow-[0_20px_40px_${cluster.glow}] group-hover/card:scale-110 transition-transform duration-700`}>
                            <cluster.icon size={36} />
                         </div>
                         <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{cluster.title}</h3>
                         <p className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                            {cluster.desc}
                         </p>
                         <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${cluster.grad} w-[70%] group-hover/card:w-full transition-all duration-1000`} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 🏢 Enterprise Section */}
        <section id="enterprise" className="py-10 px-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-[#2A7FFF]/5 to-transparent pointer-events-none" />
           
           <div className="max-w-5xl mx-auto relative z-10 enterprise-content">
              <h2 className="text-[4rem] font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">Scaled for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">Global Healthcare.</span></h2>
              <p className="text-[1.4rem] font-medium text-slate-500 dark:text-slate-400 mb-20 leading-relaxed max-w-3xl mx-auto">
                 From individual practices to national health networks, MediSync scales to meet the demands of enterprise-level clinical operations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8 mb-32">
                 <button className="px-16 py-8 bg-[#2A7FFF] text-white rounded-[2.5rem] font-black text-[1.2rem] uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(42,127,255,0.4)] nm-button hover:bg-[#1C71E1] hover:-translate-y-2 active:scale-95 transition-all">Request Demo</button>
                 <button className="px-16 py-8 bg-[#ecf0f3] dark:bg-white/5 text-slate-900 dark:text-white rounded-[2.5rem] font-black text-[1.2rem] uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10 nm-button hover:bg-slate-50 transition-all">Read Whitepaper</button>
              </div>

              {/* 📊 Global Stats Bar - NEUMORPHIC UPGRADE */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-12 rounded-[3rem] nm-inset border border-white/20 dark:border-white/5">
                 {[
                   { label: 'Uptime', val: '99.99%' },
                   { label: 'Security', val: 'Elite' },
                   { label: 'Latency', val: '<2ms' },
                   { label: 'Nodes', val: '12.4k' }
                 ].map(s => (
                   <div key={s.label}>
                      <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{s.label}</p>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white">{s.val}</h4>
                   </div>
                 ))}
              </div>
           </div>
        </section>

         {/* 🌐 Global Ecosystem Ticker */}
         <section className="py-20 bg-white/20 dark:bg-black/10 overflow-hidden relative border-t border-white/20 dark:border-white/5" style={{ perspective: '1000px' }}>
            <div className="max-w-7xl mx-auto px-8 mb-12">
               <h3 className="text-[0.7rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-4">Partner Ecosystem</h3>
               <div className="w-20 h-1 bg-[#2A7FFF]/20" />
            </div>
            
            <div className="animate-scroll whitespace-nowrap flex items-center gap-32">
               {[
                 { name: 'Mayo Clinic Connect', color: '#FF4D4D' },
                 { name: 'Johns Hopkins Data', color: '#2A7FFF' },
                 { name: 'NHS Digital Sync', color: '#2ECC71' },
                 { name: 'Cleveland Health', color: '#F1C40F' },
                 { name: 'Stanford Medicine', color: '#9B59B6' },
                 { name: 'Mayo Clinic Connect', color: '#FF4D4D' },
                 { name: 'Johns Hopkins Data', color: '#2A7FFF' },
                 { name: 'NHS Digital Sync', color: '#2ECC71' },
                 { name: 'Cleveland Health', color: '#F1C40F' },
                 { name: 'Stanford Medicine', color: '#9B59B6' }
               ].map((partner, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer partner-card">
                    <div 
                      className="w-20 h-20 rounded-3xl nm-button flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative"
                      style={{ boxShadow: `10px 10px 20px #b8bfc7, -10px -10px 20px #ffffff, 0 0 30px ${partner.color}10` }}
                    >
                       {/* Neuro-Morphic Indicator Dot */}
                       <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-200 shadow-inner group-hover:bg-[#2ECC71] transition-colors duration-500" />
                       
                       <div style={{ color: partner.color }} className="group-hover:scale-110 transition-transform">
                          <Activity size={32} />
                       </div>
                    </div>
                    <span 
                      className="text-[2.5rem] font-black tracking-tighter transition-all duration-500 opacity-20 group-hover:opacity-100"
                      style={{ 
                        color: partner.color,
                        textShadow: `0 0 40px ${partner.color}30`
                      }}
                    >
                      {partner.name}
                    </span>
                 </div>
               ))}
            </div>
         </section>

        {/* 🛠️ Tactical Footer */}
        <footer className="py-20 px-8 bg-[#ecf0f3] dark:bg-[#0B1121] border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20 footer-content relative z-10">
             <div className="col-span-1 md:col-span-2">
                <span 
                  className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 block cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Medi<span className="text-[#2A7FFF]">Sync</span>
                </span>
                <p className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed uppercase tracking-widest opacity-60">
                   The next-generation protocol for clinical data synchronization and specialist coordination.
                </p>
                <div className="flex gap-6">
                   {[
                     { icon: Activity, color: '#1DA1F2' },
                     { icon: Users, color: '#0077B5' },
                     { icon: Zap, color: '#333' },
                     { icon: Mail, color: '#EA4335' }
                   ].map((social, i) => (
                     <div key={i} className="w-14 h-14 rounded-2xl nm-button flex items-center justify-center text-slate-400 hover:text-white group cursor-pointer transition-all hover:-translate-y-2 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: social.color }} />
                        <social.icon size={20} className="relative z-10 group-hover:scale-110 transition-transform" />
                     </div>
                   ))}
                </div>
             </div>

             <div>
                <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8 opacity-40">Network Map</h5>
                <ul className="space-y-4">
                   {[
                     { label: 'Core Protocol', icon: Activity },
                     { label: 'Security Grid', icon: Shield },
                     { label: 'Network Status', icon: Zap },
                     { label: 'API Docs', icon: FileText }
                   ].map(l => (
                     <li key={l.label}>
                       <a href="#" className="text-[0.85rem] font-black text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest flex items-center gap-3 group">
                         <l.icon size={14} className="opacity-40 group-hover:opacity-100 group-hover:text-[#2A7FFF] transition-all" />
                         {l.label}
                       </a>
                     </li>
                   ))}
                </ul>
             </div>

             <div>
                <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8 opacity-40">Governance</h5>
                <ul className="space-y-4">
                   {[
                     { label: 'Terms of Service', icon: Scale },
                     { label: 'Privacy Policy', icon: Lock },
                     { label: 'Compliance Certs', icon: CircleCheck },
                     { label: 'Security Bounty', icon: HeartPulse }
                   ].map(l => (
                     <li key={l.label}>
                       <a href="#" className="text-[0.85rem] font-black text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest flex items-center gap-3 group">
                         <l.icon size={14} className="opacity-40 group-hover:opacity-100 group-hover:text-[#2ECC71] transition-all" />
                         {l.label}
                       </a>
                     </li>
                   ))}
                </ul>
             </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 footer-content relative z-10">
             <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em]">© 2026 DeepMind Advanced Systems. Verified Deployment.</p>
             <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 px-6 py-2.5 rounded-full nm-inset">
                   <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
                   <span className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Global Systems Operational</span>
                </div>
                
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-12 h-12 rounded-full nm-button flex items-center justify-center text-[#2A7FFF] hover:-translate-y-1 transition-transform"
                >
                  <ArrowUp size={20} />
                </button>
             </div>
          </div>

          {/* Decorative background blur */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2A7FFF]/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
