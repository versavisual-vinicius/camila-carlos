import { ActiveTab } from "@/app/components/Header";
import { Plus } from "lucide-react";

interface MobileBottomDockProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  pendingShotCount: number;
  onOpenAddDialog: () => void;
}

export function MobileBottomDock({
  activeTab,
  onTabChange,
  favoritesCount,
  pendingShotCount,
  onOpenAddDialog
}: MobileBottomDockProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface/90 dark:bg-[#141312]/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-1px_12px_rgba(0,0,0,0.04)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {/* Tab 1: Elementos */}
        <button
          type="button"
          onClick={() => onTabChange("elementos")}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-colors relative ${
            activeTab === "elementos"
              ? "text-primary font-semibold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          aria-label="Elementos e Fotos"
        >
          <span className="material-symbols-outlined text-[22px]" style={activeTab === "elementos" ? { fontVariationSettings: "'FILL' 1" } : {}}>
            view_quilt
          </span>
          <span className="font-label-sm text-[10px] mt-0.5 tracking-wider uppercase">
            Elementos
          </span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container text-[9px] font-bold flex items-center justify-center shadow-xs">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Tab 2: Clusters */}
        <button
          type="button"
          onClick={() => onTabChange("clusters")}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-colors ${
            activeTab === "clusters"
              ? "text-primary font-semibold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          aria-label="Clusters e Pastas"
        >
          <span className="material-symbols-outlined text-[22px]" style={activeTab === "clusters" ? { fontVariationSettings: "'FILL' 1" } : {}}>
            folder_special
          </span>
          <span className="font-label-sm text-[10px] mt-0.5 tracking-wider uppercase">
            Clusters
          </span>
        </button>

        {/* Center Floating Quick Capture Action */}
        <button
          type="button"
          onClick={onOpenAddDialog}
          className="w-11 h-11 -mt-4 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-90 transition-transform"
          title="Nova Referência"
        >
          <Plus className="size-5" />
        </button>

        {/* Tab 3: Locais */}
        <button
          type="button"
          onClick={() => onTabChange("locais")}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-colors ${
            activeTab === "locais"
              ? "text-primary font-semibold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          aria-label="Locais e Fornecedores"
        >
          <span className="material-symbols-outlined text-[22px]" style={activeTab === "locais" ? { fontVariationSettings: "'FILL' 1" } : {}}>
            storefront
          </span>
          <span className="font-label-sm text-[10px] mt-0.5 tracking-wider uppercase">
            Locais
          </span>
        </button>

        {/* Tab 4: Roteiro & PRD */}
        <button
          type="button"
          onClick={() => onTabChange("roteiro")}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-colors relative ${
            activeTab === "roteiro"
              ? "text-primary font-semibold"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
          aria-label="Roteiro e Shot List"
        >
          <span className="material-symbols-outlined text-[22px]" style={activeTab === "roteiro" ? { fontVariationSettings: "'FILL' 1" } : {}}>
            auto_awesome
          </span>
          <span className="font-label-sm text-[10px] mt-0.5 tracking-wider uppercase">
            Roteiro
          </span>
          {pendingShotCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container text-[9px] font-bold flex items-center justify-center shadow-xs">
              {pendingShotCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
