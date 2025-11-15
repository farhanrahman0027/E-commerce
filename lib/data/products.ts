export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  rating: {
    rate: number;
    count: number;
  };
  stock?: number;          // Made optional
  inStock?: boolean;       // Made optional
  onSale?: boolean;        // Made optional
  featured?: boolean;      // Made optional
  brand?: string;
  tags?: string[];
  specifications?: { [key: string]: string };
  discount?: number;
}