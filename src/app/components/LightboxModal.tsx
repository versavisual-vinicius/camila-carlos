import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from "lucide-react";
import { PreWeddingItem } from "@/app/data/preWeddingData";

interface LightboxModalProps {
  item: PreWeddingItem | null;
  items: PreWeddingItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: PreWeddingItem) => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  natureza: "Campos & Montanhas",
  floresta: "Floresta & Luz",
  urbano: "Bar, Urbano & Moto",
  pb: "Preto & Branco"
};

export function LightboxModal({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
  isLiked,
  onToggleLike
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen || !item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, item, items]);

  if (!isOpen || !item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const total = items.length;

  const handleNext = () => {
    if (currentIndex < total - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[total - 1]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div 
          className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="text-white bg-black/50 border border-white/20 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              {currentIndex + 1} / {total}
            </span>
            <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-full hidden sm:inline-block backdrop-blur-sm">
              {categoryLabels[item.category] || item.category}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Airbnb Circular 50% Heart Control */}
            <button
              type="button"
              className={`size-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md active:scale-90 ${
                isLiked
                  ? "bg-[#ff385c] text-white scale-105"
                  : "bg-white/90 text-[#222222] hover:bg-white hover:scale-105"
              }`}
              onClick={() => onToggleLike(item.id)}
              title={isLiked ? "Remover dos favoritos" : "Salvar nas favoritas"}
            >
              <Heart className={`size-4.5 ${isLiked ? "fill-white text-white" : "text-[#222222]"}`} />
            </button>

            {/* Airbnb Circular 50% Close Control */}
            <button
              type="button"
              className="size-10 rounded-full bg-white/90 text-[#222222] hover:bg-white hover:scale-105 active:scale-90 flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md"
              onClick={onClose}
              title="Fechar (Esc)"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Circular Nav - Airbnb Prev Button (50% circle) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-airbnb-hover hover:scale-105 active:scale-92 focus:outline-none"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Circular Nav - Airbnb Next Button (50% circle) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 size-11 sm:size-12 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-airbnb-hover hover:scale-105 active:scale-92 focus:outline-none"
          aria-label="Próxima foto"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Main Content Area */}
        <div
          className="relative max-w-5xl max-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-6 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Image */}
          <div className="relative flex items-center justify-center max-h-[72vh] overflow-hidden rounded-[20px] shadow-2xl bg-black/60 border border-white/10">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain rounded-[18px]"
            />
          </div>

          {/* Details Sidebar / Overlay */}
          <div className="w-full md:w-80 flex flex-col justify-between bg-zinc-950/85 border border-white/15 p-6 rounded-[20px] backdrop-blur-md text-white max-h-[70vh] overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center gap-1.5 text-[#ff385c] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="size-3.5" />
                <span>Direção Artística</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-snug tracking-[-0.18px]">
                {item.title}
              </h3>
              
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-[14px] bg-[#ff385c]/15 text-[#ff385c] border border-[#ff385c]/30 text-xs font-semibold">
                  {categoryLabels[item.category] || item.category}
                </span>
              </div>

              {item.notes?.description && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Notas de Cena & Luz
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {item.notes.description}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-[#ff385c]" />
                Rio das Ostras (Thunder / Costa Azul)
              </span>
              <span className="text-zinc-500 font-medium">Versa Visual</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
