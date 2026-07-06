package com.fluxohub.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
    private String accessToken;
    private long expiresIn;
    private UserDTO user;
}
