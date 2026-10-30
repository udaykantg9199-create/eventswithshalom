import React, { useState } from 'react';
import { Language } from '../types/wedding';
import { X, Send, CheckCircle2, Calendar, MapPin, User, Phone } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  prefillMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
  prefillMessage = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState(prefillMessage);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f59e0b', '#ffd700'],
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);

    const message = `Namaste Events with Shalom! I am ${name}.%0A*Phone:* ${phone}%0A*Wedding Date:* ${date || 'Flexible'}%0A*Destination:* ${city || 'Undecided'}%0A*Notes:* ${notes || prefillMessage || 'Full Wedding Planning & Bespoke Decor'}%0A%0APlease connect with me on WhatsApp.`;
    const waUrl = `https://wa.me/917717558707?text=${message}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl border border-stone-200 text-stone-900 max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 md:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-3">
            <img
              src="/assets/aistudio/events_with_shalom_logo_centered.png"
              alt="Events with Shalom"
              className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply"
            />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <WhatsAppIcon variant="brand" className="size-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप कंसल्टेशन' : 'Direct WhatsApp'}</span>
            </div>
          </div>
          <h3 className="text-2xl font-serif-luxury font-bold text-stone-900">
            {language === 'hi' ? 'अपनी शादी की बात शुरू करें' : 'Begin Your Wedding Journey'}
          </h3>
          <p className="text-xs md:text-sm text-stone-500 mt-1">
            {language === 'hi'
              ? 'विवरण भरें, संदेश सीधे हमारे सीनियर वेडिंग प्लानर तक पहुंचेगा।'
              : 'Our senior directors typically respond within 15 minutes.'}
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto">
              <CheckCircle2 className="size-8" />
            </div>
            <h4 className="text-xl font-serif-luxury font-bold text-stone-900">
              {language === 'hi' ? 'व्हाट्सएप चैट खुल रही है!' : 'Opening WhatsApp Chat!'}
            </h4>
            <p className="text-xs md:text-sm text-stone-600">
              {language === 'hi'
                ? 'यदि चैट स्वतः नहीं खुली, तो नीचे क्लिक करें।'
                : 'If chat did not open automatically, please click below.'}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs"
            >
              {language === 'hi' ? 'बंद करें' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                {language === 'hi' ? 'आपका नाम *' : 'Your Full Name *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'hi' ? 'प्रिया शर्मा / रोहन वर्मा' : 'e.g. Priya Sharma'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                />
                <User className="size-4 text-stone-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  {language === 'hi' ? 'व्हाट्सएप नंबर *' : 'WhatsApp Number *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                  />
                  <Phone className="size-4 text-stone-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                  {language === 'hi' ? 'शादी की तारीख' : 'Wedding Date'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                  />
                  <Calendar className="size-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                {language === 'hi' ? 'शहर / वेन्यू' : 'City / Preferred Venue'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={language === 'hi' ? 'जैसे: उदयपुर, जयपुर, दिल्ली, गोवा...' : 'e.g. Udaipur, Jaipur, Delhi...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50"
                />
                <MapPin className="size-4 text-stone-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                {language === 'hi' ? 'आपकी ज़रूरत / संदेश' : 'Requirements or Ideas'}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'hi' ? 'पूरी प्लानिंग, मंडप डेकोर, कैटरिंग...' : 'Full planning, bespoke mandap decor, catering...'}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm text-stone-900 bg-stone-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <WhatsAppIcon variant="white" className="size-5 fill-stone-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send to WhatsApp'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
