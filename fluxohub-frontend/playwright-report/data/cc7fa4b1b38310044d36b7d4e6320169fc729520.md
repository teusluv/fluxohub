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
+ Received  + 241

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
+         "html": "<button class=\"md:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".md\\:hidden",
+         ],
+       },
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
+         "html": "<button class=\"sm:hidden text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white pl-2\">",
+         "impact": "critical",
+         "none": Array [],
+         "target": Array [
+           ".sm\\:hidden",
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
        - generic [ref=e8]:
          - button [ref=e9] [cursor=pointer]:
            - img [ref=e10]
          - button "Alternar tema" [ref=e13] [cursor=pointer]:
            - img [ref=e14]
          - button [ref=e16] [cursor=pointer]:
            - img [ref=e17]
    - generic [ref=e19]:
      - heading "Descubra as melhores oportunidades do fluxohub" [level=1] [ref=e20]
      - paragraph [ref=e21]: Compre direto dos atacadistas com segurança, qualidade e os melhores preços do mercado.
    - main [ref=e22]:
      - generic [ref=e23]:
        - heading "Lojas em Destaque 4" [level=2] [ref=e25]:
          - text: Lojas em Destaque
          - generic [ref=e26]: "4"
        - generic [ref=e27]:
          - button "Todas" [ref=e28] [cursor=pointer]
          - button "Roupas" [ref=e29] [cursor=pointer]
          - button "Calçados" [ref=e30] [cursor=pointer]
          - button "Acessórios" [ref=e31] [cursor=pointer]
      - generic [ref=e32]:
        - link [ref=e33] [cursor=pointer]:
          - /url: /loja/sangue-latino
          - article [ref=e34]:
            - generic [ref=e36]: Nova
            - generic [ref=e37]:
              - generic [ref=e39]: S
              - generic [ref=e40]:
                - heading "Sangue Latino" [level=3] [ref=e41]
                - paragraph [ref=e42]: Roupas
              - generic [ref=e43]:
                - generic [ref=e44]: 142 Produtos
                - generic [ref=e46]:
                  - text: Visitar
                  - generic [ref=e47]: →
        - link [ref=e48] [cursor=pointer]:
          - /url: /loja/atacadao-calcados
          - article [ref=e49]:
            - generic [ref=e51]:
              - generic [ref=e53]: A
              - generic [ref=e54]:
                - heading "Atacadão dos Calçados" [level=3] [ref=e55]
                - paragraph [ref=e56]: Calçados
              - generic [ref=e57]:
                - generic [ref=e58]: 56 Produtos
                - generic [ref=e60]:
                  - text: Visitar
                  - generic [ref=e61]: →
        - link [ref=e62] [cursor=pointer]:
          - /url: /loja/bella-bijoux
          - article [ref=e63]:
            - generic [ref=e65]: Nova
            - generic [ref=e66]:
              - generic [ref=e68]: B
              - generic [ref=e69]:
                - heading "Bella Bijoux" [level=3] [ref=e70]
                - paragraph [ref=e71]: Acessórios
              - generic [ref=e72]:
                - generic [ref=e73]: 310 Produtos
                - generic [ref=e75]:
                  - text: Visitar
                  - generic [ref=e76]: →
        - link [ref=e77] [cursor=pointer]:
          - /url: /loja/imperio-jeans
          - article [ref=e78]:
            - generic [ref=e80]:
              - generic [ref=e82]: I
              - generic [ref=e83]:
                - heading "Império do Jeans" [level=3] [ref=e84]
                - paragraph [ref=e85]: Roupas
              - generic [ref=e86]:
                - generic [ref=e87]: 89 Produtos
                - generic [ref=e89]:
                  - text: Visitar
                  - generic [ref=e90]: →
    - generic [ref=e91]:
      - paragraph [ref=e92]:
        - text: Nós usamos cookies e outras tecnologias para proporcionar a melhor experiência de navegação. Ao continuar navegando, significa que você concorda com a nossa
        - link "Política de Privacidade" [ref=e93] [cursor=pointer]:
          - /url: "#"
        - text: .
      - button "Aceitar e Continuar" [ref=e94] [cursor=pointer]
  - alert [ref=e95]
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