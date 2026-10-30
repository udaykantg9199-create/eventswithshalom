import React from 'react';
import Link from 'next/link';
import { Language } from '../types/wedding';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  language: Language;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ language }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fdfcfa] px-5 py-20 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
        <div className="font-serif-luxury text-7xl font-bold text-amber-700 mb-3">
          404
        </div>
        <h1 className="text-2xl font-serif-luxury font-bold text-stone-900 mb-2">
          {language === 'hi' ? 'पृष्ठ नहीं मिला' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          {language === 'hi'
            ? 'आप जिस पृष्ठ को खोज रहे हैं वह उपलब्ध नहीं है या स्थानांतरित कर दिया गया है।'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition"
        >
          <Home className="size-4" />
          <span>{language === 'hi' ? 'होम पेज पर वापस जाएं' : 'Return to Home Page'}</span>
        </Link>
      </div>
    </div>
  );
};
