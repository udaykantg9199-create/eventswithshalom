import React, { useState, useMemo } from 'react';
import { Language } from '../types/wedding';
import { Calculator, Check, Sparkles, Building2, Users } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface BudgetCalculatorProps {
  language: Language;
  onOpenConsultationWithData?: (summary: string) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  language,
  onOpenConsultationWithData,
}) => {
  const [guestCount, setGuestCount] = useState<number>(350);
  const [city, setCity] = useState<'delhi' | 'rajasthan' | 'mumbai' | 'goa'>('rajasthan');
  const [tier, setTier] = useState<'essential' | 'grand' | 'royal'>('grand');
  const [functions, setFunctions] = useState<string[]>(['mehendi', 'haldi', 'sangeet', 'shaadi', 'reception']);

  const toggleFunction = (fn: string) => {
    setFunctions((prev) =>
      prev.includes(fn) ? (prev.length > 1 ? prev.filter((item) => item !== fn) : prev) : [...prev, fn]
    );
  };

  // Calculation logic
  const calculation = useMemo(() => {
    // Base cost per guest based on tier & city
    let perGuestPlate = 2200; // Essential
    if (tier === 'grand') perGuestPlate = 3600;
    if (tier === 'royal') perGuestPlate = 5800;

    let cityMultiplier = 1.0;
    if (city === 'delhi') cityMultiplier = 1.0;
    if (city === 'rajasthan') cityMultiplier = 1.25; // Palace heritage premium
    if (city === 'mumbai') cityMultiplier = 1.2;
    if (city === 'goa') cityMultiplier = 1.35;

    // Catering total for selected functions
    const cateringTotal = Math.round(guestCount * perGuestPlate * (functions.length * 0.45) * cityMultiplier);

    // Decor & Mandap calculation
    let baseDecor = 800000;
    if (tier === 'grand') baseDecor = 1800000;
    if (tier === 'royal') baseDecor = 3800000;
    const decorTotal = Math.round(baseDecor * (functions.length / 5) * cityMultiplier);

    // Photography & Cinematic Video
    let photoTotal = tier === 'essential' ? 350000 : tier === 'grand' ? 750000 : 1500000;

    // Sound, DJ & Artist Production
    let entertainmentTotal = tier === 'essential' ? 250000 : tier === 'grand' ? 650000 : 1800000;

    // Logistics & Coordinator management
    let planningFee = Math.round((cateringTotal + decorTotal + photoTotal + entertainmentTotal) * 0.08);

    const grandTotal = cateringTotal + decorTotal + photoTotal + entertainmentTotal + planningFee;

    return {
      cateringTotal,
      decorTotal,
      photoTotal,
      entertainmentTotal,
      planningFee,
      grandTotal,
    };
  }, [guestCount, city, tier, functions]);

  const formatLakhs = (amt: number) => {
    const lakhs = (amt / 100000).toFixed(1);
    return `₹${lakhs} Lakhs`;
  };

  const getSummaryString = () => {
    return `Hi Events with Shalom! I calculated an estimated budget for ${guestCount} guests in ${city.toUpperCase()} (${tier.toUpperCase()} tier with ${functions.length} events: ${functions.join(', ')}). Estimated total: ${formatLakhs(calculation.grandTotal)}. Can we discuss available dates & custom quotation?`;
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3 tracking-wide">
            <Calculator className="size-3.5 text-amber-700" />
            <span>{language === 'hi' ? 'पारदर्शी अनुमान • त्वरित बजट' : 'Transparent Estimation Tool'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'वेडिंग बजट कैलकुलेटर' : 'Interactive Wedding Cost Calculator'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'मेहमानों की संख्या, शहर और आयोजनों का चयन करें। अपनी शादी का पारदर्शी अनुमान तुरंत प्राप्त करें।'
              : 'Customize guest count, destination and ceremonies for an instant itemized budget estimation.'}
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-stone-50/80 rounded-2xl border border-stone-200/90 p-6 md:p-8 space-y-7 shadow-sm">
            {/* 1. Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-stone-800 flex items-center gap-2">
                  <Users className="size-4 text-rose-600" />
                  <span>{language === 'hi' ? 'अपेक्षित मेहमानों की संख्या' : 'Guest Count'}</span>
                </label>
                <span className="text-lg font-bold text-rose-600 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
                  {guestCount} {language === 'hi' ? 'मेहमान' : 'Guests'}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full accent-rose-600 h-2.5 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                <span>100</span>
                <span>500</span>
                <span>1000</span>
                <span>1500+</span>
              </div>
            </div>

            {/* 2. Destination / City */}
            <div>
              <label className="text-sm font-bold text-stone-800 block mb-2.5 flex items-center gap-2">
                <Building2 className="size-4 text-rose-600" />
                <span>{language === 'hi' ? 'वेन्यू शहर / डेस्टिनेशन' : 'Destination / City'}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'delhi', labelHi: 'दिल्ली-NCR', labelEn: 'Delhi-NCR' },
                  { id: 'rajasthan', labelHi: 'जयपुर / उदयपुर', labelEn: 'Rajasthan' },
                  { id: 'mumbai', labelHi: 'मुंबई / पुणे', labelEn: 'Mumbai' },
                  { id: 'goa', labelHi: 'गोवा / समुद्र', labelEn: 'Goa' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCity(c.id as any)}
                    className={`py-2 px-2.5 text-xs font-semibold rounded-xl border text-center transition ${city === c.id ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'}`}
                  >
                    {language === 'hi' ? c.labelHi : c.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Event Tier */}
            <div>
              <label className="text-sm font-bold text-stone-800 block mb-2.5">
                {language === 'hi' ? 'वेडिंग स्टाइल व लग्जरी स्तर' : 'Luxury Tier & Decor Scale'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'essential', labelHi: 'क्लासिक एलिगेंस', labelEn: 'Classic Elegance', desc: '₹20-35 Lakhs' },
                  { id: 'grand', labelHi: 'ग्रैंड रॉयल', labelEn: 'Grand Royal', desc: '₹40-75 Lakhs' },
                  { id: 'royal', labelHi: 'अल्ट्रा लग्ज़री', labelEn: 'Bespoke Luxury', desc: '₹85L - 1.5Cr+' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    className={`p-3 text-left rounded-xl border transition flex flex-col justify-between ${tier === t.id ? 'bg-rose-50 border-rose-600 ring-1 ring-rose-500' : 'bg-white border-stone-200 hover:border-stone-300'}`}
                  >
                    <span className="text-xs font-bold text-stone-900 leading-tight">
                      {language === 'hi' ? t.labelHi : t.labelEn}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-rose-600 mt-1">
                      {t.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ceremony Checklist */}
            <div>
              <label className="text-sm font-bold text-stone-800 block mb-2.5">
                {language === 'hi' ? 'समारोह व रस्में शामिल करें' : 'Include Wedding Functions'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'mehendi', labelHi: 'मेहंदी (Mehendi)', labelEn: 'Mehendi Ceremony' },
                  { id: 'haldi', labelHi: 'हल्दी (Haldi)', labelEn: 'Haldi Celebration' },
                  { id: 'sangeet', labelHi: 'संगीत नाइट (Sangeet)', labelEn: 'Sangeet & Dance' },
                  { id: 'shaadi', labelHi: 'फेरे व मंडप (Wedding)', labelEn: 'Wedding Vows & Mandap' },
                  { id: 'reception', labelHi: 'रिसेप्शन (Reception)', labelEn: 'Grand Reception' },
                ].map((fn) => {
                  const isChecked = functions.includes(fn.id);
                  return (
                    <button
                      key={fn.id}
                      type="button"
                      onClick={() => toggleFunction(fn.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition text-left ${isChecked ? 'bg-amber-50 text-stone-900 border-amber-300' : 'bg-white text-stone-400 border-stone-200'}`}
                    >
                      <span className={`size-4 rounded-md flex items-center justify-center border text-[10px] ${isChecked ? 'bg-amber-600 text-white border-amber-600' : 'border-stone-300'}`}>
                        {isChecked && '✓'}
                      </span>
                      <span className="truncate">{language === 'hi' ? fn.labelHi : fn.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Budget Breakdown Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl border border-stone-800 p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-5">
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                {language === 'hi' ? 'अनुमानित व्यय विवरण' : 'Estimated Breakdown'}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {guestCount} {language === 'hi' ? 'मेहमान' : 'Guests'} • {functions.length} {language === 'hi' ? 'रस्में' : 'Events'}
              </span>
            </div>

            {/* Total Highlight */}
            <div className="mb-6 p-4 rounded-xl bg-stone-800/60 border border-stone-700/80">
              <div className="text-xs text-stone-400 mb-1">
                {language === 'hi' ? 'कुल अनुमानित बजट (Grand Total):' : 'Estimated Total Investment:'}
              </div>
              <div className="text-3xl md:text-4xl font-serif-luxury font-bold text-amber-300">
                {formatLakhs(calculation.grandTotal)}
              </div>
              <div className="text-[11px] text-stone-400 mt-1">
                * {language === 'hi' ? 'वेन्यू, कैटरिंग, डेकोर व मैनेजमेंट सहित' : 'Includes venue decor, gourmet catering & coordination'}
              </div>
            </div>

            {/* Itemized Lines */}
            <div className="space-y-3 text-xs md:text-sm border-b border-stone-800 pb-5 mb-6 text-stone-300">
              <div className="flex justify-between items-center">
                <span>🍽️ {language === 'hi' ? 'कैटरिंग व भोजन:' : 'Gourmet Catering & Dining:'}</span>
                <span className="font-mono text-white font-semibold">{formatLakhs(calculation.cateringTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🌸 {language === 'hi' ? 'शाही डेकोर व स्टेज:' : 'Decor, Floral & Stage:'}</span>
                <span className="font-mono text-white font-semibold">{formatLakhs(calculation.decorTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>📸 {language === 'hi' ? 'फोटोग्राफी व सिनेमा:' : 'Cinematography & Photos:'}</span>
                <span className="font-mono text-white font-semibold">{formatLakhs(calculation.photoTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🎵 {language === 'hi' ? 'संगीत, डीजे व साउंड AV:' : 'Sound, DJ & Live AV:'}</span>
                <span className="font-mono text-white font-semibold">{formatLakhs(calculation.entertainmentTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-300">
                <span>⭐ {language === 'hi' ? 'वेडिंग प्लानिंग व ऑन-साइट टीम:' : 'Planning & Coordination:'}</span>
                <span className="font-mono text-rose-300 font-semibold">{formatLakhs(calculation.planningFee)}</span>
              </div>
            </div>

            {/* Direct WhatsApp Quote Button */}
            <button
              onClick={() => {
                if (onOpenConsultationWithData) {
                  onOpenConsultationWithData(getSummaryString());
                } else {
                  const encoded = encodeURIComponent(getSummaryString());
                  window.open(`https://wa.me/917717558707?text=${encoded}`, '_blank');
                }
              }}
              className="w-full py-4 px-4 rounded-xl font-bold text-sm bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 shadow-xl transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <WhatsAppIcon variant="white" className="size-5 fill-stone-950 group-hover:scale-110 transition-transform" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर विस्तृत कोटेशन लें' : 'Get Itemized WhatsApp Quote'}</span>
            </button>

            <p className="text-[11px] text-stone-500 text-center mt-3">
              {language === 'hi'
                ? 'यह एक सांकेतिक अनुमान है। वास्तविक दरें वेन्यू व तारीखों के अनुसार भिन्न हो सकती हैं।'
                : 'Indicative estimate based on industry benchmarks. Customized packages available.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
