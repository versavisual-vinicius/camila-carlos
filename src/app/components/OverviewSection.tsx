import { PageHeader } from "./PageHeader";
import { 
  LayoutGrid, 
  Clock, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Download, 
  Share2, 
  SunMedium,
  Compass,
  Loader2
} from "lucide-react";
import { ActiveTab } from "@/app/components/Header";

interface OverviewSectionProps {
  onNavigateTab: (tab: ActiveTab) => void;
  itemsCount: number;
  favoritesCount: number;
  completedShotsCount: number;
  totalShotsCount: number;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  onOpenShareModal: () => void;
}

export function OverviewSection({
  onNavigateTab,
  itemsCount,
  favoritesCount,
  completedShotsCount,
  totalShotsCount,
  onExportPdf,
  isExportingPdf,
  onOpenShareModal
}: OverviewSectionProps) {
  return (
    <div className="page-stack">
      
      <PageHeader
        eyebrow="Caderno Editorial de Fotografia"
        title="Visão Geral"
        description="Este é o espaço de curadoria visual e planejamento da fotografia do casal. Um hub leve para reunir o que Camila e Carlos gostam, orientar o olhar da equipe e alinhar cada detalhe da cobertura com leveza."
      >
            <button
              type="button"
              onClick={() => onNavigateTab("referencias")}
              className="h-9 px-3.5 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:opacity-90 active:scale-98 transition-all flex items-center gap-2 shadow-xs"
            >
              <LayoutGrid className="size-4" />
              <span>Explorar Referências</span>
              <ArrowRight className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className="h-9 px-3.5 rounded-xl bg-surface-container-lowest dark:bg-card border border-outline-variant/30 text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isExportingPdf ? (
                <Loader2 className="size-4 animate-spin text-secondary" />
              ) : (
                <Download className="size-4 text-secondary" />
              )}
              <span>{isExportingPdf ? "Gerando..." : "Resumo do Roteiro (PDF)"}</span>
            </button>

            <button
              type="button"
              onClick={onOpenShareModal}
              className="size-9 flex items-center justify-center rounded-xl border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors"
              title="Compartilhar resumo no WhatsApp"
              aria-label="Compartilhar resumo"
            >
              <Share2 className="size-4 text-secondary" />
            </button>
      </PageHeader>

      {/* 2. Atalhos Centrais das 3 Frentes (Cards Táteis Stitch) */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="editorial-section-title">
              Áreas de Planejamento
            </h2>
            <p className="editorial-caption mt-1.5">
              Acesse a curadoria visual, a estrutura de cobertura e os locais confirmados
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Referências Visuais */}
          <div 
            onClick={() => onNavigateTab("referencias")}
            className="group relative cursor-pointer editorial-panel hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-2xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                  <LayoutGrid className="size-5" />
                </div>
                {favoritesCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                    <Heart className="size-3 fill-current" />
                    {favoritesCount} favoritas
                  </span>
                )}
              </div>

              <div>
                <h3 className="editorial-card-title group-hover:text-primary transition-colors">
                  Referências Visuais
                </h3>
                <p className="editorial-body mt-1.5">
                  Galeria de fotografias, seleção de favoritas e suas observações com suas próprias palavras para orientar o olhar da equipe.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>{itemsCount} fotos no acervo</span>
              <span className="flex items-center gap-1">
                Abrir galeria <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 2: Roteiro da Fotografia */}
          <div 
            onClick={() => onNavigateTab("roteiro")}
            className="group relative cursor-pointer editorial-panel hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                  <Clock className="size-5" />
                </div>
                {totalShotsCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container dark:bg-surface-container-high text-on-surface-variant">
                    {completedShotsCount}/{totalShotsCount} fotos
                  </span>
                )}
              </div>

              <div>
                <h3 className="editorial-card-title group-hover:text-primary transition-colors">
                  Roteiro da Cobertura
                </h3>
                <p className="editorial-body mt-1.5">
                  O que será fotografado, como a equipe se divide (Vinicius + 2º fotógrafo) e a lista de fotos protocolares de família no altar.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>Prioridade aos avós</span>
              <span className="flex items-center gap-1">
                Ver roteiro <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 3: Locais & Fornecedores */}
          <div 
            onClick={() => onNavigateTab("fornecedores")}
            className="group relative cursor-pointer editorial-panel hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="size-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                  <MapPin className="size-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  Espaço Lux
                </span>
              </div>

              <div>
                <h3 className="editorial-card-title group-hover:text-primary transition-colors">
                  Locais & Contatos
                </h3>
                <p className="editorial-body mt-1.5">
                  Espaço Lux em Rio das Ostras e contato direto com a Versa Visual. Rotas no Google Maps e Waze com 1 clique.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>Rotas e WhatsApp</span>
              <span className="flex items-center gap-1">
                Consultar locais <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Destaque Especial: Ensaio Pré-Wedding */}
      <section className="editorial-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider">
              <SunMedium className="size-3.5 text-amber-500" />
              <span>Ensaio Pré-Wedding</span>
            </div>
            <h3 className="editorial-section-title">
              Bar Thunder & Falésias de Costa Azul
            </h3>
            <p className="editorial-body">
              O ensaio de Camila & Carlos foi planejado em dois momentos especiais: a textura autêntica e descontraída do Bar Thunder, seguida do entardecer nas falésias e orla da Costa Azul com luz suave e vento natural.
            </p>
            <p className="text-xs text-secondary italic">
              * A moto Harley-Davidson de Carlos poderá integrar os registros conforme o desejo do casal.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("referencias")}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/30 bg-surface hover:bg-surface-container text-xs font-semibold text-on-surface flex items-center gap-2 transition-colors"
            >
              <span>Ver Fotos do Ensaio</span>
              <ArrowRight className="size-3.5 text-secondary" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Próximos Alinhamentos Fotográficos (Reais e Objetivos, sem Contadores Fictícios) */}
      <section className="editorial-panel space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="editorial-section-title">
              Próximos Passos com a Equipe
            </h3>
            <p className="editorial-caption mt-1.5">
              Como transformamos as preferências do casal em direção prática de cobertura
            </p>
          </div>
          <Compass className="size-5 text-secondary shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">1</span>
              <span>Curadoria da Noiva</span>
            </div>
            <p className="editorial-body">
              Camila escolhe suas fotos preferidas e anota o que mais gosta (poses, enquadramentos, luz ou movimento).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">2</span>
              <span>Ensaio Pré-Wedding</span>
            </div>
            <p className="editorial-body">
              Definição de figurinos leves e horário do ensaio no Bar Thunder e nas Falésias para aproveitar a luz natural.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">3</span>
              <span>Fotos de Família</span>
            </div>
            <p className="editorial-body">
              Confirmação das fotos protocolares no altar com prioridade para avós e pessoas com mobilidade reduzida.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">4</span>
              <span>O Grande Dia</span>
            </div>
            <p className="editorial-body">
              Cobertura completa no Espaço Lux: Vinicius com a noiva e momentos principais; segundo fotógrafo com o noivo e detalhes.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
