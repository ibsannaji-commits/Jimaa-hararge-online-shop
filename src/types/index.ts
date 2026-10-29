export type UnitType = 'kg' | 'bundle';

export interface ProductVariant {
  id: string;
  product_id: string;
  unit: UnitType;
  price: number | null; // null means "Hin murtoofne" (Price not set)
  stock_quantity: number;
  min_order_quantity: number;
  is_available: boolean;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  origin: string;
  image_url: string;
  is_available: boolean;
  product_variants: ProductVariant[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  unit: UnitType;
  quantity: number;
  price: number | null;
}

export interface OrderInquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  subcity: string;
  specificAddress: string;
  notes: string;
  items: OrderItem[];
  deliveryFee: number | null;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  labelOm: string;
  labelEn: string;
  completed: boolean;
  descriptionOm: string;
  descriptionEn: string;
}
