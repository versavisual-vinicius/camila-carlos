import { useState } from "react";
import { 
  FolderSpecial, 
  Link as LinkIcon, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface ClusterItem {
  id: string;
  name: string;
  categoryTag: string;
  itemCount: number;
  statusBadge: "Prioritário" | "Aprovado" | "Em Produção" | "Em Alinhamento";
  description: string;
  coverImage: string;
  thumb1: string;
  thumb2: string;
  collaborators: { name: string; role: string; avatar: string }[];
}

interface ClustersSectionProps {
  onSelectCluster: (clusterId: string) => void;
  onDownloadPdf: () => void;
  onOpenShareModal: () => void;
}

const CLUSTERS: ClusterItem[] = [
  {
    id: "vestido",
    name: "O Vestido & Véu",
    categoryTag: "Atelier Principal",
    itemCount: 38,
    statusBadge: "Prioritário",
    description: "Silhuetas fluidas, tule de seda francês, bordados botânicos sutis e joalheria com pérolas barrocas para a prova final.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6gp3_inXnUp_lbRHvT_nUMCGUgvqDyLV2DJYK2ic6d-GcCW8RcEpjm90WhrNk09L9yliL4RaTzuKAajzwf9tPrYfsvwSxpNrhwqHwkRBkHTu_pU-QoiNIqa6RFPV0LXgegsk3yca1C9d7t1Mz5bYXv301WihitRhwngnohuASUagq-57W0NjX5iHkzgqDsBVIIR3La7SIj8D5zfGNqoz6_kR2YfgqU5-zOKig1_oE_eMhEj4-JYU",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbiQ-zkREWMRgAk5fNoYa-57h3gz6RRL8PWBb_ovevpk-doFJvr7ee4a5IbtqnHP6EU4fPu5XgAc4ZFa9rIG4Pugb2sRTpSzciryYgDYJTQzImWM5hl5GK5nSkuiHhiff47u3Ues0RIdrmVzLd0FBru9oSfXRd4YW4Wh36gdKejHsEyNNsQFjsDFUGgHpuquoDN2F1ell3ML_Gyb46APgWzuE3hmbewTeY08V-w9kQUUFSiFnvNOo",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosTHT2bBLDBQM1BO_0dvo0XtyIRmeq5_2frud2NwsT561CmtGYCrZq8Bh1hq_-yMLw4YXVrcolXwtXzX_Tvt7Cf-ba7MbYruI20K1HWAyLdw470uGSfNJPCyNRb0WyHGZ5h6ChRh8MnTVWDcfvVJFdy2UgjZtgXyXMIuSX4xHbpVrXvMx3-mn4LWIXaCKvz2JTJI__K9sk0q5z2A4Fk_i7ONGqw1Rau_slvadMi1auwRSAbxl7B0",
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
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqy_PDzbAFlqy_TzU6rQ3qHNEaz5TWogbedW8fpSCHlczDf91wZ4qZ2vkAAIU_IVGXYBK4plpnb3K1L4JR3DBkE03Qv6DwoX-xIdnlmMS5HOgls2Dg7el-Hc2nAENvjAJ4W49OfdGC-UGy1HkFkm78GNveYBCntCYImP62t6TNR_s2I9ksGG6AldFOr_oQSnqEjjsoblMwvXhtJeIS28TBvdvGi8SzuSq86Rhhxt4J9vnsW4b3Pk",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWN0mRogtR_Z5stJ_7QjgYBHCnRPhSWtJJR9gmgA8CYBd0t5Zac6ewYcLjR9SPz4vvuUTerv7IB5pOKF4yUfEk3L4jKI3WCAxJkhE8v5lphH4nBmILV_xhZJQUkxBDILDyk5Qe_XDGXwiCwRcwqchvphveYSGZKh2xLM6hy2g-EbnjAfeDH8WpUIxYHUTxyfZ6x6TgBFh-oYIsr9F87gdRZFwMtPk3DoEn5NhpwgZjO4s5jiGGoSI",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNOhyPzFpu6SBY-kn1ibNBZD97gXhSANWWGoSc4wPSzBu_dJIinONRa-D-1mRS5iRReugLSPkuIMFsIRkZCb4FUXyKNY2j4qlfCmhiVoTR9lVOansmNoZkwTtF5RAEQg9meLv-MLyybggmep5PqvBt9oIUXMSWoG7PUC7a8abNlcMN4I7io3yJ2W541jr7vbclkpv0PLzz_G5b493QrZCVNRygrEs6DbrKm6BaTvFoyXxhusnaWUA",
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
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5y293Fmtt9ty9-AJsjScehdt-MLDEo5igZ9Uzyr4TohdYqVcOau59AFiAvIIwmG38ik1hFW-ghLU-j9YcgrLOlDQVzYQT7VRzBiIz2oUMvgsp_2m53EDXiVQ8CeagnL-J5awgUg90pu_QkPRqZeWZPR3GnJYkYsNCtilTiG8Ug9s3Co_-JVyrImX3MBvIjYWgWs6hiz-tYtZVJP_CsJ6wmhmO0XUjJyVL9S5nSm19LMhoWj8pH9I",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmq-9E_fh7dUx4yZHHrwn_-nPPzJjScEUQWZWxA7MCiD3344WAKBvWweeuee_Rh99pXjipMwjTLkrzgB6Ga701ZEPbXpus3s7AI44Fl7GJSJaXZzop-TBO7425rmvFVf538HjQT1iF-CEbeg1ygUXpSca218x7c0_ve37IeLnI2Iy_PE8Z7fLTdYKbSzu70Y2nKNG04N1lehrJjZvOukM1RAeIw6qRGCzudGCxEGlxdLd6XoH127c",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNOhyPzFpu6SBY-kn1ibNBZD97gXhSANWWGoSc4wPSzBu_dJIinONRa-D-1mRS5iRReugLSPkuIMFsIRkZCb4FUXyKNY2j4qlfCmhiVoTR9lVOansmNoZkwTtF5RAEQg9meLv-MLyybggmep5PqvBt9oIUXMSWoG7PUC7a8abNlcMN4I7io3yJ2W541jr7vbclkpv0PLzz_G5b493QrZCVNRygrEs6DbrKm6BaTvFoyXxhusnaWUA",
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
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhKrAkV5wPd0LNAIgJAV4G7UQuINZJn5BAMDvGwCLE-n8QVyr_7pOg_f4g2USbPRg9tuwILQEZNAgbGsNXfgpd44lhygu6WhX3sX7_eyWMiY7nDcnDOSmS-8UvLRD0JLRV80oudPrcM3SOVpY2WRT2lcPMLBOAiVxqQxMgysGY8RRtq1dh-c41YX6Zhut0okQKVmoKeVRqFTcBVXNnvYsYzksHrsC33VZn1qBIb9-TL3DFp9wV0J8",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosTHT2bBLDBQM1BO_0dvo0XtyIRmeq5_2frud2NwsT561CmtGYCrZq8Bh1hq_-yMLw4YXVrcolXwtXzX_Tvt7Cf-ba7MbYruI20K1HWAyLdw470uGSfNJPCyNRb0WyHGZ5h6ChRh8MnTVWDcfvVJFdy2UgjZtgXyXMIuSX4xHbpVrXvMx3-mn4LWIXaCKvz2JTJI__K9sk0q5z2A4Fk_i7ONGqw1Rau_slvadMi1auwRSAbxl7B0",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmq-9E_fh7dUx4yZHHrwn_-nPPzJjScEUQWZWxA7MCiD3344WAKBvWweeuee_Rh99pXjipMwjTLkrzgB6Ga701ZEPbXpus3s7AI44Fl7GJSJaXZzop-TBO7425rmvFVf538HjQT1iF-CEbeg1ygUXpSca218x7c0_ve37IeLnI2Iy_PE8Z7fLTdYKbSzu70Y2nKNG04N1lehrJjZvOukM1RAeIw6qRGCzudGCxEGlxdLd6XoH127c",
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
    coverImage: "/stitch/avatar_bride.png",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbiQ-zkREWMRgAk5fNoYa-57h3gz6RRL8PWBb_ovevpk-doFJvr7ee4a5IbtqnHP6EU4fPu5XgAc4ZFa9rIG4Pugb2sRTpSzciryYgDYJTQzImWM5hl5GK5nSkuiHhiff47u3Ues0RIdrmVzLd0FBru9oSfXRd4YW4Wh36gdKejHsEyNNsQFjsDFUGgHpuquoDN2F1ell3ML_Gyb46APgWzuE3hmbewTeY08V-w9kQUUFSiFnvNOo",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCosTHT2bBLDBQM1BO_0dvo0XtyIRmeq5_2frud2NwsT561CmtGYCrZq8Bh1hq_-yMLw4YXVrcolXwtXzX_Tvt7Cf-ba7MbYruI20K1HWAyLdw470uGSfNJPCyNRb0WyHGZ5h6ChRh8MnTVWDcfvVJFdy2UgjZtgXyXMIuSX4xHbpVrXvMx3-mn4LWIXaCKvz2JTJI__K9sk0q5z2A4Fk_i7ONGqw1Rau_slvadMi1auwRSAbxl7B0",
    collaborators: [
      { name: "Camila", role: "Noiva", avatar: "/stitch/avatar_bride.png" },
      { name: "Beauty Artist", role: "Make & Penteado", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8" }
    ]
  }
];

export function ClustersSection({
  onSelectCluster,
  onDownloadPdf,
  onOpenShareModal
}: ClustersSectionProps) {
  const [filterMode, setFilterMode] = useState<"todas" | "cerimonial" | "fornecedor">("todas");

  const handleShareLink = (name: string) => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(`Link do cluster "${name}" copiado!`, {
      description: "Pronto para enviar por WhatsApp aos fornecedores."
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stitch Screen 5: Header Intro */}
      <section className="pt-2 pb-2 border-b border-outline-variant/30 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
            Curadoria de Estilo
          </span>
        </div>
        <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface tracking-tight">
          Coleções & Clusters
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl">
          Organização visual para fornecedores e cerimonial alinharem cada detalhe estético do casamento de Camila & Carlos.
        </p>
      </section>

      {/* Filter & Fast Stats Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setFilterMode("todas")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            filterMode === "todas"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span>Todas</span>
          <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface text-[10px] font-bold">
            {CLUSTERS.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilterMode("cerimonial")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            filterMode === "cerimonial"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span>Com Cerimonial</span>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        </button>

        <button
          type="button"
          onClick={() => setFilterMode("fornecedor")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            filterMode === "fornecedor"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span>Abertas p/ Fornecedores</span>
        </button>
      </div>

      {/* Clusters List / Gallery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CLUSTERS.map((cluster) => {
          return (
            <article
              key={cluster.id}
              className="bg-surface-container-low rounded-xl p-4.5 border border-outline-variant/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-3.5"
            >
              {/* Media Collage Preview */}
              <div 
                className="grid grid-cols-12 gap-2 h-48 w-full rounded-lg overflow-hidden relative cursor-pointer"
                onClick={() => onSelectCluster(cluster.id)}
              >
                <div className="col-span-7 h-full relative overflow-hidden group">
                  <img
                    src={cluster.coverImage}
                    alt={cluster.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2.5 px-2 py-0.5 rounded bg-surface/85 backdrop-blur-md font-label-sm text-[10px] uppercase tracking-wider text-on-surface shadow-xs">
                    {cluster.categoryTag}
                  </span>
                </div>
                <div className="col-span-5 flex flex-col gap-2 h-full">
                  <div className="h-1/2 w-full rounded overflow-hidden relative">
                    <img
                      src={cluster.thumb1}
                      alt="Thumbnail 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/2 w-full rounded overflow-hidden relative">
                    <img
                      src={cluster.thumb2}
                      alt="Thumbnail 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content Info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 
                      className="font-headline-sm text-lg text-on-surface cursor-pointer hover:text-secondary transition-colors"
                      onClick={() => onSelectCluster(cluster.id)}
                    >
                      {cluster.name}
                    </h2>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
                    {cluster.itemCount} referências visuais · Atualizado
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider font-semibold ${
                  cluster.statusBadge === "Prioritário" 
                    ? "bg-secondary-container text-on-secondary-container" 
                    : "bg-surface-container text-on-surface-variant"
                }`}>
                  {cluster.statusBadge}
                </span>
              </div>

              <p className="font-body-md text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                {cluster.description}
              </p>

              {/* Collaborators & Actions Dock */}
              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden items-center">
                    {cluster.collaborators.map((c, i) => (
                      <img
                        key={i}
                        src={c.avatar}
                        alt={c.name}
                        title={`${c.name} (${c.role})`}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-surface object-cover bg-surface-container"
                      />
                    ))}
                  </div>
                  <span className="ml-2.5 font-label-sm text-[11px] text-on-surface-variant">
                    {cluster.collaborators.length} membros
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleShareLink(cluster.name)}
                    className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs flex items-center gap-1 transition-all active:scale-95"
                    title="Copiar Link do Cluster"
                  >
                    <LinkIcon className="size-3.5" />
                    <span>Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={onDownloadPdf}
                    className="h-8 px-2.5 rounded-lg bg-primary text-on-primary font-label-md text-xs flex items-center gap-1 shadow-xs hover:opacity-90 transition-all active:scale-95"
                    title="Exportar PDF deste Cluster"
                  >
                    <FileText className="size-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
