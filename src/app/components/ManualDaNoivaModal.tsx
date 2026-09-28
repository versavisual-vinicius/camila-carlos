import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Layers
} from "lucide-react";

interface ManualDaNoivaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

const TOTAL_PAGES = 18;

const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    pageNumber: i + 1,
    imageUrl: `/docs/manual-pages/page-${num}.jpg`
  };
});

export function ManualDaNoivaModal({
  isOpen,
  onClose,
  initialPage = 1
}: ManualDaNoivaModalProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [showThumbnails, setShowThumbnails] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage);
    }
  }, [isOpen, initialPage]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentPage((prev) => (prev < TOTAL_PAGES ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : TOTAL_PAGES));
  };

  const currentPageData = PAGES[currentPage - 1];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-md p-2 sm:p-4 text-white select-none"
        onClick={onClose}
      >
        {/* Top bar controls */}
        <div 
          className="flex items-center justify-between px-4 py-2.5 bg-zinc-950/80 rounded-[20px] border border-white/10 backdrop-blur-md z-30 mb-2 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-[#ff385c] flex items-center justify-center text-white font-bold shadow-sm">
              <BookOpen className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white tracking-[-0.18px]">
                  Versa Visual — Manual da Noiva
                </span>
                <span className="text-[11px] font-semibold text-[#ff385c] bg-[#ff385c]/15 px-2.5 py-0.5 rounded-full hidden sm:inline-flex">
                  Exclusivo Camila & Carlos
                </span>
              </div>
              <span className="text-xs text-zinc-400 hidden sm:inline-block">
                "Organizar antes para não precisar controlar durante."
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Page indicator pill */}
            <span className="text-xs font-semibold px-3 py-1 text-white bg-white/10 rounded-full border border-white/15">
              {currentPage} / {TOTAL_PAGES}
            </span>

            {/* Download PDF button */}
            <a
              href="/docs/Versa_Visual_Manual_da_Noiva_.pdf"
              download="Versa_Visual_Manual_da_Noiva.pdf"
              className="hidden sm:inline-flex"
            >
              <button
                type="button"
                className="h-8 px-3 rounded-[8px] text-xs font-semibold text-white bg-white/10 hover:bg-white/20 gap-1.5 border border-white/15 flex items-center transition-all"
              >
                <Download className="size-3.5 text-[#ff385c]" />
                <span>Baixar PDF (18 MB)</span>
              </button>
            </a>

            {/* Open in new tab */}
            <a
              href="/docs/Versa_Visual_Manual_da_Noiva_.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <button
                type="button"
                className="h-8 px-3 rounded-[8px] text-xs font-semibold text-white bg-white/10 hover:bg-white/20 gap-1.5 border border-white/15 flex items-center transition-all"
                title="Abrir PDF no visualizador do navegador"
              >
                <ExternalLink className="size-3.5" />
                <span>Abrir PDF</span>
              </button>
            </a>

            {/* Toggle thumbnails */}
            <button
              type="button"
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="size-8 rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all hidden sm:inline-flex"
              title="Alternar barra de miniaturas"
            >
              <Layers className="size-3.5" />
            </button>

            {/* Close button - Airbnb Circular 50% */}
            <button
              type="button"
              className="size-8 rounded-full bg-white/15 text-white hover:bg-white hover:text-[#222222] flex items-center justify-center transition-all active:scale-90"
              onClick={onClose}
              title="Fechar (Esc)"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Main page viewing area */}
        <div 
          className="relative flex-1 flex items-center justify-center overflow-hidden min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Airbnb Prev Button (Circular 50%) */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-12 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center shadow-md hover:shadow-airbnb-hover hover:scale-105 active:scale-92 transition-all focus:outline-none"
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Airbnb Next Button (Circular 50%) */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 size-11 sm:size-12 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center shadow-md hover:shadow-airbnb-hover hover:scale-105 active:scale-92 transition-all focus:outline-none"
            aria-label="Próxima página"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Current Page Image */}
          <div className="relative max-h-full max-w-full flex items-center justify-center p-2">
            <motion.img
              key={currentPage}
              src={currentPageData.imageUrl}
              alt={`Manual da Noiva - Página ${currentPage}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-h-[75vh] w-auto max-w-[92vw] object-contain rounded-[14px] shadow-2xl border border-white/10 bg-white"
            />
          </div>
        </div>

        {/* Bottom Thumbnails Strip */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-2 py-2 px-3 bg-zinc-950/90 rounded-[20px] border border-white/10 backdrop-blur-md flex items-center gap-2 overflow-x-auto scrollbar-thin z-30 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {PAGES.map((p) => {
                const isActive = p.pageNumber === currentPage;
                return (
                  <button
                    key={p.pageNumber}
                    onClick={() => setCurrentPage(p.pageNumber)}
                    className={`relative flex-shrink-0 rounded-[8px] overflow-hidden border transition-all ${
                      isActive
                        ? "border-[#ff385c] ring-2 ring-[#ff385c] scale-105"
                        : "border-white/15 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={p.imageUrl}
                      alt={`Página ${p.pageNumber}`}
                      className="h-14 sm:h-16 w-auto object-cover bg-white"
                      loading="lazy"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[10px] font-semibold text-center py-0.5 text-white/90">
                      {p.pageNumber}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
