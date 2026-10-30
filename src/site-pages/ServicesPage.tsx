import React, { useState } from 'react';
import { SERVICES } from '../data/weddingData';
import { Language } from '../types/wedding';
import { BudgetCalculator } from '../components/BudgetCalculator';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Star,
  MapPin,
  Calendar,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { ServiceIcon } from '../components/ServiceIcon';

interface ServicesPageProps {
  language: Language;
  onOpenConsultation: (message?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  language,
  onOpenConsultation,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('full-planning');

  const packages = [
    {
      id: 'heritage',
      nameHi: 'शाही राजपूताना हेरिटेज पैकेज',
      nameEn: 'The Royal Heritage Experience',
      tagHi: 'सबसे लोकप्रिय • भव्य महलों के लिए',
      tagEn: 'Most Popular • Palace Weddings',
      priceHi: '₹25 लाख से शुरू',
      priceEn: 'From ₹25 Lakhs',
      guestLimit: '300 - 800 Guests',
      featuresHi: [
        'पूरा एंड-टू-एंड 3-दिवसीय वेडिंग मैनेजमेंट',
        'हवेली/महल में कस्टम 3D मंडप और थीम डेकोर',
        'VIP गेस्ट हॉस्पिटैलिटी, लग्जरी एयरपोर्ट फ्लीट',
        'सेलिब्रिटी कलाकार, लोक गायक व DJ नाइट',
        'शाही राजस्थानी व ग्लोबल लाइव फूड स्टेशन्स',
        'डेडिकेटेड 10-सदस्यीय ऑन-ग्राउंड टीम',
      ],
      featuresEn: [
        'Complete end-to-end 3-day wedding production',
        'Bespoke architectural mandap & floral styling',
        'VIP guest logistics, fleet & luggage concierge',
        'Celebrity artist booking, live Sufi/Folk bands',
        'Curated multi-cuisine gastronomy & bar concepts',
        'Dedicated 10-member senior directorial team',
      ],
      isFeatured: true,
    },
    {
      id: 'luxury',
      nameHi: 'ग्रैंड लक्जरी सेलिब्रेशन',
      nameEn: 'Grand Luxury Celebration',
      tagHi: 'शहर के 5-स्टार होटल्स के लिए',
      tagEn: '5-Star City Celebrations',
      priceHi: '₹15 लाख से शुरू',
      priceEn: 'From ₹15 Lakhs',
      guestLimit: '200 - 500 Guests',
      featuresHi: [
        '2-दिवसीय संपूर्ण शादी व संगीत प्लानिंग',
        'प्रीमियम फ्लोरल मंडप व स्टेज लाइटिंग',
        'गेस्ट आरएसपीवी (RSVP) व होटल रूम कोर्डिनेशन',
        'मेकअप, फोटोग्राफी व डीजे वेंडर मैनेजमेंट',
        'दिन-भर का फ्लो चार्ट व सटीक समय प्रबंधन',
      ],
      featuresEn: [
        '2-day comprehensive wedding & sangeet production',
        'Premium floral mandap & atmospheric stage lighting',
        'Guest RSVP management & hotel check-in desk',
        'Makeup, cinema & entertainment vendor coordination',
        'Master minute-by-minute itinerary control',
      ],
      isFeatured: false,
    },
    {
      id: 'intimate',
      nameHi: 'इंटीमेट बुटीक वेडिंग',
      nameEn: 'Intimate Boutique Soirée',
      tagHi: 'आत्मीय 100-200 मेहमानों के लिए',
      tagEn: 'Curated 100-200 Guests',
      priceHi: '₹8 लाख से शुरू',
      priceEn: 'From ₹8 Lakhs',
      guestLimit: '75 - 200 Guests',
      featuresHi: [
        '1 या 2 दिवसीय आत्मीय शादी व मेहंदी',
        'सुरुचिपूर्ण पेस्टल या गेंदा फ्लोरल डेकोर',
        'पर्सनलाइज्ड स्टेशनरी, फेवर्स व वेलकम हैंपर्स',
        'हॉस्पिटैलिटी डेस्क व ऑन-साइट कोर्डिनेटर',
        'वेंडर कॉन्ट्रैक्ट व बजट मॉनिटरिंग',
      ],
      featuresEn: [
        '1 or 2-day intimate wedding & mehendi planning',
        'Chic pastel or marigold artisanal floral decor',
        'Custom hampers, invites & personalized favors',
        'Dedicated guest hospitality & desk concierge',
        'Vendor contracting & budget protection',
      ],
      isFeatured: false,
    },
  ];

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div className="bg-[#fdfcfa] text-stone-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 md:py-28 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img
            src="/assets/aistudio/Golden_Hour_Mandap_Romance_eceb7275.png"
            alt="Events with Shalom Services Background"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 text-center relative z-10">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4">
            <Link href="/" className="hover:text-white transition">
              {language === 'hi' ? 'होम' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-stone-300">{language === 'hi' ? 'सेवाएं' : 'Services'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-white mb-6">
            {language === 'hi' ? 'हमारी लक्जरी शादी सेवाएं' : 'Curated Luxury Wedding Services'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed mb-8">
            {language === 'hi'
              ? 'आत्मीय मंडप डेकोरेशन से लेकर शाही महलों में एंड-टू-एंड डेस्टिनेशन वेडिंग तक, हर बारीकी को पूर्णता के साथ सजाया जाता है।'
              : 'From bespoke mandap styling to end-to-end royal destination weddings, Events with Shalom turns your dream celebration into effortless perfection.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation('Hello Events with Shalom, I would like to inquire about your wedding services.')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfbd86] hover:bg-[#d6af75] text-stone-950 font-semibold text-sm shadow-xl transition-all"
            >
              <WhatsAppIcon variant="white" className="size-4 fill-stone-950" />
              <span>{language === 'hi' ? 'सेवाओं की जानकारी लें' : 'Inquire on WhatsApp'}</span>
            </button>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-600 hover:border-stone-400 text-stone-200 text-sm font-semibold transition"
            >
              <span>{language === 'hi' ? 'पैकेजेस देखें' : 'View Wedding Packages'}</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Value Highlights Banner */}
      <section className="bg-amber-50/70 border-b border-stone-200 py-6 px-5">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="size-5 text-rose-600 mb-1" />
            <span className="text-xs sm:text-sm font-bold text-stone-900">100% Transparency</span>
            <span className="text-[11px] text-stone-500">Zero hidden costs</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="size-5 text-rose-600 mb-1" />
            <span className="text-xs sm:text-sm font-bold text-stone-900">Minute-by-Minute</span>
            <span className="text-[11px] text-stone-500">Flawless execution</span>
          </div>
          <div className="flex flex-col items-center">
            <HeartHandshake className="size-5 text-rose-600 mb-1" />
            <span className="text-xs sm:text-sm font-bold text-stone-900">Dedicated Director</span>
            <span className="text-[11px] text-stone-500">Single point of contact</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="size-5 text-rose-600 mb-1" />
            <span className="text-xs sm:text-sm font-bold text-stone-900">600+ Weddings</span>
            <span className="text-[11px] text-stone-500">12+ years experience</span>
          </div>
        </div>
      </section>

      {/* 3. Detailed Services Catalog */}
      <section className="py-16 md:py-24 mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="size-3.5" />
            <span>{language === 'hi' ? 'विशेषज्ञता' : 'Core Disciplines'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-stone-900 mb-3">
            {language === 'hi' ? 'हमारी 6 मुख्य सेवाएं' : 'The Six Pillars of Royal Planning'}
          </h2>
          <p className="text-stone-600 text-sm md:text-base">
            {language === 'hi'
              ? 'प्रत्येक सेवा को आपके रीति-रिवाजों और आधुनिक सुविधा को ध्यान में रखकर तैयार किया गया है।'
              : 'Every ceremony is orchestrated with respect to sacred traditions and flawless modern hospitality.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className={`bg-white rounded-2xl border p-6 sm:p-7 luxury-card-shadow flex flex-col justify-between transition-all ${
                selectedServiceId === srv.id ? 'border-rose-500 ring-2 ring-rose-200' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="size-12 rounded-xl bg-rose-50 border border-rose-100 grid place-items-center text-rose-700">
                    <ServiceIcon id={srv.id} className="size-6 stroke-[1.8]" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {language === 'hi' ? srv.tagHi : srv.tagEn}
                  </span>
                </div>

                <h3 className="text-xl font-serif-luxury font-bold text-stone-900 mb-2">
                  {language === 'hi' ? srv.titleHi : srv.titleEn}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed mb-5">
                  {language === 'hi' ? srv.descHi : srv.descEn}
                </p>

                <div className="border-t border-stone-100 pt-4 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                    {language === 'hi' ? 'क्या-क्या शामिल है:' : 'Key Inclusions:'}
                  </h4>
                  <ul className="space-y-2">
                    {(language === 'hi' ? srv.inclusionsHi : srv.inclusionsEn).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="size-4 text-emerald-600 flex-none mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenConsultation(
                    `Hello Events with Shalom, I am interested in inquiring about ${language === 'hi' ? srv.titleHi : srv.titleEn}.`
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition shadow-sm group"
              >
                <span>{language === 'hi' ? 'इस सेवा की जानकारी लें' : 'Inquire for This Service'}</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Wedding Packages Section */}
      <section id="packages" className="py-16 md:py-24 bg-stone-100/70 border-t border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3">
              <Sparkles className="size-3.5" />
              <span>{language === 'hi' ? 'सुव्यवस्थित मूल्य' : 'Transparent Packages'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4">
              {language === 'hi' ? 'वेडिंग प्लानिंग पैकेज' : 'Bespoke Wedding Packages'}
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              {language === 'hi'
                ? 'चाहे भव्य महल हो या पारिवारिक समारोह, हमारे पास हर बजट और आवश्यकता के लिए पारदर्शी पैकेज हैं।'
                : 'Tailored for palaces, heritage forts, beachfronts, and premier luxury hotels across India.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  pkg.isFeatured
                    ? 'border-2 border-rose-500 shadow-2xl scale-[1.02] bg-gradient-to-b from-rose-50/30 to-white'
                    : 'border border-stone-200 shadow-md hover:shadow-xl'
                }`}
              >
                {pkg.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {language === 'hi' ? 'सर्वाधिक पसंदीदा' : 'Most Popular Choice'}
                  </div>
                )}

                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-rose-600 mb-1">
                    {language === 'hi' ? pkg.tagHi : pkg.tagEn}
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold text-stone-900 mb-2">
                    {language === 'hi' ? pkg.nameHi : pkg.nameEn}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold text-stone-900 mb-1 font-serif-luxury text-amber-800">
                    {language === 'hi' ? pkg.priceHi : pkg.priceEn}
                  </div>
                  <div className="text-xs text-stone-500 mb-6">
                    {pkg.guestLimit} • {language === 'hi' ? 'कस्टमाइजेशन उपलब्ध' : 'Fully Customizable'}
                  </div>

                  <div className="border-t border-stone-100 pt-5 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                      {language === 'hi' ? 'पैकेज की मुख्य विशेषताएं:' : 'Package Inclusions:'}
                    </h4>
                    <ul className="space-y-3">
                      {(language === 'hi' ? pkg.featuresHi : pkg.featuresEn).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                          <CheckCircle2 className="size-4 text-rose-600 flex-none mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onOpenConsultation(
                      `Hello Events with Shalom, I am interested in booking the "${language === 'hi' ? pkg.nameHi : pkg.nameEn}" (${pkg.guestLimit}).`
                    )
                  }
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                    pkg.isFeatured
                      ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-rose-200'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <WhatsAppIcon variant="white" className="size-4 fill-white" />
                  <span>{language === 'hi' ? 'इस पैकेज पर बात करें' : 'Get Custom Quote'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cost & Budget Calculator Section */}
      <BudgetCalculator
        language={language}
        onOpenConsultationWithData={(data) => onOpenConsultation(data)}
      />

      {/* 6. Call to Action */}
      <section className="py-16 bg-white border-t border-stone-200 text-center">
        <div className="mx-auto max-w-4xl px-5">
          <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-stone-900 mb-4">
            {language === 'hi' ? 'क्या आप कुछ अनोखा चाहते हैं?' : 'Need a Completely Tailored Proposal?'}
          </h3>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            {language === 'hi'
              ? 'हमारे सीनियर वेडिंग प्लानर्स से अपनी तारीखों और पसंदीदा लोकेशन पर तुरंत व्हाट्सएप या फोन पर परामर्श लें।'
              : 'Our directors will craft a bespoke architectural deck and timeline tailored to your exact budget and dream venue.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation('Hello Events with Shalom, I would like to schedule a personalized wedding consultation.')}
              className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-lg transition"
            >
              {language === 'hi' ? 'मुफ्त परामर्श बुक करें' : 'Book Free Consultation'}
            </button>
            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-full border border-stone-300 hover:border-stone-400 text-stone-700 text-sm font-semibold transition"
            >
              {language === 'hi' ? 'हमारे काम की गैलरी देखें' : 'View Real Weddings'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
