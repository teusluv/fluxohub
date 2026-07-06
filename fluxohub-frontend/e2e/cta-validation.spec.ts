import { test, expect } from '@playwright/test';

test.describe('Validação Interativa Padrão Ouro (CTA)', () => {
  
  test('Marketplace Home - Filtro e Navegação', async ({ page }) => {
    await page.goto('/');
    
    // Verifica Chips
    const btnRoupas = page.locator('button', { hasText: /^Roupas$/ });
    await expect(btnRoupas).toBeVisible();
    await btnRoupas.click();
    
    // Verifica se a URL mudou
    await expect(page).toHaveURL(/\/?categoria=roupas/);
    
    // Verifica se filtrou e clica na loja
    const storeLink = page.locator('a[href="/loja/sangue-latino"]').first();
    await expect(storeLink).toBeVisible();
    await storeLink.click();
    
    await expect(page).toHaveURL(/\/loja\/sangue-latino/);
  });

  test('Vitrine e Carrinho - Cálculo Atacado e Checkout', async ({ page }) => {
    // Acessa Produto Mock Direto
    await page.goto('/loja/sangue-latino/produto/1');
    
    // Varejo Inicial
    const preco = page.getByTestId('preco-ativo');
    await expect(preco).toHaveAttribute('data-tipo-preco', 'varejo');
    
    // Incrementa para bater Atacado (5 peças)
    const btnInc = page.getByTestId('btn-incrementar');
    for(let i=0; i<4; i++) await btnInc.click();
    
    // Verifica mudança
    await expect(preco).toHaveAttribute('data-tipo-preco', 'atacado');
    
    // Tenta adicionar sem variação (deve falhar)
    const btnAdd = page.getByTestId('btn-adicionar-carrinho');
    await btnAdd.click();
    await expect(page.getByTestId('erro-variacao')).toBeVisible();
    
    // Seleciona Variação (M) e adiciona
    await page.getByTestId('chip-variacao-M').click();
    await btnAdd.click();
    
    // Verifica Drawer abrindo indiretamente pela action ou clica no FAB
    const fab = page.getByTestId('fab-carrinho');
    await expect(fab).toBeVisible();
    await fab.click();
    
    const drawer = page.getByTestId('cart-drawer');
    await expect(drawer).toBeVisible();
    
    // Vai para checkout
    await page.getByTestId('btn-finalizar-pedido').click();
    await expect(page.getByTestId('checkout-form')).toBeVisible();
  });

  test('App Lojista - Formulário Relâmpago e Kanban', async ({ page }) => {
    // Novo Produto
    await page.goto('/dashboard/produtos/novo');
    
    // Tenta submit vazio
    await page.getByTestId('btn-salvar-produto').click();
    // Zod Validation deve aparecer via Sonner ou Span
    // Opcional: testar as spans de erro se preferir
    
    // Kanban Modal
    await page.goto('/dashboard/pedidos');
    const btnConfirm = page.getByTestId('btn-confirmar-pedido').first();
    await expect(btnConfirm).toBeVisible();
    await btnConfirm.click();
    
    // Verifica Modal
    const modalBtn = page.getByTestId('btn-modal-confirmar');
    await expect(modalBtn).toBeVisible();
    
    // Finaliza (Pode ter latência, então esperamos)
    await modalBtn.click();
    // Botão some após Loader
    await expect(modalBtn).toBeHidden({ timeout: 5000 });
  });
});
