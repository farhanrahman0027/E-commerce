"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, Mail, Home, Receipt } from "lucide-react";
import { formatPrice } from "@/lib/data/products";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  date: string;
  billingInfo: {
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderDetails(JSON.parse(lastOrder));
    } else {
      // If no order found, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!orderDetails) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Card>
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
              <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">Payment Successful!</CardTitle>
          <CardDescription className="text-base">
            Thank you for your purchase. Your order has been confirmed.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Number */}
          <div className="bg-muted p-6 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-2xl font-bold tracking-wide">{orderDetails.orderNumber}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(orderDetails.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </h3>
            <div className="space-y-3">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(orderDetails.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatPrice(orderDetails.shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(orderDetails.tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Paid</span>
              <span>{formatPrice(orderDetails.total)}</span>
            </div>
          </div>

          <Separator />

          {/* Shipping Info */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Billing Information
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{orderDetails.billingInfo.email}</p>
              <p>{orderDetails.billingInfo.address}</p>
              <p>{orderDetails.billingInfo.city}, {orderDetails.billingInfo.zipCode}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              What's Next?
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Confirmation email sent to {orderDetails.billingInfo.email}</li>
              <li>✓ Order processing will begin shortly</li>
              <li>✓ You will receive shipping updates via email</li>
              <li>✓ Estimated delivery: 3-5 business days</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => router.push('/')} 
              className="flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              <Receipt className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}