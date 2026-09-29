import { useState } from "react";
import { 
  ShotListGroup, 
  ShotListItem,
  PHOTOGRAPHY_TIMELINE_BLOCKS
} from "@/app/data/shotListData";
import { 
  Camera, 
  Sparkles, 
  Plus, 
  RotateCcw, 
  Trash2, 
  Users,
  Clock,
  MapPin,
  CheckCircle2
} from "lucide-react";

interface RoteiroPrdSectionProps {
  shotListGroups: ShotListGroup[];
  onUpdateShotItem: (groupId: string, itemId: string, updates: Partial<ShotListItem>) => void;
  onAddShotItem: (groupId: string, title: string) => void;
  onDeleteShotItem: (groupId: string, itemId: string) => void;
  onResetShotList: () => void;
}

export function RoteiroPrdSection({
  shotListGroups,
  onUpdateShotItem,
  onAddShotItem,
  onDeleteShotItem,
  onResetShotList
}: RoteiroPrdSectionProps) {
  const [newShotTitles, setNewShotTitles] = useState<Record<string, string>>({});

  const allItems = shotListGroups.flatMap((g) => g.items);
  const completedCount = allItems.filter((i) => i.isCompleted).length;
  const totalCount = allItems.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header do Roteiro Fotográfico */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="font-body-md text-xs text-secondary font-medium">
              Direção Fotográfica Versa Visual
            </span>
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Roteiro da Fotografia
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-2xl">
            Como orquestramos a fotografia no Pré-Wedding e no Casamento de vocês: o que faremos em cada momento e como a equipe se divide, com tranquilidade, presença e conexão.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-body-md text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/20 font-medium">
            {completedCount} de {totalCount} fotos protocolares
          </span>
        </div>
      </section>

      {/* 2. Cronograma da Fotografia & Divisão de Equipe (Pré-Wedding + Casamento) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold flex items-center gap-2">
            <Camera className="size-4.5 text-secondary" />
            <span>Dinâmica dos Momentos & Cobertura</span>
          </h2>
          <span className="text-xs text-on-surface-variant hidden sm:inline">
            Sem regras engessadas · Presença e conexão
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {PHOTOGRAPHY_TIMELINE_BLOCKS.map((block) => (
            <article
              key={block.id}
              className={`rounded-2xl p-5 border transition-all duration-300 shadow-xs flex flex-col gap-3.5 ${
                block.isHighlight
                  ? "bg-secondary-container/20 border-secondary/40 ring-1 ring-secondary/20"
                  : "bg-surface-container-low border-outline-variant/20"
              }`}
            >
              {/* Header do Bloco */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-outline-variant/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <h3 className="font-headline-sm text-base sm:text-lg text-on-surface font-semibold">
                    {block.title}
                  </h3>
                </div>
                {block.location && (
                  <span className="font-body-md text-xs text-secondary flex items-center gap-1.5">
                    <MapPin className="size-3 text-secondary shrink-0" />
                    <span>{block.location}</span>
                  </span>
                )}
              </div>

              {/* O que será feito */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block">
                  O que será feito:
                </span>
                <p className="font-body-md text-xs sm:text-[13px] text-on-surface/85 leading-relaxed">
                  {block.whatWillBeDone}
                </p>
              </div>

              {/* Como a equipe se divide */}
              <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/20 space-y-1">
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="size-3 text-secondary" />
                  <span>Como a equipe se divide:</span>
                </span>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  {block.teamDivision}
                </p>
              </div>

              {/* Se for o momento de altar, renderizar a Shot List interativa diretamente aqui */}
              {block.phase === "altar" && (
                <div className="mt-3 pt-4 border-t border-outline-variant/20 space-y-4">
                  {/* Barra de Progresso das Fotos de Altar */}
                  <div className="p-3.5 rounded-xl bg-surface-container/80 border border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-on-surface flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-secondary" />
                        <span>Progresso das Fotos Protocolares</span>
                      </span>
                      <span className="font-semibold text-secondary">
                        {progressPercent}% ({completedCount} de {totalCount})
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-0.5">
                      <span>Prioridade: avós e mobilidade reduzida liberados primeiro.</span>
                      <button
                        type="button"
                        onClick={onResetShotList}
                        className="text-secondary hover:underline flex items-center gap-1 font-medium"
                      >
                        <RotateCcw className="size-3" />
                        <span>Restaurar padrão</span>
                      </button>
                    </div>
                  </div>

                  {/* Grupos Modulares da Shot List */}
                  <div className="space-y-3">
                    {shotListGroups.map((group) => {
                      const grpCompleted = group.items.filter((i) => i.isCompleted).length;
                      return (
                        <div
                          key={group.id}
                          className="bg-surface rounded-xl p-4 border border-outline-variant/20 shadow-2xs flex flex-col gap-2.5"
                        >
                          <div className="flex items-baseline justify-between border-b border-outline-variant/15 pb-2 gap-2">
                            <div>
                              <h4 className="font-headline-sm text-xs sm:text-sm text-on-surface font-semibold">
                                {group.name}
                              </h4>
                              <p className="font-body-md text-[11px] text-on-surface-variant">
                                {grpCompleted} de {group.items.length} fotos realizadas
                              </p>
                            </div>
                            {group.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface-container text-on-surface">
                                {group.badge}
                              </span>
                            )}
                          </div>

                          {/* Items */}
                          <div className="divide-y divide-outline-variant/10">
                            {group.items.map((item) => (
                              <div
                                key={item.id}
                                className="py-2 flex items-start justify-between gap-3 group/item"
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
                                    className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4 shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span
                                      className={`font-body-md text-xs block leading-snug ${
                                        item.isCompleted
                                          ? "line-through text-on-surface-variant/50"
                                          : "text-on-surface font-medium"
                                      }`}
                                    >
                                      {item.title}
                                    </span>
                                    <span className="font-body-md text-[11px] text-on-surface-variant/80 block mt-0.5">
                                      {item.names}
                                    </span>
                                  </div>
                                </label>

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

                          {/* Adicionar Foto Personalizada */}
                          <div className="pt-1 flex items-center gap-2">
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
                                  onAddShotItem(group.id, newShotTitles[group.id].trim());
                                  setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                                }
                              }}
                              className="flex-1 bg-surface-container-low text-xs text-on-surface placeholder:text-on-surface-variant/50 px-3 py-1.5 rounded-lg border border-outline-variant/30 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newShotTitles[group.id]?.trim()) {
                                  onAddShotItem(group.id, newShotTitles[group.id].trim());
                                  setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                                }
                              }}
                              className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs rounded-lg font-medium flex items-center gap-1"
                            >
                              <Plus className="size-3 text-secondary" />
                              <span>Adicionar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
