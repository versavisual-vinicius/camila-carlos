import { useState } from "react";
import { 
  ShotListGroup, 
  ShotListItem, 
  SolarTimelineBlock,
  KeyVendor,
  DELIVERY_STAGES
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
  FileCheck
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
  const [activeSubTab, setActiveSubTab] = useState<"shotlist" | "solar" | "prd" | "entregas">("shotlist");
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
    toast.success("Alertas sensíveis atualizados com sucesso!");
  };

  const handleSaveFocal = () => {
    onSaveFocalPoint({ name: focalName, phone: focalPhone });
    toast.success("Ponto focal atualizado!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stitch Screen 3: PRD & Roteiro Header */}
      <section className="pt-2 pb-2 border-b border-outline-variant/30 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
            Protocolo Editorial Versa Visual
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface tracking-tight">
            Roteiro, Shot List & PRD
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDownloadCeremonialAltar}
              className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs flex items-center gap-1.5 transition-colors border border-outline-variant/30"
              title="Baixar Ficha de Altar do Cerimonial"
            >
              <FileCheck className="size-3.5 text-secondary" />
              <span>Ficha Altar</span>
            </button>
            <button
              type="button"
              onClick={onDownloadFullDossier}
              className="h-8 px-3 rounded-lg bg-primary text-on-primary font-label-md text-xs flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all active:scale-95"
              title="Baixar Dossiê Executivo Completo em PDF"
            >
              <Download className="size-3.5" />
              <span>Dossiê PDF</span>
            </button>
          </div>
        </div>
        <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-xl">
          Alinhamento milimétrico entre cerimonial, noivos e equipe fotográfica para blindar momentos cruciais e luz solar.
        </p>
      </section>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => setActiveSubTab("shotlist")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            activeSubTab === "shotlist"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span>Shot List do Altar</span>
          <span className="px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface text-[10px] font-bold">
            {completedCount}/{totalCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("solar")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            activeSubTab === "solar"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <Sun className="size-3.5 text-secondary" />
          <span>Linha do Tempo Solar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("entregas")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            activeSubTab === "entregas"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <Calendar className="size-3.5 text-secondary" />
          <span>Esteira de Entregas (6)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("prd")}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-xs flex items-center gap-1.5 flex-shrink-0 transition-all ${
            activeSubTab === "prd"
              ? "bg-primary text-on-primary font-semibold shadow-xs"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <Sparkles className="size-3.5 text-secondary" />
          <span>Visão PRD Atelier</span>
        </button>
      </div>

      {/* SUBTAB 1: SHOT LIST */}
      {activeSubTab === "shotlist" && (
        <div className="flex flex-col gap-5">
          {/* Progress Banner */}
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold">
                Progresso das Fotos Protocoladas
              </span>
              <span className="font-bold text-on-surface">
                {progressPercent}% concluído ({completedCount} de {totalCount})
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-on-surface-variant italic">
                Prioridade 01: Liberação imediata de avós e convidados com mobilidade reduzida em até 6 minutos.
              </p>
              <button
                type="button"
                onClick={onResetShotList}
                className="text-[11px] text-secondary hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
              >
                <RotateCcw className="size-3" />
                <span>Restaurar Padrão Oficial</span>
              </button>
            </div>
          </div>

          {/* Groups list */}
          <div className="space-y-4">
            {shotListGroups.map((group) => {
              const grpCompleted = group.items.filter((i) => i.isCompleted).length;
              return (
                <div
                  key={group.id}
                  className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 shadow-xs flex flex-col gap-3"
                >
                  <div className="flex items-baseline justify-between border-b border-outline-variant/20 pb-2">
                    <div>
                      <h3 className="font-headline-sm text-base text-on-surface">
                        {group.name}
                      </h3>
                      <p className="font-body-md text-xs text-on-surface-variant">
                        Estimativa: {group.estimatedMinutes} min · {group.targetPhase}
                      </p>
                    </div>
                    {group.badge && (
                      <span className="px-2 py-0.5 rounded font-label-sm text-[10px] bg-secondary-container text-on-secondary-container uppercase font-semibold">
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
                        <label className="flex items-start gap-2.5 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() =>
                              onUpdateShotItem(group.id, item.id, {
                                isCompleted: !item.isCompleted
                              })
                            }
                            className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                          />
                          <div className="flex flex-col">
                            <span
                              className={`text-xs font-medium transition-colors ${
                                item.isCompleted
                                  ? "line-through text-on-surface-variant/60"
                                  : "text-on-surface"
                              }`}
                            >
                              {item.title}
                            </span>
                            {item.names && (
                              <span className="text-[11px] text-on-surface-variant">
                                {item.names}
                              </span>
                            )}
                            {item.priorityBadge && (
                              <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider mt-0.5">
                                ★ {item.priorityBadge}
                              </span>
                            )}
                          </div>
                        </label>

                        {item.id.startsWith("custom-") && (
                          <button
                            type="button"
                            onClick={() => onDeleteShotItem(group.id, item.id)}
                            className="text-error opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
                            title="Remover foto personalizada"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add item to group */}
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Adicionar foto específica a este bloco..."
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
                      className="flex-1 bg-surface-container text-xs text-on-surface placeholder:text-secondary/60 px-3 py-1.5 rounded-lg border border-outline-variant/30 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newShotTitles[group.id]?.trim()) {
                          onAddShotItem(group.id, newShotTitles[group.id].trim());
                          setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                        }
                      }}
                      className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-lg transition-colors font-medium flex items-center gap-1"
                    >
                      <Plus className="size-3" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sensitive Alerts & Focal Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {/* Sensitive alerts */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-secondary">
                  <AlertTriangle className="size-4" />
                  <span className="font-label-sm text-[11px] uppercase tracking-wider font-semibold">
                    Alertas Operacionais Sensíveis
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isAlertsEditing) handleSaveAlerts();
                    else setIsAlertsEditing(true);
                  }}
                  className="text-xs text-secondary underline"
                >
                  {isAlertsEditing ? "Salvar" : "Editar"}
                </button>
              </div>

              {isAlertsEditing ? (
                <textarea
                  value={editingAlerts}
                  onChange={(e) => setEditingAlerts(e.target.value)}
                  rows={3}
                  className="w-full bg-surface text-xs text-on-surface p-2 rounded border border-outline-variant/40 focus:outline-none resize-none"
                />
              ) : (
                <p className="font-body-md text-xs text-on-surface-variant italic leading-relaxed">
                  "{sensitiveAlerts}"
                </p>
              )}
            </div>

            {/* Focal Point Contact */}
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-secondary">
                <UserCheck className="size-4" />
                <span className="font-label-sm text-[11px] uppercase tracking-wider font-semibold">
                  Ponto Focal de Coordenação
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Pessoa autorizada a organizar padrinhos e família no momento das fotos protocolares.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Nome do ponto focal"
                  value={focalName}
                  onChange={(e) => setFocalName(e.target.value)}
                  onBlur={handleSaveFocal}
                  className="bg-surface text-xs text-on-surface px-2.5 py-1.5 rounded border border-outline-variant/30 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="WhatsApp / Telefone"
                  value={focalPhone}
                  onChange={(e) => setFocalPhone(e.target.value)}
                  onBlur={handleSaveFocal}
                  className="bg-surface text-xs text-on-surface px-2.5 py-1.5 rounded border border-outline-variant/30 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: SOLAR TIMELINE */}
      {activeSubTab === "solar" && (
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-2">
            <h3 className="font-headline-sm text-base text-on-surface flex items-center gap-2">
              <Sun className="size-4 text-secondary" />
              <span>Janela de Iluminação & Golden Hour Blindada</span>
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              O pôr do sol em Rio das Ostras acontece às <strong>17:28</strong>. A cerimônia deve iniciar impreterivelmente às <strong>16:00</strong> para garantir luz dourada e natural nos votos, troca de alianças e retratos do casal.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-4">
              <div className="text-center min-w-[70px] border-r border-outline-variant/20 pr-3">
                <span className="font-bold text-xs text-on-surface block">13:30 - 15:30</span>
                <span className="text-[10px] uppercase tracking-wider text-secondary">Manhã/Tarde</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-sm text-on-surface">Making-of da Noiva & Detalhes</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Suíte da noiva no Espaço Lux: vestido no cabide, sapatos, alianças, perfume e finalização do véu.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 border-2 border-secondary/40 shadow-xs flex items-start gap-4">
              <div className="text-center min-w-[70px] border-r border-outline-variant/20 pr-3">
                <span className="font-bold text-xs text-secondary block">16:00 - 16:50</span>
                <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">Cerimônia</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-sm text-on-surface">Cortejo & Celebração ao Ar Livre</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Luz suave filtrada nas jabuticabeiras do altar. Entrada emocionante, votos e troca de alianças.
                </p>
              </div>
            </div>

            <div className="bg-secondary-container/60 rounded-xl p-4 border border-secondary/30 flex items-start gap-4">
              <div className="text-center min-w-[70px] border-r border-secondary/30 pr-3">
                <span className="font-bold text-xs text-on-secondary-container block">16:50 - 17:15</span>
                <span className="text-[10px] uppercase tracking-wider text-on-secondary-container font-bold">Protocolar</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-sm text-on-surface">Fotos de Altar com Família & Avós</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Execução rigorosa dos blocos 01 a 04. Ponto focal organiza convidados enquanto a luz solar permanece perfeita.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-4">
              <div className="text-center min-w-[70px] border-r border-outline-variant/20 pr-3">
                <span className="font-bold text-xs text-on-surface block">17:15 - 17:40</span>
                <span className="text-[10px] uppercase tracking-wider text-secondary font-bold">Golden Hour</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-sm text-on-surface">Retratos a Dois de Camila & Carlos</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Momento exclusivo do casal na grama e deck do Espaço Lux, capturando a transição dourada do céu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: DELIVERY STAGES */}
      {activeSubTab === "entregas" && (
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-1">
            <h3 className="font-headline-sm text-base text-on-surface">
              Esteira de Entregas Oficiais Versa Visual
            </h3>
            <p className="text-xs text-on-surface-variant">
              Cronograma de pós-produção contratual com prazos e entregas garantidas.
            </p>
          </div>

          <div className="space-y-3">
            {DELIVERY_STAGES.map((stg) => (
              <div
                key={stg.id}
                className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-3.5 shadow-xs"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  stg.status === "completed"
                    ? "bg-primary text-on-primary"
                    : stg.status === "scheduled"
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-surface-container text-on-surface-variant"
                }`}>
                  {stg.status === "completed" ? <Check className="size-4" /> : stg.stepNumber}
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-headline-sm text-sm text-on-surface">{stg.title}</h4>
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary">
                      {stg.dateInfo}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {stg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: PRD ATELIER NOIVA */}
      {activeSubTab === "prd" && (
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 flex flex-col gap-4 shadow-xs">
          <div className="border-b border-outline-variant/20 pb-3 flex items-center justify-between">
            <div>
              <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-semibold">
                Documento de Produto & Requisitos
              </span>
              <h2 className="font-headline-md text-xl text-on-surface">
                PRD — Atelier Noiva: Curadoria Visual & Gestão Estética
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenManual}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="size-3.5" />
              <span>Manual da Noiva</span>
            </button>
          </div>

          <div className="prose prose-sm max-w-none text-on-surface-variant text-xs space-y-3 leading-relaxed">
            <p>
              <strong>Atelier Noiva</strong> é uma plataforma mobile de curadoria visual e direção de arte para noivas contemporâneas. Inspirada na elegância minimalista e na arquitetura de informação de ferramentas de ponta como <em>Cosmos</em> e <em>Are.na</em>, a aplicação transforma o caos de referências soltas em um dossiê estético estruturado, conectado diretamente a fornecedores, orçamentos e locais.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-surface p-3.5 rounded-lg border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-1">Pilares de Experiência</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Naturalidade:</strong> Condução sutil sem poses forçadas.</li>
                  <li><strong>Emoção:</strong> Preservação do afeto espontâneo.</li>
                  <li><strong>Elegância:</strong> Tipografia editorial e respiro visual.</li>
                  <li><strong>Presença:</strong> Permissão total para viver o momento.</li>
                </ul>
              </div>

              <div className="bg-surface p-3.5 rounded-lg border border-outline-variant/30">
                <h4 className="font-bold text-on-surface mb-1">Entregáveis Oficiais</h4>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Dossiê Executivo completo em PDF para o cerimonial.</li>
                  <li>Ficha de Altar com horários e protocolo de avós.</li>
                  <li>Prévias em alta resolução em 48h pós-evento.</li>
                  <li>Diagramação de álbum de casamento em fine art.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
