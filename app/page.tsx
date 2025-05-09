"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/lib/data/products";

export default function Home() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Filter products based on URL parameters
  useEffect(() => {
    let result = [...products];
    const newActiveFilters: string[] = [];
    
    // Filter by search query
    const searchQuery = searchParams.get("search")?.toLowerCase();
    if (searchQuery) {
      result = result.filter(
        (product) => 
          product.title.toLowerCase().includes(searchQuery) || 
          product.description.toLowerCase().includes(searchQuery)
      );
      newActiveFilters.push(`Search: "${searchQuery}"`);
    }
    
    // Filter by category
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categories = categoryParam.split(",");
      result = result.filter((product) => 
        categories.includes(product.category)
      );
      newActiveFilters.push(`Categories: ${categories.join(", ")}`);
    }
    
    // Filter by price range
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [minPrice, maxPrice] = priceParam.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
      newActiveFilters.push(`Price: $${minPrice} - $${maxPrice}`);
    }
    
    setFilteredProducts(result);
    setActiveFilters(newActiveFilters);
  }, [searchParams]);
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Shop Our Products</h1>
        
        {activeFilters.length > 0 && (
          <div className="mb-6 text-sm">
            <p className="text-muted-foreground mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <span 
                  key={index} 
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-6" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar maxPrice={maxPrice} />
          
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}