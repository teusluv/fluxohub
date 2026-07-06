package com.fluxohub.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class TenantFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
            
        // Extrai o Tenant do header X-Tenant-ID ou do Bearer Token JWT
        String tenantId = request.getHeader("X-Tenant-ID");
        
        // Validação Production-Ready: Não aceitar lixo no header.
        if (tenantId != null && tenantId.matches("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
            TenantContext.setTenantId(tenantId);
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            // Diretriz de Qualidade: Sempre limpar a ThreadLocal para evitar vazamento em pools de thread (Tomcat)
            TenantContext.clear();
        }
    }
}
