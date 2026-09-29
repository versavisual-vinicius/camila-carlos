# Contexto do Projeto — Camila & Carlos (`camila-carlos`)

## 1. Visão do Projeto

O projeto **Camila & Carlos — Planejamento Executivo & Moodboard Editorial** é uma aplicação web autoral concebida e desenvolvida pela **Versa Visual** (estúdio boutique de fotografia de casamentos liderado por **Vinicius Cunha — [@v1ncsc](https://instagram.com/v1ncsc)**).

O propósito da aplicação é substituir os tradicionais arquivos PDF estáticos e pastas dispersas do Pinterest/Drive por um **hub executivo interativo**, moderno e sob medida para o casal Camila & Carlos, o cerimonial e a equipe de fotografia.

---

## 2. Partes Interessadas & Personas

| Persona | Papel no Projeto | Necessidades Principais |
|---|---|---|
| **Camila (Noiva)** | Usuária principal e curadora de inspirações | Visualizar fotos curadas com facilidade, favoritar suas preferidas, incluir notas pessoais sobre vestidos/poses e cadastrar fornecedores contratados. |
| **Carlos (Noivo)** | Parceiro e co-tomador de decisão | Ter clareza sobre o roteiro do casamento, horários do making of e locais com rotas rápidas no Waze/Maps. |
| **Vinicius Cunha (Versa Visual)** | Diretor Criativo e Fotógrafo Principal | Acompanhar os gostos da noiva em tempo real, orquestrar a divisão de equipe e conduzir as fotos protocolares com rapidez e sensibilidade. |
| **Segundo Fotógrafo** | Cobertura complementar e cenografia | Consultar a divisão de tarefas no cronograma para cobrir making-of do noivo, decoração e ângulos sincronizados durante a cerimônia. |
| **Cerimonial & Assessoria** | Gestão de pista e altar | Receber o Guia Rápido do Altar em PDF para organizar o cortejo e os familiares logo após o "sim", sem atrasar a festa. |

---

## 3. Locações e Roteiro Territorial

* **Ensaio Pré-Wedding**:
  * *Ponto 1*: **Bar Thunder** (Rio das Ostras) — Textura autêntica, luz de fim de tarde, ambiente descontraído.
  * *Ponto 2*: **Falésias & Orla de Costa Azul** (Rio das Ostras) — Natureza, vento suave, fotos amplas de silhueta e conexão ao pôr do sol.
* **Casamento**:
  * *Local Único*: **Espaço Lux** (Rio das Ostras / RJ) — Cerimônia ao ar livre no altar do gramado e recepção no salão principal integrado.

---

## 4. Pilares Arquiteturais da Aplicação

1. **Zero Atrito e Funcionamento Offline/Instantâneo**:
   * Não exige login, senha ou cadastro prévio.
   * Utiliza o `localStorage` do navegador para persistir favoritos, notas da noiva e itens customizados.
2. **Compressão Inteligente Client-Side**:
   * A noiva pode subir fotos de 10-25MB direto do iPhone; o utilitário `imageCompressor.ts` reduz em milissegundos para ~150KB em Canvas HTML5 mantendo qualidade Retina para o roteiro.
3. **Cronograma com Foco na Luz (Sem Imposição Rígida de Horários)**:
   * Em vez de impor minutos engessados que geram ansiedade quando atrasos acontecem, o cronograma foca no que será realizado e na divisão de equipe, com destaque para a *Golden Hour* dos noivos.
4. **Exportação Executiva em PDF**:
   * Geração direta no navegador via `jsPDF`, produzindo documentos A4 prontos para envio no WhatsApp do cerimonial e para impressão física na prancheta da equipe.
