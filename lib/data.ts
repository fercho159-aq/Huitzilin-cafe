export interface MenuItem {
  id: string;
  cat: string;
  name: Record<string, string>;
  desc: Record<string, string>;
  price: number;
  priceLg?: number;
  sizeSm?: string;
  sizeLg?: string;
  img: string;
  tags: string[];
}

export interface Branch {
  id: string;
  name: string;
  role: Record<string, string>;
  address: string;
  phone: string;
  hours: string[];
  coords: { x: number; y: number };
  seats: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // SIGNATURE LATTES (espresso)
  {
    id: "sl-arroz",
    cat: "espresso",
    name: {
      es: "Arroz con leche latte",
      en: "Arroz con leche latte",
      fr: "Latte arroz con leche",
    },
    desc: {
      es: "Arroz, leche condensada, azúcar, leche evaporada, vainilla, canela, espresso. La firma de la casa.",
      en: "Rice, condensed milk, sugar, evaporated milk, vanilla, cinnamon and espresso. House signature.",
      fr: "Riz, lait concentré, sucre, lait évaporé, vanille, cannelle et espresso. Signature maison.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/iced-arroz-leche.jpg",
    tags: ["popular"],
  },
  {
    id: "sl-cheesecake",
    cat: "espresso",
    name: { es: "Cheesecake latte", en: "Cheesecake latte", fr: "Latte cheesecake" },
    desc: {
      es: "Queso crema, leche condensada, vainilla y espresso. Postre líquido.",
      en: "Cream cheese, condensed milk, vanilla and espresso. Dessert in a cup.",
      fr: "Fromage à la crème, lait concentré, vanille et espresso. Dessert liquide.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/latte-art-top.jpg",
    tags: [],
  },
  {
    id: "sl-cafe-olla",
    cat: "espresso",
    name: { es: "Café de olla latte", en: "Café de olla latte", fr: "Latte café de olla" },
    desc: {
      es: "Piloncillo, canela, clavo y espresso. Memoria de fogón de leña.",
      en: "Piloncillo, cinnamon, clove and espresso. A wood-fire memory.",
      fr: "Piloncillo, cannelle, clou de girofle et espresso. Mémoire de feu de bois.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/cafe-de-olla.jpg",
    tags: ["popular"],
  },
  {
    id: "sl-cookie-butter",
    cat: "espresso",
    name: { es: "Cookie butter latte", en: "Cookie butter latte", fr: "Latte cookie butter" },
    desc: {
      es: "Azúcar mascabado, mantequilla, galleta Biscoff y espresso.",
      en: "Brown sugar, butter, Biscoff cookie and espresso.",
      fr: "Cassonade, beurre, biscuit Biscoff et espresso.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/latte-art-dog.jpg",
    tags: ["new"],
  },
  {
    id: "sl-rose",
    cat: "espresso",
    name: { es: "Rose petals latte", en: "Rose petals latte", fr: "Latte aux pétales de rose" },
    desc: {
      es: "Espresso, leche al vapor y jarabe de pétalos de rosa. Floral y suave.",
      en: "Espresso, steamed milk and rose petal syrup. Floral and soft.",
      fr: "Espresso, lait vapeur et sirop de pétales de rose. Floral et doux.",
    },
    price: 7.0,
    img: "/images/rose-petals-latte.jpg",
    tags: ["new"],
  },

  // SPECIALTY COFFEE (coffee)
  {
    id: "co-espresso",
    cat: "coffee",
    name: { es: "Espresso", en: "Espresso", fr: "Espresso" },
    desc: {
      es: "Doble shot de mezcla de la casa. Crema densa, notas de cacao.",
      en: "Double shot of our house blend. Dense crema, cocoa notes.",
      fr: "Double dose du mélange maison. Crème dense, notes de cacao.",
    },
    price: 4.0,
    img: "/images/espresso-huitzitzilin.jpg",
    tags: [],
  },
  {
    id: "co-americano",
    cat: "coffee",
    name: { es: "Americano", en: "Americano", fr: "Americano" },
    desc: {
      es: "Espresso largo con agua caliente. Limpio y directo.",
      en: "Long espresso with hot water. Clean and direct.",
      fr: "Espresso allongé à l'eau chaude. Net et direct.",
    },
    price: 5.0,
    priceLg: 6.0,
    sizeSm: "12oz",
    sizeLg: "16oz",
    img: "/images/cafe-talavera.jpg",
    tags: [],
  },
  {
    id: "co-cappuccino",
    cat: "coffee",
    name: { es: "Cappuccino", en: "Cappuccino", fr: "Cappuccino" },
    desc: {
      es: "Doble espresso y microespuma sedosa. Pizca de canela bajo pedido.",
      en: "Double espresso and silky microfoam. A touch of cinnamon on request.",
      fr: "Double espresso et micro-mousse soyeuse. Pincée de cannelle sur demande.",
    },
    price: 4.5,
    priceLg: 5.25,
    sizeSm: "8oz",
    sizeLg: "12oz",
    img: "/images/cappuccino-rosemary.jpg",
    tags: ["popular"],
  },
  {
    id: "co-cortado",
    cat: "coffee",
    name: { es: "Cortado", en: "Cortado", fr: "Cortado" },
    desc: {
      es: "Espresso con la justa cantidad de leche al vapor. 4 oz.",
      en: "Espresso with just enough steamed milk. 4 oz.",
      fr: "Espresso avec juste assez de lait vapeur. 4 oz.",
    },
    price: 4.75,
    img: "/images/latte-tall.jpg",
    tags: [],
  },
  {
    id: "co-flat-white",
    cat: "coffee",
    name: { es: "Flat white", en: "Flat white", fr: "Flat white" },
    desc: {
      es: "Doble ristretto y leche al vapor con poca espuma. Intenso.",
      en: "Double ristretto and steamed milk with little foam. Intense.",
      fr: "Double ristretto et lait vapeur avec peu de mousse. Intense.",
    },
    price: 5.0,
    img: "/images/bagel-jarrito.jpg",
    tags: [],
  },
  {
    id: "co-latte",
    cat: "coffee",
    name: { es: "Latte", en: "Latte", fr: "Latte" },
    desc: {
      es: "Doble espresso y leche al vapor. Arte en la espuma de la casa.",
      en: "Double espresso and steamed milk. House latte art on top.",
      fr: "Double espresso et lait vapeur. Latte art maison sur le dessus.",
    },
    price: 7.0,
    img: "/images/latte-art-top.jpg",
    tags: ["popular"],
  },
  {
    id: "co-drip",
    cat: "coffee",
    name: { es: "Drip / Chemex / French press", en: "Drip / Chemex / French press", fr: "Filtre / Chemex / French press" },
    desc: {
      es: "Filtro lento del día. Pregunta al barista por el origen.",
      en: "Slow filter of the day. Ask the barista for today's origin.",
      fr: "Filtre lent du jour. Demande au barista l'origine du jour.",
    },
    price: 4.75,
    priceLg: 5.5,
    sizeSm: "12oz",
    sizeLg: "16oz",
    img: "/images/matcha-serape.jpg",
    tags: [],
  },
  {
    id: "co-affogato",
    cat: "coffee",
    name: { es: "Affogato", en: "Affogato", fr: "Affogato" },
    desc: {
      es: "Helado de vainilla con dos shots de espresso encima. Sirve frío y caliente al mismo tiempo.",
      en: "Vanilla ice cream with two espresso shots poured on top. Cold and hot in one glass.",
      fr: "Glace vanille et deux dose d'espresso versées dessus. Froid et chaud à la fois.",
    },
    price: 6.5,
    img: "/images/cafe-talavera.jpg",
    tags: ["new"],
  },

  // MATCHA & COLD (cold)
  {
    id: "cd-matcha-fresa",
    cat: "cold",
    name: { es: "Matcha de fresa", en: "Strawberry matcha", fr: "Matcha aux fraises" },
    desc: {
      es: "Matcha ceremonial, leche y fresa fresca. Tricolor, como la bandera.",
      en: "Ceremonial matcha, milk and fresh strawberry. Tricolor, like the flag.",
      fr: "Matcha cérémonial, lait et fraise fraîche. Tricolore, comme le drapeau.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/strawberry-matcha-tricolor.jpg",
    tags: ["popular", "new"],
  },
  {
    id: "cd-matcha-honey",
    cat: "cold",
    name: { es: "Matcha de miel", en: "Honey matcha", fr: "Matcha au miel" },
    desc: {
      es: "Matcha ceremonial, leche y miel local. Equilibrio dulce y herbal.",
      en: "Ceremonial matcha, milk and local honey. Sweet and herbal balance.",
      fr: "Matcha cérémonial, lait et miel local. Équilibre sucré et herbal.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/matcha-top.jpg",
    tags: [],
  },
  {
    id: "cd-matcha-blueberry",
    cat: "cold",
    name: { es: "Matcha de blueberry", en: "Blueberry matcha", fr: "Matcha aux bleuets" },
    desc: {
      es: "Matcha ceremonial con compota de arándano. Postre helado.",
      en: "Ceremonial matcha with blueberry compote. A frozen dessert.",
      fr: "Matcha cérémonial avec compote de bleuets. Dessert glacé.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/matcha-fresa-top.jpg",
    tags: [],
  },
  {
    id: "cd-dirty-honey-matcha",
    cat: "cold",
    name: { es: "Dirty honey matcha", en: "Dirty honey matcha", fr: "Dirty honey matcha" },
    desc: {
      es: "Matcha de miel con un shot de espresso. Doble cafeína, doble carácter.",
      en: "Honey matcha with a shot of espresso. Double caffeine, double character.",
      fr: "Matcha au miel avec une dose d'espresso. Double caféine, double caractère.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/matcha-fresa-las-jaras.jpg",
    tags: ["new"],
  },
  {
    id: "cd-strawberry-matcha-lemonade",
    cat: "cold",
    name: {
      es: "Limonada matcha fresa",
      en: "Strawberry matcha lemonade",
      fr: "Limonade matcha fraise",
    },
    desc: {
      es: "Limonada fresca, matcha y fresa. Refrescante, sin lácteos.",
      en: "Fresh lemonade, matcha and strawberry. Refreshing, dairy-free.",
      fr: "Limonade fraîche, matcha et fraise. Rafraîchissant, sans lactose.",
    },
    price: 7.0,
    priceLg: 7.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/matcha-serape.jpg",
    tags: ["df"],
  },
  {
    id: "cd-lavender-lemonade",
    cat: "cold",
    name: { es: "Limonada de lavanda", en: "Lavender lemonade", fr: "Limonade à la lavande" },
    desc: {
      es: "Limonada con jarabe de lavanda de la casa. Floral, sin lácteos.",
      en: "Lemonade with our house lavender syrup. Floral and dairy-free.",
      fr: "Limonade avec notre sirop de lavande maison. Floral et sans lactose.",
    },
    price: 6.0,
    priceLg: 6.5,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/rose-petals-latte.jpg",
    tags: ["df", "vegan"],
  },
  {
    id: "cd-dirty-orange",
    cat: "cold",
    name: { es: "Dirty orange latte", en: "Dirty orange latte", fr: "Latte orange noir" },
    desc: {
      es: "Jarabe de naranja, vaso glaseado con chocolate y espresso. Solo servido frío.",
      en: "Orange syrup, chocolate-glazed cup and espresso. Cold only.",
      fr: "Sirop d'orange, verre glacé au chocolat et espresso. Servi froid seulement.",
    },
    price: 7.75,
    priceLg: 8.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/dirty-orange-latte.jpg",
    tags: ["new", "popular"],
  },
  {
    id: "cd-naranjito",
    cat: "cold",
    name: { es: "Naranjito", en: "Naranjito", fr: "Naranjito" },
    desc: {
      es: "Jugo de naranja recién exprimido y espresso. Espresso tonic con cítrico mexicano.",
      en: "Fresh orange juice and espresso. A Mexican-citrus espresso tonic.",
      fr: "Jus d'orange pressé et espresso. Tonic à l'espresso aux agrumes mexicains.",
    },
    price: 6.5,
    priceLg: 7.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/dirty-orange-latte.jpg",
    tags: ["df"],
  },
  {
    id: "cd-strawberry-tonic",
    cat: "cold",
    name: { es: "Strawberry / espresso tonic", en: "Strawberry / espresso tonic", fr: "Tonic à la fraise / espresso" },
    desc: {
      es: "Agua tónica, jarabe de fresa de la casa y espresso. Burbujas + cafeína.",
      en: "Tonic water, house strawberry syrup and espresso. Bubbles and caffeine.",
      fr: "Eau tonique, sirop maison à la fraise et espresso. Bulles et caféine.",
    },
    price: 6.5,
    priceLg: 7.75,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/matcha-fresa-top.jpg",
    tags: ["df"],
  },
  {
    id: "cd-cold-brew",
    cat: "cold",
    name: { es: "Cold brew Chiapas", en: "Chiapas cold brew", fr: "Cold brew Chiapas" },
    desc: {
      es: "Extracción lenta 18 h sobre granos de Chiapas. Suave, dulce natural.",
      en: "18-hour slow extraction on Chiapas beans. Smooth, naturally sweet.",
      fr: "Extraction lente 18 h sur grains du Chiapas. Doux, sucré naturellement.",
    },
    price: 5.5,
    img: "/images/cafe-de-olla.jpg",
    tags: ["df"],
  },

  // NON-COFFEE & TEAS — grouped into cold (it's the "drink" cat)
  {
    id: "cd-chocolate-canela",
    cat: "cold",
    name: { es: "Chocolate mexicano", en: "Mexican chocolate", fr: "Chocolat mexicain" },
    desc: {
      es: "Chocolate caliente con canela. Espuma esponjosa al molinillo.",
      en: "Hot chocolate with cinnamon. Fluffy molinillo foam.",
      fr: "Chocolat chaud à la cannelle. Mousse aérienne au molinillo.",
    },
    price: 5.0,
    priceLg: 6.0,
    sizeSm: "12oz",
    sizeLg: "16oz",
    img: "/images/cafe-de-olla.jpg",
    tags: [],
  },
  {
    id: "cd-tea",
    cat: "cold",
    name: { es: "Earl Grey / manzanilla", en: "Earl Grey / chamomile", fr: "Earl Grey / camomille" },
    desc: {
      es: "Té en hojas, infusión a 95°C. Pregunta por el blend de la semana.",
      en: "Loose-leaf tea, brewed at 95°C. Ask about this week's blend.",
      fr: "Thé en feuilles, infusé à 95°C. Demande le mélange de la semaine.",
    },
    price: 5.0,
    img: "/images/wall-art.jpg",
    tags: ["df", "vegan"],
  },
  {
    id: "cd-vital-zing",
    cat: "cold",
    name: { es: "Vital Zing", en: "Vital Zing", fr: "Vital Zing" },
    desc: {
      es: "Cúrcuma, jugo de naranja, jengibre y miel. Sin cafeína, mucho color.",
      en: "Turmeric, orange juice, ginger and honey. Caffeine-free, colour-loud.",
      fr: "Curcuma, jus d'orange, gingembre et miel. Sans caféine, plein de couleur.",
    },
    price: 5.75,
    priceLg: 6.5,
    sizeSm: "16oz",
    sizeLg: "24oz",
    img: "/images/dirty-orange-latte.jpg",
    tags: ["df"],
  },

  // BRUNCH / BAGELS (placeholder until bagel menu arrives)
  {
    id: "br-bagel-house",
    cat: "brunch",
    name: { es: "Bagel de la casa", en: "House bagel", fr: "Bagel maison" },
    desc: {
      es: "Bagel artesanal con jamón, queso, jitomate y verde fresco. Servido en barro.",
      en: "Artisan bagel with ham, cheese, tomato and fresh greens. Served on clay.",
      fr: "Bagel artisanal au jambon, fromage, tomate et verdure fraîche. Servi sur argile.",
    },
    price: 12.5,
    img: "/images/bagel-jarrito-scene.jpg",
    tags: ["popular"],
  },
  {
    id: "br-bagel-bacon",
    cat: "brunch",
    name: { es: "Bagel tocino & queso", en: "Bacon & cheese bagel", fr: "Bagel bacon & fromage" },
    desc: {
      es: "Tocino crujiente, queso derretido, mayo de chipotle. Servido en jarrito mexicano.",
      en: "Crispy bacon, melted cheese, chipotle mayo. Served on Mexican clay.",
      fr: "Bacon croustillant, fromage fondu, mayo chipotle. Servi sur argile mexicaine.",
    },
    price: 13.5,
    img: "/images/mexican-plate.jpg",
    tags: [],
  },

  // PASTRIES
  {
    id: "pa-muffin",
    cat: "pastries",
    name: { es: "Muffin del día", en: "Muffin of the day", fr: "Muffin du jour" },
    desc: {
      es: "Muffin recién horneado. Sabor del día: arándano o chocolate.",
      en: "Freshly baked muffin. Today's flavour: blueberry or chocolate.",
      fr: "Muffin fraîchement cuit. Saveur du jour : bleuet ou chocolat.",
    },
    price: 4.25,
    img: "/images/pastries-case.jpg",
    tags: ["popular"],
  },
  {
    id: "pa-scone",
    cat: "pastries",
    name: { es: "Scone", en: "Scone", fr: "Scone" },
    desc: {
      es: "Scone tradicional canadiense con un toque mexicano. Mantequilla y queso o frutas.",
      en: "Canadian scone with a Mexican twist. Butter-cheese or fruit.",
      fr: "Scone canadien avec une touche mexicaine. Beurre-fromage ou fruits.",
    },
    price: 4.0,
    img: "/images/pastries-case.jpg",
    tags: [],
  },
  {
    id: "pa-cookie",
    cat: "pastries",
    name: { es: "Galleta de chocolate y sal", en: "Sea-salt chocolate cookie", fr: "Biscuit chocolat fleur de sel" },
    desc: {
      es: "Chocolate semi-amargo y sal de mar. Vegana.",
      en: "Semi-sweet chocolate and sea salt. Vegan.",
      fr: "Chocolat mi-amer et fleur de sel. Végétalien.",
    },
    price: 3.75,
    img: "/images/bagel-matcha-corazon.jpg",
    tags: ["vegan", "df"],
  },
  {
    id: "pa-concha",
    cat: "pastries",
    name: { es: "Concha de vainilla", en: "Vanilla concha", fr: "Concha à la vanille" },
    desc: {
      es: "Pan dulce tradicional, masa suave, costra de vainilla. Horneado cada mañana.",
      en: "Traditional Mexican sweet bread, soft dough, vanilla shell. Baked daily.",
      fr: "Pain sucré traditionnel mexicain, mie tendre, croûte de vanille. Cuit chaque matin.",
    },
    price: 4.25,
    img: "/images/spread-bagel-matchas.jpg",
    tags: ["popular"],
  },
];

export const SYRUPS: { name: Record<string, string> }[] = [
  { name: { es: "Vainilla", en: "Vanilla", fr: "Vanille" } },
  { name: { es: "Miel", en: "Honey", fr: "Miel" } },
  { name: { es: "Pétalos de rosa", en: "Rose petals", fr: "Pétales de rose" } },
  { name: { es: "Café de olla", en: "Café de olla", fr: "Café de olla" } },
  { name: { es: "Caramelo", en: "Caramel", fr: "Caramel" } },
  { name: { es: "Lavanda", en: "Lavender", fr: "Lavande" } },
  { name: { es: "Vainilla sin azúcar", en: "Vanilla sugar-free", fr: "Vanille sans sucre" } },
  { name: { es: "Chocolate blanco sin azúcar", en: "White chocolate sugar-free", fr: "Chocolat blanc sans sucre" } },
];

export const ALT_MILKS: { name: Record<string, string> }[] = [
  { name: { es: "Leche de almendra", en: "Almond milk", fr: "Lait d'amande" } },
  { name: { es: "Leche de coco", en: "Coconut milk", fr: "Lait de coco" } },
  { name: { es: "Leche de avena", en: "Oat milk", fr: "Lait d'avoine" } },
  { name: { es: "Leche 2%", en: "2% milk", fr: "Lait 2%" } },
  { name: { es: "Half & Half", en: "Half & Half", fr: "Half & Half" } },
];

export const SYRUP_PRICE = 1.5;
export const ALT_MILK_PRICE = 1.0;

export const BRANCHES: Branch[] = [
  {
    id: "yaletown",
    name: "Yaletown",
    role: { es: "Casa principal", en: "Flagship", fr: "Maison principale" },
    address: "1142 Mainland St, Vancouver, BC V6B 5P2",
    phone: "+1 (604) 555-0142",
    hours: ["07:00–19:00", "07:00–19:00", "07:00–19:00", "07:00–20:00", "07:00–20:00", "08:00–20:00", "08:00–18:00"],
    coords: { x: 38, y: 56 },
    seats: 42,
  },
  {
    id: "mount-pleasant",
    name: "Mount Pleasant",
    role: { es: "Tostadora & cocina", en: "Roastery & kitchen", fr: "Torréfacteur & cuisine" },
    address: "2418 Main St, Vancouver, BC V5T 3E2",
    phone: "+1 (604) 555-0218",
    hours: ["07:00–18:00", "07:00–18:00", "07:00–18:00", "07:00–19:00", "07:00–19:00", "08:00–19:00", "08:00–17:00"],
    coords: { x: 56, y: 64 },
    seats: 28,
  },
  {
    id: "main",
    name: "Main Street",
    role: { es: "Barrio", en: "Neighbourhood", fr: "Quartier" },
    address: "4391 Main St, Vancouver, BC V5V 3R3",
    phone: "+1 (604) 555-0439",
    hours: ["07:30–18:00", "07:30–18:00", "07:30–18:00", "07:30–18:00", "07:30–18:00", "08:00–18:00", "08:00–17:00"],
    coords: { x: 64, y: 78 },
    seats: 18,
  },
];

export const CHANNEL_NAMES: Record<string, Record<string, string>> = {
  pickup: { es: "Pick-up", en: "Pickup", fr: "Cueillette" },
  doordash: { es: "DoorDash", en: "DoorDash", fr: "DoorDash" },
};

export const SAMPLE_CUSTOMERS = [
  "Émile T.", "Sara M.", "Léa B.", "Ravi P.", "Chloé D.", "Marcus L.", "Yuki H.", "Diego N.", "Aisha K.", "Nora F.", "Théo R.", "Priya S.",
];

export interface OrderLine {
  id: string;
  qty: number;
  name: Record<string, string>;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  channel: string;
  status: string;
  placedAt: number;
  lines: OrderLine[];
  total: number;
}

// Deterministic PRNG so SSR and CSR produce identical seed data (no hydration mismatch).
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeSeedOrders(now: number): Order[] {
  const items = MENU_ITEMS;
  const seed: Order[] = [];
  const statuses = ["new", "new", "prep", "prep", "prep", "ready", "ready", "done", "done", "done", "done"];
  // Seed by day-of-year so the data is stable across SSR/CSR within the same day
  // but still varies between days. `now` is intentionally not used for the seed
  // value because it differs between server and client.
  const d = new Date();
  const daySeed = d.getUTCFullYear() * 1000 + d.getUTCMonth() * 31 + d.getUTCDate();
  const rand = mulberry32(daySeed);

  for (let i = 0; i < 11; i++) {
    const ageMin =
      i < 2 ? rand() * 1.5 : i < 5 ? 2 + rand() * 4 : i < 7 ? 6 + rand() * 5 : 12 + rand() * 30;
    const lineCount = 1 + Math.floor(rand() * 3);
    const lines: OrderLine[] = [];
    let total = 0;
    for (let j = 0; j < lineCount; j++) {
      const it = items[Math.floor(rand() * items.length)];
      const qty = 1 + Math.floor(rand() * 2);
      lines.push({ id: it.id, qty, name: it.name, price: it.price });
      total += it.price * qty;
    }
    seed.push({
      id: `C-${(2400 + i * 7).toString()}`,
      customer: SAMPLE_CUSTOMERS[i % SAMPLE_CUSTOMERS.length],
      channel: rand() > 0.45 ? "pickup" : "doordash",
      status: statuses[i],
      placedAt: now - ageMin * 60 * 1000,
      lines,
      total: Math.round(total * 100) / 100,
    });
  }
  return seed;
}
