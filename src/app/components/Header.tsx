import { 
  Sun, 
  Moon, 
  Plus, 
  BookOpen, 
  Share2, 
  Search,
  Sparkles,
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
  onOpenAddDialog: () => void;
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
    <header className="sticky top-0 z-40 bg-surface/90 dark:bg-[#141312]/90 backdrop-blur-xl border-b border-outline-variant/30 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Stitch Atelier Branding & Quick Controls */}
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand Logo & Couple */}
          <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={() => onTabChange("elementos")}>
            <img
              src="/stitch/logo.png"
              alt="Logo Atelier Noiva"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-[10px] uppercase text-secondary tracking-widest leading-none">
                Atelier Noiva
              </span>
              <span className="font-headline-sm text-base text-on-surface truncate font-semibold">
                Camila & Carlos
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Stitch Pill Style) */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container/70 p-1 rounded-full border border-outline-variant/20">
            <button
              type="button"
              onClick={() => onTabChange("elementos")}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "elementos"
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>Elementos</span>
              {totalPhotos > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === "elementos" ? "bg-surface-container text-on-surface" : "bg-surface-container-highest"
                }`}>
                  {totalPhotos}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onTabChange("clusters")}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "clusters"
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <FolderHeart className="size-3.5" />
              <span>Clusters</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("locais")}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "locais"
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Store className="size-3.5" />
              <span>Locais</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("roteiro")}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "roteiro"
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <FileCheck2 className="size-3.5" />
              <span>Roteiro & PRD</span>
              {pendingShotCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === "roteiro" ? "bg-secondary-container text-on-secondary-container" : "bg-secondary-container text-on-secondary-container"
                }`}>
                  {pendingShotCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action Dock (Stitch Header Right) */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Stitch "+ Criar" Action Button */}
            <button
              type="button"
              onClick={onOpenAddDialog}
              className="h-9 px-3.5 flex items-center gap-1.5 rounded-lg bg-primary text-on-primary font-label-md text-xs transition-opacity hover:opacity-90 active:scale-95 shadow-xs font-semibold"
            >
              <Plus className="size-3.5" />
              <span>Criar</span>
            </button>

            {/* Manual da Noiva */}
            <button
              type="button"
              onClick={onOpenManual}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Manual da Noiva"
            >
              <BookOpen className="size-4" />
            </button>

            {/* Share WhatsApp Modal */}
            <button
              type="button"
              onClick={onOpenShareModal}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Compartilhar Roteiro"
            >
              <Share2 className="size-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Noturno"}
            >
              {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            {/* Profile Avatar (Bride Glow portrait) */}
            <div 
              className="w-9 h-9 flex items-center justify-center flex-shrink-0 pl-1"
              title="Noiva: Camila (Perfil Atelier)"
            >
              <img
                src="/stitch/avatar_bride.png"
                alt="Camila"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-outline-variant/40"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
