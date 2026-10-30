export type Language = 'hi' | 'en';

export interface WeddingService {
  id: string;
  icon: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  inclusionsHi: string[];
  inclusionsEn: string[];
  tagHi: string;
  tagEn: string;
}

export interface PortfolioItem {
  id: string;
  titleHi: string;
  titleEn: string;
  category: 'mandap' | 'palace' | 'haldi' | 'reception';
  categoryLabelHi: string;
  categoryLabelEn: string;
  locationHi: string;
  locationEn: string;
  image: string;
  guests: number;
  highlightHi: string;
  highlightEn: string;
}

export interface Testimonial {
  id: string;
  coupleHi: string;
  coupleEn: string;
  cityHi: string;
  cityEn: string;
  reviewHi: string;
  reviewEn: string;
  rating: number;
  avatarText: string;
  venueHi: string;
  venueEn: string;
}

export interface ChecklistItem {
  id: string;
  phaseHi: string;
  phaseEn: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  dueMonths: number;
  completed: boolean;
}

export interface FAQItem {
  id: string;
  qHi: string;
  qEn: string;
  aHi: string;
  aEn: string;
}

export interface MandapThemeConfig {
  id: 'royal' | 'pastel' | 'haldi' | 'sangeet';
  nameHi: string;
  nameEn: string;
  subtitleHi: string;
  subtitleEn: string;
  primaryColor: number;
  secondaryColor: number;
  goldColor: number;
  carpetColor: number;
  flowerColor1: number;
  flowerColor2: number;
  ambientIntensity: number;
  sunColor: number;
  skyColor: number;
  fogColor: number;
  pillarMaterial: 'gold' | 'marble' | 'carvedWood' | 'crystal';
}
