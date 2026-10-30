import React, { useState } from 'react';
import { Language } from '../types/wedding';
import { Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#f59e0b', '#ffd700'],
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);

    const message = `Namaste Events with Shalom! I am ${name}.%0A*Phone:* ${phone}%0A*Wedding Date:* ${date || 'Not fixed yet'}%0A*City/Venue:* ${city || 'Undecided'}%0A*Requirement:* ${notes || 'Full Wedding Planning & Bespoke Decor'}%0A%0APlease share details and connect with me.`;
    const waUrl = `https://wa.me/917717558707?text=${message}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 to-amber-50/50 text-stone-900">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct WhatsApp & Call Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 tracking-wide">
              <WhatsAppIcon variant="brand" className="size-4" />
              <span>{language === 'hi' ? 'सीधा संपर्क • तुरंत जवाब' : 'Direct WhatsApp & Voice Concierge'}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight leading-tight">
              {language === 'hi' ? 'अपनी बात सीधे व्हाट्सएप पर भेजें' : 'Connect Directly on WhatsApp'}
            </h2>

            <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-8">
              {language === 'hi'
                ? 'फॉर्म भरें या सीधे फोन करें — आपकी पूछताछ हमारी कोर प्लानिंग टीम तक पहुंचेगी। जवाब आमतौर पर 15 मिनट के अंदर!'
                : 'Fill in your wedding details or call us directly. Our core planning directors will respond within 15 minutes.'}
            </p>

            {/* Direct Phone Call Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-md mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-rose-50 text-rose-600">
                  <Phone className="size-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-stone-400">
                    {language === 'hi' ? 'तुरंत कॉल करें (24/7 हेल्पलाइन):' : 'Instant Phone Line (24/7):'}
                  </div>
                  <a
                    href="tel:+917717558707"
                    className="text-2xl font-serif-luxury font-bold text-stone-900 hover:text-rose-600 transition"
                  >
                    +91 77175 58707
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium mt-3 pt-3 border-t border-stone-100">
                <Clock className="size-3.5" />
                <span>{language === 'hi' ? 'जवाब आमतौर पर 15 मिनट में सीधे व्हाट्सएप पर।' : 'Average WhatsApp response time: < 15 mins.'}</span>
              </div>
            </div>

            {/* Office Locations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                {language === 'hi' ? 'हमारे मुख्य स्टूडियो व कार्यालय:' : 'Our Flagship Studios:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs md:text-sm text-stone-700">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-stone-200">
                  <MapPin className="size-4 text-rose-500 flex-none" />
                  <span>
                    <strong>{language === 'hi' ? 'दिल्ली-NCR:' : 'Delhi-NCR:'}</strong>{' '}
                    {language === 'hi' ? 'एरोसिटी व छतरपुर' : 'Aerocity & Chhatarpur'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-stone-200">
                  <MapPin className="size-4 text-rose-500 flex-none" />
                  <span>
                    <strong>{language === 'hi' ? 'जयपुर:' : 'Jaipur:'}</strong>{' '}
                    {language === 'hi' ? 'सी-स्कीम, सिविल लाइंस' : 'C-Scheme, Civil Lines'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-stone-200">
                  <MapPin className="size-4 text-rose-500 flex-none" />
                  <span>
                    <strong>{language === 'hi' ? 'उदयपुर:' : 'Udaipur:'}</strong>{' '}
                    {language === 'hi' ? 'फतेह सागर झील मार्ग' : 'Fateh Sagar Lake Road'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 border border-stone-200">
                  <MapPin className="size-4 text-rose-500 flex-none" />
                  <span>
                    <strong>{language === 'hi' ? 'मुंबई:' : 'Mumbai:'}</strong>{' '}
                    {language === 'hi' ? 'बांद्रा कुर्ला कॉम्प्लेक्स (BKC)' : 'Bandra Kurla Complex (BKC)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 md:p-9 shadow-xl relative">
            <h3 className="text-xl md:text-2xl font-serif-luxury font-bold text-stone-900 mb-1">
              {language === 'hi' ? 'मुफ्त कोटेशन व तारीख उपलब्धता' : 'Request Quotation & Date Check'}
            </h3>
            <p className="text-xs md:text-sm text-stone-500 mb-6">
              {language === 'hi' ? 'विवरण भरते ही हमारी टीम व्हाट्सएप पर संपर्क करेगी।' : 'Fill in the details below for an instant response on WhatsApp.'}
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
                  <CheckCircle2 className="size-8" />
                </div>
                <h4 className="text-xl font-serif-luxury font-bold text-stone-900">
                  {language === 'hi' ? 'धन्यवाद! व्हाट्सएप खुल रहा है...' : 'Thank You! Opening WhatsApp...'}
                </h4>
                <p className="text-sm text-stone-600 max-w-sm mx-auto">
                  {language === 'hi'
                    ? 'आपकी पूछताछ हमारे वेडिंग डायरेक्टर तक पहुंच गई है। यदि व्हाट्सएप नहीं खुला, तो नीचे दिए गए बटन पर क्लिक करें।'
                    : 'Your inquiry has been relayed. Click below if your WhatsApp did not launch automatically.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition"
                >
                  {language === 'hi' ? 'दूसरा संदेश भेजें' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    {language === 'hi' ? 'आपका नाम (Full Name) *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'hi' ? 'जैसे: प्रिया शर्मा / रोहन वर्मा' : 'e.g. Priya Sharma'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      {language === 'hi' ? 'व्हाट्सएप नंबर (WhatsApp No) *' : 'WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                      {language === 'hi' ? 'शादी की तारीख (Wedding Date)' : 'Wedding Date'}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    {language === 'hi' ? 'शहर / वेन्यू (City / Venue)' : 'Destination / City'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={language === 'hi' ? 'जैसे: उदयपुर, जयपुर, दिल्ली-NCR, गोवा...' : 'e.g. Udaipur, Jaipur, Delhi-NCR, Goa'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                    {language === 'hi' ? 'हमें अपनी ज़रूरत बताएं (Requirements)' : 'Specific Requirements'}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'hi' ? 'जैसे: पूरी प्लानिंग, मंडप डेकोर, कैटरिंग, 500 मेहमान...' : 'e.g. Complete planning, mandap decor, catering, 500 guests...'}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <WhatsAppIcon variant="white" className="size-5 fill-stone-950 group-hover:scale-110 transition-transform" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send to WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
