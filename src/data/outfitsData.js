// ==========================================================================
// THUGIL - OUTFITS Mega-Menu & Drawer Category Architecture
// Organized into 6 Royal Groups matching THUGIL's luxury department hierarchy
// ==========================================================================

export const OUTFITS_GROUPS = [
  {
    id: "womens-wear",
    deptId: "womens-wear",
    title: "WOMEN'S WEAR",
    tagline: "Imperial Drapes & Silks",
    categories: [
      { name: "Sarees", sub: "Sarees" },
      { name: "Salwar Suits", sub: "Salwar Suits" },
      { name: "Kurtis", sub: "Kurtis" },
      { name: "Lehengas", sub: "Lehengas" },
      { name: "Gowns", sub: "Gowns" },
      { name: "Blouses", sub: "Blouses" },
      { name: "Western Dresses", sub: "Western Dresses" },
      { name: "Tops", sub: "Tops" },
      { name: "Jeans", sub: "Jeans" },
      { name: "Co-ord Sets", sub: "Co-ord Sets" },
      { name: "Bridal Wear", sub: "Bridal Wear", occ: "Bridal Collection" },
      { name: "Party Wear", sub: "Party Wear", occ: "Party Wear" }
    ]
  },
  {
    id: "mens-wear",
    deptId: "mens-wear",
    title: "MEN'S WEAR",
    tagline: "Sovereign Tailoring",
    categories: [
      { name: "Shirts", sub: "Shirts" },
      { name: "T-Shirts", sub: "T-Shirts" },
      { name: "Trousers", sub: "Trousers" },
      { name: "Jeans", sub: "Jeans" },
      { name: "Kurta Sets", sub: "Kurta Sets" },
      { name: "Veshti & Dhoti", sub: "Veshti & Dhoti" },
      { name: "Blazers", sub: "Blazers" },
      { name: "Suits", sub: "Suits" },
      { name: "Casual Wear", sub: "Casual Wear" },
      { name: "Formal Wear", sub: "Formal Wear", occ: "Office Wear" }
    ]
  },
  {
    id: "kids-wear",
    deptId: "kids-wear",
    title: "KIDS' WEAR",
    tagline: "Heirloom Youth Attire",
    categories: [
      { name: "Boys' Clothing", sub: "Boys’ Clothing" },
      { name: "Girls' Clothing", sub: "Girls’ Clothing" },
      { name: "Baby Clothing", sub: "Baby Clothing" },
      { name: "Pattu Pavadai", sub: "Pattu Pavadai" },
      { name: "Frocks", sub: "Frocks" },
      { name: "Ethnic Wear", sub: "Ethnic Wear" },
      { name: "Party Wear", sub: "Party Wear", occ: "Party Wear" }
    ]
  },
  {
    id: "unisex-wear",
    deptId: "unisex-wear",
    title: "UNISEX WEAR",
    tagline: "Modern Silhouettes",
    categories: [
      { name: "T-Shirts", sub: "T-Shirts" },
      { name: "Hoodies", sub: "Hoodies" },
      { name: "Sweatshirts", sub: "Sweatshirts" },
      { name: "Casual Wear", sub: "Casual Wear" }
    ]
  },
  {
    id: "occasion-collections",
    deptId: "occasion-collections",
    title: "OCCASION COLLECTIONS",
    tagline: "Sacred Milestones",
    categories: [
      { name: "Bridal Collection", sub: "Bridal Collection", occ: "Bridal Collection" },
      { name: "Wedding Wear", sub: "Wedding Wear", occ: "Wedding Wear" },
      { name: "Festive Wear", sub: "Festive Wear", occ: "Festive Collection" },
      { name: "Party Wear", sub: "Party Wear", occ: "Party Wear" },
      { name: "Office Wear", sub: "Office Wear", occ: "Office Wear" }
    ]
  },
  {
    id: "accessories",
    deptId: "accessories",
    title: "ACCESSORIES",
    tagline: "Handcrafted Adornments",
    categories: [
      { name: "Bags", sub: "Bags" },
      { name: "Footwear", sub: "Footwear" },
      { name: "Jewellery", sub: "Jewellery" },
      { name: "Belts", sub: "Belts" },
      { name: "Scarves", sub: "Scarves" }
    ]
  }
];
