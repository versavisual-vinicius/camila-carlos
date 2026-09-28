import { useState } from "react";
import { motion } from "motion/react";
import { KeyVendor } from "@/app/data/shotListData";
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Users, 
  Church, 
  Hotel,
  Compass,
  Bookmark,
  Share2,
  Sparkles,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface CuratedVendorsSectionProps {
  vendors: KeyVendor[];
  onAddVendor: (vendor: Omit<KeyVendor, "id">) => void;
  onUpdateVendor: (id: string, updates: Partial<KeyVendor>) => void;
  onDeleteVendor: (id: string) => void;
  onResetVendors: () => void;
  onSelectCluster?: (clusterId: string) => void;
}

const vendorPhotos: Record<string, string> = {
  "ven-01": "https://lh3.googleusercontent.com/aida-public/AB6AXuBI_ayzVoYwiSJjk9BmdwhfZ1hq4GfjeJIcf-Lcpg4GeR8Mhp_ChonvfTdyyv8FWDwanloakE8khajpDZUsOTILrFfYixYuZCUQAZyaiGIlNiENYY7IE_cOi_Z8VU6sNUHXFaaD-ooNB0r0Gv5ELnen4GlyXMySN5dc67sxWsx_7f9xzK-LVqHN7OSuEDqB8fWBTehRd8A7BkErkcnhBidGmBIbQm-rbrzFyZW2zaY1_hQ7sUA2WX8",
  "ven-02": "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc",
  "ven-03": "/stitch/avatar_bride.png",
  "ven-04": "https://lh3.googleusercontent.com/aida-public/AB6AXuBbiQ-zkREWMRgAk5fNoYa-57h3gz6RRL8PWBb_ovevpk-doFJvr7ee4a5IbtqnHP6EU4fPu5XgAc4ZFa9rIG4Pugb2sRTpSzciryYgDYJTQzImWM5hl5GK5nSkuiHhiff47u3Ues0RIdrmVzLd0FBru9oSfXRd4YW4Wh36gdKejHsEyNNsQFjsDFUGgHpuquoDN2F1ell3ML_Gyb46APgWzuE3hmbewTeY08V-w9kQUUFSiFnvNOo",
  "ven-05": "https://lh3.googleusercontent.com/aida-public/AB6AXuD5y293Fmtt9ty9-AJsjScehdt-MLDEo5igZ9Uzyr4TohdYqVcOau59AFiAvIIwmG38ik1hFW-ghLU-j9YcgrLOlDQVzYQT7VRzBiIz2oUMvgsp_2m53EDXiVQ8CeagnL-J5awgUg90pu_QkPRqZeWZPR3GnJYkYsNCtilTiG8Ug9s3Co_-JVyrImX3MBvIjYWgWs6hiz-tYtZVJP_CsJ6wmhmO0XUjJyVL9S5nSm19LMhoWj8pH9I",
  "ven-06": "https://lh3.googleusercontent.com/aida-public/AB6AXuCNOhyPzFpu6SBY-kn1ibNBZD97gXhSANWWGoSc4wPSzBu_dJIinONRa-D-1mRS5iRReugLSPkuIMFsIRkZCb4FUXyKNY2j4qlfCmhiVoTR9lVOansmNoZkwTtF5RAEQg9meLv-MLyybggmep5PqvBt9oIUXMSWoG7PUC7a8abNlcMN4I7io3yJ2W541jr7vbclkpv0PLzz_G5b493QrZCVNRygrEs6DbrKm6BaTvFoyXxhusnaWUA"
};

const vendorMetrics: Record<string, { guests?: string; highlight1?: string; highlight2?: string }> = {
  "ven-02": { guests: "250 convidados", highlight1: "Capela no local", highlight2: "Suíte da noiva" },
  "ven-03": { guests: "Equipe Completa", highlight1: "Direção Editorial", highlight2: "Luz Solar Blindada" },
  "ven-01": { guests: "Roteiro Integrado", highlight1: "Ficha de Altar", highlight2: "Protocolo Avós" }
};

export function CuratedVendorsSection({
  vendors,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onResetVendors,
  onSelectCluster
}: CuratedVendorsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "confirmed" | "contacted">("all");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const filterOptions = [
    { value: "all" as const, label: "Todos os parceiros", count: vendors.length },
    { value: "confirmed" as const, label: "Confirmados", count: vendors.filter(v => v.id === "ven-02" || v.id === "ven-03").length },
    { value: "contacted" as const, label: "Em alinhamento", count: vendors.filter(v => v.id !== "ven-02" && v.id !== "ven-03").length }
  ];

  const filteredVendors = vendors.filter((v) => {
    if (activeFilter === "confirmed") return v.id === "ven-02" || v.id === "ven-03";
    if (activeFilter === "contacted") return v.id !== "ven-02" && v.id !== "ven-03";
    return true;
  });

  const handleOpenWhatsApp = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank");
  };

  const handleStartEditNote = (vendorId: string, currentNote?: string) => {
    setEditingNoteId(vendorId);
    setNoteDraft(currentNote || "");
  };

  const handleSaveNote = (vendorId: string) => {
    onUpdateVendor(vendorId, { whatsappMessage: noteDraft });
    setEditingNoteId(null);
    toast.success("Anotação de alinhamento atualizada!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Editorial (Estilo Airbnb / Versa Visual) */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-medium">
              Curadoria Afetiva & Logística
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Locais & Fornecedores
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-xl">
            Cenários e profissionais alinhados para orquestrar o casamento de Camila & Carlos com tranquilidade.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body-md text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/20 font-medium">
            {vendors.length} parceiros mapeados
          </span>
        </div>
      </section>

      {/* 2. Filtros com Pílula Deslizante (Tubelight Sliding Pill) */}
      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 py-1 flex items-center no-scrollbar">
        <div className="bg-surface-container/70 dark:bg-surface-container/40 backdrop-blur-md p-1 rounded-full border border-outline-variant/20 inline-flex items-center gap-1">
          {filterOptions.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={`relative px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-on-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="vendors-filter-active"
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

      {/* 3. Banner Integrado do Local Principal */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-surface-container group border border-outline-variant/20">
        <div 
          className="w-full h-44 sm:h-52 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-on-primary">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span className="font-body-md text-xs text-white/90 font-medium">
                  Cenário Oficial de Cerimônia & Festa
                </span>
              </div>
              <p className="font-headline-sm text-lg sm:text-xl text-white font-semibold leading-tight">
                Espaço Lux & Falésias da Costa Azul — Rio das Ostras
              </p>
              <p className="font-body-md text-xs text-white/80 leading-normal">
                Rota costeira mapeada · Altar sob luz natural filtrada · Janela dourada às 16:30
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/95 text-stone-900 px-3.5 py-2 rounded-xl shadow-md hover:bg-white transition-transform active:scale-95 flex items-center gap-1.5 shrink-0 text-xs font-semibold"
              title="Abrir rota no Google Maps"
            >
              <Compass className="size-4 text-secondary" />
              <span className="hidden sm:inline">Ver no Mapa</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Grade de Parceiros & Fornecedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVendors.map((vendor) => {
          const photoUrl = vendorPhotos[vendor.id] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc";
          const metrics = vendorMetrics[vendor.id];
          const isConfirmed = vendor.id === "ven-02" || vendor.id === "ven-03";

          return (
            <article
              key={vendor.id}
              className="flex flex-col bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Media Header Cover */}
              <div className="relative w-full h-48 sm:h-52 bg-surface-container overflow-hidden">
                <img
                  src={photoUrl}
                  alt={vendor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 dark:bg-black/80 backdrop-blur-md text-on-surface font-body-md text-xs shadow-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {isConfirmed ? "Confirmado oficial" : "Curadoria Versa"}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/90 text-on-primary font-body-md text-xs font-medium backdrop-blur-xs">
                    {vendor.role}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 sm:p-5 flex flex-col gap-3.5 flex-1">
                <div>
                  <span className="font-body-md text-xs text-secondary font-medium block">
                    {vendor.role}
                  </span>
                  <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold mt-0.5">
                    {vendor.name}
                  </h2>
                  {vendor.address && (
                    <p className="font-body-md text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-secondary shrink-0" />
                      <span className="truncate">{vendor.address}</span>
                    </p>
                  )}
                </div>

                {/* Metrics Highlights if available */}
                {metrics && (
                  <div className="flex items-center gap-4 py-2 text-on-surface-variant text-xs border-y border-outline-variant/20">
                    {metrics.guests && (
                      <div className="flex items-center gap-1.5">
                        <Users className="size-3.5 text-secondary" />
                        <span className="font-medium text-on-surface/90">{metrics.guests}</span>
                      </div>
                    )}
                    {metrics.highlight1 && (
                      <div className="flex items-center gap-1.5">
                        <Church className="size-3.5 text-secondary" />
                        <span>{metrics.highlight1}</span>
                      </div>
                    )}
                    {metrics.highlight2 && (
                      <div className="flex items-center gap-1.5">
                        <Hotel className="size-3.5 text-secondary" />
                        <span>{metrics.highlight2}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Personal Note Box */}
                <div className="bg-surface-container/70 rounded-xl p-3 flex flex-col gap-1.5 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-xs text-secondary font-semibold">
                      Anotação de Alinhamento
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartEditNote(vendor.id, vendor.whatsappMessage)}
                      className="text-secondary hover:text-on-surface text-xs font-medium underline transition-colors"
                    >
                      {editingNoteId === vendor.id ? "Cancelar" : "Editar"}
                    </button>
                  </div>

                  {editingNoteId === vendor.id ? (
                    <div className="flex flex-col gap-2 mt-1">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        rows={2}
                        className="w-full bg-surface text-xs text-on-surface p-2.5 rounded-lg border border-outline-variant/40 focus:outline-none resize-none leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveNote(vendor.id)}
                        className="self-end px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Salvar Anotação
                      </button>
                    </div>
                  ) : (
                    <p className="font-body-md text-xs text-on-surface/85 leading-relaxed pt-0.5">
                      "{vendor.whatsappMessage}"
                    </p>
                  )}
                </div>

                {/* Micro Actions Bar */}
                <div className="flex items-center gap-2 pt-1 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsApp(vendor.phone, vendor.whatsappMessage)}
                    className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary hover:opacity-90 active:scale-95 font-body-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <MessageCircle className="size-4" />
                    <span>Conversar no WhatsApp</span>
                  </button>

                  {vendor.mapsUrl && (
                    <a
                      href={vendor.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-xs font-medium flex items-center gap-1.5 border border-outline-variant/20 transition-colors"
                      title="Abrir no Google Maps"
                    >
                      <MapPin className="size-3.5 text-secondary" />
                      <span>Mapa</span>
                    </a>
                  )}

                  {vendor.isCustom && (
                    <button
                      type="button"
                      onClick={() => onDeleteVendor(vendor.id)}
                      className="p-2 rounded-xl bg-surface-container hover:bg-error-container/30 text-error transition-colors border border-outline-variant/20"
                      title="Remover parceiro"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
