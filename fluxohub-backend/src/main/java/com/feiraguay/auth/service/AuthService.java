package com.fluxohub.auth.service;

import com.fluxohub.auth.dto.LoginRequestDTO;
import com.fluxohub.auth.dto.LoginResponseDTO;
import com.fluxohub.auth.dto.RegisterRequestDTO;
import com.fluxohub.auth.dto.UserDTO;
import com.fluxohub.auth.exception.AccountLockedException;
import com.fluxohub.auth.exception.InvalidCredentialsException;
import com.fluxohub.auth.model.RefreshToken;
import com.fluxohub.auth.model.Role;
import com.fluxohub.auth.model.User;
import com.fluxohub.auth.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCKOUT_DURATION_MINUTES = 15;

    public AuthService(UserRepository userRepository, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public LoginResponseDTO login(LoginRequestDTO request, String deviceInfo) {
        Optional<User> optUser = userRepository.findByEmail(request.getEmail());

        if (optUser.isEmpty()) {
            // MENSAGEM GENÉRICA PARA EVITAR ENUMERATION
            throw new InvalidCredentialsException("E-mail ou senha incorretos.");
        }

        User user = optUser.get();

        // Verifica Lockout
        if (user.getLockedUntil() != null && user.getLockedUntil().isAfter(LocalDateTime.now())) {
            long waitSeconds = ChronoUnit.SECONDS.between(LocalDateTime.now(), user.getLockedUntil());
            throw new AccountLockedException("Conta temporariamente bloqueada por excesso de tentativas.", waitSeconds);
        }

        // Se passou do tempo de lockout, reseta
        if (user.getLockedUntil() != null && user.getLockedUntil().isBefore(LocalDateTime.now())) {
            user.setLockedUntil(null);
            user.setFailedAttempts(0);
        }

        // Senha BCrypt falhou
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            user.setFailedAttempts(user.getFailedAttempts() + 1);
            if (user.getFailedAttempts() >= MAX_FAILED_ATTEMPTS) {
                user.setLockedUntil(LocalDateTime.now().plusMinutes(LOCKOUT_DURATION_MINUTES));
            }
            userRepository.save(user);
            throw new InvalidCredentialsException("E-mail ou senha incorretos.");
        }

        // Sucesso
        user.setFailedAttempts(0);
        user.setLockedUntil(null);
        userRepository.save(user);

        // Geração de Tokens
        String accessToken = tokenService.generateAccessToken(user);
        RefreshToken rawRefreshToken = tokenService.createRefreshToken(user, request.isRememberMe(), deviceInfo);

        // Cria DTO Limpo
        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .tenantId(user.getTenantId())
                .avatarUrl(user.getAvatarUrl())
                .isVerified(user.isVerified())
                .build();

        return LoginResponseDTO.builder()
                .accessToken(accessToken)
                .expiresIn(900) // 15 minutos em segundos
                .user(userDTO)
                .build();
    }

    @Transactional
    public void register(RegisterRequestDTO request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("As senhas não coincidem");
        }

        // Enumeration: Retornamos sucesso vazio ou erro genérico se email existir? 
        // No registro, é comum dizer "Email já em uso" mas o prompt manda ser cauteloso.
        if (userRepository.existsByEmail(request.getEmail())) {
            // Em auth de alta segurança, dizemos "Se o email estiver válido você receberá...", 
            // mas num form de registro e-commerce o ideal é avisar rápido "E-mail indisponível".
            throw new IllegalArgumentException("E-mail indisponível para cadastro.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .isActive(true)
                .isVerified(false)
                .build();

        userRepository.save(user);

        // TODO: Gerar Token e disparar e-mail via Resend API Mock
    }
}
