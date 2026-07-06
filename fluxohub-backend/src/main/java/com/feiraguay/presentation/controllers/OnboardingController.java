package com.fluxohub.presentation.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/onboarding")
public class OnboardingController {

    @PostMapping
    public ResponseEntity<String> registerTenant(@RequestBody String requestJson) {
        // Recebe nome, whatsapp, cpf/cnpj e cor
        // Valida unicidade de dados
        // Gera o 'slug' a partir do nome
        // Salva com status 'PENDING'
        
        return ResponseEntity.status(201).body("{ \"message\": \"Lojista registrado com sucesso. Aguardando aprovação.\" }");
    }

    @PatchMapping("/{tenantId}/approve")
    public ResponseEntity<String> approveTenant(@PathVariable UUID tenantId) {
        // Exclusivo para ADMIN_PLATAFORMA
        // Muda o status do tenant para 'APPROVED'
        // Dispara e-mail/whatsapp com o link da loja: fluxohub.com/{slug}
        
        return ResponseEntity.ok("{ \"message\": \"Lojista aprovado e loja publicada.\" }");
    }
}
