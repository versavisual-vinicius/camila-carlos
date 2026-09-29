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

export interface PhotographyTimelineBlock {
  id: string;
  phase: "pre-wedding" | "making-of" | "cerimonia" | "altar" | "golden-hour" | "festa";
  title: string;
  location: string;
  teamDivision: string;
  whatWillBeDone: string;
  isHighlight?: boolean;
}

// Manter alias retrocompatível
export type SolarTimelineBlock = PhotographyTimelineBlock;

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

// Shot List com foco na noiva e dinâmica fluida (sem imposição de minutos rígidos)
export const INITIAL_SHOT_LIST_GROUPS: ShotListGroup[] = [
  {
    id: "avos-mobilidade",
    name: "01 · Prioridade de Conforto: Avós",
    targetPhase: "Altar Imediato",
    badge: "Prioridade de Conforto",
    items: [
      {
        id: "am-01",
        title: "Noivos + Avós da Noiva",
        names: "Avó e Avô da Noiva",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Prioridade 01"
      },
      {
        id: "am-02",
        title: "Noivos + Avós do Noivo",
        names: "Avó e Avô do Noivo",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Prioridade 02"
      }
    ]
  },
  {
    id: "familia-noiva",
    name: "02 · Família da Noiva",
    targetPhase: "Altar Principal",
    badge: "Família da Noiva",
    items: [
      {
        id: "fn-01",
        title: "Noivos + Pais da Noiva",
        names: "Mãe e Pai da Noiva",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-02",
        title: "Noiva + Mãe da Noiva (Retrato Íntimo)",
        names: "Mãe da Noiva",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-03",
        title: "Noiva + Pai da Noiva (Abraço & Emoção)",
        names: "Pai da Noiva",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-04",
        title: "Noivos + Pais e Irmãos da Noiva",
        names: "Família da Noiva Completa",
        isMandatory: true,
        isCompleted: false
      }
    ]
  },
  {
    id: "familia-noivo",
    name: "03 · Família do Noivo",
    targetPhase: "Altar Principal",
    badge: "Família do Noivo",
    items: [
      {
        id: "fno-01",
        title: "Noivos + Pais do Noivo",
        names: "Mãe e Pai do Noivo",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-02",
        title: "Noivo + Mãe do Noivo (Retrato de Afeto)",
        names: "Mãe do Noivo",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-03",
        title: "Noivo + Pai do Noivo (Abraço & Cumplicidade)",
        names: "Pai do Noivo",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-04",
        title: "Noivos + Pais e Irmãos do Noivo",
        names: "Família do Noivo Completa",
        isMandatory: true,
        isCompleted: false
      }
    ]
  },
  {
    id: "padrinhos-madrinhas",
    name: "04 · Padrinhos, Madrinhas & Cortejo",
    targetPhase: "Altar & Gramado",
    badge: "Cortejo",
    items: [
      {
        id: "pm-01",
        title: "Noivos + Todas as Madrinhas e Padrinhos",
        names: "Todos os casais de padrinhos",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Foto Oficial do Cortejo"
      },
      {
        id: "pm-02",
        title: "Noiva + Madrinhas (Descontração & Alegria)",
        names: "Todas as Madrinhas",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "pm-03",
        title: "Noivo + Padrinhos (Brinde & Espontaneidade)",
        names: "Todos os Padrinhos",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "pm-04",
        title: "Noivos + Daminhas e Pajens",
        names: "Crianças do cortejo",
        isMandatory: false,
        isCompleted: false
      }
    ]
  },
  {
    id: "amigos-especiais",
    name: "05 · Amigos Especiais & Grupos Afetivos",
    targetPhase: "Lounge / Coquetel",
    badge: "Opcional",
    items: [
      {
        id: "ae-01",
        title: "Noivos + Amigos Próximos",
        names: "Grupo de amigos",
        isMandatory: false,
        isCompleted: false
      }
    ]
  }
];

// Cronograma Fotográfico: Pré-Wedding e Fotografia do Casamento
// Detalha o que será feito e como a equipe se divide, sem regras ou horários rígidos
export const PHOTOGRAPHY_TIMELINE_BLOCKS: PhotographyTimelineBlock[] = [
  {
    id: "time-prewedding",
    phase: "pre-wedding",
    title: "Ensaio Pré-Wedding",
    location: "Bar Thunder & Orla / Falésias de Costa Azul — Rio das Ostras",
    whatWillBeDone: "Um ensaio intimista e leve. Começamos com a textura autêntica do Bar Thunder e seguimos para o entardecer nas falésias e orla da Costa Azul, com luz suave e vento natural.",
    teamDivision: "Direção fotográfica por Vinicius Cunha. Uma experiência leve para vocês se acostumarem com a câmera, entenderem nossa dinâmica e criarem fotos com a personalidade do casal.",
    isHighlight: false
  },
  {
    id: "time-makingof",
    phase: "making-of",
    title: "Preparação & Making-of da Noiva e do Noivo",
    location: "Espaço Lux · Suíte da Noiva & Espaço do Noivo",
    whatWillBeDone: "Registro afetivo e com calma dos detalhes que vocês escolheram com tanto carinho (vestido, alianças, convite, sapatos, buquê) e retratos individuais da noiva e do noivo já prontos, com tranquilidade antes da cerimônia.",
    teamDivision: "Como a equipe se divide: Vinicius Cunha fica dedicado à noiva na suíte. O segundo fotógrafo acompanha o noivo e registra a cenografia do espaço antes da chegada dos convidados.",
    isHighlight: false
  },
  {
    id: "time-cerimonia",
    phase: "cerimonia",
    title: "Cortejo & Cerimônia de Casamento",
    location: "Altar ao Ar Livre — Espaço Lux",
    whatWillBeDone: "Cobertura documental e sensível das entradas, olhares emocionados, votos sinceros e troca de alianças sob luz natural, registrando a verdade de cada momento.",
    teamDivision: "Como a equipe se divide: Dois ângulos sincronizados — um fotógrafo dedicado às expressões da noiva e cortejo; outro focado no noivo no altar, emoção dos pais e convidados.",
    isHighlight: false
  },
  {
    id: "time-altar",
    phase: "altar",
    title: "Fotos Protocolares com Família & Padrinhos",
    location: "Altar Principal",
    whatWillBeDone: "Registros essenciais com a família e padrinhos logo após o sim, conduzidos de maneira ágil e leve para que todos possam aproveitar o coquetel com tranquilidade.",
    teamDivision: "Como a equipe se divide: Um fotógrafo conduz as combinações com leveza; o segundo fotógrafo apoia na organização para não cansar ninguém.",
    isHighlight: false
  },
  {
    id: "time-couple",
    phase: "golden-hour",
    title: "Retratos dos Noivos ao Pôr do Sol",
    location: "Gramado Externo & Mirante Costa Azul",
    whatWillBeDone: "Um momento a dois de Camila & Carlos com a fotografia para aproveitar a luz dourada do entardecer. Uma pausa deliciosa para respirarem recém-casados e criarem retratos inesquecíveis.",
    teamDivision: "Direção atenta de Vinicius Cunha explorando a luz suave, o movimento do vestido e a conexão autêntica de vocês dois.",
    isHighlight: true
  },
  {
    id: "time-festa",
    phase: "festa",
    title: "Recepção, Brinde & Pista de Dança",
    location: "Salão Principal & Lounge — Espaço Lux",
    whatWillBeDone: "Entrada dos noivos, brinde com padrinhos, corte do bolo e cobertura animada da pista com muita espontaneidade, abraços e alegria com os amigos.",
    teamDivision: "Como a equipe se divide: Iluminação dedicada para registrar o ritmo da pista e as melhores comemorações sem interferir na festa.",
    isHighlight: false
  }
];

// Alias para retrocompatibilidade
export const SOLAR_TIMELINE_BLOCKS = PHOTOGRAPHY_TIMELINE_BLOCKS;

// Fornecedores Chave: Apenas Espaço Lux e Versa Visual
export const KEY_VENDORS: KeyVendor[] = [
  {
    id: "ven-01",
    role: "Local do Evento",
    name: "Espaço Lux — Rio das Ostras",
    phone: "5522997766554",
    whatsappMessage: "Olá, equipe Espaço Lux! Aqui é a Camila, sobre o casamento no espaço.",
    address: "Espaço Lux, Rio das Ostras - RJ",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Espaço+Lux+Rio+das+Ostras",
    category: "espaco"
  },
  {
    id: "ven-02",
    role: "Direção Fotográfica",
    name: "Versa Visual — Vinicius Cunha (@v1ncsc)",
    phone: "5522997624631",
    whatsappMessage: "Oi Vini! Estou acompanhando o moodboard e roteiro de fotografia de Camila & Carlos.",
    address: "Rio das Ostras & Macaé, RJ",
    category: "foto"
  }
];

// Categorias sugeridas para preenchimento opcional da noiva
export const OPTIONAL_VENDOR_CATEGORIES = [
  { key: "cerimonial", label: "Cerimonial & Assessoria" },
  { key: "beleza", label: "Beleza & Make da Noiva" },
  { key: "decoracao", label: "Decoração & Cenografia" },
  { key: "musica", label: "Música, DJ & Iluminação" },
  { key: "buffet", label: "Buffet & Gastronomia" },
  { key: "celebrante", label: "Celebrante do Casamento" }
];
