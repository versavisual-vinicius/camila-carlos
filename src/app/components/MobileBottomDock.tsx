import { ActiveTab } from "@/app/components/Header";
import { motion } from "motion/react";

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
      id: "referencias" as ActiveTab,
      label: "Referências",
      icon: "view_quilt",
      badge: favoritesCount > 0 ? favoritesCount : null
    },
    {
      id: "roteiro" as ActiveTab,
      label: "Roteiro",
      icon: "schedule",
      badge: null
    },
    {
      id: "fornecedores" as ActiveTab,
      label: "Fornecedores",
      icon: "storefront",
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden pointer-events-none pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] px-3">
      <div className="max-w-sm mx-auto pointer-events-auto bg-surface/90 dark:bg-[#141312]/90 backdrop-blur-2xl border border-outline-variant/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-2 py-1 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 py-1.5 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition-colors duration-200 select-none group"
              aria-label={tab.label}
            >
              {/* Active Tab Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="bottom-menu-indicator"
                  className="absolute inset-0 bg-surface-container dark:bg-surface-container-high rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform duration-200 ${
                    isActive
                      ? "text-primary scale-105"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : {}}
                >
                  {tab.icon}
                </span>

                {tab.badge !== null && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-primary text-on-primary min-w-[15px] text-center leading-tight shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`font-body-md text-[10px] mt-0.5 tracking-tight transition-colors ${
                  isActive
                    ? "font-semibold text-primary"
                    : "text-on-surface-variant group-hover:text-on-surface"
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
