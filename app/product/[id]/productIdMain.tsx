"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, Star, ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatPrice } from "@/lib/data/products";
import { useCart } from "@/lib/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  product: {
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
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center text-muted-foreground hover:text-foreground"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain object-center p-4"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
              <div className="flex items-center space-x-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(product.rating.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            
            <span className="text-3xl font-bold my-4">{formatPrice(product.price)}</span>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Category</h2>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
                {product.category}
              </span>
            </div>
            
            <div className="mt-auto space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Quantity</h2>
                <div className="flex items-center border rounded w-32">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="flex-1 text-center">{quantity}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={increaseQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}