import React from 'react';
import { TESTIMONIALS } from '../data/weddingData';
import { Language } from '../types/wedding';
import { Star, Quote, Building } from 'lucide-react';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-stone-50/80 text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'हमारे जोड़ों की जुबानी' : 'Words of Love & Gratitude'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'सैकड़ों जोड़ों ने अपने सबसे खूबसूरत दिन की ज़िम्मेदारी Events with Shalom को सौंपी। पढ़ें उनके अनुभव।'
              : 'Over 600+ couples trusted us with their once-in-a-lifetime celebration. Here is what they shared.'}
          </p>
        </div>

        {/* Testimonials Grid with Large Rating Card */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Rating Summary Card */}
          <div className="bg-gradient-to-br from-rose-700 to-rose-900 text-white rounded-2xl p-7 md:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="font-serif-luxury text-7xl font-bold leading-none mb-2">4.9</div>
              <div className="flex gap-1 text-amber-300 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-300" />
                ))}
              </div>
              <div className="text-sm font-semibold text-rose-100">
                {language === 'hi' ? '320+ सत्यापित समीक्षाएं' : '320+ Verified Couple Reviews'}
              </div>
              <p className="text-xs text-rose-200/90 mt-2 leading-relaxed">
                {language === 'hi'
                  ? '99.4% परिवारों ने 5-स्टार रेटिंग के साथ हमारी सेवाओं की सिफारिश की है।'
                  : '99.4% couples recommend Events with Shalom for seamless wedding execution.'}
              </p>
            </div>

            <div className="border-t border-rose-600/60 pt-5 mt-6">
              <div className="text-xs text-rose-200 uppercase font-bold tracking-wider mb-2">
                {language === 'hi' ? 'विशेषता' : 'Excellence'}
              </div>
              <div className="text-xs text-rose-100 space-y-1">
                <div>✓ {language === 'hi' ? 'समय पर 100% पूरा' : '100% On-Time Completion'}</div>
                <div>✓ {language === 'hi' ? 'पारदर्शी बिलिंग' : 'Zero Hidden Charges'}</div>
                <div>✓ {language === 'hi' ? '3D मंडप सटीकता' : '3D Design Accuracy'}</div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-5 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-6 luxury-card-shadow luxury-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="size-6 text-rose-200" />
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed mb-5 italic">
                    "{language === 'hi' ? t.reviewHi : t.reviewEn}"
                  </p>
                </div>

                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white font-bold text-xs shadow-sm">
                      {t.avatarText}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-stone-900 font-serif-luxury">
                        {language === 'hi' ? t.coupleHi : t.coupleEn}
                      </div>
                      <div className="text-xs text-stone-500">
                        {language === 'hi' ? t.cityHi : t.cityEn}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-400 max-w-[120px] text-right truncate flex items-center gap-1">
                    <Building className="size-3 text-stone-400 flex-none" />
                    <span className="truncate">{language === 'hi' ? t.venueHi.split(',')[0] : t.venueEn.split(',')[0]}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
