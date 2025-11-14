"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/context/CartContext";
import { formatPrice } from "@/lib/data/products";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) {
  return (
    <div className="flex items-center py-6 space-x-4 border-b border-border">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3 className="line-clamp-1">{item.title}</h3>
          <p className="ml-4">{formatPrice(item.price)}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {item.category}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            
            <span className="w-10 text-center text-sm">{item.quantity}</span>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm text-muted-foreground"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}