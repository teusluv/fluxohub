import { test, expect } from '@playwright/test';

test.describe('App do Lojista (V3) - Kanban Real-Time', () => {
  test.beforeEach(async ({ page }) => {
    // Acessa o painel de pedidos do Lojista
    await page.goto('/dashboard/pedidos');
  });

  test('Deve renderizar o Kanban com os indicadores de status de Conexão WebSocket', async ({ page }) => {
    const title = page.locator('h1', { hasText: 'Pedidos em Tempo Real' });
    await expect(title).toBeVisible();

    // Como não subimos o Java no test runner local, ele deve tentar conectar ou falhar e mostrar Reconectando.
    // Mas o ícone ou texto de rede deve aparecer.
    const networkStatus = page.locator('text=Reconectando...').or(page.locator('text=Conectado'));
    await expect(networkStatus).toBeVisible();
  });

  test('Deve exibir as colunas Pendente e Concluído', async ({ page }) => {
    await expect(page.locator('text=Pendentes')).toBeVisible();
    await expect(page.locator('text=Concluídos')).toBeVisible();
  });

  test('Deve permitir visualizar os cards mockados iniciais', async ({ page }) => {
    // Temos cards mockados: Maria Silva e João Pedro
    await expect(page.locator('text=Maria Silva')).toBeVisible();
    await expect(page.locator('text=João Pedro')).toBeVisible();
  });
});
