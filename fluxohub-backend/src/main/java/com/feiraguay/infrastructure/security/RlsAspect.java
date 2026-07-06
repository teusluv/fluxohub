package com.fluxohub.infrastructure.security;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class RlsAspect {

    private final JdbcTemplate jdbcTemplate;

    public RlsAspect(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Intercepta qualquer método de repositório Spring Data JPA antes da execução
    @Before("execution(* org.springframework.data.repository.Repository+.*(..))")
    public void setRlsContext() {
        String tenantId = TenantContext.getTenantId();
        if (tenantId != null) {
            // Injeta o Tenant ID no PostgreSQL para ativar a Row-Level Security
            jdbcTemplate.execute("SET LOCAL app.current_tenant = '" + tenantId + "'");
        } else {
            // Em caso de operação global sem tenant, reseta a variável para não sujar a conexão do pool
            jdbcTemplate.execute("SET LOCAL app.current_tenant = ''");
        }
    }
}
