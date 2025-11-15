"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/lib/data/products";
import { Filter, X, SlidersHorizontal, Sparkles } from "lucide-react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          product.description.toLowerCase().includes(searchQuery) ||
          product.category.toLowerCase().includes(searchQuery)
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

  const clearAllFilters = () => {
    router.push("/");
  };

  const removeFilter = (filterText: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filterText.startsWith("Search:")) {
      params.delete("search");
    } else if (filterText.startsWith("Categories:")) {
      params.delete("category");
    } else if (filterText.startsWith("Price:")) {
      params.delete("price");
    }
    
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`);
  };
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        {activeFilters.length === 0 && (
          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">New Arrivals</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Discover Amazing Products
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                  Shop the latest collection of premium products at unbeatable prices
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Free Shipping Over $50
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    30-Day Returns
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Secure Checkout
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb & Filter Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {activeFilters.length > 0 ? "Filtered Results" : "All Products"}
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              className="lg:hidden w-full md:w-auto"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {isSidebarOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6 p-4 bg-card border rounded-lg animate-in fade-in slide-in-from-top">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">Active Filters</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs hover:text-destructive"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="pl-3 pr-2 py-1.5 text-sm group hover:bg-destructive/10 transition-colors cursor-pointer"
                    onClick={() => removeFilter(filter)}
                  >
                    {filter}
                    <X className="h-3 w-3 ml-2 group-hover:text-destructive transition-colors" />
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-6" />
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Sidebar maxPrice={maxPrice} />
              </div>
            </aside>

            {/* Sidebar - Mobile */}
            {isSidebarOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-in fade-in"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background z-50 lg:hidden overflow-y-auto animate-in slide-in-from-left shadow-2xl">
                  <div className="p-4 border-b sticky top-0 bg-background">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Filters</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <Sidebar maxPrice={maxPrice} />
                  </div>
                </div>
              </>
            )}
            
            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Filter className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <ProductGrid products={filteredProducts} />
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% secure transactions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}