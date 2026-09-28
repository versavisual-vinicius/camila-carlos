export interface ShotListItem {
  id: string;
  title: string;
  names: string;
  isMandatory: boolean; // true = Obrigatória, false = Se der tempo
  isCompleted: boolean;
  priorityBadge?: string;
  note?: string;
}

export interface ShotListGroup {
  id: string;
  name: string;
  estimatedMinutes: number;
  targetPhase: string;
  badge?: string;
  items: ShotListItem[];
}

export interface SolarTimelineBlock {
  id: string;
  phase: "manha" | "tarde" | "golden-hour" | "noite";
  timeRange: string;
  title: string;
  location: string;
  description: string;
  isGoldenHourLock?: boolean;
  alertWarning?: string;
}

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

export interface DeliveryStage {
  id: string;
  stepNumber: number;
  title: string;
  status: "completed" | "scheduled" | "pending";
  dateInfo: string;
  description: string;
}

// Initial Shot List modular data organizada pelo protocolo editorial Versa Visual
export const INITIAL_SHOT_LIST_GROUPS: ShotListGroup[] = [
  {
    id: "avos-mobilidade",
    name: "01 · Prioridade Máxima: Avós & Mobilidade Reduzida",
    estimatedMinutes: 6,
    targetPhase: "Altar Imediato",
    badge: "Liberar em 6 min",
    items: [
      {
        id: "am-01",
        title: "Noivos + Avós da Noiva",
        names: "Avó [Nome] e Avô [Nome]",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Prioridade 01 · Mobilidade"
      },
      {
        id: "am-02",
        title: "Noivos + Avós do Noivo",
        names: "Avó [Nome] e Avô [Nome]",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Prioridade 02 · Mobilidade"
      }
    ]
  },
  {
    id: "familia-noiva",
    name: "02 · Família Nuclear da Noiva",
    estimatedMinutes: 8,
    targetPhase: "Altar Principal",
    badge: "8 minutos",
    items: [
      {
        id: "fn-01",
        title: "Noivos + Pais da Noiva",
        names: "Mãe [Nome] e Pai [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-02",
        title: "Noiva + Mãe da Noiva (Retrato Íntimo & Detalhes)",
        names: "Mãe [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-03",
        title: "Noiva + Pai da Noiva (Abraço & Emoção)",
        names: "Pai [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fn-04",
        title: "Noivos + Pais e Irmãos da Noiva (Família Completa)",
        names: "Pais e Irmãos [Nomes]",
        isMandatory: true,
        isCompleted: false
      }
    ]
  },
  {
    id: "familia-noivo",
    name: "03 · Família Nuclear do Noivo",
    estimatedMinutes: 8,
    targetPhase: "Altar Principal",
    badge: "8 minutos",
    items: [
      {
        id: "fno-01",
        title: "Noivos + Pais do Noivo",
        names: "Mãe [Nome] e Pai [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-02",
        title: "Noivo + Mãe do Noivo (Retrato de Afeto)",
        names: "Mãe [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-03",
        title: "Noivo + Pai do Noivo (Cúmplice & Postura)",
        names: "Pai [Nome]",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "fno-04",
        title: "Noivos + Pais e Irmãos do Noivo (Família Completa)",
        names: "Pais e Irmãos [Nomes]",
        isMandatory: true,
        isCompleted: false
      }
    ]
  },
  {
    id: "padrinhos-madrinhas",
    name: "04 · Padrinhos, Madrinhas & Cortejo",
    estimatedMinutes: 10,
    targetPhase: "Altar & Gramado",
    badge: "10 minutos",
    items: [
      {
        id: "pm-01",
        title: "Noivos + Todas as Madrinhas e Padrinhos (Composição Editorial Aberta)",
        names: "Todos os casais de padrinhos",
        isMandatory: true,
        isCompleted: false,
        priorityBadge: "Foto Oficial do Cortejo"
      },
      {
        id: "pm-02",
        title: "Noiva + Madrinhas (Composição Editorial com Buquês & Risadas)",
        names: "Todas as Madrinhas",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "pm-03",
        title: "Noivo + Padrinhos (Espontânea, Brinde & Descontração)",
        names: "Todos os Padrinhos",
        isMandatory: true,
        isCompleted: false
      },
      {
        id: "pm-04",
        title: "Noivos + Daminhas e Pajens (Cortejo Infantil)",
        names: "Daminhas e Pajens [Nomes]",
        isMandatory: false,
        isCompleted: false,
        priorityBadge: "Liberar logo após o clique"
      }
    ]
  },
  {
    id: "amigos-especiais",
    name: "05 · Amigos Especiais & Grupos Afetivos",
    estimatedMinutes: 5,
    targetPhase: "Lounge / Coquetel",
    badge: "5 minutos (Opcional)",
    items: [
      {
        id: "ae-01",
        title: "Noivos + Amigos de Infância / Faculdade",
        names: "Grupo de amigos próximos",
        isMandatory: false,
        isCompleted: false
      },
      {
        id: "ae-02",
        title: "Noivos + Conexões de Trabalho / Amigos Especiais",
        names: "Convidados de honra",
        isMandatory: false,
        isCompleted: false
      }
    ]
  }
];

// Solar Daylight Timeline of Rio das Ostras com engenharia solar Versa Visual
export const SOLAR_TIMELINE_BLOCKS: SolarTimelineBlock[] = [
  {
    id: "time-01",
    phase: "manha",
    timeRange: "13:00 — 15:30",
    title: "Making Of da Noiva",
    location: "Espaço Lux / Suíte Master da Noiva",
    description: "Preparação de cabelo, maquiagem, robe e detalhes afetivos (vestido no cabide, alianças, convite, sapatos e buquê fresco). Margem de segurança de 45 min para retratos com o vestido impecável e sem correria.",
    isGoldenHourLock: false
  },
  {
    id: "time-02",
    phase: "tarde",
    timeRange: "14:30 — 16:00",
    title: "Making Of do Noivo & Brinde com Padrinhos",
    location: "Espaço Lux / Suíte do Noivo ou Lounge de Apoio",
    description: "Alfaiataria, abotoaduras, relógio, ajuste de gravata e perfume. Retratos solo de elegância, afeto com os pais e brinde descontraído com os padrinhos antes da cerimônia.",
    isGoldenHourLock: false
  },
  {
    id: "time-03",
    phase: "tarde",
    timeRange: "15:45 — 16:15",
    title: "Retratos Solo da Noiva & Detalhes do Véu",
    location: "Espaço Lux (Área Verde & Arquitetura)",
    description: "Vestido 100% impecável, maquiagem intacta e luz natural suave antes da movimentação dos convidados nos jardins.",
    isGoldenHourLock: false
  },
  {
    id: "time-04",
    phase: "tarde",
    timeRange: "16:15 — 16:30",
    title: "⚠️ Trava Técnica: Alinhamento de Cortejo & Blindagem de Horário",
    location: "Espaço Lux / Concentração dos Padrinhos",
    description: "Buffer preventivo de 15 minutos. Cerimonial posiciona cortejo na fila. Entrada impreterível às 16:30 para garantir o pôr do sol astronômico.",
    isGoldenHourLock: false,
    alertWarning: "⚠️ Trava Técnica: Qualquer atraso na entrada compromete diretamente a luz dourada do casal no mirante."
  },
  {
    id: "time-05",
    phase: "tarde",
    timeRange: "16:30 — 17:15",
    title: "Cerimônia Integrada ao Ar Livre",
    location: "Espaço Lux (Altar Externo)",
    description: "Entrada dos padrinhos, cortejo dos noivos, votos autorais com luz natural dourando e bênção final.",
    isGoldenHourLock: false
  },
  {
    id: "time-06",
    phase: "golden-hour",
    timeRange: "17:15 — 17:45",
    title: "☀️ Pôr do Sol & Retratos Exclusivos do Casal (Janela Crítica)",
    location: "Espaço Lux / Mirante Costa Azul",
    description: "Janela dourada imperdível! Horário astronômico do pôr do sol em Rio das Ostras travado às 17:35. Trinta minutos sagrados dos recém-casados a sós com a direção de fotografia da Versa Visual (@v1ncsc).",
    isGoldenHourLock: true,
    alertWarning: "⚠️ Trava Técnica Máxima: Não permitir fotos protocolares com familiares ou cumprimentos de mesa nesta janela. A luz dourada dura apenas 30 minutos."
  },
  {
    id: "time-07",
    phase: "golden-hour",
    timeRange: "17:45 — 18:25",
    title: "Execução da Shot List Protocolar no Altar",
    location: "Espaço Lux (Altar / Painel Cenográfico)",
    description: "Execução ágil e cronometrada: Avós e idosos liberados em 6 minutos; famílias nucleares em 16 minutos; padrinhos em 10 minutos. Total de 32 a 35 min para liberar os convidados ao coquetel.",
    isGoldenHourLock: false
  },
  {
    id: "time-08",
    phase: "noite",
    timeRange: "18:30 em diante",
    title: "Recepção, Brinde dos Noivos, Jantar & Pista",
    location: "Espaço Lux (Salão Principal & Lounge)",
    description: "Transição para iluminação cênica noturna, flash off-camera editorial e cobertura documental viva da festa e da pista de dança.",
    isGoldenHourLock: false
  }
];

// Key Vendors of Camila & Carlos com comunicação 1-clique
export const KEY_VENDORS: KeyVendor[] = [
  {
    id: "ven-01",
    role: "Cerimonial & Assessoria",
    name: "Cerimonial do Evento",
    phone: "5522998877665",
    whatsappMessage: "Olá! Segue o link com a Shot List e o Roteiro Logístico consolidado de Camila & Carlos para o casamento no Espaço Lux: ",
    category: "cerimonial"
  },
  {
    id: "ven-02",
    role: "Local do Evento",
    name: "Espaço Lux — Rio das Ostras",
    phone: "5522997766554",
    whatsappMessage: "Olá, equipe Espaço Lux! Aqui é sobre a logística fotográfica do casamento de Camila & Carlos.",
    address: "Espaço Lux, Rio das Ostras - RJ",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Espaço+Lux+Rio+das+Ostras",
    category: "espaco"
  },
  {
    id: "ven-03",
    role: "Direção Fotográfica",
    name: "Versa Visual — Vinicius Cunha (@v1ncsc)",
    phone: "5522997624631",
    whatsappMessage: "Oi Vini! Estou acompanhando o moodboard e a Shot List de Camila & Carlos no app.",
    category: "foto"
  },
  {
    id: "ven-04",
    role: "Beleza & Make da Noiva",
    name: "Produção de Cabelo & Maquiagem",
    phone: "5522999881122",
    whatsappMessage: "Olá! Segue o alinhamento de horários do Making-of da Noiva no Espaço Lux (término impreterível às 15:30): ",
    category: "beleza"
  },
  {
    id: "ven-05",
    role: "Decoração & Cenografia",
    name: "Equipe de Decoração & Flores",
    phone: "5522999883344",
    whatsappMessage: "Olá! Alinhamento de fotos dos detalhes da mesa posta e altar externo antes da chegada dos convidados: ",
    category: "decoracao"
  },
  {
    id: "ven-06",
    role: "Música & DJ",
    name: "DJ & Iluminação Cênica",
    phone: "5522999885566",
    whatsappMessage: "Olá! Alinhamento dos momentos de cortejo, entrada dos noivos no salão e abertura da pista de dança: ",
    category: "musica"
  }
];

// Delivery Lifecycle Stages (Esteira de Entregas Versa Visual)
export const DELIVERY_STAGES: DeliveryStage[] = [
  {
    id: "stage-1",
    stepNumber: 1,
    title: "Briefing, Locações & Moodboard",
    status: "completed",
    dateInfo: "Concluído",
    description: "Curadoria das referências, definição de rota (Bar Thunder & Costa Azul) e alinhamento de estilo fotográfico."
  },
  {
    id: "stage-2",
    stepNumber: 2,
    title: "Ensaio Pré-Wedding",
    status: "completed",
    dateInfo: "Agendado (T-60 dias)",
    description: "Execução do ensaio fotográfico no Bar Thunder e orla da Costa Azul ao entardecer com luz suave."
  },
  {
    id: "stage-3",
    stepNumber: 3,
    title: "Cobertura Completa do Casamento",
    status: "scheduled",
    dateInfo: "Dia D (Espaço Lux)",
    description: "Do making-of duplo à festa final com equipe Versa Visual completa, blindagem solar e direção editorial."
  },
  {
    id: "stage-4",
    stepNumber: 4,
    title: "Prévias em Alta Resolução em 48h",
    status: "pending",
    dateInfo: "Entrega: D+2 dias",
    description: "Pacote de 30 a 50 fotos tratadas com curadoria ágil para redes sociais e envio à família."
  },
  {
    id: "stage-5",
    stepNumber: 5,
    title: "Galeria Completa para Seleção",
    status: "pending",
    dateInfo: "Entrega: D+30 dias",
    description: "Acesso à plataforma online protegida por senha com todas as fotos tratadas em cor, contraste e nitidez."
  },
  {
    id: "stage-6",
    stepNumber: 6,
    title: "Diagramação & Entrega do Álbum",
    status: "pending",
    dateInfo: "Pós-seleção",
    description: "Design editorial personalizado das lâminas do álbum físico, revisão fina e impressão em papel fine art."
  }
];
