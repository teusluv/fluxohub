"use client";

import { useState } from "react";
import { ShoppingBag, X, Trash2, ChevronRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/hooks/useCartStore";
import { CheckoutForm } from "./CheckoutForm";

export function CartDrawer() {
  const { items, isHydrated, totalItems, totalPrice, updateQuantity, removeItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  // Não renderiza servidor-side para evitar hydration mismatch no ícone flutuante
  if (!isHydrated) return null;

  return (
    <>
      {/* FAB Fixo do Carrinho */}
      <button
        type="button"
        data-testid="fab-carrinho"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform z-40"
        aria-label="Abrir carrinho"
      >
        <ShoppingBag size={24} />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              data-testid="fab-carrinho-badge"
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white"
            >
              {totalItems}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              data-testid="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            >
              {/* Header do Drawer */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-xl font-display font-black uppercase tracking-tight">
                  {isCheckout ? "Finalizar Pedido" : "Seu Carrinho"}
                </h2>
                <button
                  type="button"
                  data-testid="btn-fechar-drawer"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setIsCheckout(false), 300); // Reseta view após fechar
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Corpo (Carrinho ou Checkout) */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                {isCheckout ? (
                  <CheckoutForm total={totalPrice} items={items} onClose={() => setIsOpen(false)} onBack={() => setIsCheckout(false)} />
                ) : items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="font-medium">Sua sacola está vazia.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          data-testid={`item-carrinho-${item.productId}`}
                          className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4"
                        >
                          <div className="w-16 h-20 bg-gray-100 rounded-lg shrink-0"></div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-bold text-sm leading-tight text-gray-900">{item.title}</h4>
                                <button
                                  type="button"
                                  data-testid={`btn-remover-item-${item.productId}`}
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 p-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Tam: {item.variation}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-200 rounded-full">
                                <button 
                                  type="button" 
                                  className="p-1 hover:bg-gray-50 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.price, item.isWholesale)}
                                ><Minus size={14}/></button>
                                <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                <button 
                                  type="button" 
                                  className="p-1 hover:bg-gray-50 rounded-full"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.price, item.isWholesale)}
                                ><Plus size={14}/></button>
                              </div>
                              <span className="font-black text-sm text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Rodapé Fixo */}
              {items.length > 0 && !isCheckout && (
                <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-xl font-black">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    data-testid="btn-finalizar-pedido"
                    onClick={() => setIsCheckout(true)}
                    className="w-full bg-black text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                  >
                    <span>Finalizar Pedido</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
