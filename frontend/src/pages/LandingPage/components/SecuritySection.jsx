import React from 'react';
import { Shield } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section id="security" className="py-6 px-8">
      <div className="max-w-7xl mx-auto relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71] rounded-[6rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />

        <div className="security-inner relative bg-[#1F2937] dark:bg-[#151E32] rounded-[3rem] p-10 md:p-12 overflow-hidden border border-white/5 shadow-2xl">
          {}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-[2rem] bg-[#2ECC71]/10 flex items-center justify-center text-[#2ECC71] mb-12 animate-pulse security-shield">
              <Shield size={48} />
            </div>
            <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] font-black text-white mb-6 tracking-tighter leading-none max-w-4xl">
              Security Without <span className="text-[#2ECC71]">Compromise.</span>
            </h2>
            <p className="text-[1rem] sm:text-[1.3rem] font-medium text-slate-400 mb-10 sm:mb-16 max-w-3xl leading-relaxed">
              MediSync utilizes post-quantum encryption standards to protect patient identity. Our
              zero-knowledge architecture ensures that even we cannot access your clinical history.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                'AES-256 Bit Encryption',
                'Zero-Knowledge Proofs',
                'Multi-Layer Biometrics',
                'SOC2 Type II',
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl text-white text-[0.8rem] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
