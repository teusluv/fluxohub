"use client";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
              fluxo<span className="text-neon-green neon-text-green">hub</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-dark-surface text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-neon-green focus:border-neon-green sm:text-sm transition-all"
                placeholder="Search products, brands and categories..."
              />
            </div>
          </div>

          {/* Navigation & Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Catálogo
            </Link>
            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <button className="text-gray-300 hover:text-neon-green transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button className="text-gray-300 hover:text-neon-green transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-neon-green text-black text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="p-2">
              <input
                type="text"
                className="w-full pl-3 pr-3 py-2 border border-white/10 rounded-md bg-dark-surface text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-neon-green"
                placeholder="Search..."
              />
            </div>
            <Link href="/catalog" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5">
              Catálogo
            </Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5">
              Profile
            </Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/5">
              Cart (2)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
