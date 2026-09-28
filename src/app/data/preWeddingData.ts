// Dados oficiais do Pré-Wedding de Camila & Carlos
// 58 referências organizadas por atmosfera e direção artística

export type PreWeddingCategory = 'all' | 'natureza' | 'floresta' | 'urbano' | 'pb';

export interface PreWeddingItem {
  id: string;
  imageUrl: string;
  title: string;
  category: PreWeddingCategory;
  notes?: {
    description: string;
    images?: string[];
  };
}

export const PRE_WEDDING_ITEMS: PreWeddingItem[] = [
  {
    id: "1",
    imageUrl: "/pre-wedding/01_451d03f1a458a64838b28633e494ceb2.jpg",
    title: "Abraço Íntimo nas Alturas",
    category: "natureza",
    notes: {
      description: "Composição vertical com floresta de pinheiros e casal conectado em luz suave.",
      images: []
    }
  },
  {
    id: "2",
    imageUrl: "/pre-wedding/02_5b59d5ebd8472c9cc4734aff1afe2f86.jpg",
    title: "Silhueta em Fundo Verde Profundo",
    category: "natureza",
    notes: {
      description: "Enquadramento fechado com contraste entre o vestido claro e a copa escura.",
      images: []
    }
  },
  {
    id: "3",
    imageUrl: "/pre-wedding/03_c1ea5035673966f67f2de5089fbe00a7.jpg",
    title: "Caminhada Espontânea a Dois",
    category: "natureza",
    notes: {
      description: "Movimento natural, risadas soltas e dinâmica dinâmica de mãos dadas.",
      images: []
    }
  },
  {
    id: "4",
    imageUrl: "/pre-wedding/04_be13ec69da401fb398e643011f3df799.jpg",
    title: "Beijo com Picos ao Fundo",
    category: "natureza",
    notes: {
      description: "Paisagem montanhosa grandiosa emoldurando o beijo do casal.",
      images: []
    }
  },
  {
    id: "5",
    imageUrl: "/pre-wedding/05_3a978257a40c44f834e73c93e3cbdfdc.jpg",
    title: "Dança Livre na Colina",
    category: "natureza",
    notes: {
      description: "Giro do vestido com vento e dinâmica romântica no alto do morro.",
      images: []
    }
  },
  {
    id: "6",
    imageUrl: "/pre-wedding/06_4b879cbe1eef46701278b92073b27c22.jpg",
    title: "Contemplação à Beira-Mar / Falésias",
    category: "natureza",
    notes: {
      description: "Linha do horizonte e penhasco trazendo sensação de imensidão e liberdade.",
      images: []
    }
  },
  {
    id: "7",
    imageUrl: "/pre-wedding/07_fc37fb5fc7dd41e9c8b3d5462f3d627a.jpg",
    title: "Conexão Sob Névoa Suave",
    category: "natureza",
    notes: {
      description: "Atmosfera intimista e poética com clima de serra e toque sutil.",
      images: []
    }
  },
  {
    id: "8",
    imageUrl: "/pre-wedding/08_a27b9605e35a23ddf42c4bb9129c8e4e.jpg",
    title: "A Noiva e a Montanha",
    category: "natureza",
    notes: {
      description: "Vestido esvoaçante sobre rocha com fundo aberto e iluminação difusa.",
      images: []
    }
  },
  {
    id: "9",
    imageUrl: "/pre-wedding/09_81dc7e408d76fa66e7ee1f26f3f284d4.jpg",
    title: "Momento Íntimo na Grama",
    category: "natureza",
    notes: {
      description: "Casal sentado no gramado, iluminação dourada e olhar próximo.",
      images: []
    }
  },
  {
    id: "10",
    imageUrl: "/pre-wedding/10_9a0c9ca06fd2be8b74548c4d5675a701.jpg",
    title: "Escala Dramática e Paredão Verde",
    category: "natureza",
    notes: {
      description: "Câmera afastada destacando o casal pequeno diante da imponência natural.",
      images: []
    }
  },
  {
    id: "11",
    imageUrl: "/pre-wedding/11_127ce8daa428485f0f88cc2676cb7fba.jpg",
    title: "Retrato Editorial de Corpo Inteiro",
    category: "natureza",
    notes: {
      description: "Elegância minimalista em campo aberto com postura sutil.",
      images: []
    }
  },
  {
    id: "12",
    imageUrl: "/pre-wedding/12_e7c205d1cd699e38b4cdda4b20c9b4a9.jpg",
    title: "Abraço Apaixonado em Ângulo Baixo",
    category: "natureza",
    notes: {
      description: "Expressão de entrega e calor em perspectiva imersiva.",
      images: []
    }
  },
  {
    id: "13",
    imageUrl: "/pre-wedding/13_3c54cdb8e66a7e4c70ef073c12357376.jpg",
    title: "Carinho no Chão",
    category: "natureza",
    notes: {
      description: "Close-up afetivo no gramado com cumplicidade e naturalidade.",
      images: []
    }
  },
  {
    id: "14",
    imageUrl: "/pre-wedding/14_d9fbad25994110d298dd4df403365f74.jpg",
    title: "Mergulho nos Braços",
    category: "natureza",
    notes: {
      description: "Movimento teatral suave com apoio e entrega do casal.",
      images: []
    }
  },
  {
    id: "15",
    imageUrl: "/pre-wedding/15_97aeb79580e5219d677d5510f5e10ac2.jpg",
    title: "Luz de Recorte Dourada",
    category: "natureza",
    notes: {
      description: "Feixe de sol incidindo nas costas e véu/cabelo em final de tarde.",
      images: []
    }
  },
  {
    id: "16",
    imageUrl: "/pre-wedding/16_cc62bfcf014a3bf5b8e76d044e55739e.jpg",
    title: "Travessia de Troncos e Galhos",
    category: "floresta",
    notes: {
      description: "Interação rústica na mata com elementos botânicos naturais.",
      images: []
    }
  },
  {
    id: "17",
    imageUrl: "/pre-wedding/17_2a0b586ebe2e263a6ae0a90aeab4295a.jpg",
    title: "Caminho Beira-Mar com Vento",
    category: "natureza",
    notes: {
      description: "Cabelo solto, vento e expressão confiante em direção à câmera.",
      images: []
    }
  },
  {
    id: "18",
    imageUrl: "/pre-wedding/18_a7c59db8fb7dc26df94115981babe739.jpg",
    title: "Pôr do Sol Dourado Correndo",
    category: "natureza",
    notes: {
      description: "Pacing cinematográfico na Golden Hour com energia e leveza.",
      images: []
    }
  },
  {
    id: "19",
    imageUrl: "/pre-wedding/19_029f3f1c621f2edd78b513c0eec2a833.jpg",
    title: "Beijo Quente na Luz de Ouro",
    category: "natureza",
    notes: {
      description: "Paleta quente monocromática com afeto e proximidade.",
      images: []
    }
  },
  {
    id: "20",
    imageUrl: "/pre-wedding/20_acd9e1280497a089d38373bd7847219b.jpg",
    title: "Trilha Verdejante",
    category: "natureza",
    notes: {
      description: "Passo leve em encosta verde exuberante.",
      images: []
    }
  },
  {
    id: "21",
    imageUrl: "/pre-wedding/21_723b8fa24fffaeac05f67ef356875fbf.jpg",
    title: "Ponto de Vista Aéreo / Plongée",
    category: "natureza",
    notes: {
      description: "Perspectiva de cima destacando o desenho do vestido no gramado.",
      images: []
    }
  },
  {
    id: "22",
    imageUrl: "/pre-wedding/22_28116e1da95e0f310333b26388a5fc33.jpg",
    title: "Postura Nobre na Colina",
    category: "natureza",
    notes: {
      description: "Composição editorial com casal sereno e presença marcante.",
      images: []
    }
  },
  {
    id: "23",
    imageUrl: "/pre-wedding/23_779ccd7e05be07ec891c9cad40214a64.jpg",
    title: "Descanso Romântico no Capim Alto",
    category: "natureza",
    notes: {
      description: "Textura campestre envolvente com clima aconchegante.",
      images: []
    }
  },
  {
    id: "24",
    imageUrl: "/pre-wedding/24_8c35a61a1f3ec23bc3b23daf99d767a8.jpg",
    title: "Giro Alegre em Vale Verde",
    category: "natureza",
    notes: {
      description: "Alegria genuína e espontaneidade com montanhas de fundo.",
      images: []
    }
  },
  {
    id: "25",
    imageUrl: "/pre-wedding/25_413bfd8b2de91d40195df2d006f414e0.jpg",
    title: "Olhar Protetor e Conexão",
    category: "floresta",
    notes: {
      description: "Pose sentada acolhedora com textura de pedras e floresta.",
      images: []
    }
  },
  {
    id: "26",
    imageUrl: "/pre-wedding/26_a721116ef38fac51d10c8f6a4d2fb100.jpg",
    title: "Reflexo Dourado nas Águas",
    category: "floresta",
    notes: {
      description: "Luz filtrada sobre o riacho com o casal na margem.",
      images: []
    }
  },
  {
    id: "27",
    imageUrl: "/pre-wedding/27_0e0d082f6d91f5a8892044019015c1a3.jpg",
    title: "Névoa Suave entre as Copas",
    category: "floresta",
    notes: {
      description: "Profundidade de campo com bruma matinal na floresta densa.",
      images: []
    }
  },
  {
    id: "28",
    imageUrl: "/pre-wedding/28_263ed4ad220f5d5b661119a23d3df57b.jpg",
    title: "Raios de Luz Teatrais",
    category: "floresta",
    notes: {
      description: "Harrowing god rays cortando as árvores centenárias.",
      images: []
    }
  },
  {
    id: "29",
    imageUrl: "/pre-wedding/29_8667b9a81640b14994e57f7238239e61.jpg",
    title: "Abraço Cerrado na Meia-Luz",
    category: "floresta",
    notes: {
      description: "Clima intimista e acolhedor sob iluminação lateral suave.",
      images: []
    }
  },
  {
    id: "30",
    imageUrl: "/pre-wedding/30_beeeff38c87349983f19926f64541152.jpg",
    title: "Silhueta Difusa e Romântica",
    category: "floresta",
    notes: {
      description: "Foco poético e etéreo destacando a ternura do momento.",
      images: []
    }
  },
  {
    id: "31",
    imageUrl: "/pre-wedding/31_c5650b5109842c19d3018b21b41256cc.jpg",
    title: "Caminhada Iluminada pelos Raios",
    category: "floresta",
    notes: {
      description: "Passeio pelo bosque sob feixes majestosos de sol.",
      images: []
    }
  },
  {
    id: "32",
    imageUrl: "/pre-wedding/32_77bc6fa74746f73f54cec488dc2e37b4.jpg",
    title: "Dança sob a Fronde Densa",
    category: "floresta",
    notes: {
      description: "Vestido com movimento e harmonia total com a natureza.",
      images: []
    }
  },
  {
    id: "33",
    imageUrl: "/pre-wedding/33_0dae33ac0d2b0f573cef50a072e6cf3d.jpg",
    title: "O Silêncio dos Pinheiros Altos",
    category: "floresta",
    notes: {
      description: "Casal ao centro com verticalidade extrema dos troncos.",
      images: []
    }
  },
  {
    id: "34",
    imageUrl: "/pre-wedding/34_3735f1838897dfc0dea61ab377bd2b30.jpg",
    title: "Sol Rompendo a Copa Alta",
    category: "floresta",
    notes: {
      description: "Sensação mística e atemporal na clareira do bosque.",
      images: []
    }
  },
  {
    id: "35",
    imageUrl: "/pre-wedding/35_ce79ffa8f1c8ec6bf227d40dab45ecf0.jpg",
    title: "Escala Gigantesca nas Redwoods",
    category: "floresta",
    notes: {
      description: "Casal pequenino no sopé de troncos monumentais.",
      images: []
    }
  },
  {
    id: "36",
    imageUrl: "/pre-wedding/36_89defb1a3e0144426859bb5968a9183a.jpg",
    title: "Pausa Contemplativa no Musgo",
    category: "floresta",
    notes: {
      description: "Sensação de refúgio bucólico com flores no cabelo.",
      images: []
    }
  },
  {
    id: "37",
    imageUrl: "/pre-wedding/37_747396870175f9079460c6100dcb508e.jpg",
    title: "Véu Translúcido entre os Ramos",
    category: "floresta",
    notes: {
      description: "Detalhe poético de véu na mata com luz suave.",
      images: []
    }
  },
  {
    id: "38",
    imageUrl: "/pre-wedding/38_54cd41264d6ca07b7630b4ee32279206.jpg",
    title: "Lampião e Crepúsculo na Floresta",
    category: "floresta",
    notes: {
      description: "Ponto de luz quente trazendo magia e acolhimento noturno.",
      images: []
    }
  },
  {
    id: "39",
    imageUrl: "/pre-wedding/39_29b8a35fcc9e235d9ae80e1bdf26400e.jpg",
    title: "Abraço Aconchegante na Trilha",
    category: "floresta",
    notes: {
      description: "Movimento de carinho envolvente no caminho da mata.",
      images: []
    }
  },
  {
    id: "40",
    imageUrl: "/pre-wedding/40_7f77999c5a37d69e281d15cf47d602da.jpg",
    title: "Névoa e Mistério nas Alturas",
    category: "floresta",
    notes: {
      description: "Atmosfera de conto editorial com clima fresco e úmido.",
      images: []
    }
  },
  {
    id: "41",
    imageUrl: "/pre-wedding/41_43220f159802b23888802ba09dbc078d.jpg",
    title: "Casal na Moto Vintage",
    category: "urbano",
    notes: {
      description: "Estilo cinematográfico rebelde e moderno sobre duas rodas.",
      images: []
    }
  },
  {
    id: "42",
    imageUrl: "/pre-wedding/42_1764bf7c0204eabb8fc0176e3f245f82.jpg",
    title: "Cumplicidade no Balcão do Bar",
    category: "urbano",
    notes: {
      description: "Conversa solta, risadas e drinque em pub intimista.",
      images: []
    }
  },
  {
    id: "43",
    imageUrl: "/pre-wedding/43_c78b2cd1a9fdd23111c67fb42dbc50bb.jpg",
    title: "Descida Triunfante na Escadaria PB",
    category: "pb",
    notes: {
      description: "Glamour clássico preto e branco com arquitetura e movimento.",
      images: []
    }
  },
  {
    id: "44",
    imageUrl: "/pre-wedding/44_2dfc341f2de4cf015bdffe7a1941b066.jpg",
    title: "Banquete à Luz de Velas PB",
    category: "pb",
    notes: {
      description: "Estética cinematográfica anos 60 com taças e olhares penetrantes.",
      images: []
    }
  },
  {
    id: "45",
    imageUrl: "/pre-wedding/45_52c6592b330b51ab40b6c66589d7180c.jpg",
    title: "Risadas e Drinques na Mesa",
    category: "urbano",
    notes: {
      description: "Espontaneidade e clima leve com drinks e bar descontraído.",
      images: []
    }
  },
  {
    id: "46",
    imageUrl: "/pre-wedding/46_66208932423a551d9e6aae0b78d02f30.jpg",
    title: "Estilo Moderno com Vestido Curto",
    category: "urbano",
    notes: {
      description: "Noiva contemporânea com salto alto e energia de festa.",
      images: []
    }
  },
  {
    id: "47",
    imageUrl: "/pre-wedding/47_b83ebed566b32447138c3e1f07942e11.jpg",
    title: "Varanda de Mármore Monumental",
    category: "pb",
    notes: {
      description: "Enquadramento com escala arquitetônica neoclássica.",
      images: []
    }
  },
  {
    id: "48",
    imageUrl: "/pre-wedding/48_3eb8907bdec267db01919665fbd70eed.jpg",
    title: "Espiral da Escada em PB",
    category: "pb",
    notes: {
      description: "Geometria arquitetônica com casal subindo os degraus.",
      images: []
    }
  },
  {
    id: "49",
    imageUrl: "/pre-wedding/49_81b772c5017dbe46742ff442ba37e646.jpg",
    title: "Saída Elegante de Mãos Dadas PB",
    category: "pb",
    notes: {
      description: "Passos firmes e postura de editorial de moda.",
      images: []
    }
  },
  {
    id: "50",
    imageUrl: "/pre-wedding/50_36888a4c67988dda8004f221e0569c00.jpg",
    title: "Pausa Íntima na Colunata",
    category: "pb",
    notes: {
      description: "Casal sentado na balaustrada com linhas elegantes.",
      images: []
    }
  },
  {
    id: "51",
    imageUrl: "/pre-wedding/51_b650ee904b590b9e9481c05949204746.jpg",
    title: "Silhueta no Guarda-Corpo PB",
    category: "pb",
    notes: {
      description: "Costas do vestido e mãos unidas sobre ferro trabalhado.",
      images: []
    }
  },
  {
    id: "52",
    imageUrl: "/pre-wedding/52_c9c27726a5551cdcc74ef02edc092b72.jpg",
    title: "Beijo Romântico no Balcão de Madeira",
    category: "urbano",
    notes: {
      description: "Iluminação quente e intimista do pub acolhedor.",
      images: []
    }
  },
  {
    id: "53",
    imageUrl: "/pre-wedding/53_6351edb443ea8fc9179eddb250be3cbb.jpg",
    title: "Vista de Cima na Escada de Mármore",
    category: "pb",
    notes: {
      description: "Geometria em ângulo plongée clássico PB.",
      images: []
    }
  },
  {
    id: "54",
    imageUrl: "/pre-wedding/54_fa0b520485e1f6c51c941ad46949aa9b.jpg",
    title: "Drinque Noturno a Dois",
    category: "urbano",
    notes: {
      description: "Toque descontraído com taça e taças no balcão.",
      images: []
    }
  },
  {
    id: "55",
    imageUrl: "/pre-wedding/55_0db6d542648ddf4a02d662e02ca5bbaf.jpg",
    title: "Olhar Apaixonado e Sorriso PB",
    category: "pb",
    notes: {
      description: "Retrato espontâneo e cúmplice em preto e branco.",
      images: []
    }
  },
  {
    id: "56",
    imageUrl: "/pre-wedding/56_653524dc88e25f8af7a1b210358eb550.jpg",
    title: "Brinde Íntimo PB",
    category: "pb",
    notes: {
      description: "Close delicado nas mãos, taças e expressão de carinho.",
      images: []
    }
  },
  {
    id: "57",
    imageUrl: "/pre-wedding/57_7c0f067b47ff103459ab26ba305eabe3.jpg",
    title: "Casal Moderno no Bar de Drinques",
    category: "urbano",
    notes: {
      description: "Presença confiante e elegante em frente à estante iluminada.",
      images: []
    }
  },
  {
    id: "58",
    imageUrl: "/pre-wedding/58_0232494b0d46f8b7e522e6bb99ab950a.jpg",
    title: "Abraço Caloroso e Espontâneo no Pub",
    category: "urbano",
    notes: {
      description: "Fechamento com sorriso aberto, abraço apertado e afeto real.",
      images: []
    }
  },
];
