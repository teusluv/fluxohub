import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Marketplace Accessibility (A11y)', () => {
  test('A página principal não deve ter violações de acessibilidade detectáveis no Light Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Garante que o tema claro está ativo para o primeiro teste
    await page.evaluate(() => {
      localStorage.setItem('theme', 'light');
    });
    await page.reload();
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // Acessibilidade é crítica para o usuário final:
    // Isso testa contraste de cores, aria-labels, hierarquia de headings, etc.
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('A página principal não deve ter violações de acessibilidade detectáveis no Dark Mode', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Garante que o tema escuro está ativo
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.reload();
    
    // Permite checar se as cores escuras que escolhemos têm contraste suficiente para daltônicos/baixa visão
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
