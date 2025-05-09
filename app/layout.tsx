import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShopHub - Modern E-commerce',
  description: 'Shop the latest products with our beautifully designed e-commerce store',
};

// This layout remains server-side since it doesn't interact with search params
// All client-side interactivity will be contained within the page components
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}