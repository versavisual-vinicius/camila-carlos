import { 
  Sun, 
  Moon, 
  Heart, 
  Camera, 
  BookOpen,
  Building2,
  CheckSquare,
  Share2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

export type ActiveTab = "pre-wedding" | "casamento" | "acoes";

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
  onOpenShareModal
}: HeaderProps) {
  const pendingShotCount = totalShotCount - completedShotCount;

  // Dynamic status badge message
  const getStatusText = () => {
    switch (activeTab) {
      case "pre-wedding":
        return totalFavorites > 0 
          ? `Pré-Wedding: ${totalFavorites} fotos favoritas selecionadas` 
          : "Pré-Wedding: Roteiro Bar Thunder → Costa Azul Aprovado";
      case "casamento":
        return pendingShotCount > 0 
          ? `Casamento: Faltam ${pendingShotCount} confirmações na Shot List` 
          : "Casamento: Espaço Lux · Shot List 100% Confirmada!";
      case "acoes":
        return "Pós & Álbum: 6 entregas contratuais mapeadas";
      default:
        return "Planejamento Ativo Versa Visual";
    }
  };

  const getStepProgress = () => {
    if (activeTab === "pre-wedding") return 33;
    if (activeTab === "casamento") return 66;
    return 100;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-[#ebebeb] dark:border-white/10 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Airbnb Branding & Dynamic Status Stepper */}
        <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebebeb] dark:border-white/10">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              {/* Airbnb Iconic Rausch Red Accent Mark */}
              <div 
                onClick={() => onTabChange("pre-wedding")}
                className="size-9 sm:h-10 sm:px-3 rounded-[10px] bg-[#ff385c] text-white flex items-center justify-center font-bold tracking-tight text-xs uppercase shadow-sm hover:bg-[#e00b41] transition-colors cursor-pointer flex-shrink-0" 
                title="Versa Visual Editorial"
              >
                VV
              </div>
              
              <div className="h-7 w-[1px] bg-[#ebebeb] dark:bg-white/10 hidden sm:block" />

              <div>
                <div className="flex items-baseline gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-[#222222] dark:text-white tracking-[-0.44px] leading-tight">
                    Camila & Carlos
                  </h1>
                  <span className="text-[11px] font-medium text-[#6a6a6a] dark:text-[#a0a0a0] hidden md:inline">
                    · Rio das Ostras, RJ
                  </span>
                </div>
                <p className="text-[11px] text-[#6a6a6a] dark:text-[#a0a0a0] flex items-center gap-1.5">
                  <span>Por</span>
                  <span className="font-semibold text-[#222222] dark:text-white">Versa Visual</span>
                  <a 
                    href="https://instagram.com/v1ncsc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#ff385c] hover:underline font-medium"
                  >
                    (@v1ncsc)
                  </a>
                </p>
              </div>
            </div>

            {/* Mobile quick icons (Theme + Share) */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenShareModal}
                className="size-8 rounded-full bg-[#f2f2f2] dark:bg-[#242426] text-[#222222] dark:text-white flex items-center justify-center active:scale-90 transition-all"
                title="Compartilhar com Cerimonial"
              >
                <Share2 className="size-3.5 text-[#ff385c]" />
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className="size-8 rounded-full bg-[#f2f2f2] dark:bg-[#242426] text-[#222222] dark:text-white flex items-center justify-center active:scale-90 transition-all"
                title="Alternar tema"
              >
                {isDarkMode ? <Sun className="size-3.5 text-amber-500" /> : <Moon className="size-3.5 text-[#222222]" />}
              </button>
            </div>
          </div>

          {/* Stepper de Jornada (Central & Dinâmico) */}
          <div className="flex-1 max-w-md mx-auto hidden lg:flex flex-col items-center gap-1.5 px-4">
            <div className="w-full flex items-center justify-between text-[11px] font-semibold text-[#6a6a6a] dark:text-[#a0a0a0]">
              <span 
                onClick={() => onTabChange("pre-wedding")}
                className={`cursor-pointer transition-colors ${activeTab === "pre-wedding" ? "text-[#ff385c] font-bold" : "hover:text-[#222222]"}`}
              >
                1. Ensaio
              </span>
              <span 
                onClick={() => onTabChange("casamento")}
                className={`cursor-pointer transition-colors ${activeTab === "casamento" ? "text-[#ff385c] font-bold" : "hover:text-[#222222]"}`}
              >
                2. Casamento
              </span>
              <span 
                onClick={() => onTabChange("acoes")}
                className={`cursor-pointer transition-colors ${activeTab === "acoes" ? "text-[#ff385c] font-bold" : "hover:text-[#222222]"}`}
              >
                3. Pós & Álbum
              </span>
            </div>

            {/* Visual Progress Line */}
            <div className="w-full bg-[#ebebeb] dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#ff385c] h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${getStepProgress()}%` }}
              />
            </div>

            {/* Dynamic Status Badge */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#222222] dark:text-white mt-0.5 truncate">
              <Sparkles className="size-3 text-[#ff385c] flex-shrink-0" />
              <span className="truncate">{getStatusText()}</span>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {/* Share / WhatsApp FAB Button */}
            <button
              type="button"
              onClick={onOpenShareModal}
              className="h-8.5 px-3 rounded-[8px] bg-[#222222] text-white hover:bg-[#ff385c] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              title="Compartilhar resumo com cerimonial"
            >
              <Share2 className="size-3.5" />
              <span>Enviar Roteiro</span>
            </button>

            {/* Quick access Manual da Noiva */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenManual}
              className="rounded-[8px] text-xs font-semibold border-[#ebebeb] dark:border-white/15 text-[#222222] dark:text-white bg-white dark:bg-[#1c1c1e] hover:border-[#222222] dark:hover:border-white h-8.5 px-3 shadow-xs hover:shadow-airbnb-hover transition-all gap-1.5"
            >
              <BookOpen className="size-3.5 text-[#ff385c]" />
              <span className="hidden md:inline">Manual da Noiva (18 pág)</span>
              <span className="md:hidden">Manual</span>
            </Button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="size-8.5 rounded-full bg-[#f2f2f2] dark:bg-[#242426] text-[#222222] dark:text-white hover:bg-white dark:hover:bg-[#2e2e32] border border-transparent hover:border-[#ebebeb] dark:hover:border-white/10 flex items-center justify-center transition-all shadow-xs hover:shadow-airbnb-hover active:scale-92"
              title={isDarkMode ? "Fundo Claro" : "Modo Dark"}
            >
              {isDarkMode ? <Sun className="size-4 text-amber-500" /> : <Moon className="size-4 text-[#222222]" />}
            </button>
          </div>
        </div>

        {/* Dynamic Status Pill on Mobile */}
        <div className="lg:hidden py-1.5 flex items-center justify-between text-[11px] font-medium text-[#6a6a6a] dark:text-[#a0a0a0] border-b border-[#ebebeb] dark:border-white/5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="size-1.5 rounded-full bg-[#ff385c] flex-shrink-0" />
            <span className="truncate text-[#222222] dark:text-white font-semibold">{getStatusText()}</span>
          </div>
          <span className="text-[10px] font-mono text-[#ff385c] font-bold flex-shrink-0 ml-2">
            Etapa {activeTab === "pre-wedding" ? "1" : activeTab === "casamento" ? "2" : "3"}/3
          </span>
        </div>

        {/* Desktop 3 Tabs Navigation: Hidden on Mobile because of Bottom Dock */}
        <div className="hidden md:flex items-center gap-2 pt-2.5 pb-2.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => onTabChange("pre-wedding")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 flex-shrink-0 border ${
              activeTab === "pre-wedding"
                ? "bg-[#222222] dark:bg-white text-white dark:text-[#222222] border-[#222222] dark:border-white shadow-sm"
                : "bg-transparent text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222] dark:hover:text-white hover:bg-[#f7f7f7] dark:hover:bg-[#1c1c1e] border-transparent hover:border-[#ebebeb] dark:hover:border-white/10"
            }`}
          >
            <Camera className={`size-4 ${activeTab === "pre-wedding" ? "text-[#ff385c]" : ""}`} />
            <span>01 · Ensaio Pré-Wedding</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              activeTab === "pre-wedding" ? "bg-white/20 dark:bg-[#222222]/10 text-white dark:text-[#222222]" : "bg-[#f2f2f2] dark:bg-white/10 text-[#6a6a6a] dark:text-[#a0a0a0]"
            }`}>
              58
            </span>
          </button>

          <button
            onClick={() => onTabChange("casamento")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 flex-shrink-0 border ${
              activeTab === "casamento"
                ? "bg-[#222222] dark:bg-white text-white dark:text-[#222222] border-[#222222] dark:border-white shadow-sm"
                : "bg-transparent text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222] dark:hover:text-white hover:bg-[#f7f7f7] dark:hover:bg-[#1c1c1e] border-transparent hover:border-[#ebebeb] dark:hover:border-white/10"
            }`}
          >
            <Building2 className={`size-4 ${activeTab === "casamento" ? "text-[#ff385c]" : ""}`} />
            <span>02 · Casamento & Logística</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              activeTab === "casamento" ? "bg-white/20 dark:bg-[#222222]/10 text-white dark:text-[#222222]" : "bg-[#f2f2f2] dark:bg-white/10 text-[#6a6a6a] dark:text-[#a0a0a0]"
            }`}>
              Espaço Lux
            </span>
          </button>

          <button
            onClick={() => onTabChange("acoes")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 flex-shrink-0 border ${
              activeTab === "acoes"
                ? "bg-[#222222] dark:bg-white text-white dark:text-[#222222] border-[#222222] dark:border-white shadow-sm"
                : "bg-transparent text-[#6a6a6a] dark:text-[#a0a0a0] hover:text-[#222222] dark:hover:text-white hover:bg-[#f7f7f7] dark:hover:bg-[#1c1c1e] border-transparent hover:border-[#ebebeb] dark:hover:border-white/10"
            }`}
          >
            <CheckSquare className={`size-4 ${activeTab === "acoes" ? "text-[#ff385c]" : ""}`} />
            <span>03 · Hub & Entregáveis</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              activeTab === "acoes" ? "bg-white/20 dark:bg-[#222222]/10 text-white dark:text-[#222222]" : "bg-[#f2f2f2] dark:bg-white/10 text-[#6a6a6a] dark:text-[#a0a0a0]"
            }`}>
              6 Etapas
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
