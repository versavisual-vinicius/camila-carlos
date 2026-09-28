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
      <DrawerContent className="bg-white dark:bg-[#1c1c1e] text-[#222222] dark:text-white border-t border-[#ebebeb] dark:border-white/10 max-h-[88vh] rounded-t-[28px] focus:outline-none">
        <div className="mx-auto w-full max-w-lg overflow-y-auto px-5 pt-3 pb-8">
          <DrawerHeader className="px-0 pt-1 pb-3 text-left">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff385c] uppercase tracking-wider mb-1">
              <Sparkles className="size-3.5" />
              <span>Nota de Direção da Noiva</span>
            </div>
            
            <div className="flex items-center gap-3.5 mt-1">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="size-16 object-cover rounded-[12px] border border-[#ebebeb] dark:border-white/10 shadow-sm flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <DrawerTitle className="text-base sm:text-lg font-bold text-[#222222] dark:text-white leading-tight tracking-[-0.44px] truncate">
                  {item.title}
                </DrawerTitle>
                <DrawerDescription className="text-xs text-[#6a6a6a] dark:text-[#a0a0a0] mt-0.5">
                  Foto #{item.id} · Defina o que você mais ama nesta referência
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          {/* Quick Intention Tags */}
          <div className="space-y-2 py-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#222222] dark:text-white">
              <Tag className="size-3.5 text-[#ff385c]" />
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
                        ? "bg-[#222222] text-white border-[#222222] shadow-sm"
                        : "bg-[#f7f7f7] dark:bg-[#242426] text-[#6a6a6a] dark:text-[#a0a0a0] border-[#ebebeb] dark:border-white/5 hover:border-[#c1c1c1]"
                    }`}
                  >
                    {isSelected && <Check className="size-3 text-[#ff385c]" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Short Comment Input */}
          <div className="space-y-1.5 pt-3">
            <label htmlFor="bride-comment" className="text-xs font-bold text-[#222222] dark:text-white flex items-center gap-1.5">
              <MessageSquareQuote className="size-3.5 text-[#ff385c]" />
              <span>Sua observação para a equipe Versa Visual:</span>
            </label>
            <textarea
              id="bride-comment"
              placeholder="ex.: 'Amei essa conexão, queremos fazer similar na orla de Costa Azul com vento natural...'"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm p-3 rounded-[12px] bg-[#f7f7f7] dark:bg-[#242426] border border-[#ebebeb] dark:border-white/10 text-[#222222] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff385c] resize-none leading-relaxed"
            />
          </div>

          <DrawerFooter className="px-0 pt-4 pb-0 flex flex-row items-center gap-2.5">
            {note && (note.tags?.length > 0 || note.comment) && (
              <button
                type="button"
                onClick={handleRemove}
                className="h-11 px-4 rounded-[12px] border border-[#ebebeb] dark:border-white/10 text-xs font-semibold text-[#c13515] hover:bg-[#fff0f2] transition-colors"
              >
                Limpar
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 h-11 rounded-[12px] bg-[#222222] hover:bg-[#ff385c] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
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
