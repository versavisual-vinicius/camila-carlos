import { 
  Sun, 
  Moon, 
  Share2, 
  LayoutGrid, 
  Store, 
  Clock, 
  Heart, 
  Download, 
  Loader2,
  Sparkles
} from "lucide-react";

export type ActiveTab = "visao-geral" | "referencias" | "roteiro" | "fornecedores";

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  totalPhotos: number;
  totalFavorites: number;
  completedShotCount: number;
  totalShotCount: number;
  onOpenShareModal: () => void;
  onExportRoteiro?: () => void;
  isExporting?: boolean;
}

export function Header({
  activeTab,
  onTabChange,
  isDarkMode,
  onToggleTheme,
  totalPhotos,
  totalFavorites,
  completedShotCount,
  totalShotCount,
  onOpenShareModal,
  onExportRoteiro,
  isExporting = false
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 dark:bg-[#141312]/95 backdrop-blur-md border-b border-outline-variant/20 transition-colors shadow-airbnb-header pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 md:h-18 flex items-center justify-between gap-4">
          
          {/* Brand & Identidade do Casal */}
          <div 
            className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer select-none group"
            onClick={() => onTabChange("visao-geral")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTabChange("visao-geral");
              }
            }}
            aria-label="Ir para a Visão Geral"
          >
            <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-secondary/30 dark:ring-secondary/50 shadow-inner bg-surface-container flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src="/brand-assets/vv-icon-teal-1000px.png"
                alt="Versa Visual"
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-headline-sm text-sm sm:text-base text-on-surface truncate font-bold leading-tight tracking-tight">
                  Camila & Carlos
                </span>
                <span className="hidden 2xl:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Jornada Ativa
                </span>
              </div>
              <p className="font-body-md text-xs text-secondary leading-tight truncate">
                Fotografia autoral por <strong className="font-semibold text-on-surface">Vinicius Cunha — Versa Visual</strong>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs: 4 Áreas Canônicas (Stitch Pill) */}
          <nav className="hidden xl:flex shrink-0 items-center whitespace-nowrap gap-1 bg-surface-container/60 dark:bg-surface-container/30 p-1.5 rounded-full border border-outline-variant/20 shadow-2xs">
            <button
              type="button"
              onClick={() => onTabChange("visao-geral")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                activeTab === "visao-geral"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
              }`}
            >
              <Sparkles className="size-3.5 text-secondary" />
              <span>Visão Geral</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("referencias")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                activeTab === "referencias"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
              }`}
            >
              <LayoutGrid className="size-3.5 text-secondary" />
              <span>Referências</span>
              {totalFavorites > 0 && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400">
                  <Heart className="size-2.5 fill-current" />
                  {totalFavorites}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onTabChange("roteiro")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                activeTab === "roteiro"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
              }`}
            >
              <Clock className="size-3.5 text-secondary" />
              <span>Roteiro</span>
              {totalShotCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-container dark:bg-surface-container-high text-on-surface-variant">
                  {completedShotCount}/{totalShotCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onTabChange("fornecedores")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                activeTab === "fornecedores"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest/60"
              }`}
            >
              <Store className="size-3.5 text-secondary" />
              <span>Locais</span>
            </button>
          </nav>

          {/* Utility & Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Exportar Roteiro em PDF (Stitch Screen 6 Desktop Reference) */}
            {onExportRoteiro && (
              <button
                type="button"
                onClick={onExportRoteiro}
                disabled={isExporting}
                className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container py-2 px-3 sm:px-3.5 text-xs font-semibold text-on-surface shadow-xs transition-all active:scale-98 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                title="Exportar Roteiro e Dossiê Executivo em PDF"
              >
                {isExporting ? (
                  <Loader2 className="size-3.5 animate-spin text-secondary" />
                ) : (
                  <Download className="size-3.5 text-secondary" />
                )}
                <span className="hidden xl:inline">{isExporting ? "Gerando..." : "Exportar Roteiro"}</span>
                <span className="xl:hidden">{isExporting ? "..." : "PDF"}</span>
              </button>
            )}

            {/* Share WhatsApp Modal */}
            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container py-2 px-3 sm:px-3.5 text-xs font-semibold text-on-surface shadow-xs transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              title="Compartilhar resumo e roteiro"
              aria-label="Compartilhar resumo e roteiro"
            >
              <Share2 className="size-3.5 text-secondary" />
              <span className="hidden lg:inline">Compartilhar</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="size-9 sm:size-10 flex items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card text-on-surface hover:bg-surface-container transition-all active:scale-95 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              aria-label={isDarkMode ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
            >
              {isDarkMode ? <Sun className="size-4 text-amber-500" /> : <Moon className="size-4 text-secondary" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
