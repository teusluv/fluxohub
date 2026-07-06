import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────
// VITRINE DO CLIENTE
// ─────────────────────────────────────────

test.describe('Vitrine — Interatividade de Produto', () => {

  test('CTA-01: Deve adicionar produto ao carrinho e atualizar badge', async ({ page }) => {
    await page.goto('/loja/loja-teste/produto/1');

    // Seleciona uma variação disponível
    await page.click('[data-testid="chip-variacao-M"]');

    // Clica no botão de adicionar ao carrinho
    await page.click('[data-testid="btn-adicionar-carrinho"]');

    // Verifica feedback visual de sucesso (animação Framer Motion conclui)
    await expect(page.locator('[data-testid="toast-sucesso"]')).toBeVisible();

    // Verifica persistência no localStorage
    const cartData = await page.evaluate(() => localStorage.getItem('fluxohub-cart'));
    expect(cartData).toBeTruthy();
  });

  test('CTA-01: Deve bloquear adição ao carrinho com estoque zero', async ({ page }) => {
    // A rota do produto com estoque zerado no mock ou manipulando a resposta
    await page.goto('/loja/loja-teste/produto/1');

    // Clica na variação G que está zerada no mock
    await page.click('[data-testid="chip-variacao-G"]');

    const btnAdicionar = page.locator('[data-testid="chip-variacao-G"]');
    await expect(btnAdicionar).toBeDisabled();
    await expect(page.locator('[data-testid="tag-esgotado"]').first()).toBeVisible();
  });
});

// ─────────────────────────────────────────
// CART DRAWER E CHECKOUT
// ─────────────────────────────────────────

test.describe('CheckoutForm — Validação e Submissão', () => {
  test('CTA-02: Deve bloquear envio com campos obrigatórios vazios', async ({ page }) => {
    await page.goto('/loja/loja-teste');
    
    // Força inserção no localStorage
    await page.evaluate(() => {
      localStorage.setItem('fluxohub-cart', JSON.stringify({ state: { items: [{ id: '1', quantity: 1, price: 50 }] } }));
    });
    
    await page.reload();
    await page.click('[data-testid="fab-carrinho"]');
    await page.click('[data-testid="btn-finalizar-pedido"]');
    
    // Tenta confirmar vazio
    await page.click('[data-testid="btn-confirmar-whatsapp"]');

    await expect(page.locator('[data-testid="erro-nome"]')).toBeVisible();
    await expect(page.locator('[data-testid="erro-telefone"]')).toBeVisible();
  });
});

test.describe('Filtros Home', () => {
  test('CTA-06: Home Marketplace multi-seleção', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Roupas")');
    await expect(page).toHaveURL(/\?categoria=roupas/);
    
    await page.click('button:has-text("Calçados")');
    await expect(page).toHaveURL(/\?categoria=roupas,cal%C3%A7ados/);
  });
});
