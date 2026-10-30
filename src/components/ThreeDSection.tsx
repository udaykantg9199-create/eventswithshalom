import React, { useState } from 'react';
import { MandapCanvas } from './three/MandapCanvas';
import { Language } from '../types/wedding';
import { MessageCircle, ShieldCheck, Eye } from 'lucide-react';

interface ThreeDSectionProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const ThreeDSection: React.FC<ThreeDSectionProps> = ({ language, onOpenConsultation }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <section id="mandap-3d" className="relative pt-6 pb-16 md:pt-10 md:pb-20 bg-stone-900 text-stone-100 overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 relative z-10">

        {/* 3D Visualizer Canvas */}
        <div className="relative">
          <MandapCanvas
            language={language}
            onOpenConsultation={onOpenConsultation}
            isFullScreenMode={isFullScreen}
            onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
          />
        </div>

        {/* Features / Benefits Strip below 3D canvas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-800 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
              <Eye className="size-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? '360° पूर्ण दृश्य' : '360° Interactive Angle'}
              </h4>
              <p className="text-xs text-stone-400">
                {language === 'hi' ? 'हर खंभा, झूमर और स्टेज बारीकी से जांचें' : 'Inspect every pillar, fabric and chandelier'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-800 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldCheck className="size-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? '100% सटीक ऑन-साइट' : '100% Accurate Execution'}
              </h4>
              <p className="text-xs text-stone-400">
                {language === 'hi' ? 'जो 3D में तय होगा, वही ग्राउंड पर बनेगा' : 'What you see in 3D is crafted on-ground'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-800 flex items-center justify-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MessageCircle className="size-5" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Direct WhatsApp Quote'}
              </h4>
              <p className="text-xs text-stone-400">
                {language === 'hi' ? 'अपनी पसंदीदा थीम का तुरंत कोटेशन पाएं' : 'Get immediate customized pricing on chat'}
              </p>
            </div>
          </div>
        </div>

        {/* CTA banner below 3D */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-rose-900/60 via-stone-800 to-amber-950/40 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
              {language === 'hi' ? 'क्या आपकी अपनी कोई पसंदीदा थीम या प्रेरणा है?' : 'Have a custom theme or Pinterest board?'}
            </h3>
            <p className="text-sm text-stone-300">
              {language === 'hi'
                ? 'हमारे डिज़ाइनर आपकी कल्पना के अनुसार कस्टम 3D मॉडल तैयार करके 24 घंटे में भेज देंगे।'
                : 'Share your references on WhatsApp and our set designers will build your custom 3D model in 24 hours.'}
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold text-sm hover:brightness-110 shadow-lg transition flex items-center gap-2"
          >
            <MessageCircle className="size-4" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर डिज़ाइन भेजें' : 'Chat with 3D Designer'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
