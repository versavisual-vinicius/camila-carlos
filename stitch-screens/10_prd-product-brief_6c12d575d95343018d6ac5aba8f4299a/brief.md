# PRD & Product Brief — Camila & Carlos (Atelier Editorial Versa Visual)

**Documento:** Product Requirements Document (PRD) & Briefing Executivo de Produto  
**Projeto:** Ecossistema Digital de Curadoria & Direção Fotográfica — Camila & Carlos  
**Direção Criativa & Autoral:** Vinicius Cunha — Versa Visual (@v1ncsc)  
**Versão:** 1.0.0 (Release Candidate / Paridade Total Web & Mobile)  
**Status:** Aprovado para Engenharia & Produção  

---

## 1. Visão Geral do Produto (Executive Summary)

### 1.1 Declaração do Problema
O planejamento da cobertura fotográfica de casamentos *fine-art* de alto padrão historicamente sofre com fragmentação: noivos enviam pastas desorganizadas no Pinterest/Instagram, cerimonialistas operam cronogramas em planilhas PDF estáticas e fotógrafos precisam improvisar a captura de fotos protocolares de família em janelas solares críticas de menos de 20 minutos (Golden Hour). 

### 1.2 A Solução
Um **Digital Atelier & Concierge de Direção Fotográfica** multiplataforma (Desktop + Mobile First PWA). O aplicativo serve como ponto de encontro unificado entre os noivos (**Camila & Carlos**), a equipe autoral de fotografia (**Versa Visual**) e a cerimonialista, centralizando:
1. Curadoria visual de referências fotográficas com sistema de anotações contextuais e favoritos da noiva.
2. Roteiro cronológico solar dos *6 passos até o altar*, detalhando dinâmicas e divisão técnica da equipe.
3. Shot list tátil e interativa com 15 retratos protocolares de altar priorizados para execução ágil.
4. Hub logístico integrado com Google Maps Platform e deep links para rotas de navegação (Google Maps e Waze).

---

## 2. Personas & Usuários-Alvo

| Persona | Perfil & Contexto | Principais Necessidades | Dispositivo Principal |
| :--- | :--- | :--- | :--- |
| **A Noiva (Camila)** | Sensível à estética, busca quiet luxury e espontaneidade. | Eleger suas fotos prediletas, registrar anotações de estilo para luz/movimento e ter segurança sobre a cobertura. | Mobile (iOS/Android) |
| **O Noivo (Carlos)** | Prático, focado na logística do pré-wedding e momentos de descontração. | Consultar horários do ensaio no Bar Thunder, rotas com a moto Harley-Davidson e tempos de deslocamento. | Mobile |
| **Diretor Criativo (Vinicius Cunha)** | Fotógrafo autoral, cuida da iluminação natural e conexão emocional. | Visualizar notas da noiva em tempo real, orquestrar a divisão de câmeras com o 2º fotógrafo e gerenciar a luz solar. | Desktop (Estúdio) / Mobile (Evento) |
| **2º Fotógrafo & Assistente** | Focado em teleobjetiva, cobertura espontânea e rebatedores. | Saber exatamente sua posição cênica em cada momento e quais detalhes cobrir enquanto Vinicius está no ensaio principal. | Mobile |
| **Cerimonialista do Evento** | Guardiã do tempo e condutora dos convidados. | Executar as 15 fotos de família no altar em menos de 20 minutos sem gerar atrito ou cansaço aos avós. | Mobile / Tablet / PDF Impresso |

---

## 3. Pilares Estratégicos & Princípios de Design

1. **Quiet Luxury & Warm Minimalism:** Rejeição explícita a interfaces cinzentas ou utilitárias de SaaS corporativo. O produto adota texturas de papel de algodão artístico prensado a quente (`#FBF9F6`), tipografia editorial com presença de alta costura (*Playfair Display*) e controles neutros (*Inter*).
2. **Fotografia como Protagonista:** Espaçamento generoso, enquadramentos sem cortes bruscos e hierarquia visual focada na luz natural e no afeto genuíno.
3. **Ergonomia Operacional no Altar:** Elementos interativos em mobile projetados com alvos de toque acessíveis (mínimo 44px–48px), permitindo checagem rápida com uma única mão sob a luz do sol.
4. **Sincronização & Persistência Local:** Garantia de operação fluida mesmo em áreas de praia com oscilação de sinal 4G/5G através de armazenamento persistente.

---

## 4. Arquitetura de Informação & Rotas

O sistema é sustentado por 4 rotas essenciais totalmente espelhadas em Desktop e Mobile:

```
                  ┌─────────────────────────────────────┐
                  │          App Shell Global           │
                  │  (Header Sticky / Hero Card Casal)  │
                  └──────────────────┬──────────────────┘
                                     │
         ┌───────────────────┬───────┴───────────┬───────────────────┐
         ▼                   ▼                   ▼                   ▼
   /visao-geral        /referencias          /roteiro             /locais
(Hub Editorial)     (Galeria & Moodboard)  (Linha do Tempo)   (Mapas & Contatos)
   - Contadores        - 58 Referências      - 6 Momentos       - Google Maps API
   - 3 Áreas Chave     - Favoritas Noiva     - Divisão Equipe   - InfoWindow Lux
   - Bloco Ensaio      - Filtros por Tag     - 15 Fotos Altar   - Rotas Waze/GMaps
   - Próximos Passos   - Anotações           - Destaque Avós    - Fornecedores
```

### 4.1 Rota 1: Visão Geral (`/visao-geral` ou `/`)
- **Objetivo:** Ponto de acolhimento e status consolidado do casamento.
- **Componentes:**
  - *Hero Card Unificado:* Retrato do casal, pill pulsante `• Jornada Ativa`, geolocalização e tríade de contadores (`58 Fotos`, `1 Favoritas`, `0/15 Altar`).
  - *Seletor de Áreas de Planejamento:* 3 cards com links diretos e resumo de status (*Referências Visuais*, *Roteiro da Cobertura*, *Locais & Contatos*).
  - *Card de Destaque Pré-Wedding:* Contexto autoral do ensaio no Bar Thunder & Falésias de Costa Azul.
  - *Esteira de Próximos Passos com a Equipe:* 4 etapas sequenciais (Curadoria da Noiva → Ensaio Pré-Wedding → Fotos de Família → O Grande Dia).

### 4.2 Rota 2: Caderno de Referências Visuais (`/referencias`)
- **Objetivo:** Curadoria imagética e alinhamento visual de estilo.
- **Componentes:**
  - *Barra de Ferramentas Editorial:* Ações de Upload e "+ Adicionar", Segmented Control (*Todas as fotos 58* vs *Favoritas ❤️ 1*) e campo de busca contextual com ícone.
  - *Grid Editorial Masonry:* Cartões de fotografia com ação de favoritar (coração com transição tátil), notas da Camila em caixa de citação editorial e metadados técnicos de câmera (*35mm f/1.4, Luz Natural*).

### 4.3 Rota 3: Roteiro da Cobertura & Shot List (`/roteiro`)
- **Objetivo:** Orquestração temporal, técnica e cerimonial do grande dia.
- **Componentes:**
  - *Kicker & Badge de Progresso:* `• DIREÇÃO FOTOGRÁFICA VERSA VISUAL` e pill `✓ 0 de 15 fotos confirmadas`.
  - *Linha do Tempo Solar (Momentos 01 a 06):*
    1. *Ensaio Pré-Wedding:* Bar Thunder & Falésias de Costa Azul (Tag: *Agendado*).
    2. *Making of dos Noivos:* Suíte Presidencial Espaço Lux (Tag: *Confirmado*).
    3. *Cerimônia ao Pôr do Sol & Altar:* Deck Panorâmico às 17h15 (Tag: *Prioritário*).
    4. *Roteiro de Altar Agilizado:* Lista de 1 a 15 retratos protocolares de família com checkboxes de 48px de área de toque e destaque especial no item 3 (*Noivos + Avós - Prioridade*).
  - *Bloco de Divisão da Equipe:* Instruções detalhadas para Vinicius Cunha (lente principal e noiva) e 2º Fotógrafo (reações emotivas e noivo).

### 4.4 Rota 4: Locais & Fornecedores (`/locais`)
- **Objetivo:** Logística espacial, rota de acesso e diretório de parceiros.
- **Componentes:**
  - *Mapa Interativo:* Integração com Google Maps Platform customizado com paleta linho/editorial, marcando o Espaço Lux, Bar Thunder e Falésias.
  - *InfoWindow do Cenário Principal:* Fotografia panorâmica do Espaço Lux, horário (16:15) e botões de ação rápida estilizados como *outlined primary* para Google Maps e Waze.
  - *Diretório de Fornecedores Oficiais:* Telefones e contatos de emergência (Cerimonial, Buffet, Decoração, Make & Hair).

---

## 5. Especificações de Design System (Editorial Wedding)

### 5.1 Tokens de Cor
- **Canvas Base:** `#FBF9F6` (Linen Sand).
- **Ink Primário:** `#1C1A17` (Espresso Noir).
- **Superfícies Container:** `#EFEEEB` / `#F7F3F0` / `#FFFFFF` (Algodão & Sandstone).
- **Acento Afetivo:** `#FF4D6D` / `#F2DCCA` (Terracotta Heart / Soft Rose).
- **Acento Autoral:** `#5E7F8C` (Versa Teal).
- **Neutro Inativo:** `#797676` (Textos e ícones inativos do dock mobile).

### 5.2 Tipografia
- **Títulos & Cabeçalhos Editoriais:** *Playfair Display* (400 / 500, tracking suave, itálicos nos subtítulos).
- **UI, Formulários, Labels & Shot List:** *Inter* (Regular, Medium, Semi-bold com kerning refinado).

### 5.3 Elevação & Sombras
- **Card Padrão:** `0 0 0 1px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)`.
- **Bottom Dock Flutuante:** `0 6px 20px rgba(0,0,0,0.08)` com `backdrop-blur-md` e fundo translúcido `rgba(251, 249, 246, 0.92)`.

---

## 6. Requisitos Não Funcionais (NFR)

1. **Acessibilidade Touch (WCAG AA):** Todas as áreas clicáveis em dispositivos móveis (especialmente checkboxes dos 15 retratos de altar e abas do dock de navegação) possuem altura mínima de 44px a 48px.
2. **Performance de Renderização:** Transição sem recarregamento brusco de página (Single Page Architecture com animação suave de 200ms).
3. **Resiliência Offline:** O checklist de 15 fotos e as notas de referência persistem localmente via Storage, garantindo que cerimonialistas e fotógrafos operem sem perda de dados caso a internet móvel caia na praia.
4. **Fidelidade de Marca:** Todas as telas trazem a chancela autoral de *Vinicius Cunha — Versa Visual (@v1ncsc)* e localização *Rio das Ostras & Costa Azul*.

---

## 7. Roadmap & Próximas Entregas (v1.1)

- [ ] **Lightbox Imersivo Fullscreen:** Visualizador fotográfico ampliado com zoom e leitura de metadados EXIF detalhados.
- [ ] **Dossiê para Impressão / PDF A4:** Layout vetorial pronto para prancheta da cerimonialista no dia da cerimônia.
- [ ] **Modo Escuro Fine-Art Automático:** Adaptação da interface para iluminação noturna na recepção (`#141311`).