import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Language } from './types/wedding';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './components/icons/WhatsAppIcon';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillMessage, setPrefillMessage] = useState('');

  const handleOpenConsultation = (msg = '') => {
    setPrefillMessage(msg);
    setIsModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fdfcfa] text-[#1c1917] selection:bg-rose-200 selection:text-rose-900 pb-16 md:pb-0">
        {/* 1. Header Navigation with Routing */}
        <Navbar
          language={language}
          setLanguage={setLanguage}
          onOpenConsultation={() => handleOpenConsultation('')}
        />

        {/* 2. Routed Page Views */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  language={language}
                  onOpenConsultation={handleOpenConsultation}
                />
              }
            />
            <Route
              path="/services"
              element={
                <ServicesPage
                  language={language}
                  onOpenConsultation={handleOpenConsultation}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  language={language}
                  onOpenConsultation={handleOpenConsultation}
                />
              }
            />
            <Route
              path="/gallery"
              element={
                <GalleryPage
                  language={language}
                  onOpenConsultation={handleOpenConsultation}
                />
              }
            />
            <Route
              path="/contact"
              element={<ContactPage language={language} />}
            />
            <Route
              path="*"
              element={<NotFoundPage language={language} />}
            />
          </Routes>
        </main>

        {/* 3. Global Footer */}
        <Footer language={language} />

        {/* 4. Global WhatsApp Consultation Modal */}
        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          language={language}
          prefillMessage={prefillMessage}
        />

        {/* 5. Floating WhatsApp Button (Desktop/Tablet) */}
        <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl pointer-events-none whitespace-nowrap flex items-center gap-2 border border-stone-800">
            <span className="size-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर तुरंत जवाब पाएं (<15 मिनट)' : 'Instant WhatsApp VIP Reply (<15 mins)'}</span>
          </div>
          <button
            onClick={() => handleOpenConsultation('')}
            className="size-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl grid place-items-center transition-transform hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-emerald-400/30"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon variant="white" className="size-8" />
          </button>
        </div>

        {/* 6. Mobile Sticky Bottom Action Bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2.5 border-t border-stone-200 bg-white/95 p-3 shadow-2xl backdrop-blur-md md:hidden">
          <a
            href="tel:+917717558707"
            aria-label="+91 77175 58707"
            className="grid size-12 flex-none place-items-center rounded-xl border border-stone-200 text-stone-800 hover:text-rose-600 hover:bg-stone-50"
          >
            <Phone className="size-5 text-rose-600" />
          </a>
          <button
            onClick={() => handleOpenConsultation('')}
            className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 text-sm font-bold shadow-md hover:brightness-105 transition cursor-pointer"
          >
            <WhatsAppIcon variant="white" className="size-5 fill-stone-950 flex-none" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Chat on WhatsApp'}</span>
          </button>
        </div>
      </div>
    </BrowserRouter>
  );
}
