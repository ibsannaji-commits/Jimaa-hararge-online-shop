import React, { useState } from 'react';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { Phone, Mail, MessageCircle, MapPin, Copy, Check, ExternalLink, Send } from 'lucide-react';

interface ContactPageProps {
  lang: 'om' | 'en';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = translations[lang];

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleQuickContactWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMessage.trim()) return;

    const message = lang === 'om'
      ? `Akkam Ibsa Naaji (Jimaa Hararge).\n\nMaqaa: ${formName || 'Maamila'}\nBilbila: ${formPhone || 'Hin ibsamne'}\n\nErgaa:\n${formMessage}`
      : `Hello Ibsa Naaji (Jimaa Hararge).\n\nName: ${formName || 'Customer'}\nPhone: ${formPhone || 'Not specified'}\n\nMessage:\n${formMessage}`;

    const url = `https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c2953e] uppercase tracking-wider mb-2">
          <span>{BUSINESS_CONFIG.shopName}</span>
          <span aria-hidden="true">·</span>
          <span>{BUSINESS_CONFIG.serviceAreaEn}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#143521] font-display mb-3">
          {t.contactTitle}
        </h1>
        <p className="text-sm sm:text-base text-[#59665c]">
          {t.contactSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Owner card */}
          <div className="p-5 bg-white rounded-2xl border border-[#ded7ca] shadow-xs">
            <span className="text-xs font-semibold text-[#6e7d72] uppercase tracking-wider block mb-1">
              {t.businessOwnerLabel}
            </span>
            <div className="text-xl font-bold text-[#143521] font-display">
              {BUSINESS_CONFIG.ownerName}
            </div>
            <p className="text-xs text-[#526054] mt-1">
              {lang === 'om' ? 'Abbaa daldalaa Jimaa Hararge & Qindeessaa geejjibaa' : 'Founder & Delivery Coordinator, Addis Ababa'}
            </p>
          </div>

          {/* Phone card */}
          <div className="p-5 bg-white rounded-2xl border border-[#ded7ca] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ecf7ed] text-[#1e582e] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-[#728276] block">
                  {t.phoneLabel}
                </span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="text-base font-bold text-[#143521] font-mono-numbers hover:underline"
                >
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(BUSINESS_CONFIG.phone, 'phone')}
                className="px-3 py-1.5 text-xs font-semibold text-[#143521] bg-[#f4f1ea] hover:bg-[#eae4d7] rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copiedKey === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1e582e]" />
                    <span>{t.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyText}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Business card */}
          <div className="p-5 bg-white rounded-2xl border border-[#ded7ca] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-[#728276] block">
                  {t.whatsAppLabel}
                </span>
                <span className="text-base font-bold text-[#143521] font-mono-numbers block">
                  {BUSINESS_CONFIG.phone}
                </span>
                <span className="text-[11px] text-[#6e7d72] font-mono-numbers">
                  {BUSINESS_CONFIG.whatsappInternational}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(BUSINESS_CONFIG.phone, 'whatsapp')}
                className="px-3 py-1.5 text-xs font-semibold text-[#143521] bg-[#f4f1ea] hover:bg-[#eae4d7] rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copiedKey === 'whatsapp' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#1e582e]" />
                    <span>{t.copiedText}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyText}</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.openWhatsApp}</span>
              </a>
            </div>
          </div>

          {/* Email card */}
          <div className="p-5 bg-white rounded-2xl border border-[#ded7ca] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#fdf2e9] text-[#b06000] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="truncate max-w-[200px] sm:max-w-xs">
                <span className="text-xs font-medium text-[#728276] block">
                  {t.emailLabel}
                </span>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-sm font-bold text-[#143521] hover:underline truncate block"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(BUSINESS_CONFIG.email, 'email')}
              className="px-3 py-1.5 text-xs font-semibold text-[#143521] bg-[#f4f1ea] hover:bg-[#eae4d7] rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copiedKey === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1e582e]" />
                  <span>{t.copiedText}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.copyText}</span>
                </>
              )}
            </button>
          </div>

          {/* Location card */}
          <div className="p-5 bg-[#f6f3ec] rounded-2xl border border-[#ded7ca] flex items-center gap-3.5 text-xs text-[#526054]">
            <MapPin className="w-5 h-5 text-[#c2953e] shrink-0" />
            <div>
              <span className="font-bold text-[#143521] block">
                {t.serviceLocationLabel}: {BUSINESS_CONFIG.serviceAreaOm}
              </span>
              <span>
                {lang === 'om' ? 'Kutaalee magaalaa Finfinnee hunda keessatti geejjibni ni qindeeffama.' : 'Direct dispatch across all sub-cities in Addis Ababa, Ethiopia.'}
              </span>
            </div>
          </div>

        </div>

        {/* Direct WhatsApp Message Box */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#ded7ca] p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#143521] font-display mb-1">
            {lang === 'om' ? 'Kallattiin Ergaa Ergi' : 'Direct Quick Message'}
          </h2>
          <p className="text-xs text-[#627165] mb-6">
            {lang === 'om' 
              ? 'Ergaa kee asitti barreessi; battalumatti WhatsApp Ibsa Naaji irratti siif bana.'
              : 'Type your message below; it will instantly open in WhatsApp with Ibsa Naaji.'}
          </p>

          {sentSuccess && (
            <div className="p-3 bg-[#ecf7ed] text-[#1e582e] border border-[#c4e4c8] rounded-xl text-xs flex items-center gap-2 mb-4">
              <Check className="w-4 h-4 shrink-0" />
              <span>{lang === 'om' ? 'WhatsApp irratti ergameera!' : 'Opened in WhatsApp successfully!'}</span>
            </div>
          )}

          <form onSubmit={handleQuickContactWhatsApp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#143521] mb-1">
                {t.customerName}
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Maqaa kee..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#143521] mb-1">
                {t.customerPhone}
              </label>
              <input
                type="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                placeholder="09... ykn +251..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#143521] mb-1">
                {lang === 'om' ? 'Ergaa ykn Gaaffii Kee *' : 'Your Message / Inquiry *'}
              </label>
              <textarea
                required
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder={lang === 'om' ? 'Gosa jimaa barbaaddu, baay\'ina, fi bakka geejjibaa asitti barreessi...' : 'Describe the khat variety, quantity, and your location in Addis Ababa...'}
                className="w-full px-3.5 py-2.5 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] active:scale-[0.98] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#89e09d]" />
              <span>{t.btnSendWhatsApp}</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
