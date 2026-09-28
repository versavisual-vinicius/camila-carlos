import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Camera, UploadCloud, BookOpen, X, Sparkles } from "lucide-react";
import { compressMultipleFiles } from "@/app/utils/imageCompressor";
import { toast } from "sonner";
import { PreWeddingItem } from "@/app/data/preWeddingData";

interface FloatingActionMenuProps {
  onOpenAddDialog: () => void;
  onOpenManual: () => void;
  onAddBatchItems?: (items: Omit<PreWeddingItem, "id">[]) => void;
}

export function FloatingActionMenu({
  onOpenAddDialog,
  onOpenManual,
  onAddBatchItems
}: FloatingActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const toastId = toast.loading(`Processando e otimizando ${files.length} fotos...`);

    try {
      const fileList = Array.from(files);
      const compressedList = await compressMultipleFiles(fileList);

      const newItems: Omit<PreWeddingItem, "id">[] = compressedList.map((c, idx) => ({
        title: fileList[idx].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
        category: "natureza",
        imageUrl: c.dataUrl,
        aspectRatio: c.aspectRatio,
        notes: "Adicionado via upload rápido mobile."
      }));

      if (onAddBatchItems) {
        onAddBatchItems(newItems);
      }

      toast.success(`${compressedList.length} referências adicionadas ao atelier!`, {
        id: toastId,
        description: "Comprimidas com otimização Retina para o roteiro."
      });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao processar as fotos selecionadas.", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* Hidden file input for batch uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Dimmed backdrop when FAB is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Action Menu Container */}
      <div className="fixed bottom-20 right-4 z-40 md:hidden flex flex-col items-end gap-2.5">
        {/* Expanded Options Stack */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.02 }
                },
                closed: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 }
                }
              }}
              className="flex flex-col items-end gap-2.5 mb-1"
            >
              {/* Option 1: Nova Referência (Dialog) */}
              <motion.button
                type="button"
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: 14, scale: 0.85 }
                }}
                onClick={() => {
                  setIsOpen(false);
                  onOpenAddDialog();
                }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface dark:bg-[#1C1A17] text-on-surface border border-outline-variant/30 shadow-lg active:scale-95 transition-transform"
              >
                <span className="font-label-sm text-xs font-medium">Nova Referência</span>
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs">
                  <Camera className="size-4" />
                </span>
              </motion.button>

              {/* Option 2: Upload Rápido em Lote */}
              <motion.button
                type="button"
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: 14, scale: 0.85 }
                }}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface dark:bg-[#1C1A17] text-on-surface border border-outline-variant/30 shadow-lg active:scale-95 transition-transform"
              >
                <span className="font-label-sm text-xs font-medium">Upload em Lote</span>
                <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
                  <UploadCloud className="size-4" />
                </span>
              </motion.button>

              {/* Option 3: Manual da Noiva */}
              <motion.button
                type="button"
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: 14, scale: 0.85 }
                }}
                onClick={() => {
                  setIsOpen(false);
                  onOpenManual();
                }}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-surface dark:bg-[#1C1A17] text-on-surface border border-outline-variant/30 shadow-lg active:scale-95 transition-transform"
              >
                <span className="font-label-sm text-xs font-medium">Manual da Noiva</span>
                <span className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center shadow-xs">
                  <BookOpen className="size-4" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Morphing FAB Trigger */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu de ações" : "Abrir menu de criação rápida"}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(28,26,23,0.35)] transition-all duration-300 ${
            isOpen
              ? "bg-secondary text-on-secondary rotate-45"
              : "bg-primary text-on-primary"
          }`}
        >
          <Plus className="size-5 transition-transform duration-200" />
        </motion.button>
      </div>
    </>
  );
}
