import { test, expect } from '@playwright/test';

test.describe('Home do Marketplace (V3) - Entrada da Plataforma', () => {
  test.beforeEach(async ({ page }) => {
    // Acessa a raiz (Home do Marketplace)
    await page.goto('/');
  });

  test('Deve renderizar o Header com o logotipo fluxohub', async ({ page }) => {
    const logo = page.locator('a', { hasText: /fluxohub/i });
    await expect(logo).toBeVisible();
  });

  test('Deve renderizar os filtros de categoria e título em destaque', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Lojas em Destaque' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Todas' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Roupas' })).toBeVisible();
  });

  test('Deve listar os cards de lojas cadastradas (StoreCards)', async ({ page }) => {
    // Busca por artigos (StoreCards)
    const storeCards = page.locator('article');
    await expect(storeCards).toHaveCount(4);

    // Valida propriedades do primeiro card
    const firstStore = storeCards.first();
    await expect(firstStore).toContainText('Sangue Latino');
    await expect(firstStore).toContainText('Roupas Femininas');
    // Valida Badge "Nova"
    await expect(firstStore.locator('text=Nova')).toBeVisible();
  });

  test('O clique em um StoreCard deve direcionar para a Vitrine da loja', async ({ page }) => {
    const firstStore = page.locator('article').first();
    await firstStore.click();
    
    // Como estamos na V3, a navegação para /[tenantSlug] deve carregar o header da Loja Modelo 
    // ou a página correspondente
    await expect(page).toHaveURL(/\/sangue-latino/);
  });
});
