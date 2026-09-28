import { useState } from "react";
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
  Share2
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
  "ven-03": { guests: "Equipe Completa", highlight1: "Direção Editorial", highlight2: "Golden Hour Lock" },
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
  const [activeFilter, setActiveFilter] = useState<"all" | "contacted" | "confirmed">("all");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

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
    toast.success("Anotação pessoal atualizada!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stitch Screen 7: Header Intro */}
      <div className="pt-2 pb-2 border-b border-outline-variant/30 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold block mb-0.5">
              Curadoria Afetiva
            </span>
            <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface tracking-tight">
              Locais & Fornecedores
            </h1>
          </div>
          <span className="font-label-md text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full self-start sm:self-auto">
            {vendors.length} cadastrados no casamento
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all flex-shrink-0 ${
              activeFilter === "all"
                ? "bg-primary text-on-primary font-semibold shadow-xs"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Todos ({vendors.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("confirmed")}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all flex-shrink-0 ${
              activeFilter === "confirmed"
                ? "bg-primary text-on-primary font-semibold shadow-xs"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Confirmados
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("contacted")}
            className={`px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all flex-shrink-0 ${
              activeFilter === "contacted"
                ? "bg-primary text-on-primary font-semibold shadow-xs"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            Em Alinhamento
          </button>
        </div>
      </div>

      {/* Interactive Map Banner (Stitch Screen 7) */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-xs bg-surface-container group">
        <div 
          className="w-full h-44 sm:h-52 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-on-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-tertiary">location_on</span>
              <div>
                <p className="font-headline-sm text-base sm:text-lg text-white font-medium leading-tight">
                  Rio das Ostras · Costa Azul & Espaço Lux
                </p>
                <p className="font-label-sm text-xs text-white/80 tracking-wide mt-0.5">
                  Rota costeira mapeada · Luz solar protegida às 16:30
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface/90 backdrop-blur-md text-on-surface p-2.5 rounded-full shadow hover:bg-surface transition-transform active:scale-95 flex items-center justify-center"
              title="Abrir no Google Maps"
            >
              <Compass className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Curation Cards Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vendors.map((vendor) => {
          const photoUrl = vendorPhotos[vendor.id] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc";
          const metrics = vendorMetrics[vendor.id];

          return (
            <article
              key={vendor.id}
              className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Media Header Cover */}
              <div className="relative w-full h-48 bg-surface-container overflow-hidden">
                <img
                  src={photoUrl}
                  alt={vendor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/95 backdrop-blur-md text-on-secondary-container font-label-sm text-[10px] shadow-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {vendor.id === "ven-02" || vendor.id === "ven-03" ? "Confirmado Oficial" : "Curadoria Versa"}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-[10px]">
                    {vendor.role}
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-4 flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wider">
                      {vendor.role}
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-lg text-on-surface">
                    {vendor.name}
                  </h2>
                  {vendor.address && (
                    <p className="font-body-md text-xs text-on-surface-variant mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3 text-secondary" />
                      <span>{vendor.address}</span>
                    </p>
                  )}
                </div>

                {/* Metrics Highlights if available */}
                {metrics && (
                  <div className="flex items-center gap-4 py-1 text-on-surface-variant text-xs border-y border-outline-variant/20">
                    {metrics.guests && (
                      <div className="flex items-center gap-1">
                        <Users className="size-3.5 text-secondary" />
                        <span>{metrics.guests}</span>
                      </div>
                    )}
                    {metrics.highlight1 && (
                      <div className="flex items-center gap-1">
                        <Church className="size-3.5 text-secondary" />
                        <span>{metrics.highlight1}</span>
                      </div>
                    )}
                    {metrics.highlight2 && (
                      <div className="flex items-center gap-1">
                        <Hotel className="size-3.5 text-secondary" />
                        <span>{metrics.highlight2}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Personal Note Box */}
                <div className="bg-surface-container rounded-lg p-3 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider font-semibold">
                      Anotação de Alinhamento
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStartEditNote(vendor.id, vendor.whatsappMessage)}
                      className="text-secondary hover:text-on-surface text-[10px] uppercase tracking-wider underline"
                    >
                      {editingNoteId === vendor.id ? "Cancelar" : "Editar"}
                    </button>
                  </div>

                  {editingNoteId === vendor.id ? (
                    <div className="flex flex-col gap-2">
                      <textarea
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        rows={2}
                        className="w-full bg-surface text-xs text-on-surface p-2 rounded border border-outline-variant/40 focus:outline-none resize-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveNote(vendor.id)}
                        className="self-end px-3 py-1 bg-primary text-on-primary text-xs rounded"
                      >
                        Salvar Nota
                      </button>
                    </div>
                  ) : (
                    <p className="font-body-md text-xs text-on-surface-variant italic">
                      "{vendor.whatsappMessage}"
                    </p>
                  )}
                </div>

                {/* Micro Actions Bar */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsApp(vendor.phone, vendor.whatsappMessage)}
                    className="flex-1 py-2 px-3 rounded-lg bg-primary text-on-primary hover:opacity-90 active:scale-95 font-label-md text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  {vendor.mapsUrl && (
                    <a
                      href={vendor.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs flex items-center gap-1 transition-colors"
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
                      className="p-2 rounded-lg bg-surface-container hover:bg-error-container/30 text-error transition-colors"
                      title="Remover fornecedor"
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
