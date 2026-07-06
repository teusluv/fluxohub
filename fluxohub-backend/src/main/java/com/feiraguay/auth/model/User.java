package com.fluxohub.auth.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    private String passwordHash; // Nullable for OAuth-only users

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private UUID tenantId; // Nullable for CLIENTE and ADMIN

    private String avatarUrl;

    @Column(nullable = false)
    private boolean isActive = true;

    @Column(nullable = false)
    private boolean isVerified = false;

    @Column(nullable = false)
    private int failedAttempts = 0;

    private LocalDateTime lockedUntil;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
