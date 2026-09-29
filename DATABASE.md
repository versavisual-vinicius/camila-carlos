# Arquitetura de Dados & Armazenamento — Camila & Carlos

Este documento detalha o modelo de dados, a estratégia de persistência e as garantias de integridade da aplicação **Camila & Carlos**.

---

## 1. Filosofia de Dados: Client-First sem Backend

A aplicação adota uma arquitetura **100% Client-Side** apoiada em `localStorage`, garantindo:
* **Zero Latência**: Leitura e escrita síncronas imediatas no dispositivo da noiva.
* **Autonomia e Privacidade**: Todas as preferências e notas pessoais ficam no navegador do usuário.
* **Resiliência Offline**: A aplicação funciona perfeitamente sem conexão contínua com a internet.

---

## 2. Modelos de Dados (Schemas TypeScript)

Os contratos de dados estão localizados em [src/app/data/preWeddingData.ts](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/app/data/preWeddingData.ts) e [src/app/data/shotListData.ts](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/app/data/shotListData.ts).

### Item de Referência (`PreWeddingItem`)
```typescript
export type PreWeddingCategory = 'all' | 'natureza' | 'floresta' | 'urbano' | 'pb';

export interface PreWeddingItem {
  id: string;
  imageUrl: string;
  title: string;
  category: PreWeddingCategory;
  notes?: {
    description?: string;
    images?: string[];
    tags?: string[];
    location?: string;
  };
}
```

### Anotação Contextual da Noiva (`PhotoNoteData`)
```typescript
export interface PhotoNoteData {
  tags: string[];
  comment: string;
  updatedAt?: string;
}
```

### Item e Grupo de Shot List Protocolar
```typescript
export interface ShotListItem {
  id: string;
  title: string;
  names: string;
  isMandatory: boolean;
  isCompleted: boolean;
  priorityBadge?: string;
  note?: string;
}

export interface ShotListGroup {
  id: string;
  name: string;
  targetPhase: string;
  badge?: string;
  items: ShotListItem[];
}
```

### Bloco de Cronograma Fotográfico
```typescript
export interface PhotographyTimelineBlock {
  id: string;
  phase: "pre-wedding" | "making-of" | "cerimonia" | "altar" | "golden-hour" | "festa";
  title: string;
  location: string;
  teamDivision: string;
  whatWillBeDone: string;
  isHighlight?: boolean;
}
```

### Fornecedor / Parceiro (`KeyVendor`)
```typescript
export interface KeyVendor {
  id: string;
  role: string;
  name: string;
  phone: string;
  whatsappMessage: string;
  address?: string;
  mapsUrl?: string;
  wazeUrl?: string;
  category?: "cerimonial" | "espaco" | "foto" | "beleza" | "decoracao" | "musica" | "buffet" | "outros";
  isCustom?: boolean;
}
```

---

## 3. Mapeamento de Chaves no `localStorage`

| Chave | Tipo | Descrição |
|---|---|---|
| `camila_carlos_theme` | `string` | Tema ativo (`light` ou `dark`) |
| `camila_carlos_active_tab` | `string` | Aba ativa (`referencias`, `roteiro`, `fornecedores`) |
| `camila_carlos_liked_ids` | `string[]` (JSON) | Array de IDs das fotos favoritadas |
| `camila_carlos_photo_notes` | `Record<string, PhotoNoteData>` (JSON) | Notas e tags indexadas pelo ID da foto |
| `camila_carlos_shotlist` | `ShotListGroup[]` (JSON) | Itens e status de conclusão da Shot List |
| `camila_carlos_shotlist_version` | `string` | Versão do schema da Shot List (`v3_editorial`) |
| `camila_carlos_vendors` | `KeyVendor[]` (JSON) | Fornecedores ativos (confirmados + cadastrados pela noiva) |
| `camila_carlos_vendors_version` | `string` | Versão do catálogo de parceiros (`v3_real_vendors`) |
| `camila_carlos_moodboard_items` | `PreWeddingItem[]` (JSON) | Acervo de fotos (58 originais + uploads da noiva) |

---

## 4. Estratégia de Migração e Resolução de Conflitos

Para evitar que atualizações de código quebrem o estado salvo no navegador dos noivos:
1. Ao carregar a aplicação em [src/app/App.tsx](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/app/App.tsx), o sistema compara a chave `version` armazenada com a versão atual do código.
2. Se a versão divergir, os dados canônicos são reaplicados de forma não destrutiva para os campos essenciais, preservando itens com flag `isCustom: true`.
3. Existem botões explícitos com caixas de confirmação (`window.confirm`) para restaurar o estado inicial oficial em cada aba caso a noiva deseje resetar.

---

## 5. Prevenção de Estouro de Cota (QuotaExceededError)

* O limite de armazenamento padrão do `localStorage` na maioria dos navegadores móveis é de 5MB.
* Para viabilizar que o usuário adicione fotos em alta resolução sem estourar o limite, toda imagem enviada passa pela função `compressImageFile` ([src/app/utils/imageCompressor.ts](file:///Users/viniciuscunha/3_DEV/wedding-moodboard/src/app/utils/imageCompressor.ts)):
  * Redimensionamento proporcional máximo para 1600px.
  * Compressão JPEG com qualidade 0.82 via Canvas 2D.
  * O tamanho final é reduzido para ~150KB por foto, permitindo o armazenamento de dezenas de uploads sem falhas.
