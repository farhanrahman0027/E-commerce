export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const products: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: 3,
    title: "Women's 3-in-1 Snowboard Jacket",
    price: 56.99,
    description: "Note that the jacket has separate lining and shell layers that can be worn separately or together for different temperatures and conditions.",
    category: "women's clothing",
    image: "https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.7,
      count: 500
    }
  },
  {
    id: 4,
    title: "Premium Noise-Cancelling Headphones",
    price: 159.99,
    description: "Experience music like never before with these premium wireless headphones featuring active noise cancellation and 30 hours of battery life.",
    category: "electronics",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.8,
      count: 421
    }
  },
  {
    id: 5,
    title: "Professional DSLR Camera",
    price: 899.99,
    description: "Capture stunning photos and videos with this professional-grade DSLR camera, featuring 24.1 megapixels and 4K video recording capabilities.",
    category: "electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.6,
      count: 287
    }
  },
  {
    id: 6,
    title: "Elegant Women's Watch",
    price: 129.95,
    description: "A timeless accessory that complements any outfit. This elegant women's watch features a stainless steel band and water-resistant design.",
    category: "jewelry",
    image: "https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.3,
      count: 178
    }
  },
  {
    id: 7,
    title: "Wireless Bluetooth Speaker",
    price: 89.99,
    description: "Fill any room with immersive sound from this portable Bluetooth speaker with 12 hours of playback time and waterproof design.",
    category: "electronics",
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.4,
      count: 312
    }
  },
  {
    id: 8,
    title: "Men's Leather Wallet",
    price: 45.99,
    description: "Genuine leather wallet with multiple card slots, spacious billfold, and RFID-blocking technology to protect your personal information.",
    category: "accessories",
    image: "https://images.pexels.com/photos/2079451/pexels-photo-2079451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.2,
      count: 225
    }
  },
  {
    id: 9,
    title: "Stylish Sunglasses",
    price: 79.99,
    description: "Protect your eyes in style with these UV-protective sunglasses featuring polarized lenses and durable, lightweight frames.",
    category: "accessories",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.5,
      count: 146
    }
  },
  {
    id: 10,
    title: "Fitness Smartwatch",
    price: 199.95,
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and multiple sport modes.",
    category: "electronics",
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.7,
      count: 368
    }
  },
  {
    id: 11,
    title: "Ceramic Coffee Mug Set",
    price: 34.99,
    description: "Start your mornings right with this set of 4 ceramic coffee mugs, microwave and dishwasher safe with a stylish, minimalist design.",
    category: "home",
    image: "https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.3,
      count: 203
    }
  },
  {
    id: 12,
    title: "Organic Cotton Throw Pillow",
    price: 29.99,
    description: "Add comfort and style to your home with these 100% organic cotton throw pillows available in multiple colors and patterns.",
    category: "home",
    image: "https://images.pexels.com/photos/6444256/pexels-photo-6444256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
      rate: 4.1,
      count: 157
    }
  }
];

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map((product) => product.category));
  return Array.from(categories);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};