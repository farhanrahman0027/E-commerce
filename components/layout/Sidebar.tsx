"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductCategories } from "@/lib/data/products";
import { Filter, X, DollarSign, Tag } from "lucide-react";

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

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    } else {
      setSelectedCategories([]);
    }
    
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
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("price");
    
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const updateFilters = (categories: string[], prices: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categories.length > 0) {
      params.set("category", categories.join(","));
    } else {
      params.delete("category");
    }
    
    if (prices[0] > 0 || prices[1] < maxPrice) {
      params.set("price", `${prices[0]}-${prices[1]}`);
    } else {
      params.delete("price");
    }
    
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="w-full bg-card border rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs hover:text-destructive"
          >
            Clear All
          </Button>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Categories */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">Categories</h3>
        </div>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 group">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category, checked === true)
                }
                className="transition-transform group-hover:scale-110"
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none cursor-pointer capitalize group-hover:text-primary transition-colors"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">Price Range</h3>
        </div>
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
          <div className="flex items-center justify-between">
            <div className="px-3 py-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">${priceRange[0]}</span>
            </div>
            <span className="text-muted-foreground">-</span>
            <div className="px-3 py-2 bg-muted rounded-lg">
              <span className="text-sm font-medium">${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Apply Button */}
      <Button
        variant="default"
        className="w-full"
        onClick={applyPriceFilter}
        disabled={!hasActiveFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
}