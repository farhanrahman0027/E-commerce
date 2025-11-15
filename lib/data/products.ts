export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number; // For sale items
  description: string;
  category: string;
  image: string;
  images?: string[]; // Multiple product images
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  inStock: boolean;
  onSale: boolean;
  featured: boolean;
  brand?: string;
  tags?: string[];
  specifications?: { [key: string]: string };
  discount?: number; // Percentage discount
}

export const products: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    originalPrice: 139.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials, and more. Durable material with adjustable straps.",
    category: "men's clothing",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    rating: {
      rate: 3.9,
      count: 120
    },
    stock: 45,
    inStock: true,
    onSale: true,
    featured: true,
    brand: "Fjallraven",
    tags: ["backpack", "outdoor", "laptop", "travel"],
    specifications: {
      "Capacity": "16L",
      "Material": "Vinylon F",
      "Laptop Size": "Up to 15 inches",
      "Dimensions": "14.9 x 10.6 x 5.9 inches"
    },
    discount: 21
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.30,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. Perfect for casual or semi-formal occasions.",
    category: "men's clothing",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.1,
      count: 259
    },
    stock: 120,
    inStock: true,
    onSale: false,
    featured: false,
    brand: "Premium Basics",
    tags: ["t-shirt", "casual", "slim fit", "cotton"],
    specifications: {
      "Material": "95% Cotton, 5% Spandex",
      "Fit": "Slim Fit",
      "Care": "Machine Washable",
      "Origin": "USA"
    }
  },
  {
    id: 3,
    title: "Women's 3-in-1 Snowboard Jacket",
    price: 56.99,
    originalPrice: 89.99,
    description: "Note that the jacket has separate lining and shell layers that can be worn separately or together for different temperatures and conditions. Water-resistant and wind-proof design.",
    category: "women's clothing",
    image: "https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.7,
      count: 500
    },
    stock: 28,
    inStock: true,
    onSale: true,
    featured: true,
    brand: "Winter Pro",
    tags: ["jacket", "winter", "snowboard", "3-in-1"],
    specifications: {
      "Material": "Polyester Shell",
      "Waterproof": "Yes",
      "Removable Liner": "Yes",
      "Hood": "Detachable"
    },
    discount: 37
  },
  {
    id: 4,
    title: "Premium Noise-Cancelling Headphones",
    price: 159.99,
    originalPrice: 249.99,
    description: "Experience music like never before with these premium wireless headphones featuring active noise cancellation and 30 hours of battery life. Superior sound quality with deep bass.",
    category: "electronics",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.8,
      count: 421
    },
    stock: 67,
    inStock: true,
    onSale: true,
    featured: true,
    brand: "AudioMax",
    tags: ["headphones", "wireless", "noise-cancelling", "bluetooth"],
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Noise Cancellation": "Active ANC",
      "Weight": "250g"
    },
    discount: 36
  },
  {
    id: 5,
    title: "Professional DSLR Camera",
    price: 899.99,
    description: "Capture stunning photos and videos with this professional-grade DSLR camera, featuring 24.1 megapixels and 4K video recording capabilities. Perfect for enthusiasts and professionals.",
    category: "electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.6,
      count: 287
    },
    stock: 15,
    inStock: true,
    onSale: false,
    featured: true,
    brand: "CanonPro",
    tags: ["camera", "dslr", "photography", "4k"],
    specifications: {
      "Megapixels": "24.1 MP",
      "Video": "4K at 30fps",
      "ISO Range": "100-25600",
      "Sensor": "APS-C CMOS"
    }
  },
  {
    id: 6,
    title: "Elegant Women's Watch",
    price: 129.95,
    description: "A timeless accessory that complements any outfit. This elegant women's watch features a stainless steel band and water-resistant design. Perfect gift for any occasion.",
    category: "jewelry",
    image: "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.3,
      count: 178
    },
    stock: 52,
    inStock: true,
    onSale: false,
    featured: false,
    brand: "Timeless",
    tags: ["watch", "jewelry", "accessories", "women"],
    specifications: {
      "Case Material": "Stainless Steel",
      "Band Material": "Stainless Steel",
      "Water Resistance": "50m",
      "Movement": "Quartz"
    }
  },
  {
    id: 7,
    title: "Wireless Bluetooth Speaker",
    price: 89.99,
    originalPrice: 119.99,
    description: "Fill any room with immersive sound from this portable Bluetooth speaker with 12 hours of playback time and waterproof design. Perfect for outdoor adventures.",
    category: "electronics",
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.4,
      count: 312
    },
    stock: 88,
    inStock: true,
    onSale: true,
    featured: false,
    brand: "SoundWave",
    tags: ["speaker", "bluetooth", "wireless", "waterproof"],
    specifications: {
      "Battery Life": "12 hours",
      "Waterproof": "IPX7",
      "Connectivity": "Bluetooth 5.0",
      "Power": "20W"
    },
    discount: 25
  },
  {
    id: 8,
    title: "Men's Leather Wallet",
    price: 45.99,
    description: "Genuine leather wallet with multiple card slots, spacious billfold, and RFID-blocking technology to protect your personal information. Elegant and durable.",
    category: "accessories",
    image: "https://images.pexels.com/photos/2079451/pexels-photo-2079451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.2,
      count: 225
    },
    stock: 150,
    inStock: true,
    onSale: false,
    featured: false,
    brand: "LeatherCraft",
    tags: ["wallet", "leather", "rfid", "accessories"],
    specifications: {
      "Material": "Genuine Leather",
      "Card Slots": "8",
      "RFID Protection": "Yes",
      "Dimensions": "4.5 x 3.5 inches"
    }
  },
  {
    id: 9,
    title: "Stylish Sunglasses",
    price: 79.99,
    description: "Protect your eyes in style with these UV-protective sunglasses featuring polarized lenses and durable, lightweight frames. Perfect for any outdoor activity.",
    category: "accessories",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.5,
      count: 146
    },
    stock: 95,
    inStock: true,
    onSale: false,
    featured: true,
    brand: "RayShield",
    tags: ["sunglasses", "uv-protection", "polarized", "fashion"],
    specifications: {
      "Lens Type": "Polarized",
      "UV Protection": "100% UV400",
      "Frame Material": "Metal Alloy",
      "Lens Material": "Polycarbonate"
    }
  },
  {
    id: 10,
    title: "Fitness Smartwatch",
    price: 199.95,
    originalPrice: 279.95,
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and multiple sport modes. Water-resistant and long battery life.",
    category: "electronics",
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.7,
      count: 368
    },
    stock: 42,
    inStock: true,
    onSale: true,
    featured: true,
    brand: "FitTech",
    tags: ["smartwatch", "fitness", "gps", "health"],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart Rate, GPS, SpO2"
    },
    discount: 29
  },
  {
    id: 11,
    title: "Ceramic Coffee Mug Set",
    price: 34.99,
    description: "Start your mornings right with this set of 4 ceramic coffee mugs, microwave and dishwasher safe with a stylish, minimalist design. Perfect for daily use or gifting.",
    category: "home",
    image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.3,
      count: 203
    },
    stock: 200,
    inStock: true,
    onSale: false,
    featured: false,
    brand: "HomeEssentials",
    tags: ["mug", "coffee", "ceramic", "kitchen"],
    specifications: {
      "Material": "Ceramic",
      "Capacity": "12 oz each",
      "Quantity": "4 mugs",
      "Dishwasher Safe": "Yes"
    }
  },
  {
    id: 12,
    title: "Organic Cotton Throw Pillow",
    price: 29.99,
    description: "Add comfort and style to your home with these 100% organic cotton throw pillows available in multiple colors and patterns. Soft, breathable, and eco-friendly.",
    category: "home",
    image: "https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.1,
      count: 157
    },
    stock: 175,
    inStock: true,
    onSale: false,
    featured: false,
    brand: "EcoHome",
    tags: ["pillow", "organic", "cotton", "decor"],
    specifications: {
      "Material": "100% Organic Cotton",
      "Size": "18 x 18 inches",
      "Fill": "Polyester",
      "Care": "Machine Washable"
    }
  },
  // Low stock items
  {
    id: 13,
    title: "Gaming Mechanical Keyboard",
    price: 129.99,
    originalPrice: 179.99,
    description: "RGB backlit mechanical keyboard with customizable keys, perfect for gaming and productivity. Tactile switches for the best typing experience.",
    category: "electronics",
    image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.6,
      count: 432
    },
    stock: 8,
    inStock: true,
    onSale: true,
    featured: true,
    brand: "GamePro",
    tags: ["keyboard", "gaming", "rgb", "mechanical"],
    specifications: {
      "Switch Type": "Mechanical Blue",
      "Backlight": "RGB",
      "Connectivity": "USB-C",
      "Keys": "104"
    },
    discount: 28
  },
  {
    id: 14,
    title: "Yoga Mat Premium",
    price: 39.99,
    description: "Non-slip yoga mat with extra cushioning for comfortable workouts. Eco-friendly material, perfect for yoga, pilates, and stretching exercises.",
    category: "accessories",
    image: "https://images.pexels.com/photos/3822844/pexels-photo-3822844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.4,
      count: 298
    },
    stock: 0,
    inStock: false,
    onSale: false,
    featured: false,
    brand: "YogaLife",
    tags: ["yoga", "mat", "fitness", "exercise"],
    specifications: {
      "Thickness": "6mm",
      "Material": "TPE",
      "Size": "72 x 24 inches",
      "Weight": "2.2 lbs"
    }
  }
];

// Helper functions
export const getProductCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories).sort();
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsOnSale = (): Product[] => {
  return products.filter((product) => product.onSale);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getRelatedProducts = (productId: number, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterProducts = (filters: {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  onSale?: boolean;
  brands?: string[];
}): Product[] => {
  return products.filter((product) => {
    if (filters.categories && !filters.categories.includes(product.category)) {
      return false;
    }
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    if (filters.minRating && product.rating.rate < filters.minRating) {
      return false;
    }
    if (filters.inStock && !product.inStock) {
      return false;
    }
    if (filters.onSale && !product.onSale) {
      return false;
    }
    if (filters.brands && product.brand && !filters.brands.includes(product.brand)) {
      return false;
    }
    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sortBy: string
): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case "popular":
      return sorted.sort((a, b) => b.rating.count - a.rating.count);
    case "newest":
      return sorted.reverse();
    case "discount":
      return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default:
      return sorted;
  }
};

export const getProductBrands = (): string[] => {
  const brands = new Set(
    products.map((product) => product.brand).filter((brand): brand is string => !!brand)
  );
  return Array.from(brands).sort();
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const getStockStatus = (stock: number): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  message: string;
  color: string;
} => {
  if (stock === 0) {
    return { status: 'out-of-stock', message: 'Out of Stock', color: 'text-red-600' };
  } else if (stock < 10) {
    return { status: 'low-stock', message: `Only ${stock} left!`, color: 'text-orange-600' };
  } else {
    return { status: 'in-stock', message: 'In Stock', color: 'text-green-600' };
  }
};