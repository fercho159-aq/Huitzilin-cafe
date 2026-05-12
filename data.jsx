/* Huitzitzilin Cafe — menu, branches, FAQ data */

const MENU_ITEMS = [
  // Café mexicano
  {
    id: "fc-olla",
    cat: "coffee",
    name: { es: "Café de olla", en: "Café de olla", fr: "Café de olla" },
    desc: {
      es: "Nuestra firma. Café de Chiapas, piloncillo, canela y clavo. Servido en jarrito de barro.",
      en: "Our signature. Chiapas coffee, piloncillo, cinnamon and clove. Served in a clay jarrito.",
      fr: "Notre signature. Café du Chiapas, piloncillo, cannelle et clou de girofle. Servi dans un jarrito.",
    },
    price: 5.5,
    img: "images/cafe-de-olla.jpg",
    tags: ["popular"],
  },
  {
    id: "fc-chiapas",
    cat: "coffee",
    name: { es: "Filtro Chiapas", en: "Chiapas filter", fr: "Filtre Chiapas" },
    desc: {
      es: "Single origin de la Sierra Madre. Notas de chocolate oscuro, nuez y naranja.",
      en: "Single origin from the Sierra Madre. Dark chocolate, walnut and orange notes.",
      fr: "Origine unique de la Sierra Madre. Notes de chocolat noir, noix et orange.",
    },
    price: 5.25,
    img: "images/cafe-talavera.jpg",
    tags: [],
  },
  {
    id: "fc-oaxaca",
    cat: "coffee",
    name: { es: "Oaxaca Pluma", en: "Oaxaca Pluma", fr: "Oaxaca Pluma" },
    desc: {
      es: "Lavado de altura. Caramelo, manzana, miel de agave.",
      en: "High-altitude washed. Caramel, apple, agave honey.",
      fr: "Lavé d'altitude. Caramel, pomme, miel d'agave.",
    },
    price: 5.75,
    img: "images/cafe-talavera.jpg",
    tags: ["new"],
  },
  // Espresso
  {
    id: "es-espresso",
    cat: "espresso",
    name: { es: "Espresso", en: "Espresso", fr: "Espresso" },
    desc: {
      es: "Doble shot de mezcla Tres Cumbres. Ristretto bajo pedido.",
      en: "Double shot of our Tres Cumbres blend. Ristretto on request.",
      fr: "Double dose de notre mélange Tres Cumbres. Ristretto sur demande.",
    },
    price: 3.75,
    img: "images/cafe-talavera.jpg",
    tags: [],
  },
  {
    id: "es-jarrito",
    cat: "espresso",
    name: { es: "Latte en jarrito", en: "Jarrito latte", fr: "Latte en jarrito" },
    desc: {
      es: "Doble espresso, leche al vapor, servido en barro negro de Oaxaca. Sello de la casa.",
      en: "Double espresso, steamed milk, in black clay from Oaxaca. House signature.",
      fr: "Double espresso, lait vapeur, dans une poterie noire d'Oaxaca. Signature maison.",
    },
    price: 5.5,
    img: "images/cafe-de-olla.jpg",
    tags: ["popular"],
  },
  {
    id: "es-cortado",
    cat: "espresso",
    name: { es: "Cortado", en: "Cortado", fr: "Cortado" },
    desc: {
      es: "Espresso con la justa cantidad de leche al vapor. 4 oz.",
      en: "Espresso with just enough steamed milk. 4 oz.",
      fr: "Espresso avec juste assez de lait vapeur. 4 oz.",
    },
    price: 4.25,
    img: "images/cafe-talavera.jpg",
    tags: [],
  },
  {
    id: "es-cappuccino",
    cat: "espresso",
    name: { es: "Cappuccino", en: "Cappuccino", fr: "Cappuccino" },
    desc: {
      es: "Doble espresso, microespuma sedosa, una pizca de canela.",
      en: "Double espresso, silky microfoam, a touch of cinnamon.",
      fr: "Double espresso, micro-mousse soyeuse, soupçon de cannelle.",
    },
    price: 5.25,
    img: "images/cafe-de-olla.jpg",
    tags: [],
  },
  // Bagels
  {
    id: "br-avocado",
    cat: "brunch",
    name: { es: "Bagel aguacate & huevo", en: "Avocado & egg bagel", fr: "Bagel avocat & œuf" },
    desc: {
      es: "Bagel del día, aguacate machacado, huevo cocido, sal de mar, chile piquín. Vegetariano.",
      en: "Bagel of the day, smashed avocado, boiled egg, sea salt, chile piquín. Vegetarian.",
      fr: "Bagel du jour, avocat écrasé, œuf, fleur de sel, piment piquín. Végétarien.",
    },
    price: 12.5,
    img: "images/spread-bagel-matchas.jpg",
    tags: ["popular"],
  },
  {
    id: "br-bagel-ham",
    cat: "brunch",
    name: { es: "Bagel jamón & queso", en: "Ham & cheese bagel", fr: "Bagel jambon & fromage" },
    desc: {
      es: "Jamón de pavo, queso oaxaca derretido, espinaca, mayonesa de chipotle. Pan tostado.",
      en: "Turkey ham, melted oaxaca cheese, spinach, chipotle mayo. Toasted bun.",
      fr: "Jambon de dinde, fromage oaxaca fondu, épinards, mayo chipotle. Pain grillé.",
    },
    price: 13.5,
    img: "images/bagel-matcha-corazon.jpg",
    tags: [],
  },
  {
    id: "br-bagel-clasico",
    cat: "brunch",
    name: { es: "Bagel clásico Colibrí", en: "Classic Colibrí bagel", fr: "Bagel classique Colibrí" },
    desc: {
      es: "Bagel artesanal, jamón, queso manchego, jitomate, cilantro fresco. Servido caliente.",
      en: "Artisan bagel, ham, manchego, tomato, fresh cilantro. Served warm.",
      fr: "Bagel artisanal, jambon, manchego, tomate, coriandre fraîche. Servi chaud.",
    },
    price: 13.0,
    img: "images/bagel-jarrito.jpg",
    tags: ["new"],
  },
  // Pastries / Pan dulce
  {
    id: "pa-concha",
    cat: "pastries",
    name: { es: "Concha de vainilla", en: "Vanilla concha", fr: "Concha à la vanille" },
    desc: {
      es: "Pan dulce tradicional, masa suave, costra de vainilla. Horneado cada mañana.",
      en: "Traditional Mexican sweet bread with a vanilla sugar shell. Baked every morning.",
      fr: "Pain sucré traditionnel mexicain, croûte de sucre à la vanille. Cuit chaque matin.",
    },
    price: 4.25,
    img: "images/spread-bagel-matchas.jpg",
    tags: ["popular"],
  },
  {
    id: "pa-cookie",
    cat: "pastries",
    name: { es: "Galleta de chocolate y sal", en: "Sea salt chocolate cookie", fr: "Biscuit chocolat fleur de sel" },
    desc: {
      es: "Chocolate semi-amargo, sal de mar Vancouver Island. Vegana.",
      en: "Semisweet chocolate, Vancouver Island sea salt. Vegan.",
      fr: "Chocolat mi-amer, fleur de sel de Vancouver Island. Végétalien.",
    },
    price: 3.75,
    img: "images/spread-bagel-matchas.jpg",
    tags: ["vegan"],
  },
  {
    id: "pa-banana",
    cat: "pastries",
    name: { es: "Pan de plátano sin gluten", en: "Gluten-free banana bread", fr: "Pain à la banane sans gluten" },
    desc: {
      es: "Plátano maduro, harina de almendra, nuez. Sin gluten, sin lácteos.",
      en: "Ripe banana, almond flour, walnut. Gluten-free, dairy-free.",
      fr: "Banane mûre, farine d'amande, noix. Sans gluten, sans lactose.",
    },
    price: 5.25,
    img: "images/spread-bagel-matchas.jpg",
    tags: ["gf", "df"],
  },
  // Matcha & cold
  {
    id: "cd-matcha-fresa",
    cat: "cold",
    name: { es: "Matcha fresa", en: "Strawberry matcha", fr: "Matcha aux fraises" },
    desc: {
      es: "Matcha ceremonial Uji, mermelada de fresa de la casa, leche de almendra, fresa liofilizada.",
      en: "Uji ceremonial matcha, house strawberry jam, almond milk, freeze-dried strawberry.",
      fr: "Matcha cérémonial d'Uji, confiture de fraises maison, lait d'amande, fraise lyophilisée.",
    },
    price: 7.25,
    img: "images/matcha-fresa-las-jaras.jpg",
    tags: ["popular", "new", "df"],
  },
  {
    id: "cd-matcha-canela",
    cat: "cold",
    name: { es: "Matcha de canela", en: "Cinnamon matcha", fr: "Matcha à la cannelle" },
    desc: {
      es: "Matcha Uji, espuma de leche, canela de Ceilán y un toque de vainilla mexicana.",
      en: "Uji matcha, milk foam, Ceylon cinnamon and a touch of Mexican vanilla.",
      fr: "Matcha d'Uji, mousse de lait, cannelle de Ceylan et soupçon de vanille mexicaine.",
    },
    price: 6.75,
    img: "images/matcha-serape.jpg",
    tags: ["popular"],
  },
  {
    id: "cd-coldbrew",
    cat: "cold",
    name: { es: "Cold brew Chiapas", en: "Chiapas cold brew", fr: "Cold brew Chiapas" },
    desc: {
      es: "Extracción lenta 18h sobre granos de Chiapas. Suave, dulce natural.",
      en: "18-hour slow extraction on Chiapas beans. Smooth, naturally sweet.",
      fr: "Extraction lente 18 h sur grains du Chiapas. Doux, sucré naturellement.",
    },
    price: 5.5,
    img: "images/cafe-de-olla.jpg",
    tags: [],
  },
  {
    id: "cd-horchata",
    cat: "cold",
    name: { es: "Horchata espresso", en: "Horchata espresso", fr: "Horchata espresso" },
    desc: {
      es: "Horchata de arroz y canela hecha en casa, doble shot de espresso encima.",
      en: "House rice-and-cinnamon horchata, double espresso poured on top.",
      fr: "Horchata maison (riz et cannelle), double espresso versé par-dessus.",
    },
    price: 6.25,
    img: "images/matcha-serape.jpg",
    tags: ["df", "new"],
  },
];

const BRANCHES = [
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

const CHANNEL_NAMES = {
  pickup: { es: "Pick-up", en: "Pickup", fr: "Cueillette" },
  doordash: { es: "DoorDash", en: "DoorDash", fr: "DoorDash" },
};

const SAMPLE_CUSTOMERS = ["Émile T.", "Sara M.", "Léa B.", "Ravi P.", "Chloé D.", "Marcus L.", "Yuki H.", "Diego N.", "Aisha K.", "Nora F.", "Théo R.", "Priya S."];

function makeSeedOrders(now) {
  const items = MENU_ITEMS;
  const seed = [];
  const statuses = ["new", "new", "prep", "prep", "prep", "ready", "ready", "done", "done", "done", "done"];
  for (let i = 0; i < 11; i++) {
    const ageMin = i < 2 ? Math.random() * 1.5 : i < 5 ? 2 + Math.random() * 4 : i < 7 ? 6 + Math.random() * 5 : 12 + Math.random() * 30;
    const lineCount = 1 + Math.floor(Math.random() * 3);
    const lines = [];
    let total = 0;
    for (let j = 0; j < lineCount; j++) {
      const it = items[Math.floor(Math.random() * items.length)];
      const qty = 1 + Math.floor(Math.random() * 2);
      lines.push({ id: it.id, qty, name: it.name, price: it.price });
      total += it.price * qty;
    }
    seed.push({
      id: `C-${(2400 + i * 7).toString()}`,
      customer: SAMPLE_CUSTOMERS[i % SAMPLE_CUSTOMERS.length],
      channel: Math.random() > 0.45 ? "pickup" : "doordash",
      status: statuses[i],
      placedAt: now - ageMin * 60 * 1000,
      lines,
      total: Math.round(total * 100) / 100,
    });
  }
  return seed;
}

Object.assign(window, { MENU_ITEMS, BRANCHES, CHANNEL_NAMES, makeSeedOrders });
