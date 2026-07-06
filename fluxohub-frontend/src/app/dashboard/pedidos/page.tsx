"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Wifi, WifiOff, Loader2, AlertCircle } from "lucide-react";
import { useOrdersSocket, OrderEvent } from "@/hooks/useOrdersSocket";
import { toast } from "sonner";

export default function OrdersKanban() {
  const [pending, setPending] = useState<OrderEvent[]>([
    { id: "001", customerName: "Maria Silva", total: 150.0, status: "PENDING" },
    { id: "002", customerName: "João Pedro", total: 240.0, status: "PENDING" },
  ]);
  const [completed, setCompleted] = useState<OrderEvent[]>([
    { id: "099", customerName: "Ana Souza", total: 80.0, status: "COMPLETED" },
  ]);

  const { newOrders, isConnected, clearNewOrders } = useOrdersSocket("123");
  
  // Modal State
  const [confirmingOrder, setConfirmingOrder] = useState<OrderEvent | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (newOrders.length > 0) {
      setPending(prev => [...newOrders, ...prev]);
      clearNewOrders();
      toast.info("Novo pedido recebido na fila!", { position: "bottom-center" });
    }
  }, [newOrders, clearNewOrders]);

  // CTA-04: Confirmação e Integração
  const handleConfirmOrder = async () => {
    if (!confirmingOrder) return;
    
    setIsProcessing(true);

    try {
      // API call PATCH /api/orders/{id}/status
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulando 10% de chance de falha na rede
          if (Math.random() > 0.9) reject(new Error("Falha no servidor"));
          else resolve(true);
        }, 800);
      });

      // Se sucesso, move na UI
      setPending(prev => prev.filter(o => o.id !== confirmingOrder.id));
      setCompleted(prev => [{...confirmingOrder, status: "COMPLETED"}, ...prev]);
      
      toast.success(`Pedido #${confirmingOrder.id} concluído com sucesso.`);
    } catch (error) {
      toast.error(`Falha ao concluir pedido #${confirmingOrder.id}. Ação abortada.`);
    } finally {
      setIsProcessing(false);
      setConfirmingOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Painel de Pedidos</h1>
        <div className="flex items-center text-xs font-bold bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
           {isConnected ? (
             <span className="flex items-center text-green-400 gap-2"><Wifi size={14}/> ONLINE</span>
           ) : (
             <span className="flex items-center text-red-400 gap-2"><WifiOff size={14}/> RECONECTANDO</span>
           )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* COLUNA PENDENTE */}
        <div data-testid="coluna-pendente" className="bg-gray-900 rounded-3xl p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs">
              <Clock size={16} /> Pendentes
            </div>
            <span className="bg-yellow-500/20 text-yellow-500 text-xs font-black px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {pending.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  data-testid={`pedido-${order.id}`}
                  className="bg-gray-800 p-4 rounded-2xl border-l-4 border-yellow-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <h3 className="font-bold text-white text-sm">#{order.id} - {order.customerName}</h3>
                    <p className="text-gray-400 text-xs mt-1 font-mono">R$ {order.total.toFixed(2)}</p>
                  </div>
                  
                  <button
                    data-testid="btn-confirmar-pedido"
                    onClick={() => setConfirmingOrder(order)}
                    className="w-full sm:w-auto bg-white text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Concluir
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {pending.length === 0 && (
              <div className="py-8 text-center text-gray-500 text-sm border-2 border-dashed border-gray-800 rounded-2xl">
                Nenhum pedido pendente.
              </div>
            )}
          </div>
        </div>

        {/* COLUNA CONCLUÍDO */}
        <div data-testid="coluna-concluido" className="bg-gray-900 rounded-3xl p-4 border border-gray-800 opacity-80">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-widest text-xs">
              <CheckCircle size={16} /> Concluídos
            </div>
            <span className="bg-green-500/20 text-green-500 text-xs font-black px-2 py-0.5 rounded-full">
              {completed.length}
            </span>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {completed.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 p-4 rounded-2xl border-l-4 border-green-500/50"
                  data-testid={`pedido-${order.id}`}
                >
                  <h3 className="font-bold text-gray-400 text-sm line-through">#{order.id} - {order.customerName}</h3>
                  <p className="text-gray-500 text-xs mt-1 font-mono">R$ {order.total.toFixed(2)}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação OBRIGATÓRIO */}
      <AnimatePresence>
        {confirmingOrder && (
          <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !isProcessing && setConfirmingOrder(null)}
            />
            
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-sm bg-gray-900 border border-gray-800 sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl"
            >
              <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">Concluir Pedido?</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Você está marcando o pedido <strong className="text-white">#{confirmingOrder.id}</strong> de <strong className="text-white">{confirmingOrder.customerName}</strong> como entregue. Isso dará baixa no estoque do servidor.
              </p>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setConfirmingOrder(null)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-xl font-bold text-sm hover:bg-gray-700 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  data-testid="btn-modal-confirmar"
                  disabled={isProcessing}
                  onClick={handleConfirmOrder}
                  className="flex-1 px-4 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isProcessing ? <Loader2 className="animate-spin" size={16} /> : "Sim, concluir"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
