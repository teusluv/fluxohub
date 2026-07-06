-- V1__init_fluxohub_schema_v3.sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    whatsapp_number VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE store_config (
    tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
    accent_color VARCHAR(7) DEFAULT '#000000',
    logo_url TEXT,
    banner_url TEXT,
    banner_text VARCHAR(255),
    category VARCHAR(100),
    auto_approve BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price_retail DECIMAL(10, 2) NOT NULL,
    price_wholesale DECIMAL(10, 2),
    wholesale_min_quantity INT DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    size VARCHAR(10),
    color VARCHAR(50),
    stock INT NOT NULL DEFAULT 0,
    UNIQUE(product_id, size, color)
);

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_variation_id UUID REFERENCES product_variations(id),
    quantity INT NOT NULL
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    delivery_method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_variation_id UUID REFERENCES product_variations(id),
    tenant_id UUID REFERENCES tenants(id) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

CREATE INDEX idx_products_tenant ON products(tenant_id);
CREATE INDEX idx_orders_tenant ON orders(tenant_id);

-- Ativação do Row-Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_config ENABLE ROW LEVEL SECURITY;

-- Política de Isolamento Multi-Tenant:
-- Impede manipulação ou leitura caso o tenant_id não coincida com a variável de sessão 'app.current_tenant' do backend.
CREATE POLICY tenant_isolation_products ON products
    USING (tenant_id = NULLIF(current_setting('app.current_tenant', TRUE), '')::UUID);
    
CREATE POLICY tenant_isolation_orders ON orders
    USING (tenant_id = NULLIF(current_setting('app.current_tenant', TRUE), '')::UUID);

CREATE POLICY tenant_isolation_store_config ON store_config
    USING (tenant_id = NULLIF(current_setting('app.current_tenant', TRUE), '')::UUID);
