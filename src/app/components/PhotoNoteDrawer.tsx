import { useState, useEffect } from "react";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter,
  DrawerClose
} from "@/app/components/ui/drawer";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { Sparkles, Tag, Check, X, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";

export interface PhotoNoteData {
  tags: string[];
  comment: string;
  updatedAt?: string;
}

interface PhotoNoteDrawerProps {
  item: PreWeddingItem | null;
  isOpen: boolean;
  onClose: () => void;
  note: PhotoNoteData | undefined;
  onSaveNote: (itemId: string, note: PhotoNoteData) => void;
}

const AVAILABLE_INTENTION_TAGS = [
  "Quero essa pose",
  "Gostei da luz",
  "Amei o figurino",
  "Espontânea",
  "Cenário praia/orla",
  "Foco no casal",
  "Movimento & Dinâmica"
];

export function PhotoNoteDrawer({
  item,
  isOpen,
  onClose,
  note,
  onSaveNote
}: PhotoNoteDrawerProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (note) {
      setSelectedTags(note.tags || []);
      setComment(note.comment || "");
    } else {
      setSelectedTags([]);
      setComment("");
    }
  }, [note, item]);

  if (!item) return null;

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    onSaveNote(item.id, {
      tags: selectedTags,
      comment: comment.trim(),
      updatedAt: new Date().toISOString()
    });
    toast.success("Anotação salva no seu roteiro!", {
      description: `Foto #${item.id}: "${item.title}"`,
      duration: 2500
    });
    onClose();
  };

  const handleRemove = () => {
    onSaveNote(item.id, {
      tags: [],
      comment: "",
      updatedAt: new Date().toISOString()
    });
    toast("Anotação removida da foto", { duration: 2000 });
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-surface text-on-surface border-t border-outline-variant/30 max-h-[88vh] rounded-t-[28px] focus:outline-none">
        <div className="mx-auto w-full max-w-lg overflow-y-auto px-5 pt-3 pb-8">
          <DrawerHeader className="px-0 pt-1 pb-3 text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              <Sparkles className="size-3.5" />
              <span>Nota de Direção da Noiva</span>
            </div>
            
            <div className="flex items-center gap-3.5 mt-1">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="size-16 object-cover rounded-xl border border-outline-variant/30 shadow-xs flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <DrawerTitle className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-tight tracking-tight truncate">
                  {item.title}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-on-surface-variant mt-0.5">
                  Foto #{item.id} · Defina o que você mais ama nesta referência
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          {/* Quick Intention Tags */}
          <div className="space-y-2 py-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
              <Tag className="size-3.5 text-secondary" />
              <span>Tags Rápidas de Intenção:</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_INTENTION_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleToggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 border active:scale-95 ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container text-on-surface-variant border-outline-variant/20 hover:border-outline-variant/50"
                    }`}
                  >
                    {isSelected && <Check className="size-3 text-secondary" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Short Comment Input */}
          <div className="space-y-1.5 pt-3">
            <label htmlFor="bride-comment" className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <MessageSquareQuote className="size-3.5 text-secondary" />
              <span>Sua observação para a equipe Versa Visual:</span>
            </label>
            <textarea
              id="bride-comment"
              placeholder="ex.: 'Amei essa conexão, queremos fazer similar na orla de Costa Azul com vento natural...'"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary resize-none leading-relaxed"
            />
          </div>

          <DrawerFooter className="px-0 pt-4 pb-0 flex flex-row items-center gap-2.5">
            {note && (note.tags?.length > 0 || note.comment) && (
              <button
                type="button"
                onClick={handleRemove}
                className="h-11 px-4 rounded-xl border border-outline-variant/30 text-xs font-semibold text-error hover:bg-error/10 transition-colors"
              >
                Limpar
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary hover:opacity-90 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
            >
              <Check className="size-4" />
              <span>Salvar no Roteiro</span>
            </button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
