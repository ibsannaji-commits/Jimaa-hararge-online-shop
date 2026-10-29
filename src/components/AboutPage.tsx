import React from 'react';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Award, MessageCircle } from 'lucide-react';

interface AboutPageProps {
  lang: 'om' | 'en';
  onExploreProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onExploreProducts }) => {
  const t = translations[lang];

  return (
    <article className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c2953e] uppercase tracking-wider mb-2">
          <span>{BUSINESS_CONFIG.shopName}</span>
          <span aria-hidden="true">·</span>
          <span>{BUSINESS_CONFIG.serviceAreaEn}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#143521] font-display mb-4 text-balance">
          {t.aboutTitle}
        </h1>
        <p className="text-base sm:text-lg text-[#4f5d52] leading-relaxed">
          {t.aboutLead}
        </p>
      </div>

      {/* Purpose Banner */}
      <div className="mb-12 p-6 sm:p-8 bg-[#f5f2eb] rounded-3xl border border-[#e5dfd2]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#143521] mb-2 font-display">
          {lang === 'om' ? 'Kaayyoo Keenya' : 'Our Purpose'}
        </h2>
        <p className="text-sm sm:text-base text-[#465348] leading-relaxed">
          {t.aboutPurpose}
        </p>
      </div>

      {/* Vision & Mission 2-Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Vision */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#ded7ca] shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#ecf7ed] flex items-center justify-center text-[#1e582e] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#143521] font-display mb-3">
              {t.visionTitle}
            </h3>
            <p className="text-sm text-[#505d53] leading-relaxed">
              {t.visionText}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#f0ebdF] text-xs text-[#718074]">
            Finfinnee / Addis Ababa, Ethiopia
          </div>
        </div>

        {/* Mission */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#ded7ca] shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#fdf3dc] flex items-center justify-center text-[#b45309] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#143521] font-display mb-3">
            {t.missionTitle}
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#505d53]">
            {t.missionList.map((m, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#256338] shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services List */}
      <div className="mb-12 p-6 sm:p-8 bg-white rounded-3xl border border-[#ded7ca] shadow-xs">
        <h3 className="text-xl font-bold text-[#143521] font-display mb-4">
          {t.servicesTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.servicesList.map((service, idx) => (
            <div key={idx} className="p-4 bg-[#faf9f6] rounded-2xl border border-[#eee8dc] flex items-start gap-3">
              <span className="text-xs font-bold text-[#c2953e] font-mono-numbers mt-0.5">
                0{idx + 1}.
              </span>
              <p className="text-xs sm:text-sm text-[#48554b] leading-relaxed">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Varieties Showcase Box */}
      <div className="mb-12 p-6 sm:p-8 bg-[#143521] text-white rounded-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold text-[#89e09d] uppercase tracking-wider block mb-1">
              {t.varietiesHeading}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Hararghe Regional Excellence
            </h3>
          </div>
          <button
            onClick={onExploreProducts}
            className="px-5 py-2.5 text-xs font-bold text-[#143521] bg-white hover:bg-[#f3f0e8] active:scale-[0.98] rounded-xl transition-all self-start sm:self-auto whitespace-nowrap"
          >
            {t.heroCtaShop}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">1. Shafaa Madhichoo</div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">2. Shafaa Booke</div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">3. Tacoree</div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">4. Galamsoo</div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">5. Liyyu</div>
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">6. Maxxagasha</div>
        </div>
      </div>

      {/* Business Owner / Contact Stamp */}
      <div className="p-6 bg-[#f4f1ea] rounded-2xl border border-[#ded7ca] text-center">
        <div className="text-xs text-[#6e7d72] mb-1">
          {t.businessOwnerLabel}
        </div>
        <div className="text-lg font-bold text-[#143521] font-display mb-2">
          {BUSINESS_CONFIG.ownerName}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono-numbers text-[#143521] mb-3">
          <a href={`tel:${BUSINESS_CONFIG.phone}`} className="flex items-center gap-1.5 hover:underline">
            <Phone className="w-3.5 h-3.5 text-[#256338]" />
            <span>{BUSINESS_CONFIG.phone}</span>
          </a>
          <span className="text-[#a8b5ab]">·</span>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#137333] hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: {BUSINESS_CONFIG.phone}</span>
          </a>
          <span className="text-[#a8b5ab]">·</span>
          <a href={`mailto:${BUSINESS_CONFIG.email}`} className="flex items-center gap-1.5 hover:underline">
            <Mail className="w-3.5 h-3.5 text-[#c2953e]" />
            <span>{BUSINESS_CONFIG.email}</span>
          </a>
        </div>

        <p className="text-xs text-[#526054] italic max-w-xl mx-auto">
          "{t.businessMotto}"
        </p>
      </div>
    </article>
  );
};
