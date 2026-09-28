import { useState } from "react";
import { 
  Building2, 
  Sun, 
  Clock, 
  Check, 
  UserCheck, 
  Save, 
  Camera,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  Users,
  MessageCircle,
  Phone,
  Navigation,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  FileText,
  Download,
  RotateCcw,
  Trash2,
  Edit2,
  X
} from "lucide-react";
import { 
  SOLAR_TIMELINE_BLOCKS, 
  ShotListGroup, 
  ShotListItem,
  KeyVendor
} from "@/app/data/shotListData";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface WeddingLogisticsSectionProps {
  shotListGroups: ShotListGroup[];
  onUpdateShotItem: (groupId: string, itemId: string, updates: Partial<ShotListItem>) => void;
  onAddShotItem: (groupId: string, title: string) => void;
  onDeleteShotItem?: (groupId: string, itemId: string) => void;
  onResetShotList?: () => void;
  sensitiveAlerts: string;
  onSaveSensitiveAlerts: (text: string) => void;
  focalPointData: { name: string; phone: string };
  onSaveFocalPoint: (data: { name: string; phone: string }) => void;
  vendors: KeyVendor[];
  onAddVendor: (vendor: Omit<KeyVendor, "id">) => void;
  onUpdateVendor: (id: string, updates: Partial<KeyVendor>) => void;
  onDeleteVendor: (id: string) => void;
  onResetVendors: () => void;
  onDownloadFullDossier: () => void;
  onDownloadCeremonialAltar: () => void;
}

export function WeddingLogisticsSection({
  shotListGroups,
  onUpdateShotItem,
  onAddShotItem,
  onDeleteShotItem,
  onResetShotList,
  sensitiveAlerts,
  onSaveSensitiveAlerts,
  focalPointData,
  onSaveFocalPoint,
  vendors,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onResetVendors,
  onDownloadFullDossier,
  onDownloadCeremonialAltar
}: WeddingLogisticsSectionProps) {
  // Timeline block expansion
  const [expandedTimeBlock, setExpandedTimeBlock] = useState<string>("time-06");
  
  // Shot List group expansion state
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "avos-mobilidade": true,
    "familia-noiva": true,
    "familia-noivo": true,
    "padrinhos-madrinhas": true,
    "amigos-especiais": false
  });

  // Adding item inline input
  const [newShotTitles, setNewShotTitles] = useState<Record<string, string>>({});
  
  // Sensitive alerts editing
  const [alertsText, setAlertsText] = useState(sensitiveAlerts);
  
  // Focal point state
  const [focalName, setFocalName] = useState(focalPointData.name);
  const [focalPhone, setFocalPhone] = useState(focalPointData.phone);

  // Vendor Modal State
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [vendorForm, setVendorForm] = useState<Omit<KeyVendor, "id">>({
    role: "",
    name: "",
    phone: "",
    whatsappMessage: "",
    address: "",
    mapsUrl: "",
    wazeUrl: "",
    category: "outros"
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleSaveAlerts = () => {
    onSaveSensitiveAlerts(alertsText);
    toast.success("Restrições operacionais salvas com sucesso!");
  };

  const handleSaveFocalPointForm = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveFocalPoint({ name: focalName, phone: focalPhone });
    toast.success("Ponto focal de apoio salvo na ficha técnica!");
  };

  const handleAddShot = (groupId: string) => {
    const title = (newShotTitles[groupId] || "").trim();
    if (!title) return;
    onAddShotItem(groupId, title);
    setNewShotTitles((prev) => ({ ...prev, [groupId]: "" }));
    toast.success("Nova foto protocolar adicionada!");
  };

  const handleOpenAddVendorModal = () => {
    setEditingVendorId(null);
    setVendorForm({
      role: "",
      name: "",
      phone: "5522",
      whatsappMessage: "Olá! Segue o alinhamento da logística de Camila & Carlos: ",
      address: "",
      mapsUrl: "",
      wazeUrl: "",
      category: "outros"
    });
    setIsVendorModalOpen(true);
  };

  const handleOpenEditVendorModal = (vendor: KeyVendor) => {
    setEditingVendorId(vendor.id);
    setVendorForm({
      role: vendor.role,
      name: vendor.name,
      phone: vendor.phone,
      whatsappMessage: vendor.whatsappMessage,
      address: vendor.address || "",
      mapsUrl: vendor.mapsUrl || "",
      wazeUrl: vendor.wazeUrl || "",
      category: vendor.category || "outros"
    });
    setIsVendorModalOpen(true);
  };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorForm.role || !vendorForm.name) {
      toast.error("Preencha ao menos a Função e o Nome do fornecedor.");
      return;
    }

    if (editingVendorId) {
      onUpdateVendor(editingVendorId, vendorForm);
    } else {
      onAddVendor(vendorForm);
    }
    setIsVendorModalOpen(false);
  };

  // Stats calculation
  const allItems = shotListGroups.flatMap((g) => g.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => i.isCompleted).length;
  const mandatoryCount = allItems.filter((i) => i.isMandatory).length;
  const totalEstimatedMinutes = shotListGroups.reduce((acc, g) => acc + (g.estimatedMinutes || 0), 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#ff385c] tracking-normal uppercase block mb-1.5">
              SEÇÃO 02 · CASAMENTO, SHOT LIST & LOGÍSTICA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] dark:text-white mb-2.5 tracking-[-0.44px]">
              Espaço Lux & Blindagem Solar
            </h2>
            <p className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed font-normal">
              Planejamento com engenharia de luz para Rio das Ostras, Shot List protocolar modular para liberar a família em até {totalEstimatedMinutes} minutos e gestão de fornecedores chave.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onDownloadCeremonialAltar}
              className="h-9 px-4 rounded-[8px] bg-[#e00b41] hover:bg-[#c10a38] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <FileText className="size-4" />
              <span>Ficha de Altar (PDF)</span>
            </button>
            <button
              type="button"
              onClick={onDownloadFullDossier}
              className="h-9 px-4 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <Download className="size-3.5" />
              <span>Dossiê Completo (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Timeline Visual Interativa (Linha do Tempo Solar de Rio das Ostras) */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
              <Sun className="size-3.5" />
              <span>Engenharia de Luz Natural & Crepúsculo</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
              Linha do Tempo Solar — Rio das Ostras
            </h3>
            <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
              Pôr do sol estimado às <strong className="text-[#222222] dark:text-white font-semibold">17:35</strong>. Toque nos blocos para ver as diretrizes técnicas e proteções.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff5f6] dark:bg-[#2c1c20] border border-[#ff385c]/20 text-xs font-semibold text-[#ff385c] self-start sm:self-center">
            <span className="size-2 rounded-full bg-[#ff385c] animate-pulse" />
            <span>Golden Hour: 17:15 — 17:45</span>
          </div>
        </div>

        {/* Timeline Interactive Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {SOLAR_TIMELINE_BLOCKS.map((block) => {
            const isExpanded = expandedTimeBlock === block.id;
            return (
              <div
                key={block.id}
                onClick={() => setExpandedTimeBlock(isExpanded ? "" : block.id)}
                className={`p-4 rounded-[14px] border transition-all duration-200 cursor-pointer ${
                  block.isGoldenHourLock
                    ? "bg-[#fffbfb] dark:bg-[#201518] border-[#ff385c] shadow-xs"
                    : isExpanded
                    ? "bg-[#f7f7f7] dark:bg-[#242426] border-[#222222] dark:border-white/20"
                    : "bg-[#f7f7f7]/60 dark:bg-[#242426]/60 border-[#ebebeb] dark:border-white/5 hover:border-[#c1c1c1]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                      block.isGoldenHourLock ? "text-[#ff385c]" : "text-[#6a6a6a] dark:text-[#a0a0a0]"
                    }`}>
                      {block.timeRange}
                    </span>
                    <h4 className="text-sm font-bold text-[#222222] dark:text-white leading-snug">
                      {block.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-[#6a6a6a]">
                    {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </span>
                </div>

                <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] mt-1.5 flex items-center gap-1">
                  <MapPin className="size-3 text-[#ff385c] flex-shrink-0" />
                  <span>{block.location}</span>
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3 pt-2.5 border-t border-[#ebebeb] dark:border-white/10 space-y-2 text-xs"
                    >
                      <p className="text-[#222222] dark:text-zinc-200 leading-relaxed">
                        {block.description}
                      </p>
                      {block.alertWarning && (
                        <div className="p-2.5 rounded-[8px] bg-[#fff0f2] dark:bg-[#34181d] border border-[#ff385c]/30 text-[#c13515] dark:text-[#ff8a9e] text-[11px] font-semibold leading-relaxed">
                          {block.alertWarning}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Construtor Modular de Shot List (Checklist de Protocolo) */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ebebeb] dark:border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
              <Users className="size-3.5" />
              <span>Fotos com Avós, Pais, Padrinhos & Amigos</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
              Construtor de Shot List Protocolar
            </h3>
            <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
              Personalize com os nomes reais dos familiares para a cerimonialista chamar sem dispersão. Meta total: <strong>{totalEstimatedMinutes} minutos</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-bold text-[#222222] dark:text-white tracking-tight">
                {completedCount}/{totalCount}
              </span>
              <span className="text-[11px] block font-semibold text-[#6a6a6a] dark:text-[#a0a0a0]">
                {mandatoryCount} obrigatórias
              </span>
            </div>

            {onResetShotList && (
              <button
                type="button"
                onClick={onResetShotList}
                title="Restaurar lista original Versa Visual"
                className="size-8 rounded-[8px] border border-[#ebebeb] dark:border-white/10 text-[#6a6a6a] hover:text-[#222222] dark:hover:text-white flex items-center justify-center transition-all hover:bg-[#f7f7f7]"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-4">
          {shotListGroups.map((group) => {
            const isGroupOpen = !!expandedGroups[group.id];
            const groupCompleted = group.items.filter((i) => i.isCompleted).length;

            return (
              <div
                key={group.id}
                className="rounded-[16px] border border-[#ebebeb] dark:border-white/10 overflow-hidden bg-[#fafafa] dark:bg-[#242426]"
              >
                {/* Group Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-[#f2f2f2] dark:hover:bg-[#2a2a2e] transition-colors"
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="size-2 rounded-full bg-[#ff385c]" />
                    <h4 className="font-bold text-sm sm:text-base text-[#222222] dark:text-white">
                      {group.name}
                    </h4>
                    {group.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff0f2] dark:bg-[#34181d] text-[#ff385c] border border-[#ff385c]/20">
                        {group.badge}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-[#1c1c1e] text-[#6a6a6a] dark:text-[#a0a0a0] border border-[#ebebeb] dark:border-white/10">
                      {groupCompleted}/{group.items.length}
                    </span>
                  </div>
                  <span className="text-[#6a6a6a]">
                    {isGroupOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </span>
                </button>

                {/* Group Items */}
                <AnimatePresence>
                  {isGroupOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 pt-1 space-y-2.5 bg-white dark:bg-[#1c1c1e] border-t border-[#ebebeb] dark:border-white/10"
                    >
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-[12px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            item.isCompleted 
                              ? "bg-[#f7f7f7] dark:bg-[#242426] border-[#ebebeb] opacity-75" 
                              : "bg-white dark:bg-[#1c1c1e] border-[#ebebeb] dark:border-white/10 shadow-xs"
                          }`}
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={() => onUpdateShotItem(group.id, item.id, { isCompleted: !item.isCompleted })}
                              className={`size-5 mt-0.5 rounded-[6px] flex items-center justify-center border transition-all active:scale-90 flex-shrink-0 ${
                                item.isCompleted
                                  ? "bg-[#ff385c] border-[#ff385c] text-white"
                                  : "border-[#c1c1c1] bg-white dark:bg-[#242426]"
                              }`}
                            >
                              {item.isCompleted && <Check className="size-3.5 stroke-[3]" />}
                            </button>

                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-xs sm:text-sm font-semibold leading-tight ${
                                  item.isCompleted ? "line-through text-[#6a6a6a]" : "text-[#222222] dark:text-white"
                                }`}>
                                  {item.title}
                                </span>
                                {item.priorityBadge && (
                                  <span className="text-[10px] font-bold text-[#c13515] bg-[#fff0f2] dark:bg-[#34181d] px-2 py-0.5 rounded-full border border-[#ff385c]/20">
                                    {item.priorityBadge}
                                  </span>
                                )}
                              </div>

                              {/* Inline names input */}
                              <input
                                type="text"
                                placeholder="Nomes das pessoas para chamar (ex: Avó Maria e Avô José)..."
                                value={item.names}
                                onChange={(e) => onUpdateShotItem(group.id, item.id, { names: e.target.value })}
                                className="w-full text-xs px-2.5 py-1 rounded-[6px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/10 text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center">
                            {/* Mandatory vs Optional chip toggle */}
                            <button
                              type="button"
                              onClick={() => onUpdateShotItem(group.id, item.id, { isMandatory: !item.isMandatory })}
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                                item.isMandatory
                                  ? "bg-[#fff0f2] dark:bg-[#34181d] text-[#ff385c] border-[#ff385c]/30 font-bold"
                                  : "bg-[#f2f2f2] dark:bg-[#242426] text-[#6a6a6a] dark:text-[#a0a0a0] border-transparent"
                              }`}
                            >
                              {item.isMandatory ? "★ Obrigatória" : "Se der tempo"}
                            </button>

                            {onDeleteShotItem && item.id.startsWith("custom-") && (
                              <button
                                type="button"
                                onClick={() => onDeleteShotItem(group.id, item.id)}
                                title="Excluir foto personalizada"
                                className="size-7 rounded-[6px] text-[#6a6a6a] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center transition-all"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add new shot item inline */}
                      <div className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Adicionar outra foto em ${group.name}...`}
                          value={newShotTitles[group.id] || ""}
                          onChange={(e) => setNewShotTitles({ ...newShotTitles, [group.id]: e.target.value })}
                          onKeyDown={(e) => e.key === "Enter" && handleAddShot(group.id)}
                          className="flex-1 h-9 px-3 text-xs rounded-[8px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/10 text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddShot(group.id)}
                          className="h-9 px-3.5 rounded-[8px] bg-[#222222] text-white hover:bg-[#ff385c] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 flex-shrink-0"
                        >
                          <Plus className="size-3.5" />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Campo de Alerta Sensível (Fricção Zero) */}
      <div className="p-6 sm:p-7 rounded-[20px] bg-[#fffbf6] dark:bg-[#211b15] border border-amber-300/40 dark:border-amber-500/20 shadow-airbnb-card space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#b45309] dark:text-amber-400 font-bold text-sm sm:text-base">
            <ShieldAlert className="size-4.5 text-[#b45309] dark:text-amber-400" />
            <span>Atenção Operacional & Restrições Sensíveis (Cerimonial & Foto)</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 px-2.5 py-0.5 rounded-full">
            Privado
          </span>
        </div>

        <p className="text-xs text-[#78350f] dark:text-amber-200/80 leading-relaxed">
          Informe particularidades da dinâmica familiar ou logística (ex: pais separados que não devem posar lado a lado, avós com mobilidade reduzida que precisam de assento prioritário, etc.).
        </p>

        <textarea
          rows={3}
          value={alertsText}
          onChange={(e) => setAlertsText(e.target.value)}
          placeholder="ex.: 'Atenção cerimonial: pais separados, evitar fotos lado a lado. Avó materna tem dificuldade para escadas...'"
          className="w-full p-3 rounded-[12px] bg-white dark:bg-[#1a140f] border border-amber-300/50 dark:border-amber-600/30 text-xs sm:text-sm text-[#222222] dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none leading-relaxed"
        />

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleSaveAlerts}
            className="h-9 px-4 rounded-[8px] bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
          >
            <Save className="size-3.5" />
            <span>Salvar Restrições</span>
          </button>
        </div>
      </div>

      {/* 5. Card de Fornecedores Chave com Ações Diretas */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
              <Phone className="size-3.5" />
              <span>Comunicação Direta com 1 Clique</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
              Fornecedores Chave & Localização
            </h3>
            <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
              Acesso rápido aos contatos do cerimonial, maquiagem, buffet e navegação para o Espaço Lux.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddVendorModal}
              className="h-8.5 px-3.5 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <Plus className="size-3.5" />
              <span>Adicionar Fornecedor</span>
            </button>

            <button
              type="button"
              onClick={onResetVendors}
              title="Restaurar catálogo padrão de fornecedores"
              className="size-8.5 rounded-[8px] border border-[#ebebeb] dark:border-white/10 text-[#6a6a6a] hover:text-[#222222] dark:hover:text-white flex items-center justify-center transition-all hover:bg-[#f7f7f7]"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="p-4 rounded-[14px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 flex flex-col justify-between space-y-3 relative group"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold text-[#ff385c] uppercase tracking-wider block">
                    {vendor.role}
                  </span>
                  <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleOpenEditVendorModal(vendor)}
                      title="Editar fornecedor"
                      className="size-6 rounded text-[#6a6a6a] hover:text-[#222222] dark:hover:text-white flex items-center justify-center hover:bg-white/80"
                    >
                      <Edit2 className="size-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteVendor(vendor.id)}
                      title="Excluir fornecedor"
                      className="size-6 rounded text-[#6a6a6a] hover:text-red-500 flex items-center justify-center hover:bg-white/80"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-sm text-[#222222] dark:text-white leading-snug mt-0.5">
                  {vendor.name}
                </h4>

                {vendor.address && (
                  <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] mt-1 flex items-center gap-1">
                    <MapPin className="size-3 text-[#ff385c] flex-shrink-0" />
                    <span className="truncate">{vendor.address}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#ebebeb] dark:border-white/10">
                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/${vendor.phone}?text=${encodeURIComponent(vendor.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-8 rounded-[8px] bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Waze / Maps if available */}
                {vendor.wazeUrl && (
                  <div className="grid grid-cols-2 gap-1.5">
                    <a
                      href={vendor.wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 rounded-[8px] bg-[#33ccff] hover:bg-[#28b8e6] text-[#00384d] text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                    >
                      <Navigation className="size-3" />
                      <span>Waze</span>
                    </a>
                    <a
                      href={vendor.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(vendor.address || vendor.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 rounded-[8px] border border-[#ebebeb] dark:border-white/15 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-all"
                    >
                      <MapPin className="size-3 text-[#ff385c]" />
                      <span>Maps</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Focal Point Custom Person Form */}
        <div className="pt-2">
          <form onSubmit={handleSaveFocalPointForm} className="p-4 rounded-[14px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#222222] dark:text-white flex items-center gap-1.5">
                <UserCheck className="size-4 text-[#ff385c]" />
                Ponto Focal de Apoio dos Noivos (Para filtrar fornecedores no Dia D)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="focal-name" className="text-xs font-semibold text-[#222222] dark:text-white mb-1 block">
                  Nome do Responsável
                </label>
                <input
                  id="focal-name"
                  placeholder="ex.: Irmã da Noiva / Madrinha..."
                  value={focalName}
                  onChange={(e) => setFocalName(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-white dark:bg-[#1c1c1e] border border-[#ebebeb] dark:border-white/10 rounded-[8px] focus:outline-none focus:border-[#ff385c]"
                />
              </div>
              <div>
                <label htmlFor="focal-phone" className="text-xs font-semibold text-[#222222] dark:text-white mb-1 block">
                  Telefone / WhatsApp
                </label>
                <input
                  id="focal-phone"
                  placeholder="(22) 99999-9999"
                  value={focalPhone}
                  onChange={(e) => setFocalPhone(e.target.value)}
                  className="w-full h-9 px-3 text-xs bg-white dark:bg-[#1c1c1e] border border-[#ebebeb] dark:border-white/10 rounded-[8px] focus:outline-none focus:border-[#ff385c]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-9 px-4 text-xs font-semibold bg-[#222222] hover:bg-[#ff385c] text-white rounded-[8px] flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <Save className="size-3.5" />
              <span>Salvar Ponto Focal</span>
            </button>
          </form>
        </div>
      </div>

      {/* Modal de Adição/Edição de Fornecedor */}
      <AnimatePresence>
        {isVendorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#1c1c1e] rounded-[20px] shadow-2xl border border-[#ebebeb] dark:border-white/10 overflow-hidden"
            >
              <div className="p-5 border-b border-[#ebebeb] dark:border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-base text-[#222222] dark:text-white">
                  {editingVendorId ? "Editar Fornecedor" : "Novo Fornecedor"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsVendorModalOpen(false)}
                  className="size-8 rounded-full flex items-center justify-center text-[#6a6a6a] hover:bg-[#f7f7f7]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleSaveVendor} className="p-5 space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#222222] dark:text-white mb-1 block">
                    Função / Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex.: Buffet & Gastronomia, Maquiagem..."
                    value={vendorForm.role}
                    onChange={(e) => setVendorForm({ ...vendorForm, role: e.target.value })}
                    className="w-full h-9 px-3 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-[#f7f7f7] dark:bg-[#242426] text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#222222] dark:text-white mb-1 block">
                    Nome da Empresa / Profissional *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex.: Chef Ana Gastronomia"
                    value={vendorForm.name}
                    onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-[#f7f7f7] dark:bg-[#242426] text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#222222] dark:text-white mb-1 block">
                    Telefone / WhatsApp (apenas números com DDD)
                  </label>
                  <input
                    type="text"
                    placeholder="5522999999999"
                    value={vendorForm.phone}
                    onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-[#f7f7f7] dark:bg-[#242426] text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#222222] dark:text-white mb-1 block">
                    Endereço / Local (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="ex.: Av. Atlântica, Rio das Ostras"
                    value={vendorForm.address}
                    onChange={(e) => setVendorForm({ ...vendorForm, address: e.target.value })}
                    className="w-full h-9 px-3 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-[#f7f7f7] dark:bg-[#242426] text-[#222222] dark:text-white focus:outline-none focus:border-[#ff385c]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#ebebeb] dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsVendorModalOpen(false)}
                    className="h-9 px-4 rounded-[8px] border border-[#ebebeb] text-[#6a6a6a] hover:bg-[#f7f7f7]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-4 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white font-semibold transition-colors"
                  >
                    {editingVendorId ? "Atualizar" : "Salvar Fornecedor"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
