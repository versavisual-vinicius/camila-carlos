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
* **Sombra Airbnb Card (Stitch)**: `0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)`.
* **Sombra Airbnb Header (Stitch)**: `0 1px 0 0 rgba(0, 0, 0, 0.06)`.
* **Sombra Airbnb Float (Stitch)**: `0 6px 20px rgba(0, 0, 0, 0.08)`.

### Tema Escuro (`.dark`)
* **Superfície Principal**: `--surface: #141312` (carvão escuro aveludado).
* **Superfície de Contêineres**: `--surface-container: #292624`.
* **Texto Primário**: `--on-surface: #f5f3f0`.
* **Texto Secundário**: `--on-surface-variant: #cdc5bc`.
* **Botões & Destaques Primários**: `--primary: #f5f3f0` com `--on-primary: #1c1a17`.
* **Acento Editorial Claro**: `--secondary: #d8c3b2`.
* **Borda Noturna**: `1px solid rgba(255, 255, 255, 0.08)`.
* **Sombra Airbnb Card Noturna**: `0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 6px rgba(0, 0, 0, 0.35), 0 4px 14px rgba(0, 0, 0, 0.5)`.

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

1. **Hero Banner & Contadores Triplos (Stitch Style)**:
   * Foto circular do casal com status pill de "Jornada Ativa" e pulse dot.
   * 3 contadores táteis: Fotos no acervo, Favoritas da Noiva e Fotos de Altar confirmadas.
2. **Card Editorial Tátil (`.editorial-card` / `.shadow-airbnb-card`)**:
   * Contorno sutil com elevação multicamada, transição `hover:-translate-y-0.5` e expansão de sombra.
3. **Roteiro & Marcos Integrados com Checklist**:
   * Blocos do cronograma da fotografia com ícone circular, status pill, divisão de equipe e Shot List com progresso e checklist interativo no altar.
   * Sidebar desktop de 4 colunas com Caderno de Inspirações e Resumo de Ações.
4. **Dock Inferior Móvel (`.glass-dock` / `.shadow-airbnb-float`)**:
   * Fixado na base com `backdrop-filter: blur(16px)` para navegação ágil com uma das mãos e indicador animado via Motion.
5. **Máscara de Fade de Rolagem (`.mask-scroll-fade-x`)**:
   * Gradiente nas extremidades para indicar rolagem horizontal contínua de abas.
6. **Masonry Grid Responsivo**:
   * Distribuição natural de fotos em alturas variáveis sem corte de proporção.
7. **Acessibilidade de Movimento (`prefers-reduced-motion`)**:
   * Reset automático de durações de transição e animação em dispositivos com sensibilidade a movimento configurada no sistema operacional.
8. **Exportação Executiva em PDF (Stitch Desktop & Mobile Reference)**:
   * Geração client-side via jsPDF do Dossiê Executivo completo e da Ficha Rápida de Altar para assessoria e cerimonial.

## 5. Consistência visual — auditoria de 30/09/2026

A referência Warm Editorial Marketplace orienta ritmo, hierarquia e ergonomia. A identidade canônica permanece Playfair Display para títulos e Inter para interface, com a paleta quente existente.

- Fontes base ficam em `@layer base`, permitindo que as classes de cada componente prevaleçam. Os pesos usados são carregados pelo `index.html`.
- Cores semânticas, incluindo `primary`, `on-primary`, `card`, `background` e `ring`, precisam estar registradas em `@theme` para gerar utilitários Tailwind.
- As quatro áreas usam `PageHeader`: títulos de 24 px no celular e 30 px a partir de 640 px; descrições de 14 px com entrelinha de 1,625. Referências Visuais é o padrão aprovado, inclusive para a Visão Geral.
- Intervalos entre blocos internos: 24 px no celular e 32 px em telas maiores. Tokens `space-lg` e `space-xl`: 24 e 32 px.
- Navegação superior completa aparece a partir de 1280 px. Abaixo disso, o dock mantém as quatro áreas acessíveis; o conteúdo reserva espaço inferior e considera a área segura do dispositivo.
- Diálogos respeitam a altura dinâmica da tela e permitem rolagem interna. A nova referência usa um único controle de fechar. No visualizador móvel, a imagem preserva sua proporção e as observações permanecem acessíveis por rolagem.

### Validação

- Quatro abas, dois temas e larguras de 320, 390, 768, 1024 e 1440 px: 40 combinações, sem rolagem horizontal da página ou erros JavaScript de execução.
- Janelas de nova referência, observações, visualizador de foto e compartilhamento verificadas em 320 × 568 px.
- Inspeção de capturas em celular, tablet e desktop; carregamento de Inter e Playfair Display confirmado no navegador.
- Build Vite, checagem TypeScript separada e `git diff --check`.
- Dados canônicos, fotos, marca, arquivos arquivados e formato de persistência preservados.

### Padrão comum entre páginas

Conforme a referência visual indicada por Vini, todas as quatro áreas compartilham a identidade do casal, seguida do mesmo cabeçalho de página. A Visão Geral deixa de usar um hero com escala própria.

- `PageHeader.tsx`: rótulo editorial, título, descrição, ações e divisor.
- `.page-stack`: intervalo de 24/32 px entre os blocos.
- `.editorial-panel`: preenchimento de 20/24 px, borda, raio e sombra comuns aos painéis textuais.
- `.editorial-section-title`: 20/24 px; `.editorial-card-title`: 16/18 px.
- `.editorial-body`: 14 px; `.editorial-caption`: 12 px. Etiquetas e contadores mantêm seus papéis próprios.
- Galeria, roteiro e catálogo mantêm suas estruturas funcionais. A altura dos blocos acompanha o conteúdo, sem alturas artificiais para igualar textos de comprimentos distintos.

Verificação complementar: as quatro áreas em 320, 390, 870 e 1440 px, nos dois temas; comparação dos estilos computados de títulos, descrições e intervalos, além de capturas na largura de 870 px usada na anotação de Vini.
