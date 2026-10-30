import React, { useState } from 'react';
import { Language } from '../types/wedding';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Phone,
  MapPin,
  Mail,
  Calendar,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

interface ContactPageProps {
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    destination: 'Udaipur, Rajasthan',
    guests: '300',
    budget: '₹25L - ₹40L',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSubmitted(true);

    const message = `Hello Events with Shalom, I would like to book a luxury wedding consultation.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nWedding Date: ${formData.date || 'TBD'}\nPreferred Destination: ${formData.destination}\nGuest Count: ${formData.guests}\nBudget: ${formData.budget}\nNotes: ${formData.notes || 'None'}`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917717558707?text=${encoded}`;

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const offices = [
    {
      cityHi: 'नई दिल्ली (मुख्यालय)',
      cityEn: 'New Delhi (HQ)',
      addressHi: 'कुतुब हेरिटेज लेन, महरौली, नई दिल्ली',
      addressEn: 'Qutub Heritage Enclave, Mehrauli, New Delhi',
      phone: '+91 11 5550 1420',
      hours: 'Mon - Sun, 10:00 AM - 8:00 PM',
    },
    {
      cityHi: 'उदयपुर (डेस्टिनेशन हब)',
      cityEn: 'Udaipur (Palace Hub)',
      addressHi: 'पिछोला लेक एवेन्यू, अंबामाता, उदयपुर, राजस्थान',
      addressEn: 'Lake Pichola Avenue, Ambamata, Udaipur, Rajasthan',
      phone: '+91 294 555 0142',
      hours: 'By Appointment Only',
    },
    {
      cityHi: 'मुंबई (कंसल्टेशन स्टूडियो)',
      cityEn: 'Mumbai (Consultation Studio)',
      addressHi: 'पाली हिल, बांद्रा वेस्ट, मुंबई',
      addressEn: 'Pali Hill, Bandra West, Mumbai, Maharashtra',
      phone: '+91 22 5550 1420',
      hours: 'Tue - Sat, 11:00 AM - 7:00 PM',
    },
    {
      cityHi: 'गोवा (तटीय विंग)',
      cityEn: 'Goa (Coastal Luxury)',
      addressHi: 'कैंडोलिम बीच रोड, उत्तरी गोवा',
      addressEn: 'Candolim Coastway, North Goa',
      phone: '+91 832 555 0142',
      hours: 'Mon - Sat, 10:00 AM - 6:00 PM',
    },
  ];

  return (
    <div className="bg-[#fdfcfa] text-stone-900">
      {/* 1. Header Banner */}
      <section className="relative py-20 md:py-28 bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img
            src="/assets/aistudio/Golden_Hour_Mandap_Romance_eceb7275.png"
            alt="Events with Shalom Contact Background"
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
            <span className="text-stone-300">{language === 'hi' ? 'संपर्क' : 'Contact'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-white mb-6">
            {language === 'hi' ? 'परामर्श व पूछताछ' : 'Plan Your Royal Celebration'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed mb-8">
            {language === 'hi'
              ? 'अपनी शादी की तारीख, स्थान और विचारों पर हमारे वरिष्ठ वेडिंग डायरेक्टर से सीधे चर्चा करें।'
              : 'Directly connect with our Senior Wedding Directors to discuss dates, royal palace venues, and custom scenography.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/917717558707?text=Hello%20Events%20with%20Shalom%2C%20I%20would%20like%20to%20inquire%20about%20wedding%20dates."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm shadow-xl transition-all group"
            >
              <WhatsAppIcon variant="white" className="size-5 fill-stone-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'सीधे व्हाट्सएप पर पूछें' : 'Chat Directly on WhatsApp'}</span>
            </a>
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

      {/* 2. Main Contact Form & Details Grid */}
      <section className="py-16 md:py-24 mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3">
                <Sparkles className="size-3.5" />
                <span>{language === 'hi' ? 'शीघ्र संपर्क' : 'Immediate Assistance'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mb-3">
                {language === 'hi' ? 'हमसे सीधे जुड़ें' : 'Get in Touch'}
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {language === 'hi'
                  ? 'हमारी टीम 15 मिनट के भीतर व्हाट्सएप पर जवाब देती है। आप अपनी सुविधानुसार फोन या वीडियो कॉल भी शेड्यूल कर सकते हैं।'
                  : 'Our directorial desk responds in under 15 minutes during business hours. We coordinate private video previews for overseas and outstation families.'}
              </p>
            </div>

            {/* Quick Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-xl bg-rose-50 text-rose-600 grid place-items-center flex-none">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">{language === 'hi' ? 'फोन कॉलिंग' : 'Call Desk'}</div>
                  <a href="tel:+917717558707" className="text-sm font-bold text-stone-900 hover:text-rose-600 transition">
                    +91 77175 58707
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center flex-none">
                  <WhatsAppIcon variant="brand" className="size-6" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">WhatsApp VIP Concierge</div>
                  <a
                    href="https://wa.me/917717558707"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-stone-900 hover:text-emerald-600 transition"
                  >
                    +91 77175 58707 (Instant Reply)
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-600 grid place-items-center flex-none">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">Official Inquiries</div>
                  <a href="mailto:weddings@eventswithshalom.com" className="text-sm font-bold text-stone-900 hover:text-amber-600 transition">
                    weddings@eventswithshalom.com
                  </a>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
                {language === 'hi' ? 'हमारे मुख्य केंद्र' : 'Atelier Locations'}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {offices.map((off, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div className="font-bold text-stone-900 mb-1">
                      {language === 'hi' ? off.cityHi : off.cityEn}
                    </div>
                    <div className="text-stone-500 mb-1 leading-snug">
                      {language === 'hi' ? off.addressHi : off.addressEn}
                    </div>
                    <div className="text-stone-400 text-[10px]">{off.hours}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Comprehensive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-serif-luxury font-bold text-stone-900 mb-2">
                  {language === 'hi' ? 'वेडिंग कंसल्टेशन फॉर्म' : 'Reserve a Planning Session'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  {language === 'hi'
                    ? 'कृपया नीचे दी गई जानकारी भरें। हमारी टीम 24 घंटे के भीतर कस्टमाइज्ड प्रपोजल डेक के साथ संपर्क करेगी।'
                    : 'Fill in your wedding parameters below. Our directors will prepare a personalized budget and moodboard.'}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95">
                  <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h4 className="text-xl font-serif-luxury font-bold text-stone-900 mb-2">
                    {language === 'hi' ? 'आपकी पूछताछ दर्ज हो गई है!' : 'Inquiry Successfully Sent!'}
                  </h4>
                  <p className="text-sm text-stone-600 mb-6">
                    {language === 'hi'
                      ? 'धन्यवाद! आपकी चैट सीधे व्हाट्सएप पर खुल रही है। हमारे सीनियर डायरेक्टर आपसे तुरंत जुड़ेंगे।'
                      : 'Thank you! Your inquiry has been forwarded directly to our senior directors on WhatsApp.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition"
                  >
                    {language === 'hi' ? 'एक और फॉर्म भरें' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'आपका नाम *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Shalini & Rahul"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'फोन / व्हाट्सएप नंबर *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'शादी की संभावित तारीख' : 'Tentative Wedding Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'पसंदीदा डेस्टिनेशन' : 'Preferred Destination'}
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      >
                        <option value="Udaipur, Rajasthan">Udaipur (Palaces & Lakes)</option>
                        <option value="Jaipur, Rajasthan">Jaipur (Royal Heritage Forts)</option>
                        <option value="Goa">Goa (Beachfront Luxury)</option>
                        <option value="Delhi-NCR">Delhi-NCR (5-Star & Farmhouses)</option>
                        <option value="Jim Corbett">Jim Corbett (Forest Retreats)</option>
                        <option value="Other">Other Bespoke Location</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'अपेक्षित मेहमान संख्या' : 'Guest Count'}
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      >
                        <option value="50-150">50 - 150 Guests (Intimate)</option>
                        <option value="200-400">200 - 400 Guests (Classic)</option>
                        <option value="500-800">500 - 800 Guests (Grand Royal)</option>
                        <option value="800+">800+ Guests (Mega Production)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        {language === 'hi' ? 'अनुमानित बजट दायरा' : 'Budget Range'}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                      >
                        <option value="₹10L - ₹20L">₹10 Lakhs - ₹20 Lakhs</option>
                        <option value="₹20L - ₹35L">₹20 Lakhs - ₹35 Lakhs</option>
                        <option value="₹35L - ₹60L">₹35 Lakhs - ₹60 Lakhs</option>
                        <option value="₹60L+">₹60 Lakhs+ (Ultra Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      {language === 'hi' ? 'विशेष आवश्यकताएं या विचार' : 'Special Notes & Themes'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Floating lake mandap, Rajasthani folk artists, Sufi night..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-sm shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <WhatsAppIcon variant="white" className="size-5 fill-stone-950 group-hover:scale-110 transition-transform" />
                    <span>
                      {language === 'hi' ? 'व्हाट्सएप पर प्रस्ताव प्राप्त करें' : 'Send Inquiry via WhatsApp'}
                    </span>
                  </button>

                  <p className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    <span>
                      {language === 'hi' ? 'आपकी व्यक्तिगत जानकारी 100% गोपनीय रखी जाती है' : 'Your contact information is strictly confidential & spam-free'}
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
