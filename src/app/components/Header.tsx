import { 
  Sun, 
  Moon, 
  BookOpen, 
  Share2, 
  LayoutGrid,
  FolderHeart,
  Store,
  FileCheck2
} from "lucide-react";

export type ActiveTab = "elementos" | "clusters" | "locais" | "roteiro";

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  totalPhotos: number;
  totalFavorites: number;
  completedShotCount: number;
  totalShotCount: number;
  onOpenManual: () => void;
  onOpenShareModal: () => void;
  onOpenAddDialog?: () => void;
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
  onOpenManual,
  onOpenShareModal,
  onOpenAddDialog
}: HeaderProps) {
  const pendingShotCount = totalShotCount - completedShotCount;

  return (
    <header className="sticky top-0 z-40 bg-surface/90 dark:bg-[#141312]/90 backdrop-blur-xl border-b border-outline-variant/30 transition-colors shadow-xs pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Top bar: Adaptive Notch Navigation Bar (<48px on mobile) */}
        <div className="h-12 md:h-16 flex items-center justify-between gap-2 md:gap-3">
          {/* Brand Logo & Couple */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer" onClick={() => onTabChange("elementos")}>
            <img
              src="/stitch/logo.png"
              alt="Logo Atelier Noiva"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="hidden sm:inline font-label-sm text-[10px] uppercase text-secondary tracking-widest leading-none">
                Atelier Noiva
              </span>
              <span className="font-headline-sm text-xs sm:text-base text-on-surface truncate font-semibold">
                Camila & Carlos
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Clean, stable sans-serif in Title Case) */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container/70 p-1 rounded-full border border-outline-variant/20">
            <button
              type="button"
              onClick={() => onTabChange("elementos")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "elementos"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>Elementos</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("clusters")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "clusters"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <FolderHeart className="size-3.5" />
              <span>Clusters</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("locais")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "locais"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <Store className="size-3.5" />
              <span>Locais</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("roteiro")}
              className={`px-3.5 py-1.5 rounded-full font-body-md text-[13px] transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "roteiro"
                  ? "bg-primary text-on-primary font-medium shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60"
              }`}
            >
              <FileCheck2 className="size-3.5" />
              <span>Roteiro & PRD</span>
            </button>
          </nav>

          {/* Global Utility Dock (Top Right) */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Manual da Noiva (Desktop) */}
            <button
              type="button"
              onClick={onOpenManual}
              className="hidden sm:flex w-8 h-8 md:w-9 md:h-9 items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Manual da Noiva"
            >
              <BookOpen className="size-4" />
            </button>

            {/* Share WhatsApp Modal */}
            <button
              type="button"
              onClick={onOpenShareModal}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Compartilhar Roteiro"
            >
              <Share2 className="size-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Noturno"}
            >
              {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* Profile Avatar (Bride Glow portrait) */}
            <div 
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0 pl-0.5 sm:pl-1"
              title="Noiva: Camila (Perfil Atelier)"
            >
              <img
                src="/stitch/avatar_bride.png"
                alt="Camila"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover ring-2 ring-outline-variant/40"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
