"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/lib/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  
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
          Continue Shopping
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet
            </p>
            <Button onClick={() => router.push("/")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}