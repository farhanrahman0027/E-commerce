"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, DollarSign, Star, TrendingUp, Sparkles, Package } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  maxPrice: number;
}

export default function Sidebar({ maxPrice }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [inStock, setInStock] = useState<boolean>(false);
  const [onSale, setOnSale] = useState<boolean>(false);

  useEffect(() => {
    const priceParam = searchParams.get("price");
    const ratingParam = searchParams.get("rating");
    const sortParam = searchParams.get("sort");
    const stockParam = searchParams.get("inStock");
    const saleParam = searchParams.get("onSale");
    
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      setPriceRange([min || 0, max || maxPrice]);
    } else {
      setPriceRange([0, maxPrice]);
    }

    setSelectedRating(ratingParam || "");
    setSortBy(sortParam || "");
    setInStock(stockParam === "true");
    setOnSale(saleParam === "true");
  }, [searchParams, maxPrice]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRating(rating);
    updateFilters({ rating });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateFilters({ sort });
  };

  const handleStockChange = (checked: boolean) => {
    setInStock(checked);
    updateFilters({ inStock: checked });
  };

  const handleSaleChange = (checked: boolean) => {
    setOnSale(checked);
    updateFilters({ onSale: checked });
  };

  const applyPriceFilter = () => {
    updateFilters({ priceRange });
  };

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedRating("");
    setSortBy("");
    setInStock(false);
    setOnSale(false);
    
    const params = new URLSearchParams(searchParams.toString());
    // Keep category param if it exists
    const category = params.get("category");
    const search = params.get("search");
    
    params.delete("price");
    params.delete("rating");
    params.delete("sort");
    params.delete("inStock");
    params.delete("onSale");
    
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const updateFilters = (updates: {
    priceRange?: number[];
    rating?: string;
    sort?: string;
    inStock?: boolean;
    onSale?: boolean;
  }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update price
    const prices = updates.priceRange !== undefined ? updates.priceRange : priceRange;
    if (prices[0] > 0 || prices[1] < maxPrice) {
      params.set("price", `${prices[0]}-${prices[1]}`);
    } else {
      params.delete("price");
    }

    // Update rating
    const rating = updates.rating !== undefined ? updates.rating : selectedRating;
    if (rating) {
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }

    // Update sort
    const sort = updates.sort !== undefined ? updates.sort : sortBy;
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    // Update stock
    const stock = updates.inStock !== undefined ? updates.inStock : inStock;
    if (stock) {
      params.set("inStock", "true");
    } else {
      params.delete("inStock");
    }

    // Update sale
    const sale = updates.onSale !== undefined ? updates.onSale : onSale;
    if (sale) {
      params.set("onSale", "true");
    } else {
      params.delete("onSale");
    }
    
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const hasActiveFilters = 
    priceRange[0] > 0 || 
    priceRange[1] < maxPrice ||
    selectedRating !== "" ||
    sortBy !== "" ||
    inStock ||
    onSale;

  const activeFilterCount = [
    priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0,
    selectedRating ? 1 : 0,
    sortBy ? 1 : 0,
    inStock ? 1 : 0,
    onSale ? 1 : 0
  ].reduce((a, b) => a + b);

  const ratingOptions = [
    { value: "4", label: "4★ & Above", stars: 4 },
    { value: "3", label: "3★ & Above", stars: 3 },
    { value: "2", label: "2★ & Above", stars: 2 },
    { value: "1", label: "1★ & Above", stars: 1 },
  ];

  const sortOptions = [
    { value: "price-asc", label: "Price: Low to High", icon: TrendingUp },
    { value: "price-desc", label: "Price: High to Low", icon: TrendingUp },
    { value: "rating-desc", label: "Highest Rated", icon: Star },
    { value: "newest", label: "Newest First", icon: Sparkles },
    { value: "popular", label: "Most Popular", icon: TrendingUp },
  ];

  return (
    <div className="w-full bg-card border rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <p className="text-xs text-muted-foreground">
                {activeFilterCount} active
              </p>
            )}
          </div>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs hover:text-destructive h-8"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={["price", "sort"]} className="w-full">
        {/* Price Range */}
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Price Range</span>
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <span className="ml-auto mr-2 text-xs text-primary">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={maxPrice}
                step={1}
                onValueChange={handlePriceChange}
                onValueCommit={applyPriceFilter}
                className="mb-2"
              />
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-center">
                  <span className="text-sm font-medium">${priceRange[0]}</span>
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="flex-1 px-3 py-2 bg-muted rounded-lg text-center">
                  <span className="text-sm font-medium">${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Customer Rating</span>
              {selectedRating && (
                <span className="ml-auto mr-2 flex items-center gap-1 text-xs text-primary">
                  {selectedRating}★+
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <RadioGroup value={selectedRating} onValueChange={handleRatingChange}>
              <div className="space-y-3">
                {ratingOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2 group">
                    <RadioGroupItem value={option.value} id={`rating-${option.value}`} />
                    <Label
                      htmlFor={`rating-${option.value}`}
                      className="text-sm font-medium cursor-pointer flex items-center gap-1 group-hover:text-primary transition-colors"
                    >
                      {Array.from({ length: option.stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-muted-foreground ml-1">& Up</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Sort By */}
        <AccordionItem value="sort" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Sort By</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <RadioGroup value={sortBy} onValueChange={handleSortChange}>
              <div className="space-y-3">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div key={option.value} className="flex items-center space-x-2 group">
                      <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                      <Label
                        htmlFor={`sort-${option.value}`}
                        className="text-sm font-medium cursor-pointer flex items-center gap-2 flex-1 group-hover:text-primary transition-colors"
                      >
                        <Icon className="h-3 w-3 text-muted-foreground" />
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Availability & Special Offers */}
        <AccordionItem value="availability" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Availability</span>
              {(inStock || onSale) && (
                <span className="ml-auto mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {(inStock ? 1 : 0) + (onSale ? 1 : 0)}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-green-100 dark:bg-green-900/20 rounded">
                    <Package className="h-4 w-4 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer block">
                      In Stock Only
                    </Label>
                    <p className="text-xs text-muted-foreground">Ready to ship</p>
                  </div>
                </div>
                <Checkbox
                  id="in-stock"
                  checked={inStock}
                  onCheckedChange={handleStockChange}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 rounded">
                    <Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                  </div>
                  <div>
                    <Label htmlFor="on-sale" className="text-sm font-medium cursor-pointer block">
                      On Sale
                    </Label>
                    <p className="text-xs text-muted-foreground">Special offers</p>
                  </div>
                </div>
                <Checkbox
                  id="on-sale"
                  checked={onSale}
                  onCheckedChange={handleSaleChange}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Button */}
      <div className="p-6 pt-4 border-t">
        <Button
          variant="default"
          className="w-full"
          onClick={applyPriceFilter}
        >
          <Filter className="h-4 w-4 mr-2" />
          {hasActiveFilters ? "Update Results" : "Apply Filters"}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={resetFilters}
          >
            Reset All Filters
          </Button>
        )}
      </div>
    </div>
  );
}