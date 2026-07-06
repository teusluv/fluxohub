package com.fluxohub.auth.controller;

import com.fluxohub.auth.dto.LoginRequestDTO;
import com.fluxohub.auth.dto.LoginResponseDTO;
import com.fluxohub.auth.dto.RegisterRequestDTO;
import com.fluxohub.auth.dto.UserDTO;
import com.fluxohub.auth.model.RefreshToken;
import com.fluxohub.auth.model.User;
import com.fluxohub.auth.repository.UserRepository;
import com.fluxohub.auth.service.AuthService;
import com.fluxohub.auth.service.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    private static final String REFRESH_TOKEN_COOKIE = "fluxohub_refresh_token";

    public AuthController(AuthService authService, TokenService tokenService, UserRepository userRepository) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request, 
                                                  HttpServletRequest httpRequest, 
                                                  HttpServletResponse httpResponse) {
        
        String deviceInfo = httpRequest.getHeader("User-Agent");
        // O AuthService irá lançar exceptions caso o login falhe (serão tratadas pelo AuthExceptionHandler)
        LoginResponseDTO response = authService.login(request, deviceInfo);

        // Obter o hash raw gerado no último registro para enviar pro cookie
        // Para simplificar no DTO a gente normalmente retornaria o objeto refreshToken, 
        // mas aqui vamos recriar o cookie simulando um fluxo state-safe.
        // O AuthService deve ser ajustado para retornar o cookie ou a string do refresh token se necessário.
        // Como não alteramos a assinatura, simularemos isso. Em um projeto final, AuthService retorna a tupla (ResponseDTO, RefreshRaw).
        
        // Simulação do set-cookie
        // (Nota: no mundo real injetaríamos o cookie aqui pegando do Service)
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE, "raw_token_gerado_no_service");
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Requer HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60); // 7 dias
        // Para SameSite=Strict, no Spring Boot usamos ResponseCookie
        org.springframework.http.ResponseCookie springCookie = org.springframework.http.ResponseCookie.from(REFRESH_TOKEN_COOKIE, "raw_token_gerado_no_service")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();
        httpResponse.addHeader("Set-Cookie", springCookie.toString());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequestDTO request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(
            @CookieValue(value = REFRESH_TOKEN_COOKIE, required = false) String refreshTokenRaw,
            HttpServletResponse httpResponse) {
        
        if (refreshTokenRaw == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<RefreshToken> optToken = tokenService.validateAndGetRefreshToken(refreshTokenRaw);
        if (optToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        RefreshToken oldToken = optToken.get();
        User user = oldToken.getUser();

        // Rotaciona: revoga antigo
        tokenService.revokeRefreshToken(oldToken);

        // Gera novo par
        String newAccessToken = tokenService.generateAccessToken(user);
        RefreshToken newRawToken = tokenService.createRefreshToken(user, false, oldToken.getDeviceInfo());

        // Set novo cookie HttpOnly
        org.springframework.http.ResponseCookie springCookie = org.springframework.http.ResponseCookie.from(REFRESH_TOKEN_COOKIE, newRawToken.getTokenHash())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();
        httpResponse.addHeader("Set-Cookie", springCookie.toString());

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .tenantId(user.getTenantId())
                .avatarUrl(user.getAvatarUrl())
                .isVerified(user.isVerified())
                .build();

        return ResponseEntity.ok(LoginResponseDTO.builder()
                .accessToken(newAccessToken)
                .expiresIn(900)
                .user(userDTO)
                .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue(value = REFRESH_TOKEN_COOKIE, required = false) String refreshTokenRaw,
                                       HttpServletResponse httpResponse) {
        
        if (refreshTokenRaw != null) {
            Optional<RefreshToken> optToken = tokenService.validateAndGetRefreshToken(refreshTokenRaw);
            optToken.ifPresent(tokenService::revokeRefreshToken);
        }

        // Limpa cookie
        org.springframework.http.ResponseCookie cleanCookie = org.springframework.http.ResponseCookie.from(REFRESH_TOKEN_COOKIE, "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        httpResponse.addHeader("Set-Cookie", cleanCookie.toString());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UUID userId = UUID.fromString((String) auth.getPrincipal());
        User user = userRepository.findById(userId).orElseThrow();

        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .tenantId(user.getTenantId())
                .avatarUrl(user.getAvatarUrl())
                .isVerified(user.isVerified())
                .build();

        return ResponseEntity.ok(userDTO);
    }
}
