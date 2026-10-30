import React, { useState } from 'react';
import Link from 'next/link';
import { PORTFOLIO } from '../data/weddingData';
import { PortfolioItem, Language } from '../types/wedding';
import { MapPin, Users, X, ZoomIn, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface PortfolioGalleryProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', labelHi: 'सभी शादियां', labelEn: 'All Celebrations' },
    { id: 'mandap', labelHi: 'मंडप डेकोर', labelEn: 'Mandap Decor' },
    { id: 'palace', labelHi: 'शाही महल', labelEn: 'Royal Palaces' },
    { id: 'haldi', labelHi: 'हल्दी व मेहंदी', labelEn: 'Haldi & Mehendi' },
    { id: 'reception', labelHi: 'रिसेप्शन स्टेज', labelEn: 'Reception Stage' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-stone-100/60 text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'हमारे कुछ खूबसूरत पल' : 'Royal Celebrations Archive'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'हर शादी की अपनी एक अनोखी प्रेम कहानी है। देखें हमारे द्वारा सजाए गए कुछ यादगार मंडप व उत्सव।'
              : 'Glimpse into the extraordinary weddings, royal mandaps, and bespoke sets curated by our team.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${selectedCategory === cat.id ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'}`}
            >
              {language === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200/90 luxury-card-shadow luxury-card-hover flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <img
                  src={item.image}
                  alt={item.titleEn}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-rose-600 px-3 py-1.5 rounded-full font-medium">
                    <ZoomIn className="size-3.5" />
                    <span>{language === 'hi' ? 'बड़ा करके देखें' : 'View Full Image'}</span>
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-stone-700">
                  {language === 'hi' ? item.categoryLabelHi : item.categoryLabelEn}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-serif-luxury font-bold text-stone-900 group-hover:text-rose-600 transition-colors mb-2">
                    {language === 'hi' ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                    {language === 'hi' ? item.highlightHi : item.highlightEn}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-rose-500" />
                    <span>{language === 'hi' ? item.locationHi : item.locationEn}</span>
                  </span>
                  <span className="flex items-center gap-1 font-medium text-stone-700">
                    <Users className="size-3.5 text-amber-500" />
                    <span>{item.guests} {language === 'hi' ? 'मेहमान' : 'Guests'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery Link Button */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm shadow-md transition group"
          >
            <span>{language === 'hi' ? 'पूरी फोटो गैलरी देखें' : 'Explore Full Celebrations Gallery'}</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Modal Lightbox */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-stone-900 border border-stone-700 text-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 size-9 rounded-full bg-stone-800/80 hover:bg-stone-700 grid place-items-center text-white"
              >
                <X className="size-5" />
              </button>

              <div className="relative bg-black flex items-center justify-center max-h-[55vh] min-h-[220px] overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.titleEn}
                  className="max-h-[55vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800">
                      {language === 'hi' ? activePhoto.categoryLabelHi : activePhoto.categoryLabelEn}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="size-3 text-rose-400" />
                      {language === 'hi' ? activePhoto.locationHi : activePhoto.locationEn}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif-luxury font-bold text-white mb-1">
                    {language === 'hi' ? activePhoto.titleHi : activePhoto.titleEn}
                  </h3>
                  <p className="text-sm text-stone-300 max-w-xl">
                    {language === 'hi' ? activePhoto.highlightHi : activePhoto.highlightEn}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActivePhoto(null);
                    onOpenConsultation();
                  }}
                  className="w-full sm:w-auto text-center justify-center whitespace-nowrap px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <WhatsAppIcon variant="white" className="size-4.5 fill-stone-950" />
                  <span>{language === 'hi' ? 'ऐसा मंडप बुक करें' : 'Inquire for Similar Setup'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
