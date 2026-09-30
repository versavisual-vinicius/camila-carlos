import { ActiveTab } from "@/app/components/Header";
import { motion } from "motion/react";
import { Sparkles, LayoutGrid, Clock, Store, Heart } from "lucide-react";

interface MobileBottomDockProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  pendingShotCount: number;
}

export function MobileBottomDock({
  activeTab,
  onTabChange,
  favoritesCount
}: MobileBottomDockProps) {
  const tabs = [
    {
      id: "visao-geral" as ActiveTab,
      label: "Início",
      icon: Sparkles,
      badge: null,
      isHeartBadge: false
    },
    {
      id: "referencias" as ActiveTab,
      label: "Referências",
      icon: LayoutGrid,
      badge: favoritesCount > 0 ? favoritesCount : null,
      isHeartBadge: true
    },
    {
      id: "roteiro" as ActiveTab,
      label: "Roteiro",
      icon: Clock,
      badge: null,
      isHeartBadge: false
    },
    {
      id: "fornecedores" as ActiveTab,
      label: "Locais",
      icon: Store,
      badge: null,
      isHeartBadge: false
    }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden pointer-events-none pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-4">
      <div className="max-w-sm mx-auto pointer-events-auto bg-surface/95 dark:bg-[#141312]/95 backdrop-blur-2xl border border-outline-variant/30 rounded-2xl shadow-airbnb-float px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition-colors duration-200 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={tab.label}
            >
              {/* Active Tab Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="bottom-menu-indicator"
                  className="absolute inset-0 bg-surface-container dark:bg-surface-container-high rounded-xl -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`size-5 transition-transform duration-200 ${
                    isActive
                      ? "text-primary dark:text-on-surface scale-110"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                />

                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-3 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-500 text-white min-w-[15px] text-center leading-tight shadow-xs flex items-center gap-0.5">
                    <Heart className="size-2 fill-white text-white" />
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`font-body-md text-[10px] mt-1 tracking-tight transition-colors ${
                  isActive
                    ? "font-bold text-primary dark:text-on-surface"
                    : "text-on-surface-variant group-hover:text-on-surface font-medium"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
