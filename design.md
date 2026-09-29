# Design System Editorial — Camila & Carlos | Versa Visual

O Design System de **Camila & Carlos** combina a direção de arte autoral da **Versa Visual** — refinada, acolhedora, minimalista e focada em fotografia de alto padrão — com os princípios de ergonomia tátil e visual inspirados nas melhores experiências de curadoria contemporânea (Airbnb e Pinterest).

---

## 1. Filosofia Visual & Atmosfera

* **Fotografia como Protagonista**: A interface atua como uma moldura de galeria editorial. Elementos gráficos, botões e controles são discretos para dar ênfase máxima à expressão e à emoção das fotografias.
* **Paleta Quente & Acolhedora**: Fundo em tom marfim/linho claro (`#fbf9f6`) no tema diurno e preto carvão profundo (`#141312`) no tema escuro, evitando brancos estéreis (`#ffffff`) ou pretos puros (`#000000`) nas grandes áreas.
* **Tipografia Editorial Contrastada**: A nobreza de uma serifa clássica de revista (*Playfair Display*) nos títulos e cabeçalhos em harmonia com a precisão geométrica neutra de *Inter* para a interface, listas e formulários.
* **Sombras Trifásicas & Elevação Suave**: Cartões com elevação sutil em três camadas que criam profundidade natural de papel fotográfico, sem bordas pesadas.
* **Vidro Fosco (Glassmorphism)**: Barra de navegação móvel e cabeçalhos translúcidos com desfoque de fundo (`backdrop-filter: blur(16px)`).

---

## 2. Paleta de Cores e Tokens de Superfície

Os tokens estão definidos em [src/styles/theme.css](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/styles/theme.css) e mapeados no Tailwind CSS v4 via `@theme` em [src/styles/tailwind.css](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/styles/tailwind.css).

### Modo Claro (Padrão)

| Token | Valor Hex | Função Semântica |
|---|---|---|
| `--surface` | `#fbf9f6` | Fundo principal da página (linho quente) |
| `--surface-container` | `#efeeeb` | Superfície de controles, abas e chips inativos |
| `--surface-container-high`| `#eae8e5` | Hover de botões secundários e seletores |
| `--surface-container-highest` | `#e4e2df` | Divisores e bordas de separação sutis |
| `--on-surface` | `#1b1c1a` | Texto primário (quase preto quente, alto contraste) |
| `--on-surface-variant` | `#4b463f` | Texto secundário, descrições e metadados |
| `--primary` | `#1c1a17` | Ações principais, botões de destaque e abas ativas |
| `--on-primary` | `#ffffff` | Texto sobre elementos primários |
| `--secondary` | `#6c5b4d` | Acento terroso/bronze para badges e legendas |
| `--secondary-container`| `#f2dcca` | Fundo suave para destaques e tags selecionadas |
| `--accent` | `#f2dcca` | Realces e microinterações de foco |
| `--outline-variant` | `#cdc5bc` | Linhas de contorno e bordas finas |
| `--card` | `#ffffff` | Fundo de cartões de fotografia e modais |

### Modo Escuro (`.dark`)

| Token | Valor Hex | Função Semântica |
|---|---|---|
| `--surface` | `#141312` | Fundo principal da página (carvão escuro aveludado) |
| `--surface-container` | `#292624` | Fundo de controles, cards e containers |
| `--surface-container-high`| `#322e2b` | Superfície elevada e hover |
| `--on-surface` | `#f5f3f0` | Texto primário claro e legível |
| `--on-surface-variant` | `#cdc5bc` | Texto secundário e legendas |
| `--primary` | `#f5f3f0` | Ações principais invertidas no modo escuro |
| `--on-primary` | `#1c1a17` | Texto sobre elementos de ação primária |
| `--secondary` | `#d8c3b2` | Acento terroso claro |
| `--card` | `#191816` | Fundo dos cartões fotográficos |
| `--border` | `rgba(255, 255, 255, 0.1)` | Contornos discretos em fundos escuros |

### Identidade Institucional Versa Visual

* **Azul Petróleo / Teal da Marca**: `#5E7F8C` (utilizado no monograma e ícones oficiais em `public/brand-assets/`).

---

## 3. Tipografia

A tipografia do projeto é carregada via Google Fonts no [index.html](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/index.html) e estruturada em classes semânticas:

### Fontes Oficiais

1. **Playfair Display** (Serif):
   * Utilizada para: Títulos principais de seção, nomes dos noivos, chamadas de capa e numerais destacados de protocolo.
   * Pesos: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)` e variações itálicas.
   * Classes utilitárias: `font-headline-lg`, `font-headline-md`, `font-headline-sm`, `font-display`.

2. **Inter** (Sans-serif):
   * Utilizada para: Interface geral, botões, chips de abas, campos de formulário, títulos de fotos, descrição de tarefas e dados técnicos.
   * Pesos: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`.
   * Classes utilitárias: `font-body-md`, `font-body-lg`, `font-label-sm`, `font-label-md`, `font-title-sm`.

---

## 4. Componentes e Padrões de Elevação

### Cartão Editorial (`.editorial-card`)
Cartões fotográficos do moodboard e blocos de cronograma:
```css
.editorial-card {
  background-color: var(--card);
  border: var(--card-border);
  box-shadow: 0 4px 16px rgba(28, 26, 23, 0.04);
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s cubic-bezier(0.2, 0, 0, 1);
}

.editorial-card:hover {
  box-shadow: 0 12px 32px rgba(28, 26, 23, 0.06);
  transform: translateY(-2px);
}
```

### Dock Móvel com Vidro Fosco (`.glass-dock`)
Fixado na base da tela em dispositivos móveis (`MobileBottomDock.tsx`), garantindo navegação com uma das mãos com compensação para áreas seguras do iOS (`safe-area-inset-bottom`):
```css
.glass-dock {
  background-color: rgba(251, 249, 246, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dark .glass-dock {
  background-color: rgba(20, 19, 18, 0.88);
}
```

### Máscara de Desfoque de Scroll Horizontal (`.mask-scroll-fade-x`)
Aplicada em containers com rolagem horizontal (filtros de abas e chips de categoria):
```css
.mask-scroll-fade-x {
  -webkit-mask-image: linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent);
  mask-image: linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent);
}
```

---

## 5. Layout e Responsividade

A aplicação adota arquitetura **Mobile First** com breakpoints Tailwind CSS:

| Breakpoint | Largura Mínima | Comportamento no Moodboard & Roteiro |
|---|---|---|
| **Mobile** | `< 640px` | Layout em coluna única ou 2 colunas Masonry compactas; dock inferior móvel ativo; header simplificado |
| **Tablet** (`sm` a `md`) | `640px – 1024px` | 2 a 3 colunas Masonry; abas de navegação no header visíveis; visualização de cronograma em cards duplos |
| **Desktop** (`lg` a `xl`) | `> 1024px` | 3 a 4 colunas Masonry; dock inferior ocultado; barra de navegação no topo com contadores de favoritas e pendências |

---

## 6. Diretrizes de Usabilidade e Estética

1. **Evitar Preto Puro em Fundos**: Utilize sempre os tokens `--surface` ou `--surface-container` para preservar a sensação tátil e aveludada do design.
2. **Respeitar os Raios de Arredondamento**:
   * Botões de ação e chips: `rounded-full` ou `rounded-lg` (8px).
   * Cartões fotográficos e modais: `rounded-2xl` (16px) a `rounded-3xl` (24px).
   * Controles circulares de navegação e botões flutuantes: `rounded-full`.
3. **Microinterações em Ações Sensíveis**: Ações como favoritar foto ou concluir item da Shot List devem disparar feedback imediato via Sonner toast e atualização visual reativa.
4. **Sem Perda de Dados em Uploads**: Todas as imagens adicionadas pelo usuário passam pela função `compressImageFile` (Canvas 1600px/0.82) antes de persistir no `localStorage`.
