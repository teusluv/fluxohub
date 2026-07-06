"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Marketplace */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display text-2xl font-black tracking-tighter text-black dark:text-white uppercase">
              fluxohub<span className="text-red-600">.</span>
            </Link>
          </div>

          {/* Barra de Busca (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Busque por lojas, marcas ou categorias..." 
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full py-2.5 pl-5 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white">
                <Search size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Ações / Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="md:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white">
              <Search size={22} />
            </button>
            
            <ThemeToggle />

            <div className="hidden sm:flex items-center space-x-4 text-sm font-semibold">
              <Link href="/onboarding" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Venda Conosco</Link>
              <Link href="/login" className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Entrar</Link>
            </div>
            <button className="sm:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white pl-2">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
