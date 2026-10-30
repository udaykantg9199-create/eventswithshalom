import React from 'react';
import { Language } from '../types/wedding';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Heart,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  Crown,
  Compass,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

interface AboutPageProps {
  language: Language;
  onOpenConsultation: (message?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onOpenConsultation,
}) => {
  const leadershipTeam = [
    {
      name: 'Shalom David & Team',
      roleHi: 'संस्थापक एवं मुख्य वेडिंग डायरेक्टर',
      roleEn: 'Founder & Chief Creative Director',
      bioHi: '12 वर्षों से अधिक का अनुभव, 600+ शादियों की योजना और भारत के सबसे प्रतिष्ठित महलों में भव्य आयोजन।',
      bioEn: 'Over 12 years of luxury event craftsmanship, curating 600+ unforgettable celebrations across royal Indian palaces.',
      image: '/wedding-assets/flash-image-4.jpg',
    },
    {
      name: 'Ananya Singhania',
      roleHi: 'हेड ऑफ रॉयल हॉस्पिटैलिटी व गेस्ट सर्विसेज',
      roleEn: 'Head of Royal Hospitality & Guest Care',
      bioHi: 'हवाई अड्डे से लेकर होटल चेक-इन तक, हर मेहमान को VIP शाही आदर-सत्कार का अनुभव कराती हैं।',
      bioEn: 'Pioneering ultra-luxe concierge, airport fleets, and flawless guest experience from arrivals to departures.',
      image: '/wedding-assets/flash-image-2.jpg',
    },
    {
      name: 'Vikramaditya Rathore',
      roleHi: 'चीफ प्रोडक्शन व मंडप आर्किटेक्चर',
      roleEn: 'Lead Scenography & Mandap Architect',
      bioHi: 'कस्टम 3D मंडप डिजाइन, रिसेप्शन स्टेज और विशालकाय लाइट-साउंड सेटअप के विशेषज्ञ।',
      bioEn: 'Specializes in custom structural mandaps, heritage lighting installations, and breathtaking set design.',
      image: '/wedding-assets/flash-image-3.jpg',
    },
  ];

  const milestones = [
    { year: '2012', titleHi: 'शुरुआत', titleEn: 'The Beginning', descHi: 'नई दिल्ली में पहला बुटीक वेडिंग प्रोजेक्ट', descEn: 'First bespoke wedding curated in New Delhi' },
    { year: '2016', titleHi: 'राजस्थान विस्तार', titleEn: 'Palace Expansion', descHi: 'उदयपुर और जयपुर के हेरिटेज महलों में शुरुआत', descEn: 'Premier heritage celebrations in Udaipur & Jaipur' },
    { year: '2020', titleHi: '300+ शादियां', titleEn: '300+ Celebrations', descHi: 'भारत के शीर्ष लक्जरी वेडिंग प्लानर्स में स्थान', descEn: 'Ranked among top luxury wedding ateliers in North India' },
    { year: '2024+', titleHi: '600+ उत्सव', titleEn: '600+ Royal Weddings', descHi: 'डेस्टिनेशन वेडिंग्स व अंतरराष्ट्रीय मेहमानों की सेवा', descEn: 'Global couples choosing India for their royal vows' },
  ];

  return (
    <div className="bg-[#fdfcfa] text-stone-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 md:py-28 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img
            src="/assets/aistudio/Golden_Hour_Wedding_Dreams_1d05fe11.png"
            alt="Events with Shalom Background"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4">
            <Link to="/" className="hover:text-white transition">
              {language === 'hi' ? 'होम' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-stone-300">{language === 'hi' ? 'हमारे बारे में' : 'About Us'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-white mb-6">
            {language === 'hi' ? 'Events with Shalom की कहानी' : 'The Story of Events with Shalom'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed mb-8">
            {language === 'hi'
              ? 'हम केवल शादियों की योजना नहीं बनाते, हम दो परिवारों के सबसे पावन उत्सव को एक अविस्मरणीय शाही कहानी में बदलते हैं।'
              : 'We do not merely plan weddings; we elevate one of life’s most sacred milestones into an unforgettable royal legacy.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation('Hello Events with Shalom, I would love to know more about your team and planning approach.')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfbd86] hover:bg-[#d6af75] text-stone-950 font-semibold text-sm shadow-xl transition-all"
            >
              <WhatsAppIcon variant="white" className="size-4 fill-stone-950" />
              <span>{language === 'hi' ? 'हमारी टीम से बात करें' : 'Connect with Our Directors'}</span>
            </button>
            <a
              href="tel:+917717558707"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-600 hover:border-stone-400 text-stone-200 text-sm font-semibold transition"
            >
              <Phone className="size-4 text-rose-400" />
              <span>+91 77175 58707</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Official Brand Story Section */}
      <section className="py-16 md:py-24 mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Brand Logo Presentation */}
          <div className="relative flex flex-col items-center">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#faf8f5] border border-amber-900/20 shadow-2xl max-w-md w-full text-center">
              <img
                src="/assets/aistudio/events_with_shalom_logo_centered.png"
                alt="Events with Shalom Brand Emblem"
                className="w-48 sm:w-60 h-auto mx-auto object-contain mb-6 drop-shadow-md"
              />
              <div className="text-sm font-serif-luxury font-bold text-stone-900 tracking-wide uppercase mb-1">
                Events with Shalom
              </div>
              <div className="text-xs text-rose-700 tracking-widest uppercase font-semibold">
                Luxury Wedding & Event Planning
              </div>
              <p className="mt-4 text-xs text-stone-600 italic">
                {language === 'hi'
                  ? '"सच्ची सुंदरता विस्तार और भावनाओं के संतुलन में छिपी होती है।"'
                  : '"True luxury resides in the effortless balance of intimacy, emotion, and architectural splendor."'}
              </p>
            </div>

            {/* Accolade badge */}
            <div className="mt-6 flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-stone-200 shadow-md">
              <Crown className="size-5 text-amber-600" />
              <span className="text-xs font-bold text-stone-800">
                {language === 'hi' ? 'उत्तर भारत का विश्वसनीय वेडिंग हाउस' : 'Awarded Premier Luxury Wedding Atelier'}
              </span>
            </div>
          </div>

          {/* Philosophy & Ethos */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
              <Sparkles className="size-3.5" />
              <span>{language === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Philosophy'}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-stone-900 mb-6 leading-tight">
              {language === 'hi'
                ? 'परंपरा का सम्मान, आधुनिक शान और शून्य तनाव'
                : 'Honoring Sacred Rituals with Contemporary Magnificence'}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              {language === 'hi'
                ? 'शादी सिर्फ दो लोगों का मिलन नहीं, बल्कि दो परिवारों, संस्कृतियों और पीढ़ियों की खुशियों का संगम है। हम इस जिम्मेदारी को पूरी निष्ठा और प्यार के साथ निभाते हैं। हमारे साथ, दूल्हा-दुल्हन और उनके माता-पिता बिना किसी चिंता के हर पल का आनंद लेते हैं।'
                : 'At Events with Shalom, we believe a wedding should never feel like a high-stress production for the families. Our white-glove planning methodology ensures every minute, from the first welcoming dhol to the tearful bidaai, unfolds with effortless grace.'}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-rose-600 flex-none mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {language === 'hi' ? '100% पारदर्शी बजट व वेंडर कॉन्ट्रैक्ट्स' : 'Zero Hidden Markups & Direct Vendor Pricing'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'हर खर्च आपके सामने स्पष्ट होता है, कोई अप्रत्याशित बिल नहीं।' : 'Every vendor agreement and costing sheet is fully audited and shared transparently.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="size-5 text-rose-600 flex-none mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {language === 'hi' ? 'प्रति परिवार एक समर्पित डायरेक्टर' : 'One Senior Wedding Director per Family'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'शुरुआत से लेकर अंतिम रस्म तक एक ही वरिष्ठ मार्गदर्शक आपके साथ।' : 'You work directly with a senior partner who attends every walkthrough and rehearsal.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="size-5 text-rose-600 flex-none mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {language === 'hi' ? 'भारत भर के शीर्ष महलों और होटलों से सीधा समन्वय' : 'Privileged Access to Premier Palaces'}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {language === 'hi' ? 'उदयपुर, जयपुर, जोधपुर, गोवा व दिल्ली-एनसीआर में प्राथमिकता दरें।' : 'Preferred booking access and exclusive tariff rates across Rajasthan & coastal retreats.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. By the Numbers Stats */}
      <section className="bg-stone-900 text-white py-14 px-5">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#dfbd86] mb-1">
              600+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">
              {language === 'hi' ? 'संपन्न शादियां' : 'Weddings Executed'}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#dfbd86] mb-1">
              12+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">
              {language === 'hi' ? 'वर्षों का अनुभव' : 'Years of Royal Heritage'}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#dfbd86] mb-1">
              18+
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">
              {language === 'hi' ? 'डेस्टिनेशन लोकेशंस' : 'Destination Cities'}
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#dfbd86] mb-1">
              99.8%
            </div>
            <div className="text-xs sm:text-sm text-stone-300 font-medium">
              {language === 'hi' ? 'संतुष्ट परिवार' : 'Family Satisfaction'}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Team */}
      <section className="py-16 md:py-24 mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
            <Sparkles className="size-3.5" />
            <span>{language === 'hi' ? 'कुशल हाथ' : 'Master Curators'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif-luxury font-bold text-stone-900 mb-3">
            {language === 'hi' ? 'हमारे मुख्य नेतृत्व से मिलें' : 'Meet Our Leadership'}
          </h2>
          <p className="text-stone-600 text-sm md:text-base">
            {language === 'hi'
              ? 'वे समर्पित कलाकार और प्रबंधक जो आपकी शादी के हर क्षण को जीवंत बनाते हैं।'
              : 'Passionate event artisans committed to orchestrating your dream celebrations.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leadershipTeam.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-lg flex flex-col justify-between">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="size-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <h3 className="font-serif-luxury font-bold text-lg">{member.name}</h3>
                    <div className="text-xs text-amber-300 font-medium">
                      {language === 'hi' ? member.roleHi : member.roleEn}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {language === 'hi' ? member.bioHi : member.bioEn}
                </p>
                <button
                  onClick={() =>
                    onOpenConsultation(
                      `Hello Events with Shalom, I would like to consult with ${member.name} regarding our wedding.`
                    )
                  }
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 transition"
                >
                  <WhatsAppIcon variant="brand" className="size-4" />
                  <span>{language === 'hi' ? 'परामर्श का समय लें' : 'Request Consultation'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Milestones Journey */}
      <section className="py-16 bg-stone-50 border-t border-b border-stone-200 px-5 md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-center text-stone-900 mb-12">
            {language === 'hi' ? 'हमारी विकास यात्रा' : 'Our Legacy & Milestones'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 text-center shadow-sm">
                <div className="text-rose-600 font-bold text-xl sm:text-2xl font-serif-luxury mb-1">
                  {m.year}
                </div>
                <div className="font-semibold text-xs sm:text-sm text-stone-900 mb-1">
                  {language === 'hi' ? m.titleHi : m.titleEn}
                </div>
                <div className="text-[11px] text-stone-500 leading-snug">
                  {language === 'hi' ? m.descHi : m.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <TestimonialsSection language={language} />

      {/* 7. Bottom CTA */}
      <section className="py-16 bg-white text-center border-t border-stone-200">
        <div className="mx-auto max-w-3xl px-5">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mb-4">
            {language === 'hi' ? 'क्या आप हमसे अपनी शादी की योजना बनाना चाहते हैं?' : 'Ready to Plan with Events with Shalom?'}
          </h3>
          <p className="text-stone-600 text-sm mb-8">
            {language === 'hi'
              ? 'हमारे सीनियर वेडिंग डायरेक्टर से सीधी बातचीत के लिए अभी व्हाट्सएप करें।'
              : 'Chat directly with our senior directors on WhatsApp to explore dates, venues, and decor themes.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation('Hello Events with Shalom, I am ready to start wedding planning.')}
              className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <WhatsAppIcon variant="white" className="size-4.5 fill-stone-950" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर बात करें' : 'Chat on WhatsApp'}</span>
            </button>
            <Link
              to="/services"
              className="px-8 py-3.5 rounded-full border border-stone-300 text-stone-800 font-semibold text-sm hover:border-stone-400 transition"
            >
              {language === 'hi' ? 'हमारी सेवाएं देखें' : 'Explore Services'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
