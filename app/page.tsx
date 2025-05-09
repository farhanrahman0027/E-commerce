import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/lib/data/products";

// Filter products based on URL parameters
function filterProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  let filteredProducts = [...products];
  
  // Filter by search query
  const searchQuery = searchParams.search?.toString().toLowerCase();
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) => 
        product.title.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery)
    );
  }
  
  // Filter by category
  const categoryParam = searchParams.category?.toString();
  if (categoryParam) {
    const categories = categoryParam.split(",");
    filteredProducts = filteredProducts.filter((product) => 
      categories.includes(product.category)
    );
  }
  
  // Filter by price range
  const priceParam = searchParams.price?.toString();
  if (priceParam) {
    const [minPrice, maxPrice] = priceParam.split("-").map(Number);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }
  
  return filteredProducts;
}

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filteredProducts = filterProducts(searchParams);
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Get active filters for header display
  const activeFilters = [];
  if (searchParams.search) activeFilters.push(`Search: "${searchParams.search}"`);
  if (searchParams.category) {
    const categories = searchParams.category.toString().split(",");
    activeFilters.push(`Categories: ${categories.join(", ")}`);
  }
  if (searchParams.price) {
    const [min, max] = searchParams.price.toString().split("-");
    activeFilters.push(`Price: $${min} - $${max}`);
  }
  
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
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid products={filteredProducts} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}