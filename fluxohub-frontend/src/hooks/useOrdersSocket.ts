"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

export type OrderEvent = {
  id: string;
  customerName: string;
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
};

export function useOrdersSocket(tenantId: string) {
  const [newOrders, setNewOrders] = useState<OrderEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!tenantId) return;

    // Conexão SockJS/STOMP ao Backend Spring Boot
    const client = new Client({
      brokerURL: "ws://127.0.0.1:8080/ws", // Em prod usar WSS
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setIsConnected(true);
      
      // Assina o tópico exclusivo deste Lojista
      client.subscribe(`/topic/tenant/${tenantId}/orders`, (message) => {
        if (message.body) {
          const orderEvent: OrderEvent = JSON.parse(message.body);
          setNewOrders((prev) => [orderEvent, ...prev]);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    client.onWebSocketClose = () => {
      setIsConnected(false);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [tenantId]);

  const clearNewOrders = () => setNewOrders([]);

  return { newOrders, isConnected, clearNewOrders };
}
