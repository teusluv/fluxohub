package com.fluxohub.application.usecases;

import com.fluxohub.application.dto.CheckoutDTOs.*;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class CheckoutUseCase {

    private static final int MIN_WHOLESALE = 6;

    public String generateWhatsAppLink(CheckoutRequestDTO request) {
        
        int totalQuantity = request.getCart().stream()
                .mapToInt(CartItemDTO::getQuantity)
                .sum();
                
        boolean isWholesale = totalQuantity >= MIN_WHOLESALE;
        
        StringBuilder text = new StringBuilder();
        text.append("*Novo Pedido - fluxohub* 🛍️\n\n");
        text.append("👤 *Cliente:* ").append(request.getCustomerName()).append("\n");
        text.append("🚚 *Entrega:* ").append(request.getDeliveryMethod()).append("\n\n");
        text.append("*Itens do Pedido:*\n");
        
        double total = 0;
        
        for (CartItemDTO item : request.getCart()) {
            double price = isWholesale ? item.getPriceWholesale() : item.getPriceRetail();
            double itemTotal = price * item.getQuantity();
            total += itemTotal;
            
            String variation = "";
            if (item.getSize() != null && !item.getSize().isEmpty()) {
                variation += item.getSize();
            }
            if (item.getColor() != null && !item.getColor().isEmpty()) {
                variation += (variation.isEmpty() ? "" : "/") + item.getColor();
            }
            String variationText = variation.isEmpty() ? "" : " (" + variation + ")";
            
            text.append("- ").append(item.getQuantity()).append("x ")
                .append(item.getTitle()).append(variationText)
                .append(" - R$ ").append(String.format("%.2f", itemTotal)).append("\n");
        }
        
        text.append("\n*Total a pagar: R$ ").append(String.format("%.2f", total)).append("*\n");
        
        if (isWholesale) {
            text.append("\n✨ _Preço de ATACADO aplicado!_\n");
        }
        
        // Aqui também incluiríamos lógica para salvar o pedido no banco de dados como PENDING...
        
        String encodedText = URLEncoder.encode(text.toString(), StandardCharsets.UTF_8);
        String cleanPhone = request.getStorePhone().replaceAll("\\D", "");
        
        return "https://wa.me/" + cleanPhone + "?text=" + encodedText;
    }
}
