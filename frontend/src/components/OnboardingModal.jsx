import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { steps } from './onboardingData';

const ONBOARDING_KEY = 'mediSync_onboarding_done';

const OnboardingModal = ({ userName }) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (!done) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setVisible(false);
  };

  const goNext = () => {
    if (step === steps.length - 1) {
      dismiss();
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 250);
  };

  const goPrev = () => {
    if (step === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 250);
  };

  if (!visible) return null;

  const current = steps[step];
  const Icon = current.icon;
  const progress = ((step + 1) / steps.length) * 100;

  const title = current.title.replace('Jivan', userName || 'there');
  const description = current.description.replace('Jivan', userName || 'you');

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#2A7FFF]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[8px]" onClick={dismiss} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden border border-white/50 dark:border-white/10 animate-[premiumFadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Progress Bar (Glow) */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gray-100/50 dark:bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#2A7FFF] via-[#8B5CF6] to-[#2A7FFF] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(42,127,255,0.8)]"
            style={{ width: `${progress}%`, backgroundSize: '200% 100%' }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={dismiss}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110 active:scale-95 transition-all z-20 border border-white/50 dark:border-slate-700/50"
        >
          <X size={18} />
        </button>

        {/* Header Section */}
        <div
          className={`relative px-10 pt-14 pb-8 flex flex-col items-center text-center transition-all duration-500 ${animating ? 'translate-y-4 opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}`}
        >
          {/* Animated Icon Container */}
          <div className="relative mb-8">
            <div
              className="absolute inset-0 rounded-[32px] blur-2xl opacity-40 animate-pulse"
              style={{ backgroundColor: current.color }}
            />
            <div
              className="w-24 h-24 rounded-[32px] flex items-center justify-center relative z-10 animate-[float_4s_ease-in-out_infinite] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] border border-white/40 dark:border-white/10"
              style={{
                background: `linear-gradient(135deg, ${current.color}15, ${current.color}35)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <Icon
                size={44}
                className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                style={{ color: current.color }}
              />
            </div>

            {/* Sparkle decorative icons */}
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles size={20} className="text-amber-400 opacity-60" />
            </div>
          </div>

          {/* Subtitle / Badge */}
          <div
            className="px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-[0.25em] mb-4 shadow-sm border"
            style={{
              color: current.color,
              backgroundColor: `${current.color}10`,
              borderColor: `${current.color}20`,
            }}
          >
            {current.subtitle}
          </div>

          {/* Title */}
          <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight drop-shadow-sm">
            {title.split('!').map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && title.includes('!') ? '!' : ''}
              </span>
            ))}
          </h2>
        </div>

        {/* Body Section */}
        <div
          className={`px-12 pb-10 flex flex-col items-center transition-all duration-500 delay-75 ${animating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}
        >
          <p className="text-[1.05rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-center max-w-[90%] mb-10">
            {description}
          </p>

          {/* Footer Actions */}
          <div className="w-full flex items-center justify-between gap-4">
            <button
              onClick={goPrev}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[0.9rem] font-black text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${step === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              onClick={goNext}
              className="flex-1 flex items-center justify-center gap-3 py-4.5 rounded-[22px] text-[1.1rem] font-black text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] group"
              style={{
                background: `linear-gradient(135deg, ${current.color}, ${current.color}dd)`,
                boxShadow: `0 12px 32px ${current.color}50`,
              }}
            >
              {current.cta}
              {step < steps.length - 1 ? (
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              ) : (
                <Shield size={20} className="animate-pulse" />
              )}
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setStep(i);
                    setAnimating(false);
                  }, 250);
                }}
                className="transition-all duration-500 rounded-full"
                style={{
                  width: i === step ? '32px' : '8px',
                  height: '8px',
                  backgroundColor: i === step ? current.color : '#cbd5e140',
                  boxShadow: i === step ? `0 0 12px ${current.color}60` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Animations */}
      <style>{`
        @keyframes premiumFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(40px); filter: blur(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default OnboardingModal;
