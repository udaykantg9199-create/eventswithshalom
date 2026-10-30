import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types/wedding';
import { Phone, MapPin, Heart, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand Info with Official Logo */}
          <div>
            <div className="mb-5">
              <Link
                to="/"
                className="inline-block p-2.5 sm:p-3 rounded-2xl bg-[#faf8f5] shadow-xl border border-amber-900/40 hover:scale-105 transition-transform"
              >
                <img
                  src="/assets/aistudio/events_with_shalom_logo_centered.png"
                  alt="Events with Shalom"
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="text-sm text-stone-400 max-w-sm leading-relaxed mb-5">
              {language === 'hi'
                ? 'शादी की पूरी प्लानिंग, शानदार मंडप डेकोर और भरोसेमंद वेंडर नेटवर्क। हर रस्म में खुशियों और परंपरा का संगम।'
                : 'Complete luxury wedding planning, bespoke mandap styling, and verified vendor management across India.'}
            </p>

            <div className="flex flex-col gap-2.5 text-sm text-stone-300">
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-rose-500" />
                <a href="tel:+917717558707" className="hover:text-white transition font-semibold">
                  +91 77175 58707
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon variant="brand" className="size-4.5 flex-none" />
                <a
                  href="https://wa.me/917717558707?text=Hello%20Events%20with%20Shalom%2C%20I%20would%20like%20to%20inquire%20about%20wedding%20dates."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition font-semibold text-xs sm:text-sm"
                >
                  WhatsApp: +91 77175 58707
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links with Router */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'पेज व त्वरित लिंक' : 'Pages & Navigation'}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-rose-400 transition">
                  {language === 'hi' ? 'होम पेज' : 'Home page'}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rose-400 transition">
                  {language === 'hi' ? 'हमारी सेवाएं व पैकेज' : 'Services & Packages'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rose-400 transition">
                  {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-rose-400 transition">
                  {language === 'hi' ? 'शादियों की गैलरी' : 'Celebrations Gallery'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rose-400 transition">
                  {language === 'hi' ? 'संपर्क व परामर्श' : 'Contact & Consultation'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions & Destinations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'प्रमुख डेस्टिनेशंस' : 'Key Destinations'}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-rose-500" />
                <span>{language === 'hi' ? 'उदयपुर व जयपुर (राजस्थान महल)' : 'Udaipur & Jaipur (Rajasthan Palaces)'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-rose-500" />
                <span>{language === 'hi' ? 'दिल्ली-NCR व नीमराना' : 'Delhi-NCR & Neemrana Forts'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-rose-500" />
                <span>{language === 'hi' ? 'गोवा व अलीबाग (समुद्र तट)' : 'Goa & Alibaug (Beachfront Luxury)'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-rose-500" />
                <span>{language === 'hi' ? 'ऋषिकेश व जिम कॉर्बेट' : 'Rishikesh & Jim Corbett (Retreats)'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>© {new Date().getFullYear()} Events with Shalom. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</div>
          <div className="flex items-center gap-1">
            <span>{language === 'hi' ? 'सपनों की शादियां सजाते हुए' : 'Crafted with royal elegance & care'}</span>
            <Heart className="size-3 text-rose-600 fill-rose-600" />
          </div>
        </div>
      </div>
    </footer>
  );
};
