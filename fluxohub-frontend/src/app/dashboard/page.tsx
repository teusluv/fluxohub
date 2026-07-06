"use client";

import { motion } from "framer-motion";
import { Share2, PackagePlus, ListTodo, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function DashboardHome() {
  const [isSharing, setIsSharing] = useState(false);
  const tenantSlug = "loja-teste"; // Viria do backend/Auth Context

  // CTA-05: Compartilhar Catálogo via Web Share API ou Clipboard Fallback
  const handleShare = async () => {
    setIsSharing(true);
    
    const shareData = {
      title: "Confira nosso Catálogo",
      text: "Acabamos de publicar novidades! Compre no varejo ou atacado direto pelo nosso link:",
      url: `https://fluxohub.com/loja/${tenantSlug}?utm_source=dashboard_share`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Catálogo compartilhado!");
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success("Link copiado para a área de transferência!", { icon: <CheckCircle2 className="text-green-500" /> });
      }
    } catch (err: any) {
      // AbortError acontece quando o usuário cancela a tela nativa de share. Ignoramos.
      if (err.name !== "AbortError") {
        toast.error("Não foi possível compartilhar no momento.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6 pb-24">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Visão Geral</h1>
          <p className="text-gray-400 text-sm">Resumo da sua operação</p>
        </div>
        
        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          aria-busy={isSharing}
          data-testid="btn-compartilhar"
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors active:scale-95"
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">Compartilhar Catálogo</span>
          <span className="sm:hidden">Share</span>
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between h-28">
          <TrendingUp className="text-green-500" size={24} />
          <div>
            <div className="text-2xl font-black">R$ 1.2K</div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Vendas Hoje</div>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex flex-col justify-between h-28">
          <ListTodo className="text-yellow-500" size={24} />
          <div>
            <div className="text-2xl font-black">12</div>
            <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Pendentes</div>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Ações Rápidas</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="/dashboard/produtos/novo"
          className="group relative bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <PackagePlus size={32} className="mb-4 text-white/80 group-hover:text-white transition-colors" />
          <h3 className="text-xl font-bold mb-1">Cadastrar Produto</h3>
          <p className="text-green-200 text-sm">Adicione novidades em menos de 30s</p>
        </Link>
        
        <Link 
          href="/dashboard/pedidos"
          className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <ListTodo size={32} className="mb-4 text-gray-400 group-hover:text-white transition-colors" />
          <h3 className="text-xl font-bold mb-1">Painel de Pedidos</h3>
          <p className="text-gray-400 text-sm">Gerencie vendas em tempo real</p>
        </Link>
      </div>
    </div>
  );
}
