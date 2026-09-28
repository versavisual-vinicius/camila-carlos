import { 
  Check, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Download, 
  FileText, 
  Printer, 
  Sparkles, 
  ExternalLink, 
  FolderDown, 
  ShieldCheck 
} from "lucide-react";
import { DELIVERY_STAGES } from "@/app/data/shotListData";
import { toast } from "sonner";

interface ActionBacklogSectionProps {
  onOpenManual: () => void;
  onOpenShareModal: () => void;
  onDownloadFullDossier?: () => void;
  onDownloadCeremonialAltar?: () => void;
}

export function ActionBacklogSection({
  onOpenManual,
  onOpenShareModal,
  onDownloadFullDossier,
  onDownloadCeremonialAltar
}: ActionBacklogSectionProps) {
  const completedStages = DELIVERY_STAGES.filter((s) => s.status === "completed").length;
  const progressPercent = Math.round((completedStages / DELIVERY_STAGES.length) * 100);

  const handleDownloadRoteiro = () => {
    toast.success("Gerando documento consolidado para impressão...");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* 1. Progress Banner: E-commerce Order Tracker Header */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-semibold text-[#ff385c] tracking-normal uppercase block mb-1.5">
              SEÇÃO 03 · HUB DO CLIENTE & ENTREGÁVEIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#222222] dark:text-white mb-1.5 tracking-[-0.44px]">
              Esteira de Entregas & Contrato
            </h2>
            <p className="text-sm text-[#6a6a6a] dark:text-[#a0a0a0]">
              Acompanhamento linear de cada etapa fotográfica contratada por Camila & Carlos junto à Versa Visual.
            </p>
          </div>

          <div className="sm:text-right flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-bold text-[#222222] dark:text-white tracking-tight">
              {completedStages}/{DELIVERY_STAGES.length}
            </span>
            <span className="text-xs font-semibold block text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
              Etapas Realizadas ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Airbnb Rausch Red Progress Line */}
        <div className="w-full bg-[#f2f2f2] dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#ff385c] h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Tracker de Entrega Linear (Estilo Esteira E-commerce) */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 space-y-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
            <Sparkles className="size-3.5" />
            <span>Ciclo de Vida do Contrato Fotográfico</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
            Linha do Tempo de Entregas
          </h3>
          <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
            Do briefing inicial até a entrega do álbum impresso encadernado em linho fino.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#ebebeb] dark:before:bg-white/10">
          {DELIVERY_STAGES.map((stage) => {
            const isCompleted = stage.status === "completed";
            const isScheduled = stage.status === "scheduled";

            return (
              <div key={stage.id} className="relative group">
                {/* Node icon */}
                <div className={`absolute -left-6 sm:-left-8 top-0 size-6 sm:size-7 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-[#25D366] text-white ring-4 ring-white dark:ring-[#1c1c1e] shadow-xs"
                    : isScheduled
                    ? "bg-[#ff385c] text-white ring-4 ring-white dark:ring-[#1c1c1e] shadow-xs"
                    : "bg-[#f2f2f2] dark:bg-zinc-800 text-[#a0a0a0] ring-4 ring-white dark:ring-[#1c1c1e]"
                }`}>
                  {isCompleted ? (
                    <Check className="size-3.5 stroke-[3]" />
                  ) : isScheduled ? (
                    <Clock className="size-3.5 stroke-[2.5]" />
                  ) : (
                    <span className="text-[10px] font-bold">{stage.stepNumber}</span>
                  )}
                </div>

                {/* Stage Content Card */}
                <div className="p-4 sm:p-5 rounded-[16px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 space-y-1.5 transition-all hover:border-[#c1c1c1]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#222222] dark:text-white flex items-center gap-2">
                      <span>Etapa {stage.stepNumber} · {stage.title}</span>
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full self-start sm:self-center ${
                      isCompleted
                        ? "bg-[#25D366]/15 text-[#1b9a4a]"
                        : isScheduled
                        ? "bg-[#ff385c]/15 text-[#ff385c] font-bold"
                        : "bg-white dark:bg-[#1c1c1e] text-[#6a6a6a] border border-[#ebebeb]"
                    }`}>
                      {stage.dateInfo}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Central de Arquivos (Download Cards Minimalistas) */}
      <div className="p-6 sm:p-8 rounded-[20px] bg-white dark:bg-[#1c1c1e] shadow-airbnb-card border border-[#ebebeb] dark:border-white/10 space-y-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
            <FolderDown className="size-3.5" />
            <span>Documentos Oficiais & Acervo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#222222] dark:text-white tracking-[-0.44px]">
            Central de Downloads do Casal
          </h3>
          <p className="text-xs sm:text-sm text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
            Arquivos originais e materiais de orientação disponíveis para download a qualquer momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Manual da Noiva */}
          <div className="p-5 rounded-[16px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="size-10 rounded-[10px] bg-[#ff385c]/10 text-[#ff385c] flex items-center justify-center">
                <BookOpen className="size-5" />
              </div>
              <h4 className="font-bold text-sm text-[#222222] dark:text-white leading-snug">
                Manual da Noiva (18 Páginas)
              </h4>
              <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed">
                Guia editorial completo com dicas de making-of, vestido e cronograma do Dia D.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#6a6a6a] font-mono">
                <span>18.3 MB</span>
                <span>·</span>
                <span>PDF Oficial</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#ebebeb] dark:border-white/10">
              <button
                type="button"
                onClick={onOpenManual}
                className="w-full h-8.5 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <BookOpen className="size-3.5" />
                <span>Folhear no App</span>
              </button>
              <a
                href="/docs/Versa_Visual_Manual_da_Noiva_.pdf"
                download="Versa_Visual_Manual_da_Noiva.pdf"
                className="block"
              >
                <button
                  type="button"
                  className="w-full h-8.5 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#222222] transition-all"
                >
                  <Download className="size-3.5 text-[#ff385c]" />
                  <span>Baixar Arquivo</span>
                </button>
              </a>
            </div>
          </div>

          {/* Card 2: Contrato Assinado */}
          <div className="p-5 rounded-[16px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="size-10 rounded-[10px] bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <h4 className="font-bold text-sm text-[#222222] dark:text-white leading-snug">
                Contrato & Escopo Fotográfico
              </h4>
              <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed">
                Instrumento contratual de prestação de serviços fotográficos assinado digitalmente.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#6a6a6a] font-mono">
                <span>1.2 MB</span>
                <span>·</span>
                <span>Assinado Digitalmente</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#ebebeb] dark:border-white/10">
              <button
                type="button"
                onClick={() => toast.info("Contrato registrado sob a guarda da Versa Visual e contratantes.")}
                className="w-full h-8.5 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#222222] transition-all"
              >
                <FileText className="size-3.5 text-emerald-600" />
                <span>Visualizar Escopo</span>
              </button>
            </div>
          </div>

          {/* Card 3: Roteiro Consolidado */}
          <div className="p-5 rounded-[16px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="size-10 rounded-[10px] bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <Printer className="size-5" />
              </div>
              <h4 className="font-bold text-sm text-[#222222] dark:text-white leading-snug">
                Roteiro Logístico Consolidado
              </h4>
              <p className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] leading-relaxed">
                Resumo com a rota, horários do pôr do sol e a Shot List completa para impressão.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-[#6a6a6a] font-mono">
                <span>Gerado ao vivo</span>
                <span>·</span>
                <span>PDF de Impressão</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#ebebeb] dark:border-white/10">
              {onDownloadFullDossier && (
                <button
                  type="button"
                  onClick={onDownloadFullDossier}
                  className="w-full h-8.5 rounded-[8px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <Download className="size-3.5" />
                  <span>Dossiê Completo (PDF)</span>
                </button>
              )}
              {onDownloadCeremonialAltar && (
                <button
                  type="button"
                  onClick={onDownloadCeremonialAltar}
                  className="w-full h-8.5 rounded-[8px] bg-[#e00b41] hover:bg-[#c10a38] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <FileText className="size-3.5" />
                  <span>Ficha de Altar do Cerimonial (PDF)</span>
                </button>
              )}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadRoteiro}
                  className="h-8 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white text-[11px] font-semibold flex items-center justify-center gap-1 hover:border-[#222222] transition-all"
                >
                  <Printer className="size-3" />
                  <span>Imprimir A4</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="h-8 rounded-[8px] border border-[#ebebeb] dark:border-white/10 bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white text-[11px] font-semibold flex items-center justify-center gap-1 hover:border-[#222222] transition-all"
                >
                  <ExternalLink className="size-3 text-[#ff385c]" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
