import { 
  Sun, 
  Moon, 
  Share2, 
  LayoutGrid,
  Store,
  Clock,
  Heart
} from "lucide-react";

export type ActiveTab = "referencias" | "roteiro" | "fornecedores";

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
  onOpenShareModal
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface/90 dark:bg-[#141312]/90 backdrop-blur-xl border-b border-outline-variant/30 transition-colors shadow-xs pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-14 md:h-16 flex items-center justify-between gap-3">
          {/* Logo & Casal */}
          <div 
            className="flex items-center gap-2.5 min-w-0 cursor-pointer select-none" 
            onClick={() => onTabChange("referencias")}
          >
            <img
              src="/stitch/logo.png"
              alt="Logo Atelier Noiva"
              className="h-7 md:h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-sm sm:text-base text-on-surface truncate font-semibold leading-tight">
                Camila & Carlos
              </span>
              <span className="font-body-md text-[11px] text-secondary leading-none">
                Versa Visual
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs: 3 abas essenciais */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container/70 p-1 rounded-full border border-outline-variant/20">
            <button
              type="button"
              onClick={() => onTabChange("referencias")}
              className={`px-4 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "referencias"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>Referências</span>
              {totalFavorites > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                  activeTab === "referencias" ? "bg-surface-container text-on-surface" : "bg-primary text-on-primary"
                }`}>
                  {totalFavorites}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onTabChange("roteiro")}
              className={`px-4 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "roteiro"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <Clock className="size-3.5" />
              <span>Roteiro</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("fornecedores")}
              className={`px-4 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "fornecedores"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <Store className="size-3.5" />
              <span>Fornecedores</span>
            </button>
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Share WhatsApp Modal */}
            <button
              type="button"
              onClick={onOpenShareModal}
              className="h-8 md:h-9 px-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Compartilhar"
            >
              <Share2 className="size-3.5 text-secondary" />
              <span className="hidden sm:inline">Compartilhar</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="size-4 text-secondary" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
