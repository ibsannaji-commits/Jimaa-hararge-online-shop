import React, { useState } from 'react';
import { Product, UnitType, OrderInquiry } from '../types';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG } from '../data/initialData';
import { saveOrderInquiry } from '../services/productService';
import { X, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface OrderInquiryModalProps {
  product: Product | null;
  initialUnit?: UnitType;
  lang: 'om' | 'en';
  onClose: () => void;
  onOrderSaved?: () => void;
}

export const OrderInquiryModal: React.FC<OrderInquiryModalProps> = ({
  product,
  initialUnit = 'kg',
  lang,
  onClose,
  onOrderSaved,
}) => {
  const t = translations[lang];

  const [unit, setUnit] = useState<UnitType>(initialUnit);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subcity, setSubcity] = useState(BUSINESS_CONFIG.subcities[0]);
  const [specificAddress, setSpecificAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!product) return null;

  const currentVariant = product.product_variants.find(v => v.unit === unit);
  const isPriced = currentVariant?.price !== null && currentVariant?.price !== undefined;
  const unitPrice = currentVariant?.price ?? 0;
  const totalEstimated = isPriced ? unitPrice * quantity : null;

  const buildWhatsAppMessage = () => {
    const unitName = unit === 'kg' ? (lang === 'om' ? 'Kiiloo' : 'kg') : (lang === 'om' ? 'Hidhata' : 'bundle');
    const priceLine = isPriced
      ? `Gatii: ${Number(unitPrice).toLocaleString('en-ET')} ETB/${unitName} (Walii gala tilmaama: ${Number(totalEstimated).toLocaleString('en-ET')} ETB)`
      : `Gatii: Hin murtoofne (Gatii gaafadhu)`;

    const text = lang === 'om'
      ? `Akkam Ibsa Naaji (Jimaa Hararge),\n\nAjaja / Gaaffii dhiyeessuu barbaada:\n• Gosa Jimaa: ${product.name} (${product.code})\n• Baay'ina: ${quantity} ${unitName}\n• ${priceLine}\n\nOdeeffannoo Maamilaa:\n• Maqaa: ${name || 'Hin ibsamne'}\n• Bilbila: ${phone || 'Hin ibsamne'}\n• Kutaa Magaalaa: ${subcity}\n• Teessoo: ${specificAddress || 'Finfinnee'}\n• Hubachiisa: ${notes || 'Hin jiru'}\n\nGatii geejjibaa fi yeroo dhiyaatu naaf mirkaneessaa.`
      : `Hello Ibsa Naaji (Jimaa Hararge),\n\nI would like to place an inquiry/order:\n• Variety: ${product.name} (${product.code})\n• Quantity: ${quantity} ${unitName}\n• ${priceLine}\n\nCustomer Details:\n• Name: ${name || 'Not provided'}\n• Phone: ${phone || 'Not provided'}\n• Sub-City: ${subcity}\n• Landmark: ${specificAddress || 'Addis Ababa'}\n• Notes: ${notes || 'None'}\n\nPlease confirm availability and delivery schedule.`;

    return encodeURIComponent(text);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(lang === 'om' ? 'Maaloo maqaa fi bilbila kee guuti.' : 'Please enter your name and phone number.');
      return;
    }
    setError('');

    // Save locally as pending inquiry as well for Admin visibility
    saveOrderInquiry({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      subcity,
      specificAddress: specificAddress.trim(),
      notes: notes.trim(),
      items: [
        {
          productId: product.id,
          productName: product.name,
          unit,
          quantity,
          price: isPriced ? unitPrice : null,
        },
      ],
      deliveryFee: null,
    });

    onOrderSaved?.();

    // Trigger WhatsApp
    const message = buildWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappWaMe}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleSaveToSystemOnly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError(lang === 'om' ? 'Maaloo maqaa fi bilbila kee guuti.' : 'Please enter your name and phone number.');
      return;
    }
    setError('');

    saveOrderInquiry({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      subcity,
      specificAddress: specificAddress.trim(),
      notes: notes.trim(),
      items: [
        {
          productId: product.id,
          productName: product.name,
          unit,
          quantity,
          price: isPriced ? unitPrice : null,
        },
      ],
      deliveryFee: null,
    });

    onOrderSaved?.();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#ded7ca] shadow-2xl p-6 sm:p-8 my-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#768579] hover:text-[#143521] rounded-xl hover:bg-[#f4f1ea] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-[#ecf7ed] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1e582e]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#143521] font-display mb-2">
              {lang === 'om' ? 'Ajajni Galmaa\'eera!' : 'Inquiry Submitted!'}
            </h3>
            <p className="text-sm text-[#5d6a60] mb-6 max-w-md mx-auto">
              {t.orderSentSuccess}
            </p>
            <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#ede7dc] text-xs text-[#526054] mb-6 text-left">
              <div className="font-semibold text-[#143521] mb-1">{product.name} ({quantity} {unit})</div>
              <div>Maqaa: {name} · Bilbila: {phone}</div>
              <div>Bakka: {subcity}, {specificAddress}</div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#143521] rounded-xl hover:bg-[#0c2416]"
            >
              {lang === 'om' ? 'Cufi' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-xs font-semibold text-[#c2953e] uppercase tracking-wider">
                {product.code} · {product.origin}
              </span>
              <h2 className="text-2xl font-bold text-[#143521] font-display mt-0.5">
                {product.name}
              </h2>
              <p className="text-xs text-[#637267] mt-1">
                {t.modalSubtitle}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] rounded-xl text-xs flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-4">
              {/* Unit selection & Quantity */}
              <div className="p-3.5 bg-[#f8f6f1] rounded-2xl border border-[#e5dfd2]">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#143521] mb-1">
                      {t.selectUnit}
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-[#d6cec0]">
                      <button
                        type="button"
                        onClick={() => setUnit('kg')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                          unit === 'kg'
                            ? 'bg-[#143521] text-white'
                            : 'text-[#637267] hover:text-[#143521]'
                        }`}
                      >
                        Kiiloo (kg)
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit('bundle')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                          unit === 'bundle'
                            ? 'bg-[#143521] text-white'
                            : 'text-[#637267] hover:text-[#143521]'
                        }`}
                      >
                        Hidhata
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#143521] mb-1">
                      {t.quantity}
                    </label>
                    <div className="flex items-center bg-white rounded-xl border border-[#d6cec0] px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center font-bold text-[#143521] hover:bg-[#f4f1ea] rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full text-center text-sm font-bold font-mono-numbers text-[#143521] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center font-bold text-[#143521] hover:bg-[#f4f1ea] rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#ebe4d7]">
                  <span className="text-[#6e7d72]">
                    {lang === 'om' ? 'Gatii tilmaamaa:' : 'Estimated Price:'}
                  </span>
                  {isPriced ? (
                    <div className="text-right">
                      <span className="text-base font-bold text-[#143521] font-mono-numbers">
                        {Number(totalEstimated).toLocaleString('en-ET')} ETB
                      </span>
                      <span className="text-[10px] text-[#637267] block">
                        ({Number(unitPrice).toLocaleString('en-ET')} ETB/{unit})
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-[#b45309] bg-[#fef3c7] px-2 py-0.5 rounded">
                      {t.priceNotSet} (Admin irraa gaafadhu)
                    </span>
                  )}
                </div>
              </div>

              {/* Customer Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#143521] mb-1">
                    {t.customerName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gemechu / Helen"
                    className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#143521] mb-1">
                    {t.customerPhone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09... ykn +2519..."
                    className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
                  />
                </div>
              </div>

              {/* Delivery Sub-city & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#143521] mb-1">
                    {t.deliverySubcity}
                  </label>
                  <select
                    value={subcity}
                    onChange={(e) => setSubcity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
                  >
                    {BUSINESS_CONFIG.subcities.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#143521] mb-1">
                    {t.specificAddress}
                  </label>
                  <input
                    type="text"
                    value={specificAddress}
                    onChange={(e) => setSpecificAddress(e.target.value)}
                    placeholder={t.specificAddressPlaceholder}
                    className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#143521] mb-1">
                  {t.notes}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-3 py-2 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#ede7dc] flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="flex-1 py-3 px-4 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] active:scale-[0.98] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#89e09d]" />
                  <span>{t.btnSendWhatsApp}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveToSystemOnly}
                  className="py-3 px-4 text-xs font-semibold text-[#143521] bg-[#f4efe5] hover:bg-[#eae3d5] active:scale-[0.98] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#5e6d62]" />
                  <span>{t.btnSaveSystem}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
