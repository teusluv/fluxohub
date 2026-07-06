package com.fluxohub.application.usecases;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class OrderService {

    // private final OrderRepository orderRepository;
    // private final ProductVariationRepository variationRepository;

    @Transactional
    public void updateOrderStatus(UUID orderId, String newStatus) {
        // Lógica simulada baseada na arquitetura
        
        // 1. Busca pedido no DB
        // Order order = orderRepository.findById(orderId).orElseThrow();
        
        if ("COMPLETED".equals(newStatus)) {
            // 2. Itera sobre itens e baixa estoque
            /*
            for (OrderItem item : order.getItems()) {
                ProductVariation variation = item.getVariation();
                if (variation.getStock() < item.getQuantity()) {
                    throw new RuntimeException("Estoque insuficiente para a variação " + variation.getId());
                }
                variation.setStock(variation.getStock() - item.getQuantity());
                variationRepository.save(variation);
            }
            */
        }
        
        // 3. Atualiza pedido
        // order.setStatus(newStatus);
        // orderRepository.save(order);
    }
}
