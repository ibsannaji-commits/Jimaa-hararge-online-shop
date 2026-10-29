import { Product, ProductVariant, OrderInquiry, ChecklistItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CHECKLIST } from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const PRODUCTS_STORAGE_KEY = 'jimaa_hararge_products_v1';
const ORDERS_STORAGE_KEY = 'jimaa_hararge_orders_v1';
const CHECKLIST_STORAGE_KEY = 'jimaa_hararge_checklist_v1';

export async function fetchProducts(): Promise<Product[]> {
  // If Supabase credentials are wired, try fetching from Supabase first
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, name, description, origin, image_url, is_available,
          product_variants (
            id, product_id, unit, price, stock_quantity, min_order_quantity, is_available
          )
        `)
        .order('name');

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (e) {
      console.warn('Could not fetch from Supabase, falling back to local storage', e);
    }
  }

  // Local storage fallback
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export async function saveProductRecord(
  productData: {
    id?: string;
    code?: string;
    name: string;
    description: string | null;
    origin: string;
    image_url?: string;
    is_available: boolean;
  },
  variantsData: {
    unit: 'kg' | 'bundle';
    price: number | null;
    stock_quantity: number;
    is_available: boolean;
  }[]
): Promise<Product> {
  const currentProducts = await fetchProducts();
  const existingIndex = productData.id 
    ? currentProducts.findIndex(p => p.id === productData.id) 
    : -1;

  const productId = productData.id || `jh-${Date.now()}`;
  const code = productData.code || `JH-00${currentProducts.length + 1}`;

  const defaultImage = currentProducts[existingIndex]?.image_url || '/src/assets/images/khat_shafaa_madhichoo_1793212059850.jpg';

  const processedVariants: ProductVariant[] = variantsData.map(v => ({
    id: `var-${productId}-${v.unit}`,
    product_id: productId,
    unit: v.unit,
    price: v.price,
    stock_quantity: v.stock_quantity,
    min_order_quantity: 1,
    is_available: v.is_available
  }));

  const updatedProduct: Product = {
    id: productId,
    code,
    name: productData.name.trim(),
    description: productData.description?.trim() || null,
    origin: productData.origin || 'Harargee',
    image_url: productData.image_url || defaultImage,
    is_available: productData.is_available,
    product_variants: processedVariants
  };

  let updatedList: Product[];
  if (existingIndex >= 0) {
    updatedList = [...currentProducts];
    updatedList[existingIndex] = updatedProduct;
  } else {
    updatedList = [...currentProducts, updatedProduct];
  }

  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updatedList));

  // If Supabase is active, sync to Supabase
  if (isSupabaseConfigured) {
    try {
      await supabase.from('products').upsert({
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        origin: updatedProduct.origin,
        is_available: updatedProduct.is_available
      });
      for (const v of processedVariants) {
        await supabase.from('product_variants').upsert({
          product_id: updatedProduct.id,
          unit: v.unit,
          price: v.price,
          stock_quantity: v.stock_quantity,
          is_available: v.is_available
        }, { onConflict: 'product_id,unit' });
      }
    } catch (e) {
      console.error('Supabase sync error:', e);
    }
  }

  return updatedProduct;
}

export function resetProductsToInitial(): Product[] {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

// Order Inquiry management
export function getStoredInquiries(): OrderInquiry[] {
  const data = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveOrderInquiry(inquiry: Omit<OrderInquiry, 'id' | 'createdAt' | 'status'>): OrderInquiry {
  const list = getStoredInquiries();
  const newOrder: OrderInquiry = {
    ...inquiry,
    id: `ORD-${Date.now().toString().slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const updated = [newOrder, ...list];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderInquiry['status'], deliveryFee?: number): OrderInquiry[] {
  const list = getStoredInquiries();
  const updated = list.map(o => {
    if (o.id === orderId) {
      return {
        ...o,
        status,
        deliveryFee: deliveryFee !== undefined ? deliveryFee : o.deliveryFee
      };
    }
    return o;
  });
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

// Checklist management
export function getChecklistItems(): ChecklistItem[] {
  const data = localStorage.getItem(CHECKLIST_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(INITIAL_CHECKLIST));
    return INITIAL_CHECKLIST;
  }
  try {
    const parsed: ChecklistItem[] = JSON.parse(data);
    // Keep user's completed state while ensuring up-to-date descriptions
    const merged = INITIAL_CHECKLIST.map(initial => {
      const existing = parsed.find(p => p.id === initial.id);
      return existing ? { ...initial, completed: existing.completed } : initial;
    });
    return merged;
  } catch {
    return INITIAL_CHECKLIST;
  }
}

export function toggleChecklistItem(id: string): ChecklistItem[] {
  const list = getChecklistItems();
  const updated = list.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
  localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
