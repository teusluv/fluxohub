package com.fluxohub.presentation.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fluxohub.config.TenantContext;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    // Simulação do UseCase injetado
    // private final CreateProductUseCase createProductUseCase;

    @PostMapping
    @PreAuthorize("hasRole('LOJISTA')")
    public ResponseEntity<String> createProduct(
            @RequestPart("data") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        
        UUID tenantId = TenantContext.getTenantId();
        
        // Simulação da lógica de criação
        // ProductDTO created = createProductUseCase.execute(tenantId, request, image);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso para o tenant: " + tenantId);
    }
}
