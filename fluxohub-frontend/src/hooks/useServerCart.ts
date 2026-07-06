"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type ServerCartState = {
  total: number;
  isWholesale: boolean;
  items: any[];
  isLoading: boolean;
};

export function useServerCart() {
  const [cartState, setCartState] = useState<ServerCartState>({
    total: 0,
    isWholesale: false,
    items: [],
    isLoading: true,
  });

  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Apenas carrega ou gera o sessionId anônimo, sem guardar regras no Client.
    let currentSession = localStorage.getItem("fluxohub-session");
    if (!currentSession) {
      currentSession = uuidv4();
      localStorage.setItem("fluxohub-session", currentSession);
    }
    setSessionId(currentSession);
    
    // Fetch inicial do carrinho na API
    fetchCart(currentSession);
  }, []);

  const fetchCart = async (session: string) => {
    setCartState(prev => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`/api/v1/carts/${session}`);
      if (res.ok) {
        const data = await res.json();
        // A API é quem calculou o 'total' e as regras de 'isWholesale'
        setCartState({ ...data, isLoading: false });
      }
    } catch (error) {
      console.error("Erro ao buscar carrinho do servidor", error);
    }
  };

  const updateItem = async (variationId: string, quantity: number) => {
    if (!sessionId) return;
    setCartState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // O Frontend é "burro": apenas avisa a API da intenção de alterar.
      const res = await fetch(`/api/v1/carts/${sessionId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variationId, quantity })
      });
      
      if (res.ok) {
        // Recarrega o estado atualizado retornado pela API
        const newData = await res.json();
        setCartState({ ...newData, isLoading: false });
      }
    } catch (error) {
      console.error("Erro ao atualizar carrinho na API", error);
    }
  };

  return { cartState, updateItem };
}
