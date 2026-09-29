import { useState, useEffect } from "react";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter
} from "@/app/components/ui/drawer";
import { PreWeddingItem } from "@/app/data/preWeddingData";
import { Sparkles, Tag, Check, X, MessageSquareQuote, Plus } from "lucide-react";
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

export function PhotoNoteDrawer({
  item,
  isOpen,
  onClose,
  note,
  onSaveNote
}: PhotoNoteDrawerProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [newTagInput, setNewTagInput] = useState("");

  useEffect(() => {
    if (note) {
      setSelectedTags(note.tags || []);
      setComment(note.comment || "");
    } else {
      setSelectedTags([]);
      setComment("");
    }
    setNewTagInput("");
  }, [note, item]);

  if (!item) return null;

  const handleAddTag = () => {
    const trimmed = newTagInput.trim().replace(/^#/, "");
    if (!trimmed) return;
    if (selectedTags.includes(trimmed)) {
      toast.info("Essa tag já foi adicionada.");
      return;
    }
    setSelectedTags((prev) => [...prev, trimmed]);
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
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
              <span>Suas Observações</span>
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
                  Referência #{item.id} · Anote o que você mais gosta nesta foto
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          {/* Bride's Custom Style Tags (Created by the Bride, No Pre-Tags) */}
          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span className="flex items-center gap-1.5">
                <Tag className="size-3.5 text-secondary" />
                <span>Suas Tags de Estilo:</span>
              </span>
              <span className="text-[11px] font-normal text-on-surface-variant">
                (opcional · crie as suas)
              </span>
            </div>
            
            {/* Tag Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Ex.: vestido fluido, pôr do sol, abraço leve..."
                className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl px-3 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!newTagInput.trim()}
                className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface flex items-center gap-1 disabled:opacity-40 transition-colors"
              >
                <Plus className="size-3.5 text-secondary" />
                <span>Adicionar</span>
              </button>
            </div>

            {/* Render Bride's Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary text-on-primary shadow-xs"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-75 rounded-full p-0.5"
                      title="Remover tag"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bride's Custom Observation Input */}
          <div className="space-y-1.5 pt-3">
            <label htmlFor="bride-comment" className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <MessageSquareQuote className="size-3.5 text-secondary" />
              <span>O que você mais gosta nesta referência:</span>
            </label>
            <textarea
              id="bride-comment"
              placeholder="ex.: 'Amei a conexão leve do casal, a luz dourada do sol e o movimento do vestido ao vento...'"
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
              <span>Salvar Observação</span>
            </button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
