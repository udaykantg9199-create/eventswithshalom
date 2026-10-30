import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Language } from '../types/wedding';
import { Phone, Menu, X, Globe, Sparkles, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, setLanguage, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      to: '/',
      labelHi: 'होम पेज',
      labelEn: 'Home',
      end: true,
    },
    {
      to: '/services',
      labelHi: 'सेवाएं व पैकेज',
      labelEn: 'Services',
      end: false,
    },
    {
      to: '/about',
      labelHi: 'हमारे बारे में',
      labelEn: 'About',
      end: false,
    },
    {
      to: '/gallery',
      labelHi: 'गैलरी',
      labelEn: 'Gallery',
      end: false,
    },
    {
      to: '/contact',
      labelHi: 'संपर्क',
      labelEn: 'Contact',
      end: false,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Title - Fully responsive across 320px to 4K */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group py-1 flex-shrink-0 min-w-0">
          <img
            src="/assets/aistudio/events_with_shalom_logo_centered.png"
            alt="Events with Shalom Logo"
            className="h-11 sm:h-13 md:h-15 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform flex-shrink-0 drop-shadow-xs"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif-luxury font-bold text-sm sm:text-base md:text-xl tracking-tight text-stone-900 group-hover:text-rose-700 transition-colors leading-tight truncate">
              Events with Shalom
            </span>
            <span className="hidden min-[380px]:inline-block text-[8px] sm:text-[9.5px] md:text-[10.5px] tracking-widest uppercase font-semibold text-rose-700 truncate">
              {language === 'hi' ? 'लग्जरी शादी व इवेंट प्लानिंग' : 'Luxury Wedding & Events'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (>= lg: 1024px) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14.5px] xl:text-[15px] font-medium text-stone-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-rose-700 font-bold bg-rose-100/70 shadow-xs ring-1 ring-rose-200/60'
                    : 'text-stone-700 hover:text-rose-700 hover:bg-rose-50/70'
                }`
              }
            >
              {language === 'hi' ? link.labelHi : link.labelEn}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Controls: Language, Phone, WhatsApp CTA, and Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 flex-shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full border border-stone-300 text-stone-800 text-xs font-semibold hover:border-rose-400 hover:text-rose-600 transition bg-white/80 shadow-xs cursor-pointer"
            title={language === 'hi' ? 'Switch to English' : 'Switch to Hindi'}
            aria-label="Switch Language"
          >
            <Globe className="size-3.5 text-rose-600 flex-shrink-0" />
            <span className="hidden sm:inline">{language === 'hi' ? 'English' : 'हिन्दी'}</span>
            <span className="sm:hidden font-bold">{language === 'hi' ? 'EN' : 'हि'}</span>
          </button>

          {/* Direct Call Link (hidden on small screens, shown on md+) */}
          <a
            href="tel:+917717558707"
            className="hidden md:inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-stone-700 hover:text-rose-600 transition px-2 py-1.5"
            title="Direct Phone Line"
          >
            <Phone className="size-3.5 lg:size-4 text-rose-600" />
            <span>+91 77175 58707</span>
          </a>

          {/* WhatsApp Primary CTA Button - Responsive layout */}
          {/* Full CTA on sm+ */}
          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-3.5 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 shadow-sm hover:shadow-md transition-all cursor-pointer group flex-shrink-0"
          >
            <WhatsAppIcon variant="white" className="size-4 md:size-4.5 flex-shrink-0 fill-stone-950 transition-transform group-hover:scale-110" />
            <span className="whitespace-nowrap">
              {language === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Inquiry'}
            </span>
          </button>

          {/* Compact WhatsApp Icon-only CTA for mobile (< sm) */}
          <button
            onClick={onOpenConsultation}
            className="sm:hidden size-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 grid place-items-center shadow-xs cursor-pointer flex-shrink-0 active:scale-95 transition-transform"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon variant="white" className="size-4.5 fill-stone-950" />
          </button>

          {/* Mobile Menu Toggle Button (< lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-stone-800 hover:bg-stone-100 hover:text-rose-600 transition cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-18 sm:top-20 bg-stone-950/40 backdrop-blur-xs z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-18 sm:top-20 z-50 lg:hidden max-h-[calc(100vh-4.5rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto bg-[#faf8f5] border-b border-stone-200 px-5 sm:px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-2">
          {/* VIP Badge */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200/60">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-amber-500" />
              {language === 'hi' ? 'नेविगेशन मेनू' : 'Navigation Menu'}
            </span>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              {language === 'hi' ? 'लग्जरी वेडिंग्स' : 'Luxury Weddings'}
            </span>
          </div>

          {/* Nav Links list */}
          <div className="flex flex-col gap-1.5 font-medium text-stone-800">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 px-3.5 rounded-xl transition text-base ${
                    isActive
                      ? 'text-rose-700 font-bold bg-rose-100/70 shadow-xs'
                      : 'text-stone-800 hover:text-rose-700 hover:bg-stone-100/80'
                  }`
                }
              >
                <span>{language === 'hi' ? link.labelHi : link.labelEn}</span>
                <ChevronRight className="size-4 text-stone-400" />
              </NavLink>
            ))}

            <div className="pt-4 mt-2 border-t border-stone-200/70 space-y-3">
              {/* Primary WhatsApp Action in Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition cursor-pointer"
              >
                <WhatsAppIcon variant="white" className="size-5 fill-stone-950" />
                <span>
                  {language === 'hi' ? 'व्हाट्सएप पर संपर्क करें (<15 मिनट)' : 'Connect on WhatsApp (<15 mins)'}
                </span>
              </button>

              {/* Call Hotline */}
              <a
                href="tel:+917717558707"
                className="w-full py-3 px-4 rounded-xl bg-white border border-stone-200/90 text-stone-800 hover:text-rose-600 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Phone className="size-4 text-rose-600" />
                <span>+91 77175 58707 (Hotline)</span>
              </a>

              {/* Language Switch inside Drawer */}
              <div className="pt-2 flex items-center justify-between text-xs text-stone-600">
                <span>{language === 'hi' ? 'भाषा चुनें:' : 'Language Preference:'}</span>
                <button
                  onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                  className="font-bold text-rose-700 hover:underline px-2 py-1 rounded bg-stone-100 cursor-pointer"
                >
                  {language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

