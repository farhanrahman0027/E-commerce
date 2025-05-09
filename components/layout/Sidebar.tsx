"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { getProductCategories } from "@/lib/data/products";
import { Filter, X } from "lucide-react";

interface SidebarProps {
  maxPrice: number;
}

export default function Sidebar({ maxPrice }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categories = getProductCategories();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Get filter values from URL params
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    
    // Set selected categories from URL
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    } else {
      setSelectedCategories([]);
    }
    
    // Set price range from URL
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      setPriceRange([min || 0, max || maxPrice]);
    } else {
      setPriceRange([0, maxPrice]);
    }
  }, [searchParams, maxPrice]);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    let newCategories;
    
    if (isChecked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter(c => c !== category);
    }
    
    setSelectedCategories(newCategories);
    updateFilters(newCategories, priceRange);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    updateFilters(selectedCategories, priceRange);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    
    // Create a new URLSearchParams without category and price params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("price");
    
    // Preserve search query if it exists
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const updateFilters = (categories: string[], prices: number[]) => {
    // Create a new URLSearchParams object based on the current search params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category param
    if (categories.length > 0) {
      params.set("category", categories.join(","));
    } else {
      params.delete("category");
    }
    
    // Update price param
    if (prices[0] > 0 || prices[1] < maxPrice) {
      params.set("price", `${prices[0]}-${prices[1]}`);
    } else {
      params.delete("price");
    }
    
    // Navigate to the current pathname with the updated query params
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const filterContent = (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category, checked === true)
                }
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Price Range</h2>
        <div className="px-2">
          <Slider
            value={priceRange}
            min={0}
            max={maxPrice}
            step={1}
            onValueChange={handlePriceChange}
            onValueCommit={applyPriceFilter}
            className="mb-6"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={toggleMobileFilter}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Mobile Filter Sidebar */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={toggleMobileFilter}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-24 w-64">
        {filterContent}
      </div>
    </>
  );
}