# Camila & Carlos — Planejamento Executivo & Moodboard Editorial

Aplicação web interativa desenvolvida sob a direção artística e fotográfica da **Versa Visual** ([@v1ncsc](https://instagram.com/v1ncsc)) para o casamento e ensaio pré-wedding de **Camila & Carlos** em Rio das Ostras e Região dos Lagos / RJ.

O sistema unifica a curadoria visual de referências, o roteiro fotográfico protocolar com divisão de equipe e o catálogo executivo de fornecedores e locais, oferecendo uma experiência tátil, fluida e adaptada tanto para os noivos quanto para a equipe de cerimonial e fotografia.

---

## 📌 Visão Geral dos Módulos

A aplicação é organizada em três abas essenciais de navegação:

### 1. Referências Visuais (`referencias`)
* **Acervo Curado**: 58 fotografias oficiais em alta definição selecionadas para o Pré-Wedding de Camila & Carlos, dispostas em layout *Masonry* responsivo.
* **Favoritas & Filtros**: Sistema de marcação de fotos favoritas (coração) com filtro instantâneo e busca por texto em tempo real (título, descrição e notas da noiva).
* **Notas Contextuais da Noiva (`PhotoNoteDrawer`)**: Gaveta lateral acessível por foto que permite à noiva adicionar tags rápidas (`#pose`, `#luz`, `#detalhe`, `#espontanea`, etc.) e comentários personalizados.
* **Lightbox Editorial (`LightboxModal`)**: Visualização imersiva em tela cheia com navegação por teclado (setas), status de favorita e edição inline de notas.
* **Upload em Lote com Compressão Retina**: Upload de novas referências diretamente pelo navegador com compressão automática em Canvas (máximo 1600px a 82% de qualidade JPEG), reduzindo fotos de 15MB para ~150KB para persistência instantânea no `localStorage`. Inclui notificação com ação "Desfazer" via Sonner.
* **Restauração de Acervo**: Botão com confirmação para restaurar as 58 fotos originais do acervo.

### 2. Roteiro da Fotografia (`roteiro`)
* **Shot List Hierárquica e Modular**: Lista de fotos protocolares organizada estrategicamente por momentos e prioridade humana:
  1. *01 · Prioridade de Conforto: Avós e Mobilidade Reduzida* (Altar Imediato, liberando os avós para descansar com agilidade).
  2. *02 · Família da Noiva* (Pais, retratos individuais com a noiva e família completa).
  3. *03 · Família do Noivo* (Pais, retratos individuais com o noivo e família completa).
  4. *04 · Padrinhos, Madrinhas & Cortejo* (Cortejo completo, madrinhas com a noiva, padrinhos com o noivo).
  5. *05 · Amigos Especiais & Grupos Afetivos* (Lounge/coquetel).
* **Gestão Dinâmica**: Checkboxes para marcar fotos realizadas, campo para adicionar fotos personalizadas pela noiva, exclusão e restauração para o protocolo oficial Versa Visual.
* **Cronograma Fotográfico sem Horários Rígidos**: Mapeamento do que será feito e como a equipe se divide (Vinicius Cunha dedicado à noiva e momentos principais; segundo fotógrafo dedicado ao noivo, cenografia e ângulos complementares), valorizando a luz natural (Golden Hour) sem impor minutos estressantes.
* **Geração de PDFs Executivos via jsPDF**:
  * **Dossiê Executivo Completo**: Relatório A4 multipágina em formato editorial com cronograma de cobertura, divisão da equipe, shot list completa e contatos-chave.
  * **Guia Rápido do Altar**: Resumo de 1 página A4 ultra-objetivo com a ordem exata de fotos protocolares pós-cerimônia, otimizado para o Cerimonial e Assessoria.

### 3. Fornecedores & Locais (`fornecedores`)
* **Parceiros Confirmados**:
  * **Espaço Lux — Rio das Ostras** (Local da Cerimônia & Recepção).
  * **Versa Visual — Vinicius Cunha** (Direção Fotográfica).
* **Navegação com 1 Clique**: Links diretos para rotas no **Google Maps** e **Waze**.
* **Comunicação Imediata**: Botões de WhatsApp com mensagens pré-formatadas para contato direto.
* **Cadastro Livre pela Noiva**: Formulário para adicionar novos fornecedores (Cerimonial, Beleza/Make, Decoração, Buffet, Música, etc.) com salvamento local.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Detalhes |
|---|---|---|
| **Runtime & Bundler** | [Vite 6](https://vite.dev/) | HMR ultrarrápido e build otimizado |
| **Linguagem** | [TypeScript 5.7](https://www.typescriptlang.org/) | Tipagem estrita de dados e contratos |
| **Framework UI** | [React 18.3](https://react.dev/) | Arquitetura funcional baseada em hooks |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules | Tokens semânticos, `@theme` nativo e modo claro/escuro |
| **Tipografia** | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Inter](https://fonts.google.com/specimen/Inter) | Google Fonts com renderização editorial |
| **Animações** | [Motion](https://motion.dev/) (Framer Motion) | Microinterações e transições de layout fluidas |
| **Primitivos UI** | [Radix UI](https://www.radix-ui.com/) & [Vaul](https://vaul.emilkowal.ski/) | Dialog, Drawer, Tooltips e Acessibilidade WAI-ARIA |
| **Ícones** | [Lucide React](https://lucide.dev/) | Iconografia consistente e moderna |
| **Notificações** | [Sonner](https://sonner.emilkowal.ski/) | Toasts elegantes com suporte a ações |
| **Geração de PDF** | [jsPDF](https://github.com/parallax/jsPDF) | Geração de PDFs vetoriais A4 via dynamic import |
| **Gerenciador de Pacotes** | [pnpm](https://pnpm.io/) | Gerenciamento determinístico e rápido de dependências |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js** >= 18
* **pnpm** (recomendado `pnpm@12` ou `corepack enable pnpm`)

### Instalação e Inicialização

```bash
# 1. Navegue até a pasta do projeto
cd /Users/viniciuscunha/3_DEV/wedding-moodboard

# 2. Instale as dependências
pnpm install

# 3. Inicie o servidor de desenvolvimento Vite
pnpm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Build de Produção

```bash
# Gera o bundle otimizado em dist/
pnpm run build
```

---

## 📂 Estrutura de Diretórios

```
wedding-moodboard/
├── index.html                   # HTML base, fontes Google (Playfair + Inter) e preload LCP
├── package.json                 # Dependências e scripts do projeto
├── tsconfig.json                # Configuração do TypeScript
├── vite.config.ts               # Plugins Vite e alias de caminhos (@/ -> src/)
├── public/                      # Ativos estáticos
│   ├── brand-assets/            # Favicons e logos Versa Visual
│   └── pre-wedding/             # 58 imagens originais curadas do Pré-Wedding
└── src/
    ├── main.tsx                 # Ponto de entrada React 18
    ├── styles/                  # Sistema de Estilos
    │   ├── theme.css            # Tokens de cores, superfícies, sombras e classes editoriais
    │   ├── tailwind.css         # Configuração Tailwind v4 (@theme, utilitários, fontes)
    │   └── fonts.css            # Declarações tipográficas
    └── app/
        ├── App.tsx              # Componente raiz, orquestração de estados e persistência
        ├── data/
        │   ├── preWeddingData.ts   # 58 itens curados com categorias e metadados
        │   └── shotListData.ts     # Protocolo de Shot List, cronograma e fornecedores
        ├── utils/
        │   ├── imageCompressor.ts  # Compressão client-side em Canvas HTML5 (1600px/0.82)
        │   └── pdfGenerator.ts     # Gerador de Dossiê Executivo e Guia do Altar em PDF
        └── components/
            ├── Header.tsx              # Barra superior de navegação e alternador de tema
            ├── PreWeddingSection.tsx   # Masonry, busca, filtros e upload de referências
            ├── MoodboardCard.tsx       # Card editorial de foto com likes e notas
            ├── LightboxModal.tsx       # Modal de visualização de foto em tela cheia
            ├── PhotoNoteDrawer.tsx     # Gaveta de tags e anotações da noiva
            ├── AddItemDialog.tsx       # Diálogo modal para adicionar referências
            ├── RoteiroPrdSection.tsx   # Painel de Shot List e Cronograma de Fotografia
            ├── CuratedVendorsSection.tsx # Painel de Fornecedores e Locais
            ├── ShareFabModal.tsx       # Modal de compartilhamento WhatsApp do roteiro
            ├── MobileBottomDock.tsx    # Dock inferior de navegação mobile em vidro fosco
            ├── Footer.tsx              # Rodapé com branding Versa Visual
            └── ui/                     # Primitivos de interface (Dialog, Drawer, etc.)
```

---

## 💾 Persistência e Estratégia de Dados

Todos os dados interativos da noiva são salvos no `localStorage` do navegador com isolamento e migração inteligente de versão:

| Chave no `localStorage` | Conteúdo | Estratégia de Versão |
|---|---|---|
| `camila_carlos_theme` | Tema ativo (`light` ou `dark`) | Padrão: `light` com sincronização no `<html class="dark">` |
| `camila_carlos_active_tab` | Aba ativa (`referencias`, `roteiro`, `fornecedores`) | Preserva a navegação do usuário |
| `camila_carlos_liked_ids` | IDs das fotos favoritadas | Array de strings JSON |
| `camila_carlos_photo_notes` | Notas, tags e comentários por foto | Dicionário indexado por `itemId` |
| `camila_carlos_shotlist` | Grupos e itens da Shot List | Controlado por `camila_carlos_shotlist_version: "v3_editorial"` |
| `camila_carlos_vendors` | Fornecedores confirmados + personalizados | Controlado por `camila_carlos_vendors_version: "v3_real_vendors"` |
| `camila_carlos_moodboard_items` | Itens do moodboard (originais + adicionados) | Compressão em Canvas para garantir integridade da cota |

---

## ✒️ Direção e Créditos

* **Direção Artística & Fotográfica**: Vinicius Cunha — [Versa Visual](https://instagram.com/v1ncsc)
* **Casal**: Camila & Carlos
* **Locações**: Espaço Lux, Bar Thunder e Falésias de Costa Azul (Rio das Ostras, RJ)