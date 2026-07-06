import { test, expect } from '@playwright/test';

test.describe('Vitrine Pública (V2) - Estética Editorial', () => {
  test.beforeEach(async ({ page }) => {
    // Acessa a raiz de um tenant hipotético
    await page.goto('/loja-exemplo');
  });

  test('Deve carregar o StoreHeader com logotipo ou título e faixa de benefícios', async ({ page }) => {
    // Valida faixa superior (frete grátis/atacado)
    await expect(page.locator('text=Compre no Atacado e economize')).toBeVisible();
    
    // Valida Nome da Loja Centralizado
    await expect(page.locator('h1')).toContainText('LOJA MODELO');
  });

  test('Deve exibir o Banner Hero com o botão Shop Now', async ({ page }) => {
    // Banner Principal
    await expect(page.locator('h2', { hasText: 'Meu Interior' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Shop Now' })).toBeVisible();
  });

  test('Deve listar os diferenciais (Compra Segura, Troca Fácil)', async ({ page }) => {
    await expect(page.locator('text=Compra Segura')).toBeVisible();
    await expect(page.locator('text=Troca Fácil')).toBeVisible();
  });

  test('Deve renderizar a Grade de Produtos com pelo menos um item', async ({ page }) => {
    // Espera que o cabeçalho "Novidades" esteja visível
    await expect(page.locator('h2', { hasText: 'Novidades' })).toBeVisible();

    // Valida se os cards estão aparecendo e possuem formato correto
    const productCards = page.locator('article');
    await expect(productCards).toHaveCount(4); // Temos 4 mockados

    // Verifica item específico e se possui preço varejo
    const firstProduct = productCards.first();
    await expect(firstProduct).toContainText('R$ 299.90');
  });

  test('Deve exibir o LGPD Banner e permitir o Aceite', async ({ page }) => {
    const lgpdBanner = page.locator('text=Nós usamos cookies');
    await expect(lgpdBanner).toBeVisible();

    const acceptBtn = page.locator('button', { hasText: 'Aceitar e Continuar' });
    await expect(acceptBtn).toBeVisible();

    await acceptBtn.click();

    // Deve sumir da tela
    await expect(lgpdBanner).not.toBeVisible();
  });
});
