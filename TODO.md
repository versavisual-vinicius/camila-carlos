# Pendências e Tarefas em Aberto (TODO) — Camila & Carlos

Este arquivo rastreia o status das tarefas técnicas e operacionais para a entrega do projeto aos clientes Camila & Carlos e à equipe do casamento, em total conformidade com o **PRD definitivo para as telas do Stitch** (`PRD.md`).

---

## 🟢 Concluído

- [x] **Preparação segura para o redesign**:
  - [x] Contratos funcionais e de dados consolidados em `PROJECT_CONTEXT.md`.
  - [x] Direção visual e responsabilidades consolidadas em `DESIGN_SYSTEM.md`.
  - [x] Acervo Stitch consolidado em `.stitch` e código órfão removido.

- [x] **Arquitetura Base**: Setup com React 18, Vite 6, TypeScript e Tailwind CSS v4.
- [x] **Consolidação do PRD Stitch**:
  - [x] Definição de limites e escopo em `PRD.md` e atualização de `PROJECT_CONTEXT.md`.
  - [x] Download e consolidação das telas do Stitch em `.stitch/designs/`.
  - [x] Eliminação formal de dados fictícios e especulativos (118 dias, 14 semanas, 80 vagas, etc.).
- [x] **Aba Referências**:
  - [x] Grid Masonry responsivo com fotografias do acervo.
  - [x] Sistema de favoritos com persistência no `localStorage`.
  - [x] Lightbox modal imersivo com navegação por teclado e notas inline.
  - [x] Upload client-side com compressão automática em Canvas (1600px/0.82) e ação de Desfazer via toast.
- [x] **Aba Roteiro**:
  - [x] Shot List hierárquica com prioridade humana (Avós e mobilidade reduzida em 1º lugar).
  - [x] Divisão de equipe transparente entre Vinicius Cunha e segundo fotógrafo.
- [x] **Aba Fornecedores**:
  - [x] Locais conhecidos confirmados (Espaço Lux e Versa Visual).
  - [x] Rotas diretas no Google Maps e Waze com 1 clique e botão de WhatsApp.

---

## 🟡 Em Execução (Implementação das Telas do Stitch conforme PRD)

- [ ] **1. Implementação da Área "Visão Geral" (`OverviewSection.tsx`)**:
  - [ ] Apresentação acolhedora e editorial para Camila & Carlos.
  - [ ] Identificação da Versa Visual sob autoria de Vinicius Cunha (sem usar "ateliê").
  - [ ] Próximos alinhamentos fotográficos reais e atalhos rápidos para Referências, Pré-Wedding e Roteiro.
  - [ ] Layout limpo sem contadores ou barras de progresso artificiais.
- [ ] **2. Navegação Canônica em 4 Áreas**:
  - [ ] Atualizar tipos e tabs em `Header.tsx`, `MobileBottomDock.tsx` e `App.tsx` (`visao-geral`, `referencias`, `roteiro`, `fornecedores`).
  - [ ] Suporte a destaque do Pré-Wedding com rota/painel próprio.
- [ ] **3. Refinamento da Curadoria Visual**:
  - [ ] Renomear o campo central para **“O que você gosta nesta foto?”** em `PhotoNoteDrawer.tsx` e `LightboxModal.tsx`.
  - [ ] Permitir inserção livre de tags criadas por Camila, eliminando opções pré-cadastradas rígidas e permitindo reutilização.
  - [ ] Ajustar rotulagem de organização para **“Pasta de destino”**.
- [ ] **4. Roteiro e Resumo Compartilhável**:
  - [ ] Ajustar alinhamento da janela de beleza para alinhamento combinado com a equipe (sem imposição cega de 1h30).
  - [ ] Simplificar exportação PDF em `pdfGenerator.ts` para **“Resumo do Roteiro Fotográfico”** (eliminando referências a "Guia do Altar / Ficha de Cerimonial").
- [ ] **5. Build & Verificação**:
  - [ ] Executar `pnpm run build` e validar experiência mobile e desktop.
