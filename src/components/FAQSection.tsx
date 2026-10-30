import React, { useState } from 'react';
import { FAQS } from '../data/weddingData';
import { Language } from '../types/wedding';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FAQSectionProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language, onOpenConsultation }) => {
  const [openId, setOpenId] = useState<string | null>('q1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'कुछ आम सवाल' : 'Got Questions? We Have Answers'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'शादी की प्लानिंग, 3D मंडप और वेंडर्स से जुड़े अक्सर पूछे जाने वाले सवाल।'
              : 'Everything you need to know about our end-to-end planning process and WhatsApp coordination.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left font-serif-luxury text-base md:text-lg font-bold text-stone-900 hover:text-rose-600 transition-colors"
                >
                  <span>{language === 'hi' ? faq.qHi : faq.qEn}</span>
                  <span className={`p-1.5 rounded-full bg-stone-100 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-rose-100 text-rose-600' : ''}`}>
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-sm md:text-base text-stone-600 leading-relaxed pl-1 pr-6 animate-in fade-in">
                    {language === 'hi' ? faq.aHi : faq.aEn}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'hi' ? 'क्या आपका कोई विशेष सवाल है?' : 'Have a specific question not answered here?'}
            </h4>
            <p className="text-xs md:text-sm text-stone-600">
              {language === 'hi'
                ? 'हमारी टीम व्हाट्सएप पर आपकी मदद के लिए हमेशा तत्पर है।'
                : 'Send us a message on WhatsApp and our directors will get back in minutes.'}
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-xs md:text-sm shadow-md hover:brightness-105 transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <WhatsAppIcon variant="white" className="size-4 fill-stone-950" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
