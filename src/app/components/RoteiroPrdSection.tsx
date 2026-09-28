import { useState } from "react";
import { 
  ShotListGroup, 
  ShotListItem 
} from "@/app/data/shotListData";
import { 
  Clock, 
  Download, 
  AlertTriangle, 
  UserCheck, 
  Plus, 
  RotateCcw, 
  Trash2, 
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
  onOpenManual?: () => void;
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
  onDownloadCeremonialAltar
}: RoteiroPrdSectionProps) {
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
    toast.success("Alertas operacionais salvos!");
  };

  const handleSaveFocal = () => {
    onSaveFocalPoint({ name: focalName, phone: focalPhone });
    toast.success("Ponto focal salvo!");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header do Roteiro */}
      <section className="pt-1 pb-3 border-b border-outline-variant/30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold tracking-tight">
            Roteiro do Casamento
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface/80 max-w-xl">
            Cronograma do dia, horários de luz solar e lista de fotos protocolares com família e padrinhos.
          </p>
        </div>

        {/* Botões de Ação para Cerimonial */}
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
            className="h-9 px-4 rounded-xl bg-primary text-on-primary font-body-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 transition-all"
            title="Baixar Dossiê Completo em PDF"
          >
            <Download className="size-3.5" />
            <span>Dossiê PDF</span>
          </button>
        </div>
      </section>

      {/* 2. Barra de Progresso das Fotos */}
      <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2.5 shadow-xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-body-md text-secondary font-semibold">
            Fotos de Altar Concluídas
          </span>
          <span className="font-semibold text-on-surface">
            {progressPercent}% ({completedCount} de {totalCount})
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
            <strong>Prioridade:</strong> Liberar avós e mobilidade reduzida em até 6 minutos no altar.
          </p>
          <button
            type="button"
            onClick={onResetShotList}
            className="text-secondary hover:underline flex items-center gap-1 font-medium self-start sm:self-auto shrink-0"
          >
            <RotateCcw className="size-3" />
            <span>Restaurar lista original</span>
          </button>
        </div>
      </div>

      {/* 3. Alertas e Ponto Focal de Coordenação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alerta Sensível */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary">
              <AlertTriangle className="size-4 shrink-0" />
              <span className="font-body-md text-xs font-semibold text-on-surface">
                Atenção Cerimonial / Família
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

        {/* Ponto Focal */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center gap-2 text-secondary">
            <UserCheck className="size-4 shrink-0" />
            <span className="font-body-md text-xs font-semibold text-on-surface">
              Pessoa para Organizar Padrinhos & Família
            </span>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant">
            Ponto de contato que conhece todos os familiares para agilizar as fotos no altar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <input
              type="text"
              placeholder="Nome da pessoa"
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

      {/* 4. Cronograma Solar & Fotos do Dia */}
      <div className="space-y-4">
        <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold flex items-center gap-2">
          <Clock className="size-4 text-secondary" />
          <span>Cronograma do Dia do Casamento</span>
        </h2>

        {/* Making Of */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface">
              13:00 — 15:30
            </span>
            <span className="font-body-md text-xs text-secondary font-medium">
              Espaço Lux · Suíte Master
            </span>
          </div>
          <h3 className="font-headline-sm text-base text-on-surface font-semibold">
            Making-of da Noiva, Noivo & Detalhes
          </h3>
          <p className="font-body-md text-xs text-on-surface/80 leading-relaxed">
            Vestido no cabide, alianças, convite, sapatos e buquê fresco. Retratos solo de Camila pronta e brinde descontraído de Carlos com os padrinhos.
          </p>
        </div>

        {/* Cerimônia */}
        <div className="bg-secondary-container/30 rounded-2xl p-4 sm:p-5 border border-secondary/30 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-container text-on-secondary-container">
              16:00 — 16:50
            </span>
            <span className="font-body-md text-xs text-secondary font-medium">
              Altar ao Ar Livre sob Jabuticabeiras
            </span>
          </div>
          <h3 className="font-headline-sm text-base text-on-surface font-semibold">
            Cortejo, Cerimônia & Troca de Alianças
          </h3>
          <p className="font-body-md text-xs text-on-surface/85 leading-relaxed">
            Início impreterível para blindar a luz solar natural. Entrada emocionante, votos do casal e primeiro beijo sob a luz filtrada das árvores.
          </p>
        </div>

        {/* Fotos de Altar com Grupos */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary text-on-primary">
                16:50 — 17:15
              </span>
              <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                Fotos de Altar com Família & Padrinhos
              </h3>
            </div>
            <span className="font-body-md text-xs text-secondary font-medium">
              25 minutos
            </span>
          </div>

          {shotListGroups.map((group) => {
            const grpCompleted = group.items.filter((i) => i.isCompleted).length;
            return (
              <div
                key={group.id}
                className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-baseline justify-between border-b border-outline-variant/20 pb-2 gap-2">
                  <div>
                    <h4 className="font-headline-sm text-sm sm:text-base text-on-surface font-semibold">
                      {group.name}
                    </h4>
                    <p className="font-body-md text-xs text-on-surface-variant">
                      {grpCompleted} de {group.items.length} fotos realizadas
                    </p>
                  </div>
                  {group.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-container text-on-surface">
                      {group.badge}
                    </span>
                  )}
                </div>

                {/* Items */}
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

                {/* Add Item */}
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
                    className="flex-1 bg-surface text-xs text-on-surface placeholder:text-on-surface-variant/60 px-3 py-1.5 rounded-xl border border-outline-variant/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newShotTitles[group.id]?.trim()) {
                        onAddShotItem(group.id, newShotTitles[group.id].trim());
                        setNewShotTitles((prev) => ({ ...prev, [group.id]: "" }));
                      }
                    }}
                    className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-xl font-medium flex items-center gap-1"
                  >
                    <Plus className="size-3" />
                    <span>Adicionar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retratos Casal */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border-2 border-secondary/40 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary text-on-secondary">
              17:15 — 17:40
            </span>
            <span className="font-body-md text-xs text-secondary font-semibold">
              Pôr do Sol & Falésias Costa Azul
            </span>
          </div>
          <h3 className="font-headline-sm text-base text-on-surface font-semibold">
            Retratos a Dois de Camila & Carlos
          </h3>
          <p className="font-body-md text-xs text-on-surface/85 leading-relaxed">
            Momento exclusivo do casal na grama e mirante costeiro. Pôr do sol às 17:28 com luz cinematográfica.
          </p>
        </div>

        {/* Festa */}
        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface">
              18:00 — 01:00
            </span>
            <span className="font-body-md text-xs text-secondary font-medium">
              Salão & Área Lounge
            </span>
          </div>
          <h3 className="font-headline-sm text-base text-on-surface font-semibold">
            Recepção, Brinde, Jantar & Pista de Dança
          </h3>
          <p className="font-body-md text-xs text-on-surface/80 leading-relaxed">
            Abertura da pista com coreografia dos noivos, brinde com padrinhos, buquê e festa.
          </p>
        </div>
      </div>
    </div>
  );
}
