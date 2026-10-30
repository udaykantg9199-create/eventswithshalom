import React, { useState } from 'react';
import { PORTFOLIO } from '../data/weddingData';
import { PortfolioItem, Language } from '../types/wedding';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Users,
  X,
  ZoomIn,
  Camera,
  Heart,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

interface GalleryPageProps {
  language: Language;
  onOpenConsultation: (message?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  language,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', labelHi: 'सभी उत्सव (All)', labelEn: 'All Celebrations' },
    { id: 'mandap', labelHi: 'मंडप डेकोर (Mandap)', labelEn: 'Mandap Decor' },
    { id: 'palace', labelHi: 'शाही महल (Palaces)', labelEn: 'Palace Weddings' },
    { id: 'haldi', labelHi: 'हल्दी व मेहंदी (Haldi)', labelEn: 'Haldi & Mehendi' },
    { id: 'reception', labelHi: 'संगीत व रिसेप्शन', labelEn: 'Sangeet & Reception' },
  ];

  const featuredStories = [
    {
      couple: 'Kavya & Siddharth',
      venue: 'The Leela Palace, Udaipur',
      descHi: 'झील के किनारे 5000+ ताजे गुलाबों और नक्काशीदार सोने के खंभों वाला फ्लोरल मंडप।',
      descEn: 'Lakeside mandap adorned with 5,000+ cascading blush roses and brass kalash accents.',
      image: '/assets/aistudio/Golden_Hour_Mandap_Romance_eceb7275.png',
      tag: 'Palace Royal',
    },
    {
      couple: 'Aanya & Rishabh',
      venue: 'Rambagh Palace, Jaipur',
      descHi: 'शाही राजपूत शान, जगमगाते झूमर और पारंपरिक लोक कलाकारों से सजी संगीत नाइट।',
      descEn: 'Regal Rajputana grandeur featuring royal darbar seating, crystal chandeliers & live folk ensemble.',
      image: '/wedding-assets/flash-image-2.jpg',
      tag: 'Grand Reception',
    },
    {
      couple: 'Dia & Kabir',
      venue: 'Taj Exotica, South Goa',
      descHi: 'सूर्यास्त के समय समुद्र तट पर सफेद ऑर्किड्स और पेस्टल टेंट के साथ बीच वेडिंग।',
      descEn: 'Sunset beachfront vows with driftwood canopies, white orchids, and acoustic violin melodies.',
      image: '/assets/aistudio/Golden_Hour_Wedding_Dreams_1d05fe11.png',
      tag: 'Beachfront Luxe',
    },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? PORTFOLIO
      : PORTFOLIO.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#fdfcfa] text-stone-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 md:py-28 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-35">
          <img
            src="/assets/aistudio/Golden_Hour_Mandap_Romance_eceb7275.png"
            alt="Events with Shalom Gallery Background"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 md:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4">
            <Link href="/" className="hover:text-white transition">
              {language === 'hi' ? 'होम' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-stone-300">{language === 'hi' ? 'गैलरी' : 'Gallery'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-white mb-6">
            {language === 'hi' ? 'शाही शादियों की गैलरी' : 'Celebrations & Mandap Gallery'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed mb-8">
            {language === 'hi'
              ? 'उदयपुर, जयपुर, गोवा और दिल्ली-एनसीआर में हमारे द्वारा सजाए गए वास्तविक विवाह उत्सवों की भव्य तस्वीरें।'
              : 'Explore our portfolio of breathtaking mandap scenography, royal palace banquets, and spirited pre-wedding festivities.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation('Hello Events with Shalom, I was browsing your Gallery and would love to discuss decor concepts.')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#dfbd86] hover:bg-[#d6af75] text-stone-950 font-semibold text-sm shadow-xl transition-all"
            >
              <WhatsAppIcon variant="white" className="size-4 fill-stone-950" />
              <span>{language === 'hi' ? 'डेकोर पर बात करें' : 'Discuss Decor on WhatsApp'}</span>
            </button>
            <a
              href="#photo-grid"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-stone-600 hover:border-stone-400 text-stone-200 text-sm font-semibold transition"
            >
              <span>{language === 'hi' ? 'तस्वीरें देखें' : 'Browse Photos'}</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Featured Wedding Stories Spotlight */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
              <Camera className="size-3.5" />
              <span>{language === 'hi' ? 'विशेष कहानियां' : 'Real Wedding Spotlights'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury font-bold text-stone-900 mb-3">
              {language === 'hi' ? 'हालिया शाही समारोह' : 'Signature Celebrations'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              {language === 'hi'
                ? 'प्रत्येक जोड़े की व्यक्तिगत पसंद और रीति-रिवाजों के अनुरूप तैयार की गई अद्वितीय थीम।'
                : 'Each celebration thoughtfully designed around the couple’s unique aesthetic and cultural heritage.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredStories.map((story, idx) => (
              <div
                key={idx}
                className="group bg-[#faf8f5] rounded-3xl overflow-hidden border border-stone-200 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.couple}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                      {story.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-rose-700 font-semibold mb-1">
                      <MapPin className="size-3.5" />
                      <span>{story.venue}</span>
                    </div>
                    <h3 className="text-xl font-serif-luxury font-bold text-stone-900 mb-2">
                      {story.couple}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {language === 'hi' ? story.descHi : story.descEn}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      onOpenConsultation(
                        `Hello Events with Shalom, I loved the wedding style of "${story.couple}" at ${story.venue}. Could we discuss something similar?`
                      )
                    }
                    className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-emerald-500 hover:bg-emerald-50 text-stone-800 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon variant="brand" className="size-4" />
                    <span>{language === 'hi' ? 'यह स्टाइल चुनें' : 'Replicate This Aesthetic'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Filterable Photo Grid Section */}
      <section id="photo-grid" className="py-16 md:py-24 mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
              {language === 'hi' ? 'सभी तस्वीरें' : 'Complete Photo Collection'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {language === 'hi'
                ? `कुल ${filteredItems.length} तस्वीरें प्रदर्शित`
                : `Showing ${filteredItems.length} curated images`}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {language === 'hi' ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={language === 'hi' ? item.titleHi : item.titleEn}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors" />

                {/* Category Badge */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/90 backdrop-blur-sm text-stone-900 shadow-sm">
                  {language === 'hi' ? item.categoryLabelHi : item.categoryLabelEn}
                </span>

                {/* Zoom Icon Button */}
                <div className="absolute bottom-3.5 right-3.5 size-9 rounded-full bg-stone-900/80 backdrop-blur-sm text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="size-4" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-600 transition-colors mb-1.5">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                    {language === 'hi' ? item.highlightHi : item.highlightEn}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-3">
                  <span className="flex items-center gap-1 font-medium text-stone-700">
                    <MapPin className="size-3.5 text-rose-500" />
                    <span>{language === 'hi' ? item.locationHi : item.locationEn}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="size-3.5 text-amber-600" />
                    <span>{item.guests} {language === 'hi' ? 'मेहमान' : 'Guests'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-stone-900 border border-stone-800 text-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 size-10 rounded-full bg-stone-950/80 text-white grid place-items-center hover:bg-stone-800 transition"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="grid md:grid-cols-[1.5fr_1fr]">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-black">
                <img
                  src={activePhoto.image}
                  alt={language === 'hi' ? activePhoto.titleHi : activePhoto.titleEn}
                  className="size-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                    {language === 'hi' ? activePhoto.categoryLabelHi : activePhoto.categoryLabelEn}
                  </span>

                  <h3 className="text-2xl font-serif-luxury font-bold text-white mb-2">
                    {language === 'hi' ? activePhoto.titleHi : activePhoto.titleEn}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-stone-300 mb-4 pb-4 border-b border-stone-800">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-rose-400" />
                      <span>{language === 'hi' ? activePhoto.locationHi : activePhoto.locationEn}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4 text-amber-400" />
                      <span>{activePhoto.guests} {language === 'hi' ? 'अतिथि' : 'Guests'}</span>
                    </span>
                  </div>

                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-1.5">
                    {language === 'hi' ? 'डेकोर और स्टाइलिंग विशेषता:' : 'Scenography & Highlight:'}
                  </h4>
                  <p className="text-sm text-stone-300 leading-relaxed mb-6 font-light">
                    {language === 'hi' ? activePhoto.highlightHi : activePhoto.highlightEn}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => {
                      const styleTitle = language === 'hi' ? activePhoto.titleHi : activePhoto.titleEn;
                      setActivePhoto(null);
                      onOpenConsultation(
                        `Hello Events with Shalom, I am interested in the "${styleTitle}" decor style from your gallery.`
                      );
                    }}
                    className="w-full py-3 rounded-full bg-[#dfbd86] hover:bg-[#d6af75] text-stone-950 font-bold text-sm shadow-xl transition flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon variant="white" className="size-4 fill-stone-950" />
                    <span>{language === 'hi' ? 'यह डेकोर स्टाइल बुक करें' : 'Inquire for This Style'}</span>
                  </button>
                  <p className="text-[11px] text-stone-400 text-center">
                    {language === 'hi'
                      ? 'तारीख, स्थान और बजट के अनुसार पूरी तरह कस्टमाइज़ेबल'
                      : 'Fully customizable to your wedding venue and dates'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Bottom CTA Banner */}
      <section className="py-16 bg-white border-t border-stone-200 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mb-3">
            {language === 'hi' ? 'क्या आपके मन में कोई विशेष थीम है?' : 'Envisioning a Unique Theme?'}
          </h3>
          <p className="text-stone-600 text-sm mb-6">
            {language === 'hi'
              ? 'हमारे 3D डिजाइनर्स और फ्लोरिस्ट आपके विचारों को एक 3D मॉडल व मखमली सेटअप में तैयार कर सकते हैं।'
              : 'Our master scenographers render custom 3D walkthroughs for palace lawns and heritage ballrooms.'}
          </p>
          <button
            onClick={() => onOpenConsultation('Hello Events with Shalom, I have a custom wedding decor vision I want to discuss.')}
            className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition"
          >
            {language === 'hi' ? 'कस्टम थीम पर चर्चा करें' : 'Discuss Custom Theme'}
          </button>
        </div>
      </section>
    </div>
  );
};
