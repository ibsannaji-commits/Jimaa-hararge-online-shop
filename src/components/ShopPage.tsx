import React, { useState } from 'react';
import { Product, ProductVariant, UnitType } from '../types';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { Search, MessageCircle, MapPin, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  lang: 'om' | 'en';
  onSelectProductForOrder: (product: Product, defaultUnit?: UnitType) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  lang,
  onSelectProductForOrder,
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'priced' | 'unpriced'>('all');
  const [selectedUnits, setSelectedUnits] = useState<Record<string, UnitType>>({});

  const getSelectedUnit = (productId: string): UnitType => {
    return selectedUnits[productId] || 'kg';
  };

  const handleUnitToggle = (productId: string, unit: UnitType) => {
    setSelectedUnits(prev => ({ ...prev, [productId]: unit }));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    // Search query
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Priced vs unpriced
    const hasPricedVariant = product.product_variants.some(
      v => v.price !== null && v.price !== undefined && v.price >= 0
    );

    if (filterType === 'priced') return hasPricedVariant;
    if (filterType === 'unpriced') return !hasPricedVariant;
    return true;
  });

  const sendDirectWhatsAppInquiry = (product: Product, unit: UnitType) => {
    const variant = product.product_variants.find(v => v.unit === unit);
    const unitLabel = unit === 'kg' ? (lang === 'om' ? 'Kiiloo (1 kg)' : '1 kg') : (lang === 'om' ? 'Hidhata (1 bundle)' : '1 bundle');
    const priceText = variant?.price 
      ? `${Number(variant.price).toLocaleString('en-ET')} ETB` 
      : (lang === 'om' ? 'Gatii gaafadhu' : 'Price upon request');

    const messageText = lang === 'om'
      ? `Akkam Ibsa Naaji, Jimaa Hararge.\n\nAni gosa jimaa '${product.name}' (${product.code}) unit '${unitLabel}' gatii fi baay'ina Finfinneetti jiru gaafachuu barbaada.\nGatii amma jiru naaf ibsaa.`
      : `Hello Ibsa Naaji (Jimaa Hararge),\n\nI would like to inquire about '${product.name}' (${product.code}) for unit '${unitLabel}'.\nPlease provide today's current price and delivery arrangement in Addis Ababa.`;

    const encoded = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#256338] uppercase tracking-wider mb-2">
          <span>Hararghe Khat Collection</span>
          <span aria-hidden="true">·</span>
          <span>Finfinnee</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#143521] font-display mb-3 text-balance">
          {t.catalogTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#5c685f] leading-relaxed">
          {t.catalogSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-[#f4f1ea] p-3 rounded-2xl border border-[#e5ded0]">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a998e]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#d6cec0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143521] placeholder:text-[#99a69d]"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#d6cec0] shrink-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-[#143521] text-white shadow-xs'
                : 'text-[#637267] hover:text-[#143521]'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilterType('priced')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'priced'
                ? 'bg-[#143521] text-white shadow-xs'
                : 'text-[#637267] hover:text-[#143521]'
            }`}
          >
            {t.filterPriced}
          </button>
          <button
            onClick={() => setFilterType('unpriced')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filterType === 'unpriced'
                ? 'bg-[#143521] text-white shadow-xs'
                : 'text-[#637267] hover:text-[#143521]'
            }`}
          >
            {t.filterNeedsPrice}
          </button>
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#ded7ca] p-8">
          <p className="text-sm font-medium text-[#6e7d72]">
            {lang === 'om' ? 'Gosi jimaa barbaaddan hin argamne.' : 'No khat varieties matched your search.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setFilterType('all'); }}
            className="mt-3 text-xs font-semibold text-[#143521] underline hover:no-underline"
          >
            {lang === 'om' ? 'Filtara deebisi' : 'Clear filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const currentUnit = getSelectedUnit(product.id);
            const activeVariant = product.product_variants.find(v => v.unit === currentUnit);
            const isPriced = activeVariant?.price !== null && activeVariant?.price !== undefined;
            const inStock = (activeVariant?.stock_quantity ?? 0) > 0;

            const kgVariant = product.product_variants.find(v => v.unit === 'kg');
            const bundleVariant = product.product_variants.find(v => v.unit === 'bundle');

            return (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-[#ded7ca] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
              >
                {/* Product Image Slot with Fallback */}
                <div className="relative aspect-[4/3] w-full bg-[#f1ede4] overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Resilient Fallback Container
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Fallback pattern in background */}
                  <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#ebe6da] to-[#dfd7c5] text-[#718074]">
                    <span className="font-display font-bold text-lg text-[#143521]">{product.name}</span>
                    <span className="text-xs">{product.origin}</span>
                  </div>

                  {/* Top clean metadata */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono-numbers text-[11px]">
                      {product.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#143521] font-medium text-[11px]">
                      {product.origin}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#143521] font-display mb-1.5 group-hover:text-[#256338] transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#5e6b61] leading-relaxed line-clamp-2 mb-4">
                      {product.description || (lang === 'om' ? 'Gosa jimaa filatamaa Harargee.' : 'Premium Hararghe khat variety.')}
                    </p>

                    {/* Unit Switcher Tabs: kg vs hidhata */}
                    <div className="mb-4">
                      <div className="text-[11px] font-semibold text-[#808f83] uppercase tracking-wider mb-1.5">
                        {t.selectUnit}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#f4f1ea] rounded-xl border border-[#e5dfd2]">
                        <button
                          type="button"
                          onClick={() => handleUnitToggle(product.id, 'kg')}
                          className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                            currentUnit === 'kg'
                              ? 'bg-white text-[#143521] shadow-xs'
                              : 'text-[#6e7d72] hover:text-[#143521]'
                          }`}
                        >
                          <span>{t.unitKg}</span>
                          {kgVariant?.price && (
                            <span className="text-[10px] text-[#256338] font-mono-numbers">
                              •
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleUnitToggle(product.id, 'bundle')}
                          className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                            currentUnit === 'bundle'
                              ? 'bg-white text-[#143521] shadow-xs'
                              : 'text-[#6e7d72] hover:text-[#143521]'
                          }`}
                        >
                          <span>{t.unitBundle}</span>
                          {bundleVariant?.price && (
                            <span className="text-[10px] text-[#256338] font-mono-numbers">
                              •
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Price and Stock Status Block */}
                    <div className="p-3 bg-[#faf9f6] rounded-xl border border-[#eee8db] mb-5">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <span className="text-xs text-[#6e7d72]">
                          {currentUnit === 'kg' ? (lang === 'om' ? 'Gatii 1 kg:' : 'Price per 1 kg:') : (lang === 'om' ? 'Gatii 1 hidhata:' : 'Price per 1 bundle:')}
                        </span>

                        {isPriced ? (
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-bold text-[#143521] font-mono-numbers">
                              {Number(activeVariant?.price).toLocaleString('en-ET')}
                            </span>
                            <span className="text-xs font-semibold text-[#256338] ml-1">ETB</span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded-md">
                            {t.priceNotSet}
                          </span>
                        )}
                      </div>

                      {/* Stock availability line */}
                      <div className="flex items-center justify-between text-[11px] text-[#637267] pt-1.5 border-t border-[#f0eae0]">
                        <span>
                          Stock: <strong className="font-mono-numbers text-[#143521]">{activeVariant?.stock_quantity ?? 0} {currentUnit}</strong>
                        </span>
                        <span className={`font-medium ${inStock ? 'text-[#166534]' : 'text-[#854d0e]'}`}>
                          {inStock ? (lang === 'om' ? 'Gurgurtaaf qophii' : 'In Stock') : (lang === 'om' ? 'Admin irraa mirkaneessi' : 'Check with Admin')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Primary Button: Open in-app Order Modal */}
                    <button
                      type="button"
                      onClick={() => onSelectProductForOrder(product, currentUnit)}
                      className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] active:scale-[0.98] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>{t.askOrder}</span>
                    </button>

                    {/* Secondary Button: 1-click WhatsApp Inquire */}
                    <button
                      type="button"
                      onClick={() => sendDirectWhatsAppInquiry(product, currentUnit)}
                      className="w-full py-2 px-3 text-xs font-semibold text-[#1e582e] hover:bg-[#eaf4eb] border border-[#c4e4c8] active:scale-[0.98] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.askPriceWhatsApp}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Delivery Guarantee Notice */}
      <div className="mt-12 p-4 bg-[#f8f6f1] rounded-2xl border border-[#ded7ca] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526054]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#c2953e] shrink-0" />
          <span>{t.deliveryNotice}</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-[#143521]">
          <span>{BUSINESS_CONFIG.ownerName}</span>
          <span>·</span>
          <span>{BUSINESS_CONFIG.phone}</span>
        </div>
      </div>
    </section>
  );
};
