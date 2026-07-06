"use client";

import { ShoppingBag, Search, User } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/hooks/useCartStore";

export function StoreHeader({ storeName, logoUrl }: { storeName: string, logoUrl?: string }) {
  const { totalItems, isHydrated } = useCartStore();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Faixa de anúncio topo */}
      <div className="bg-gray-100 text-center text-[10px] sm:text-xs font-semibold py-1.5 uppercase tracking-widest text-gray-800">
        Compre no Atacado e economize — Frete grátis acima de R$ 500
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Menu Mobile / Busca Desktop */}
          <div className="flex-1 flex items-center">
            <button className="p-2 text-gray-500 hover:text-black sm:hidden">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden sm:flex space-x-6 text-sm font-medium tracking-wider text-gray-600">
              <Link href="#" className="hover:text-black">NEW IN</Link>
              <Link href="#" className="hover:text-black">COLEÇÕES</Link>
              <Link href="#" className="hover:text-black">BESTSELLER</Link>
              <Link href="#" className="text-red-600 hover:text-red-700 font-bold">SALE</Link>
            </div>
          </div>

          {/* Logo Central (Link para Home do Marketplace) */}
          <Link href="/" data-testid="link-logo-marketplace" className="flex-shrink-0 flex items-center justify-center">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={storeName} className="h-8 sm:h-12 w-auto object-contain hover:scale-105 transition-transform" />
            ) : (
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black uppercase hover:text-gray-600 transition-colors">
                {storeName}
              </h1>
            )}
          </Link>

          {/* Ícones Direita */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <button className="text-gray-400 hover:text-black hidden sm:block">
              <Search strokeWidth={1.5} size={20} />
            </button>
            <button className="text-gray-400 hover:text-black hidden sm:block">
              <User strokeWidth={1.5} size={20} />
            </button>
            <div className="text-gray-400 hover:text-black relative flex items-center cursor-pointer">
              <ShoppingBag strokeWidth={1.5} size={22} />
              {isHydrated && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
