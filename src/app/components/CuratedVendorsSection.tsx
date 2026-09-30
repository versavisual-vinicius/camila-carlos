import { useState } from "react";
import { KeyVendor, OPTIONAL_VENDOR_CATEGORIES } from "@/app/data/shotListData";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Plus, 
  Trash2, 
  Compass, 
  Check, 
  X,
  ExternalLink,
  Store,
  Sparkles,
  Navigation,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";

interface CuratedVendorsSectionProps {
  vendors: KeyVendor[];
  onAddVendor: (vendor: Omit<KeyVendor, "id">) => void;
  onUpdateVendor: (id: string, updates: Partial<KeyVendor>) => void;
  onDeleteVendor: (id: string) => void;
  onResetVendors: () => void;
}

const vendorPhotos: Record<string, string> = {
  "ven-01": "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc",
  "ven-02": "/brand-assets/vv-icon-teal-1000px.png"
};

export function CuratedVendorsSection({
  vendors,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onResetVendors
}: CuratedVendorsSectionProps) {
  // Pre-filled confirmed partners
  const confirmedVendors = vendors.filter((v) => !v.isCustom);
  // Bride's custom vendors
  const customVendors = vendors.filter((v) => v.isCustom);

  // Quick Add State for Bride
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [newRole, setNewRole] = useState("Cerimonial & Assessoria");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleOpenWhatsApp = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message || "Olá!");
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, "_blank");
  };

  const handleCreateVendor = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newName.trim()) {
      toast.error("Informe o nome do profissional ou empresa.");
      return;
    }

    onAddVendor({
      role: newRole,
      name: newName.trim(),
      phone: newPhone.trim(),
      whatsappMessage: newMessage.trim() || `Olá! Sou a Camila e gostaria de alinhar detalhes do casamento no Espaço Lux.`,
      isCustom: true
    });

    setNewName("");
    setNewPhone("");
    setNewMessage("");
    setIsAddingOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* 1. Header da Seção */}
      <section className="pt-1 pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-semibold uppercase tracking-wider">
              Logística & Cenários
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
            Locais & Fornecedores
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            Cenário oficial do casamento e equipe de fotografia da Versa Visual, com espaço dedicado para você registrar e centralizar seus outros parceiros contratados.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body-md text-xs text-on-surface font-semibold bg-surface-container-lowest dark:bg-card px-3.5 py-1.5 rounded-full border border-outline-variant/30 shadow-xs flex items-center gap-1.5">
            <MapPin className="size-3.5 text-secondary" />
            <span>Rio das Ostras · Costa Azul, RJ</span>
          </span>
        </div>
      </section>

      {/* 2. Banner Integrado do Local Principal (Espaço Lux com Rota no Mapa) */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-airbnb-card bg-surface-container group border border-outline-variant/20">
        <div 
          className="w-full h-48 sm:h-60 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-body-md text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  Cenário Oficial de Cerimônia & Festa
                </span>
              </div>
              <h2 className="font-headline-sm text-xl sm:text-2xl text-white font-bold leading-tight">
                Espaço Lux & Falésias da Costa Azul — Rio das Ostras
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-white/80 leading-normal">
                Altar sob luz natural ao ar livre · Salão integrado · Rota litorânea nas falésias para pôr do sol
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-stone-900 hover:bg-white/90 px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 text-xs font-semibold"
                title="Abrir rota no Google Maps"
              >
                <Compass className="size-4 text-secondary" />
                <span>Google Maps</span>
              </a>

              <a
                href="https://waze.com/ul?q=Espaço+Lux+Rio+das+Ostras"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-all active:scale-95 flex items-center gap-2 text-xs font-semibold"
                title="Abrir no Waze"
              >
                <Navigation className="size-4" />
                <span>Waze</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Parceiros Oficiais Confirmados (Espaço de Evento + Fotografia Versa Visual) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold flex items-center gap-2">
            <Store className="size-4.5 text-secondary" />
            <span>Equipe & Local Confirmados</span>
          </h2>
          <span className="text-xs text-secondary hidden sm:inline">
            Contratos ativos com Camila & Carlos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {confirmedVendors.map((vendor) => {
            const isFoto = vendor.id === "ven-02" || vendor.category === "foto";
            const photoUrl = vendorPhotos[vendor.id] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc";

            return (
              <article
                key={vendor.id}
                className="flex flex-col bg-surface-container-lowest dark:bg-card rounded-3xl overflow-hidden border border-outline-variant/25 shadow-airbnb-card hover:shadow-md transition-all duration-300"
              >
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="size-12 shrink-0 rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container flex items-center justify-center p-1">
                        <img 
                          src={photoUrl} 
                          alt={vendor.name} 
                          className="w-full h-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <span className="font-body-md text-xs text-secondary font-bold uppercase tracking-wider block">
                          {vendor.role}
                        </span>
                        <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold mt-0.5 leading-snug">
                          {vendor.name}
                        </h3>
                        {vendor.address && (
                          <p className="font-body-md text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-secondary shrink-0" />
                            <span>{vendor.address}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20 shrink-0">
                      <Check className="size-3" />
                      <span>Confirmado</span>
                    </span>
                  </div>

                  {/* Mensagem / Contexto */}
                  <p className="font-body-md text-xs sm:text-[13px] text-on-surface/85 leading-relaxed bg-surface-container-low/70 dark:bg-surface-container/40 p-3 rounded-2xl border border-outline-variant/15">
                    {isFoto
                      ? "Direção fotográfica, cobertura editorial completa de 2 fotógrafos e curadoria visual conduzida por Vinicius Cunha (@v1ncsc)."
                      : "Cenário exclusivo com cerimônia ao ar livre sob jabuticabeiras e salão de recepção integrado com infraestrutura completa."}
                  </p>

                  {/* Ações */}
                  <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/15 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleOpenWhatsApp(vendor.phone, vendor.whatsappMessage)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary hover:opacity-90 active:scale-98 font-body-md text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <MessageCircle className="size-4" />
                      <span>Conversar no WhatsApp</span>
                    </button>

                    {vendor.mapsUrl && (
                      <a
                        href={vendor.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3.5 rounded-xl bg-surface-container dark:bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-md text-xs font-semibold flex items-center gap-1.5 border border-outline-variant/20 transition-colors shadow-2xs"
                        title="Abrir no Google Maps"
                      >
                        <MapPin className="size-3.5 text-secondary" />
                        <span className="hidden sm:inline">Mapa</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 4. Fornecedores Opcionais da Noiva (Sem obrigatoriedade) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-outline-variant/20 pt-6">
          <div>
            <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-bold flex items-center gap-2">
              <Sparkles className="size-4.5 text-secondary" />
              <span>Seus Outros Parceiros Contratados</span>
              <span className="text-xs font-normal text-on-surface-variant font-body-md">
                (opcional)
              </span>
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
              Caso queira, anote aqui outros profissionais contratados para centralizar contatos e detalhes com o cerimonial.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingOpen(true)}
            className="h-9 px-4 rounded-xl bg-surface-container-lowest dark:bg-card hover:bg-surface-container text-on-surface font-body-md text-xs font-semibold flex items-center gap-1.5 border border-outline-variant/30 transition-all shadow-xs active:scale-95 self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Plus className="size-3.5 text-secondary" />
            <span>Adicionar Parceiro</span>
          </button>
        </div>

        {/* Modal / Card Inline de Adicionar Fornecedor */}
        {isAddingOpen && (
          <div className="bg-surface-container-lowest dark:bg-card rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-airbnb-card flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Novo Parceiro ou Fornecedor
              </span>
              <button
                type="button"
                onClick={() => setIsAddingOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Função / Especialidade
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="bg-surface-container-low dark:bg-surface-container text-xs text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  {OPTIONAL_VENDOR_CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="Outro Fornecedor">Outro Fornecedor</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Nome do Profissional ou Empresa *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nome da maquiadora, cerimonialista..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-surface-container-low dark:bg-surface-container text-xs text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  WhatsApp / Telefone (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 22 99999-9999"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-surface-container-low dark:bg-surface-container text-xs text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  Anotação ou Observação (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Contrato assinado, combinar prova do vestido..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-surface-container-low dark:bg-surface-container text-xs text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsAddingOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateVendor}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 shadow-xs transition-all active:scale-95"
              >
                Salvar Fornecedor
              </button>
            </div>
          </div>
        )}

        {/* Lista de Fornecedores Adicionados pela Noiva */}
        {customVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="p-5 rounded-3xl bg-surface-container-lowest dark:bg-card border border-outline-variant/20 shadow-airbnb-card flex flex-col justify-between gap-3.5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-secondary font-bold uppercase tracking-wider block">
                      {vendor.role}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-bold mt-0.5">
                      {vendor.name}
                    </h3>
                    {vendor.whatsappMessage && (
                      <p className="text-xs text-on-surface-variant mt-1.5 italic bg-surface-container-low/70 dark:bg-surface-container/30 p-2.5 rounded-xl border border-outline-variant/15">
                        "{vendor.whatsappMessage}"
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteVendor(vendor.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Remover parceiro"
                    aria-label="Remover parceiro"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {vendor.phone && (
                  <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenWhatsApp(vendor.phone, vendor.whatsappMessage)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <MessageCircle className="size-3.5 text-secondary" />
                      <span>{vendor.phone}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-surface-container-lowest dark:bg-card border border-dashed border-outline-variant/30 text-center flex flex-col items-center gap-2 shadow-2xs">
            <div className="size-11 rounded-full bg-surface-container flex items-center justify-center text-secondary">
              <Store className="size-5" />
            </div>
            <p className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Nenhum parceiro adicional cadastrado ainda
            </p>
            <p className="font-body-md text-xs text-on-surface-variant max-w-md leading-relaxed">
              O local (Espaço Lux) e a Direção Fotográfica (Versa Visual) já estão alinhados no roteiro. Você pode adicionar outros contatos (maquiagem, cerimonial, decoração) quando quiser.
            </p>
          </div>
        )}

        {/* Footer com Ação de Restaurar Parceiros Confirmados */}
        {onResetVendors && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onResetVendors}
              className="text-xs text-secondary hover:text-on-surface hover:underline flex items-center gap-1.5 font-medium transition-colors"
            >
              <RotateCcw className="size-3" />
              <span>Restaurar parceiros confirmados</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
