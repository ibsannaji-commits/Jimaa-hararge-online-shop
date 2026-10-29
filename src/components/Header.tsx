import React from 'react';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { MessageCircle, Globe, Shield } from 'lucide-react';

interface HeaderProps {
  currentTab: 'shop' | 'about' | 'contact' | 'admin';
  setCurrentTab: (tab: 'shop' | 'about' | 'contact' | 'admin') => void;
  lang: 'om' | 'en';
  setLang: (lang: 'om' | 'en') => void;
  onOpenOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenOrderModal,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e8e2d5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand title, one line wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentTab('shop')}
              className="text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#143521] rounded"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#143521] font-display whitespace-nowrap">
                  {BUSINESS_CONFIG.shopName}
                </span>
                <span className="hidden sm:inline-block text-xs font-medium text-[#c2953e] uppercase tracking-wider">
                  Hararghe
                </span>
              </div>
              <p className="text-[11px] text-[#637267] hidden md:block whitespace-nowrap">
                {lang === 'om' ? BUSINESS_CONFIG.taglineOm : BUSINESS_CONFIG.taglineEn}
              </p>
            </button>
          </div>

          {/* Zone 2: 4-5 nav links, single-line text with subtle hover effect */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#465348]">
            <button
              onClick={() => setCurrentTab('shop')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'shop'
                  ? 'text-[#143521] font-semibold border-b-2 border-[#143521]'
                  : 'hover:text-[#143521]'
              }`}
            >
              {t.navProducts}
            </button>
            <button
              onClick={() => setCurrentTab('about')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'about'
                  ? 'text-[#143521] font-semibold border-b-2 border-[#143521]'
                  : 'hover:text-[#143521]'
              }`}
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => setCurrentTab('contact')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'contact'
                  ? 'text-[#143521] font-semibold border-b-2 border-[#143521]'
                  : 'hover:text-[#143521]'
              }`}
            >
              {t.navContact}
            </button>
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors py-1 ${
                currentTab === 'admin'
                  ? 'text-[#143521] font-semibold border-b-2 border-[#143521]'
                  : 'hover:text-[#143521]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#c2953e]" />
              <span>{t.navAdmin}</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language switch */}
            <div className="flex items-center bg-[#f1ede4] p-1 rounded-lg border border-[#e5dfd1]">
              <button
                onClick={() => setLang('om')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  lang === 'om'
                    ? 'bg-white text-[#143521] shadow-xs'
                    : 'text-[#637267] hover:text-[#143521]'
                }`}
                title="Afaan Oromoo"
              >
                Oromoo
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-white text-[#143521] shadow-xs'
                    : 'text-[#637267] hover:text-[#143521]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={onOpenOrderModal}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#143521] hover:bg-[#0e2718] active:scale-[0.98] rounded-lg transition-all shadow-xs whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-[#89e09d]" />
              <span className="hidden sm:inline">{t.orderWhatsApp}</span>
              <span className="sm:hidden">{t.askOrder}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-[#eee8db] text-xs font-medium text-[#505d52]">
          <button
            onClick={() => setCurrentTab('shop')}
            className={`py-1 px-2 whitespace-nowrap ${currentTab === 'shop' ? 'text-[#143521] font-bold border-b border-[#143521]' : ''}`}
          >
            {t.navProducts}
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`py-1 px-2 whitespace-nowrap ${currentTab === 'about' ? 'text-[#143521] font-bold border-b border-[#143521]' : ''}`}
          >
            {t.navAbout}
          </button>
          <button
            onClick={() => setCurrentTab('contact')}
            className={`py-1 px-2 whitespace-nowrap ${currentTab === 'contact' ? 'text-[#143521] font-bold border-b border-[#143521]' : ''}`}
          >
            {t.navContact}
          </button>
          <button
            onClick={() => setCurrentTab('admin')}
            className={`py-1 px-2 flex items-center gap-1 whitespace-nowrap ${currentTab === 'admin' ? 'text-[#143521] font-bold border-b border-[#143521]' : ''}`}
          >
            <Shield className="w-3 h-3 text-[#c2953e]" />
            <span>{t.navAdmin}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
