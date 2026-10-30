import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types/wedding';
import { HeartHandshake, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface AboutSectionProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language, onOpenConsultation }) => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'हम कौन हैं — आपकी खुशियों के साथी' : 'Crafting Unforgettable Wedding Memories'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? '12 से अधिक वर्षों से भारत भर में भव्य शाही महलों से लेकर सुरम्य समुद्र तटों तक शादियों को यादगार बना रहे हैं।'
              : 'For over 12 years, we have been turning wedding dreams into reality across heritage palaces, luxury retreats, and beachside destinations.'}
          </p>
        </div>

        {/* Story and Image Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column: Image Collage */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3]">
              <img
                src="/wedding-assets/flash-image-4.jpg"
                alt="Events with Shalom Wedding Directors and Couple Consultation"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="font-serif-luxury font-bold text-xl mb-1">
                    {language === 'hi' ? 'व्यक्तिगत ध्यान व परामर्श' : 'Personalized Planning & Attention'}
                  </div>
                  <p className="text-xs text-stone-300">
                    {language === 'hi'
                      ? 'हर जोड़े के लिए एक समर्पित सीनियर वेडिंग डायरेक्टर'
                      : 'A dedicated Senior Wedding Director assigned to every couple'}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-5 right-2 sm:-bottom-8 sm:right-6 bg-gradient-to-br from-stone-900 to-stone-950 text-white p-3.5 sm:p-5 rounded-2xl shadow-2xl border border-stone-800 max-w-[200px] sm:max-w-[240px]">
              <div className="flex items-center gap-2 mb-1 text-amber-400">
                <Award className="size-4 sm:size-5" />
                <span className="text-xs uppercase font-bold tracking-wider">
                  {language === 'hi' ? 'विरासत' : 'Legacy'}
                </span>
              </div>
              <div className="font-serif-luxury font-bold text-2xl text-white">600+ Weddings</div>
              <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                {language === 'hi' ? '100% समय पर पूर्ण व शून्य तनाव' : '100% on-time execution with zero vendor stress'}
              </p>
            </div>
          </div>

          {/* Right Column: Mission and Pillars */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif-luxury font-bold text-stone-900 mb-3">
                {language === 'hi' ? 'सपनों की शादी, बिना किसी तनाव के' : 'Where Royal Traditions Meet Modern Ease'}
              </h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                {language === 'hi'
                  ? 'Events with Shalom की स्थापना इस सोच के साथ हुई थी कि शादी में परिवारों को वेंडर फोन कॉल्स, टाइमलाइन की चिंता और छुपे हुए खर्चों में नहीं उलझना चाहिए। हम हर डिटेल — वेन्यू से लेकर जयमाला, कैटरिंग और विदाई तक — स्वयं संभालते हैं ताकि आप सिर्फ जश्न मनाएं।'
                  : 'Events with Shalom was founded on a simple promise: families should never spend the most auspicious days of their lives answering vendor calls, haggling over rates, or stressing about timelines. We manage everything seamlessly so you can focus entirely on celebrating love with family.'}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-600 flex-none mt-0.5">
                  <HeartHandshake className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">
                    {language === 'hi' ? 'समर्पित ऑन-साइट डायरेक्टर' : 'Dedicated On-Site Director'}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {language === 'hi'
                      ? 'आपकी शादी के लिए एक मुख्य निर्देशक जो हर रस्म और वेंडर का समय-तालिका से संचालन करता है।'
                      : 'A dedicated point of contact who choreographs every event cue, vendor arrival, and hospitality detail.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 flex-none mt-0.5">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">
                    {language === 'hi' ? 'पारदर्शी वेंडर मूल्य निर्धारण' : '100% Transparent Vendor Pricing'}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {language === 'hi'
                      ? 'कोई छुपा हुआ चार्ज नहीं। भारत के शीर्ष कैटरर्स, फोटोग्राफर्स और मेकअप आर्टिस्ट्स सर्वोत्तम दरों पर।'
                      : 'No hidden commission markups. Pre-negotiated privileged contracts with India’s finest culinary and visual artists.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 flex-none mt-0.5">
                  <Users className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-1">
                    {language === 'hi' ? 'अतिथि सत्कार व आवास प्रबंधन' : 'Guest Concierge & Hospitality'}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {language === 'hi'
                      ? 'हवाई अड्डे से वेन्यू तक लग्ज़री ट्रांसपोर्ट, वेलकम किट और कमरों के आवंटन की पूरी देखरेख।'
                      : 'Airport welcomes, curated gifting hampers, hotel rooming lists, and 24/7 guest helpline support.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm shadow-md transition"
              >
                <WhatsAppIcon variant="white" className="size-4.5 fill-stone-950" />
                <span>{language === 'hi' ? 'वेडिंग डायरेक्टर से बात करें' : 'Speak with Our Director'}</span>
              </button>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-stone-300 hover:border-stone-400 text-stone-800 font-semibold text-sm transition"
              >
                <span>{language === 'hi' ? 'पूरी कहानी पढ़ें' : 'Our Full Story'}</span>
                <ArrowRight className="size-4 text-rose-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
