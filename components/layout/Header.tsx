"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu, X, Heart, Package, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/context/CartContext";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getProductCategories } from "@/lib/data/products";

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const categories = getProductCategories();

  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    
    router.push(`/${params.toString() ? `?${params.toString()}` : ""}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    params.set("category", category);
    router.push(`/?${params.toString()}`);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/?featured=true", label: "Featured" },
    { href: "/?deals=true", label: "Deals" },
  ];

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 border-b",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm dark:bg-gray-900/95" 
            : "bg-white dark:bg-gray-900"
        )}
      >
        {/* Main Header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative group">
                <div className={cn(
                  "relative transition-all duration-200",
                  isSearchFocused && "transform scale-[1.02]"
                )}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 h-11 rounded-full border-2 transition-all focus:border-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </form>
            </div>

            {/* Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative rounded-full hover:bg-primary/10 transition-colors"
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative rounded-full hover:bg-primary/10 transition-all hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white shadow-lg animate-in fade-in zoom-in">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* Categories Navigation Bar */}
        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
              <Link
                href="/"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  !searchParams.get("category")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors capitalize",
                    searchParams.get("category") === category
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Categories - Scrollable */}
            <div className="md:hidden flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
              <Link
                href="/"
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0",
                  !searchParams.get("category")
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                All
              </Link>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors capitalize flex-shrink-0",
                    searchParams.get("category") === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in"
            onClick={toggleMenu}
          />
          <div className="fixed top-[64px] left-0 right-0 bg-white dark:bg-gray-900 z-40 md:hidden border-b shadow-lg animate-in slide-in-from-top">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t pt-4 space-y-2">
                <Link 
                  href="/cart" 
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Shopping Cart</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Wishlist</span>
                  </div>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">My Account</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}