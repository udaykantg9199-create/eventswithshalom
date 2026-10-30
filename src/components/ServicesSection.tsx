import React from 'react';
import { SERVICES } from '../data/weddingData';
import { Language } from '../types/wedding';
import { Check, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ServiceIcon, getServiceIconTheme } from './ServiceIcon';

interface ServicesSectionProps {
  language: Language;
  onOpenConsultation: (message?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ language, onOpenConsultation }) => {
  return (
    <section id="services" className="py-16 md:py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'बेस्पोक वेडिंग सेवाएं' : 'Bespoke Wedding Services'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed font-light">
            {language === 'hi'
              ? 'आत्मीय मंडप सज्जा से लेकर भव्य शाही आयोजनों तक, हमारी विशेष सेवाएं आपकी शादी के हर पल को अविस्मरणीय बनाती हैं।'
              : 'Curated master planning, architectural mandaps, and bespoke floral concepts orchestrated for an effortless celebration.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((srv) => {
            const theme = getServiceIconTheme(srv.id);
            const serviceTitle = language === 'hi' ? srv.titleHi : srv.titleEn;
            const inquiryMessage = language === 'hi'
              ? `नमस्ते Events with Shalom, मैं आपकी "${srv.titleHi}" सेवा के बारे में जानकारी चाहता हूँ।`
              : `Hello Events with Shalom, I would like to inquire about your "${srv.titleEn}" service.`;

            return (
              <div
                key={srv.id}
                className="group bg-white rounded-2xl border border-stone-200/90 p-6 md:p-7 luxury-card-shadow hover:-translate-y-1 hover:shadow-xl hover:border-amber-300/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`size-13 rounded-2xl border flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 duration-300 ${theme.containerBg} ${theme.textColor}`}
                    >
                      <ServiceIcon id={srv.id} className="size-6 stroke-[1.8]" />
                    </div>

                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${theme.badgeBg}`}
                    >
                      {language === 'hi' ? srv.tagHi : srv.tagEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-serif-luxury font-bold text-stone-900 mb-2.5 group-hover:text-rose-900 transition-colors">
                    {serviceTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-light">
                    {language === 'hi' ? srv.descHi : srv.descEn}
                  </p>

                  {/* Inclusions */}
                  <div className="border-t border-stone-100 pt-4 mb-6">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">
                      {language === 'hi' ? 'मुख्य विशेषताएं:' : 'Key Inclusions:'}
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {(language === 'hi' ? srv.inclusionsHi : srv.inclusionsEn).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-700">
                          <span className="mt-0.5 size-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-none">
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                          <span className="leading-snug">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={() => onOpenConsultation(inquiryMessage)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 bg-stone-50/80 hover:bg-[#25D366] hover:border-[#25D366] text-stone-800 hover:text-white font-semibold text-xs md:text-sm transition-all duration-200 group/btn cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon variant="brand" className="size-4 group-hover/btn:brightness-0 group-hover/btn:invert transition-all" />
                  <span>{language === 'hi' ? 'इस सेवा की जानकारी लें' : 'Inquire on WhatsApp'}</span>
                  <ArrowRight className="size-3.5 group-hover/btn:translate-x-1 transition-transform ml-auto" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
