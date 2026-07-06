"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LgpdBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se já aceitou
    const hasConsented = localStorage.getItem("fluxohub-lgpd-consent");
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("fluxohub-lgpd-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 px-2 sm:px-5 z-50 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto p-4 bg-white shadow-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto rounded-none sm:rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 flex-1">
              Nós usamos cookies e outras tecnologias para proporcionar a melhor experiência de navegação. 
              Ao continuar navegando, significa que você concorda com a nossa{" "}
              <a href="#" className="underline text-black font-semibold">Política de Privacidade</a>.
            </p>
            <button 
              data-testid="btn-aceitar-lgpd"
              onClick={handleAccept}
              className="w-full sm:w-auto px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Aceitar e Continuar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
