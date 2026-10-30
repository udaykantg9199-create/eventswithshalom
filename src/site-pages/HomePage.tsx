import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { Language } from '../types/wedding';

interface HomePageProps {
  language: Language;
  onOpenConsultation: (message?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onOpenConsultation,
}) => {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        language={language}
        onOpenConsultation={() => onOpenConsultation('')}
      />

      {/* 2. Comprehensive Services Overview */}
      <ServicesSection
        language={language}
        onOpenConsultation={(msg) => onOpenConsultation(msg || '')}
      />

      {/* 3. About Section */}
      <AboutSection
        language={language}
        onOpenConsultation={() => onOpenConsultation('')}
      />

      {/* 4. Real Weddings Portfolio */}
      <PortfolioGallery
        language={language}
        onOpenConsultation={() => onOpenConsultation('')}
      />

      {/* 5. Client Reviews */}
      <TestimonialsSection language={language} />

      {/* 6. FAQs */}
      <FAQSection
        language={language}
        onOpenConsultation={() => onOpenConsultation('')}
      />
    </div>
  );
};

