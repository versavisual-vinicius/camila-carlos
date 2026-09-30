import { motion } from "motion/react";
import { 
  Sparkles, 
  LayoutGrid, 
  Clock, 
  MapPin, 
  Heart, 
  ArrowRight, 
  Download, 
  Share2, 
  Camera, 
  CheckCircle2, 
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
    <div className="space-y-8 sm:space-y-12 pb-16 animate-fade-in">
      
      {/* 1. Hero Editorial de Acolhimento — Warm Editorial Stitch */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-4xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card shadow-airbnb-card p-6 sm:p-10 lg:p-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 size-64 sm:size-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/20 text-xs font-semibold text-secondary">
            <Sparkles className="size-3.5 text-secondary" />
            <span>Caderno Editorial de Fotografia</span>
            <span className="size-1 rounded-full bg-secondary/40"></span>
            <span className="text-on-surface-variant font-normal">Rio das Ostras / RJ</span>
          </div>

          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-normal text-on-surface tracking-tight leading-[1.1]">
            Camila & Carlos
          </h1>

          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-2xl">
            Este é o espaço de curadoria visual e planejamento da fotografia do casal. Um hub leve para reunir o que Camila e Carlos gostam, orientar o olhar da equipe e alinhar cada detalhe da cobertura com leveza.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-secondary">
            <span className="flex items-center gap-1.5 font-semibold text-on-surface">
              <Camera className="size-3.5 text-secondary" />
              Direção Fotográfica: Vinicius Cunha — Versa Visual
            </span>
            <span className="hidden sm:inline text-outline-variant">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-secondary" />
              Espaço Lux · Cerimônia & Recepção
            </span>
          </div>

          {/* Ações Rápidas de Topo */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("referencias")}
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-98 transition-all flex items-center gap-2 shadow-xs"
            >
              <LayoutGrid className="size-4" />
              <span>Explorar Referências</span>
              <ArrowRight className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className="px-4 py-2.5 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-on-surface font-semibold text-xs sm:text-sm hover:bg-surface-container-high transition-all flex items-center gap-2 disabled:opacity-50"
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
              className="p-2.5 rounded-xl border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors"
              title="Compartilhar resumo no WhatsApp"
              aria-label="Compartilhar resumo"
            >
              <Share2 className="size-4 text-secondary" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Atalhos Centrais das 3 Frentes (Cards Táteis Stitch) */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              Áreas de Planejamento
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
              Acesse a curadoria visual, a estrutura de cobertura e os locais confirmados
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Card 1: Referências Visuais */}
          <div 
            onClick={() => onNavigateTab("referencias")}
            className="group relative cursor-pointer rounded-3xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card p-6 shadow-airbnb-card hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
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
                <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Referências Visuais
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Galeria de fotografias, seleção de favoritas e suas observações com suas próprias palavras para orientar o olhar da equipe.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>{itemsCount} fotos no acervo</span>
              <span className="flex items-center gap-1">
                Abrir galeria <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 2: Roteiro da Fotografia */}
          <div 
            onClick={() => onNavigateTab("roteiro")}
            className="group relative cursor-pointer rounded-3xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card p-6 shadow-airbnb-card hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
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
                <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Roteiro da Cobertura
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  O que será fotografado, como a equipe se divide (Vinicius + 2º fotógrafo) e a lista de fotos protocolares de família no altar.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>Prioridade aos avós</span>
              <span className="flex items-center gap-1">
                Ver roteiro <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 3: Locais & Fornecedores */}
          <div 
            onClick={() => onNavigateTab("fornecedores")}
            className="group relative cursor-pointer rounded-3xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card p-6 shadow-airbnb-card hover:shadow-airbnb-float transition-all duration-200 flex flex-col justify-between"
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
                <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  Locais & Contatos
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Espaço Lux em Rio das Ostras e contato direto com a Versa Visual. Rotas no Google Maps e Waze com 1 clique.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-outline-variant/20 flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-on-surface">
              <span>Rotas e WhatsApp</span>
              <span className="flex items-center gap-1">
                Consultar locais <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Destaque Especial: Ensaio Pré-Wedding */}
      <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card p-6 sm:p-8 shadow-airbnb-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider">
              <SunMedium className="size-3.5 text-amber-500" />
              <span>Ensaio Pré-Wedding</span>
            </div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
              Bar Thunder & Falésias de Costa Azul
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
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
      <section className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card p-6 sm:p-8 shadow-airbnb-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
              Próximos Passos com a Equipe
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
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
            <p className="text-xs text-on-surface leading-relaxed">
              Camila escolhe suas fotos preferidas e anota o que mais gosta (poses, enquadramentos, luz ou movimento).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">2</span>
              <span>Ensaio Pré-Wedding</span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              Definição de figurinos leves e horário do ensaio no Bar Thunder e nas Falésias para aproveitar a luz natural.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">3</span>
              <span>Fotos de Família</span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              Confirmação das fotos protocolares no altar com prioridade para avós e pessoas com mobilidade reduzida.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container/40 border border-outline-variant/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
              <span className="size-5 rounded-full bg-secondary/15 flex items-center justify-center text-[11px]">4</span>
              <span>O Grande Dia</span>
            </div>
            <p className="text-xs text-on-surface leading-relaxed">
              Cobertura completa no Espaço Lux: Vinicius com a noiva e momentos principais; segundo fotógrafo com o noivo e detalhes.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
