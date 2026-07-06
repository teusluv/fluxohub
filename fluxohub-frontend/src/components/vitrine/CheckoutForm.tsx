"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Send } from "lucide-react";
import type { CartItem } from "@/hooks/useCartStore";
import { useCartStore } from "@/hooks/useCartStore";

const checkoutSchema = z.object({
  name: z.string().min(3, "Nome completo obrigatório"),
  phone: z.string().min(10, "Telefone inválido (com DDD)"),
  deliveryMethod: z.enum(["retirada", "excursao"]),
});

type CheckoutProps = {
  total: number;
  items: CartItem[];
  onClose: () => void;
  onBack: () => void;
};

export function CheckoutForm({ total, items, onClose, onBack }: CheckoutProps) {
  const { clearCart } = useCartStore();
  const [formData, setFormData] = useState({ name: "", phone: "", deliveryMethod: "retirada" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // CTA-02: Confirmar Pedido e Montar Payload WhatsApp
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Formatação sofisticada da mensagem de pedido para o Lojista
      const itemsList = items.map(i => 
        `🔸 ${i.quantity}x ${i.title} (Tam: ${i.variation}) - R$ ${(i.price * i.quantity).toFixed(2)}`
      ).join("%0A");

      const message = `🛍️ *NOVO PEDIDO - fluxohub*%0A%0A*Cliente:* ${formData.name}%0A*Contato:* ${formData.phone}%0A*Entrega:* ${formData.deliveryMethod.toUpperCase()}%0A%0A*ITENS:*%0A${itemsList}%0A%0A*TOTAL: R$ ${total.toFixed(2)}*%0A%0A_Pedido gerado pela plataforma._`;

      // Simula salvar a intenção no banco antes de abrir WhatsApp (Production-Ready)
      await new Promise(res => setTimeout(res, 800));

      const tenantPhone = "5575999999999"; // Hardcoded for prototype, usually from API config
      
      // FIX QA: Codificação absoluta do texto para não quebrar links no Mobile/iOS
      const whatsappUrl = `https://wa.me/${tenantPhone}?text=${encodeURIComponent(message)}`;

      toast.success("Pedido gerado! Redirecionando para o WhatsApp...", { id: "toast-sucesso" });
      
      // Limpa estado local após sucesso
      clearCart();
      onClose();

      // Disparo do WhatsApp em nova aba
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    } catch (error) {
      toast.error("Erro ao gerar pedido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-testid="checkout-form" className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button 
        type="button" 
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 font-bold uppercase tracking-wider mb-6 hover:text-black transition-colors"
      >
        <ArrowLeft size={16} /> Voltar ao Carrinho
      </button>

      <form onSubmit={handleConfirm} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Nome Completo</label>
          <input
            data-testid="input-nome"
            type="text"
            disabled={isLoading}
            className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all`}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <p data-testid="erro-nome" className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">WhatsApp</label>
          <input
            data-testid="input-telefone"
            type="tel"
            disabled={isLoading}
            className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-all`}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="(75) 99999-9999"
          />
          {errors.phone && <p data-testid="erro-telefone" className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Método de Entrega</label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all ${formData.deliveryMethod === 'retirada' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="delivery" 
                value="retirada" 
                className="hidden" 
                checked={formData.deliveryMethod === 'retirada'}
                onChange={() => setFormData({...formData, deliveryMethod: "retirada"})}
              />
              <span className="font-bold text-sm">Retirada na Loja</span>
            </label>
            <label data-testid="radio-excursao" className={`border rounded-xl p-3 flex items-center justify-center cursor-pointer transition-all ${formData.deliveryMethod === 'excursao' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400'}`}>
              <input 
                type="radio" 
                name="delivery" 
                value="excursao" 
                className="hidden" 
                checked={formData.deliveryMethod === 'excursao'}
                onChange={() => setFormData({...formData, deliveryMethod: "excursao"})}
              />
              <span className="font-bold text-sm">Excursão / Ônibus</span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-900 font-bold">Total a Pagar:</span>
            <span className="text-2xl font-black text-gray-900">R$ {total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            data-testid="btn-confirmar-whatsapp"
            disabled={isLoading}
            aria-busy={isLoading}
            className={`w-full bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform shadow-[0_10px_30px_rgba(37,211,102,0.3)] ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1 active:scale-95 hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)]"
            }`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <Send size={20} className="mr-1" />
                Confirmar no WhatsApp
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
