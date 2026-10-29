import React, { useState, useEffect } from 'react';
import { Product, ProductVariant, OrderInquiry, ChecklistItem, UnitType } from '../types';
import { translations } from '../utils/translations';
import { BUSINESS_CONFIG, SUPABASE_SQL_SCRIPT } from '../data/initialData';
import {
  saveProductRecord,
  resetProductsToInitial,
  getStoredInquiries,
  updateOrderStatus,
  getChecklistItems,
  toggleChecklistItem
} from '../services/productService';
import { AdminProductForm } from './AdminProductForm';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  Shield,
  Plus,
  Edit2,
  CheckCircle2,
  Clock,
  RotateCcw,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Package,
  Layers,
  Database,
  Lock,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onProductsUpdated: () => void;
  lang: 'om' | 'en';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onProductsUpdated,
  lang,
}) => {
  const t = translations[lang];

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('jimaa_hararge_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'checklist' | 'sql'>('products');

  // Product form modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Inquiries & Checklist state
  const [inquiries, setInquiries] = useState<OrderInquiry[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setInquiries(getStoredInquiries());
      setChecklist(getChecklistItems());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 2026 or 1234
    if (pinInput === '2026' || pinInput === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('jimaa_hararge_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError(lang === 'om' ? 'PIN dogoggoraa dha (2026 fayyadami)' : 'Invalid PIN (Use 2026 or 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jimaa_hararge_admin_auth');
  };

  const handleResetCatalog = () => {
    if (window.confirm(lang === 'om' ? 'Gosa jimaa hunda gara qophii jalqabaatti deebisuu barbaadduu?' : 'Reset all product records to default catalog?')) {
      resetProductsToInitial();
      onProductsUpdated();
    }
  };

  const handleToggleChecklist = (id: string) => {
    const updated = toggleChecklistItem(id);
    setChecklist(updated);
  };

  const completedChecklistCount = checklist.filter(c => c.completed).length;

  const handleUpdateOrderStatus = (orderId: string, status: OrderInquiry['status'], deliveryFee?: number) => {
    const updated = updateOrderStatus(orderId, status, deliveryFee);
    setInquiries(updated);
  };

  const sendWhatsAppOrderConfirmation = (order: OrderInquiry) => {
    const itemSummaries = order.items.map(i => `${i.productName} (${i.quantity} ${i.unit})`).join(', ');
    const feeLine = order.deliveryFee 
      ? `Kaffaltiin geejjibaa: ${Number(order.deliveryFee).toLocaleString('en-ET')} ETB` 
      : 'Kaffaltiin geejjibaa: Qophaa\'aa jira';

    const msg = lang === 'om'
      ? `Akkam ${order.customerName},\nNuyi Jimaa Hararge (${BUSINESS_CONFIG.phone}) irraayyi.\n\nAjajni kee (${order.id}) mirkanaa'eera!\n• Oomisha: ${itemSummaries}\n• Bakka: ${order.subcity}, ${order.specificAddress}\n• ${feeLine}\n\nYeroo dhiyootti siif geessina. Galatoomi!`
      : `Hello ${order.customerName},\nThis is Jimaa Hararge (${BUSINESS_CONFIG.phone}).\n\nYour order inquiry (${order.id}) is confirmed!\n• Items: ${itemSummaries}\n• Location: ${order.subcity}, ${order.specificAddress}\n• ${feeLine}\n\nOur delivery team is on the way. Thank you!`;

    const phoneClean = order.customerPhone.replace(/[^0-9]/g, '');
    const fullPhone = phoneClean.startsWith('0') ? `251${phoneClean.slice(1)}` : phoneClean;
    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // If not logged in, show PIN Gate
  if (!isAuthenticated) {
    return (
      <div className="py-16 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl border border-[#ded7ca] p-8 shadow-sm text-center">
          <div className="w-12 h-12 bg-[#ecf7ed] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#1e582e]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#143521] font-display mb-1">
            {t.adminTitle}
          </h2>
          <p className="text-xs text-[#6e7d72] mb-6">
            {lang === 'om' 
              ? 'Seensa Ibsa Naaji — Gatii jimaa, stock fi ajajoota to’achuuf.' 
              : 'Owner Portal for Ibsa Naaji — Manage khat prices, stock and inquiries.'}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder={t.adminPinPrompt}
                autoFocus
                className="w-full text-center tracking-widest text-lg font-bold py-3 bg-[#faf9f6] border border-[#d6cec0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143521]"
              />
              <p className="text-[11px] text-[#89978d] mt-2">
                {t.adminPinHelp}
              </p>
            </div>

            {pinError && (
              <p className="text-xs text-red-600 font-medium">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] rounded-xl shadow-xs transition-all"
            >
              {t.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5dfd2] mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#c2953e] uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Control Room</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#6e7d72]">{BUSINESS_CONFIG.ownerName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143521] font-display">
            {t.adminTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#8b3b3b] hover:bg-[#fae8e8] rounded-xl transition-colors border border-[#f0c4c4]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.logoutBtn}</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f4f1ea] rounded-2xl border border-[#ded7ca] mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'products'
              ? 'bg-white text-[#143521] shadow-xs'
              : 'text-[#6e7d72] hover:text-[#143521]'
          }`}
        >
          <Package className="w-4 h-4 text-[#256338]" />
          <span>{t.tabProducts} ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'orders'
              ? 'bg-white text-[#143521] shadow-xs'
              : 'text-[#6e7d72] hover:text-[#143521]'
          }`}
        >
          <Clock className="w-4 h-4 text-[#c2953e]" />
          <span>{t.tabOrders} ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'checklist'
              ? 'bg-white text-[#143521] shadow-xs'
              : 'text-[#6e7d72] hover:text-[#143521]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-[#166534]" />
          <span>{t.tabChecklist} ({completedChecklistCount}/8)</span>
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'sql'
              ? 'bg-white text-[#143521] shadow-xs'
              : 'text-[#6e7d72] hover:text-[#143521]'
          }`}
        >
          <Database className="w-4 h-4 text-[#4f6b5b]" />
          <span>{t.tabSupabase}</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS & PRICING */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#143521] font-display">
                Gosa Jimaa 6 fi Variant (kg & hidhata)
              </h2>
              <p className="text-xs text-[#6e7d72]">
                {lang === 'om' 
                  ? 'Gatiin kg fi hidhata adda bahee qindeeffama. Yoo gatiin hin galmoofne maamilaaf "Gatii gaafadhu" ta\'a.'
                  : 'Manage separate prices and stocks for kg and bundle units.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCatalog}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#5c685f] hover:text-[#143521] bg-white border border-[#d6cec0] rounded-xl hover:bg-[#fcfbf9] transition-colors"
                title="Reset to default seed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetDefaults}</span>
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNew(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] rounded-xl shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addNewProduct}</span>
              </button>
            </div>
          </div>

          {/* Form Modal when editing or adding */}
          {(isAddingNew || editingProduct) && (
            <div className="mb-8">
              <AdminProductForm
                product={editingProduct || undefined}
                onSaved={() => {
                  setIsAddingNew(false);
                  setEditingProduct(null);
                  onProductsUpdated();
                }}
                onCancel={() => {
                  setIsAddingNew(false);
                  setEditingProduct(null);
                }}
                lang={lang}
              />
            </div>
          )}

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-[#ded7ca] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f6f1] text-[#3f4d42] border-b border-[#eee8db] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Origin</th>
                    <th className="py-3 px-4">Gatii Kiiloo (kg)</th>
                    <th className="py-3 px-4">Stock (kg)</th>
                    <th className="py-3 px-4">Gatii Hidhata</th>
                    <th className="py-3 px-4">Stock (Hidhata)</th>
                    <th className="py-3 px-4">Mul'isi</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee8db]">
                  {products.map((p) => {
                    const kgVar = p.product_variants.find(v => v.unit === 'kg');
                    const bundleVar = p.product_variants.find(v => v.unit === 'bundle');

                    return (
                      <tr key={p.id} className="hover:bg-[#fcfbf9] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image_url}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-[#f1ede4] shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-bold text-[#143521] text-sm font-display">
                                {p.name}
                              </div>
                              <span className="font-mono-numbers text-[11px] text-[#78887c]">
                                {p.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-[#5e6b61]">
                          {p.origin}
                        </td>

                        {/* Kg Price */}
                        <td className="py-3.5 px-4">
                          {kgVar?.price !== null && kgVar?.price !== undefined ? (
                            <span className="font-bold font-mono-numbers text-[#143521]">
                              {Number(kgVar.price).toLocaleString('en-ET')} ETB
                            </span>
                          ) : (
                            <span className="text-[#b45309] font-medium bg-[#fef3c7] px-2 py-0.5 rounded">
                              Hin murtoofne
                            </span>
                          )}
                        </td>

                        {/* Kg Stock */}
                        <td className="py-3.5 px-4 font-mono-numbers text-[#48554b]">
                          {kgVar?.stock_quantity ?? 0} kg
                        </td>

                        {/* Bundle Price */}
                        <td className="py-3.5 px-4">
                          {bundleVar?.price !== null && bundleVar?.price !== undefined ? (
                            <span className="font-bold font-mono-numbers text-[#143521]">
                              {Number(bundleVar.price).toLocaleString('en-ET')} ETB
                            </span>
                          ) : (
                            <span className="text-[#b45309] font-medium bg-[#fef3c7] px-2 py-0.5 rounded">
                              Hin murtoofne
                            </span>
                          )}
                        </td>

                        {/* Bundle Stock */}
                        <td className="py-3.5 px-4 font-mono-numbers text-[#48554b]">
                          {bundleVar?.stock_quantity ?? 0} hidhata
                        </td>

                        {/* Availability */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                              p.is_available
                                ? 'bg-[#ecf7ed] text-[#1e582e]'
                                : 'bg-[#f4f1ea] text-[#718074]'
                            }`}
                          >
                            {p.is_available ? 'Active' : 'Hidden'}
                          </span>
                        </td>

                        {/* Edit Button */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingNew(false);
                              setEditingProduct(p);
                            }}
                            className="p-1.5 text-[#143521] hover:bg-[#f4efe5] rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS & INQUIRIES */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#143521] font-display">
              {t.tabOrders}
            </h2>
            <p className="text-xs text-[#6e7d72]">
              {lang === 'om'
                ? 'Ajajoota maamiltoonni website irratti galmeessan asitti ilaali, kaffaltii geejjibaa Finfinnee mirkaneessi, fi WhatsApp irratti deebisi.'
                : 'Review customer inquiries, set agreed Addis Ababa delivery fee, and send confirmation via WhatsApp.'}
            </p>
          </div>

          {inquiries.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#ded7ca]">
              <p className="text-sm text-[#728276]">
                {lang === 'om' ? 'Ajajni ammatti hin jiru.' : 'No customer inquiries yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((order) => (
                <div
                  key={order.id}
                  className="p-5 bg-white rounded-2xl border border-[#ded7ca] shadow-xs flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono-numbers font-bold text-sm text-[#143521]">
                        {order.id}
                      </span>
                      <span className="text-xs text-[#718074]">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded capitalize ${
                          order.status === 'confirmed'
                            ? 'bg-[#ecf7ed] text-[#1e582e]'
                            : order.status === 'delivered'
                            ? 'bg-[#e0f2fe] text-[#0369a1]'
                            : order.status === 'cancelled'
                            ? 'bg-[#fee2e2] text-[#991b1b]'
                            : 'bg-[#fef3c7] text-[#92400e]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="text-xs">
                      <strong>Maqaa:</strong> {order.customerName} · <strong>Bilbila:</strong> {order.customerPhone}
                    </div>

                    <div className="text-xs text-[#526054]">
                      <strong>Bakka Delivery:</strong> {order.subcity} ({order.specificAddress || 'Hoteela / Mallattoo hin ibsamne'})
                    </div>

                    <div className="p-3 bg-[#faf9f6] rounded-xl border border-[#eee8db] text-xs">
                      <span className="font-semibold text-[#143521] block mb-1">Items:</span>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between py-0.5">
                          <span>{it.productName} ({it.quantity} {it.unit})</span>
                          <span className="font-mono-numbers">
                            {it.price ? `${Number(it.price * it.quantity).toLocaleString('en-ET')} ETB` : 'Gatii gaafadhu'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="text-xs italic text-[#637267]">
                        "{order.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions & Delivery Fee */}
                  <div className="flex flex-col justify-between sm:w-64 border-t sm:border-t-0 sm:border-l border-[#eee8db] pt-4 sm:pt-0 sm:pl-6 space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#143521] mb-1">
                        {t.deliveryFeeLabel}
                      </label>
                      <input
                        type="number"
                        placeholder="fkn: 200 ETB"
                        value={order.deliveryFee ?? ''}
                        onChange={(e) => {
                          const val = e.target.value !== '' ? Number(e.target.value) : undefined;
                          handleUpdateOrderStatus(order.id, order.status, val);
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-lg font-mono-numbers"
                      />
                    </div>

                    {/* Status Select */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#143521] mb-1">
                        Haala Ajajaa (Status)
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderInquiry['status'])}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#faf9f6] border border-[#d6cec0] rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* WhatsApp Reply Button */}
                    <button
                      type="button"
                      onClick={() => sendWhatsAppOrderConfirmation(order)}
                      className="w-full py-2 px-3 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#89e09d]" />
                      <span>WhatsApp Deebisi</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CHECKLIST (0/8) */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#143521] font-display">
                Checklist Qophii Jalqabaa ({completedChecklistCount}/8)
              </h2>
              <p className="text-xs text-[#6e7d72]">
                {lang === 'om'
                  ? 'Tartiiba 8 qophii online shop Jimaa Harargee Finfinneetti mirkaneessi.'
                  : '8-step pre-launch verification checklist for Jimaa Hararge in Addis Ababa.'}
              </p>
            </div>

            <div className="text-xs font-bold font-mono-numbers px-3 py-1.5 bg-[#ecf7ed] text-[#1e582e] rounded-xl border border-[#c4e4c8]">
              {Math.round((completedChecklistCount / 8) * 100)}% Qophii Dha
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklist.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleToggleChecklist(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.completed
                    ? 'bg-[#f7fbf8] border-[#c4e4c8] shadow-2xs'
                    : 'bg-white border-[#ded7ca] hover:bg-[#faf9f6]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    item.completed
                      ? 'bg-[#1e582e] text-white'
                      : 'border-2 border-[#cfc5b5] text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-bold text-[#143521]">
                      {idx + 1}. {lang === 'om' ? item.labelOm : item.labelEn}
                    </span>
                  </div>
                  <p className="text-xs text-[#637267] mt-1 leading-relaxed">
                    {lang === 'om' ? item.descriptionOm : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUPABASE SQL */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#143521] font-display">
                Supabase SQL Schema & Row Level Security (RLS)
              </h2>
              <p className="text-xs text-[#6e7d72]">
                {lang === 'om'
                  ? 'SQL kana Supabase → SQL Editor → New Query keessatti fayyadami.'
                  : 'Execute this SQL script directly in your Supabase SQL editor to deploy the schema and RLS policies.'}
              </p>
            </div>

            <button
              onClick={copySql}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#143521] hover:bg-[#0c2416] rounded-xl shadow-xs transition-all self-start sm:self-auto"
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4 text-[#89e09d]" />
                  <span>Waraabameera! (Copied)</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy SQL Script</span>
                </>
              )}
            </button>
          </div>

          <div className="relative bg-[#1e2320] text-[#e6f4ea] p-5 rounded-2xl overflow-x-auto text-xs font-mono-numbers leading-relaxed border border-[#303a33]">
            <pre className="font-mono">{SUPABASE_SQL_SCRIPT}</pre>
          </div>

          <div className="p-4 bg-[#f8f6f1] rounded-2xl border border-[#ded7ca] text-xs text-[#526054]">
            <strong>Hubachiisa:</strong> Database ammayyaa keessatti local storage guutummaatti qindaa’ee jira; Supabase environment variables (`VITE_SUPABASE_URL` fi `VITE_SUPABASE_ANON_KEY`) yeroo dabaltu battalumatti Supabase waliin walqabata.
          </div>
        </div>
      )}

    </div>
  );
};
