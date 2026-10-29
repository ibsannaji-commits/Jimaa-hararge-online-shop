import React from 'react';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  lang: 'om' | 'en';
  onExplore: () => void;
  onInquire: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExplore, onInquire }) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-[#f4f1ea] border-b border-[#e6dfd1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#143521] tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#c2953e]"></span>
              <span>{t.heroBadge}</span>
              <span aria-hidden="true" className="text-[#a4b0a7]">·</span>
              <span className="text-[#59665c] font-normal">{BUSINESS_CONFIG.serviceAreaEn}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143521] font-display leading-[1.15] mb-5 text-balance">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4f5c51] leading-relaxed mb-8 max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExplore}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#143521] hover:bg-[#0c2416] active:scale-[0.98] rounded-xl transition-all shadow-sm group whitespace-nowrap"
              >
                <span>{t.heroCtaShop}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onInquire}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#143521] bg-white hover:bg-[#f8f6f0] border border-[#d6cec0] active:scale-[0.98] rounded-xl transition-all shadow-xs whitespace-nowrap"
              >
                <span>{t.heroCtaInquire}</span>
              </button>
            </div>

            {/* Key feature proof points */}
            <div className="pt-6 border-t border-[#dfd7c7] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#4a574d]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#256338] shrink-0" />
                <span className="font-medium">{t.heroFeature1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#256338] shrink-0" />
                <span className="font-medium">{t.heroFeature2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#256338] shrink-0" />
                <span className="font-medium">{t.heroFeature3}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Image */}
          <div className="lg:col-span-5 relative flex items-center">
            <div className="relative w-full h-full min-h-[320px] lg:min-h-[440px] rounded-2xl overflow-hidden shadow-md border border-[#dfd7c7] bg-[#e8e2d4]">
              <img
                src="/src/assets/images/hero_hararghe_khat_1793212059551.jpg"
                alt="Fresh Hararghe khat bundled in banana leaves"
                className="w-full h-full object-cover object-center"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Overlay note on bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 bg-black/40 backdrop-blur-md rounded-xl border border-white/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#f0d494] mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Harargee ➔ Finfinnee</span>
                </div>
                <p className="text-xs text-white/90">
                  {t.freshnessGuarantee}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
