import { PageHeader } from "./PageHeader";
import { useState } from "react";
import { 
  ShotListGroup, 
  ShotListItem,
  PHOTOGRAPHY_TIMELINE_BLOCKS
} from "@/app/data/shotListData";
import { PRE_WEDDING_ITEMS } from "@/app/data/preWeddingData";
import { 
  Camera, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  Trash2, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Church,
  Sun,
  PartyPopper,
  ArrowRight,
  Shield,
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
  Loader2
} from "lucide-react";
import { generateCeremonialAltarPdf } from "@/app/utils/pdfGenerator";
import { toast } from "sonner";

interface RoteiroPrdSectionProps {
  shotListGroups: ShotListGroup[];
  onUpdateShotItem: (groupId: string, itemId: string, updates: Partial<ShotListItem>) => void;
  onAddShotItem: (groupId: string, title: string) => void;
  onDeleteShotItem: (groupId: string, itemId: string) => void;
  onResetShotList: () => void;
  onNavigateToReferencias?: () => void;
  onOpenShareModal?: () => void;
}

const momentIcons: Record<string, typeof Camera> = {
  "time-prewedding": Camera,
  "time-makingof": Sparkles,
  "time-cerimonia": Church,
  "time-altar": Users,
  "time-couple": Sun,
  "time-festa": PartyPopper
};

const momentStatusBadges: Record<string, { label: string; className: string }> = {
  "time-prewedding": {
    label: "Agendado",
    className: "bg-surface-container dark:bg-surface-container-high text-on-surface-variant"
  },
  "time-makingof": {
    label: "Em foco",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
  },
  "time-cerimonia": {
    label: "Altar Solene",
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
  },
  "time-altar": {
    label: "Checklist Ativo",
    className: "bg-secondary-container/60 text-secondary dark:text-secondary-container"
  },
  "time-couple": {
    label: "Golden Hour",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
  },
  "time-festa": {
    label: "Comemoração",
    className: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20"
  }
};

// Tags de Contexto do Marco (Fidelidade ao PRD definitivo e Telas do Stitch)
const momentContextTags: Record<string, { label: string; icon: typeof MapPin }[]> = {
  "time-prewedding": [
    { label: "Bar Thunder & Costa Azul", icon: MapPin },
    { label: "Luz Suave de Fim de Tarde", icon: Sun },
    { label: "Direção Íntima & Leve", icon: Camera }
  ],
  "time-makingof": [
    { label: "Suíte Noiva Espaço Lux", icon: MapPin },
    { label: "Beleza Alinhada com Calma", icon: Clock },
    { label: "2 Fotógrafos Divididos", icon: Users }
  ],
  "time-cerimonia": [
    { label: "Altar Gramado ao Ar Livre", icon: Church },
    { label: "Luz Natural Sem Flash Evasivo", icon: Sparkles },
    { label: "2 Ângulos Sincronizados", icon: Users }
  ],
  "time-altar": [
    { label: "Prioridade Conforto: Avós", icon: Users },
    { label: "Fotos Ágeis e Leves", icon: Clock },
    { label: "Apoio do Cerimonial", icon: Shield }
  ],
  "time-couple": [
    { label: "Luz do Pôr do Sol", icon: Sun },
    { label: "Gramado & Mirante Costa Azul", icon: MapPin },
    { label: "Retratos a Dois", icon: Sparkles }
  ],
  "time-festa": [
    { label: "Salão Principal & Lounge", icon: PartyPopper },
    { label: "Brinde com Padrinhos", icon: Users },
    { label: "Pista Espontânea", icon: Camera }
  ]
};

export function RoteiroPrdSection({
  shotListGroups,
  onUpdateShotItem,
  onAddShotItem,
  onDeleteShotItem,
  onResetShotList,
  onNavigateToReferencias,
  onOpenShareModal
}: RoteiroPrdSectionProps) {
  const [newShotTitles, setNewShotTitles] = useState<Record<string, string>>({});
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<string[]>([]);
  const [isGeneratingAltarPdf, setIsGeneratingAltarPdf] = useState(false);

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroupIds((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleDownloadAltarPdf = async () => {
    try {
      setIsGeneratingAltarPdf(true);
      toast.loading("Gerando Resumo do Roteiro em PDF...", { id: "altar-pdf" });
      await generateCeremonialAltarPdf({ shotListGroups });
      toast.success("Resumo do Roteiro baixado com sucesso!", {
        id: "altar-pdf",
        description: "Documento pronto para impressão física ou WhatsApp do cerimonial."
      });
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível gerar o Resumo do Roteiro.", { id: "altar-pdf" });
    } finally {
      setIsGeneratingAltarPdf(false);
    }
  };

  const allItems = shotListGroups.flatMap((g) => g.items);
  const completedCount = allItems.filter((i) => i.isCompleted).length;
  const totalCount = allItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Real preview photos for inspiration sidebar card
  const previewPhoto1 = PRE_WEDDING_ITEMS[0];
  const previewPhoto2 = PRE_WEDDING_ITEMS[1];

  return (
    <div className="page-stack">
      {/* 1. Header do Roteiro Fotográfico (Taste-Design com Hierarquia Clara) */}
      <PageHeader eyebrow="Direção Fotográfica Versa Visual" title={<>Passos até o altar <span className="text-secondary font-semibold text-xl sm:text-2xl">(01 a 06)</span></>}
        description="Como orquestramos a fotografia no Pré-Wedding e no Casamento de Camila & Carlos: o que faremos em cada momento e como a equipe se divide, com tranquilidade, presença e conexão."
      >
          <span className="font-body-md text-xs text-on-surface font-semibold bg-surface-container-lowest dark:bg-card px-3.5 py-1.5 rounded-full border border-outline-variant/30 shadow-xs flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{completedCount} de {totalCount} fotos confirmadas</span>
          </span>
      </PageHeader>

      {/* 2. Grid de Conteúdo: 2 Colunas no Desktop (Stitch Screen 6 Reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna Principal: Momentos da Fotografia & Checklist Integrado (8 Colunas) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="editorial-section-title">
                Momentos da Cobertura & Dinâmica
              </h2>
              <p className="editorial-caption mt-1.5">
                Sem regras engessadas · Respeito à luz natural e à verdade de cada instante
              </p>
            </div>
            {progressPercent > 0 && (
              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {progressPercent}% do altar pronto
              </span>
            )}
          </div>

          <div className="space-y-6">
            {PHOTOGRAPHY_TIMELINE_BLOCKS.map((block) => {
              const IconComponent = momentIcons[block.id] || Camera;
              const status = momentStatusBadges[block.id] || { label: "Planejado", className: "bg-surface-container text-on-surface-variant" };

              return (
                <article
                  key={block.id}
                  className={`editorial-panel space-y-4 transition-all duration-300 hover:shadow-md ${
                    block.isHighlight
                      ? "ring-1 ring-amber-500/30 dark:ring-amber-500/40 bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-amber-50/20 dark:to-amber-950/10"
                      : ""
                  }`}
                >
                  {/* Header do Card com Ícone Circular, Título e Badge de Status */}
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-outline-variant/20 bg-surface-container-low dark:bg-surface-container text-on-surface shadow-2xs">
                      <IconComponent className="size-5 sm:size-6 text-secondary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="editorial-card-title">
                          {block.title}
                        </h3>
                        <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${status.className}`}>
                          {status.label}
                        </span>
                      </div>

                      {block.location && (
                        <div className="flex items-center gap-1.5 text-xs text-secondary mt-1">
                          <MapPin className="size-3 text-secondary shrink-0" />
                          <span className="truncate">{block.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags de Contexto do Marco (Fidelidade às Telas 5 e 6 do Stitch) */}
                  {momentContextTags[block.id] && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/15">
                      {momentContextTags[block.id].map((tag, idx) => {
                        const TagIcon = tag.icon;
                        return (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/25 bg-surface-container-low/70 dark:bg-surface-container/40 px-3 py-1 text-xs font-medium text-on-surface shadow-2xs"
                          >
                            <TagIcon className="size-3 text-secondary shrink-0" />
                            <span>{tag.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* O que será feito */}
                  <div className="space-y-1 pt-1 border-t border-outline-variant/15">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                      O que faremos neste momento:
                    </span>
                    <p className="editorial-body">
                      {block.whatWillBeDone}
                    </p>
                  </div>

                  {/* Como a equipe se divide (Card com Tom Acolhedor) */}
                  <div className="p-3.5 rounded-2xl bg-surface-container-low/70 dark:bg-surface-container/40 border border-outline-variant/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-secondary uppercase tracking-wider">
                      <Users className="size-3.5 text-secondary shrink-0" />
                      <span>Como a equipe se divide:</span>
                    </div>
                    <p className="editorial-body">
                      {block.teamDivision}
                    </p>
                  </div>

                  {/* Se for o momento de fotos protocolares (Altar), renderizar a Shot List Integrada */}
                  {block.phase === "altar" && (
                    <div className="mt-4 pt-4 border-t border-outline-variant/20 space-y-4">
                      {/* Barra de Progresso das Fotos de Altar */}
                      <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/50 border border-outline-variant/20 flex flex-col gap-2.5 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-on-surface flex items-center gap-1.5">
                            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Progresso das Fotos Protocolares</span>
                          </span>
                          <span className="font-extrabold text-on-surface">
                            {progressPercent}% <span className="text-secondary font-medium">({completedCount} de {totalCount} concluídas)</span>
                          </span>
                        </div>

                        <div className="w-full h-2.5 rounded-full bg-surface-container-high dark:bg-surface-container overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 flex-wrap gap-2">
                          <span>Prioridade absoluta: avós e mobilidade reduzida liberados logo após o sim.</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={handleDownloadAltarPdf}
                              disabled={isGeneratingAltarPdf}
                              className="text-primary hover:underline flex items-center gap-1 font-bold transition-colors disabled:opacity-50"
                              title="Baixar Ficha de Altar em PDF"
                            >
                              {isGeneratingAltarPdf ? (
                                <Loader2 className="size-3 animate-spin text-secondary" />
                              ) : (
                                <FileText className="size-3 text-secondary" />
                              )}
                              <span>Ficha de Altar (PDF)</span>
                            </button>
                            <button
                              type="button"
                              onClick={onResetShotList}
                              className="text-secondary hover:text-on-surface hover:underline flex items-center gap-1 font-semibold transition-colors"
                            >
                              <RotateCcw className="size-3" />
                              <span>Restaurar padrão</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Grupos Modulares da Shot List */}
                      <div className="space-y-4">
                        {shotListGroups.map((group) => {
                          const grpCompleted = group.items.filter((i) => i.isCompleted).length;
                          const isAllDone = group.items.length > 0 && grpCompleted === group.items.length;
                          const isCollapsed = collapsedGroupIds.includes(group.id);

                          return (
                            <div
                              key={group.id}
                              className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest dark:bg-card p-4 sm:p-5 shadow-xs flex flex-col gap-3 transition-all"
                            >
                              {/* Header do Grupo com Toggle de Expandir/Recolher */}
                              <button
                                type="button"
                                onClick={() => toggleGroupCollapse(group.id)}
                                className="w-full flex items-baseline justify-between border-b border-outline-variant/15 pb-2.5 gap-2 text-left group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg select-none"
                                aria-expanded={!isCollapsed}
                                aria-label={`${group.name}, ${grpCompleted} de ${group.items.length} fotos realizadas. ${isCollapsed ? "Toque para expandir" : "Toque para recolher"}`}
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm sm:text-base font-bold text-on-surface tracking-tight group-hover/btn:text-secondary transition-colors">
                                      {group.name}
                                    </h4>
                                    {isCollapsed ? (
                                      <ChevronDown className="size-4 text-secondary transition-transform shrink-0" />
                                    ) : (
                                      <ChevronUp className="size-4 text-secondary transition-transform shrink-0" />
                                    )}
                                  </div>
                                  <p className="text-[11px] text-secondary mt-0.5">
                                    {grpCompleted} de {group.items.length} fotos realizadas {isCollapsed && "· Toque para expandir"}
                                  </p>
                                </div>
                                {group.badge && (
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                                    isAllDone 
                                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                                      : "bg-surface-container dark:bg-surface-container-high text-on-surface-variant"
                                  }`}>
                                    {group.badge}
                                  </span>
                                )}
                              </button>

                              {/* Checklist Items e Adição (visíveis quando não recolhido) */}
                              {!isCollapsed && (
                                <>
                                  <div className="space-y-2">
                                    {group.items.map((item) => (
                                      <label
                                        key={item.id}
                                        className={`flex items-start justify-between gap-3 rounded-xl p-3 border transition-all cursor-pointer group/item select-none ${
                                          item.isCompleted
                                            ? "bg-surface-container-low/60 dark:bg-surface-container/30 border-outline-variant/15"
                                            : "bg-surface-container-lowest dark:bg-card border-outline-variant/20 hover:bg-surface-container-low/70 hover:border-outline-variant/40"
                                        }`}
                                      >
                                        <div className="flex items-start gap-3 min-w-0 flex-1">
                                          <input
                                            type="checkbox"
                                            checked={item.isCompleted}
                                            onChange={() =>
                                              onUpdateShotItem(group.id, item.id, {
                                                isCompleted: !item.isCompleted
                                              })
                                            }
                                            className="mt-0.5 size-4.5 rounded border-outline-variant/40 text-primary focus:ring-primary focus:ring-offset-1 cursor-pointer shrink-0"
                                          />
                                          <div className="min-w-0 flex-1">
                                            <p
                                              className={`font-body-md text-xs sm:text-[13px] leading-snug transition-colors ${
                                                item.isCompleted
                                                  ? "line-through text-on-surface-variant/50"
                                                  : "text-on-surface font-semibold"
                                              }`}
                                            >
                                              {item.title}
                                            </p>
                                            {item.names && (
                                              <p className="font-body-md text-[11px] text-on-surface-variant mt-0.5">
                                                {item.names}
                                              </p>
                                            )}
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                          {item.priorityBadge ? (
                                            <span className="text-[10px] font-semibold text-secondary bg-surface-container dark:bg-surface-container-high px-2 py-0.5 rounded-md">
                                              {item.priorityBadge}
                                            </span>
                                          ) : (
                                            <span className="text-[10px] font-medium text-secondary/80">
                                              Protocolo
                                            </span>
                                          )}

                                          {/* Delete custom item if created by user */}
                                          {item.id.startsWith("custom-") && (
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onDeleteShotItem(group.id, item.id);
                                              }}
                                              className="text-red-500 hover:text-red-700 opacity-80 sm:opacity-0 sm:group-hover/item:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40"
                                              title="Remover foto personalizada"
                                            >
                                              <Trash2 className="size-3.5" />
                                            </button>
                                          )}
                                        </div>
                                      </label>
                                    ))}
                                  </div>

                                  {/* Adicionar Foto Personalizada ao Grupo */}
                                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <input
                                      type="text"
                                      placeholder="Adicionar foto específica a este grupo..."
                                      value={newShotTitles[group.id] || ""}
                                      onChange={(e) =>
                                        setNewShotTitles((prev) => ({
                                          ...prev,
                                          [group.id]: e.target.value
                                        }))
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && newShotTitles[group.id]?.trim()) {
                                          e.preventDefault();
                                          onAddShotItem(group.id, newShotTitles[group.id].trim());
                                          setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                                        }
                                      }}
                                      className="min-w-0 flex-1 bg-surface-container-low dark:bg-surface-container text-xs text-on-surface placeholder:text-on-surface-variant/50 px-3.5 py-2 rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (newShotTitles[group.id]?.trim()) {
                                          onAddShotItem(group.id, newShotTitles[group.id].trim());
                                          setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                                        }
                                      }}
                                      className="px-3.5 py-2 bg-primary hover:opacity-90 text-on-primary text-xs rounded-xl font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                                    >
                                      <Plus className="size-3.5" />
                                      <span>Adicionar</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Coluna Lateral: Painel Operacional & Caderno de Inspirações (4 Colunas no Desktop) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Card 1: Caderno de Inspirações (Fiel ao Stitch Screen 6) */}
          <div className="editorial-panel space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="editorial-card-title">
                  Caderno de Inspirações
                </h3>
                <p className="editorial-caption mt-1.5">
                  Moodboard curado para paleta e iluminação
                </p>
              </div>
              {onNavigateToReferencias && (
                <button
                  type="button"
                  onClick={onNavigateToReferencias}
                  className="text-xs font-semibold text-secondary hover:text-on-surface hover:underline flex items-center gap-0.5"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="size-3" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Preview 1 */}
              {previewPhoto1 && (
                <div 
                  className="group relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container shadow-2xs cursor-pointer"
                  onClick={onNavigateToReferencias}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={previewPhoto1.imageUrl} 
                      alt={previewPhoto1.title} 
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest dark:bg-card">
                    <p className="text-xs font-bold text-on-surface truncate">{previewPhoto1.title}</p>
                    <p className="text-[10px] text-secondary mt-0.5">Costa Azul</p>
                  </div>
                </div>
              )}

              {/* Preview 2 */}
              {previewPhoto2 && (
                <div 
                  className="group relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container shadow-2xs cursor-pointer"
                  onClick={onNavigateToReferencias}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img 
                      src={previewPhoto2.imageUrl} 
                      alt={previewPhoto2.title} 
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest dark:bg-card">
                    <p className="text-xs font-bold text-on-surface truncate">{previewPhoto2.title}</p>
                    <p className="text-[10px] text-secondary mt-0.5">Luz Natural</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-[11px] text-secondary italic text-center pt-1 border-t border-outline-variant/15">
              "A beleza não reside na rigidez, mas na verdade de cada instante registrado com afeto."
            </p>
          </div>

          {/* Card 2: Divisão de Responsabilidades (Fiel ao Stitch Screen 6) */}
          <div className="editorial-panel space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="size-4.5 text-secondary" />
              <div>
                <h4 className="text-sm font-bold text-on-surface">Divisão de Ações</h4>
                <p className="text-xs text-secondary">Alinhamento de equipe e cerimonial</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/70 dark:bg-surface-container/40 border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-500"></span>
                  <span className="font-semibold text-on-surface">Noivos C&C</span>
                </div>
                <span className="font-bold text-on-surface">Fotos de Família & Cortejo</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/70 dark:bg-surface-container/40 border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary"></span>
                  <span className="font-semibold text-on-surface">Versa Visual</span>
                </div>
                <span className="font-bold text-on-surface">2 Fotógrafos Sincronizados</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/70 dark:bg-surface-container/40 border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-600"></span>
                  <span className="font-semibold text-on-surface">Cerimonial</span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadAltarPdf}
                  disabled={isGeneratingAltarPdf}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 text-xs disabled:opacity-50"
                  title="Baixar Resumo do Roteiro em PDF"
                >
                  {isGeneratingAltarPdf ? (
                    <Loader2 className="size-3 animate-spin text-emerald-600" />
                  ) : (
                    <FileText className="size-3 text-emerald-600" />
                  )}
                  <span>Resumo do Roteiro (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Alinhamento de Beleza & Retratos (Conforme PRD) */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 p-5 space-y-2.5">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-amber-600 dark:text-amber-400" />
              <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Alinhamento de Beleza & Retratos
              </h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              O momento de término da produção de beleza é combinado entre Camila e a equipe para permitir os retratos individuais desejados com calma e luz suave, sem imposição rígida de horários.
            </p>
            {onOpenShareModal && (
              <button
                type="button"
                onClick={onOpenShareModal}
                className="w-full mt-1 py-2 px-3 rounded-xl bg-surface-container-lowest dark:bg-card border border-outline-variant/30 hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Share2 className="size-3.5 text-secondary" />
                <span>Compartilhar com Cerimonial</span>
              </button>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
}
