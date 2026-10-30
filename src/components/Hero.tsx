import React, { useState } from 'react';
import { Language } from '../types/wedding';
import { ArrowRight, Play, X } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface HeroProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenConsultation }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div id="home" className="relative isolate overflow-hidden bg-stone-950 text-white scroll-mt-20 select-none">
      {/* ========================================================= */}
      {/* 1. MOBILE HERO VIEW (< md: 768px)                         */}
      {/* Exactly matches user's vertical mobile artwork attachment */}
      {/* ========================================================= */}
      <div className="md:hidden relative w-full flex flex-col items-center bg-stone-950">
        <div className="relative w-full max-w-md mx-auto aspect-[941/1672] shadow-2xl bg-stone-950 overflow-hidden">
          <img
            src="/assets/aistudio/Perfect_Moments__Beautifully_Planned_a5d32f56.png"
            alt="Events with Shalom - Perfect Moments, Beautifully Planned"
            className="size-full object-cover select-none pointer-events-none"
            loading="eager"
          />

          {/* Precision Interactive Touch Target over 'Plan Your Event →' button */}
          <button
            type="button"
            onClick={onOpenConsultation}
            className="absolute top-[45.2%] left-1/2 -translate-x-1/2 w-[34%] sm:w-[32%] h-[4.4%] rounded-full cursor-pointer z-20 focus:outline-none focus:ring-2 focus:ring-[#dfbd86] active:scale-95 transition-transform"
            aria-label={language === 'hi' ? 'अपनी शादी प्लान करें' : 'Plan Your Event'}
          >
            <span className="sr-only">
              {language === 'hi' ? 'अपनी शादी प्लान करें' : 'Plan Your Event'}
            </span>
            {/* Subtle glow / tap ripple highlight */}
            <span className="absolute inset-0 rounded-full bg-amber-400/20 opacity-0 active:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mobile 4 Core Pillars Strip */}
        <div className="w-full px-5 py-5 bg-stone-900/90 border-t border-stone-800">
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
            {/* 1. Beautiful Venues */}
            <div className="flex items-center gap-2.5">
              <div className="size-7 text-[#dfbd86] flex-none flex items-center justify-center">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="14" r="7" />
                  <path d="M12 4 L14 7 L10 7 Z" fill="#dfbd86" />
                  <path d="M10 7 L12 2 L14 7" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight font-serif-luxury">
                <div className="font-semibold text-white">Beautiful</div>
                <div className="text-stone-300 font-light">Venues</div>
              </div>
            </div>

            {/* 2. Creative Decor */}
            <div className="flex items-center gap-2.5">
              <div className="size-7 text-[#dfbd86] flex-none flex items-center justify-center">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" fill="#dfbd86" />
                  <path d="M12 2 C12 6 9 9 9 12 C9 15 12 18 12 22 C12 18 15 15 15 12 C15 9 12 6 12 2 Z" />
                  <path d="M2 12 C6 12 9 9 12 9 C15 9 18 12 22 12 C18 12 15 15 12 15 C9 15 6 12 2 12 Z" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight font-serif-luxury">
                <div className="font-semibold text-white">Creative</div>
                <div className="text-stone-300 font-light">Decor</div>
              </div>
            </div>

            {/* 3. Expert Planning */}
            <div className="flex items-center gap-2.5">
              <div className="size-7 text-[#dfbd86] flex-none flex items-center justify-center">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="7" r="3.5" />
                  <path d="M6 19 C6 15 9 13 12 13 C15 13 18 15 18 19" />
                  <circle cx="18" cy="8" r="2.5" />
                  <path d="M18 13 C20 13.5 21.5 15 21.5 18" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight font-serif-luxury">
                <div className="font-semibold text-white">Expert</div>
                <div className="text-stone-300 font-light">Planning</div>
              </div>
            </div>

            {/* 4. Memorable Moments */}
            <div className="flex items-center gap-2.5">
              <div className="size-7 text-[#dfbd86] flex-none flex items-center justify-center">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight font-serif-luxury">
                <div className="font-semibold text-white">Memorable</div>
                <div className="text-stone-300 font-light">Moments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP HERO VIEW (>= md: 768px)                       */}
      {/* Landscape layout with couple and left editorial columns   */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative min-h-[90vh] lg:min-h-screen flex-col justify-between pb-12 sm:pb-8">
        {/* Background Wedding Image from user attachment */}
        <div className="absolute inset-0 -z-20">
          <img
            src="/assets/aistudio/Golden_Hour_Mandap_Romance_eceb7275.png"
            alt="Golden Hour Mandap Romance - Bride and Groom under Floral Chandelier Mandap"
            className="size-full object-cover object-[72%_center] lg:object-[68%_center]"
          />

          {/* Desktop Multi-layer Gradient: Left-to-right editorial read layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/75 to-transparent max-w-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40" />
        </div>

        {/* Main Left Editorial Block */}
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 relative z-10 flex-1 flex flex-col justify-center items-start">
          <div className="max-w-xl lg:max-w-2xl text-left">
            {/* Subheading */}
            <div className="text-xs md:text-sm uppercase tracking-[0.24em] md:tracking-[0.28em] font-medium text-amber-200/90 mb-4 sm:mb-5 font-serif-luxury">
              {language === 'hi' ? 'एक सुंदर शुरुआत' : 'The Perfect Beginning'}
            </div>

            {/* Master Title with Elegant Calligraphy and Precise Alignment */}
            <h1 className="text-4xl md:text-6xl lg:text-[4.75rem] font-serif-luxury font-normal text-white leading-tight tracking-tight mb-5 sm:mb-6">
              <span className="block tracking-tight text-white/95">Make Your</span>
              <span className="font-script gold-script-text text-6xl md:text-8xl lg:text-[7rem] block leading-[1.08] sm:leading-[1.12] my-1 not-italic tracking-normal">
                Wedding
              </span>
              <span className="block font-normal tracking-tight text-white/95">Extraordinary</span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-sm md:text-base text-stone-200/90 font-light leading-relaxed max-w-lg mb-8">
              {language === 'hi'
                ? 'आत्मीय समारोहों से लेकर भव्य शाही आयोजनों तक, हम सुंदरता, भावना और सटीकता के साथ अविस्मरणीय शादियां रचते हैं।'
                : 'From intimate gatherings to grand celebrations, we craft unforgettable wedding experiences with elegance, emotion and perfection.'}
            </p>

            {/* Buttons: Plan Your Wedding & Watch Our Story */}
            <div className="flex items-center gap-5">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm bg-[#dfbd86] hover:bg-[#d6af75] text-stone-950 transition-all shadow-xl hover:shadow-[#dfbd86]/30 cursor-pointer group"
              >
                <span>{language === 'hi' ? 'अपनी शादी प्लान करें' : 'Plan Your Wedding'}</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-3 py-0 text-sm font-medium text-white hover:text-amber-200 transition group cursor-pointer"
              >
                <span className="size-10 rounded-full border border-white/60 group-hover:border-white group-hover:scale-105 flex items-center justify-center transition-all bg-black/20 backdrop-blur-sm flex-none">
                  <Play className="size-3.5 fill-white text-white ml-0.5" />
                </span>
                <span>{language === 'hi' ? 'हमारी कहानी देखें' : 'Watch Our Story'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Row: 4 Icons Pillars on Left, Centered Scroll Indicator */}
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12 pb-10 md:pb-14 relative z-10 flex items-center justify-between gap-8">
          {/* 4 Feature Icons Column */}
          <div className="grid grid-cols-4 gap-8 lg:gap-10 text-left">
            {/* 1. Beautiful Venues */}
            <div className="flex flex-col items-start gap-2 group">
              <div className="size-8 text-[#dfbd86] flex items-center justify-center">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="14" r="7" />
                  <path d="M12 4 L14 7 L10 7 Z" fill="#dfbd86" />
                  <path d="M10 7 L12 2 L14 7" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="text-xs leading-tight font-serif-luxury text-stone-200">
                <div className="font-semibold text-white">Beautiful</div>
                <div className="text-stone-300 font-light">Venues</div>
              </div>
            </div>

            {/* 2. Creative Decor */}
            <div className="flex flex-col items-start gap-2 group">
              <div className="size-8 text-[#dfbd86] flex items-center justify-center">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3" fill="#dfbd86" />
                  <path d="M12 2 C12 6 9 9 9 12 C9 15 12 18 12 22 C12 18 15 15 15 12 C15 9 12 6 12 2 Z" />
                  <path d="M2 12 C6 12 9 9 12 9 C15 9 18 12 22 12 C18 12 15 15 12 15 C9 15 6 12 2 12 Z" />
                </svg>
              </div>
              <div className="text-xs leading-tight font-serif-luxury text-stone-200">
                <div className="font-semibold text-white">Creative</div>
                <div className="text-stone-300 font-light">Decor</div>
              </div>
            </div>

            {/* 3. Expert Planning */}
            <div className="flex flex-col items-start gap-2 group">
              <div className="size-8 text-[#dfbd86] flex items-center justify-center">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="7" r="3.5" />
                  <path d="M6 19 C6 15 9 13 12 13 C15 13 18 15 18 19" />
                  <circle cx="18" cy="8" r="2.5" />
                  <path d="M18 13 C20 13.5 21.5 15 21.5 18" />
                </svg>
              </div>
              <div className="text-xs leading-tight font-serif-luxury text-stone-200">
                <div className="font-semibold text-white">Expert</div>
                <div className="text-stone-300 font-light">Planning</div>
              </div>
            </div>

            {/* 4. Memorable Moments */}
            <div className="flex flex-col items-start gap-2 group">
              <div className="size-8 text-[#dfbd86] flex items-center justify-center">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div className="text-xs leading-tight font-serif-luxury text-stone-200">
                <div className="font-semibold text-white">Memorable</div>
                <div className="text-stone-300 font-light">Moments</div>
              </div>
            </div>
          </div>

          {/* Center/Bottom Scroll Down Pill Indicator */}
          <div className="flex flex-col items-center justify-center -mb-2">
            <a
              href="#services"
              className="group flex flex-col items-center gap-1.5 text-stone-300 hover:text-white transition"
            >
              <div className="w-5 h-9 rounded-full border border-stone-300/80 flex items-start justify-center p-1.5">
                <span className="size-1 rounded-full bg-white animate-bounce" />
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase font-light text-stone-300/90">
                {language === 'hi' ? 'नीचे देखें' : 'SCROLL DOWN'}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Video / Story Lightbox Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-stone-900 border border-stone-800 text-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition"
            >
              <X className="size-6" />
            </button>

            <div className="text-center max-w-lg mx-auto py-6">
              <div className="size-16 rounded-full bg-amber-400/10 text-amber-300 grid place-items-center mx-auto mb-4 border border-amber-400/30">
                <Play className="size-7 fill-amber-300 text-amber-300 ml-1" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif-luxury font-bold text-white mb-2">
                {language === 'hi' ? 'Events with Shalom की सिनेमैटिक कहानी' : 'The Events with Shalom Cinematic Story'}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed mb-6 font-light">
                {language === 'hi'
                  ? 'उदयपुर के महलों से लेकर गोवा के समुद्र तटों तक, हमारे पिछले 600+ शाही उत्सवों की एक झलक। हमारे वेडिंग डायरेक्टर से अपनी तारीखों पर बात करें।'
                  : 'A showcase of 600+ regal celebrations crafted over 12+ years with Events with Shalom. Connect directly with our Senior Directors on WhatsApp for a personalized preview.'}
              </p>

              <button
                onClick={() => {
                  setVideoModalOpen(false);
                  onOpenConsultation();
                }}
                className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm shadow-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon variant="white" className="size-4.5 fill-stone-950" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Connect on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
