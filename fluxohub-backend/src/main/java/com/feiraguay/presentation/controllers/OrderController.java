package com.fluxohub.presentation.controllers;

import com.fluxohub.application.dto.CheckoutDTOs.CheckoutRequestDTO;
import com.fluxohub.application.dto.CheckoutDTOs.CheckoutResponseDTO;
import com.fluxohub.application.usecases.CheckoutUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final CheckoutUseCase checkoutUseCase;

    public OrderController(CheckoutUseCase checkoutUseCase) {
        this.checkoutUseCase = checkoutUseCase;
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponseDTO> processCheckout(@RequestBody CheckoutRequestDTO request) {
        // A geração do payload seguro está na API! O frontend apenas receberá a URL final.
        String whatsappUrl = checkoutUseCase.generateWhatsAppLink(request);
        
        return ResponseEntity.ok(new CheckoutResponseDTO(whatsappUrl));
    }
}
