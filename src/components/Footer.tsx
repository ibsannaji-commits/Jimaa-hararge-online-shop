import React from 'react';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { Phone, Mail, MessageCircle, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  lang: 'om' | 'en';
  onNavigate: (tab: 'shop' | 'about' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#143521] text-[#d6e3d9] border-t border-[#0b1f13] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                {BUSINESS_CONFIG.shopName}
              </span>
              <span className="text-xs font-semibold text-[#f0d494] uppercase tracking-wider">
                Finfinnee
              </span>
            </div>
            <p className="text-xs text-[#a2b4a7] max-w-sm leading-relaxed">
              {lang === 'om'
                ? 'Daldala jimaa filatamaa Harargee dhiheessuu fi geejjiba amansiisaa Finfinnee keessatti kennuuf kan qophaa\'e.'
                : 'Specialty Hararghe khat delivery service across Addis Ababa, Ethiopia. Direct from Hararghe.'}
            </p>
            <div className="pt-2 text-xs text-[#f0d494]">
              <strong>{t.businessOwnerLabel}:</strong> {BUSINESS_CONFIG.ownerName}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              {lang === 'om' ? 'Kutaalee Website' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  {t.navAbout}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  {t.navContact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#f0d494] transition-colors flex items-center gap-1 text-[#d6e3d9]"
                >
                  <Shield className="w-3 h-3 text-[#f0d494]" />
                  <span>{t.navAdmin}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              {t.navContact}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b8c9bd]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f0d494] shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phone}`} className="hover:text-white font-mono-numbers">
                  {BUSINESS_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#89e09d] shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono-numbers"
                >
                  {BUSINESS_CONFIG.whatsappInternational}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f0d494] shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-white">
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f0d494] shrink-0" />
                <span>{BUSINESS_CONFIG.serviceAreaEn}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#87998c]">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.shopName} — {BUSINESS_CONFIG.ownerName}. All rights reserved.
          </p>
          <p className="text-[11px]">
            {t.businessMotto}
          </p>
        </div>
      </div>
    </footer>
  );
};
