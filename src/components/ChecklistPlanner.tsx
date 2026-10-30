import React, { useState } from 'react';
import { CHECKLIST } from '../data/weddingData';
import { ChecklistItem, Language } from '../types/wedding';
import { CalendarCheck, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ChecklistPlannerProps {
  language: Language;
  onOpenConsultation: () => void;
}

export const ChecklistPlanner: React.FC<ChecklistPlannerProps> = ({ language, onOpenConsultation }) => {
  const [items, setItems] = useState<ChecklistItem[]>(CHECKLIST);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <section id="checklist" className="py-16 md:py-24 bg-white text-stone-900 border-b border-stone-200">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-3 tracking-wide">
            <CalendarCheck className="size-3.5 text-rose-600" />
            <span>{language === 'hi' ? 'तनाव-मुक्त टाइमलाइन' : 'Stress-Free Countdown'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
            {language === 'hi' ? 'शादी की चेकलिस्ट और समय-सारिणी' : 'The 12-Month Wedding Checklist'}
          </h2>

          <p className="text-base md:text-lg text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'महीने-दर-महीने चरणबद्ध गाइड ताकि कोई भी रस्म या व्यवस्था छूट न जाए।'
              : 'A step-by-step master timeline curated by our wedding directors to keep every milestone on track.'}
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="max-w-3xl mx-auto mb-10 p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-1">
              {language === 'hi' ? 'आपकी तैयारी की स्थिति:' : 'Preparation Progress:'}
            </div>
            <div className="text-xl font-bold text-stone-900">
              {completedCount} / {items.length} {language === 'hi' ? 'चरण पूर्ण' : 'Milestones Completed'} ({progressPercent}%)
            </div>
          </div>

          <div className="w-full sm:w-64 h-3 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-start gap-4 ${item.completed ? 'bg-rose-50/40 border-rose-200' : 'bg-white border-stone-200 hover:border-stone-300'}`}
            >
              <button
                type="button"
                className={`mt-0.5 flex-none transition-colors ${item.completed ? 'text-rose-600' : 'text-stone-300 hover:text-stone-400'}`}
              >
                {item.completed ? <CheckCircle2 className="size-6 fill-rose-600 text-white" /> : <Circle className="size-6" />}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full">
                    {language === 'hi' ? item.phaseHi : item.phaseEn}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    Step {index + 1}
                  </span>
                </div>

                <h3 className={`text-base md:text-lg font-serif-luxury font-bold ${item.completed ? 'text-stone-800 line-through decoration-rose-400' : 'text-stone-900'}`}>
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </h3>

                <p className="text-xs md:text-sm text-stone-600 mt-1 leading-relaxed">
                  {language === 'hi' ? item.descHi : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-10">
          <p className="text-sm text-stone-500 mb-3">
            {language === 'hi'
              ? 'क्या आप चाहते हैं कि हमारी टीम आपकी शादी की पूरी चेकलिस्ट और समय-सारिणी संभाले?'
              : 'Want our dedicated planners to manage your entire cue sheet and vendor scheduling?'}
          </p>
          <button
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs md:text-sm shadow-md transition"
          >
            <WhatsAppIcon variant="brand" className="size-4.5" />
            <span>{language === 'hi' ? 'प्लानर से समय-सारिणी पर बात करें' : 'Discuss Timeline with Director'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
