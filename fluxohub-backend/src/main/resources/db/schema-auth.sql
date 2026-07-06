-- =====================================================================================
-- fluxohub AUTHCORE: Esquema de Banco de Dados de Identidade & Segurança
-- Executar no PostgreSQL (Necessita da extensão pgcrypto para gen_random_uuid)
-- =====================================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criação da tabela base de tenants (caso ainda não exista no schema principal)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 1. IDENTIDADE CENTRAL (Usuários)
-- ==========================================
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),                    -- NULL para usuários OAuth-only
  name          VARCHAR(255) NOT NULL,
  role          VARCHAR(50) NOT NULL DEFAULT 'CLIENTE'
                  CHECK (role IN ('CLIENTE', 'LOJISTA', 'ADMIN_PLATAFORMA')),
  tenant_id     UUID REFERENCES tenants(id),    -- NULL para CLIENTE e ADMIN
  avatar_url    VARCHAR(500),
  
  -- Flags de Estado
  is_active     BOOLEAN NOT NULL DEFAULT true,
  is_verified   BOOLEAN NOT NULL DEFAULT false,
  
  -- Proteção contra Força Bruta
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until  TIMESTAMPTZ,
  
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 2. GESTÃO DE SESSÕES (Refresh Tokens)
-- ==========================================
CREATE TABLE refresh_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash    VARCHAR(255) NOT NULL UNIQUE,  -- Hash do token para evitar roubo por dump de BD
  device_info   JSONB,                          -- Metadados de sessão (OS, Browser, IP)
  expires_at    TIMESTAMPTZ NOT NULL,
  revoked_at    TIMESTAMPTZ,                    -- Preenchido = Sessão inválida/encerrada
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 3. RECUPERAÇÃO E VERIFICAÇÃO (One-time Tokens)
-- ==========================================
CREATE TABLE verification_tokens (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash    VARCHAR(255) NOT NULL UNIQUE,
  type          VARCHAR(50) NOT NULL CHECK (type IN ('EMAIL_VERIFY', 'PASSWORD_RESET')),
  expires_at    TIMESTAMPTZ NOT NULL,
  used_at       TIMESTAMPTZ,                    -- Controle de Single-Use
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==========================================
-- 4. LOGIN SOCIAL (OAuth Providers)
-- ==========================================
CREATE TABLE oauth_providers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider      VARCHAR(50) NOT NULL CHECK (provider IN ('google', 'facebook', 'apple')),
  provider_uid  VARCHAR(255) NOT NULL,
  email         VARCHAR(255),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, provider_uid)
);

-- ==========================================
-- ÍNDICES DE PERFORMANCE E SEGURANÇA
-- ==========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tenant ON users(tenant_id) WHERE tenant_id IS NOT NULL;
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id) WHERE revoked_at IS NULL;
CREATE INDEX idx_verification_tokens_hash ON verification_tokens(token_hash) WHERE used_at IS NULL;

-- ==========================================
-- POLÍTICAS RLS (Row-Level Security)
-- ==========================================
-- Exige que o DB entenda a variável app.current_tenant_id definida no Aspect/Filtro
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON users
  USING (
    -- Admins podem ver tudo
    role = 'ADMIN_PLATAFORMA'
    OR
    -- Clientes não são isolados por tenant (podem comprar de várias lojas)
    role = 'CLIENTE'
    OR
    -- Lojistas só acessam dados associados à própria loja (tenant_id configurado no context)
    tenant_id = current_setting('app.current_tenant_id', true)::UUID
  );

-- Trigger para manter updated_at sincronizado
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
