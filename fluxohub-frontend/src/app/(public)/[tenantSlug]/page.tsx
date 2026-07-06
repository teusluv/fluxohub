"use client";

import { StoreHeader } from "@/components/vitrine/StoreHeader";
import { ProductCard, Product } from "@/components/vitrine/ProductCard";
import { LgpdBanner } from "@/components/ui/LgpdBanner";

// Mock de produtos
const mockProducts: Product[] = [
  { id: "1", title: "BLAZER ALFAIATARIA OFF WHITE", priceRetail: 299.90, priceWholesale: 199.90, stock: 10, imageUrl: "img1" },
  { id: "2", title: "CONJUNTO TRICOT PREMIUM", priceRetail: 349.90, stock: 5, imageUrl: "img2" },
  { id: "3", title: "CALÇA WIDE LEG JEANS", priceRetail: 189.90, priceWholesale: 120.00, stock: 0, imageUrl: "img3" },
  { id: "4", title: "VESTIDO MIDI CANELADO", priceRetail: 219.90, priceWholesale: 150.00, stock: 20, imageUrl: "img4" },
];

export default function VitrinePage({ params }: { params: { tenantSlug: string } }) {
  // O slug será usado para buscar os dados reais no backend via API

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader storeName="LOJA MODELO" />
      
      {/* Banner Hero Editorial */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] bg-stone-200 flex items-center justify-center overflow-hidden">
        {/* Imagem de fundo idealmente */}
        <div className="absolute inset-0 flex items-center justify-center text-stone-400 opacity-20 text-4xl">FOTO BANNER</div>
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-stone-800 tracking-tight mb-4 uppercase">
            Meu Interior
          </h2>
          <button className="mt-4 border border-stone-800 text-stone-800 px-8 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-stone-800 hover:text-white transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Faixa de Diferenciais */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">
          <div className="flex items-center gap-2">Parcele em até 4x sem juros</div>
          <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">Compra Segura</div>
          <div className="hidden sm:block h-4 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-black font-semibold">Troca Fácil</div>
        </div>
      </section>

      {/* Grade de Produtos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-widest text-black">Novidades</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer Básico */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-display text-2xl font-bold tracking-tight text-black uppercase mb-6">
            LOJA MODELO
          </h3>
          <p className="text-sm text-gray-500 mb-8">CNPJ: 00.000.000/0001-00 | Feira de Santana - BA</p>
          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Powered by fluxohub
          </div>
        </div>
      </footer>
      <LgpdBanner />
    </div>
  );
}
