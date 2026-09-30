# Product Requirements Document (PRD) & Product Brief

**Projeto:** Plataforma Digital de Planejamento de Casamento & Curadoria Fotográfica  
**Cliente / Casal:** Camila & Carlos  
**Fotografia Oficial & Direção de Imagem:** Vinicius Foto  
**Local:** São João da Boa Vista & Costa Azul  
**Status do Projeto:** Jornada Ativa (118 Dias Restantes • 14 Semanas • Cerimônia em Outubro)  
**Versão:** 1.0 (Consolidada)  
**Autores:** Stitch UI/UX Studio & Equipe Vinicius Foto  

---

## 1. Visão Geral do Produto (Executive Summary)

A plataforma **Camila & Carlos // Jornada de Casamento** é uma aplicação web progressiva (PWA / Web & Mobile) desenvolvida para orquestrar de forma sinérgica o planejamento logístico, o cerimonial sensível e a cobertura fotográfica documental e editorial do casamento.

Inspirada na estética limpa, calorosa e orientada a fotografia do **Airbnb** (*Warm Editorial Marketplace*), a ferramenta substitui planilhas fragmentadas e mensagens dispersas por um ecossistema visual único onde os noivos, o fotógrafo principal e o cerimonial sincronizam decisões estratégicas, rotas, luz natural e execução tática em tempo real.

---

## 2. Personas & Stakeholders

| Stakeholder | Papel no Produto | Dores Principais | Valor Entregue pela Plataforma |
| :--- | :--- | :--- | :--- |
| **Noivos (Camila & Carlos)** | Co-criadores e protagonistas | Ansiedade logística, receio de correria no dia, gestão de dinâmicas familiares complexas (pais separados, mobilidade da avó). | Clareza cristalina das etapas ("Passos até o altar"), contagem regressiva viva e checklist tático sem sobrecarga. |
| **Vinicius Foto (Diretor de Imagem)** | Fornecedor âncora e curador visual | Falta de janela adequada de luz natural (Golden Hour), atrasos de cabelo/maquiagem que comprimem o ensaio dos noivos, falta de baterias/redundância de cartões. | Bloqueio formal da "Regra de Ouro de 1h30", mapeamento solar integrado, controle de hardware RAID e galeria de prévia em 48h. |
| **Cerimonial & Assessoria (Juliana Ramos)** | Orquestradora do cortejo e dia D | Comunicação desencontrada com fornecedores no altar, indefinição do guardião das alianças. | Ficha técnica exportável (PDF), divisão clara de atribuições e canal direto de alinhamento em tempo real. |

---

## 3. Pilares de Design & Identidade Visual

A interface adota o **Design System Warm Editorial Marketplace**, fundamentado nos seguintes princípios visuais:

* **Fotografia como Heroína:** Imagens amplas, com luz natural suave, tons terrosos quentes e acabamento de revista editorial (borda suave, proporções 4:3 e 16:9).
* **Cores de Assinatura:**
  * *Primary / Rausch Deep:* `#ba0036` / `#e00b41` (para CTAs primários, estados de urgência e destaque afetivo).
  * *Surface Bright / Lowest:* `#ffffff` e `#fbf9f8` (fundos arejados, sem sobrecarga de sombras pesadas).
  * *Tertiary Container (Verde Sucesso):* `#008558` (para badges de marcos concluídos e protocolos prontos).
  * *Text Secondary / Neutros:* `#5f5e5e` e `#1b1c1c` (alto contraste tipográfico e legibilidade em dispositivos móveis sob luz solar).
* **Tipografia:** `Plus Jakarta Sans` — moderna, aberta, com pesos equilibrados (Regular 400, Medium 500, Semi-Bold 600, Bold 700).
* **Affordance & Microinterações:** Sombras sutis (`shadow-airbnb-card`), cantos arredondados orgânicos (`rounded-2xl` e `rounded-full`), badges táteis com micro-ícones Phosphor/Material Symbols.

---

## 4. Arquitetura de Informação & Mapa de Telas

O produto é estruturado em **5 Módulos Centrais (Tabs)**:

```
[ Camila & Carlos // WebApp ]
  ├── 1. Jornada & Planejamento (Core Dashboard)
  │     ├── Hero Banner (Status, Casal, Vinicius Foto)
  │     ├── Triple Metric Counter (118 Dias | 14 Semanas | 1/15 Ações)
  │     ├── Ações Rápidas (Exportar Roteiro PDF / Compartilhar)
  │     ├── 5 Marcos Estratégicos com Checklist Integrado
  │     ├── Painel Lateral: Decisões em Aberto (Making-of, Janela de Beleza, Guardião)
  │     ├── Caderno de Inspirações (Floral & Detalhes, Altar Matriz)
  │     └── Resumo de Ações & Contatos
  ├── 2. Detalhes do Marco (Deep Dive // Ex: Igreja de São João)
  │     ├── Hero Fotográfico Imersivo da Igreja Matriz
  │     ├── Barra de Progresso & Janela Luminosa (Golden Hour 16h45)
  │     ├── Mapa Vetorial Interativo de Tráfego, Estacionamento & Rampa da Avó
  │     ├── Feed de Notas & Alinhamentos Vivos
  │     ├── Fornecedores Vinculados com WhatsApp Direto
  │     └── Diretrizes & Documentos Canônicos (Batismo, Curso de Noivos, Proclamas)
  ├── 3. Referências & Caderno de Inspirações
  ├── 4. Pré-wedding & Scouting (Locações Costa Azul & Harley)
  └── 5. Fornecedores & Contatos de Emergência
```

---

## 5. Requisitos Funcionais (FR)

### FR-01: Gestão de Marcos Estratégicos Integrados (5 Milestones)
A plataforma organiza a jornada em 5 capítulos cronológicos e operacionais:
1. **Marco 01 — Igreja em São João Oficializada:** Cenário sacramentado, validação canônica, scouting acústico e de iluminação da paróquia.
2. **Marco 02 — Acolhimento Estratégico das Famílias:** Logística de pais separados no cortejo, rampa de acessibilidade e assento prioritário acolchoado para a avó, ensaio de padrinhos em blocos sem fila.
3. **Marco 03 — Ensaio Pré-Wedding & Visita Técnica:** Spots de campo e praia na Costa Azul, fotos com a moto Harley-Davidson de Carlos, aproveitamento do Golden Hour (16h45).
4. **Marco 04 — Timeline Minuto a Minuto & Cortejo:** Making-of com luz natural ampla, imposição da regra de ouro de 1h30 de término de beleza, nomeação do guardião das alianças e kit de hidratação.
5. **Marco 05 — Entrega de Prévia & Álbum Master:** Checklist de segurança do fotógrafo (redundância RAID em cartões duplos), mapa de luz do beijo e entrega de galeria digital em até 48 horas.

### FR-02: Checklist Operacional Integrado com Atribuição Dupla
* Cada tarefa pertence a um marco específico, eliminando duplicidade de listas.
* Filtros rápidos: `Todos (15)`, `Noivos C&C (8)` e `Vinicius Foto (7)`.
* Atualização tátil: ao marcar uma tarefa como feita, o progresso do marco e o contador global são recalculados dinamicamente com efeito tachado (*line-through*).

### FR-03: Módulo "Decisões em Aberto" (Fast Decision Box)
Campos de entrada direta para destravar gargalos críticos da produção:
* **Sala de Preparação do Noivo/Noiva:** Registro do local com luz favorável.
* **Janela de Beleza com Regra de Ouro:** Horário fixo estrito (término às 15h30 para fotos serenas com os pais).
* **Ponto de Apoio Guardião (Alianças):** Nome e contato telefônico de emergência do responsável.

### FR-04: Ficha Técnica & Mapas Operacionais
* Renderização de mapa vetorial estilizado com pontos de interesse: *Igreja Matriz*, *Rampa de Acesso da Avó*, *Bolsão de Estacionamento para Convidados (80 vagas)* e *Vantage Point Fotográfico*.
* Exportação com um clique em **PDF de Alta Resolução** para impressão e distribuição aos coordenadores de cerimônia.

---

## 6. Requisitos Não-Funcionais (NFR)

* **NFR-01: Responsividade Fluida & Paridade Total:** Mesma consistência de dados e regras de negócio no mobile (390px, bottom nav) e desktop (layout 2 colunas com sticky side panel).
* **NFR-02: Performance & Carregamento Instantâneo:** Interface estática baseada em Tailwind CSS moderno, garantindo First Contentful Paint (FCP) < 1.0s mesmo em conexões 4G instáveis no interior/litoral.
* **NFR-03: Acessibilidade & Usabilidade Emocional:** Alto contraste para noivos e familiares visualizarem o cronograma no dia do evento; feedback visual imediato em todas as ações de salvar.
* **NFR-04: Segurança e Isolamento de Dados:** Links de compartilhamento restritos para cerimonial e equipe técnica, preservando a intimidade das notas do casal.

---

## 7. Roadmap & Próximas Entregas

* **Fase 1 (Atual - Concluída):** Dashboard de Planejamento Mobile & Desktop, Marco 01 detalhado com mapa e checklist integrado.
* **Fase 2 (Próximo Passo):** Telas dedicadas para **Aba de Referências & Moodboards** e **Aba de Pré-wedding (Costa Azul & Harley)**.
* **Fase 3:** Sistema de notificações de WhatsApp para lembretes automáticos dos marcos a 30, 15 e 7 dias da cerimônia.