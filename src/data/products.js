// ==========================================================================
// THUGIL - Comprehensive Luxury Fashion Catalog
// Royal Black, Deep Burgundy & Muted Gold Master Archive
// 6 Major Departments & All Specific Subcategories
// ==========================================================================

export const DEPARTMENTS = [
  {
    id: "womens-wear",
    name: "Women’s Wear",
    shortName: "Women",
    tagline: "Imperial Elegance & Generational Drapes",
    description:
      "From certified mulberry Kanjivaram silks to sculpted velvet couture gowns and bridal lehengas, each silhouette commands heritage with timeless grace.",
    bannerImage: "/images/kanjivaram-saree.jpg",
    subcategories: [
      "Sarees",
      "Salwar Suits",
      "Kurtis",
      "Lehengas",
      "Gowns",
      "Anarkali Dresses",
      "Blouses",
      "Ethnic Wear",
      "Western Wear",
      "Tops",
      "Shirts",
      "Jeans",
      "Trousers",
      "Skirts",
      "Co-ord Sets",
      "Jumpsuits",
      "Party Wear",
      "Bridal Wear",
      "Nightwear"
    ],
    featuredHighlight: {
      title: "The Rajkumari Heirloom Drape",
      subtitle: "Pure Mulberry Silk with Muted Gold Korvai Border",
      priceUSD: 1280,
      image: "/images/kanjivaram-saree.jpg",
      sub: "Sarees"
    }
  },
  {
    id: "mens-wear",
    name: "Men’s Wear",
    shortName: "Men",
    tagline: "Sovereign Tailoring & Royal Heritage Attire",
    description:
      "Master-tailored bandhgalas, raw-silk kurta sets, pure zari dhotis, and bespoke dinner suits crafted for men of quiet distinction.",
    bannerImage: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      "Shirts",
      "T-Shirts",
      "Trousers",
      "Jeans",
      "Kurta Sets",
      "Veshti & Dhoti",
      "Ethnic Wear",
      "Blazers",
      "Suits",
      "Jackets",
      "Casual Wear",
      "Formal Wear",
      "Party Wear",
      "Nightwear"
    ],
    featuredHighlight: {
      title: "The Nawabi Raw Silk Kurta Ensemble",
      subtitle: "Ivory Silk Kurta with Antique Zari Nehru Jacket",
      priceUSD: 890,
      image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80",
      sub: "Kurta Sets"
    }
  },
  {
    id: "kids-wear",
    name: "Kids’ Wear",
    shortName: "Kids",
    tagline: "Little Royalty & Heirloom Festivities",
    description:
      "Handcrafted pure silk pattu pavadais, junior sherwanis, and festive frocks woven with hypoallergenic mulberry silk and certified skin-safe zari.",
    bannerImage: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      "Boys’ Clothing",
      "Girls’ Clothing",
      "Baby Clothing",
      "Pattu Pavadai",
      "Kids’ Ethnic Wear",
      "Frocks",
      "Dresses",
      "T-Shirts",
      "Shirts",
      "Shorts",
      "Jeans",
      "Party Wear",
      "Festive Wear",
      "Nightwear"
    ],
    featuredHighlight: {
      title: "The Swarnam Gold Zari Pattu Pavadai",
      subtitle: "Pure Kanchipuram Silk Skirt & Zardozi Top",
      priceUSD: 520,
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
      sub: "Pattu Pavadai"
    }
  },
  {
    id: "unisex-wear",
    name: "Unisex Wear",
    shortName: "Unisex",
    tagline: "Modern Silhouettes & Heritage Monograms",
    description:
      "Heavyweight brushed hoodies, pure modal draped tunics, and gold-embroidered street couture connecting ancestral motifs with contemporary luxury.",
    bannerImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      "T-Shirts",
      "Hoodies",
      "Sweatshirts",
      "Casual Wear",
      "Accessories"
    ],
    featuredHighlight: {
      title: "The Imperial Crest Gold-Embroidered Hoodie",
      subtitle: "550 GSM Organic Cotton with Metallic Zari Crest",
      priceUSD: 360,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      sub: "Hoodies"
    }
  },
  {
    id: "occasion-collections",
    name: "Occasion Collections",
    shortName: "Occasions",
    tagline: "Curated Grandeur for Life's Sacred Milestones",
    description:
      "Ensembles curated by master stylists for royal nuptials, sangeet soirées, boardroom authority, and traditional palace pujas.",
    bannerImage: "/images/bridal-lehenga.jpg",
    subcategories: [
      "Bridal Collection",
      "Wedding Wear",
      "Festive Collection",
      "Party Wear",
      "Office Wear",
      "Casual Wear",
      "Traditional Wear",
      "Seasonal Collections"
    ],
    featuredHighlight: {
      title: "The Noor-E-Awadh Zardozi Bridal Lehenga",
      subtitle: "16-Kali Velvet Gher with Antique Dabka Work",
      priceUSD: 2450,
      image: "/images/bridal-lehenga.jpg",
      sub: "Bridal Collection"
    }
  },
  {
    id: "accessories",
    name: "Accessories",
    shortName: "Accessories",
    tagline: "The Crown Jewels & Handcrafted Adornments",
    description:
      "Antique polki chokers, silk velvet potlis, gold-filigree kamarbandhs, and handcrafted mojari slippers to complete your regal presence.",
    bannerImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    subcategories: [
      "Bags",
      "Footwear",
      "Jewellery",
      "Belts",
      "Scarves",
      "Fashion Accessories"
    ],
    featuredHighlight: {
      title: "The Temple Heritage Kundan & Polki Choker Set",
      subtitle: "22K Gold Plated with Natural Uncut Tourmalines",
      priceUSD: 740,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      sub: "Jewellery"
    }
  }
];

export const OCCASIONS_LIST = [
  "Bridal Collection",
  "Wedding Wear",
  "Festive Collection",
  "Party Wear",
  "Office Wear",
  "Casual Wear",
  "Traditional Wear",
  "Seasonal Collections"
];

export const COLOR_PALETTES = [
  { name: "Deep Burgundy", hex: "#6D1F32" },
  { name: "Muted Gold", hex: "#B99A5B" },
  { name: "Obsidian Black", hex: "#292626" },
  { name: "Warm Ivory", hex: "#F7F1E7" },
  { name: "Emerald Jade", hex: "#1E5638" },
  { name: "Ruby Red", hex: "#9B111E" },
  { name: "Royal Navy", hex: "#1B263B" },
  { name: "Blush Rose", hex: "#C98986" }
];

export const PRODUCTS = [
  // ==========================================
  // 1. WOMEN'S WEAR
  // ==========================================
  {
    id: "thugil-w-01",
    name: "The Rajkumari Heirloom Kanjivaram",
    subtitle: "Pure Mulberry Silk with Muted Gold Korvai Zari Border",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Kanjivaram Silk",
    subcategory: "Sarees",
    occasions: ["Wedding Wear", "Traditional Wear", "Bridal Collection"],
    priceUSD: 1280,
    originalPriceUSD: 1450,
    rating: 4.98,
    reviewsCount: 64,
    image: "/images/kanjivaram-saree.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Masterpiece",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    sizes: ["Standard Drape (6.3m)", "Custom Blouse Sizing"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Certified Mulberry Raw Silk (3-Ply)",
      zari: "Authentic Silver-Dipped Muted Gold Thread",
      weaveTime: "196 hours on Traditional Pit Loom",
      origin: "Kanchipuram, Tamil Nadu",
      drapeLength: "6.3 Meters (Including Blouse Piece)",
      washCare: "Strictly Dry Clean Only with Muslin Wrap Storage"
    },
    description:
      "Crafted for the woman who commands heritage with grace. The Rajkumari drape is born from pure handloom techniques dating back eight centuries. The rich Deep Burgundy body shimmers with interwoven muted gold micro-buttas, framed by an architectural temple border.",
    highlights: [
      "Certified Silk Mark India Authenticity Tag",
      "Korvai interlocking technique weaving body and border seamlessly",
      "Complimentary matching pure silk unstitched blouse piece",
      "Hand-packaged in Thugil signature charcoal velvet preservation box"
    ]
  },
  {
    id: "thugil-w-02",
    name: "The Imperial Kadhwa Banarasi Brocade",
    subtitle: "Heritage Handloom Katan Silk with All-Over Antique Gold Jaal",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Banarasi Brocade",
    subcategory: "Sarees",
    occasions: ["Festive Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 1620,
    originalPriceUSD: 1850,
    rating: 4.99,
    reviewsCount: 73,
    image: "/images/banarasi-brocade.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Heirloom Edition",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 2,
    sizes: ["Standard Drape (6.4m)", "Custom Blouse Tailored"],
    colors: [
      { name: "Deep Burgundy Katan", hex: "#6D1F32" },
      { name: "Antique Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Pure Hand-Spun Katan Mulberry Silk",
      zari: "Certified Tested Muted Gold Zari Weave",
      weaveTime: "260 hours on Traditional Pit Loom",
      origin: "Varanasi (Benares), Uttar Pradesh",
      drapeLength: "6.4 Meters with Running Brocade Blouse",
      washCare: "Dry Clean Only, Store in Cotton Saree Bag"
    },
    description:
      "Each flower and vine in this Kadhwa brocade is individually hand-woven without loose threads on the reverse, an art form that only a handful of master weavers in Varanasi still command.",
    highlights: [
      "Authentic Kadhwa technique (no float threads on the reverse)",
      "Registered GI (Geographical Indication) Tag Varanasi Handloom",
      "Comes with certificate of loom origin and master weaver signature",
      "Generational heirloom designed to be passed down through decades"
    ]
  },
  {
    id: "thugil-w-03",
    name: "The Swarnarekha Luminous Tissue Drape",
    subtitle: "Warm Ivory & Champagne Tissue Silk with Burgundy Selvedge",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Tissue Organza",
    subcategory: "Sarees",
    occasions: ["Party Wear", "Festive Collection", "Seasonal Collections"],
    priceUSD: 980,
    originalPriceUSD: 1150,
    rating: 4.94,
    reviewsCount: 51,
    image: "/images/ivory-tissue-saree.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Celebrity Favorite",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 5,
    sizes: ["Standard Drape (5.8m)", "Stitched Ready-to-Wear"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Champagne Gold", hex: "#D5BA82" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Spun Organza & Mulberry Silk Tissue",
      zari: "Muted Champagne Gold Zari Weft",
      weaveTime: "140 hours on Handloom",
      origin: "Chanderi & Maheshwar Guilds",
      drapeLength: "5.8 Meters + 0.9m Contrast Blouse",
      washCare: "Dry Clean Only, Iron on Reverse Silk Setting"
    },
    description:
      "Liquid moonlight woven into an ethereal drape. The Warm Ivory silk tissue glows with an organic sheen under golden ambient light, balanced with a subtle Deep Burgundy selvedge piping.",
    highlights: [
      "Ultra-lightweight feather drape (weighs under 480 grams)",
      "High luster metallic zari thread that never tarnishes",
      "Versatile styling: pairs seamlessly with western blazers or heritage jewels",
      "Arrives with protective mulberry tissue interleaves"
    ]
  },
  {
    id: "thugil-w-04",
    name: "The Meenakari Silk Salwar Suit",
    subtitle: "Pure Chanderi Silk Kurta with Zari Trouser & Scalloped Dupatta",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Salwar Suits",
    subcategory: "Salwar Suits",
    occasions: ["Festive Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 720,
    originalPriceUSD: 850,
    rating: 4.92,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "New Arrival",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    sizes: ["XS", "S", "M", "L", "XL", "Custom Tailored"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Chanderi Silk with Pure Mulmul Cotton Lining",
      zari: "Meenakari Floral Wire Inlay",
      weaveTime: "95 hours of Artisanal Tailoring",
      origin: "Chanderi Guilds, Madhya Pradesh",
      drapeLength: "Straight Kurta with Cigarette Trousers",
      washCare: "Dry Clean Only"
    },
    description:
      "A harmonious confluence of royal grace and fluid comfort. Featuring hand-loomed Chanderi silk adorned with delicate meenakari floral motifs, tailored cigarette trousers, and an organza dupatta with scalloped borders.",
    highlights: [
      "Includes tailored cigarette pant with concealed pockets",
      "Hand-embroidered zardozi buttons along the neckline",
      "Sheer organza dupatta with gold hand-block print",
      "Breathable organic cotton lining for all-day royal comfort"
    ]
  },
  {
    id: "thugil-w-05",
    name: "The Noor Chanderi Embroidered Kurti",
    subtitle: "Tilla Hand-Embroidered High-Slit A-Line Silk Kurti",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Kurtis",
    subcategory: "Kurtis",
    occasions: ["Office Wear", "Casual Wear", "Festive Collection"],
    priceUSD: 440,
    originalPriceUSD: 520,
    rating: 4.88,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Everyday Royalty",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Hand-Woven Chanderi Silk",
      zari: "Kashmiri Tilla Micro-Embroidery",
      weaveTime: "60 hours on Handloom",
      origin: "Kashmir & Chanderi Artisans",
      drapeLength: "Calf Length (46 inches)",
      washCare: "Gentle Dry Clean Only"
    },
    description:
      "Crafted for modern aristocrats who value subtlety. The Noor Kurti showcases fine Kashmiri tilla wire embroidery adorning the keyhole neckline and bell cuffs, cut in an effortless A-line contour.",
    highlights: [
      "Lightweight silk that flows effortlessly from day to evening",
      "Detailed keyhole collar with filigree gold tassel tie",
      "Pairs seamlessly with silk trousers, palazzos, or denim",
      "Handcrafted in ethical fair-wage weaver cooperatives"
    ]
  },
  {
    id: "thugil-w-06",
    name: "The Noor-E-Awadh Zardozi Bridal Lehenga",
    subtitle: "Heavy Velvet 16-Kali Gher Skirt with Antique Dabka Work",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Bridal Lehengas",
    subcategory: "Lehengas",
    occasions: ["Bridal Collection", "Wedding Wear"],
    priceUSD: 2450,
    originalPriceUSD: 2800,
    rating: 4.97,
    reviewsCount: 88,
    image: "/images/bridal-lehenga.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Bespoke Bridal",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    sizes: ["Custom Made-to-Measure", "Size S", "Size M", "Size L"],
    colors: [
      { name: "Deep Burgundy Velvet", hex: "#6D1F32" },
      { name: "Antique Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy Velvet",
      accent: "#B99A5B",
      accentName: "Antique Muted Gold"
    },
    specs: {
      fabric: "Rich Silk Micro-Velvet Kalis with Tissue Organza Dupatta",
      zari: "Authentic Zardozi, Dabka, Sequins, and Pota Gold Work",
      weaveTime: "380 hours by Master Zardozi Artisans",
      origin: "THUGIL Heritage Bridal Studio",
      drapeLength: "Full 16-Kali Gher (6.2-meter circumference flare)",
      washCare: "Heirloom Bridal Cleaning & Acid-Free Packaging"
    },
    description:
      "Evoking the timeless opulence of royal palace courtyards. Features 16 hand-cut burgundy velvet kalis laden with mughal paisley arches and floral medallions rendered in antique muted gold dabka.",
    highlights: [
      "Double dupatta styling: 1 Velvet shoulder drape + 1 Ivory head veil",
      "Hidden waistband pocket for discreet bridal essentials",
      "Can-can and triple silk lining for majestic volume",
      "Complimentary virtual fitting with our Master Tailor"
    ]
  },
  {
    id: "thugil-w-07",
    name: "The Empress Pleated Haute Couture Gown",
    subtitle: "Burgundy Silk-Velvet Sculpted Bodice with Ivory Plissé Drape",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Haute Couture Gowns",
    subcategory: "Gowns",
    occasions: ["Party Wear", "Wedding Wear", "Seasonal Collections"],
    priceUSD: 1850,
    originalPriceUSD: 2100,
    rating: 5.0,
    reviewsCount: 42,
    image: "/images/couture-gown.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Runway Exclusive",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 2,
    sizes: ["Custom Atelier Fit", "US 2-4 (S)", "US 6-8 (M)", "US 10-12 (L)"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#F7F1E7",
      accentName: "Warm Ivory"
    },
    specs: {
      fabric: "Silk-Velvet Bodice with Italian Micro-Plissé Georgette Drape",
      zari: "Delicate Micro-Zari Filigree Along Asymmetrical Edge",
      weaveTime: "240 hours of Patterning, Drape Engineering & Embroidery",
      origin: "THUGIL Haute Couture Atelier",
      drapeLength: "Floor Length with 1.4m Cathedral Silk Train",
      washCare: "Specialist Luxury Couture Dry Clean Only"
    },
    description:
      "A monumental synthesis of Indian draping tradition and Parisian couture architecture. The structured Deep Burgundy velvet bodice hugs the contour with corset boning, cascading into Warm Ivory accordion pleating.",
    highlights: [
      "Custom Made-to-Measure sizing included upon request",
      "Internal corset architecture with cushioned comfort support",
      "Dramatic 1.4-meter flowing cathedral train",
      "Numbered Atelier Collector's Certificate signed by the master designer"
    ]
  },
  {
    id: "thugil-w-08",
    name: "The Anarkali-E-Khas Fluted Velvet Dress",
    subtitle: "Floor-Length Deep Burgundy Silhouette with Gold Filigree Motifs",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Bespoke Anarkalis",
    subcategory: "Anarkali Dresses",
    occasions: ["Festive Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 1420,
    originalPriceUSD: 1600,
    rating: 4.96,
    reviewsCount: 39,
    image: "/images/anarkali-dress.jpg",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Palace Couture",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 3,
    sizes: ["XS", "S", "M", "L", "XL", "Custom Tailored"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Micro Velvet with Pure Shantoon Lining",
      zari: "Tilla and Muted Gold Wire Hand-Work",
      weaveTime: "210 hours of Hand-embroidery",
      origin: "THUGIL Couture Atelier",
      drapeLength: "Floor Length Anarkali (58 inches length)",
      washCare: "Dry Clean Only"
    },
    description:
      "A celebration of classical poetry in textile form. The floor-sweeping Deep Burgundy velvet silhouette is adorned with forty-eight precision paisley panels embroidered in muted gold thread.",
    highlights: [
      "Built-in bra cups and hand-rolled concealed back zipper",
      "Includes tailored stretch-silk churidar bottoms",
      "Extravagant 5-meter flare with subtle hem weight for elegant swish",
      "Complimentary custom sleeve length adjustments"
    ]
  },
  {
    id: "thugil-w-09",
    name: "The Chandrakala Embroidered Silk Blouse",
    subtitle: "Padded Sweetheart Neckline with Intricate Aari & Zardozi Back",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Designer Blouses",
    subcategory: "Blouses",
    occasions: ["Wedding Wear", "Traditional Wear", "Bridal Collection"],
    priceUSD: 380,
    originalPriceUSD: 450,
    rating: 4.95,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Atelier Handcrafted",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 8,
    sizes: ["Bust 32", "Bust 34", "Bust 36", "Bust 38", "Bust 40", "Custom Made"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Raw Silk with Soft Cotton Lining",
      zari: "Antique Gold Aari Needlework",
      weaveTime: "48 hours by Master Tailors",
      origin: "Kanchipuram & Chennai Guilds",
      drapeLength: "Custom Tailored Crop",
      washCare: "Dry Clean Only"
    },
    description:
      "Engineered to pair impeccably with any Kanjivaram or Banarasi saree. Features an architectural sweetheart neckline, cushioned cups, and an opulent arched back adorned with handcrafted tassels.",
    highlights: [
      "Seamless padded bust architecture with zero pinch points",
      "Generous 2-inch internal seam margins for easy alteration",
      "Exquisite back keyhole framed by antique gold thread work",
      "Reinforced hook-and-eye placket for lasting royal poise"
    ]
  },
  {
    id: "thugil-w-10",
    name: "The Maharani Peplum Sharara Ensemble",
    subtitle: "Heavily Embellished Raw Silk Peplum Kurti & Flared Sharara",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Ethnic Wear",
    subcategory: "Ethnic Wear",
    occasions: ["Festive Collection", "Wedding Wear", "Party Wear"],
    priceUSD: 940,
    originalPriceUSD: 1100,
    rating: 4.91,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Heritage Edition",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 4,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Raw Silk Kurti with Georgette Kalidar Sharara",
      zari: "Gota Patti and Antique Resham Embroidery",
      weaveTime: "110 hours",
      origin: "Jaipur & Awadh Workshops",
      drapeLength: "Peplum Flare with 4.5m Sharara Flare",
      washCare: "Dry Clean Only"
    },
    description:
      "A tribute to the opulent courts of Rajasthan. The tailored raw-silk peplum kurta is highlighted with intricate gota patti embroidery, cascading over a pleated sharara pant that shimmers with movement.",
    highlights: [
      "Three-piece set: Kurti, pleated sharara, and organza dupatta",
      "Flattering fitted bodice transitioning into a fluid flare",
      "Gold lurex border detailing throughout the hemline",
      "Concealed side zipper with delicate hand-knotted tassels"
    ]
  },
  {
    id: "thugil-w-11",
    name: "The Velvet Smoking Tuxedo Blazer",
    subtitle: "Tailored Burgundy Velvet Blazer with Satin Shawl Lapels",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Western Wear",
    subcategory: "Western Wear",
    occasions: ["Office Wear", "Party Wear", "Seasonal Collections"],
    priceUSD: 780,
    originalPriceUSD: 920,
    rating: 4.93,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Power Couture",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 5,
    sizes: ["US 2", "US 4", "US 6", "US 8", "US 10", "US 12"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#292626",
      accentName: "Charcoal Black"
    },
    specs: {
      fabric: "Italian Cotton-Silk Velvet with Pure Silk Satin Lapel",
      zari: "Tonal Gold Hand-Stitched Pick Lapel Detailing",
      weaveTime: "75 hours of Bespoke Tailoring",
      origin: "THUGIL Western Atelier",
      drapeLength: "Structured Hip Length with Double Slits",
      washCare: "Professional Dry Clean Only"
    },
    description:
      "Effortless authority meets decadent texture. Tailored from heavyweight cotton-silk velvet in Thugil's signature deep burgundy, framed with lustrous black satin shawl lapels and engraved gold shank buttons.",
    highlights: [
      "Full internal canvas construction for pristine structure",
      "Signature Thugil royal monogram jacquard lining",
      "Interior passport and lipstick pocket for evening galas",
      "Pairs impeccably with tailored trousers or silk sarees"
    ]
  },
  {
    id: "thugil-w-12",
    name: "The Zari Filigree Peplum Silk Top",
    subtitle: "Pure Mulberry Tussar Silk with Muted Gold Cord Embroidery",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Tops",
    subcategory: "Tops",
    occasions: ["Party Wear", "Casual Wear", "Office Wear"],
    priceUSD: 340,
    originalPriceUSD: 400,
    rating: 4.87,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Versatile Luxury",
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 7,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Hand-Spun Tussar Mulberry Silk",
      zari: "Fine Corded Gold Wire Embroidery",
      weaveTime: "40 hours",
      origin: "Bhagalpur Silk Guilds",
      drapeLength: "Waist Length Peplum",
      washCare: "Gentle Hand Wash or Dry Clean"
    },
    description:
      "A versatile silhouette featuring rich hand-loomed Tussar silk. Detailed with delicate geometric gold zari cords across the yoke and a gently fluted peplum hem.",
    highlights: [
      "Lightweight, breathable natural tussar silk texture",
      "Concealed back zip closure with mother-of-pearl buttons",
      "Effortlessly dresses up tailored denim or silk skirts",
      "Eco-dyed with non-toxic botanical color baths"
    ]
  },
  {
    id: "thugil-w-13",
    name: "The Aristocrat Pure Mulberry Silk Shirt",
    subtitle: "Concealed Placket Tailored Shirt with French Double Cuffs",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Shirts",
    subcategory: "Shirts",
    occasions: ["Office Wear", "Casual Wear", "Seasonal Collections"],
    priceUSD: 390,
    originalPriceUSD: 460,
    rating: 4.93,
    reviewsCount: 47,
    image: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Executive Silk",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "22 Momme Sandwashed Mulberry Silk",
      zari: "Gold-Plated Cufflinks Included",
      weaveTime: "35 hours",
      origin: "THUGIL Sartorial Studio",
      drapeLength: "Classic Curved Shirttail Hem",
      washCare: "Hand Wash Cold or Professional Dry Clean"
    },
    description:
      "The pinnacle of boardroom and evening luxury. 22 Momme sandwashed mulberry silk glides across the skin with zero sheer, framed with crisp French cuffs and a clean concealed placket.",
    highlights: [
      "Pure sandwashed silk with matte peachskin finish",
      "Includes complimentary pair of engraved gold Thugil cufflinks",
      "Reinforced pointed collar that maintains crisp definition",
      "Hand-sewn mother-of-pearl buttons"
    ]
  },
  {
    id: "thugil-w-14",
    name: "The Royal Indigo Tailored Denim",
    subtitle: "High-Rise Selvedge Denim with Gold Stitching & Silk Lining",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Jeans",
    subcategory: "Jeans",
    occasions: ["Casual Wear", "Office Wear"],
    priceUSD: 280,
    originalPriceUSD: 330,
    rating: 4.89,
    reviewsCount: 36,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Artisanal Denim",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 8,
    sizes: ["26", "27", "28", "29", "30", "31", "32"],
    colors: [
      { name: "Royal Indigo", hex: "#1B263B" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#1B263B",
      primaryName: "Royal Indigo",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "13.5 oz Shuttle-Loomed Organic Cotton Selvedge",
      zari: "Pure Gold-Plated Rivets & Shank Button",
      weaveTime: "40 hours",
      origin: "Kuroki Mills & Thugil Atelier",
      drapeLength: "High Rise Wide Leg",
      washCare: "Wash Inside Out in Cold Water"
    },
    description:
      "Where Japanese selvedge denim craftsmanship meets Indian royal accents. Features a structured high-rise wide-leg cut with burgundy silk pocket bags and metallic gold thread selvedge ID.",
    highlights: [
      "Custom woven gold selvedge ticking along the outer seam",
      "Signature Deep Burgundy silk pocket linings",
      "Hand-carved gold Thugil emblem back patch",
      "Flattering contoured waistband prevents gaping"
    ]
  },
  {
    id: "thugil-w-15",
    name: "The Pleated Silk-Blend Flared Trousers",
    subtitle: "High-Waisted Double Pleated Trousers with Velvet Side Stripe",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Trousers",
    subcategory: "Trousers",
    occasions: ["Office Wear", "Party Wear", "Festive Collection"],
    priceUSD: 420,
    originalPriceUSD: 490,
    rating: 4.91,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Sartorial Grace",
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 5,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#6D1F32",
      accentName: "Deep Burgundy"
    },
    specs: {
      fabric: "Raw Silk & Fine Merino Wool Blend",
      zari: "Micro Gold Thread Pick Stitching",
      weaveTime: "50 hours",
      origin: "THUGIL Sartorial Studio",
      drapeLength: "Full Length Wide Leg Flare",
      washCare: "Dry Clean Only"
    },
    description:
      "Dramatically proportioned trousers cut with generous double pleats that billow with architectural poise. Accented with a slender burgundy velvet tuxedo stripe along the outer seams.",
    highlights: [
      "Extravagant wide-leg silhouette that elongates the frame",
      "Deep side slant pockets and piped back welt pockets",
      "Internal curtain waistband construction prevents rolling",
      "Pairs effortlessly with blouses, kurtis, or tailored jackets"
    ]
  },
  {
    id: "thugil-w-16",
    name: "The Brocade Tiered Maxi Skirt",
    subtitle: "Banarasi Floral Kadhwa Weave with 4-Meter Gher Flare",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Skirts",
    subcategory: "Skirts",
    occasions: ["Festive Collection", "Party Wear", "Wedding Wear"],
    priceUSD: 680,
    originalPriceUSD: 790,
    rating: 4.94,
    reviewsCount: 35,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Heritage Swirl",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 4,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Banarasi Silk Brocade with Taffeta Silk Lining",
      zari: "Antique Gold Weft Jaal",
      weaveTime: "120 hours on Loom",
      origin: "Varanasi Master Guilds",
      drapeLength: "Floor Length Maxi (42 inches)",
      washCare: "Dry Clean Only"
    },
    description:
      "A grand statement skirt featuring authentic Banarasi brocade kalis. Designed with a wide structured waistband and delicate gold latkans that swing with every regal step.",
    highlights: [
      "Over 4 meters of majestic circular flare",
      "Reinforced cotton hem tape prevents fabric scuffing",
      "Deep hidden side pocket for modern convenience",
      "Stunning paired with crisp white shirts or zardozi blouses"
    ]
  },
  {
    id: "thugil-w-17",
    name: "The Velvet Royal Monogram Co-ord Set",
    subtitle: "Burgundy Velvet Draped Crop Top & Pleated Palazzos",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Co-ord Sets",
    subcategory: "Co-ord Sets",
    occasions: ["Party Wear", "Festive Collection", "Seasonal Collections"],
    priceUSD: 820,
    originalPriceUSD: 950,
    rating: 4.96,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Contemporary Royal",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 3,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Micro Silk-Velvet with Stretch Satin Lining",
      zari: "Embroidered Monogram Crest on Pocket",
      weaveTime: "85 hours",
      origin: "THUGIL Couture Atelier",
      drapeLength: "Crop Top & High-Rise Palazzo",
      washCare: "Specialist Luxury Dry Clean"
    },
    description:
      "The pinnacle of effortless gala glamor. Liquid velvet hugs the shoulders in an asymmetrical drape, complemented by flowing high-waisted palazzos outlined in antique gold micro-piping.",
    highlights: [
      "Two-piece coordinated set: One-shoulder top & flared palazzos",
      "Silky interior lining provides feather-soft comfort",
      "Flattering high-rise waist with covered elastic back",
      "Hand-finished French seams throughout"
    ]
  },
  {
    id: "thugil-w-18",
    name: "The Burgundy Draped Cape Jumpsuit",
    subtitle: "Crepe Silk One-Piece with Embroidered Zardozi Shoulder Cape",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Jumpsuits",
    subcategory: "Jumpsuits",
    occasions: ["Party Wear", "Wedding Wear", "Seasonal Collections"],
    priceUSD: 890,
    originalPriceUSD: 1050,
    rating: 4.95,
    reviewsCount: 30,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Runway Hit",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 3,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Heavyweight Silk Crepe with Organza Cape",
      zari: "Antique Dabka Work Along Cape Border",
      weaveTime: "90 hours",
      origin: "THUGIL Haute Couture Atelier",
      drapeLength: "Floor Length Straight Leg",
      washCare: "Dry Clean Only"
    },
    description:
      "A head-turning modern classic. Tailored from fluid silk crepe with a cinched gold-embroidered waistband and an attached sheer organza cape that drapes dramatically over one shoulder.",
    highlights: [
      "Dramatic floor-length sheer cape attached at the shoulder",
      "Concealed center back zipper with hook-and-eye closure",
      "Includes detachable hand-embroidered zardozi belt",
      "Tailored straight leg silhouette with sharp center crease"
    ]
  },
  {
    id: "thugil-w-19",
    name: "The Mulberry Silk Robe & Chemise Set",
    subtitle: "22 Momme Raw Mulberry Silk with Chantilly Lace Trim",
    department: "Women’s Wear",
    departmentId: "womens-wear",
    category: "Nightwear",
    subcategory: "Nightwear",
    occasions: ["Bridal Collection", "Casual Wear", "Seasonal Collections"],
    priceUSD: 460,
    originalPriceUSD: 540,
    rating: 4.97,
    reviewsCount: 58,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Bridal Trousseau",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Grade 6A Mulberry Silk (22 Momme)",
      zari: "Muted Gold Monogram Embroidery on Chest",
      weaveTime: "40 hours",
      origin: "THUGIL Intimate Atelier",
      drapeLength: "Kimono Robe (48 inches) & Midi Chemise",
      washCare: "Hand Wash Cold with Silk Detergent"
    },
    description:
      "The definitive bridal trousseau keepsake. Woven from Grade 6A pure mulberry silk with natural temperature-regulating qualities, edged in French Chantilly lace and tied with a wide sash.",
    highlights: [
      "Includes floor-length wrap robe and bias-cut slip chemise",
      "Naturally hypoallergenic, hydrating, and frictionless on skin",
      "French Chantilly lace detailing across sleeves and hemline",
      "Delivered in fragrant sandalwood cedarwood gift case"
    ]
  },

  // ==========================================
  // 2. MEN'S WEAR
  // ==========================================
  {
    id: "thugil-m-01",
    name: "The Nawabi Raw Silk Kurta & Churidar Set",
    subtitle: "Ivory Spun Matka Silk Kurta with Antique Zari Nehru Jacket",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Kurta Sets",
    subcategory: "Kurta Sets",
    occasions: ["Wedding Wear", "Festive Collection", "Traditional Wear"],
    priceUSD: 890,
    originalPriceUSD: 1050,
    rating: 4.98,
    reviewsCount: 62,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Masterpiece",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "Custom Made"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#6D1F32",
      accentName: "Deep Burgundy"
    },
    specs: {
      fabric: "100% Hand-Spun Matka Raw Silk Kurta & Churidar",
      zari: "Authentic Zari Weft Brocade Nehru Waistcoat",
      weaveTime: "115 hours by Master Tailors",
      origin: "Varanasi & Lucknow Guilds",
      drapeLength: "Knee Length Kurta with Slim Churidar Bottoms",
      washCare: "Strictly Dry Clean Only"
    },
    description:
      "Exemplifying regal poise for royal nuptials and evening galas. The hand-spun ivory matka silk kurta is paired with matching churidars and crowned by a deep burgundy brocade Nehru vest.",
    highlights: [
      "Three-piece ensemble: Silk Kurta, Churidar, and Brocade Waistcoat",
      "Handcrafted mother-of-pearl buttons with gold metal shanks",
      "Pure cotton voile lining ensuring cool, breathable comfort",
      "Includes monogrammed velvet suit hanger and dust bag"
    ]
  },
  {
    id: "thugil-m-02",
    name: "The Mayilkannu Pure Gold Zari Veshti & Dhoti",
    subtitle: "Traditional Handloom Silk Veshti with 4-Inch Solid Gold Zari Border",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Veshti & Dhoti",
    subcategory: "Veshti & Dhoti",
    occasions: ["Wedding Wear", "Traditional Wear", "Festive Collection"],
    priceUSD: 620,
    originalPriceUSD: 720,
    rating: 4.99,
    reviewsCount: 77,
    image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Sacred Heritage",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 5,
    sizes: ["8 Muzham (4.0m) + Angavastram (2.0m)", "4 Muzham Dhoti (Single)"],
    colors: [
      { name: "Warm Cream Silk", hex: "#F7F1E7" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Cream",
      accent: "#B99A5B",
      accentName: "Pure Gold Zari"
    },
    specs: {
      fabric: "100% Certified Mulberry Raw Silk (Kanchipuram Loom)",
      zari: "Tested Silver-Dipped 24K Gold Zari Border",
      weaveTime: "140 hours on Traditional Pit Loom",
      origin: "Kanchipuram, Tamil Nadu",
      drapeLength: "8 Muzham (4 Meters) + 2 Meter Angavastram",
      washCare: "Dry Clean Only, Store in Soft Muslin"
    },
    description:
      "The definitive groom’s drape in South Indian tradition. Hand-woven on pit looms in Kanchipuram, featuring the ancient 'Mayilkannu' (Peacock's Eye) geometric zari border in certified tested gold thread.",
    highlights: [
      "Certified Silk Mark tag and Gold Purity assay certificate",
      "Authentic Korvai interlocking border that will never fray",
      "Complete with matching 2-meter folded angavastram shawl",
      "Hand-packaged in a handcrafted brass-accented wood box"
    ]
  },
  {
    id: "thugil-m-03",
    name: "The Royal Jodhpuri Achkan Bandhgala",
    subtitle: "Deep Burgundy Wool-Silk Structured Suit with Gold Lion Buttons",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Ethnic Wear",
    subcategory: "Ethnic Wear",
    occasions: ["Wedding Wear", "Party Wear", "Bridal Collection"],
    priceUSD: 1450,
    originalPriceUSD: 1700,
    rating: 4.97,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Bespoke Royal",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    sizes: ["38R", "40R", "42R", "44R", "Custom Tailored"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Super 140s Wool & Mulberry Silk Blend",
      zari: "Hand-Cast Brass Gold Lion Crest Buttons",
      weaveTime: "160 hours of Bespoke Master Cutting",
      origin: "THUGIL Men's Sartorial Atelier",
      drapeLength: "Structured Hip Length with Tailored Trousers",
      washCare: "Specialist Luxury Dry Clean Only"
    },
    description:
      "Commanding presence rooted in Rajput sartorial tradition. Tailored from a luxurious blend of Super 140s wool and mulberry silk with full floating horsehair canvas for supreme chest contour.",
    highlights: [
      "Full canvas construction conforms to your physique with wear",
      "14K gold-plated custom lion crest buttons",
      "Includes tailored flat-front silk-wool dress trousers",
      "Hand-finished Milanese lapel buttonhole on collar"
    ]
  },
  {
    id: "thugil-m-04",
    name: "The Burgundy Velvet Tuxedo Dinner Blazer",
    subtitle: "Scabal Silk Velvet with Charcoal Satin Lapel & Gold Piping",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Blazers",
    subcategory: "Blazers",
    occasions: ["Party Wear", "Wedding Wear", "Seasonal Collections"],
    priceUSD: 1150,
    originalPriceUSD: 1350,
    rating: 4.95,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Gala Exclusive",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 4,
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    colors: [
      { name: "Deep Burgundy Velvet", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Italian Cotton-Silk Plush Velvet",
      zari: "Muted Gold Thread Edge Inset",
      weaveTime: "95 hours of Sartorial Tailoring",
      origin: "THUGIL Men's Bespoke Studio",
      drapeLength: "Single-Breasted One-Button Dinner Cut",
      washCare: "Specialist Dry Clean Only"
    },
    description:
      "Designed for prestigious galas and opera nights. The plush deep burgundy velvet catches the light with subtle depth, balanced by a sharp silk-satin peak lapel trimmed in hairline gold piping.",
    highlights: [
      "Silk satin-covered buttons and welt ticket pockets",
      "Double vents for natural ease while seated",
      "Four functional kissing sleeve buttons with gold thread",
      "Lined in burgundy jacquard silk with Thugil crest"
    ]
  },
  {
    id: "thugil-m-05",
    name: "The Imperial Linen-Silk Bandhgala Shirt",
    subtitle: "Mandarin Collar Shirt with Hidden Placket & Zari Cuffs",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Shirts",
    subcategory: "Shirts",
    occasions: ["Office Wear", "Casual Wear", "Festive Collection"],
    priceUSD: 360,
    originalPriceUSD: 420,
    rating: 4.92,
    reviewsCount: 49,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Gentleman's Choice",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 7,
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Charcoal Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "60% Handloom Linen & 40% Mulberry Silk",
      zari: "Subtle Gold Thread Cuff Inlay",
      weaveTime: "30 hours",
      origin: "Bhagalpur & Coimbatore Artisans",
      drapeLength: "Tailored Tunic Fit",
      washCare: "Hand Wash Cold or Dry Clean"
    },
    description:
      "A versatile shirt engineered for warm climates and formal evenings alike. Blending cool breathable handloom linen with the fluid luster of pure silk, finished with a structured mandarin collar.",
    highlights: [
      "Concealed placket with genuine Australian mother-of-pearl buttons",
      "Micro-zari detailing across the inner collar and cuffs",
      "Breathable weave naturally resists wrinkling",
      "Looks equally sharp tucked in or worn untucked over trousers"
    ]
  },
  {
    id: "thugil-m-06",
    name: "The Royal Crest Supima Cotton T-Shirt",
    subtitle: "260 GSM Extra-Long Staple Cotton with Embroidered Gold Crest",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "T-Shirts",
    subcategory: "T-Shirts",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 160,
    originalPriceUSD: 195,
    rating: 4.88,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Core Classic",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 12,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Charcoal Black", hex: "#292626" },
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#292626",
      primaryName: "Charcoal Black",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Certified Supima Extra-Long Staple Cotton (260 GSM)",
      zari: "High-Density Muted Gold Chest Crest Embroidery",
      weaveTime: "Circular Knit Hand-Finished",
      origin: "Coimbatore Textile Guild",
      drapeLength: "Tailored Athletic Cut",
      washCare: "Machine Wash Cold, Hang Dry"
    },
    description:
      "The definitive luxury crewneck. Spun from double-combed Supima cotton that maintains silky softness and vibrant deep dye across hundreds of washes, stamped with Thugil's miniature golden crest.",
    highlights: [
      "Ultra-soft 260 GSM fabric with substantial luxury drape",
      "Reinforced rib-knit collar that never sags or stretches",
      "Pre-shrunk organic cotton with silk-like hand feel",
      "Crafted with zero plastic packaging in our Coimbatore atelier"
    ]
  },
  {
    id: "thugil-m-07",
    name: "The Tailored Ivory Silk-Wool Trousers",
    subtitle: "Double-Pleated Gurkha Waistband Trousers with Side Adjusters",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Trousers",
    subcategory: "Trousers",
    occasions: ["Formal Wear", "Office Wear", "Wedding Wear"],
    priceUSD: 480,
    originalPriceUSD: 560,
    rating: 4.93,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Sartorial Cut",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 5,
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Charcoal Grey", hex: "#3D3939" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "65% Tropical Merino Wool & 35% Mulberry Raw Silk",
      zari: "Antique Brass Side Buckles",
      weaveTime: "55 hours",
      origin: "THUGIL Men's Bespoke Studio",
      drapeLength: "Straight Taper with 2-Inch Turn-Up Cuff",
      washCare: "Professional Dry Clean Only"
    },
    description:
      "A masterclass in classic tailoring. Features an extended Gurkha waistband with solid brass side adjusters, double inward pleats, and a relaxed taper that drapes cleanly over formal shoes or mojari.",
    highlights: [
      "Self-adjusting Gurkha waistband eliminates need for belts",
      "Silk curtain lining along interior waist prevents shirt untucking",
      "Reinforced crotch saddle for enhanced longevity",
      "Unfinished hem with complimentary bespoke tailor length service"
    ]
  },
  {
    id: "thugil-m-08",
    name: "The Obsidian Selvedge Denim Trouser",
    subtitle: "14 oz Kuroki Mill Raw Black Denim with Gold Zari Selvedge Line",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Jeans",
    subcategory: "Jeans",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 310,
    originalPriceUSD: 360,
    rating: 4.90,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Selvedge Heavy",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 7,
    sizes: ["30x32", "32x32", "34x32", "36x32", "38x32"],
    colors: [
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#292626",
      primaryName: "Obsidian Black",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "14 oz Vintage Shuttle Loomed Selvedge Denim",
      zari: "Custom Gold Lurex ID Selvedge Seam",
      weaveTime: "45 hours",
      origin: "Okayama & Thugil Atelier",
      drapeLength: "Classic Straight Leg",
      washCare: "Cold Soak Only, Do Not Machine Dry"
    },
    description:
      "Crafted on vintage 1950s shuttle looms using rope-dyed sulfur black cotton yarns. Features our custom-woven gold selvedge ID line visible when cuffed, paired with hidden burgundy rivets.",
    highlights: [
      "Custom gold metallic selvedge ticker along the outseam",
      "Hidden back pocket rivets with Thugil crest stamping",
      "Deep Burgundy heavy twill pocket bags",
      "Develops personalized fades and patina with every wear"
    ]
  },
  {
    id: "thugil-m-09",
    name: "The Embroidered Nehru Waistcoat Jacket",
    subtitle: "Raw Matka Silk Sleeveless Jacket with Hand-Cut Zari Jaal",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Jackets",
    subcategory: "Jackets",
    occasions: ["Festive Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 540,
    originalPriceUSD: 640,
    rating: 4.94,
    reviewsCount: 36,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Festive Essential",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (XXL)"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Hand-Woven Raw Silk with Pure Cotton Lining",
      zari: "Tilla and Dabka Floral Needlework",
      weaveTime: "70 hours",
      origin: "Varanasi & Lucknow Guilds",
      drapeLength: "Waistcoat Hip Length",
      washCare: "Dry Clean Only"
    },
    description:
      "Instantly transforms any linen shirt or kurta into celebratory attire. Hand-tailored in deep burgundy raw silk with micro-zari paisley embroidery, structured standing mandarin collar, and welt pockets.",
    highlights: [
      "Front chest pocket sized perfectly for silk pocket squares",
      "Concealed buttoning with engraved gold top accent button",
      "Smooth breathable lining ensures frictionless movement",
      "Pairs effortlessly with kurtas, trousers, or shirts"
    ]
  },
  {
    id: "thugil-m-10",
    name: "The Pure Mulberry Silk Men's Lounge Pyjama",
    subtitle: "22 Momme Silk Long Sleeve Lounge Shirt & Relaxed Pyjamas",
    department: "Men’s Wear",
    departmentId: "mens-wear",
    category: "Nightwear",
    subcategory: "Nightwear",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 440,
    originalPriceUSD: 510,
    rating: 4.96,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Atelier Comfort",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 5,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#F7F1E7",
      accentName: "Warm Ivory Piping"
    },
    specs: {
      fabric: "100% Certified Mulberry Silk (22 Momme)",
      zari: "Ivory Silk Contrast Piping Along Lapels & Pockets",
      weaveTime: "35 hours",
      origin: "THUGIL Sartorial Studio",
      drapeLength: "Relaxed Fit Shirt & Straight Leg Trouser",
      washCare: "Hand Wash Cold or Gentle Silk Cycle"
    },
    description:
      "The pinnacle of private luxury. Cut from weighty 22 Momme mulberry silk in rich burgundy, outlined with contrast ivory piping and tailored with an elasticated drawstring waistband.",
    highlights: [
      "Two-piece luxury sleep set: Button-front shirt & trousers",
      "Naturally thermoregulating, keeping you cool in summer & warm in winter",
      "Mother-of-pearl buttons and deep side pockets in trousers",
      "Arrives in a scented cedar presentation box with monogrammed eyemask"
    ]
  },

  // ==========================================
  // 3. KIDS' WEAR
  // ==========================================
  {
    id: "thugil-k-01",
    name: "The Swarnam Gold Zari Pattu Pavadai",
    subtitle: "Pure Kanchipuram Silk Skirt & Zardozi Embroidered Choli Top",
    department: "Kids’ Wear",
    departmentId: "kids-wear",
    category: "Pattu Pavadai",
    subcategory: "Pattu Pavadai",
    occasions: ["Festive Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 520,
    originalPriceUSD: 600,
    rating: 4.99,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Heirloom Treasure",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 5,
    sizes: ["1-2 Y", "3-4 Y", "5-6 Y", "7-8 Y", "9-10 Y", "11-12 Y"],
    colors: [
      { name: "Deep Burgundy & Gold", hex: "#6D1F32" },
      { name: "Warm Ivory & Gold", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Pure Mulberry Silk with 100% Organic Cotton Lining",
      zari: "Non-Tarnish Hypoallergenic Tested Gold Zari",
      weaveTime: "75 hours on Handloom",
      origin: "Kanchipuram Guilds",
      drapeLength: "Full Flared Pavadai Skirt with Adjustable Waistband",
      washCare: "Dry Clean Only, Store in Soft Cotton Bag"
    },
    description:
      "Handcrafted for little princesses celebrating sacred traditions. Woven from genuine Kanchipuram silk with an authentic 3-inch temple zari border, lined in ultra-soft organic cotton to protect delicate skin.",
    highlights: [
      "100% organic cotton lining ensures zero itching or irritation",
      "Generous 4-inch growth allowance at waist and hem for growing kids",
      "Hand-embroidered zardozi floral motifs on the matching choli top",
      "Certified Silk Mark tag with hypoallergenic guarantee"
    ]
  },
  {
    id: "thugil-k-02",
    name: "The Chotta Raja Brocade Sherwani Set",
    subtitle: "Varanasi Silk Brocade Sherwani with Gold Churidar & Pocket Square",
    department: "Kids’ Wear",
    departmentId: "kids-wear",
    category: "Boys’ Clothing",
    subcategory: "Boys’ Clothing",
    occasions: ["Wedding Wear", "Festive Collection", "Party Wear"],
    priceUSD: 480,
    originalPriceUSD: 560,
    rating: 4.96,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Little Prince",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    sizes: ["2-3 Y", "4-5 Y", "6-7 Y", "8-9 Y", "10-11 Y"],
    colors: [
      { name: "Warm Ivory & Gold", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Banarasi Silk Brocade with Breathable Cotton Voile Lining",
      zari: "Antique Muted Gold Floral Jaal",
      weaveTime: "60 hours",
      origin: "Varanasi & Lucknow Guilds",
      drapeLength: "Hip Length Sherwani & Elasticated Churidar",
      washCare: "Dry Clean Only"
    },
    description:
      "Crafted for young princes at family weddings and festivals. The Banarasi silk brocade jacket features miniature gold buttons and soft cotton lining, paired with elasticated dupion silk churidars.",
    highlights: [
      "Comfort-fit design with flexible armholes for active young royalty",
      "Elasticated waistband on pants for swift, fuss-free dressing",
      "Includes matching silk pocket square and gold brooch pin",
      "Soft skin-friendly inner collar lining"
    ]
  },
  {
    id: "thugil-k-03",
    name: "The Little Rani Velvet Anarkali Frock",
    subtitle: "Burgundy Velvet Yoke with Net Flared Tier & Organza Dupatta",
    department: "Kids’ Wear",
    departmentId: "kids-wear",
    category: "Frocks",
    subcategory: "Frocks",
    occasions: ["Festive Collection", "Party Wear", "Wedding Wear"],
    priceUSD: 410,
    originalPriceUSD: 480,
    rating: 4.94,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Sweet Royalty",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["1-2 Y", "3-4 Y", "5-6 Y", "7-8 Y", "9-10 Y"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "Pure Micro Velvet Bodice with Tiered Tissue Tulle Flare",
      zari: "Sequins & Micro Gold Wire Border",
      weaveTime: "50 hours",
      origin: "THUGIL Couture Atelier",
      drapeLength: "Calf Length Festive Frock",
      washCare: "Dry Clean Only"
    },
    description:
      "A twirl-worthy celebratory frock for festive evenings. A soft micro-velvet bodice is adorned with gold sequins and paired with multiple gossamer tulle tiers that float weightlessly.",
    highlights: [
      "Cotton-lined throughout to ensure supreme day-long comfort",
      "Invisible zipper at back with oversized bow tie sash",
      "Multiple tiered layers create a magical ballroom twirl effect",
      "Includes miniature matching organza dupatta"
    ]
  },
  {
    id: "thugil-k-04",
    name: "The Heirloom Pure Silk Baby Jhabla & Romper",
    subtitle: "Hand-Dyed Organic Mulberry Silk with Muted Gold Picot Edge",
    department: "Kids’ Wear",
    departmentId: "kids-wear",
    category: "Baby Clothing",
    subcategory: "Baby Clothing",
    occasions: ["Traditional Wear", "Festive Collection"],
    priceUSD: 290,
    originalPriceUSD: 340,
    rating: 4.98,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Newborn Blessing",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 8,
    sizes: ["0-3 Months", "3-6 Months", "6-12 Months"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Blush Rose", hex: "#C98986" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Organic Handloom Mulberry Silk",
      zari: "Soft Thread-Wrapped Buttons",
      weaveTime: "25 hours",
      origin: "Kanchipuram Master Weavers",
      drapeLength: "Newborn Romper Set",
      washCare: "Gentle Hand Wash in Mild Baby Soap"
    },
    description:
      "Designed for naming ceremonies, first birthdays, and temple blessings. Hand-spun organic silk that is gentle enough for newborn skin, fastened with soft cloth tie cords instead of metallic hardware.",
    highlights: [
      "Zero metal or plastic hardware to safeguard delicate infant skin",
      "Breathable, featherlight silk prevents infant heat rashes",
      "Traditional string tie closure for effortless changing",
      "Gift-packaged in a handcrafted raw silk baby keepsake pouch"
    ]
  },
  {
    id: "thugil-k-05",
    name: "The Junior Mandarin Collar Khadi Silk Shirt",
    subtitle: "Hand-Spun Khadi Silk Festive Shirt with Gold Tipped Collar",
    department: "Kids’ Wear",
    departmentId: "kids-wear",
    category: "Shirts",
    subcategory: "Shirts",
    occasions: ["Casual Wear", "Festive Collection", "Traditional Wear"],
    priceUSD: 220,
    originalPriceUSD: 260,
    rating: 4.91,
    reviewsCount: 27,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Smart Heritage",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 9,
    sizes: ["2-3 Y", "4-5 Y", "6-7 Y", "8-9 Y", "10-12 Y"],
    colors: [
      { name: "Warm Ivory", hex: "#F7F1E7" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#F7F1E7",
      primaryName: "Warm Ivory",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Hand-Spun Khadi Silk & Organic Cotton",
      zari: "Gold Metallic Piping Along Collar",
      weaveTime: "20 hours",
      origin: "Gandhigram Weavers Guild",
      drapeLength: "Smart Regular Cut",
      washCare: "Hand Wash Cold"
    },
    description:
      "A smart, breathable shirt for young gentlemen. Tailored from handloom khadi silk that stays cool in tropical sunshine, finished with a neat mandarin collar and genuine mother-of-pearl buttons.",
    highlights: [
      "Hand-spun texture with natural cooling properties",
      "Mother-of-pearl buttons and soft-fused collar that doesn't scratch",
      "Versatile styling: pairs with veshtis, jeans, or linen shorts",
      "Reinforced double stitching to endure spirited playground play"
    ]
  },

  // ==========================================
  // 4. UNISEX WEAR
  // ==========================================
  {
    id: "thugil-u-01",
    name: "The Imperial Crest Gold-Embroidered Hoodie",
    subtitle: "550 GSM Heavyweight Organic French Terry with Metallic Zari Crest",
    department: "Unisex Wear",
    departmentId: "unisex-wear",
    category: "Hoodies",
    subcategory: "Hoodies",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 360,
    originalPriceUSD: 420,
    rating: 4.97,
    reviewsCount: 71,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Iconic Drop",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    sizes: ["XS", "S", "M", "L", "XL", "XXL (Oversized)"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Obsidian Black", hex: "#292626" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "550 GSM Combed Organic Cotton Heavy French Terry",
      zari: "High-Density Japanese Gold Wire Embroidery",
      weaveTime: "45 hours per batch",
      origin: "THUGIL Streetwear Atelier",
      drapeLength: "Structured Boxy Oversized Fit",
      washCare: "Machine Wash Cold Inside-Out, Hang Dry"
    },
    description:
      "A monument of heavyweight luxury streetwear. 550 GSM French Terry provides an armor-like boxy drape, crowned by Thugil's ancestral royal crest embroidered in metallic gold zari threads.",
    highlights: [
      "Substantial 550 GSM weight with plush loopback interior",
      "Double-layered structured hood that stands upright without collapsing",
      "Heavyweight 2x2 ribbed cuffs and hem with shape retention",
      "Solid brass gold-plated aglets on custom braided drawstrings"
    ]
  },
  {
    id: "thugil-u-02",
    name: "The THUGIL Signature Heritage Monogram Tee",
    subtitle: "300 GSM Heavyweight Supima Jersey with Back Archival Typography",
    department: "Unisex Wear",
    departmentId: "unisex-wear",
    category: "T-Shirts",
    subcategory: "T-Shirts",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 180,
    originalPriceUSD: 210,
    rating: 4.92,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Signature Classic",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 11,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#292626" },
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#292626",
      primaryName: "Obsidian Black",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "300 GSM Pure Supima Long-Staple Cotton",
      zari: "Metallic Foil & Screen Printed Heritage Crest",
      weaveTime: "Hand-Crafted Batch",
      origin: "THUGIL Modern Atelier",
      drapeLength: "Relaxed Boxy Fit with Dropped Shoulders",
      washCare: "Machine Wash Cold Inside Out"
    },
    description:
      "The definitive luxury oversized tee. Tailored with dropped shoulders and a thick 1.25-inch crew collar that never ripples, decorated on the reverse with Thugil's royal seal in gold leaf foil.",
    highlights: [
      "Ultra-dense 300 GSM Supima cotton with zero transparency",
      "Oversized silhouette engineered to drape cleanly on any physique",
      "Reinforced shoulder-to-shoulder interior neck taping",
      "Gold leaf archival graphic that resists cracking over years of wear"
    ]
  },
  {
    id: "thugil-u-03",
    name: "The Royal Bengal Zari-Appliqué Sweatshirt",
    subtitle: "Brushed Fleece Crewneck with Embroidered Gold Zari Appliqué",
    department: "Unisex Wear",
    departmentId: "unisex-wear",
    category: "Sweatshirts",
    subcategory: "Sweatshirts",
    occasions: ["Casual Wear", "Seasonal Collections"],
    priceUSD: 310,
    originalPriceUSD: 370,
    rating: 4.95,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Atelier Street",
    isNewArrival: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "480 GSM Cotton-Silk Fleece with Brushed Interior",
      zari: "Authentic Zari Needlework Appliqué",
      weaveTime: "35 hours",
      origin: "THUGIL Modern Atelier",
      drapeLength: "Relaxed Raglan Crewneck",
      washCare: "Dry Clean or Gentle Machine Wash Cold"
    },
    description:
      "Where centuries-old Indian zari needlecraft meets the comfort of an oversized crewneck. Each sweatshirt is individually hand-appliquéd with an antique gold embroidered emblem on the chest.",
    highlights: [
      "Raglan shoulder construction allows fluid, unrestricted movement",
      "Ultra-soft brushed fleece interior feels like warm cashmere",
      "Durable heavy rib hem holds snug at the waist",
      "Handcrafted in limited seasonal batches of 50 pieces"
    ]
  },

  // ==========================================
  // 5. ACCESSORIES
  // ==========================================
  {
    id: "thugil-a-01",
    name: "The Royal Zardozi Velvet Potli & Minaudière Bag",
    subtitle: "Silk Micro-Velvet Evening Pouch with Pearls & Muted Gold Dabka",
    department: "Accessories",
    departmentId: "accessories",
    category: "Bags",
    subcategory: "Bags",
    occasions: ["Bridal Collection", "Wedding Wear", "Party Wear"],
    priceUSD: 340,
    originalPriceUSD: 400,
    rating: 4.98,
    reviewsCount: 82,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Best Seller",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 9,
    sizes: ["Standard Clutch (8\" x 9.5\")"],
    colors: [
      { name: "Deep Burgundy", hex: "#6D1F32" },
      { name: "Muted Gold", hex: "#B99A5B" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy Velvet",
      accent: "#B99A5B",
      accentName: "Antique Muted Gold"
    },
    specs: {
      fabric: "Micro-Velvet Shell with Satin Silk Interior",
      zari: "Authentic Dabka, Cutdana & Fresh-Water Seed Pearls",
      weaveTime: "40 hours by Master Zardozi Artisans",
      origin: "Lucknow & Delhi Atelier",
      drapeLength: "8\" Height x 9.5\" Width with Braided Silk Handle",
      washCare: "Wipe Gently with Clean Microfiber Cloth"
    },
    description:
      "The quintessential evening accessory for sarees and lehengas. Densely encrusted in antique gold dabka and seed pearls, featuring a braided wristlet cord and heavy handcrafted pearl tassels.",
    highlights: [
      "Accommodates modern large smartphones, lipstick, and essentials",
      "Interior card pocket with magnetic snap enclosure",
      "Includes detachable gold metal snake crossbody chain (48 inches)",
      "Hand-packaged in a protective velvet storage pouch"
    ]
  },
  {
    id: "thugil-a-02",
    name: "The Temple Heritage Kundan & Polki Choker Set",
    subtitle: "22K Gold-Plated Brass Choker with Uncut Tourmalines & Earrings",
    department: "Accessories",
    departmentId: "accessories",
    category: "Jewellery",
    subcategory: "Jewellery",
    occasions: ["Bridal Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 740,
    originalPriceUSD: 880,
    rating: 4.99,
    reviewsCount: 63,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Crown Jewel",
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    sizes: ["Adjustable Dori Choker + Matching Jhumka Earrings"],
    colors: [
      { name: "Antique 22K Gold", hex: "#B99A5B" },
      { name: "Ruby Red Gemstones", hex: "#9B111E" }
    ],
    colorScheme: {
      primary: "#B99A5B",
      primaryName: "Antique 22K Gold",
      accent: "#9B111E",
      accentName: "Ruby Tourmaline"
    },
    specs: {
      fabric: "22K Micron Gold Plated Pure Jeweler's Brass",
      zari: "Hand-Set Uncut Polki Glass Stones & Emerald Drops",
      weaveTime: "65 hours by Master Karigars",
      origin: "Jaipur Heritage Jewelry Guild",
      drapeLength: "Adjustable Silk Thread Dori Tie",
      washCare: "Keep Away from Perfume & Water, Store in Velvet Box"
    },
    description:
      "Reflecting the architectural magnificence of Chola and Mughal royal courts. Handcrafted by master karigars in Jaipur, featuring bezel-set uncut polki stones framed by miniature emerald drops and ruby accents.",
    highlights: [
      "Includes matching handcrafted Jhumka earrings (2.8 inches drop)",
      "Micron 22K gold electroplating guaranteed against tarnishing",
      "Hand-braided gold thread dori accommodates all neck circumferences",
      "Accompanied by Certificate of Handcrafted Authenticity"
    ]
  },
  {
    id: "thugil-a-03",
    name: "The Handcrafted Muted Gold Zari Jutti & Mojari",
    subtitle: "Supple Goat Leather Mojari with Zardozi Embroidery & Memory Foam",
    department: "Accessories",
    departmentId: "accessories",
    category: "Footwear",
    subcategory: "Footwear",
    occasions: ["Wedding Wear", "Festive Collection", "Party Wear"],
    priceUSD: 240,
    originalPriceUSD: 290,
    rating: 4.93,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Comfort Royalty",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 7,
    sizes: ["EU 36 / US 6", "EU 37 / US 7", "EU 38 / US 8", "EU 39 / US 9", "EU 40 / US 10", "EU 41 / US 11"],
    colors: [
      { name: "Muted Gold", hex: "#B99A5B" },
      { name: "Deep Burgundy", hex: "#6D1F32" }
    ],
    colorScheme: {
      primary: "#B99A5B",
      primaryName: "Muted Gold",
      accent: "#6D1F32",
      accentName: "Deep Burgundy Velvet"
    },
    specs: {
      fabric: "100% Genuine Supple Vegetable-Tanned Leather",
      zari: "Antique Dabka & Gota Wire Needlework",
      weaveTime: "30 hours per pair",
      origin: "Punjab & Rajasthan Artisans",
      drapeLength: "Flat Jutti Slip-on (0.5 inch heel)",
      washCare: "Wipe with Soft Cloth, Leather Conditioner"
    },
    description:
      "Pain-free elegance for long wedding celebrations. Hand-molded from vegetable-tanned leather lined with dual-density memory foam, ensuring you dance with grace and zero blisters.",
    highlights: [
      "Multi-layered memory foam insole guarantees all-day comfort",
      "Pinch-free heel counter softens naturally to your foot shape",
      "Hand-embroidered gold dabka thread on deep burgundy velvet",
      "Durable natural leather sole suitable for dance floors and lawns"
    ]
  },
  {
    id: "thugil-a-04",
    name: "The Pure Pashmina Kashmiri Kani Shawl",
    subtitle: "100% Changthangi Cashmere Hand-Woven with Wooden Kanis",
    department: "Accessories",
    departmentId: "accessories",
    category: "Scarves",
    subcategory: "Scarves",
    occasions: ["Traditional Wear", "Seasonal Collections", "Bridal Collection"],
    priceUSD: 1100,
    originalPriceUSD: 1300,
    rating: 5.0,
    reviewsCount: 37,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Masterpiece",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    sizes: ["Full Stole (100cm x 200cm)"],
    colors: [
      { name: "Deep Burgundy & Gold", hex: "#6D1F32" },
      { name: "Warm Ivory", hex: "#F7F1E7" }
    ],
    colorScheme: {
      primary: "#6D1F32",
      primaryName: "Deep Burgundy",
      accent: "#B99A5B",
      accentName: "Muted Gold"
    },
    specs: {
      fabric: "100% Authentic Ladakh Changthangi Pashmina (14-16 Microns)",
      zari: "Natural Mineral & Vegetable Plant Dyes",
      weaveTime: "18 months of Hand-Interlocking Weave",
      origin: "Srinagar, Kashmir (GI Tagged)",
      drapeLength: "1 Meter x 2 Meters (100cm x 200cm)",
      washCare: "Specialist Pashmina Dry Clean Only"
    },
    description:
      "A textile miracle celebrated across royal courts for centuries. Hand-woven using tiny wooden eyeless bobbins (kanis) in the Kashmir Valley. Weighs barely 280 grams yet yields warmth and cashmere softness.",
    highlights: [
      "Registered Geographical Indication (GI) Pashmina Kashmir certification",
      "Woven from high-altitude Ladakh Changthangi mountain goat fleece",
      "Featherlight weight passes seamlessly through a signet finger ring",
      "Generational investment piece that increases in value over time"
    ]
  },
  {
    id: "thugil-a-05",
    name: "The Antique Gold Filigree Kamarbandh / Waist Belt",
    subtitle: "Handcrafted Temple Waist Belt with Carved Lakshmi Medallion",
    department: "Accessories",
    departmentId: "accessories",
    category: "Belts",
    subcategory: "Belts",
    occasions: ["Bridal Collection", "Wedding Wear", "Traditional Wear"],
    priceUSD: 390,
    originalPriceUSD: 460,
    rating: 4.96,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Bridal Heirloom",
    isNewArrival: true,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 5,
    sizes: ["Adjustable Waist 26\" to 40\""],
    colors: [
      { name: "Antique Muted Gold", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#B99A5B",
      primaryName: "Antique Muted Gold",
      accent: "#6D1F32",
      accentName: "Ruby Cabochon"
    },
    specs: {
      fabric: "22K Gold Antique Micro-Plated Jeweler's Copper Alloy",
      zari: "Hand-Carved Filigree Link Chains & Pearl Drops",
      weaveTime: "40 hours",
      origin: "Coimbatore & Madurai Temple Guilds",
      drapeLength: "Adjustable Link Extension Chain",
      washCare: "Store in Air-Tight Velvet Box"
    },
    description:
      "Sculpted to accentuate the waistline over Kanjivaram sarees and lehengas. Features an antique gold filigree band centered by a medallion with ruby red cabochons and swinging golden pearl ghungroos.",
    highlights: [
      "Flexible link architecture curves comfortably against the hip",
      "Extension chain fits waist sizes ranging from 26 to 40 inches",
      "Heavy gold antique micron plating prevents oxidation",
      "Adds royal structural definition to any saree or gown"
    ]
  },
  {
    id: "thugil-a-06",
    name: "The Hand-Carved Jade & Pearl Saree Brooch Pin",
    subtitle: "22K Gold-Plated Filigree Saree Pin with Natural Baroque Pearl",
    department: "Accessories",
    departmentId: "accessories",
    category: "Fashion Accessories",
    subcategory: "Fashion Accessories",
    occasions: ["Wedding Wear", "Party Wear", "Office Wear"],
    priceUSD: 160,
    originalPriceUSD: 190,
    rating: 4.94,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    craftImage: "/images/fabric-craftsmanship.jpg",
    badge: "Atelier Signature",
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 14,
    sizes: ["One Size (3.2\" length)"],
    colors: [
      { name: "Muted Gold & Pearl", hex: "#B99A5B" }
    ],
    colorScheme: {
      primary: "#B99A5B",
      primaryName: "Muted Gold",
      accent: "#F7F1E7",
      accentName: "Natural Pearl"
    },
    specs: {
      fabric: "22K Gold Plated Brass with Natural Freshwater Pearl",
      zari: "Micro Pave Cubic Zirconia Accents",
      weaveTime: "15 hours",
      origin: "Hyderabad Pearl Workshops",
      drapeLength: "3.2 Inches Length",
      washCare: "Wipe with Soft Cloth"
    },
    description:
      "An essential talisman for securing heavy pallus and dupattas without snagging pure silk threads. Features a safety locking pin and a lustrous natural baroque freshwater pearl.",
    highlights: [
      "Sharp ultra-fine pin shaft glides between silk threads without pulling",
      "Safety locking swivel clasp prevents accidental openings",
      "Natural freshwater baroque pearl gives each piece unique distinction",
      "Arrives in signature gold-stamped burgundy drawer box"
    ]
  }
];

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1, label: "USD ($)" },
  INR: { symbol: "₹", rate: 86.5, label: "INR (₹)" },
  GBP: { symbol: "£", rate: 0.78, label: "GBP (£)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  AED: { symbol: "د.إ", rate: 3.67, label: "AED (د.إ)" }
};

export const REVIEWS = [
  {
    id: "rev-1",
    author: "Maharani Gayatri D.",
    location: "London & New Delhi",
    date: "2 weeks ago",
    rating: 5,
    verified: true,
    title: "A masterwork that brought tears to my eyes",
    text: "The Rajkumari Heirloom Kanjivaram saree arrived in the velvet presentation box smelling subtly of royal sandalwood. The deep burgundy silk is weightier and richer than anything I have seen from top design houses in London or Milan. The muted gold zari shines like antique heritage jewelry.",
    productName: "The Rajkumari Heirloom Kanjivaram"
  },
  {
    id: "rev-2",
    author: "Vikramaditya Singhania",
    location: "Mumbai, India",
    date: "3 weeks ago",
    rating: 5,
    verified: true,
    title: "The Nawabi Raw Silk Kurta is sovereign perfection",
    text: "I wore the Nawabi Raw Silk Kurta Set and Mayilkannu Veshti for my sister's palace wedding in Udaipur. The hand-loomed texture, the weight of the zari, and the custom fit received compliments from every dignitary present. Thugil understands real royalty.",
    productName: "The Nawabi Raw Silk Kurta & Churidar Set"
  },
  {
    id: "rev-3",
    author: "Elena Rostova",
    location: "Paris, France",
    date: "1 month ago",
    rating: 5,
    verified: true,
    title: "Wore this to the Opera Gala — pure showstopper",
    text: "The Empress Pleated Haute Couture Gown is pure architectural poetry. The combination of Deep Burgundy velvet with the Warm Ivory accordion pleating created a silhouette that made people stop and gasp. The craftsmanship is flawless.",
    productName: "The Empress Pleated Haute Couture Gown"
  },
  {
    id: "rev-4",
    author: "Dr. Ananya Sundaram",
    location: "San Francisco, USA",
    date: "3 weeks ago",
    rating: 5,
    verified: true,
    title: "True heirloom quality for my daughter's wedding",
    text: "Finding genuine Kadhwa weave Banarasi brocade and Swarnam kids pattu pavadai online is nearly impossible, but Thugil delivered beyond expectations. The silk mark certification, the absence of cut threads on the reverse, and the exquisite drape make this a treasure.",
    productName: "The Imperial Kadhwa Banarasi Brocade"
  }
];
