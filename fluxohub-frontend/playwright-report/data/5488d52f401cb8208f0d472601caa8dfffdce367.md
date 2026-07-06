# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: marketplace-accessibility.spec.ts >> Marketplace Accessibility (A11y) >> A página principal não deve ter violações de acessibilidade detectáveis no Dark Mode
- Location: e2e\marketplace-accessibility.spec.ts:21:7

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 448

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
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f9fafb",
+               "contrastRatio": 1.03,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f5f6f7",
+               "fontSize": "13.5pt (18px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.03 (foreground color: #f5f6f7, background color: #f9fafb, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden\" style=\"opacity: 0; transform: scale(0.951487);\">",
+                 "target": Array [
+                   "a[href$=\"sangue-latino\"] > article",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors\">",
+                 "target": Array [
+                   ".min-h-screen",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.03 (foreground color: #f5f6f7, background color: #f9fafb, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h3 class=\"text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-1\">Sangue Latino</h3>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"sangue-latino\"] > article > .pb-6.pt-0.px-6 > .min-w-0.flex-1 > h3",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f9fafb",
+               "contrastRatio": 1.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f6f8f9",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.01 (foreground color: #f6f8f9, background color: #f9fafb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden\" style=\"opacity: 0; transform: scale(0.951487);\">",
+                 "target": Array [
+                   "a[href$=\"sangue-latino\"] > article",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors\">",
+                 "target": Array [
+                   ".min-h-screen",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.01 (foreground color: #f6f8f9, background color: #f9fafb, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"text-sm font-medium text-gray-500 dark:text-gray-400 mt-1\">Roupas</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"sangue-latino\"] > article > .pb-6.pt-0.px-6 > .min-w-0.flex-1 > .font-medium.mt-1",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f9fafb",
+               "contrastRatio": 1.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f7f8fa",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.01 (foreground color: #f7f8fa, background color: #f9fafb, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden\" style=\"opacity: 0; transform: scale(0.951487);\">",
+                 "target": Array [
+                   "a[href$=\"sangue-latino\"] > article",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors\">",
+                 "target": Array [
+                   ".min-h-screen",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.01 (foreground color: #f7f8fa, background color: #f9fafb, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5\"><span class=\"w-1.5 h-1.5 rounded-full bg-green-500\"></span>142<!-- --> Produtos</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"sangue-latino\"] > article > .pb-6.pt-0.px-6 > .mt-6.pt-4.border-t > .dark\\:text-gray-500.gap-1\\.5.text-gray-400",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#f9fafb",
+               "contrastRatio": 1.03,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f5f6f7",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.03 (foreground color: #f5f6f7, background color: #f9fafb, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"group flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl transition-all duration-300 cursor-pointer relative overflow-hidden\" style=\"opacity: 0; transform: scale(0.951487);\">",
+                 "target": Array [
+                   "a[href$=\"sangue-latino\"] > article",
+                 ],
+               },
+               Object {
+                 "html": "<div class=\"min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors\">",
+                 "target": Array [
+                   ".min-h-screen",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.03 (foreground color: #f5f6f7, background color: #f9fafb, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-xs font-bold text-black dark:text-white uppercase flex items-center group-hover:translate-x-1 transition-transform\">Visitar <span class=\"ml-1 text-red-600 dark:text-red-500\">→</span></span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "a[href$=\"sangue-latino\"] > article > .pb-6.pt-0.px-6 > .mt-6.pt-4.border-t > .group-hover\\:translate-x-1.transition-transform.text-black",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
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
+         "html": "<p class=\"text-xs sm:text-sm text-gray-600 flex-1\">Nós usamos cookies e outras tecnologias para proporcionar a melhor experiência de navegação. Ao continuar navegando, significa que você concorda com a nossa <a href=\"#\" class=\"underline text-black font-semibold\">Política de Privacidade</a>.</p>",
+         "impact": "moderate",
+         "none": Array [],
+         "target": Array [
+           ".sm\\:text-sm",
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
          - button [ref=e20] [cursor=pointer]:
            - img [ref=e21]
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
  18 |     expect(accessibilityScanResults.violations).toEqual([]);
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
> 33 |     expect(accessibilityScanResults.violations).toEqual([]);
     |                                                 ^ Error: expect(received).toEqual(expected) // deep equality
  34 |   });
  35 | });
  36 | 
```