import { test, expect } from '@playwright/test';

test.describe('Theme Toggle E2E', () => {
  test('Deve alternar entre modo claro e escuro e persistir estado', async ({ page }) => {
    // 1. Acessar a página inicial
    await page.goto('http://localhost:3000/');
    
    // Opcional: Esperar a hidratação terminar (botão ThemeToggle visível)
    const themeButton = page.getByRole('switch');
    await expect(themeButton).toBeVisible();

    // 2. Verificar estado inicial baseado no defaultTheme="system"
    // Vamos assumir que o Playwright em ambiente CI pode inicializar como claro ou escuro.
    // Vamos focar no clique do botão.
    const isDarkBefore = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    
    // 3. Clicar no botão para alternar
    await themeButton.click();
    
    // 4. Verificar se a classe 'dark' do HTML foi alternada
    const isDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDarkAfter).not.toBe(isDarkBefore);

    // 5. Verificar Persistência (Reload da página)
    await page.reload();
    const isDarkAfterReload = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDarkAfterReload).toBe(isDarkAfter); // Deve manter o estado após recarregar
  });
});
