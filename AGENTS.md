# Diretrizes de Desenvolvimento para Agentes — Camila & Carlos (`camila-carlos`)

Este arquivo define as regras operacionais, restrições e padrões que qualquer agente de inteligência artificial deve seguir estritamente ao trabalhar neste repositório.

---

## 1. Identidade e Escopo do Projeto

* **Nome do Projeto**: `camila-carlos` / `wedding-moodboard`.
* **Propósito**: Aplicação web editorial de planejamento e moodboard para os clientes **Camila & Carlos** (casamento em Rio das Ostras / Espaço Lux), desenvolvida sob a direção artística de **Vinicius Cunha — Versa Visual** ([@v1ncsc](https://instagram.com/v1ncsc)).
* **Isolamento de Marca**: **NUNCA** misturar componentes, dados, estilos ou regras deste projeto com outros repositórios de Vini (como *Nexo*, *EventManager*, *Caso CIDA*, etc.).

---

## 2. Gerenciador de Pacotes e Comandos

* **Gerenciador Obrigatório**: Utilizar exclusivamente **`pnpm`** (nunca `npm` ou `yarn`).
* **Scripts Canônicos**:
  * Desenvolvimento local: `pnpm run dev`
  * Build de validação: `pnpm run build`
* Ao sugerir ou executar comandos de terminal, especifique sempre a pasta raiz do projeto (`/Users/viniciuscunha/3_DEV/wedding-moodboard`).

---

## 3. Preservação de Dados e Integridade

* **Proteção de Ativos**:
  * **NUNCA** excluir ou alterar os arquivos na pasta `public/pre-wedding/` (as 58 fotografias oficiais do acervo de Camila & Carlos).
  * **NUNCA** remover os ativos em `public/brand-assets/` (logotipos e monogramas da Versa Visual).
  * Preservar os arquivos arquivados na pasta `_archive/`.
* **Dados Base da Aplicação**:
  * Os dados contidos em `src/app/data/preWeddingData.ts` e `src/app/data/shotListData.ts` são os contratos canônicos acordados com os noivos e cerimonial. Modificações devem ser estritamente reversíveis e justificadas.
* **Persistência no LocalStorage**:
  * Qualquer alteração no formato das estruturas de dados do `localStorage` deve vir acompanhada da respectiva estratégia de migração ou atualização da chave de versão (`camila_carlos_shotlist_version`, `camila_carlos_vendors_version`).

---

## 4. Padrões de Código e Design System

* **Tipagem Estrita**: TypeScript com interfaces bem delimitadas para todas as props e estruturas de dados. Evitar o uso de `any`.
* **Estilização**:
  * Utilizar Tailwind CSS v4 via `@theme` e as classes utilitárias semânticas.
  * Respeitar os tokens de superfície definidos em `src/styles/theme.css` (`--surface`, `--on-surface`, `--primary`, `--secondary`, etc.).
  * Respeitar a tipografia pareada: **Playfair Display** para títulos/display e **Inter** para textos de interface e metadados.
* **Componentes de Ação e Interação**:
  * Manter feedback visual com animação via **Motion** e avisos táteis via **Sonner toast**.
  * Novas adições de imagens devem sempre passar pela função `compressImageFile` de `src/app/utils/imageCompressor.ts` para proteger a cota de armazenamento do navegador.

---

## 5. Verificação e Validação de Entrega

* Antes de finalizar qualquer alteração de código ou documentação, executar `pnpm run build` para garantir que o bundle compila com sucesso, sem erros de tipagem TypeScript ou de sintaxe CSS/Vite.
* Responda sempre em **português do Brasil**, de forma clara, concisa e calibrada ao nível técnico de Vini.
