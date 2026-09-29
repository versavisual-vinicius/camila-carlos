# Design System Editorial — Versa Visual (`camila-carlos`)

> **Referência Canônica**: Este arquivo documenta as diretrizes visuais e tokens do projeto. O arquivo [design.md](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/design.md) contém o espelho detalhado com o guia de componentes.

---

## 1. Identidade e Atmosfera Editorial

O design deste projeto estabelece um equilíbrio entre a estética autoral da **Versa Visual** (luxo silencioso, tipografia refinada e valorização absoluta da fotografia) e a ergonomia de curadoria moderna (cards táteis com elevação em 3 camadas e microinterações fluidas).

---

## 2. Tokens de Cor e Superfície

Valores declarados em [src/styles/theme.css](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/styles/theme.css):

### Tema Claro (`:root`)
* **Superfície Principal**: `--surface: #fbf9f6` (linho quente e acolhedor).
* **Superfície de Contêineres**: `--surface-container: #efeeeb`.
* **Superfície Elevada**: `--surface-container-high: #eae8e5`.
* **Texto Primário**: `--on-surface: #1b1c1a` (quase preto quente, alto contraste).
* **Texto Secundário**: `--on-surface-variant: #4b463f`.
* **Botões & Destaques Primários**: `--primary: #1c1a17` com `--on-primary: #ffffff`.
* **Acento Editorial / Bronze**: `--secondary: #6c5b4d` e `--secondary-container: #f2dcca`.
* **Borda Sutil**: `--card-border: 1px solid rgba(28, 26, 23, 0.08)`.
* **Sombra de Card**: `0 4px 16px rgba(28, 26, 23, 0.04)`.
* **Sombra ao Hover**: `0 12px 32px rgba(28, 26, 23, 0.06)`.

### Tema Escuro (`.dark`)
* **Superfície Principal**: `--surface: #141312` (carvão escuro aveludado).
* **Superfície de Contêineres**: `--surface-container: #292624`.
* **Texto Primário**: `--on-surface: #f5f3f0`.
* **Texto Secundário**: `--on-surface-variant: #cdc5bc`.
* **Botões & Destaques Primários**: `--primary: #f5f3f0` com `--on-primary: #1c1a17`.
* **Acento Editorial Claro**: `--secondary: #d8c3b2`.
* **Borda Noturna**: `1px solid rgba(255, 255, 255, 0.08)`.

### Acento da Marca
* **Versa Visual Teal**: `#5E7F8C` (aplicado nos ícones institucionais e favicons).

---

## 3. Tipografia Pareada

* **Display & Títulos**: `Playfair Display` (serif clássica, sofisticada).
  * Pesos: 400, 500, 600 e itálicos.
  * Uso: Nomes dos noivos, cabeçalhos de tela, numerais de grupo da shot list.
* **Corpo & Interface**: `Inter` (sans-serif neutra e de alta legibilidade).
  * Pesos: 400, 500, 600, 700.
  * Uso: Rótulos de botões, tags, notas da noiva, metadados e listagens.

---

## 4. Componentes Chave

1. **Card Editorial (`.editorial-card`)**:
   * Elevação suave com transição `translateY(-2px)` e expansão de sombra no hover.
2. **Dock Inferior Móvel (`.glass-dock`)**:
   * Fixado na base com `backdrop-filter: blur(16px)` para navegação ágil com uma das mãos.
3. **Máscara de Fade de Rolagem (`.mask-scroll-fade-x`)**:
   * Gradiente nas extremidades para indicar rolagem horizontal contínua de abas.
4. **Masonry Grid Responsivo**:
   * Distribuição natural de fotos em alturas variáveis sem corte de proporção.
