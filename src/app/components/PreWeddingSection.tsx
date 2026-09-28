import { useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion } from "motion/react";
import { 
  Bookmark, 
  Plus, 
  RotateCcw, 
  MapPin, 
  Clock, 
  Camera, 
  Check, 
  ChevronRight,
  UploadCloud, 
  Sparkles, 
  Loader2, 
  Search, 
  Filter,
  CheckCircle2,
  X
} from "lucide-react";
import { MoodboardCard } from "@/app/components/MoodboardCard";
import { PreWeddingItem, PreWeddingCategory } from "@/app/data/preWeddingData";
import { PlanningCard } from "@/app/data/planningData";
import { PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { compressMultipleFiles } from "@/app/utils/imageCompressor";
import { toast } from "sonner";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose
} from "@/app/components/ui/drawer";

interface PreWeddingSectionProps {
  items: PreWeddingItem[];
  likedIds: string[];
  cards: PlanningCard[];
  checkedCriteria: Record<string, boolean>;
  notes: Record<string, PhotoNoteData>;
  onToggleCriterion: (id: string) => void;
  onToggleLike: (id: string) => void;
  onOpenNotes: (item: PreWeddingItem) => void;
  onDelete: (id: string) => void;
  onOpenLightbox: (item: PreWeddingItem) => void;
  onOpenAddDialog: () => void;
  onAddItem: (item: Omit<PreWeddingItem, "id">) => void;
  onAddBatchItems?: (items: Omit<PreWeddingItem, "id">[]) => void;
  onResetItems: () => void;
}

const filterOptions: { value: PreWeddingCategory | "favorites"; label: string }[] = [
  { value: "all", label: "Tudo" },
  { value: "natureza", label: "Campos & Montanhas" },
  { value: "floresta", label: "Floresta & Luz" },
  { value: "urbano", label: "Bar & Urbano" },
  { value: "pb", label: "Preto & Branco" },
  { value: "favorites", label: "Favoritas" }
];

export function PreWeddingSection({
  items,
  likedIds,
  cards,
  checkedCriteria,
  notes,
  onToggleCriterion,
  onToggleLike,
  onOpenNotes,
  onDelete,
  onOpenLightbox,
  onOpenAddDialog,
  onAddItem,
  onAddBatchItems,
  onResetItems
}: PreWeddingSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<PreWeddingCategory | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoteiroDrawerOpen, setIsRoteiroDrawerOpen] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    if (selectedFilter === "favorites") {
      if (!likedIds.includes(item.id)) return false;
    } else if (selectedFilter !== "all") {
      if (item.category !== selectedFilter) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.notes?.description?.toLowerCase().includes(q);
      const matchTags = item.notes?.tags?.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }

    return true;
  });

  const cardPW01 = cards.find((c) => c.id === "pw-01");

  // Handler de processamento em lote com compressão Canvas
  const processFilesBatch = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      toast.error("Selecione arquivos de imagem válidos (JPG, PNG, WEBP).");
      return;
    }

    try {
      setIsCompressing(true);
      const compressedList = await compressMultipleFiles(validFiles, 1600, 0.82);

      const targetCategory: PreWeddingCategory = selectedFilter === "favorites" || selectedFilter === "all" 
        ? "natureza" 
        : selectedFilter;

      const newItems: Omit<PreWeddingItem, "id">[] = compressedList.map((c) => ({
        title: c.title,
        imageUrl: c.imageUrl,
        category: targetCategory,
        notes: {
          description: "Foto adicionada via upload rápido de referências."
        }
      }));

      if (onAddBatchItems) {
        onAddBatchItems(newItems);
      } else {
        newItems.forEach((it) => onAddItem(it));
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao comprimir e enviar fotos.");
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* 1. Header do Acervo: Título editorial, explicação em sans-serif nítida e ações locais */}
      <div className="pt-1 pb-3 flex flex-col gap-2 border-b border-outline-variant/30">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2.5">
              <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl text-on-surface tracking-tight font-semibold">
                Todos os elementos
              </h1>
              <span className="font-body-md text-xs text-secondary font-medium">
                {filteredItems.length} referências
              </span>
            </div>
            <p className="font-body-md text-xs sm:text-sm text-on-surface/80 font-normal leading-relaxed max-w-2xl">
              Coleção sensorial de texturas, luzes e memórias do atelier de Camila & Carlos.
            </p>
          </div>

          {/* Ações Locais da Coleção (Desktop) */}
          <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
            {/* Quick Upload (Ação Secundária: discreta, borda suave) */}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  processFilesBatch(e.target.files);
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isCompressing}
              className="h-9 px-3.5 rounded-lg border border-outline-variant/40 bg-surface hover:bg-surface-container text-on-surface-variant font-body-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs active:scale-95"
            >
              {isCompressing ? (
                <>
                  <Loader2 className="size-3.5 animate-spin text-secondary" />
                  <span>Comprimindo...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="size-3.5 text-secondary" />
                  <span>Upload em lote</span>
                </>
              )}
            </button>

            {/* Nova Referência (Ação Primária: sólida, alto contraste) */}
            <button
              type="button"
              onClick={onOpenAddDialog}
              className="h-9 px-4 rounded-lg bg-primary text-on-primary font-body-md text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="size-3.5" />
              <span>Nova referência</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Roteiro Ativo: Explicação imediata antes da escolha e aproximação de Critérios */}
      {cardPW01 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 py-2.5 bg-surface-container-low/90 rounded-xl border border-outline-variant/30 text-xs shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold text-[11px] flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Roteiro ativo
            </span>
            <span className="font-semibold text-on-surface truncate">
              Bar Thunder & Orla Costa Azul
            </span>
            <span className="hidden md:inline text-on-surface-variant/70 text-[11px] truncate">
              — Rio das Ostras · T-60 dias · Luz suave e golden hour
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsRoteiroDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors self-start sm:self-auto pl-1 sm:pl-0"
          >
            <span>Ver critérios de direção ({Object.values(checkedCriteria).filter(Boolean).length}/{cardPW01.criteria.length})</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      )}

      {/* Roteiro & Critérios Drawer Sheet (Ruixen UI Drawer) */}
      <Drawer open={isRoteiroDrawerOpen} onOpenChange={setIsRoteiroDrawerOpen}>
        <DrawerContent className="max-h-[85vh] p-4 sm:p-6 bg-surface dark:bg-[#1C1A17] border-outline-variant/30">
          <DrawerHeader className="text-left px-0 pb-3">
            <DrawerTitle className="font-headline-md text-lg text-on-surface font-bold">
              Roteiro: Bar Thunder & Costa Azul
            </DrawerTitle>
            <DrawerDescription className="font-body-md text-xs text-on-surface-variant">
              Rio das Ostras · T-60 dias · Luz suave e golden hour
            </DrawerDescription>
          </DrawerHeader>

          {cardPW01 && (
            <div className="overflow-y-auto space-y-4 pt-2">
              <div>
                <h4 className="font-body-md text-xs text-secondary mb-2.5 font-semibold">
                  Critérios de Direção Fotográfica
                </h4>
                <div className="space-y-2">
                  {cardPW01.criteria.map((cr) => (
                    <label key={cr.id} className="flex items-start gap-2.5 text-xs text-on-surface cursor-pointer p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={Boolean(checkedCriteria[cr.id])}
                        onChange={() => onToggleCriterion(cr.id)}
                        className="mt-0.5 rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="leading-snug">{cr.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="text-xs text-on-surface-variant space-y-2 p-3 rounded-lg bg-surface-container/50 border border-outline-variant/20">
                <p className="leading-relaxed">
                  <strong className="text-on-surface">Objetivo Editorial:</strong> Evitar poses estáticas ou forçadas. O roteiro se divide entre a energia descontraída com a moto no Bar Thunder e a intimidade orgânica nas falésias e areia da Costa Azul.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={onResetItems}
                    className="text-xs text-secondary hover:underline flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="size-3" />
                    <span>Restaurar 58 referências originais</span>
                  </button>
                  <DrawerClose asChild>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-semibold"
                    >
                      Concluído
                    </button>
                  </DrawerClose>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* 3. Filtros e Controles de Exploração: Title Case estável, clareza e ritmo */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 py-1 flex items-center gap-1.5 no-scrollbar mask-scroll-fade-x">
          <div className="bg-surface-container/70 dark:bg-surface-container/40 backdrop-blur-md p-1 rounded-full border border-outline-variant/20 inline-flex items-center gap-1">
            {filterOptions.map((f) => {
              const isActive = selectedFilter === f.value;
              const isFav = f.value === "favorites";
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setSelectedFilter(f.value)}
                  className={`relative px-3.5 py-1.5 rounded-full font-body-md text-xs sm:text-[13px] whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {/* Tubelight Glow and Sliding Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="tubelight-active"
                      className="absolute inset-0 bg-primary rounded-full shadow-[0_0_12px_rgba(108,91,77,0.3)] -z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    >
                      <span className="w-3.5 h-0.5 bg-secondary rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_6px_var(--secondary)]" />
                    </motion.span>
                  )}

                  <span className="relative z-10">{f.label}</span>
                  {isFav && likedIds.length > 0 && (
                    <span className={`relative z-10 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                      isActive ? "bg-surface-container text-on-surface" : "bg-primary text-on-primary"
                    }`}>
                      {likedIds.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Busca contextual */}
        <div className="relative min-w-[220px]">
          <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar poses, clima, luz..."
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-on-surface placeholder:text-secondary/70 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Staggered Masonry Feed (Cosmos / Atelier Style) */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col items-center gap-2">
          <p className="font-headline-sm text-base text-on-surface">Nenhum elemento encontrado</p>
          <p className="text-xs text-on-surface-variant">Tente mudar o filtro ou adicione uma nova foto de inspiração.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter("all");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-semibold text-secondary hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 1100: 4 }}>
          <Masonry gutter="14px">
            {filteredItems.map((item, index) => (
              <MoodboardCard
                key={item.id}
                item={item}
                isLiked={likedIds.includes(item.id)}
                note={notes[item.id]}
                onToggleLike={onToggleLike}
                onOpenNotes={onOpenNotes}
                onDelete={onDelete}
                onOpenLightbox={onOpenLightbox}
                isPriority={index < 2}
                isAboveFold={index < 6}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}
