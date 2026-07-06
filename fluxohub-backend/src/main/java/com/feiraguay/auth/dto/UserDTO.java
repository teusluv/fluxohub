package com.fluxohub.auth.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private String role;
    private UUID tenantId;
    private String avatarUrl;
    private boolean isVerified;
}
