package com.fluxohub.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilita um message broker simples em memória para canais baseados em "topic"
        config.enableSimpleBroker("/topic");
        
        // Prefixos para mensagens enviadas pelo client destinadas ao servidor
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Ponto de conexão inicial do handshake WebSocket
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Em produção, travar isso para os domínios da vitrine
                .withSockJS(); // Fallback garantido para 2G/3G degradado
    }
}
