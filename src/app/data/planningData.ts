export interface AcceptanceCriterion {
  id: string;
  text: string;
}

export interface PlanningCard {
  id: string;
  code: string;
  title: string;
  context: string;
  specs: {
    label: string;
    value: string;
  }[];
  criteria: AcceptanceCriterion[];
}

export interface PlanningSection {
  id: 'pre-wedding' | 'casamento' | 'acoes';
  number: number;
  title: string;
  subtitle: string;
  cards: PlanningCard[];
}

export const PLANNING_SECTIONS: PlanningSection[] = [
  {
    id: 'pre-wedding',
    number: 1,
    title: 'Ensaio Pré-Wedding',
    subtitle: 'Roteiro de locações, conexão espontânea e curadoria dos 6 eixos estéticos em Rio das Ostras.',
    cards: [
      {
        id: 'pw-01',
        code: 'CARD-PW-01',
        title: 'Planejamento e Roteiro de Locações',
        context: 'Definição da janela temporal e rota logística com valor afetivo para Camila & Carlos em Rio das Ostras.',
        specs: [
          {
            label: 'Janela de execução',
            value: 'Realizar o ensaio entre 2 e 3 meses (T-90 a T-60 dias) antes do casamento.'
          },
          {
            label: 'Rota confirmada',
            value: 'Bar Thunder (cenário intimista) seguido de Costa Azul (orla, pedras e golden hour).'
          },
          {
            label: 'Linguagem fotográfica',
            value: 'Conexão espontânea e estética editorial, sem poses estáticas forçadas.'
          }
        ],
        criteria: [
          { id: 'crit-pw01-1', text: 'Data e horário de início fixados na agenda do casal e do fotógrafo.' },
          { id: 'crit-pw01-2', text: 'Alinhamento prévio de autorização/consumo no Bar Thunder validado.' },
          { id: 'crit-pw01-3', text: 'Roteiro sequencial de deslocamento definido (Bar Thunder → Costa Azul).' }
        ]
      },
      {
        id: 'pw-02',
        code: 'CARD-PW-02',
        title: 'Curadoria Visual e Moodboard',
        context: 'Alinhamento estético de figurino, luz e enquadramentos a partir das referências da noiva.',
        specs: [
          {
            label: 'Arquivo base',
            value: 'Moodboard — Camila e Carlos — Pré-wedding (58 referências ativas).'
          },
          {
            label: 'Fonte de referências',
            value: 'Painel do Pinterest (camilasilva1320/pré-wedding).'
          },
          {
            label: 'Escopo visual',
            value: '6 eixos de referência (paleta de roupas, enquadramento, luz natural, movimento, intimidade e detalhes).'
          }
        ],
        criteria: [
          { id: 'crit-pw02-1', text: '6 blocos visuais revisados e mapeados para os cenários reais da rota.' },
          { id: 'crit-pw02-2', text: 'Paleta de figurino alinhada entre casal e locações (tons harmônicos com bar e orla).' }
        ]
      }
    ]
  },
  {
    id: 'casamento',
    number: 2,
    title: 'Casamento & Logística do Evento',
    subtitle: 'Formato integrado no Espaço Lux, engenharia de luz natural/mista e blindagem de tempo no Dia D.',
    cards: [
      {
        id: 'wed-01',
        code: 'CARD-WED-01',
        title: 'Formato do Evento e Espaço',
        context: 'Unificação operacional e leitura técnica de luz no Espaço Lux em Rio das Ostras.',
        specs: [
          {
            label: 'Formato',
            value: 'Cerimônia e celebração integradas no mesmo local para eliminação de deslocamentos e ganho de cobertura fotográfica.'
          },
          {
            label: 'Local',
            value: 'Espaço Lux, priorizado pelo controle e leitura de iluminação.'
          },
          {
            label: 'Engenharia de luz',
            value: 'Mapeamento de transição de luz natural para luz mista/noturna e planejamento de setup de flash (rebatido e off-camera).'
          }
        ],
        criteria: [
          { id: 'crit-wed01-1', text: 'Cronograma macro (cerimônia, fotos protocolares, entrada e festa) aprovado.' },
          { id: 'crit-wed01-2', text: 'Plano de iluminação para áreas interna e externa do Espaço Lux definido.' }
        ]
      },
      {
        id: 'wed-02',
        code: 'CARD-WED-02',
        title: 'Operação e Contingência do Dia D',
        context: 'Blindagem emocional dos noivos e controle rigoroso de tempo no making-of.',
        specs: [
          {
            label: 'Making-of',
            value: 'Margem técnica de 45 a 60 min entre o término de beleza e a cerimônia para retratos calmos com vestido e véu.'
          },
          {
            label: 'Ponto focal de apoio',
            value: 'Designação obrigatória de 1 pessoa de confiança (assessora ou familiar) para centralizar fornecedores e imprevistos.'
          }
        ],
        criteria: [
          { id: 'crit-wed02-1', text: 'Nome e WhatsApp do ponto focal cadastrados na ficha técnica do evento.' },
          { id: 'crit-wed02-2', text: 'Horário final de beleza acordado com a equipe de maquiagem/cabelo contemplando a margem de segurança.' }
        ]
      }
    ]
  },
  {
    id: 'acoes',
    number: 3,
    title: 'Backlog de Ações e Entregáveis',
    subtitle: 'Checklist executivo de entregáveis sob responsabilidade de Vinicius Cunha (Versa Visual) e Camila Silva.',
    cards: [
      {
        id: 'act-01',
        code: 'CARD-ACT-01',
        title: 'Entregáveis Vinicius Cunha (Versa Visual)',
        context: 'Materiais de apoio, orientações preparatórias e referências técnicas enviadas à noiva.',
        specs: [
          {
            label: 'Guia da Noiva',
            value: 'Enviar Guia Visual da Experiência Fotográfica (Manual da Noiva) em PDF com orientações práticas.'
          },
          {
            label: 'Galeria de Referência',
            value: 'Compartilhar galeria de casamento anterior completo para alinhamento de cobertura e ritmo narrativo.'
          },
          {
            label: 'Curadoria de Decoração',
            value: 'Montar e compartilhar pasta de curadoria de fotos de decoração para inspiração.'
          }
        ],
        criteria: [
          { id: 'crit-act01-1', text: 'PDF de orientações entregue a Camila.' },
          { id: 'crit-act01-2', text: 'Links das galerias de estilo e decoração disponibilizados e validados.' }
        ]
      },
      {
        id: 'act-02',
        code: 'CARD-ACT-02',
        title: 'Entregáveis Camila Silva',
        context: 'Insumos visuais, referências pessoais e contatos operacionais sob responsabilidade da contratante.',
        specs: [
          {
            label: 'Painel Pinterest',
            value: 'Compartilhar acesso ao painel do Pinterest (camilasilva1320/pré-wedding) com as referências selecionadas do casal.'
          },
          {
            label: 'Fornecedores',
            value: 'Informar lista preliminar de fornecedores contratados (cerimonial, beleza, local, decoração).'
          },
          {
            label: 'Figurino',
            value: 'Definir opções de figurino para o ensaio pré-wedding.'
          }
        ],
        criteria: [
          { id: 'crit-act02-1', text: 'Acesso ao painel de inspirações confirmado pela equipe fotográfica.' },
          { id: 'crit-act02-2', text: 'Lista de contatos de fornecedores e opções de figurino recebidas.' }
        ]
      }
    ]
  }
];

export const PRE_WEDDING_AXES = [
  { id: 'roupas', name: 'Paleta de Figurino', desc: 'Tons orgânicos, linho e contraste com bar & pedras' },
  { id: 'enquadramento', name: 'Enquadramento & Escala', desc: 'Planos abertos épicos e closes intimistas' },
  { id: 'luz', name: 'Luz Natural & Golden Hour', desc: 'Direção na orla de Costa Azul e penumbra acolhedora' },
  { id: 'movimento', name: 'Movimento & Dinâmica', desc: 'Caminhada, passos soltos, vento e espontaneidade' },
  { id: 'intimidade', name: 'Intimidade & Conexão', desc: 'Toques sutis, olhares próximos e abraços reais' },
  { id: 'detalhes', name: 'Detalhes & Texturas', desc: 'Acessórios, mãos, copos no bar e texturas do ambiente' }
];
