import { useState } from "react";
import { motion } from "motion/react";
import { 
  ShotListGroup, 
  ShotListItem, 
  SolarTimelineBlock,
  KeyVendor,
  DELIVERY_STAGES,
  SOLAR_TIMELINE_BLOCKS
} from "@/app/data/shotListData";
import { 
  FileText, 
  Download, 
  Clock, 
  Sun, 
  AlertTriangle, 
  UserCheck, 
  Phone, 
  Plus, 
  Check, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Compass, 
  FileCheck,
  Camera,
  MapPin,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";

interface RoteiroPrdSectionProps {
  shotListGroups: ShotListGroup[];
  onUpdateShotItem: (groupId: string, itemId: string, updates: Partial<ShotListItem>) => void;
  onAddShotItem: (groupId: string, title: string) => void;
  onDeleteShotItem: (groupId: string, itemId: string) => void;
  onResetShotList: () => void;
  sensitiveAlerts: string;
  onSaveSensitiveAlerts: (text: string) => void;
  focalPointData: { name: string; phone: string };
  onSaveFocalPoint: (data: { name: string; phone: string }) => void;
  onDownloadFullDossier: () => void;
  onDownloadCeremonialAltar: () => void;
  onOpenManual: () => void;
}

export function RoteiroPrdSection({
  shotListGroups,
  onUpdateShotItem,
  onAddShotItem,
  onDeleteShotItem,
  onResetShotList,
  sensitiveAlerts,
  onSaveSensitiveAlerts,
  focalPointData,
  onSaveFocalPoint,
  onDownloadFullDossier,
  onDownloadCeremonialAltar,
  onOpenManual
}: RoteiroPrdSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"timeline" | "entregas" | "prd">("timeline");
  const [newShotTitles, setNewShotTitles] = useState<Record<string, string>>({});
  const [editingAlerts, setEditingAlerts] = useState(sensitiveAlerts);
  const [isAlertsEditing, setIsAlertsEditing] = useState(false);
  const [focalName, setFocalName] = useState(focalPointData.name);
  const [focalPhone, setFocalPhone] = useState(focalPointData.phone);

  const allItems = shotListGroups.flatMap((g) => g.items);
  const completedCount = allItems.filter((i) => i.isCompleted).length;
  const totalCount = allItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSaveAlerts = () => {
    onSaveSensitiveAlerts(editingAlerts);
    setIsAlertsEditing(false);
    toast.success("Alertas operacionais atualizados com sucesso!");
  };

  const handleSaveFocal = () => {
    onSaveFocalPoint({ name: focalName, phone: focalPhone });
    toast.success("Ponto focal de coordenação salvo!");
  };

  const subTabOptions = [
    { value: "timeline" as const, label: "Timeline & Shot List", badge: `${completedCount}/${totalCount}` },
    { value: "entregas" as const, label: "Esteira de Entregas", badge: "6 etapas" },
    { value: "prd" as const, label: "Diretrizes & PRD", badge: null }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Editorial (Estilo Airbnb / Versa Visual) */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-medium">
              Protocolo Operacional Versa Visual
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Roteiro, Shot List & PRD
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-xl">
            Alinhamento milimétrico entre cerimonial, noivos e equipe fotográfica para blindar momentos cruciais e luz solar.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onDownloadCeremonialAltar}
            className="h-9 px-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-md text-xs font-medium flex items-center gap-1.5 transition-colors border border-outline-variant/30 shadow-xs"
            title="Baixar Ficha de Altar para o Cerimonial"
          >
            <FileCheck className="size-3.5 text-secondary" />
            <span>Ficha Altar PDF</span>
          </button>

          <button
            type="button"
            onClick={onDownloadFullDossier}
            className="h-9 px-4 rounded-xl bg-primary text-on-primary font-body-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all active:scale-95"
            title="Baixar Dossiê Completo de Casamento em PDF"
          >
            <Download className="size-3.5" />
            <span>Dossiê Completo</span>
          </button>
        </div>
      </section>

      {/* 2. Filtros com Pílula Deslizante (Tubelight Sliding Pill) */}
      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 py-1 flex items-center no-scrollbar">
        <div className="bg-surface-container/70 dark:bg-surface-container/40 backdrop-blur-md p-1 rounded-full border border-outline-variant/20 inline-flex items-center gap-1">
          {subTabOptions.map((tab) => {
            const isActive = activeSubTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveSubTab(tab.value)}
                className={`relative px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-on-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="roteiro-subtab-active"
                    className="absolute inset-0 bg-primary rounded-full shadow-[0_0_12px_rgba(108,91,77,0.3)] -z-0"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  >
                    <span className="w-3.5 h-0.5 bg-secondary rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_6px_var(--secondary)]" />
                  </motion.span>
                )}

                <span className="relative z-10">{tab.label}</span>
                {tab.badge && (
                  <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                    isActive ? "bg-surface-container text-on-surface" : "bg-surface-container-high text-on-surface-variant"
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB 1: TIMELINE SOLAR INTEGRADA COM SHOT LIST */}
      {activeSubTab === "timeline" && (
        <div className="flex flex-col gap-6">
          {/* Progress Banner */}
          <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-body-md text-secondary font-semibold">
                Progresso das Fotos Protocoladas
              </span>
              <span className="font-semibold text-on-surface">
                {progressPercent}% concluído ({completedCount} de {totalCount})
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-1 text-xs">
              <p className="text-on-surface/80 leading-tight">
                <strong>Prioridade 01:</strong> Liberação imediata de avós e mobilidade reduzida em até 6 minutos no altar.
              </p>
              <button
                type="button"
                onClick={onResetShotList}
                className="text-secondary hover:underline flex items-center gap-1 font-medium self-start sm:self-auto shrink-0"
              >
                <RotateCcw className="size-3" />
                <span>Restaurar Padrão Oficial</span>
              </button>
            </div>
          </div>

          {/* Sensitive Alerts & Focal Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sensitive alerts */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-secondary">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span className="font-body-md text-xs font-semibold text-on-surface">
                    Alertas Operacionais Sensíveis
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isAlertsEditing) handleSaveAlerts();
                    else setIsAlertsEditing(true);
                  }}
                  className="text-xs text-secondary hover:text-on-surface underline font-medium transition-colors"
                >
                  {isAlertsEditing ? "Salvar" : "Editar"}
                </button>
              </div>

              {isAlertsEditing ? (
                <textarea
                  value={editingAlerts}
                  onChange={(e) => setEditingAlerts(e.target.value)}
                  rows={3}
                  className="w-full bg-surface text-xs text-on-surface p-2.5 rounded-xl border border-outline-variant/40 focus:outline-none resize-none leading-relaxed mt-1"
                />
              ) : (
                <p className="font-body-md text-xs text-on-surface/85 leading-relaxed pt-1">
                  "{sensitiveAlerts}"
                </p>
              )}
            </div>

            {/* Focal Point Contact */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2 shadow-xs">
              <div className="flex items-center gap-2 text-secondary">
                <UserCheck className="size-4 shrink-0" />
                <span className="font-body-md text-xs font-semibold text-on-surface">
                  Ponto Focal de Coordenação
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant">
                Pessoa autorizada a reunir padrinhos e família no momento das fotos protocolares.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Nome do ponto focal"
                  value={focalName}
                  onChange={(e) => setFocalName(e.target.value)}
                  onBlur={handleSaveFocal}
                  className="bg-surface text-xs text-on-surface px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="WhatsApp / Telefone"
                  value={focalPhone}
                  onChange={(e) => setFocalPhone(e.target.value)}
                  onBlur={handleSaveFocal}
                  className="bg-surface text-xs text-on-surface px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Integrated Solar Timeline & Shot List Modules */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold flex items-center gap-2">
                <Clock className="size-4 text-secondary" />
                <span>Cronograma Solar & Blocos de Fotos</span>
              </h2>
              <span className="font-body-md text-xs text-on-surface-variant">
                Pôr do sol estimado às 17:28
              </span>
            </div>

            {/* Bloco 1: Making Of */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-outline-variant/20 gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface">
                      13:00 — 15:30
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="font-body-md text-xs text-secondary font-medium">
                      Espaço Lux · Suíte Master
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base text-on-surface font-semibold pt-0.5">
                    Making-of da Noiva, Noivo & Detalhes Afetivos
                  </h3>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface-variant">
                  Luz Difusa Suave
                </span>
              </div>
              <p className="font-body-md text-xs text-on-surface/80 leading-relaxed">
                Vestido no cabide, alianças, convite, sapatos e buquê fresco. Retratos solo de Camila pronta e brinde descontraído de Carlos com os padrinhos.
              </p>
            </div>

            {/* Bloco 2: Trava Técnica & Cortejo */}
            <div className="bg-secondary-container/30 rounded-2xl p-4 sm:p-5 border border-secondary/30 shadow-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container">
                  16:00 — 16:50
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-body-md text-xs text-secondary font-medium">
                  Altar ao Ar Livre sob Jabuticabeiras
                </span>
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                Cortejo, Cerimônia & Troca de Alianças
              </h3>
              <p className="font-body-md text-xs text-on-surface/85 leading-relaxed">
                Início impreterível para blindar a luz solar natural. Entrada emocionante, votos do casal e primeiro beijo sob luz filtrada das árvores.
              </p>
            </div>

            {/* Bloco 3: Fotos Protocolares de Altar (Shot List Groups) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-on-primary">
                      16:50 — 17:15
                    </span>
                    <span className="font-body-md text-xs text-secondary font-medium">
                      25 minutos cronometrados
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold mt-1">
                    Fotos Protocolares de Altar (Família, Avós & Padrinhos)
                  </h3>
                </div>
                <span className="font-body-md text-xs text-secondary font-medium">
                  Prioridade Máxima
                </span>
              </div>

              {shotListGroups.map((group) => {
                const grpCompleted = group.items.filter((i) => i.isCompleted).length;
                return (
                  <div
                    key={group.id}
                    className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3.5"
                  >
                    <div className="flex items-baseline justify-between border-b border-outline-variant/20 pb-2.5 gap-2">
                      <div>
                        <h4 className="font-headline-sm text-sm sm:text-base text-on-surface font-semibold">
                          {group.name}
                        </h4>
                        <p className="font-body-md text-xs text-on-surface-variant">
                          Estimativa: {group.estimatedMinutes} min · {group.targetPhase} ({grpCompleted} de {group.items.length} concluídas)
                        </p>
                      </div>

                      {group.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-on-surface">
                          {group.badge}
                        </span>
                      )}
                    </div>

                    {/* Items in group */}
                    <div className="divide-y divide-outline-variant/15">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-2.5 flex items-start justify-between gap-3 group/item"
                        >
                          <label className="flex items-start gap-3 cursor-pointer flex-1">
                            <input
                              type="checkbox"
                              checked={item.isCompleted}
                              onChange={() =>
                                onUpdateShotItem(group.id, item.id, {
                                  isCompleted: !item.isCompleted
                                })
                              }
                              className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <span
                                className={`font-body-md text-xs sm:text-[13px] block leading-snug ${
                                  item.isCompleted
                                    ? "line-through text-on-surface-variant/60"
                                    : "text-on-surface font-medium"
                                }`}
                              >
                                {item.title}
                              </span>
                              <span className="font-body-md text-xs text-on-surface-variant/80 block mt-0.5">
                                {item.names}
                              </span>
                            </div>
                          </label>

                          {item.priorityBadge && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] bg-secondary-container/80 text-on-secondary-container font-medium">
                              {item.priorityBadge}
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => onDeleteShotItem(group.id, item.id)}
                            className="text-error/70 hover:text-error opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
                            title="Remover foto"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add item to group */}
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Adicionar foto específica a este momento..."
                        value={newShotTitles[group.id] || ""}
                        onChange={(e) =>
                          setNewShotTitles((prev) => ({
                            ...prev,
                            [group.id]: e.target.value
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newShotTitles[group.id]?.trim()) {
                            onAddShotItem(group.id, newShotTitles[group.id].trim());
                            setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                          }
                        }}
                        className="flex-1 bg-surface text-xs text-on-surface placeholder:text-on-surface-variant/60 px-3 py-2 rounded-xl border border-outline-variant/30 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newShotTitles[group.id]?.trim()) {
                            onAddShotItem(group.id, newShotTitles[group.id].trim());
                            setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                          }
                        }}
                        className="px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-xl transition-colors font-medium flex items-center gap-1.5"
                      >
                        <Plus className="size-3.5" />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bloco 4: Golden Hour Retratos */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border-2 border-secondary/40 shadow-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-on-secondary">
                  17:15 — 17:40
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-body-md text-xs text-secondary font-semibold">
                  Golden Hour & Falésias Costa Azul
                </span>
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                Retratos a Dois de Camila & Carlos
              </h3>
              <p className="font-body-md text-xs text-on-surface/85 leading-relaxed">
                Momento exclusivo do casal na grama e mirante costeiro. Transição para o pôr do sol astronômico às 17:28 com luz cinematográfica.
              </p>
            </div>

            {/* Bloco 5: Festa & Celebração */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface">
                  18:00 — 01:00
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-body-md text-xs text-secondary font-medium">
                  Salão & Área Lounge
                </span>
              </div>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                Recepção, Brinde, Jantar & Pista de Dança
              </h3>
              <p className="font-body-md text-xs text-on-surface/80 leading-relaxed">
                Abertura da pista com coreografia dos noivos, brinde com padrinhos, buquê e fotos espontâneas dos convidados na festa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: DELIVERY STAGES */}
      {activeSubTab === "entregas" && (
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-1 shadow-xs">
            <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold">
              Esteira de Entregas Oficiais Versa Visual
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-on-surface/80">
              Cronograma de pós-produção contratual com prazos e entregas garantidas.
            </p>
          </div>

          <div className="space-y-3">
            {DELIVERY_STAGES.map((stg) => (
              <div
                key={stg.id}
                className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex items-start gap-3.5 shadow-xs"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  stg.status === "completed"
                    ? "bg-primary text-on-primary"
                    : stg.status === "scheduled"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container text-on-surface-variant"
                }`}>
                  {stg.status === "completed" ? <Check className="size-4" /> : stg.stepNumber}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-headline-sm text-sm sm:text-base text-on-surface font-semibold">{stg.title}</h4>
                    <span className="font-body-md text-xs text-secondary font-medium">
                      {stg.dateInfo}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface/80 mt-1 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PRD ATELIER NOIVA */}
      {activeSubTab === "prd" && (
        <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-outline-variant/20 flex flex-col gap-5 shadow-xs">
          <div className="border-b border-outline-variant/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-body-md text-xs text-secondary font-semibold block">
                Documento de Produto & Requisitos
              </span>
              <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-semibold mt-0.5">
                PRD — Atelier Noiva: Curadoria Visual & Gestão Estética
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenManual}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface flex items-center gap-1.5 transition-colors border border-outline-variant/30 shrink-0 self-start sm:self-auto"
            >
              <BookOpen className="size-3.5" />
              <span>Manual da Noiva</span>
            </button>
          </div>

          <div className="text-on-surface/85 text-xs sm:text-sm space-y-4 leading-relaxed font-body-md">
            <p>
              <strong>Atelier Noiva</strong> é a plataforma de curadoria visual e direção de arte para casamentos contemporâneos da Versa Visual. A aplicação transforma o caos de referências soltas em um dossiê estético estruturado, conectado diretamente a fornecedores, orçamentos, locais e roteiro do cerimonial.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface-container/60 p-4 rounded-xl border border-outline-variant/20 space-y-2">
                <h4 className="font-headline-sm text-sm text-on-surface font-semibold flex items-center gap-1.5">
                  <Sparkles className="size-4 text-secondary" />
                  <span>Pilares de Experiência</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-on-surface/80">
                  <li><strong>Naturalidade:</strong> Condução sutil sem poses forçadas.</li>
                  <li><strong>Emoção:</strong> Preservação do afeto espontâneo do casal.</li>
                  <li><strong>Elegância:</strong> Tipografia editorial e respiro visual.</li>
                  <li><strong>Presença:</strong> Permissão total para viver o momento sem ansiedade fotográfica.</li>
                </ul>
              </div>

              <div className="bg-surface-container/60 p-4 rounded-xl border border-outline-variant/20 space-y-2">
                <h4 className="font-headline-sm text-sm text-on-surface font-semibold flex items-center gap-1.5">
                  <FileText className="size-4 text-secondary" />
                  <span>Entregáveis Oficiais</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-on-surface/80">
                  <li>Dossiê Executivo completo em PDF para a assessoria.</li>
                  <li>Ficha de Altar com horários e protocolo de avós em até 6 min.</li>
                  <li>Prévias em alta resolução em 48h pós-evento.</li>
                  <li>Diagramação de álbum de casamento em fine art com papéis nobres.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
