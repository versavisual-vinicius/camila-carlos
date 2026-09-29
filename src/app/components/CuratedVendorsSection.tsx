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
  Sparkles
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
    <div className="flex flex-col gap-6">
      {/* 1. Header da Seção */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-medium">
              Logística & Cenários
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Locais & Fornecedores
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-xl">
            Cenário oficial do casamento e equipe de fotografia, com espaço aberto para você registrar seus outros parceiros contratados.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body-md text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/20 font-medium">
            Rio das Ostras · Costa Azul, RJ
          </span>
        </div>
      </section>

      {/* 2. Banner Integrado do Local Principal (Espaço Lux com Rota no Mapa) */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-surface-container group border border-outline-variant/20">
        <div 
          className="w-full h-44 sm:h-52 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
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
                Altar sob luz natural · Rota costeira e pôr do sol nas falésias
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-stone-900 px-4 py-2 rounded-xl shadow-md hover:bg-white/90 transition-transform active:scale-95 flex items-center gap-2 shrink-0 text-xs font-semibold self-start sm:self-auto"
              title="Abrir rota no Google Maps"
            >
              <Compass className="size-4 text-secondary" />
              <span>Ver no Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Parceiros Oficiais Confirmados (Espaço de Evento + Fotografia Versa Visual) */}
      <div className="space-y-3">
        <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold flex items-center gap-2">
          <Store className="size-4 text-secondary" />
          <span>Equipe & Local Confirmados</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {confirmedVendors.map((vendor) => {
            const isFoto = vendor.id === "ven-02" || vendor.category === "foto";
            const photoUrl = vendorPhotos[vendor.id] || "https://lh3.googleusercontent.com/aida-public/AB6AXuBxLProZGK2qvTEHrFe38y48n-lfMtfMuT4PdRqQm-jDAmca-K41MuliOX9wAo__X8ZhPqDcx6Tv-c5dl8iutefFe1iA5rUCB1wANomF27mADDnMq8_2DwLeMrMw8J_P_RbjgOLWrZ104MdQTFbAMsHCBTjm2b0RLbO8spEI7mQd2gf05gNUdrVbMfPAfUjZppEJO9R4by8aK4_2K3NN_7iTUespyabyt_dSSKBNVwJg0tCxffBoJc";

            return (
              <article
                key={vendor.id}
                className="flex flex-col bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/20 shadow-xs"
              >
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-body-md text-xs text-secondary font-semibold uppercase tracking-wider block">
                        {vendor.role}
                      </span>
                      <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold mt-0.5">
                        {vendor.name}
                      </h3>
                      {vendor.address && (
                        <p className="font-body-md text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-secondary shrink-0" />
                          <span>{vendor.address}</span>
                        </p>
                      )}
                    </div>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-semibold border border-secondary/30 shrink-0">
                      Confirmado
                    </span>
                  </div>

                  {/* Mensagem / Contexto */}
                  <p className="font-body-md text-xs text-on-surface/80 leading-relaxed bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/15">
                    {isFoto
                      ? "Direção fotográfica, cobertura editorial completa e curadoria visual conduzida por Vinicius Cunha (@v1ncsc)."
                      : "Cenário exclusivo de cerimônia ao ar livre sob jabuticabeiras e salão de recepção integrado."}
                  </p>

                  {/* Ações */}
                  <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/15 mt-auto">
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 4. Fornecedores Opcionais da Noiva (Sem obrigatoriedade) */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-outline-variant/20 pt-5">
          <div>
            <h2 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold flex items-center gap-2">
              <Sparkles className="size-4 text-secondary" />
              <span>Seus Outros Parceiros Contratados</span>
              <span className="text-xs font-normal text-on-surface-variant font-body-md">
                (opcional)
              </span>
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
              Caso queira, anote aqui outros profissionais que você contratou para centralizar seus contatos.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingOpen(true)}
            className="h-8 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-xs font-semibold flex items-center gap-1.5 border border-outline-variant/30 transition-colors self-start sm:self-auto"
          >
            <Plus className="size-3.5 text-secondary" />
            <span>Adicionar Parceiro</span>
          </button>
        </div>

        {/* Modal / Card Inline de Adicionar Fornecedor */}
        {isAddingOpen && (
          <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface uppercase tracking-wider">
                Novo Fornecedor
              </span>
              <button
                type="button"
                onClick={() => setIsAddingOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-secondary uppercase">
                  Função / Especialidade
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="bg-surface text-xs text-on-surface p-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                >
                  {OPTIONAL_VENDOR_CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="Outro Fornecedor">Outro Fornecedor</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-secondary uppercase">
                  Nome do Profissional ou Empresa *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nome da maquiadora, cerimonialista..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-surface text-xs text-on-surface p-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-secondary uppercase">
                  WhatsApp / Telefone (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 22 99999-9999"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-surface text-xs text-on-surface p-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-secondary uppercase">
                  Anotação ou Observação (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Contrato assinado, combinar prova do vestido..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="bg-surface text-xs text-on-surface p-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setIsAddingOpen(false)}
                className="px-3 py-1.5 text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateVendor}
                className="px-4 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
                className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-secondary font-semibold uppercase tracking-wider block">
                      {vendor.role}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-semibold mt-0.5">
                      {vendor.name}
                    </h3>
                    {vendor.whatsappMessage && (
                      <p className="text-xs text-on-surface-variant mt-1 italic">
                        "{vendor.whatsappMessage}"
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteVendor(vendor.id)}
                    className="text-error/70 hover:text-error p-1 rounded-lg hover:bg-error/10 transition-colors"
                    title="Remover fornecedor"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {vendor.phone && (
                  <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenWhatsApp(vendor.phone, vendor.whatsappMessage)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors"
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
          <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-dashed border-outline-variant/30 text-center flex flex-col items-center gap-1.5">
            <p className="font-body-md text-xs sm:text-sm text-on-surface/75">
              Nenhum parceiro adicional cadastrado ainda.
            </p>
            <p className="font-body-md text-xs text-on-surface-variant max-w-md">
              Os dados de Espaço e Fotografia já estão alinhados acima. Caso deseje cadastrar maquiagem, cerimonial, decoração ou outros profissionais, clique no botão acima quando quiser.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
