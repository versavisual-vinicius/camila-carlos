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

## 5. Pilares Arquiteturais da Aplicação

1. **Zero Atrito e Funcionamento Offline**:
   * Acesso direto no navegador móvel ou desktop sem login ou senhas obrigatórias.
   * Persistência em `localStorage` com controle de versão.
2. **Upload Mobile Simplificado com Compressão Retina**:
   * Fluxo ágil: selecionar foto → visualizar → salvar.
   * Compressão automática em Canvas HTML5 (1600px / 0.82) para preservar espaço e fluidez.
3. **Exportação Executiva Limpa**:
   * **Resumo do Roteiro Fotográfico** em PDF vetorial via `jsPDF`, focado estritamente na cobertura e lista de retratos, sem invadir funções de cerimonial.
