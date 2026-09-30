import { useState, useEffect } from "react";
import { PRE_WEDDING_ITEMS, PreWeddingItem } from "@/app/data/preWeddingData";
import { 
  INITIAL_SHOT_LIST_GROUPS, 
  KEY_VENDORS,
  ShotListGroup, 
  ShotListItem,
  KeyVendor,
  PHOTOGRAPHY_TIMELINE_BLOCKS
} from "@/app/data/shotListData";
import { generateFullDossierPdf } from "@/app/utils/pdfGenerator";
import { Header, ActiveTab } from "@/app/components/Header";
import { OverviewSection } from "@/app/components/OverviewSection";
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
import { Download, Share2, Loader2 } from "lucide-react";

export default function App() {
  // Theme state: default to light
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("camila_carlos_theme");
    return saved !== null ? saved === "dark" : false;
  });

  // Active navigation tab (4 canonical areas: visao-geral, referencias, roteiro, fornecedores)
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const saved = localStorage.getItem("camila_carlos_active_tab");
    if (saved === "visao-geral" || saved === "referencias" || saved === "roteiro" || saved === "fornecedores") {
      return saved;
    }
    if (saved === "locais") return "fornecedores";
    return "visao-geral";
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

  // Exportar Roteiro em PDF (Stitch Desktop & Mobile Reference)
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const handleExportRoteiro = async () => {
    try {
      setIsExportingPdf(true);
      toast.loading("Gerando Resumo do Roteiro em PDF...", { id: "export-pdf" });
      await generateFullDossierPdf({
        shotListGroups,
        timelineBlocks: PHOTOGRAPHY_TIMELINE_BLOCKS,
        vendors
      });
      toast.success("Resumo do Roteiro baixado com sucesso!", {
        id: "export-pdf",
        description: "Documento formatado em A4 pronto para impressão física ou envio ao cerimonial."
      });
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
      toast.error("Não foi possível gerar o PDF.", { id: "export-pdf" });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const allShotItems = shotListGroups.flatMap((g) => g.items);
  const totalShotCount = allShotItems.length;
  const completedShotCount = allShotItems.filter((i) => i.isCompleted).length;
  const pendingShotCount = totalShotCount - completedShotCount;

  // Todas as tags únicas criadas pela noiva para reutilização rápida
  const allExistingTags = Array.from(
    new Set(Object.values(notes).flatMap((n) => n.tags || []))
  );

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
        onExportRoteiro={handleExportRoteiro}
        isExporting={isExportingPdf}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Hero Banner: Apenas nas abas internas (Referências, Roteiro, Fornecedores) */}
        {activeTab !== "visao-geral" && (
          <section className="rounded-3xl border border-outline-variant/25 bg-surface-container-lowest dark:bg-card p-5 sm:p-6 shadow-airbnb-card mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
              {/* Couple & Photographer Identification */}
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-secondary/30 dark:ring-secondary/50 shadow-inner bg-surface-container">
                  <img
                    src="/pre-wedding/01_451d03f1a458a64838b28633e494ceb2.jpg"
                    alt="Camila & Carlos"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/15 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Jornada Ativa
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-on-surface">Camila & Carlos</h2>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-secondary mt-1">
                    <span>Fotografia autoral por <strong className="text-on-surface font-semibold">Vinicius Cunha — Versa Visual</strong></span>
                    <span>•</span>
                    <span>Rio das Ostras & Costa Azul</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Espaço Lux</span>
                  </div>
                </div>
              </div>

              {/* Triple Metric Counters (Stitch Airbnb Style with Keyboard Access) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 min-w-[280px] sm:min-w-[360px]">
                <div 
                  onClick={() => setActiveTab("referencias")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveTab("referencias");
                    }
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border py-3 sm:py-3.5 px-3 text-center shadow-xs cursor-pointer hover:bg-surface-container active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all select-none ${
                    activeTab === "referencias"
                      ? "border-primary/40 bg-surface-container-low dark:bg-surface-container/70 ring-1 ring-primary/20"
                      : "border-outline-variant/20 bg-surface-container-low/70 dark:bg-surface-container/40"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Ver todas as fotos no acervo"
                  aria-selected={activeTab === "referencias"}
                >
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-on-surface">{items.length}</span>
                  <span className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-secondary">FOTOS</span>
                </div>
                <div 
                  onClick={() => setActiveTab("referencias")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveTab("referencias");
                    }
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border py-3 sm:py-3.5 px-3 text-center shadow-xs cursor-pointer hover:bg-surface-container active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all select-none ${
                    activeTab === "referencias" && likedIds.length > 0
                      ? "border-red-500/30 bg-surface-container-low dark:bg-surface-container/70 ring-1 ring-red-500/20"
                      : "border-outline-variant/20 bg-surface-container-low/70 dark:bg-surface-container/40"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Ver fotos favoritas da noiva"
                  aria-selected={activeTab === "referencias"}
                >
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-red-500">
                    {likedIds.length}
                  </span>
                  <span className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-secondary">FAVORITAS</span>
                </div>
                <div 
                  onClick={() => setActiveTab("roteiro")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveTab("roteiro");
                    }
                  }}
                  className={`flex flex-col items-center justify-center rounded-2xl border py-3 sm:py-3.5 px-3 text-center shadow-xs cursor-pointer hover:bg-surface-container active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-all select-none ${
                    activeTab === "roteiro"
                      ? "border-primary/40 bg-surface-container-low dark:bg-surface-container/70 ring-1 ring-primary/20"
                      : "border-outline-variant/20 bg-surface-container-low/70 dark:bg-surface-container/40"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label="Ver progresso da shot list de altar"
                  aria-selected={activeTab === "roteiro"}
                >
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-on-surface">{completedShotCount}/{totalShotCount}</span>
                  <span className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-secondary">ALTAR</span>
                </div>
              </div>
            </div>

            {/* Quick Actions / Export Buttons on Mobile (Stitch Screen 5 Reference) */}
            <div className="flex sm:hidden items-center gap-2.5 mt-4 pt-4 border-t border-outline-variant/15">
              <button
                type="button"
                onClick={handleExportRoteiro}
                disabled={isExportingPdf}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card hover:bg-surface-container py-2.5 px-3 text-xs font-semibold text-on-surface shadow-xs transition-all active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {isExportingPdf ? (
                  <Loader2 className="size-3.5 animate-spin text-secondary" />
                ) : (
                  <Download className="size-3.5 text-secondary" />
                )}
                <span>{isExportingPdf ? "Gerando..." : "Exportar Roteiro"}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary hover:opacity-90 py-2.5 px-3 text-xs font-semibold shadow-xs transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <Share2 className="size-3.5 text-on-primary" />
                <span>Compartilhar</span>
              </button>
            </div>
          </section>
        )}

        {/* TELA 0: VISÃO GERAL (HOME LEVE EDITORIAL STITCH) */}
        {activeTab === "visao-geral" && (
          <OverviewSection
            onNavigateTab={setActiveTab}
            itemsCount={items.length}
            favoritesCount={likedIds.length}
            completedShotsCount={completedShotCount}
            totalShotsCount={totalShotCount}
            onExportPdf={handleExportRoteiro}
            isExportingPdf={isExportingPdf}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

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
            onNavigateToReferencias={() => setActiveTab("referencias")}
            onOpenShareModal={() => setIsShareModalOpen(true)}
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
        existingTags={allExistingTags}
      />

      {/* Compartilhamento WhatsApp & Dossiê PDF */}
      <ShareFabModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        totalPhotos={items.length}
        totalFavorites={likedIds.length}
        completedShotCount={completedShotCount}
        totalShotCount={totalShotCount}
        onExportPdf={handleExportRoteiro}
        isExportingPdf={isExportingPdf}
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