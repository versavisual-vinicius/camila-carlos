import { useState } from "react";
import { motion } from "motion/react";
import { 
  FolderSpecial, 
  Link as LinkIcon, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Share2,
  FolderHeart,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { ClusterDrawer, ClusterDetailData } from "@/app/components/ClusterDrawer";

interface ClustersSectionProps {
  onSelectCluster?: (clusterId: string) => void;
  onDownloadPdf: () => void;
  onOpenShareModal: () => void;
  onOpenLightbox?: (photoUrl: string, caption: string) => void;
}

const CLUSTERS_DATA: ClusterDetailData[] = [
  {
    id: "vestido",
    name: "O Vestido & Véu",
    categoryTag: "Atelier Principal",
    itemCount: 38,
    statusBadge: "Prioritário",
    description: "Silhuetas fluidas, tule de seda francês, bordados botânicos sutis e joalheria com pérolas barrocas para a prova final.",
    editorialDirection: "Foco na leveza e no movimento orgânico. As fotos de detalhe devem valorizar a transparência do tule contra a luz natural e os bordados botânicos aplicados à mão, evitando poses rígidas ou tecidos esticados artificialmente.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6gp3_inXnUp_lbRHvT_nUMCGUgvqDyLV2DJYK2ic6d-GcCW8RcEpjm90WhrNk09L9yliL4RaTzuKAajzwf9tPrYfsvwSxpNrhwqHwkRBkHTu_pU-QoiNIqa6RFPV0LXgegsk3yca1C9d7t1Mz5bYXv301WihitRhwngnohuASUagq-57W0NjX5iHkzgqDsBVIIR3La7SIj8D5zfGNqoz6_kR2YfgqU5-zOKig1_oE_eMhEj4-JYU",
    specifications: [
      { label: "Tecido & Caimento", value: "Tule de seda francês fluido com cauda média removível" },
      { label: "Bordado & Detalhe", value: "Aplicações florais 3D orgânicas nas costas e decote" },
      { label: "Direção de Luz", value: "Luz de janela filtrada para capturar transparência e textura" },
      { label: "Próximo Marco", value: "Prova final com sapatos e fixação do véu (T-20 dias)" }
    ],
    curatedPhotos: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6gp3_inXnUp_lbRHvT_nUMCGUgvqDyLV2DJYK2ic6d-GcCW8RcEpjm90WhrNk09L9yliL4RaTzuKAajzwf9tPrYfsvwSxpNrhwqHwkRBkHTu_pU-QoiNIqa6RFPV0LXgegsk3yca1C9d7t1Mz5bYXv301WihitRhwngnohuASUagq-57W0NjX5iHkzgqDsBVIIR3La7SIj8D5zfGNqoz6_kR2YfgqU5-zOKig1_oE_eMhEj4-JYU",
        caption: "Silhueta fluida e cauda sobre piso orgânico do atelier"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbiQ-zkREWMRgAk5fNoYa-57h3gz6RRL8PWBb_ovevpk-doFJvr7ee4a5IbtqnHP6EU4fPu5XgAc4ZFa9rIG4Pugb2sRTpSzciryYgDYJTQzImWM5hl5GK5nSkuiHhiff47u3Ues0RIdrmVzLd0FBru9oSfXRd4YW4Wh36gdKejHsEyNNsQFjsDFUGgHpuquoDN2F1ell3ML_Gyb46APgWzuE3hmbewTeY08V-w9kQUUFSiFnvNOo",
        caption: "Detalhe das costas com botões perolizados e renda botânica"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosTHT2bBLDBQM1BO_0dvo0XtyIRmeq5_2frud2NwsT561CmtGYCrZq8Bh1hq_-yMLw4YXVrcolXwtXzX_Tvt7Cf-ba7MbYruI20K1HWAyLdw470uGSfNJPCyNRb0WyHGZ5h6ChRh8MnTVWDcfvVJFdy2UgjZtgXyXMIuSX4xHbpVrXvMx3-mn4LWIXaCKvz2JTJI__K9sk0q5z2A4Fk_i7ONGqw1Rau_slvadMi1auwRSAbxl7B0",
        caption: "Véu catedral com borda fina em movimento com a brisa"
      },
      {
        url: "/pre-wedding/02_5b59d5ebd8472c9cc4734aff1afe2f86.jpg",
        caption: "Textura do tecido sob a luz natural suave da tarde"
      },
      {
        url: "/pre-wedding/05_ab3516597148fe33dbdb33c3933c0617.jpg",
        caption: "Apoio das mãos e joias discretas com pérolas barrocas"
      },
      {
        url: "/pre-wedding/10_e03d42df790eb720c7a884da459392e2.jpg",
        caption: "Retrato intimista de costas revelando o caimento do decote"
      }
    ],
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Carlos", role: "Noivo", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr8rWCRmL08bXSCjzEMWU_TZq8wtCat33kXbFLmiZi1wS85mOAvEHhOvZCah36f3B_vwesCWdo5z4C-FoQzlBYvxmnt8RXNBEsa9_arlTLra1lFkUWbn7KFfxSXLwBC7orAzTVwh2P2GxEKUZhUbIbIbn8b4bs0KAipFWHFAAHT-2xJwWYWUHG3Y3p6Vn0zeJEosigE7-8f4Odx8CF8eQZENfVDL-2TTFHQNmTuIgvs2BPP5PC7jo" },
      { name: "Vini (@v1ncsc)", role: "Versa Visual", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF_-gcbXBqzzppeawr9C4NeU5IaRKZb7FOSkJui6sHmxm259UJE_yLNGkh3SJOHU7Zom8OvhaAsZKyI2hEjyfpFn8vpE_vzPbesYiY8iHxt2fUSIuppus17d6nC6i81HXQkdA2IGTyme0YEPwtUtajsX85ywU2fxzIrqrLMS-U-yixue8i3mFtNRLUfM6REguqKClbdiLBfhFVN_ZB-DMWBLX58K3v2Ab_ICE1Glbt4bpIGWWMxg8" }
    ]
  },
  {
    id: "cenario",
    name: "Cenário & Local",
    categoryTag: "Espaço Lux & Costa Azul",
    itemCount: 24,
    statusBadge: "Aprovado",
    description: "Espaço Lux em Rio das Ostras e orla da Costa Azul com luz suave de entardecer e transição para o pôr do sol dourado.",
    editorialDirection: "Aproveitar a arquitetura aberta do Espaço Lux para criar profundidade nos planos gerais e transitar pontualmente para as falésias da Costa Azul às 17:15, capturando o contraste entre rochas e o mar.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqy_PDzbAFlqy_TzU6rQ3qHNEaz5TWogbedW8fpSCHlczDf91wZ4qZ2vkAAIU_IVGXYBK4plpnb3K1L4JR3DBkE03Qv6DwoX-xIdnlmMS5HOgls2Dg7el-Hc2nAENvjAJ4W49OfdGC-UGy1HkFkm78GNveYBCntCYImP62t6TNR_s2I9ksGG6AldFOr_oQSnqEjjsoblMwvXhtJeIS28TBvdvGi8SzuSq86Rhhxt4J9vnsW4b3Pk",
    specifications: [
      { label: "Espaço da Cerimônia", value: "Gramado sob jabuticabeiras com luz lateral difusa" },
      { label: "Ponto dos Retratos", value: "Falésias da Costa Azul (8 min de deslocamento coordenado)" },
      { label: "Janela Solar", value: "Cerimônia 16:00 · Retratos com luz dourada 17:15 às 17:35" },
      { label: "Plano de Segurança", value: "Área coberta integrada no Espaço Lux em caso de chuva" }
    ],
    curatedPhotos: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqy_PDzbAFlqy_TzU6rQ3qHNEaz5TWogbedW8fpSCHlczDf91wZ4qZ2vkAAIU_IVGXYBK4plpnb3K1L4JR3DBkE03Qv6DwoX-xIdnlmMS5HOgls2Dg7el-Hc2nAENvjAJ4W49OfdGC-UGy1HkFkm78GNveYBCntCYImP62t6TNR_s2I9ksGG6AldFOr_oQSnqEjjsoblMwvXhtJeIS28TBvdvGi8SzuSq86Rhhxt4J9vnsW4b3Pk",
        caption: "Altar ao ar livre sob a copa das árvores no entardecer"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWN0mRogtR_Z5stJ_7QjgYBHCnRPhSWtJJR9gmgA8CYBd0t5Zac6ewYcLjR9SPz4vvuUTerv7IB5pOKF4yUfEk3L4jKI3WCAxJkhE8v5lphH4nBmILV_xhZJQUkxBDILDyk5Qe_XDGXwiCwRcwqchvphveYSGZKh2xLM6hy2g-EbnjAfeDH8WpUIxYHUTxyfZ6x6TgBFh-oYIsr9F87gdRZFwMtPk3DoEn5NhpwgZjO4s5jiGGoSI",
        caption: "Caminho da noiva com tapete natural e pétalas espaçadas"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNOhyPzFpu6SBY-kn1ibNBZD97gXhSANWWGoSc4wPSzBu_dJIinONRa-D-1mRS5iRReugLSPkuIMFsIRkZCb4FUXyKNY2j4qlfCmhiVoTR9lVOansmNoZkwTtF5RAEQg9meLv-MLyybggmep5PqvBt9oIUXMSWoG7PUC7a8abNlcMN4I7io3yJ2W541jr7vbclkpv0PLzz_G5b493QrZCVNRygrEs6DbrKm6BaTvFoyXxhusnaWUA",
        caption: "Luz dourada incidindo sobre a orla rochosa da Costa Azul"
      },
      {
        url: "/pre-wedding/18_5eb1b702ec4ecda18beec647d639b7bf.jpg",
        caption: "Perspectiva ampla do espaço de recepção iluminado por microlâmpadas"
      },
      {
        url: "/pre-wedding/22_27218386dd24b1d6f784e1b42663ff0d.jpg",
        caption: "Silhueta do casal contra o horizonte costeiro no crepúsculo"
      }
    ],
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Cerimonial", role: "Assessoria", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8" },
      { name: "Vini (@v1ncsc)", role: "Versa Visual", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBF_-gcbXBqzzppeawr9C4NeU5IaRKZb7FOSkJui6sHmxm259UJE_yLNGkh3SJOHU7Zom8OvhaAsZKyI2hEjyfpFn8vpE_vzPbesYiY8iHxt2fUSIuppus17d6nC6i81HXQkdA2IGTyme0YEPwtUtajsX85ywU2fxzIrqrLMS-U-yixue8i3mFtNRLUfM6REguqKClbdiLBfhFVN_ZB-DMWBLX58K3v2Ab_ICE1Glbt4bpIGWWMxg8" }
    ]
  },
  {
    id: "flores",
    name: "Flores & Decoração Botânica",
    categoryTag: "Design Floral",
    itemCount: 29,
    statusBadge: "Em Alinhamento",
    description: "Arranjos aéreos orgânicos, camélias, peônias abertas, folhas de oliveira e iluminação cênica com velas suspensas.",
    editorialDirection: "Design floral que respira e dialoga com o ambiente natural. Sem blocos maciços de espuma ou flores engessadas; valorizar a assimetria, ramos soltos e o toque aveludado das pétalas claras.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5y293Fmtt9ty9-AJsjScehdt-MLDEo5igZ9Uzyr4TohdYqVcOau59AFiAvIIwmG38ik1hFW-ghLU-j9YcgrLOlDQVzYQT7VRzBiIz2oUMvgsp_2m53EDXiVQ8CeagnL-J5awgUg90pu_QkPRqZeWZPR3GnJYkYsNCtilTiG8Ug9s3Co_-JVyrImX3MBvIjYWgWs6hiz-tYtZVJP_CsJ6wmhmO0XUjJyVL9S5nSm19LMhoWj8pH9I",
    specifications: [
      { label: "Paleta Botânica", value: "Off-white, verde oliva, fendi suave e toques de champanhe" },
      { label: "Arco do Altar", value: "Estrutura orgânica assimétrica que preserva a visão do mar" },
      { label: "Centros de Mesa", value: "Arranjos baixos orgânicos intercalados com velas cilíndricas" },
      { label: "Buquê da Noiva", value: "Buquê desconstruído com fitas de seda pura com bordas desfiadas" }
    ],
    curatedPhotos: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5y293Fmtt9ty9-AJsjScehdt-MLDEo5igZ9Uzyr4TohdYqVcOau59AFiAvIIwmG38ik1hFW-ghLU-j9YcgrLOlDQVzYQT7VRzBiIz2oUMvgsp_2m53EDXiVQ8CeagnL-J5awgUg90pu_QkPRqZeWZPR3GnJYkYsNCtilTiG8Ug9s3Co_-JVyrImX3MBvIjYWgWs6hiz-tYtZVJP_CsJ6wmhmO0XUjJyVL9S5nSm19LMhoWj8pH9I",
        caption: "Arranjo aéreo com folhagens de oliveira e flores pendentes"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmq-9E_fh7dUx4yZHHrwn_-nPPzJjScEUQWZWxA7MCiD3344WAKBvWweeuee_Rh99pXjipMwjTLkrzgB6Ga701ZEPbXpus3s7AI44Fl7GJSJaXZzop-TBO7425rmvFVf538HjQT1iF-CEbeg1ygUXpSca218x7c0_ve37IeLnI2Iy_PE8Z7fLTdYKbSzu70Y2nKNG04N1lehrJjZvOukM1RAeIw6qRGCzudGCxEGlxdLd6XoH127c",
        caption: "Composição de mesa com cerâmica artesanal e velas quentes"
      },
      {
        url: "/pre-wedding/31_d0333d76378c8a149be88fa7b2a59a7f.jpg",
        caption: "Buquê da noiva com texturas botânicas e peônias desabrochadas"
      }
    ],
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Decoradora", role: "Cenografia", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8" }
    ]
  },
  {
    id: "papelaria",
    name: "Papelaria & Caligrafia",
    categoryTag: "Identidade Visual",
    itemCount: 18,
    statusBadge: "Em Produção",
    description: "Monograma com tipografia editorial, papéis artesanais de algodão com bordas desfiadas, selagem em cera quente e caligrafia à mão.",
    editorialDirection: "Flatlays fotográficos compostos no início da tarde com alianças, flores do buquê e perfume da noiva sobre linho neutro. Foco na textura tátil do papel e profundidade do relevo seco.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhKrAkV5wPd0LNAIgJAV4G7UQuINZJn5BAMDvGwCLE-n8QVyr_7pOg_f4g2USbPRg9tuwILQEZNAgbGsNXfgpd44lhygu6WhX3sX7_eyWMiY7nDcnDOSmS-8UvLRD0JLRV80oudPrcM3SOVpY2WRT2lcPMLBOAiVxqQxMgysGY8RRtq1dh-c41YX6Zhut0okQKVmoKeVRqFTcBVXNnvYsYzksHrsC33VZn1qBIb9-TL3DFp9wV0J8",
    specifications: [
      { label: "Tipo de Papel", value: "Papel algodão 300g artesanal com borda rústica deckle edge" },
      { label: "Selamento", value: "Cera em tom fendi perolizado com brasão minimalista C&C" },
      { label: "Caligrafia", value: "Tinta sépia botânica escrita com pena flexível" },
      { label: "Itens de Mesa", value: "Menu individual e cartões de assento com fita de algodão" }
    ],
    curatedPhotos: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhKrAkV5wPd0LNAIgJAV4G7UQuINZJn5BAMDvGwCLE-n8QVyr_7pOg_f4g2USbPRg9tuwILQEZNAgbGsNXfgpd44lhygu6WhX3sX7_eyWMiY7nDcnDOSmS-8UvLRD0JLRV80oudPrcM3SOVpY2WRT2lcPMLBOAiVxqQxMgysGY8RRtq1dh-c41YX6Zhut0okQKVmoKeVRqFTcBVXNnvYsYzksHrsC33VZn1qBIb9-TL3DFp9wV0J8",
        caption: "Conjunto de papelaria completo com selo de cera e envelope artesanal"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosTHT2bBLDBQM1BO_0dvo0XtyIRmeq5_2frud2NwsT561CmtGYCrZq8Bh1hq_-yMLw4YXVrcolXwtXzX_Tvt7Cf-ba7MbYruI20K1HWAyLdw470uGSfNJPCyNRb0WyHGZ5h6ChRh8MnTVWDcfvVJFdy2UgjZtgXyXMIuSX4xHbpVrXvMx3-mn4LWIXaCKvz2JTJI__K9sk0q5z2A4Fk_i7ONGqw1Rau_slvadMi1auwRSAbxl7B0",
        caption: "Detalhe do monograma tipográfico impresso em baixo relevo"
      }
    ],
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Designer", role: "Papelaria", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8" }
    ]
  },
  {
    id: "beleza",
    name: "Beleza & Make da Noiva",
    categoryTag: "Beleza Natural",
    itemCount: 15,
    statusBadge: "Aprovado",
    description: "Pele luminosa com acabamento translúcido, olhos esfumados suaves, ondas naturais e fixação para vento marítimo.",
    editorialDirection: "Beleza que realça a identidade de Camila sem criar máscara. Iluminação pontual nos pontos altos do rosto (têmporas, nariz, queixo) para refletir a luz natural do fim de tarde costeiro.",
    coverImage: "/stitch/avatar_bride.png",
    specifications: [
      { label: "Acabamento de Pele", value: "Glass skin translúcida de alta resistência à umidade" },
      { label: "Penteado", value: "Meio-preso com ondas polidas e mechas soltas emoldurando a face" },
      { label: "Acessório de Cabelo", value: "Grampos de pérolas barrocas orgânicas sob o véu" },
      { label: "Retoque", value: "Kit de retoque rápido posicionado na suíte antes da entrada" }
    ],
    curatedPhotos: [
      {
        url: "/stitch/avatar_bride.png",
        caption: "Retrato de noiva com pele luminosa e olhar natural sereno"
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbiQ-zkREWMRgAk5fNoYa-57h3gz6RRL8PWBb_ovevpk-doFJvr7ee4a5IbtqnHP6EU4fPu5XgAc4ZFa9rIG4Pugb2sRTpSzciryYgDYJTQzImWM5hl5GK5nSkuiHhiff47u3Ues0RIdrmVzLd0FBru9oSfXRd4YW4Wh36gdKejHsEyNNsQFjsDFUGgHpuquoDN2F1ell3ML_Gyb46APgWzuE3hmbewTeY08V-w9kQUUFSiFnvNOo",
        caption: "Penteado lateral com textura orgânica e brilho saudável"
      }
    ],
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Beauty Artist", role: "Make & Penteado", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8" }
    ]
  }
];

export function ClustersSection({
  onSelectCluster,
  onDownloadPdf,
  onOpenShareModal,
  onOpenLightbox
}: ClustersSectionProps) {
  const [filterMode, setFilterMode] = useState<"todas" | "cerimonial" | "fornecedor">("todas");
  const [activeClusterDetail, setActiveClusterDetail] = useState<ClusterDetailData | null>(null);

  const filterOptions = [
    { value: "todas" as const, label: "Todas as coleções", count: CLUSTERS_DATA.length },
    { value: "cerimonial" as const, label: "Com cerimonial", count: 3 },
    { value: "fornecedor" as const, label: "Abertas para fornecedores", count: 4 }
  ];

  const filteredClusters = CLUSTERS_DATA.filter((c) => {
    if (filterMode === "cerimonial") return c.id === "vestido" || c.id === "cenario" || c.id === "flores";
    if (filterMode === "fornecedor") return c.id !== "vestido";
    return true;
  });

  const handleShareLink = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    toast.success(`Link da coleção "${name}" copiado!`, {
      description: "Pronto para enviar por WhatsApp aos fornecedores e atelier."
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Editorial (Padrão Airbnb / Versa Visual) */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-medium">
              Curadoria & Direção de Arte
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Coleções & Clusters
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-xl">
            Pastas temáticas para fornecedores, noivos e cerimonial alinharem cada detalhe estético com precisão editorial.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body-md text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/20 font-medium">
            {CLUSTERS_DATA.length} coleções ativas
          </span>
        </div>
      </section>

      {/* 2. Filtros com Pílula Deslizante (Tubelight Sliding Pill) */}
      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 py-1 flex items-center no-scrollbar">
        <div className="bg-surface-container/70 dark:bg-surface-container/40 backdrop-blur-md p-1 rounded-full border border-outline-variant/20 inline-flex items-center gap-1">
          {filterOptions.map((f) => {
            const isActive = filterMode === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilterMode(f.value)}
                className={`relative px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-on-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="clusters-filter-active"
                    className="absolute inset-0 bg-primary rounded-full shadow-[0_0_12px_rgba(108,91,77,0.3)] -z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  >
                    <span className="w-3.5 h-0.5 bg-secondary rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_6px_var(--secondary)]" />
                  </motion.span>
                )}

                <span className="relative z-10">{f.label}</span>
                <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                  isActive ? "bg-surface-container text-on-surface" : "bg-surface-container-high text-on-surface-variant"
                }`}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Grade Editorial de Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClusters.map((cluster) => {
          return (
            <article
              key={cluster.id}
              onClick={() => setActiveClusterDetail(cluster)}
              className="group bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-4 cursor-pointer"
            >
              {/* Media Collage Preview */}
              <div className="grid grid-cols-12 gap-2 h-48 sm:h-52 w-full rounded-xl overflow-hidden relative">
                <div className="col-span-7 h-full relative overflow-hidden">
                  <img
                    src={cluster.coverImage}
                    alt={cluster.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-md bg-surface/90 dark:bg-black/80 backdrop-blur-md font-body-md text-xs text-on-surface font-medium shadow-xs">
                    {cluster.categoryTag}
                  </span>
                </div>

                <div className="col-span-5 flex flex-col gap-2 h-full">
                  <div className="h-1/2 w-full rounded-lg overflow-hidden relative">
                    <img
                      src={cluster.curatedPhotos[1]?.url || cluster.coverImage}
                      alt="Thumbnail 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/2 w-full rounded-lg overflow-hidden relative">
                    <img
                      src={cluster.curatedPhotos[2]?.url || cluster.coverImage}
                      alt="Thumbnail 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Cluster Meta & Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold group-hover:text-secondary transition-colors">
                      {cluster.name}
                    </h2>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container border border-outline-variant/30 text-on-surface">
                    {cluster.statusBadge}
                  </span>
                </div>

                <p className="font-body-md text-xs text-on-surface-variant font-medium">
                  {cluster.itemCount} referências visuais selecionadas
                </p>

                <p className="font-body-md text-xs sm:text-sm text-on-surface/80 line-clamp-2 leading-relaxed pt-1">
                  {cluster.description}
                </p>
              </div>

              {/* Bottom Micro-Bar: Team & Action Trigger */}
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between gap-2 mt-auto">
                <div className="flex items-center -space-x-1.5">
                  {cluster.collaborators.map((c, i) => (
                    <img
                      key={i}
                      src={c.avatar}
                      alt={c.name}
                      title={`${c.name} (${c.role})`}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-surface-container-low"
                    />
                  ))}
                  <span className="pl-2 font-body-md text-xs text-on-surface-variant">
                    {cluster.collaborators.length} envolvidos
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleShareLink(cluster.name, e)}
                    className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
                    title="Copiar link da coleção"
                  >
                    <Share2 className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveClusterDetail(cluster)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity"
                  >
                    <Eye className="size-3.5" />
                    <span>Ver Dossiê</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. Drawer Editorial de Detalhe do Cluster */}
      <ClusterDrawer
        cluster={activeClusterDetail}
        isOpen={Boolean(activeClusterDetail)}
        onClose={() => setActiveClusterDetail(null)}
        onOpenLightbox={onOpenLightbox}
      />
    </div>
  );
}
