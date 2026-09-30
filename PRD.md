# Camila & Carlos — PRD definitivo para as telas do Stitch

## 1. Produto e foco

Aplicação web autoral da **Versa Visual**, sob direção de **Vinicius Cunha**, que reúne referências, preferências do casal e planejamento da fotografia do casamento e do pré-wedding.

**Camila é a principal usuária.** Ela escolhe imagens, registra o que gosta e compartilha sua intenção visual com o fotógrafo. Carlos participa das escolhas e do ensaio; a equipe de fotografia transforma essas referências em orientação para a cobertura. A assessoria consulta apenas os alinhamentos úteis à fotografia.

O produto deve responder a quatro perguntas: **o que Camila gosta, como isso orienta as fotos, como a equipe cobre cada momento e quais informações precisam estar acessíveis.**

## 2. Relação com o projeto atual e o Stitch

As telas do Stitch são a referência visual para a evolução da interface; este documento define seu conteúdo, comportamento e limites. Preservar os dados, as interações úteis e a simplicidade do projeto existente ao adaptar os layouts.

As observações do PDF são diretrizes de produto já aplicadas, não uma nova lista de correções. Elas prevalecem sobre trechos anteriores que ampliam o aplicativo para gestão de cerimonial.

## 3. Recomendação Estrutural e Arquitetura de Interação

> **Recomendação estrutural:** priorizar a jornada centrada em mobile com navegação inferior fixa de 4 abas, gavetas de edição (Vaul/Radix) e ausência de bloqueios por autenticação para maximizar a conversão da noiva em curadoria visual.

### 1. Ponto de Entrada & Onboarding (Visão Geral / Home)
* **Entrada:** Acesso direto via link web no navegador do smartphone, sem barreira de login/senha (persistência em `localStorage`).
* **Visão Inicial:** Banner editorial acolhedor com a identidade de Camila & Carlos.
  * Se a data estiver confirmada, exibe contagem regressiva; se não, omite o bloco para evitar ruído.
  * Card de próximo passo em destaque: *"Continuar curadoria visual"* ou *"Próximo alinhamento da cobertura"*.
* **Microinteração:** Atalhos rápidos em cards limpos para *Referências*, *Pré-wedding* e *Roteiro*, sem checklists administrativos soltos.

### 2. Ciclo de Curadoria Visual (Referências)
* **Navegação na Galeria:**
  * Grid fluido em *masonry* responsivo, com rolagem contínua.
  * Filtros de topo táteis: busca por texto/tags e atalho para ver apenas "Favoritos".
* **Fluxo de Detalhe e Registro de Preferência:**
  1. Camila toca em uma fotografia $\rightarrow$ abre visualização expandida ou modal/drawer (Vaul).
  2. Toque no ícone de favorito (toggle instantâneo com feedback háptico/visual).
  3. Preenchimento do campo de texto livre: *"O que você gosta nesta foto?"* (auto-save ou botão de confirmação claro).
  4. Adição/seleção de tags livres (chips dinâmicos reutilizáveis) e escolha da *"Pasta de destino"*.
  5. Navegação lateral (swipe no mobile ou setas no desktop) para a foto anterior/próxima sem fechar o visualizador.
* **Fluxo de Upload Mobile (Adicionar Referência):**
  1. Toque no botão de ação flutuante (FAB) *"Adicionar referência"*.
  2. Seleção no rolo de câmera do celular $\rightarrow$ compressão e redimensionamento transparentes no client-side.
  3. Pré-visualização imediata com preenchimento opcional do motivo do gosto $\rightarrow$ confirmação (*Salvar*).
  4. Toast discreto de sucesso via Sonner; card inserido no topo da galeria.

### 3. Alinhamento de Cobertura (Roteiro Fotográfico)
* **Visualização da Jornada do Evento:** Linha do tempo vertical em cards expansíveis, cobrindo sequencialmente: *Pré-wedding*, *Preparação*, *Cerimônia*, *Retratos*, *Casal* e *Recepção*.
* **Leitura da Divisão de Equipe:**
  * Indicador claro de responsabilidade: Vinicius (foco na noiva, preparação, cerimônia e momentos principais) vs. Segundo fotógrafo (noivo, decoração, convidados e reações).
  * Horários flexíveis vinculados exclusivamente à luz e à conclusão da beleza, sem travas rígidas de cerimonial.
* **Organização de Retratos de Grupo:**
  * Ordem ergonômica pré-estabelecida com foco no conforto: primeiro idosos/mobilidade reduzida (#3 Avós - Prioridade) $\rightarrow$ famílias $\rightarrow$ padrinhos $\rightarrow$ amigos.
* **Subjornada Pré-wedding:**
  * Toque no card de Pré-wedding abre painel dedicado: referências de vestuário, uso da Harley-Davidson e locações confirmadas (Bar Thunder e Falésias/Costa Azul).

### 4. Consulta Logística & Acesso Prático (Locais & Fornecedores)
* **Consulta Rápida:** Visualização do local oficial confirmado (**Espaço Lux**, em Rio das Ostras, integrando cerimônia, festa e suíte dos noivos).
* **Ações com 1 Toque:**
  * Botão direto para traçar rota no Google Maps ou Waze.
  * Botão direto para conversa no WhatsApp com a Versa Visual.
* **Personalização Controlada:** Campo opcional e não obrigatório para a noiva salvar contatos extras se desejar.

### 5. Saída e Compartilhamento
* **Exportação do Roteiro:** Ação simples de exportação via jsPDF, gerando documento enxuto contendo apenas divisão de equipe, lista prioritária de retratos e horários-chave alinhados.
* **Resiliência de Estado:** Feedback visual contínuo de dados preservados localmente, garantindo que o fechamento ou recarregamento da aba não gere perda de anotações ou uploads.

## 3.1. Navegação e Conteúdo Geral

Quatro áreas principais. O pré-wedding tem destaque na jornada e pode abrir uma página própria, sem exigir uma quinta aba. Detalhes de momentos, fotos e locais são páginas ou painéis dessas áreas.

| Área | Conteúdo principal | Ações da usuária |
| --- | --- | --- |
| **Visão geral** | Identidade do casal, data quando confirmada, próximos alinhamentos fotográficos e atalhos para referências, pré-wedding e roteiro. | Retomar a curadoria e consultar o próximo passo. |
| **Referências** | Galeria de fotografias, favoritos, pastas, observações pessoais e tags criadas pela noiva. | Buscar, filtrar, favoritar, adicionar fotos e editar suas preferências. |
| **Roteiro fotográfico** | Pré-wedding, preparação, cerimônia, retratos de família e padrinhos, casal e recepção; divisão da equipe em cada momento. | Consultar a cobertura e registrar alinhamentos relevantes. |
| **Locais & fornecedores** | Mapa, locais conhecidos e fotografia oficial; contatos adicionais opcionais. | Abrir rotas, acessar contatos e adicionar informações quando quiser. |

A home deve ser leve, com fotografia e próximos passos claros. Contagem regressiva e progresso só aparecem quando sustentados pelos dados cadastrados. Checklists, quando úteis, ficam junto ao momento correspondente, sem criar um painel administrativo paralelo.

## 4. Curadoria visual

Galeria responsiva em masonry, com imagens em destaque, busca por título e tags e acesso aos favoritos. O total de fotos deve refletir o acervo real; as 58 imagens informadas são uma referência inicial, não uma quantidade fixa da interface.

Ao abrir uma foto, exibir imagem ampliada, anterior/próxima, favorito e edição das preferências. O campo central é **“O que você gosta nesta foto?”**, com texto livre salvo pela usuária. Não preencher esse campo com análise técnica do fotógrafo.

Tags e estilos são criados livremente por Camila, sem opções previamente cadastradas. Tags existentes podem ser reutilizadas após sua criação. A organização mostra somente **“Pasta de destino”** e as opções disponíveis, sem terminologia interna.

Adicionar referências pelo celular deve seguir um fluxo curto: **selecionar foto → visualizar → salvar**. Compressão e redimensionamento acontecem automaticamente. Oferecer feedback de salvamento e estados claros para galeria vazia, busca sem resultados e falha no upload.

No desktop, manter navegação por teclado; no mobile, controles acessíveis e painéis de edição fáceis de usar. Favoritos, notas, tags e pastas permanecem preservados na persistência disponível.

## 5. Planejamento da fotografia

O roteiro apresenta **o que será fotografado, como a equipe se divide e quando Camila precisa estar pronta**. A sequência acompanha os momentos reais do evento, com horários somente quando alinhados e necessários à cobertura.

| Responsável | Direção de cobertura |
| --- | --- |
| **Vinicius** | Noiva, preparação, momentos centrais, cerimônia, casal e retratos principais. |
| **Segundo fotógrafo** | Noivo, decoração, detalhes, convidados, reações e ângulos complementares. |

Essa divisão é uma orientação ajustável. O momento de término da beleza deve ser combinado para permitir os retratos desejados, sem impor automaticamente uma regra de 1h30 ou um horário fixo.

Nos retratos de grupos, priorizar **avós e pessoas com mobilidade reduzida**, depois família da noiva, família do noivo, padrinhos e madrinhas, amigos e outros grupos escolhidos. Permitir ajustes e inclusão de fotos específicas, favorecendo conforto e fluidez, sem formulários de administração familiar.

O pré-wedding reúne referências, locações, roupas, objetos e observações do casal. Bar Thunder e Falésias/Orla de Costa Azul são os locais informados no projeto; a Harley-Davidson pode integrar o ensaio conforme a escolha do casal. Informações de luz dependem da data e da locação, sem um horário de golden hour pré-fixado.

## 6. Locais, contatos e resumo compartilhável

Manter previamente preenchidos o mapa, o espaço do evento já conhecido e a **Versa Visual**. Outros fornecedores, contatos e observações são opcionais, adicionados pela noiva quando fizerem sentido.

Disponibilizar endereço, Google Maps, Waze e WhatsApp quando houver dados válidos. O mapa serve para localizar e chegar aos lugares; não deve apresentar rampas, vagas ou pontos de acesso inventados.

A exportação pode gerar um **resumo do roteiro fotográfico**, com divisão da equipe, lista de retratos e informações essenciais. Não incluir ficha do altar ou dossiê de cerimonial. Compartilhar o link não significa sincronizar automaticamente as edições entre dispositivos.

## 7. Direção visual e linguagem

Seguir a identidade das telas do Stitch: experiência editorial acolhedora, fotografia ampla, fundos claros e quentes, bom respiro, cards discretos, cantos suaves e hierarquia legível. Aplicar a paleta e a tipografia do conjunto aprovado de forma consistente; a base atual informada usa Playfair Display e Inter, e a proposta do Stitch cita Plus Jakarta Sans.

Usar o **logo da Versa Visual** na identificação da marca, com autoria de Vinicius Cunha. Não apresentar a empresa como ateliê.

A interface fala com Camila em linguagem simples: **“Suas referências”**, **“O que você gosta nesta foto?”**, **“Adicionar referência”** e **“Como vamos fotografar esse momento”**. Termos de engenharia e produção ficam fora dos textos de uso.

Mobile é o cenário principal: navegação inferior simples, ações fáceis de alcançar e drawers ou bottom sheets. Desktop oferece mais espaço para galeria e edição, mantendo as mesmas informações e possibilidades. Preservar contraste, foco visível, leitura confortável e feedback de salvamento.

## 8. Base técnica e limites

Manter a base informada: **React, TypeScript, Vite, Tailwind CSS, Motion, Radix/Vaul, Sonner, jsPDF e localStorage versionado**, com acesso pelo navegador sem login obrigatório.

A persistência local salva no navegador utilizado. Sincronização entre dispositivos, colaboração em tempo real, permissões por perfil e notificações automáticas exigem implementação específica e não integram esta consolidação.

Ficam fora do núcleo: gestão completa do casamento, documentação religiosa, organização de cortejo, protocolos de cerimonial, controle interno de equipamentos e promessas de entrega não contratadas.

## 9. Dados e critério de conclusão

Usar somente dados confirmados. Não fixar os exemplos antigos de **118 dias, 14 semanas, 15 tarefas, 15h30, 16h45, 80 vagas ou prévia em 48 horas**. Calcular indicadores a partir dos registros reais.

O cenário oficial e confirmado de cerimônia, recepção e suíte dos noivos é o **Espaço Lux** (Rio das Ostras). Locações hipotéticas de igrejas ou dados fictícios de cerimonial foram descartados. Não assumir nomes de assessores ou datas não confirmadas como fatos consolidados.

A adaptação está concluída quando as telas mantêm a direção visual do Stitch, a curadoria continua editável e preservada, o roteiro explica a cobertura com clareza, fornecedores adicionais permanecem opcionais e mobile e desktop oferecem paridade funcional. Essa validação depende das telas e da implementação; este documento consolida os requisitos.
