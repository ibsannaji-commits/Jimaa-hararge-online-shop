import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { saveProductRecord } from '../services/productService';
import { translations } from '../utils/translations';
import { Check, AlertCircle, X, Sparkles } from 'lucide-react';

interface AdminProductFormProps {
  product?: Product;
  onSaved?: () => void;
  onCancel?: () => void;
  lang?: 'om' | 'en';
}

export function AdminProductForm({
  product,
  onSaved,
  onCancel,
  lang = 'om',
}: AdminProductFormProps) {
  const t = translations[lang];

  const existingKgVariant = product?.product_variants?.find(v => v.unit === 'kg');
  const existingBundleVariant = product?.product_variants?.find(v => v.unit === 'bundle');

  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [origin, setOrigin] = useState(product?.origin ?? 'Harargee');
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '');

  const [kgPrice, setKgPrice] = useState(
    existingKgVariant?.price !== null && existingKgVariant?.price !== undefined 
      ? String(existingKgVariant.price) 
      : ''
  );
  const [bundlePrice, setBundlePrice] = useState(
    existingBundleVariant?.price !== null && existingBundleVariant?.price !== undefined 
      ? String(existingBundleVariant.price) 
      : ''
  );

  const [kgStock, setKgStock] = useState(String(existingKgVariant?.stock_quantity ?? '0'));
  const [bundleStock, setBundleStock] = useState(String(existingBundleVariant?.stock_quantity ?? '0'));

  const [active, setActive] = useState(product?.is_available ?? true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);

    try {
      if (!name.trim()) {
        throw new Error(lang === 'om' ? 'Maqaa product guuti.' : 'Please enter product name.');
      }

      const numKgStock = Number(kgStock);
      const numBundleStock = Number(bundleStock);
      const parsedKgPrice = kgPrice.trim() !== '' ? Number(kgPrice) : null;
      const parsedBundlePrice = bundlePrice.trim() !== '' ? Number(bundlePrice) : null;

      if (Number.isNaN(numKgStock) || numKgStock < 0) {
        throw new Error(lang === 'om' ? 'Stock kiiloo sirreessi.' : 'Invalid kg stock quantity.');
      }
      if (Number.isNaN(numBundleStock) || numBundleStock < 0) {
        throw new Error(lang === 'om' ? 'Stock hidhata sirreessi.' : 'Invalid bundle stock quantity.');
      }
      if (parsedKgPrice !== null && (Number.isNaN(parsedKgPrice) || parsedKgPrice < 0)) {
        throw new Error(lang === 'om' ? 'Gatii kiiloo sirreessi.' : 'Invalid kg price.');
      }
      if (parsedBundlePrice !== null && (Number.isNaN(parsedBundlePrice) || parsedBundlePrice < 0)) {
        throw new Error(lang === 'om' ? 'Gatii hidhata sirreessi.' : 'Invalid bundle price.');
      }

      const variants = [
        {
          unit: 'kg' as const,
          price: parsedKgPrice,
          stock_quantity: numKgStock,
          is_available: active && parsedKgPrice !== null && parsedKgPrice >= 0 && numKgStock > 0,
        },
        {
          unit: 'bundle' as const,
          price: parsedBundlePrice,
          stock_quantity: numBundleStock,
          is_available: active && parsedBundlePrice !== null && parsedBundlePrice >= 0 && numBundleStock > 0,
        },
      ];

      await saveProductRecord(
        {
          id: product?.id,
          code: product?.code,
          name: name.trim(),
          description: description.trim() || null,
          origin: origin.trim() || 'Harargee',
          image_url: imageUrl.trim() || undefined,
          is_available: active,
        },
        variants
      );

      setMessage({
        type: 'success',
        text: lang === 'om' ? 'Product fi unit isaa galmaa’an.' : 'Product and variants saved successfully.',
      });

      if (onSaved) {
        setTimeout(() => {
          onSaved();
        }, 600);
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Dogoggorri uumame.',
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#ded7ca] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-[#eee8db] mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#143521] font-display">
            {product ? t.editProduct : t.addNewProduct}
          </h2>
          <p className="text-xs text-[#637267] mt-0.5">
            {lang === 'om' 
              ? 'Gosa jimaa, gatii kiiloo fi hidhata, fi stock galchi.' 
              : 'Configure khat variety, separate unit pricing (kg & bundle), and inventory.'}
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-[#738276] hover:text-[#143521] rounded-lg hover:bg-[#f4efe6]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2 mb-6 ${
            message.type === 'success'
              ? 'bg-[#ecf7ed] text-[#1e582e] border border-[#c4e4c8]'
              : 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Name & Origin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#143521] mb-1.5">
              {t.productName} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Shafaa Madhichoo"
              className="w-full px-3.5 py-2.5 text-sm bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#143521] mb-1.5">
              {t.originLabel}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Harargee"
              className="w-full px-3.5 py-2.5 text-sm bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#143521] mb-1.5">
            {t.descriptionLabel}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="Ibsa gosa jimaa..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143521]"
          />
        </div>

        {/* Unit 1: Kilogram (kg) Section */}
        <div className="p-4 bg-[#f8f6f1] rounded-xl border border-[#e5dfd2]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#143521] bg-white px-2.5 py-0.5 rounded border border-[#ded7ca]">
              Unit: Kilogram (kg)
            </span>
            <span className="text-xs text-[#6e7d72]">
              {lang === 'om' ? 'Gatii kiiloo qofaaf' : 'Unit rate strictly for 1 kg'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3b473e] mb-1">
                {t.kgPriceLabel}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={kgPrice}
                onChange={(e) => setKgPrice(e.target.value)}
                placeholder={t.pricePlaceholder}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6cec0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#143521] font-mono-numbers"
              />
              <p className="text-[11px] text-[#78887c] mt-1">
                {lang === 'om' ? 'Yoo duwwaa ta\'e "Gatii gaafadhu" jedhama' : 'Leave empty for "Ask Price"'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3b473e] mb-1">
                {t.kgStockLabel}
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={kgStock}
                onChange={(e) => setKgStock(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6cec0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#143521] font-mono-numbers"
              />
            </div>
          </div>
        </div>

        {/* Unit 2: Bundle (Hidhata) Section */}
        <div className="p-4 bg-[#f8f6f1] rounded-xl border border-[#e5dfd2]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#143521] bg-white px-2.5 py-0.5 rounded border border-[#ded7ca]">
              Unit: Hidhata (Bundle)
            </span>
            <span className="text-xs text-[#6e7d72]">
              {lang === 'om' ? 'Gatii hidhata qofaaf' : 'Unit rate strictly for 1 bundle'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3b473e] mb-1">
                {t.bundlePriceLabel}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bundlePrice}
                onChange={(e) => setBundlePrice(e.target.value)}
                placeholder={t.pricePlaceholder}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6cec0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#143521] font-mono-numbers"
              />
              <p className="text-[11px] text-[#78887c] mt-1">
                {lang === 'om' ? 'Yoo duwwaa ta\'e "Gatii gaafadhu" jedhama' : 'Leave empty for "Ask Price"'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3b473e] mb-1">
                {t.bundleStockLabel}
              </label>
              <input
                type="number"
                min="0"
                step="0.001"
                value={bundleStock}
                onChange={(e) => setBundleStock(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6cec0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#143521] font-mono-numbers"
              />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-semibold text-[#143521]">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 text-[#143521] rounded border-[#cfc5b5] focus:ring-[#143521]"
            />
            <span>{t.showOnWebsite}</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 pt-5 border-t border-[#eee8db] flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-xs font-semibold text-[#4e5c51] hover:text-[#143521] rounded-xl hover:bg-[#f4efe6] transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={busy}
          className="px-6 py-2.5 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] active:scale-[0.98] rounded-xl transition-all shadow-xs disabled:opacity-50"
        >
          {busy ? (lang === 'om' ? 'Galmeessaa jira...' : 'Saving...') : t.saveProductBtn}
        </button>
      </div>
    </form>
  );
}
