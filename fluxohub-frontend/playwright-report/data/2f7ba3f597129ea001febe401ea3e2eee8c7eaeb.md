# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: theme-toggle.spec.ts >> Theme Toggle E2E >> Deve alternar entre modo claro e escuro e persistir estado
- Location: e2e\theme-toggle.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('switch')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('switch')

```

```yaml
- region "Notifications alt+T"
- banner:
  - link "fluxohub.":
    - /url: /
  - button
  - button "Alternar tema"
  - button
- heading "Descubra as melhores oportunidades do fluxohub" [level=1]
- paragraph: Compre direto dos atacadistas com segurança, qualidade e os melhores preços do mercado.
- main:
  - heading "Lojas em Destaque 4" [level=2]
  - button "Todas"
  - button "Roupas"
  - button "Calçados"
  - button "Acessórios"
  - link:
    - /url: /loja/sangue-latino
    - article:
      - text: Nova S
      - heading "Sangue Latino" [level=3]
      - paragraph: Roupas
      - text: 142 Produtos Visitar →
  - link:
    - /url: /loja/atacadao-calcados
    - article:
      - text: A
      - heading "Atacadão dos Calçados" [level=3]
      - paragraph: Calçados
      - text: 56 Produtos Visitar →
  - link:
    - /url: /loja/bella-bijoux
    - article:
      - text: Nova B
      - heading "Bella Bijoux" [level=3]
      - paragraph: Acessórios
      - text: 310 Produtos Visitar →
  - link:
    - /url: /loja/imperio-jeans
    - article:
      - text: I
      - heading "Império do Jeans" [level=3]
      - paragraph: Roupas
      - text: 89 Produtos Visitar →
- paragraph:
  - text: Nós usamos cookies e outras tecnologias para proporcionar a melhor experiência de navegação. Ao continuar navegando, significa que você concorda com a nossa
  - link "Política de Privacidade":
    - /url: "#"
  - text: .
- button "Aceitar e Continuar"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Theme Toggle E2E', () => {
  4  |   test('Deve alternar entre modo claro e escuro e persistir estado', async ({ page }) => {
  5  |     // 1. Acessar a página inicial
  6  |     await page.goto('http://localhost:3000/');
  7  |     
  8  |     // Opcional: Esperar a hidratação terminar (botão ThemeToggle visível)
  9  |     const themeButton = page.getByRole('switch');
> 10 |     await expect(themeButton).toBeVisible();
     |                               ^ Error: expect(locator).toBeVisible() failed
  11 | 
  12 |     // 2. Verificar estado inicial baseado no defaultTheme="system"
  13 |     // Vamos assumir que o Playwright em ambiente CI pode inicializar como claro ou escuro.
  14 |     // Vamos focar no clique do botão.
  15 |     const isDarkBefore = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  16 |     
  17 |     // 3. Clicar no botão para alternar
  18 |     await themeButton.click();
  19 |     
  20 |     // 4. Verificar se a classe 'dark' do HTML foi alternada
  21 |     const isDarkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  22 |     expect(isDarkAfter).not.toBe(isDarkBefore);
  23 | 
  24 |     // 5. Verificar Persistência (Reload da página)
  25 |     await page.reload();
  26 |     const isDarkAfterReload = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  27 |     expect(isDarkAfterReload).toBe(isDarkAfter); // Deve manter o estado após recarregar
  28 |   });
  29 | });
  30 | 
```