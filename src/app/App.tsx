import { useState, useEffect } from "react";
import { PRE_WEDDING_ITEMS, PreWeddingItem } from "@/app/data/preWeddingData";
import { PLANNING_SECTIONS } from "@/app/data/planningData";
import { 
  INITIAL_SHOT_LIST_GROUPS, 
  SOLAR_TIMELINE_BLOCKS,
  KEY_VENDORS,
  ShotListGroup, 
  ShotListItem,
  KeyVendor
} from "@/app/data/shotListData";
import { generateFullDossierPdf, generateCeremonialAltarPdf } from "@/app/utils/pdfGenerator";
import { Header, ActiveTab } from "@/app/components/Header";
import { PreWeddingSection } from "@/app/components/PreWeddingSection";
import { WeddingLogisticsSection } from "@/app/components/WeddingLogisticsSection";
import { ActionBacklogSection } from "@/app/components/ActionBacklogSection";
import { LightboxModal } from "@/app/components/LightboxModal";
import { AddItemDialog } from "@/app/components/AddItemDialog";
import { ManualDaNoivaModal } from "@/app/components/ManualDaNoivaModal";
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

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("pre-wedding");

  // Moodboard items state
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
    if (version !== "v2_editorial") {
      localStorage.setItem("camila_carlos_shotlist_version", "v2_editorial");
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

  // Fornecedores Chave com persistência local
  const [vendors, setVendors] = useState<KeyVendor[]>(() => {
    const saved = localStorage.getItem("camila_carlos_vendors");
    if (saved) {
      try {
        const parsed: KeyVendor[] = JSON.parse(saved);
        return parsed.map((v) =>
          v.id === "ven-03" ? { ...v, phone: "5522997624631" } : v
        );
      } catch (e) {
        console.error("Error loading vendors", e);
      }
    }
    return KEY_VENDORS;
  });

  // Sensitive Operational Alerts text
  const [sensitiveAlerts, setSensitiveAlerts] = useState<string>(() => {
    return (
      localStorage.getItem("camila_carlos_sensitive_notes") ||
      "Atenção cerimonial: pais separados, evitar fotos lado a lado. Avó materna tem mobilidade reduzida, priorizar cadeiras na frente do altar."
    );
  });

  // Checked criteria for all sections
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("camila_carlos_criteria");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading criteria", e);
      }
    }
    return {};
  });

  // Focal point contact for Wedding Logistics
  const [focalPointData, setFocalPointData] = useState<{ name: string; phone: string }>(() => {
    const saved = localStorage.getItem("camila_carlos_focal_point");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error loading focal point", e);
      }
    }
    return { name: "", phone: "" };
  });

  // Lightbox, Modal & Drawer states
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<PreWeddingItem | null>(null);
  const [selectedNoteItem, setSelectedNoteItem] = useState<PreWeddingItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
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

  // Persist items
  useEffect(() => {
    localStorage.setItem("camila_carlos_moodboard_items", JSON.stringify(items));
  }, [items]);

  // Persist likes
  useEffect(() => {
    localStorage.setItem("camila_carlos_liked_ids", JSON.stringify(likedIds));
  }, [likedIds]);

  // Persist notes
  useEffect(() => {
    localStorage.setItem("camila_carlos_photo_notes", JSON.stringify(notes));
  }, [notes]);

  // Persist shot list
  useEffect(() => {
    localStorage.setItem("camila_carlos_shotlist", JSON.stringify(shotListGroups));
  }, [shotListGroups]);

  // Persist vendors
  useEffect(() => {
    localStorage.setItem("camila_carlos_vendors", JSON.stringify(vendors));
  }, [vendors]);

  // Persist sensitive notes
  const handleSaveSensitiveAlerts = (text: string) => {
    setSensitiveAlerts(text);
    localStorage.setItem("camila_carlos_sensitive_notes", text);
  };

  // Persist focal point
  const handleSaveFocalPoint = (data: { name: string; phone: string }) => {
    setFocalPointData(data);
    localStorage.setItem("camila_carlos_focal_point", JSON.stringify(data));
  };

  // Toggle favorite / like
  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => {
      const isLiked = prev.includes(id);
      if (isLiked) {
        return prev.filter((item) => item !== id);
      } else {
        toast.success("Foto salva nas favoritas de Camila & Carlos!", {
          description: "Referência adicionada ao painel de prioridades."
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
      localStorage.setItem("camila_carlos_shotlist_version", "v2_editorial");
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
    if (window.confirm("Deseja restaurar os fornecedores oficiais recomendados?")) {
      setVendors(KEY_VENDORS);
      localStorage.removeItem("camila_carlos_vendors");
      toast.success("Catálogo de fornecedores restaurado!");
    }
  };

  // PDF Generator Handlers
  const handleDownloadFullDossier = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          generateFullDossierPdf({
            shotListGroups,
            timelineBlocks: SOLAR_TIMELINE_BLOCKS,
            vendors,
            sensitiveAlerts,
            focalPoint: focalPointData
          });
          resolve(true);
        }, 200);
      }),
      {
        loading: "Gerando Dossiê Executivo em PDF...",
        success: "Dossiê Executivo baixado no dispositivo!",
        error: "Erro ao gerar PDF"
      }
    );
  };

  const handleDownloadCeremonialAltar = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          generateCeremonialAltarPdf({
            shotListGroups,
            focalPoint: focalPointData,
            sensitiveAlerts
          });
          resolve(true);
        }, 200);
      }),
      {
        loading: "Gerando Ficha de Altar do Cerimonial...",
        success: "Ficha de Altar baixada com sucesso!",
        error: "Erro ao gerar PDF"
      }
    );
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
      `${createdItems.length} ${createdItems.length === 1 ? "nova foto adicionada" : "novas fotos adicionadas"} ao Moodboard!`,
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

  // Toggle criterion
  const handleToggleCriterion = (id: string) => {
    setCheckedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    toast.success("Critério atualizado no roteiro", { duration: 1500 });
  };

  const preWeddingCards = PLANNING_SECTIONS.find((s) => s.id === "pre-wedding")?.cards || [];

  const allShotItems = shotListGroups.flatMap((g) => g.items);
  const totalShotCount = allShotItems.length;
  const completedShotCount = allShotItems.filter((i) => i.isCompleted).length;
  const pendingShotCount = totalShotCount - completedShotCount;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-[#222222] dark:text-[#F7F7F7] transition-colors duration-200 selection:bg-[#ff385c]/20 selection:text-[#ff385c] pb-24 md:pb-0">
      {/* Toast Notification Provider */}
      <Toaster position="top-center" richColors closeButton />

      {/* Global Header com Stepper de Jornada */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        totalPhotos={items.length}
        totalFavorites={likedIds.length}
        completedShotCount={completedShotCount}
        totalShotCount={totalShotCount}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "pre-wedding" && (
          <PreWeddingSection
            items={items}
            likedIds={likedIds}
            cards={preWeddingCards}
            checkedCriteria={checkedCriteria}
            notes={notes}
            onToggleCriterion={handleToggleCriterion}
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

        {activeTab === "casamento" && (
          <WeddingLogisticsSection
            shotListGroups={shotListGroups}
            onUpdateShotItem={handleUpdateShotItem}
            onAddShotItem={handleAddShotItem}
            onDeleteShotItem={handleDeleteShotItem}
            onResetShotList={handleResetShotList}
            sensitiveAlerts={sensitiveAlerts}
            onSaveSensitiveAlerts={handleSaveSensitiveAlerts}
            focalPointData={focalPointData}
            onSaveFocalPoint={handleSaveFocalPoint}
            vendors={vendors}
            onAddVendor={handleAddVendor}
            onUpdateVendor={handleUpdateVendor}
            onDeleteVendor={handleDeleteVendor}
            onResetVendors={handleResetVendors}
            onDownloadFullDossier={handleDownloadFullDossier}
            onDownloadCeremonialAltar={handleDownloadCeremonialAltar}
          />
        )}

        {activeTab === "acoes" && (
          <ActionBacklogSection
            onOpenManual={() => setIsManualOpen(true)}
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onDownloadFullDossier={handleDownloadFullDossier}
            onDownloadCeremonialAltar={handleDownloadCeremonialAltar}
          />
        )}
      </main>

      {/* Contextual Notes Drawer por Foto */}
      <PhotoNoteDrawer
        item={selectedNoteItem}
        isOpen={!!selectedNoteItem}
        onClose={() => setSelectedNoteItem(null)}
        note={selectedNoteItem ? notes[selectedNoteItem.id] : undefined}
        onSaveNote={handleSavePhotoNote}
      />

      {/* FAB de Compartilhamento & Exportação WhatsApp */}
      <ShareFabModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        totalPhotos={items.length}
        totalFavorites={likedIds.length}
        completedShotCount={completedShotCount}
        totalShotCount={totalShotCount}
      />

      {/* Mobile Bottom Dock (Touch-First 48x48px) */}
      <MobileBottomDock
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={likedIds.length}
        pendingShotCount={pendingShotCount}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedLightboxItem}
        items={items}
        isOpen={!!selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onSelect={(item) => setSelectedLightboxItem(item)}
        isLiked={selectedLightboxItem ? likedIds.includes(selectedLightboxItem.id) : false}
        onToggleLike={handleToggleLike}
      />

      {/* Add Item Dialog */}
      <AddItemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Manual da Noiva Modal */}
      <ManualDaNoivaModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}