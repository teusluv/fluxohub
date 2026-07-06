"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, ShoppingBag, Info, Loader2 } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils"; // Assumindo utils tailwind-merge (se não, uso template literals)
import { motion } from "framer-motion";

// Mock Product Data
const MOCK_PRODUCT = {
  id: "1",
  title: "BLAZER ALFAIATARIA OFF WHITE",
  description: "Peça essencial para compor looks modernos e sofisticados.",
  priceRetail: 299.90,
  priceWholesale: 199.90,
  wholesaleMinQuantity: 5,
  variations: [
    { id: "v1", name: "P", stock: 2 },
    { id: "v2", name: "M", stock: 10 },
    { id: "v3", name: "G", stock: 0 },
  ]
};

export default function ProductDetailPage({ params }: { params: { tenantSlug: string, id: string } }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Recálculo Dinâmico (Varejo vs Atacado)
  const isWholesale = quantity >= MOCK_PRODUCT.wholesaleMinQuantity;
  const activePrice = isWholesale ? MOCK_PRODUCT.priceWholesale : MOCK_PRODUCT.priceRetail;
  const totalValue = activePrice * quantity;

  // CTA-01: Adicionar ao Carrinho
  const handleAddToCart = async () => {
    if (!selectedVariation) {
      toast.error("Por favor, selecione um tamanho antes de prosseguir.", { id: "erro-variacao" });
      return;
    }

    const variationDetails = MOCK_PRODUCT.variations.find(v => v.id === selectedVariation);
    if (!variationDetails || variationDetails.stock < quantity) {
      toast.error("Quantidade indisponível no estoque para o tamanho selecionado.");
      return;
    }

    setIsLoading(true);

    try {
      // Simula latência de rede/validação server-side
      await new Promise(resolve => setTimeout(resolve, 600));

      addItem({
        id: `${MOCK_PRODUCT.id}-${selectedVariation}`,
        productId: MOCK_PRODUCT.id,
        title: MOCK_PRODUCT.title,
        variation: variationDetails.name,
        quantity,
        price: activePrice,
        isWholesale
      });

      toast.success("Produto adicionado ao carrinho!", { id: "toast-sucesso" });
      // Volta para os detalhes (mantém usuário na página, seguindo requisito)
      setQuantity(1);
      setSelectedVariation(null);
    } catch (error) {
      toast.error("Falha ao adicionar ao carrinho. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-32">
      {/* Header Fixo */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center">
        <button 
          type="button"
          onClick={() => router.back()}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          data-testid="link-voltar-marketplace"
          aria-label="Voltar para a vitrine"
        >
          <ArrowLeft size={24} />
        </button>
      </header>

      {/* Galeria Simples */}
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-2xl">
        [ FOTO GALERIA ]
      </div>

      <main className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-black font-display uppercase tracking-tight mb-2">{MOCK_PRODUCT.title}</h1>
        <p className="text-gray-500 text-sm mb-6">{MOCK_PRODUCT.description}</p>

        {/* Preços */}
        <div className="flex flex-col gap-2 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Varejo:</span>
            <span className={`text-lg font-bold ${!isWholesale ? "text-black" : "text-gray-400 line-through"}`}>
              R$ {MOCK_PRODUCT.priceRetail.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
              Atacado <Info size={14} className="text-blue-500" />
            </span>
            <span 
              data-testid="preco-ativo" 
              data-tipo-preco={isWholesale ? "atacado" : "varejo"}
              className={`text-lg font-bold ${isWholesale ? "text-green-600 scale-110 origin-right transition-transform" : "text-gray-400"}`}
            >
              R$ {MOCK_PRODUCT.priceWholesale.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-400 text-right">Acima de {MOCK_PRODUCT.wholesaleMinQuantity} peças</div>
        </div>

        {/* Variações */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Tamanho</h3>
          <div className="flex flex-wrap gap-3">
            {MOCK_PRODUCT.variations.map(vari => {
              const isEsgotado = vari.stock === 0;
              const isSelected = selectedVariation === vari.id;
              
              return (
                <button
                  key={vari.id}
                  type="button"
                  data-testid={`chip-variacao-${vari.name}`}
                  disabled={isEsgotado}
                  onClick={() => setSelectedVariation(vari.id)}
                  className={`relative flex-1 min-w-[64px] h-12 rounded-xl border-2 font-bold transition-all ${
                    isEsgotado 
                      ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50" 
                      : isSelected
                        ? "border-black bg-black text-white scale-105"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {vari.name}
                  {isEsgotado && (
                    <span data-testid="tag-esgotado" className="absolute -top-3 -right-3 bg-red-100 text-red-600 text-[10px] uppercase font-black px-2 py-0.5 rounded-full border border-red-200">
                      Esgotado
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {!selectedVariation && <p data-testid="erro-variacao" className="text-red-500 text-xs font-bold mt-2 hidden"></p>}
        </div>

        {/* Contador de Quantidade */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Quantidade</h3>
          <div className="flex items-center gap-4 bg-gray-100 rounded-full p-1">
            <button 
              type="button"
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-black active:scale-95"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >-</button>
            <span className="font-bold w-4 text-center">{quantity}</span>
            <button 
              type="button"
              data-testid="btn-incrementar"
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-black active:scale-95"
              onClick={() => setQuantity(quantity + 1)}
            >+</button>
          </div>
        </div>

      </main>

      {/* Floating Action Area Fixa */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto flex gap-4">
          <div className="flex flex-col justify-center">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total</span>
            <span className="text-xl font-black">R$ {totalValue.toFixed(2)}</span>
          </div>
          <button
            type="button"
            data-testid="btn-adicionar-carrinho"
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-busy={isLoading}
            className={`flex-1 bg-black text-white font-bold rounded-full flex items-center justify-center gap-2 transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900 active:scale-95"
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <ShoppingBag size={20} />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
