"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/data/products";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  subtotal: number;
}

export default function CartSummary({ subtotal }: CartSummaryProps) {
  const router = useRouter();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // Navigate to payment page
    router.push('/payment');
  };

  return (
    <div className="rounded-lg border border-border p-6 bg-card">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping > 0 ? formatPrice(shipping) : "Free"}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Button 
        className="w-full mt-6" 
        size="lg"
        disabled={subtotal <= 0}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
}