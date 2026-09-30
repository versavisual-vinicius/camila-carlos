# Contexto do Projeto — Camila & Carlos (`camila-carlos`)

## 1. Visão do Projeto

O projeto **Camila & Carlos — Planejamento Fotográfico & Caderno Editorial** é uma aplicação web autoral concebida e desenvolvida pela **Versa Visual** sob a direção artística de **Vinicius Cunha** ([@v1ncsc](https://instagram.com/v1ncsc)).

O objetivo central é reunir as referências, preferências do casal e o planejamento da fotografia do casamento e do pré-wedding em um hub visual acessível, acolhedor e com a direção estética tátil inspirada no Stitch (Warm Editorial).

O produto responde a quatro perguntas essenciais:
1. **O que Camila gosta?**
2. **Como isso orienta as fotos?**
3. **Como a equipe cobre cada momento?**
4. **Quais informações precisam estar acessíveis?**

---

## 2. Partes Interessadas & Personas

| Persona | Papel no Projeto | Foco de Ação |
|---|---|---|
| **Camila (Noiva)** | **Usuária principal e protagonista** | Escolhe imagens, registra suas preferências com suas próprias palavras ("O que você gosta nesta foto?"), cria tags livres e orienta o olhar da equipe. |
| **Carlos (Noivo)** | Parceiro e co-tomador de decisão | Participa das escolhas visuais, alinha detalhes do ensaio pré-wedding e consulta locais/rotas. |
| **Vinicius Cunha (Versa Visual)** | Diretor Criativo e Fotógrafo Principal | Dedicado à noiva, preparação, momentos centrais, cerimônia, casal e retratos principais. Transforma as referências de Camila em direção de cobertura. |
| **Segundo Fotógrafo** | Cobertura complementar e cenografia | Dedicado ao noivo, decoração, detalhes, reações dos convidados e ângulos complementares durante todo o evento. |
| **Cerimonial & Assessoria** | Gestão do evento | Consulta apenas os alinhamentos úteis e essenciais à fotografia (Resumo do Roteiro Fotográfico). |

---

## 3. As 4 Áreas Canônicas de Navegação

1. **Visão Geral**:
   * Identidade acolhedora do casal, data quando confirmada, próximos alinhamentos fotográficos reais e atalhos rápidos para retomar referências, pré-wedding e roteiro.
   * Home leve, sem contagens regressivas ou indicadores artificiais.
2. **Referências**:
   * Galeria responsiva em masonry com fotografias do acervo, favoritos, pastas de destino e busca instantânea.
   * Campo central focado na noiva: **“O que você gosta nesta foto?”** (texto autoral livre, sem jargões técnicos).
   * Tags criadas livremente por Camila, que podem ser reutilizadas após a criação.
3. **Roteiro Fotográfico**:
   * Cobertura de momentos reais: Pré-wedding, Preparação, Cerimônia, Retratos de Família & Padrinhos, Casal e Recepção.
   * Divisão transparente da equipe (Vinicius + 2º Fotógrafo).
   * Retratos com prioridade humana: **Avós e pessoas com mobilidade reduzida** em 1º lugar.
   * Término da beleza alinhado para permitir os retratos sem imposição cega de regras de horário.
4. **Locais & Fornecedores**:
   * Locais confirmados (Espaço Lux e Versa Visual) com rotas diretas no Google Maps/Waze e WhatsApp.
   * Cadastro de fornecedores adicionais opcional pela noiva, conforme sua vontade.

---

## 4. Locações e Roteiro Territorial

* **Ensaio Pré-Wedding**:
  * *Locações*: **Bar Thunder** e **Falésias & Orla de Costa Azul** (Rio das Ostras).
  * *Elementos*: Roupas, conexões, luz natural e a possibilidade de integrar a moto Harley-Davidson de Carlos conforme o desejo do casal.
* **Casamento**:
  * *Local Confirmado*: **Espaço Lux** (Rio das Ostras / RJ).
  * Outros locais ou funções só são definidos e oficializados mediante confirmação de Camila & Carlos.

---

## 5. Recomendação Estrutural e Arquitetura Mobile-First

> **Prioridade:** Jornada centrada em mobile com navegação inferior fixa de 4 abas, gavetas de edição (Vaul/Radix) e ausência de bloqueios por autenticação para maximizar a conversão da noiva em curadoria visual.

1. **Ponto de Entrada & Onboarding (Visão Geral / Home)**:
   * Acesso direto no navegador do smartphone sem login/senha (persistência em `localStorage`).
   * Banner editorial acolhedor; contagem regressiva somente quando data estiver confirmada (omitida caso contrário).
   * Card de próximo passo em destaque (*"Continuar curadoria visual"* ou *"Próximo alinhamento da cobertura"*).
   * Atalhos rápidos em cards limpos para *Referências*, *Pré-wedding* e *Roteiro*.

2. **Ciclo de Curadoria Visual (Referências)**:
   * Grid fluido em *masonry* responsivo com rolagem contínua. Filtros táteis por texto/tags e favoritos.
   * Toque na foto $\rightarrow$ gaveta/modal expandido (Vaul). Favorito instantâneo com feedback visual.
   * Pergunta central para Camila: *"O que você gosta nesta foto?"* com texto livre.
   * Tags livres dinâmicas e seleção de *"Pasta de destino"*. Navegação lateral contínua (swipe/setas).
   * FAB *"Adicionar referência"* mobile: câmera/rolo $\rightarrow$ compressão transparente no client-side $\rightarrow$ preview $\rightarrow$ salvar com toast Sonner.

3. **Alinhamento de Cobertura (Roteiro Fotográfico)**:
   * Linha do tempo vertical em cards expansíveis (*Pré-wedding*, *Preparação*, *Cerimônia*, *Retratos*, *Casal*, *Recepção*).
   * Leitura clara da divisão de equipe: Vinicius (noiva, preparação, cerimônia e principais) vs. Segundo fotógrafo (noivo, decoração, convidados e reações). Horários flexíveis vinculados à luz e beleza.
   * Retratos de grupo ergonômicos: idosos e pessoas com mobilidade reduzida em 1º lugar (#3 Avós - Prioridade).
   * Painel dedicado de Pré-wedding: vestuário, Harley-Davidson e locações (Bar Thunder e Costa Azul).

4. **Consulta Logística & Acesso Prático (Locais & Fornecedores)**:
   * Local oficial confirmado: **Espaço Lux** (Rio das Ostras).
   * Ações com 1 toque: rotas diretas no Google Maps e Waze, e botão de WhatsApp com a Versa Visual.
   * Campo opcional e desimpedido para anotações de contatos extras.

5. **Saída e Compartilhamento**:
   * Exportação de **Resumo do Roteiro Fotográfico** via `jsPDF`, limpo e focado na cobertura e lista de retratos.
   * Resiliência de estado contínua via `localStorage` versionado, sem perda de anotações ou uploads ao recarregar.

## 6. Dados e persistência

- A aplicação é client-side e não possui backend ou autenticação. Preferências, notas, favoritos, referências adicionadas, roteiro e fornecedores ficam no `localStorage` do navegador.
- Os contratos canônicos são `src/app/data/preWeddingData.ts` e `src/app/data/shotListData.ts`. Alterações estruturais exigem migração ou atualização das chaves `camila_carlos_shotlist_version` e `camila_carlos_vendors_version`.
- As chaves persistidas são `camila_carlos_theme`, `camila_carlos_active_tab`, `camila_carlos_moodboard_items`, `camila_carlos_liked_ids`, `camila_carlos_photo_notes`, `camila_carlos_shotlist`, `camila_carlos_shotlist_version`, `camila_carlos_vendors` e `camila_carlos_vendors_version`.
- Toda imagem adicionada pelo usuário passa por `compressImageFile`, limitada a 1600 px e JPEG 0,82, antes da persistência para proteger a cota do navegador.
- `public/pre-wedding`, `public/brand-assets` e `_archive` são acervos protegidos. O redesign deve preservar favoritos, observações, upload, roteiro, fornecedores, compartilhamento e exportação em PDF.
