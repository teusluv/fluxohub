# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: marketplace-accessibility.spec.ts >> Marketplace Accessibility (A11y) >> A página principal não deve ter violações de acessibilidade detectáveis no Light Mode
- Location: e2e\marketplace-accessibility.spec.ts:5:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 171

- Array []
+ Array [
+   Object {
+     "description": "Ensure buttons have discernible text",
+     "help": "Buttons must have discernible text",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/button-name?application=playwright",
+     "id": "button-name",
+     "impact": "critical",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": null,
+             "id": "button-has-visible-text",
+             "impact": "critical",
+             "message": "Element does not have inner text that is visible to screen readers",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-label",
+             "impact": "critical",
+             "message": "aria-label attribute does not exist or is empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "aria-labelledby",
+             "impact": "critical",
+             "message": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": Object {
+               "messageKey": "noAttr",
+             },
+             "id": "non-empty-title",
+             "impact": "critical",
+             "message": "Element has no title attribute",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "implicit-label",
+             "impact": "critical",
+             "message": "Element does not have an implicit (wrapped) <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "explicit-label",
+             "impact": "critical",
+             "message": "Element does not have an explicit <label>",
+             "relatedNodes": Array [],
+           },
+           Object {
+             "data": null,
+             "id": "presentational-role",
+             "impact": "critical",
+             "message": "Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element does not have inner text that is visible to screen readers
+   aria-label attribute does not exist or is empty
+   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
+   Element has no title attribute
+   Element does not have an implicit (wrapped) <label>
+   Element does not have an explicit <label>
+   Element's default semantics were not overridden with role=\"none\" or role=\"presentation\"",
+         "html": "<button class=\"absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".right-3",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.name-role-value",
+       "wcag2a",
+       "wcag412",
+       "section508",
+       "section508.22.a",
+       "TTv5",
+       "TT6.a",
+       "EN-301-549",
+       "EN-9.4.1.2",
+       "ACT",
+       "RGAAv4",
+       "RGAA-11.9.1",
+     ],
+   },
+   Object {
+     "description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming",
+     "help": "Zooming and scaling must not be disabled",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/meta-viewport?application=playwright",
+     "id": "meta-viewport",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": "user-scalable=no",
+             "id": "meta-viewport",
+             "impact": "moderate",
+             "message": "user-scalable=no on <meta> tag disables zooming on mobile devices",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   user-scalable=no on <meta> tag disables zooming on mobile devices",
+         "html": "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           "meta[name=\"viewport\"]",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.sensory-and-visual-cues",
+       "wcag2aa",
+       "wcag144",
+       "EN-301-549",
+       "EN-9.1.4.4",
+       "ACT",
+       "RGAAv4",
+       "RGAA-10.4.2",
+     ],
+   },
+   Object {
+     "description": "Ensure all page content is contained by landmarks",
+     "help": "All page content should be contained by landmarks",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/region?application=playwright",
+     "id": "region",
+     "impact": "moderate",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "isIframe": false,
+             },
+             "id": "region",
+             "impact": "moderate",
+             "message": "Some page content is not contained by landmarks",
+             "relatedNodes": Array [],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Some page content is not contained by landmarks",
+         "html": "<section class=\"bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center transition-colors\">",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".py-12",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.keyboard",
+       "best-practice",
+       "RGAAv4",
+       "RGAA-9.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - region "Notifications alt+T"
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - link "fluxohub." [ref=e7] [cursor=pointer]:
          - /url: /
        - generic [ref=e9]:
          - textbox "Busque por lojas, marcas ou categorias..." [ref=e10]
          - button [ref=e11] [cursor=pointer]:
            - img [ref=e12]
        - generic [ref=e15]:
          - button "Alternar tema" [ref=e16] [cursor=pointer]:
            - img [ref=e17]
          - generic [ref=e19]:
            - link "Venda Conosco" [ref=e20] [cursor=pointer]:
              - /url: /onboarding
            - link "Entrar" [ref=e21] [cursor=pointer]:
              - /url: /login
    - generic [ref=e23]:
      - heading "Descubra as melhores oportunidades do fluxohub" [level=1] [ref=e24]
      - paragraph [ref=e25]: Compre direto dos atacadistas com segurança, qualidade e os melhores preços do mercado.
    - main [ref=e26]:
      - generic [ref=e27]:
        - heading "Lojas em Destaque 4" [level=2] [ref=e29]:
          - text: Lojas em Destaque
          - generic [ref=e30]: "4"
        - generic [ref=e31]:
          - button "Todas" [ref=e32] [cursor=pointer]
          - button "Roupas" [ref=e33] [cursor=pointer]
          - button "Calçados" [ref=e34] [cursor=pointer]
          - button "Acessórios" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link [ref=e37] [cursor=pointer]:
          - /url: /loja/sangue-latino
          - article [ref=e38]:
            - generic [ref=e40]: Nova
            - generic [ref=e41]:
              - generic [ref=e43]: S
              - generic [ref=e44]:
                - heading "Sangue Latino" [level=3] [ref=e45]
                - paragraph [ref=e46]: Roupas
              - generic [ref=e47]:
                - generic [ref=e48]: 142 Produtos
                - generic [ref=e50]:
                  - text: Visitar
                  - generic [ref=e51]: →
        - link [ref=e52] [cursor=pointer]:
          - /url: /loja/atacadao-calcados
          - article [ref=e53]:
            - generic [ref=e55]:
              - generic [ref=e57]: A
              - generic [ref=e58]:
                - heading "Atacadão dos Calçados" [level=3] [ref=e59]
                - paragraph [ref=e60]: Calçados
              - generic [ref=e61]:
                - generic [ref=e62]: 56 Produtos
                - generic [ref=e64]:
                  - text: Visitar
                  - generic [ref=e65]: →
        - link [ref=e66] [cursor=pointer]:
          - /url: /loja/bella-bijoux
          - article [ref=e67]:
            - generic [ref=e69]: Nova
            - generic [ref=e70]:
              - generic [ref=e72]: B
              - generic [ref=e73]:
                - heading "Bella Bijoux" [level=3] [ref=e74]
                - paragraph [ref=e75]: Acessórios
              - generic [ref=e76]:
                - generic [ref=e77]: 310 Produtos
                - generic [ref=e79]:
                  - text: Visitar
                  - generic [ref=e80]: →
        - link [ref=e81] [cursor=pointer]:
          - /url: /loja/imperio-jeans
          - article [ref=e82]:
            - generic [ref=e84]:
              - generic [ref=e86]: I
              - generic [ref=e87]:
                - heading "Império do Jeans" [level=3] [ref=e88]
                - paragraph [ref=e89]: Roupas
              - generic [ref=e90]:
                - generic [ref=e91]: 89 Produtos
                - generic [ref=e93]:
                  - text: Visitar
                  - generic [ref=e94]: →
    - generic [ref=e95]:
      - paragraph [ref=e96]:
        - text: Nós usamos cookies e outras tecnologias para proporcionar a melhor experiência de navegação. Ao continuar navegando, significa que você concorda com a nossa
        - link "Política de Privacidade" [ref=e97] [cursor=pointer]:
          - /url: "#"
        - text: .
      - button "Aceitar e Continuar" [ref=e98] [cursor=pointer]
  - alert [ref=e99]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | test.describe('Marketplace Accessibility (A11y)', () => {
  5  |   test('A página principal não deve ter violações de acessibilidade detectáveis no Light Mode', async ({ page }) => {
  6  |     await page.goto('http://localhost:3000/');
  7  |     
  8  |     // Garante que o tema claro está ativo para o primeiro teste
  9  |     await page.evaluate(() => {
  10 |       localStorage.setItem('theme', 'light');
  11 |     });
  12 |     await page.reload();
  13 |     
  14 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  15 |     
  16 |     // Acessibilidade é crítica para o usuário final:
  17 |     // Isso testa contraste de cores, aria-labels, hierarquia de headings, etc.
> 18 |     expect(accessibilityScanResults.violations).toEqual([]);
     |                                                 ^ Error: expect(received).toEqual(expected) // deep equality
  19 |   });
  20 | 
  21 |   test('A página principal não deve ter violações de acessibilidade detectáveis no Dark Mode', async ({ page }) => {
  22 |     await page.goto('http://localhost:3000/');
  23 |     
  24 |     // Garante que o tema escuro está ativo
  25 |     await page.evaluate(() => {
  26 |       localStorage.setItem('theme', 'dark');
  27 |     });
  28 |     await page.reload();
  29 |     
  30 |     // Permite checar se as cores escuras que escolhemos têm contraste suficiente para daltônicos/baixa visão
  31 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  32 |     
  33 |     expect(accessibilityScanResults.violations).toEqual([]);
  34 |   });
  35 | });
  36 | 
```