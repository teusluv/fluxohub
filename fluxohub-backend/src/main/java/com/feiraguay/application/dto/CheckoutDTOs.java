package com.fluxohub.application.dto;

import java.util.List;

public class CheckoutDTOs {

    public static class CheckoutRequestDTO {
        private String customerName;
        private String deliveryMethod;
        private String storePhone;
        private List<CartItemDTO> cart;

        // Getters and Setters omitidos para brevidade (usar @Data do Lombok no projeto real)
        public String getCustomerName() { return customerName; }
        public String getDeliveryMethod() { return deliveryMethod; }
        public String getStorePhone() { return storePhone; }
        public List<CartItemDTO> getCart() { return cart; }
    }

    public static class CartItemDTO {
        private String title;
        private double priceRetail;
        private double priceWholesale;
        private int quantity;
        private String size;
        private String color;

        public String getTitle() { return title; }
        public double getPriceRetail() { return priceRetail; }
        public double getPriceWholesale() { return priceWholesale; }
        public int getQuantity() { return quantity; }
        public String getSize() { return size; }
        public String getColor() { return color; }
    }

    public static class CheckoutResponseDTO {
        private String whatsappUrl;

        public CheckoutResponseDTO(String whatsappUrl) {
            this.whatsappUrl = whatsappUrl;
        }

        public String getWhatsappUrl() { return whatsappUrl; }
    }
}
