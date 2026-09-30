# Registro de Decisões Arquiteturais (ADRs)

Este documento registra as principais decisões de design, arquitetura e produto adotadas no projeto **Camila & Carlos — Versa Visual**.

---

### ADR 001: Adoção do Tailwind CSS v4 com Variáveis Nativas

* **Contexto**: O projeto necessita de temas claro e escuro, cartões editoriais táteis e tokens semânticos de alta fidelidade sem complexidade de arquivos de configuração JS externos.
* **Decisão**: Adotar o Tailwind CSS v4 (`@tailwindcss/vite` 4.1+) integrando variáveis CSS puras definidas em `src/styles/theme.css` e consumidas via `@theme` em `src/styles/tailwind.css`.
* **Consequências**:
  * Carregamento mais rápido sem overhead de compilação PostCSS pesada.
  * Suporte nativo a `@custom-variant dark (&:is(.dark *))`.
  * Facilidade de manutenção de cores e tipografia com valores padronizados da Versa Visual.

---

### ADR 002: Persistência Client-Side via `localStorage` com Versionamento Semântico

* **Contexto**: A aplicação precisa funcionar imediatamente nos celulares e computadores dos noivos, sem tela de login, cadastro ou necessidade de hospedar bancos de dados relacionais e APIs de autenticação.
* **Decisão**: Utilizar o `localStorage` do navegador com prefixos específicos e verificação de chave de versão:
  * `camila_carlos_shotlist_version: "v3_editorial"`
  * `camila_carlos_vendors_version: "v3_real_vendors"`
* **Consequências**:
  * A noiva tem autonomia instantânea e seus dados ficam salvos no seu dispositivo.
  * Migrações de dados são transparentes: quando o protocolo é atualizado, a versão limpa os resíduos antigos sem quebrar a tela.
  * Há botões de restauração explícitos caso o usuário queira retornar ao protocolo oficial Versa Visual.

---

### ADR 003: Compressão de Imagens no Cliente em Canvas HTML5 (1600px / 0.82)

* **Contexto**: Usuários costumam subir fotos direto do rolo da câmera do smartphone ou do Pinterest, com tamanhos variando entre 8MB e 25MB. O `localStorage` tem cota típica de ~5MB a 10MB por origem.
* **Decisão**: Implementar o módulo `src/app/utils/imageCompressor.ts` que lê o arquivo via `FileReader`, redimensiona proporcionalmente para no máximo 1600px no maior lado e converte para JPEG com qualidade 0.82 em Canvas 2D.
* **Consequências**:
  * Redução média de 98% no tamanho dos arquivos (~120KB a 180KB por foto).
  * A noiva pode subir dezenas de referências sem atingir o limite de armazenamento do navegador.
  * Carregamento imediato com excelente nitidez mesmo em telas Retina.

---

### ADR 004: Cronograma Fotográfico Orientado a Divisão de Equipe (Sem Minutos Rígidos)

* **Contexto**: Cronogramas que impõem regras rígidas de minutos (ex.: "17:15 às 17:28: fotos dos padrinhos") geram frustração e ansiedade quando atrasos naturais de cerimônia acontecem.
* **Decisão**: Organizar o cronograma por momentos narrativos com descrição de **o que será feito** e **como a equipe se divide** (Vinicius dedicado à noiva e ângulos mestres; segundo fotógrafo dedicado ao noivo, cenografia e recepção de convidados).
* **Consequências**:
  * Alinhamento claro com o casal e cerimonial sobre as responsabilidades de cada lente.
  * Flexibilidade para aproveitar a luz natural (Golden Hour) com calma e sensibilidade.

---

### ADR 005: Geração de PDF Client-Side com Dynamic Import do `jsPDF`

* **Contexto**: A noiva e o cerimonial precisam de relatórios prontos em PDF para envio no WhatsApp e para impressão física na prancheta do evento.
* **Decisão**: Utilizar `jsPDF` dentro de funções assíncronas em `src/app/utils/pdfGenerator.ts` importadas dinamicamente (`const { jsPDF } = await import("jspdf");`).
* **Consequências**:
  * A biblioteca de PDF só é carregada no navegador quando o usuário realmente clica para exportar, mantendo o bundle inicial leve (~124KB gzipped).
  * Os documentos são gerados instantaneamente sem chamadas de servidor externo.

---

### ADR 006: Simplificação da Navegação em 3 Abas Canônicas — substituída

* **Contexto**: Telas com muitas subdivisões e categorias confusas dispersam a atenção dos noivos durante o planejamento.
* **Decisão**: Consolidar a arquitetura em três abas essenciais:
  1. `referencias`: Moodboard, fotos favoritas, tags e anotações.
  2. `roteiro`: Shot list interativa e cronograma fotográfico.
  3. `fornecedores`: Locais e catálogo de parceiros.
* **Status**: Substituída pela ADR 008, que acrescentou a Visão Geral e definiu quatro áreas canônicas.
* **Consequências históricas**:
  * Redução da carga cognitiva e aumento significativo na usabilidade em telas móveis.
  * O dock inferior mobile acomoda perfeitamente as três abas com ícones e contadores de pendências.

---

### ADR 007: Priorização Humana de Mobilidade dos Avós no Altar

* **Contexto**: A sessão de fotos formais após o "sim" é frequentemente desgastante para convidados idosos ou com mobilidade reduzida.
* **Decisão**: Definir como prioridade absoluta (Item #3 da Lista do Altar) as fotos com os avós da noiva e do noivo, garantindo que sejam fotografados imediatamente após o encerramento da cerimônia e liberados para descansar no lounge ou coquetel com assento reservado.
* **Consequências**:
  * Experiência humanizada e empática no casamento.
  * Cerimonial ciente da prioridade de posicionamento dos idosos no altar.

---

### ADR 008: Jornada Mobile-First com 4 Abas Fixas e Gavetas Vaul (Sem Autenticação)

* **Contexto**: Para maximizar a conversão da noiva em curadoria visual ativa e eliminar qualquer atrito de acesso em smartphones.
* **Decisão**:
  1. Padronizar o dock inferior fixo com **4 abas canônicas**: *Início* (Visão Geral), *Referências* (com badge de favoritos), *Roteiro* e *Locais*.
  2. Eliminar telas e barreiras de login/senha; o acesso é imediato via link no navegador móvel com persistência em `localStorage`.
  3. Adotar gavetas bottom-sheet via **Vaul** para detalhamento de fotos, registro de notas (*"O que você gosta nesta foto?"*) e tags dinâmicas.
* **Consequências**:
  * Navegação rápida com o polegar, sem sobrecarga cognitiva.
  * Feedback imediato via Sonner e transições fluidas com Motion.
  * Preservação da autoria do casal sem fricções cadastrais.

---

### ADR 009 — Aplicação do Padrão Stitch Taste-Design & Anti-Slop (30/09/2026)

* **Contexto documental**: Esta decisão consolida a direção visual em `DESIGN_SYSTEM.md`, sua fonte canônica.

* **Contexto**: O projeto Stitch e a interface possuíam resquícios de convenções genéricas de IA (como a fonte `Inter` como padrão, cartões com preenchimento em caixas repetitivas e resíduos de `#000000`).
* **Decisão**:
  1. Sintetizar o `DESIGN.md` semântico nos padrões rígidos da skill `taste-design` (Densidade: 3, Variância: 7, Movimento: 6).
  2. Substituir `Inter` por `DM Sans` (corpo e interface) pareada com `Playfair Display` (títulos editoriais) e `Outfit` / `DM Sans Tabular` (dados e numerais).
  3. Erradicar pure black (`#000000`) em favor de `Espresso Noir (#1C1A17)` no tema claro e `Velvet Charcoal (#141312)` no escuro.
  4. Preservar o acento de autoria único Versa Visual Teal (`#5E7F8C`).
* **Consequências**:
  * Eliminação de vícios visuais genéricos de IA / SaaS corporativo.
  * Alinhamento estrito com os princípios de curadoria autoral de fotografia da Versa Visual (`@v1ncsc`).
  * Geração e edição no Stitch agora ancoradas em tokens semânticos anti-slop rigorosos.
