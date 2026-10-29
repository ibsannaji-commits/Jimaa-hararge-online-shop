/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, UnitType } from './types';
import { fetchProducts } from './services/productService';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderInquiryModal } from './components/OrderInquiryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'shop' | 'about' | 'contact' | 'admin'>('shop');
  const [lang, setLang] = useState<'om' | 'en'>('om');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Order modal state
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [selectedUnitForOrder, setSelectedUnitForOrder] = useState<UnitType>('kg');

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error('Failed to load products:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenOrderModal = (product?: Product, defaultUnit: UnitType = 'kg') => {
    if (product) {
      setSelectedProductForOrder(product);
      setSelectedUnitForOrder(defaultUnit);
    } else if (products.length > 0) {
      setSelectedProductForOrder(products[0]);
      setSelectedUnitForOrder('kg');
    }
    setOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-[#1a221b]">
      {/* Top 3-Zone Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'shop' && (
          <>
            <Hero
              lang={lang}
              onExplore={() => {
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onInquire={() => handleOpenOrderModal()}
            />
            <div id="catalog">
              {loading ? (
                <div className="py-24 text-center">
                  <div className="w-8 h-8 border-3 border-[#143521] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs text-[#637267]">
                    {lang === 'om' ? "Product fe'aa jira..." : 'Loading products...'}
                  </p>
                </div>
              ) : (
                <ShopPage
                  products={products}
                  lang={lang}
                  onSelectProductForOrder={(prod, unit) => handleOpenOrderModal(prod, unit)}
                />
              )}
            </div>
          </>
        )}

        {currentTab === 'about' && (
          <AboutPage
            lang={lang}
            onExploreProducts={() => setCurrentTab('shop')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage lang={lang} />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            products={products}
            onProductsUpdated={loadProducts}
            lang={lang}
          />
        )}
      </main>

      {/* Order / Inquiry Modal */}
      {orderModalOpen && selectedProductForOrder && (
        <OrderInquiryModal
          product={selectedProductForOrder}
          initialUnit={selectedUnitForOrder}
          lang={lang}
          onClose={() => setOrderModalOpen(false)}
          onOrderSaved={() => {
            // Can refresh orders if needed
          }}
        />
      )}

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
