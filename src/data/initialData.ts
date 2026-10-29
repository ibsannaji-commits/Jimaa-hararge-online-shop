import { Product, ChecklistItem } from '../types';

export const BUSINESS_CONFIG = {
  shopName: 'Jimaa Hararge',
  taglineOm: 'Online Shop & Delivery — Finfinnee, Itoophiyaa',
  taglineEn: 'Online Shop & Delivery — Addis Ababa, Ethiopia',
  ownerName: 'Ibsa Naaji',
  phone: '0944615768',
  whatsappRaw: '0944615768',
  whatsappInternational: '+251944615768',
  whatsappWaMe: '251944615768',
  email: 'jimaahararge98@gmail.com',
  serviceAreaOm: 'Finfinnee (Addis Ababa), Itoophiyaa',
  serviceAreaEn: 'Addis Ababa, Ethiopia',
  subcities: [
    'Bole',
    'Yeka',
    'Kirkos',
    'Arada',
    'Lideta',
    'Nifas Silk-Lafto',
    'Gullele',
    'Kolfe Keranio',
    'Akaki Kality',
    'Lemi Kura',
    'CMC / Ayat',
    'Sarbet / Bisrate Gabriel',
    'Kazanchis / Bambis',
    'Piassa / 4 Kilo',
    'Gerji / Jackros',
    'Bole Medhanealem / Atlas'
  ]
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'jh-001',
    code: 'JH-001',
    name: 'Shafaa Madhichoo',
    description: 'Jimaa filatamaa kutaa Harargee dhiyaa Madhichoo irraa qophaa’u. Cabbii fi baala qal’aa lallaafaa qaba.',
    origin: 'Harargee (Madhichoo)',
    image_url: '/src/assets/images/khat_shafaa_madhichoo_1793212059850.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-001-kg',
        product_id: 'jh-001',
        unit: 'kg',
        price: null, // Hin murtoofne (Price not set initially)
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-001-bundle',
        product_id: 'jh-001',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  },
  {
    id: 'jh-002',
    code: 'JH-002',
    name: 'Shafaa Booke',
    description: 'Gosa jimaa Booke Harargee beekamaa, foolii fi mi’aa adda taateen kan beekamu. Qulqullina olaanaa qaba.',
    origin: 'Harargee (Booke)',
    image_url: '/src/assets/images/khat_shafaa_booke_1793212060988.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-002-kg',
        product_id: 'jh-002',
        unit: 'kg',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-002-bundle',
        product_id: 'jh-002',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  },
  {
    id: 'jh-003',
    code: 'JH-003',
    name: 'Tacoree',
    description: 'Jimaa magariisa badhaadhaa, qunxurroo lallaafaa fi yeroo dheeraaf qabbanaahuu danda’u. Maamiltoonni baay’ee jaallatu.',
    origin: 'Harargee',
    image_url: '/src/assets/images/khat_tacoree_1793212061095.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-003-kg',
        product_id: 'jh-003',
        unit: 'kg',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-003-bundle',
        product_id: 'jh-003',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  },
  {
    id: 'jh-004',
    code: 'JH-004',
    name: 'Galamsoo',
    description: 'Gosa jimaa Galamsoo Harargee dhihaa, lallaafina baalaa fi dhandhama addaatiin beekamaa kan ta’e.',
    origin: 'Harargee (Galamsoo)',
    image_url: '/src/assets/images/khat_galamsoo_1793212061178.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-004-kg',
        product_id: 'jh-004',
        unit: 'kg',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-004-bundle',
        product_id: 'jh-004',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  },
  {
    id: 'jh-005',
    code: 'JH-005',
    name: 'Liyyu',
    description: 'Jimaa filatamaa adda ta’e kan qulqullina guddaan qophaa’u. Baala qallaa fi dhandhama suuta deemu qaba.',
    origin: 'Harargee',
    image_url: '/src/assets/images/hero_hararghe_khat_1793212059551.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-005-kg',
        product_id: 'jh-005',
        unit: 'kg',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-005-bundle',
        product_id: 'jh-005',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  },
  {
    id: 'jh-006',
    code: 'JH-006',
    name: 'Maxxagasha',
    description: 'Gosa jimaa qunxurroo bareedaa fi jabaataa qabu. Yeroo dheeraaf qulqullina isaa eeggatee tura.',
    origin: 'Harargee',
    image_url: '/src/assets/images/khat_shafaa_madhichoo_1793212059850.jpg',
    is_available: true,
    product_variants: [
      {
        id: 'var-jh-006-kg',
        product_id: 'jh-006',
        unit: 'kg',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      },
      {
        id: 'var-jh-006-bundle',
        product_id: 'jh-006',
        unit: 'bundle',
        price: null,
        stock_quantity: 0,
        min_order_quantity: 1,
        is_available: false
      }
    ]
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    labelOm: 'Gosa jimaa 6 database keessatti galmeessuu',
    labelEn: 'Register 6 khat varieties in database',
    descriptionOm: 'Shafaa Madhichoo, Shafaa Booke, Tacoree, Galamsoo, Liyyu fi Maxxagasha galmaa’aniiru.',
    descriptionEn: 'Shafaa Madhichoo, Shafaa Booke, Tacoree, Galamsoo, Liyyu and Maxxagasha records are seeded.',
    completed: true
  },
  {
    id: 'chk-2',
    labelOm: 'Suuraa dhugaa gosa jimaa hundaaf olkaa\'uu',
    labelEn: 'Upload authentic photos for all varieties',
    descriptionOm: 'Suuraaleen qulqullina olaanaa qaban gosa jimaa hundaaf qophaa’aniiru.',
    descriptionEn: 'High-fidelity authentic product images are generated and attached.',
    completed: true
  },
  {
    id: 'chk-3',
    labelOm: 'Gatii kg fi hidhata Admin irraa qindeessuu',
    labelEn: 'Configure kg and bundle prices from Admin',
    descriptionOm: 'Gatiin ammallee hin murtoofne. Admin formii keessatti gatii galchuun website irratti mul’isuu danda’a.',
    descriptionEn: 'Prices initially set to null. Admin sets live ETB prices per kg and bundle in Admin panel.',
    completed: false
  },
  {
    id: 'chk-4',
    labelOm: 'Stock dhugaa galmeessuu',
    labelEn: 'Record real inventory stock levels',
    descriptionOm: 'Hamma jimaa kiiloo fi hidhata harkaa qabdan galchaa.',
    descriptionEn: 'Enter actual stock quantities for both kg and bundle units.',
    completed: false
  },
  {
    id: 'chk-5',
    labelOm: 'Lakkoofsa WhatsApp daldalaa qindeessuu',
    labelEn: 'Configure verified WhatsApp business number',
    descriptionOm: 'Lakkoofsi +251944615768 (Ibsa Naaji) qindaa’ee jira.',
    descriptionEn: 'WhatsApp business phone +251944615768 configured for direct chat orders.',
    completed: true
  },
  {
    id: 'chk-6',
    labelOm: 'Delivery fee Finfinnee keessatti ajaja tokkoon tokkoof murteessuu',
    labelEn: 'Confirm delivery fee per order in Addis Ababa',
    descriptionOm: 'Kaffaltii geejjibaa bakka maamilli jiru irratti hundaa’uun Admin’n mirkaneessa.',
    descriptionEn: 'Delivery fee is dynamically calculated and confirmed per sub-city address.',
    completed: true
  },
  {
    id: 'chk-7',
    labelOm: 'Checkout fi order submission backend nageenya qabu ijaaruu',
    labelEn: 'Build secure checkout and order submission',
    descriptionOm: 'Maamiltoonni odeeffannoo isaanii galchuun WhatsApp fi sirna ajaja website irratti erguu danda’u.',
    descriptionEn: 'Interactive order inquiry modal with instant WhatsApp dispatch & local database.',
    completed: true
  },
  {
    id: 'chk-8',
    labelOm: 'Admin login, RLS fi payment security qorachuu',
    labelEn: 'Test Admin access, RLS policies and order security',
    descriptionOm: 'Admin dashboard fi SQL scripts Supabase qophaa’aniiru.',
    descriptionEn: 'Admin management panel with PIN code access and copyable Supabase migration scripts.',
    completed: true
  }
];

export const SUPABASE_SQL_SCRIPT = `-- =========================================================
-- Jimaa Hararge — Supabase SQL Migration
-- Run this in Supabase -> SQL Editor -> New Query
-- =========================================================

-- 1. Support both kg and bundle units
alter table if exists public.products
  alter column unit drop not null,
  alter column price drop not null;

alter table if exists public.products
  drop constraint if exists products_unit_check;

alter table if exists public.products
  add constraint products_unit_check
  check (unit is null or unit in ('kg', 'bundle'));

-- 2. Create product_variants table for kg & bundle isolation
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id)
    on delete cascade,
  unit text not null check (unit in ('kg', 'bundle')),
  price numeric(12,2)
    check (price is null or price >= 0),
  stock_quantity numeric(12,3) not null default 0
    check (stock_quantity >= 0),
  min_order_quantity numeric(12,3) not null default 1
    check (min_order_quantity > 0),
  is_available boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, unit)
);

-- 3. Product master records
insert into public.products
  (name, description, origin, image_url, unit, price,
   stock_quantity, min_order_quantity, is_available)
values
  ('Shafaa Madhichoo', 'Gosa jimaa filatamaa Harargee', 'Harargee', null, null, null, 0, 1, true),
  ('Shafaa Booke',     'Gosa jimaa Booke Harargee',     'Harargee', null, null, null, 0, 1, true),
  ('Tacoree',          'Gosa jimaa Tacoree Harargee',    'Harargee', null, null, null, 0, 1, true),
  ('Galamsoo',         'Gosa jimaa Galamsoo Harargee',   'Harargee', null, null, null, 0, 1, true),
  ('Liyyu',            'Gosa jimaa Liyyu Harargee',      'Harargee', null, null, null, 0, 1, true),
  ('Maxxagasha',       'Gosa jimaa Maxxagasha Harargee', 'Harargee', null, null, null, 0, 1, true)
on conflict do nothing;

-- 4. Create kg and bundle options for each product
insert into public.product_variants (product_id, unit, price, stock_quantity, is_available)
select p.id, u.unit, null, 0, false
from public.products p
cross join (values ('kg'), ('bundle')) as u(unit)
where p.name in (
  'Shafaa Madhichoo', 'Shafaa Booke', 'Tacoree',
  'Galamsoo', 'Liyyu', 'Maxxagasha'
)
on conflict (product_id, unit) do nothing;

create index if not exists product_variants_product_idx
  on public.product_variants(product_id);

-- 5. Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

-- Public read active products
create policy "Public read active products"
on public.products
for select
to anon, authenticated
using (is_available = true);

-- Public read available variants only
create policy "Public read available variants"
on public.product_variants
for select
to anon, authenticated
using (
  is_available = true
  and price is not null
  and exists (
    select 1
    from public.products p
    where p.id = product_id
      and p.is_available = true
  )
);
`;
