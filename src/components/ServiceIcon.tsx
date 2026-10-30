import React from 'react';
import { Crown, Landmark, Flower2, Compass, Music2, HeartHandshake } from 'lucide-react';

interface ServiceIconProps {
  id: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ id, className = 'size-6' }) => {
  switch (id) {
    case 'full-planning':
      return <Crown className={className} />;
    case 'mandap-decor':
      return <Landmark className={className} />;
    case 'floral-artistry':
      return <Flower2 className={className} />;
    case 'destination-weddings':
      return <Compass className={className} />;
    case 'sangeet-entertainment':
    case 'mehendi-sangeet':
      return <Music2 className={className} />;
    case 'hospitality-concierge':
    case 'vendor-network':
    case 'whatsapp-support':
      return <HeartHandshake className={className} />;
    default:
      return <Crown className={className} />;
  }
};

export const getServiceIconTheme = (id: string) => {
  switch (id) {
    case 'full-planning':
      return {
        containerBg: 'bg-gradient-to-br from-amber-50 via-amber-100/40 to-stone-50 border-amber-200/80',
        textColor: 'text-amber-800',
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      };
    case 'mandap-decor':
      return {
        containerBg: 'bg-gradient-to-br from-rose-50 via-rose-100/40 to-stone-50 border-rose-200/80',
        textColor: 'text-rose-800',
        badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
      };
    case 'floral-artistry':
      return {
        containerBg: 'bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-stone-50 border-emerald-200/80',
        textColor: 'text-emerald-800',
        badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      };
    case 'destination-weddings':
      return {
        containerBg: 'bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100/40 border-amber-300/70',
        textColor: 'text-amber-900',
        badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      };
    case 'sangeet-entertainment':
    case 'mehendi-sangeet':
      return {
        containerBg: 'bg-gradient-to-br from-purple-50 via-purple-100/40 to-stone-50 border-purple-200/80',
        textColor: 'text-purple-800',
        badgeBg: 'bg-purple-50 text-purple-900 border-purple-200',
      };
    case 'hospitality-concierge':
    case 'vendor-network':
    case 'whatsapp-support':
      return {
        containerBg: 'bg-gradient-to-br from-rose-50 via-amber-50/50 to-stone-50 border-rose-200/80',
        textColor: 'text-rose-800',
        badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
      };
    default:
      return {
        containerBg: 'bg-stone-50 border-stone-200',
        textColor: 'text-stone-800',
        badgeBg: 'bg-stone-50 text-stone-800 border-stone-200',
      };
  }
};
