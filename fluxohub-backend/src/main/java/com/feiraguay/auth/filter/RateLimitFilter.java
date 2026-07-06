package com.fluxohub.auth.filter;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    // Armazena buckets na memória por IP (num sistema real distribuído, usaríamos Redis com Bucket4j)
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        // Regra de segurança: 20 requisições por IP a cada 1 minuto nas rotas de AUTH
        Refill refill = Refill.intervally(20, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(20, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Aplica Rate Limit apenas nas rotas de autenticação abertas
        if (request.getRequestURI().startsWith("/api/auth/")) {
            String ip = request.getRemoteAddr();
            Bucket bucket = buckets.computeIfAbsent(ip, k -> createNewBucket());

            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                // Contrato padrão da nossa API para 429
                String jsonResponse = "{\"error\":\"rate_limit_exceeded\",\"message\":\"Muitas tentativas. Aguarde antes de tentar novamente.\",\"retryAfter\":60}";
                response.getWriter().write(jsonResponse);
                return; // Bloqueia a requisição imediatamente
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
