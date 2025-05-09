"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product, formatPrice } from "@/lib/data/products";
import { useCart } from "@/lib/context/CartContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router=useRouter();
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addItem(product, 1);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <div onClick={()=>router.push(`/product/${product.id}`)} className="h-full flex flex-col cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex-grow p-4">
          <div className="flex items-center space-x-1 mb-2">
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
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating.count})
            </span>
          </div>
          <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="font-bold text-lg">{formatPrice(product.price)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full transition-all"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}