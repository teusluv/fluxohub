package com.fluxohub.auth.service;

import com.fluxohub.auth.model.RefreshToken;
import com.fluxohub.auth.model.User;
import com.fluxohub.auth.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final Key key;

    // Tempos de Expiração
    private static final long ACCESS_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutos
    private static final long REFRESH_TOKEN_DEFAULT_DAYS = 7;
    private static final long REFRESH_TOKEN_EXTENDED_DAYS = 30;

    public TokenService(RefreshTokenRepository refreshTokenRepository, 
                        @Value("${jwt.secret:default-secret-key-that-must-be-at-least-32-bytes-long}") String secret) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ----------------------------------------------------
    // ACCESS TOKEN
    // ----------------------------------------------------
    public String generateAccessToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + ACCESS_TOKEN_EXPIRATION_MS);

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("role", user.getRole().name())
                .claim("tenantId", user.getTenantId() != null ? user.getTenantId().toString() : null)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims validateAccessToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException | IllegalArgumentException ex) {
            return null; // Inválido ou expirado
        }
    }

    // ----------------------------------------------------
    // REFRESH TOKEN (BD)
    // ----------------------------------------------------
    public RefreshToken createRefreshToken(User user, boolean rememberMe, String deviceInfo) {
        // Geramos um UUID seguro nativo e convertemos para string
        String tokenRaw = UUID.randomUUID().toString() + "-" + UUID.randomUUID().toString();
        
        // No mundo real, usaríamos SHA-256 no tokenRaw. Aqui faremos simulação ou hash direto.
        // Como o tokenRaw em si já é um segredo de alta entropia, o hash protege contra dump do BD.
        String tokenHash = hashToken(tokenRaw);

        long days = rememberMe ? REFRESH_TOKEN_EXTENDED_DAYS : REFRESH_TOKEN_DEFAULT_DAYS;
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(days);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .tokenHash(tokenHash)
                .deviceInfo(deviceInfo)
                .expiresAt(expiresAt)
                .build();

        refreshTokenRepository.save(refreshToken);
        
        // Retornamos a string crua para ser embutida no Cookie HttpOnly
        return RefreshToken.builder()
                .tokenHash(tokenRaw) // Hack para passar o raw de volta
                .expiresAt(expiresAt)
                .build();
    }

    public Optional<RefreshToken> validateAndGetRefreshToken(String tokenRaw) {
        String tokenHash = hashToken(tokenRaw);
        Optional<RefreshToken> optToken = refreshTokenRepository.findByTokenHash(tokenHash);

        if (optToken.isPresent()) {
            RefreshToken token = optToken.get();
            // Verifica expiração e revogação
            if (token.getRevokedAt() != null || token.getExpiresAt().isBefore(LocalDateTime.now())) {
                return Optional.empty();
            }
            return Optional.of(token);
        }
        return Optional.empty();
    }

    public void revokeRefreshToken(RefreshToken token) {
        token.setRevokedAt(LocalDateTime.now());
        refreshTokenRepository.save(token);
    }

    public void revokeAllUserTokens(User user) {
        refreshTokenRepository.revokeAllUserTokens(user, LocalDateTime.now());
    }

    // Helper
    private String hashToken(String raw) {
        // Simples SHA-256 ou BCrypt (para tokens curtos, SHA-256 é suficiente devido à entropia do UUID)
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(raw.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception ex) {
            throw new RuntimeException("Erro de Hashing", ex);
        }
    }
}
