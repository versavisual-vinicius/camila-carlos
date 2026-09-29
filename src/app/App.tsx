import { useState, useEffect } from "react";
import { PRE_WEDDING_ITEMS, PreWeddingItem } from "@/app/data/preWeddingData";
import { 
  INITIAL_SHOT_LIST_GROUPS, 
  KEY_VENDORS,
  ShotListGroup, 
  ShotListItem,
  KeyVendor
} from "@/app/data/shotListData";
import { Header, ActiveTab } from "@/app/components/Header";
import { PreWeddingSection } from "@/app/components/PreWeddingSection";
import { CuratedVendorsSection } from "@/app/components/CuratedVendorsSection";
import { RoteiroPrdSection } from "@/app/components/RoteiroPrdSection";
import { LightboxModal } from "@/app/components/LightboxModal";
import { AddItemDialog } from "@/app/components/AddItemDialog";
import { PhotoNoteDrawer, PhotoNoteData } from "@/app/components/PhotoNoteDrawer";
import { ShareFabModal } from "@/app/components/ShareFabModal";
import { MobileBottomDock } from "@/app/components/MobileBottomDock";
import { Footer } from "@/app/components/Footer";
import { Toaster, toast } from "sonner";

export default function App() {
  // Theme state: default to light
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("camila_carlos_theme");
    return saved !== null ? saved === "dark" : false;
  });

  // Active navigation tab (3 canonical tabs: referencias, roteiro, fornecedores)
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const saved = localStorage.getItem("camila_carlos_active_tab");
    if (saved === "referencias" || saved === "roteiro" || saved === "fornecedores") {
      return saved;
    }
    if (saved === "locais") return "fornecedores";
    return "referencias";
  });

  // Moodboard items state (58 canonical pre-wedding items + user added)
  const [items, setItems] = useState<PreWeddingItem[]>(() => {
    const saved = localStorage.getItem("camila_carlos_moodboard_items");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading moodboard items", e);
      }
    }
    return PRE_WEDDING_ITEMS;
  });

  // Liked/Favorited IDs
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("camila_carlos_liked_ids");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading liked IDs", e);
      }
    }
    return [];
  });

  // Photo contextual notes by bride
  const [notes, setNotes] = useState<Record<string, PhotoNoteData>>(() => {
    const saved = localStorage.getItem("camila_carlos_photo_notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading photo notes", e);
      }
    }
    return {};
  });

  // Shot List modular groups state com migração de versão inteligente
  const [shotListGroups, setShotListGroups] = useState<ShotListGroup[]>(() => {
    const version = localStorage.getItem("camila_carlos_shotlist_version");
    if (version !== "v3_editorial") {
      localStorage.setItem("camila_carlos_shotlist_version", "v3_editorial");
      localStorage.setItem("camila_carlos_shotlist", JSON.stringify(INITIAL_SHOT_LIST_GROUPS));
      return INITIAL_SHOT_LIST_GROUPS;
    }
    const saved = localStorage.getItem("camila_carlos_shotlist");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading shot list", e);
      }
    }
    return INITIAL_SHOT_LIST_GROUPS;
  });

  // Fornecedores Chave: Apenas Espaço Lux e Versa Visual pré-preenchidos + customizados da noiva
  const [vendors, setVendors] = useState<KeyVendor[]>(() => {
    const version = localStorage.getItem("camila_carlos_vendors_version");
    if (version !== "v3_real_vendors") {
      localStorage.setItem("camila_carlos_vendors_version", "v3_real_vendors");
      localStorage.setItem("camila_carlos_vendors", JSON.stringify(KEY_VENDORS));
      return KEY_VENDORS;
    }
    const saved = localStorage.getItem("camila_carlos_vendors");
    if (saved) {
      try {
        const parsed: KeyVendor[] = JSON.parse(saved);
        // Filtrar possíveis resíduos de fornecedores mock antigos
        return parsed.filter(v => v.id === "ven-01" || v.id === "ven-02" || v.isCustom);
      } catch (e) {
        console.error("Error loading vendors", e);
      }
    }
    return KEY_VENDORS;
  });

  // Lightbox, Modal & Drawer states
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PreWeddingItem | null>(null);
  const [selectedNoteItem, setSelectedNoteItem] = useState<PreWeddingItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("camila_carlos_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("camila_carlos_theme", "light");
    }
  }, [isDarkMode]);

  // Persist active tab
  useEffect(() => {
    localStorage.setItem("camila_carlos_active_tab", activeTab);
  }, [activeTab]);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem("camila_carlos_moodboard_items", JSON.stringify(items));
    } catch (e) {
      console.warn("Aviso de cota ao persistir referências no localStorage", e);
    }
  }, [items]);

  // Persist likes
  useEffect(() => {
    try {
      localStorage.setItem("camila_carlos_liked_ids", JSON.stringify(likedIds));
    } catch (e) {
      console.warn("Erro ao persistir favoritas no localStorage", e);
    }
  }, [likedIds]);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem("camila_carlos_photo_notes", JSON.stringify(notes));
    } catch (e) {
      console.warn("Erro ao persistir notas no localStorage", e);
    }
  }, [notes]);

  // Persist shot list
  useEffect(() => {
    try {
      localStorage.setItem("camila_carlos_shotlist", JSON.stringify(shotListGroups));
    } catch (e) {
      console.warn("Erro ao persistir shot list no localStorage", e);
    }
  }, [shotListGroups]);

  // Persist vendors
  useEffect(() => {
    try {
      localStorage.setItem("camila_carlos_vendors", JSON.stringify(vendors));
    } catch (e) {
      console.warn("Erro ao persistir fornecedores no localStorage", e);
    }
  }, [vendors]);

  // Toggle favorite / bookmark
  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        return prev.filter((item) => item !== id);
      } else {
        toast.success("Foto salva nas favoritas de Camila & Carlos!", {
          description: "Referência adicionada às inspirações prioritárias."
        });
        return [...prev, id];
      }
    });
  };

  // Save photo note
  const handleSavePhotoNote = (itemId: string, note: PhotoNoteData) => {
    setNotes((prev) => ({
      ...prev,
      [itemId]: note
    }));
  };

  // Update shot list item
  const handleUpdateShotItem = (groupId: string, itemId: string, updates: Partial<ShotListItem>) => {
    setShotListGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          items: g.items.map((i) => (i.id === itemId ? { ...i, ...updates } : i))
        };
      })
    );
    toast.success("Salvo no seu roteiro", { duration: 1500 });
  };

  // Add custom shot item
  const handleAddShotItem = (groupId: string, title: string) => {
    const newItem: ShotListItem = {
      id: `custom-${Date.now()}`,
      title,
      names: "",
      isMandatory: true,
      isCompleted: false
    };
    setShotListGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          items: [...g.items, newItem]
        };
      })
    );
  };

  // Delete custom shot item
  const handleDeleteShotItem = (groupId: string, itemId: string) => {
    setShotListGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          items: g.items.filter((i) => i.id !== itemId)
        };
      })
    );
    toast.success("Foto removida da Shot List");
  };

  // Reset shot list to official Versa Visual template
  const handleResetShotList = () => {
    if (window.confirm("Deseja restaurar a Shot List original com o padrão editorial da Versa Visual?")) {
      setShotListGroups(INITIAL_SHOT_LIST_GROUPS);
      localStorage.setItem("camila_carlos_shotlist_version", "v3_editorial");
      localStorage.setItem("camila_carlos_shotlist", JSON.stringify(INITIAL_SHOT_LIST_GROUPS));
      toast.success("Shot List restaurada com o protocolo oficial!");
    }
  };

  // Vendor handlers
  const handleAddVendor = (newVendor: Omit<KeyVendor, "id">) => {
    const vendor: KeyVendor = {
      ...newVendor,
      id: `ven-${Date.now()}`,
      isCustom: true
    };
    setVendors((prev) => [...prev, vendor]);
    toast.success("Fornecedor adicionado com sucesso!");
  };

  const handleUpdateVendor = (id: string, updates: Partial<KeyVendor>) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    toast.success("Dados do fornecedor atualizados!");
  };

  const handleDeleteVendor = (id: string) => {
    if (window.confirm("Deseja remover este fornecedor da lista?")) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
      toast.success("Fornecedor removido.");
    }
  };

  const handleResetVendors = () => {
    if (window.confirm("Deseja restaurar os parceiros confirmados?")) {
      setVendors(KEY_VENDORS);
      localStorage.setItem("camila_carlos_vendors_version", "v3_real_vendors");
      localStorage.setItem("camila_carlos_vendors", JSON.stringify(KEY_VENDORS));
      toast.success("Catálogo restaurado com os parceiros confirmados!");
    }
  };

  // Delete moodboard item
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setLikedIds((prev) => prev.filter((likedId) => likedId !== id));
    if (selectedLightboxItem?.id === id) {
      setSelectedLightboxItem(null);
    }
  };

  // Add custom item
  const handleAddItem = (newItem: Omit<PreWeddingItem, "id">) => {
    const item: PreWeddingItem = {
      ...newItem,
      id: `custom-${Date.now()}`
    };
    setItems((prev) => [item, ...prev]);
  };

  // Add batch of custom items with Undo action
  const handleAddBatchItems = (newItems: Omit<PreWeddingItem, "id">[]) => {
    if (newItems.length === 0) return;

    const timestamp = Date.now();
    const createdItems: PreWeddingItem[] = newItems.map((item, idx) => ({
      ...item,
      id: `custom-upload-${timestamp}-${idx}`
    }));

    const createdIds = createdItems.map((item) => item.id);

    setItems((prev) => [...createdItems, ...prev]);

    toast.success(
      `${createdItems.length} ${createdItems.length === 1 ? "nova referência adicionada" : "novas referências adicionadas"} ao moodboard!`,
      {
        description: "Comprimidas com otimização Retina para o roteiro.",
        duration: 6000,
        action: {
          label: "Desfazer",
          onClick: () => {
            setItems((prev) => prev.filter((item) => !createdIds.includes(item.id)));
            toast.info("Upload desfeito com sucesso.");
          }
        }
      }
    );
  };

  // Reset to original 58 items
  const handleResetItems = () => {
    if (window.confirm("Deseja restaurar as 58 referências originais do Pré-Wedding de Camila & Carlos?")) {
      setItems(PRE_WEDDING_ITEMS);
      localStorage.removeItem("camila_carlos_moodboard_items");
      toast.success("Acervo original restaurado com sucesso!");
    }
  };

  const allShotItems = shotListGroups.flatMap((g) => g.items);
  const totalShotCount = allShotItems.length;
  const completedShotCount = allShotItems.filter((i) => i.isCompleted).length;
  const pendingShotCount = totalShotCount - completedShotCount;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased transition-colors duration-200 pb-24 md:pb-0">
      {/* Toast Notification Provider */}
      <Toaster position="top-center" richColors closeButton />

      {/* Global Header com Branding Versa Visual & Abas de Navegação */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        totalPhotos={items.length}
        totalFavorites={likedIds.length}
        completedShotCount={completedShotCount}
        totalShotCount={totalShotCount}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TELA 1: REFERÊNCIAS VISUAIS (Moodboard Direto) */}
        {activeTab === "referencias" && (
          <PreWeddingSection
            items={items}
            likedIds={likedIds}
            notes={notes}
            onToggleLike={handleToggleLike}
            onOpenNotes={(item) => setSelectedNoteItem(item)}
            onDelete={handleDeleteItem}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            onOpenAddDialog={() => setIsAddDialogOpen(true)}
            onAddItem={handleAddItem}
            onAddBatchItems={handleAddBatchItems}
            onResetItems={handleResetItems}
          />
        )}

        {/* TELA 2: ROTEIRO FOTOGRÁFICO DO CASAMENTO & PRÉ-WEDDING */}
        {activeTab === "roteiro" && (
          <RoteiroPrdSection
            shotListGroups={shotListGroups}
            onUpdateShotItem={handleUpdateShotItem}
            onAddShotItem={handleAddShotItem}
            onDeleteShotItem={handleDeleteShotItem}
            onResetShotList={handleResetShotList}
          />
        )}

        {/* TELA 3: FORNECEDORES & LOCAIS */}
        {activeTab === "fornecedores" && (
          <CuratedVendorsSection
            vendors={vendors}
            onAddVendor={handleAddVendor}
            onUpdateVendor={handleUpdateVendor}
            onDeleteVendor={handleDeleteVendor}
            onResetVendors={handleResetVendors}
          />
        )}
      </main>

      {/* Contextual Notes Drawer por Foto (Foco na Noiva) */}
      <PhotoNoteDrawer
        item={selectedNoteItem}
        isOpen={Boolean(selectedNoteItem)}
        onClose={() => setSelectedNoteItem(null)}
        note={selectedNoteItem ? notes[selectedNoteItem.id] : undefined}
        onSaveNote={handleSavePhotoNote}
      />

      {/* Compartilhamento WhatsApp */}
      <ShareFabModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        totalPhotos={items.length}
        totalFavorites={likedIds.length}
        completedShotCount={completedShotCount}
        totalShotCount={totalShotCount}
      />

      {/* Barra de Navegação Inferior Mobile */}
      <MobileBottomDock
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={likedIds.length}
        pendingShotCount={pendingShotCount}
      />

      {/* Lightbox Modal com Campo Editável da Noiva */}
      <LightboxModal
        item={selectedLightboxItem}
        items={items}
        isOpen={Boolean(selectedLightboxItem)}
        onClose={() => setSelectedLightboxItem(null)}
        onSelect={(item) => setSelectedLightboxItem(item)}
        isLiked={selectedLightboxItem ? likedIds.includes(selectedLightboxItem.id) : false}
        onToggleLike={handleToggleLike}
        note={selectedLightboxItem ? notes[selectedLightboxItem.id] : undefined}
        onSaveNote={handleSavePhotoNote}
      />

      {/* Add Item Dialog com Pasta de Destino e Tags Autorais */}
      <AddItemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Footer com Versa Visual */}
      <Footer />
    </div>
  );
}