import { Camera, Building2, CheckSquare, Share2 } from "lucide-react";
import { ActiveTab } from "@/app/components/Header";

interface MobileBottomDockProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  pendingShotCount: number;
  onOpenShareModal: () => void;
}

export function MobileBottomDock({
  activeTab,
  onTabChange,
  favoritesCount,
  pendingShotCount,
  onOpenShareModal
}: MobileBottomDockProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-t border-[#ebebeb] dark:border-white/10 px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-md mx-auto flex items-center justify-around gap-1">
        {/* Tab 01: Ensaio */}
        <button
          type="button"
          onClick={() => onTabChange("pre-wedding")}
          className={`relative min-w-[64px] min-h-[48px] px-2 py-1.5 rounded-[12px] flex flex-col items-center justify-center transition-all duration-200 active:scale-92 ${
            activeTab === "pre-wedding"
              ? "text-[#ff385c] font-bold"
              : "text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222]"
          }`}
          aria-label="Aba Ensaio Pré-Wedding"
        >
          <div className="relative">
            <Camera className={`size-5 transition-transform ${activeTab === "pre-wedding" ? "scale-110" : ""}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-3 size-4 rounded-full bg-[#ff385c] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Ensaio</span>
        </button>

        {/* Tab 02: Casamento */}
        <button
          type="button"
          onClick={() => onTabChange("casamento")}
          className={`relative min-w-[64px] min-h-[48px] px-2 py-1.5 rounded-[12px] flex flex-col items-center justify-center transition-all duration-200 active:scale-92 ${
            activeTab === "casamento"
              ? "text-[#ff385c] font-bold"
              : "text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222]"
          }`}
          aria-label="Aba Casamento e Logística"
        >
          <div className="relative">
            <Building2 className={`size-5 transition-transform ${activeTab === "casamento" ? "scale-110" : ""}`} />
            {pendingShotCount > 0 && (
              <span className="absolute -top-1.5 -right-3 size-4 rounded-full bg-[#ff385c] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {pendingShotCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Casamento</span>
        </button>

        {/* Tab 03: Entregáveis */}
        <button
          type="button"
          onClick={() => onTabChange("acoes")}
          className={`relative min-w-[64px] min-h-[48px] px-2 py-1.5 rounded-[12px] flex flex-col items-center justify-center transition-all duration-200 active:scale-92 ${
            activeTab === "acoes"
              ? "text-[#ff385c] font-bold"
              : "text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222]"
          }`}
          aria-label="Aba Hub e Entregáveis"
        >
          <div className="relative">
            <CheckSquare className={`size-5 transition-transform ${activeTab === "acoes" ? "scale-110" : ""}`} />
          </div>
          <span className="text-[10px] tracking-tight mt-1">Entregas</span>
        </button>

        {/* Share Action Button */}
        <button
          type="button"
          onClick={onOpenShareModal}
          className="min-w-[48px] min-h-[48px] px-3 py-1.5 rounded-full bg-[#222222] text-white hover:bg-[#ff385c] flex items-center justify-center gap-1.5 shadow-sm active:scale-90 transition-all ml-1"
          title="Compartilhar resumo com cerimonial"
        >
          <Share2 className="size-4" />
          <span className="text-[11px] font-bold hidden xs:inline">Enviar</span>
        </button>
      </div>
    </div>
  );
}
