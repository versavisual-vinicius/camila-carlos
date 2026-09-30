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
  existingTags?: string[];
}

export function PhotoNoteDrawer({
  item,
  isOpen,
  onClose,
  note,
  onSaveNote,
  existingTags = []
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
    toast.success("Suas preferências foram salvas!", {
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

  // Tags já criadas em outras fotos que ainda não estão nesta foto
  const reusableTags = existingTags.filter((t) => !selectedTags.includes(t));

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-surface text-on-surface border-t border-outline-variant/30 max-h-[88vh] rounded-t-[28px] focus:outline-none">
        <div className="mx-auto w-full max-w-lg overflow-y-auto px-5 pt-3 pb-8">
          <DrawerHeader className="px-0 pt-1 pb-3 text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
              <Sparkles className="size-3.5" />
              <span>Suas Preferências</span>
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
                  Referência #{item.id} · Anote com suas próprias palavras o que chama sua atenção
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          {/* Bride's Custom Style Tags (Created by the Bride, No Pre-Tags) */}
          <div className="space-y-2 py-2">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span className="flex items-center gap-1.5">
                <Tag className="size-3.5 text-secondary" />
                <span>Suas tags de estilo:</span>
              </span>
              <span className="text-[11px] font-normal text-on-surface-variant">
                (opcional · crie ou reutilize)
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
                className="flex-1 bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!newTagInput.trim()}
                className="px-3.5 py-2 rounded-xl bg-surface-container dark:bg-surface-container-high hover:bg-surface-container-highest text-xs font-semibold text-on-surface flex items-center gap-1.5 disabled:opacity-40 transition-all shadow-2xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <Plus className="size-3.5 text-secondary" />
                <span>Adicionar</span>
              </button>
            </div>

            {/* Reusable Tags Pill List */}
            {reusableTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-on-surface-variant mr-1">Reutilizar:</span>
                {reusableTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTags((prev) => [...prev, tag])}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-surface-container hover:bg-surface-container-high text-secondary border border-outline-variant/30 transition-colors"
                  >
                    <span>+ #{tag}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Render Selected Bride's Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-on-primary shadow-xs"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-75 rounded-full p-0.5"
                      title="Remover tag"
                      aria-label={`Remover tag ${tag}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Campo Central Conforme PRD: "O que você gosta nesta foto?" */}
          <div className="space-y-1.5 pt-3">
            <label htmlFor="bride-comment" className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <MessageSquareQuote className="size-3.5 text-secondary" />
              <span>O que você gosta nesta foto?</span>
            </label>
            <textarea
              id="bride-comment"
              placeholder="Escreva com suas próprias palavras o que você gosta nesta foto (a conexão do casal, a luz do sol, o movimento do vestido, a pose leve...)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none leading-relaxed"
            />
          </div>

          <DrawerFooter className="px-0 pt-4 pb-0 flex flex-row items-center gap-2.5">
            {note && (note.tags?.length > 0 || note.comment) && (
              <button
                type="button"
                onClick={handleRemove}
                className="h-11 px-4 rounded-xl border border-outline-variant/30 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40"
              >
                Limpar
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary hover:opacity-90 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Check className="size-4" />
              <span>Salvar Preferências</span>
            </button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
