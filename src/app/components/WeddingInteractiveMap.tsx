// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from "react";
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useMap, 
  useAdvancedMarkerRef,
  ColorScheme
} from "@vis.gl/react-google-maps";
import { 
  MapPin, 
  Navigation, 
  Compass, 
  SunMedium, 
  Camera, 
  Key, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  X,
  Check
} from "lucide-react";

export interface WeddingLocation {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  position: { lat: number; lng: number };
  pinColor: string;
  pinBorder: string;
  icon: string;
  timeContext?: string;
  imageUrl?: string;
  mapsUrl: string;
  wazeUrl: string;
}

export const WEDDING_LOCATIONS: WeddingLocation[] = [
  {
    id: "espaco-lux",
    title: "Espaço Lux — Rio das Ostras",
    subtitle: "Cenário Oficial de Cerimônia & Recepção",
    role: "Local do Evento",
    description: "Altar sob luz natural ao ar livre, salão integrado para recepção e suíte para making of da noiva.",
    position: { lat: -22.5268, lng: -41.9442 },
    pinColor: "#059669",
    pinBorder: "#047857",
    icon: "🏛️",
    timeContext: "16:15 · Cerimônia e Altar ao Ar Livre",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Espaço+Lux+Rio+das+Ostras"
  },
  {
    id: "costa-azul",
    title: "Falésias & Mirante da Costa Azul",
    subtitle: "Locação de Ensaio Pré-Wedding & Pôr do Sol",
    role: "Ensaio & Pôr do Sol",
    description: "Monumento Natural dos Costões Rochosos. Ponto auge do caderno de referências para a golden hour com a noiva.",
    position: { lat: -22.5317, lng: -41.9215 },
    pinColor: "#d97706",
    pinBorder: "#b45309",
    icon: "🌅",
    timeContext: "17:15 · Mini Ensaio do Pôr do Sol",
    imageUrl: "/pre-wedding/01_451d03f1a458a64838b28633e494ceb2.jpg",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Mirante+da+Costa+Azul+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Mirante+da+Costa+Azul+Rio+das+Ostras"
  },
  {
    id: "bar-thunder",
    title: "Bar Thunder & Costa Azul",
    subtitle: "Ponto de Encontro & Making of do Noivo",
    role: "Making of Noivo",
    description: "Espaço descontraído para o brinde inicial com os padrinhos e preparação do Carlos antes de seguir para o Espaço Lux.",
    position: { lat: -22.5285, lng: -41.9280 },
    pinColor: "#4f46e5",
    pinBorder: "#4338ca",
    icon: "🍸",
    timeContext: "14:30 · Encontro com Padrinhos",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Bar+Thunder+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Costa+Azul+Rio+das+Ostras"
  }
];

// Sub-component to control map camera when selectedLocation changes
function MapCameraController({ 
  selectedLocation 
}: { 
  selectedLocation: WeddingLocation | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (selectedLocation) {
      map.panTo(selectedLocation.position);
      map.setZoom(15);
    } else {
      map.panTo({ lat: -22.529, lng: -41.933 });
      map.setZoom(13.2);
    }
  }, [map, selectedLocation]);

  return null;
}

// Sub-component for individual Advanced Markers + InfoWindows
interface LocationMarkerItemProps {
  location: WeddingLocation;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function LocationMarkerItem({
  location,
  isOpen,
  onOpen,
  onClose
}: LocationMarkerItemProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={location.position}
        title={location.title}
        onClick={onOpen}
      >
        <Pin
          background={location.pinColor}
          borderColor={location.pinBorder}
          glyphColor="#ffffff"
          scale={isOpen ? 1.3 : 1.1}
        />
      </AdvancedMarker>

      {isOpen && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={onClose}
          maxWidth={320}
        >
          <div className="p-1 space-y-2 text-stone-900 font-sans">
            {location.imageUrl && (
              <div className="relative w-full h-28 rounded-lg overflow-hidden bg-stone-100 mb-1.5 shadow-inner">
                <img
                  src={location.imageUrl}
                  alt={location.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/75 text-white backdrop-blur-xs flex items-center gap-1">
                  <span>{location.icon}</span>
                  <span>{location.role}</span>
                </span>
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                {location.timeContext || location.role}
              </span>
              <h4 className="font-bold text-sm text-stone-900 leading-tight">
                {location.title}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-snug">
                {location.description}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center gap-2">
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-stone-900 hover:bg-black text-white text-center py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                <Compass className="size-3.5 text-emerald-400" />
                <span>Google Maps</span>
              </a>
              <a
                href={location.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 border border-stone-300"
              >
                <Navigation className="size-3 text-stone-600" />
                <span>Waze</span>
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

interface WeddingInteractiveMapProps {
  isDarkMode?: boolean;
}

export function WeddingInteractiveMap({ isDarkMode = false }: WeddingInteractiveMapProps) {
  // Check env or user-stored demo key
  const envKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || "";
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("camila_carlos_gmp_api_key") || envKey;
  });

  const [activeView, setActiveView] = useState<"mapa" | "foto">("mapa");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>("espaco-lux");
  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  const selectedLocation = WEDDING_LOCATIONS.find((loc) => loc.id === selectedLocationId) || null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = keyInput.trim();
    if (cleanKey) {
      localStorage.setItem("camila_carlos_gmp_api_key", cleanKey);
      setApiKey(cleanKey);
      setIsKeyDialogOpen(false);
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem("camila_carlos_gmp_api_key");
    setApiKey(envKey);
    setIsKeyDialogOpen(false);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-airbnb-card bg-surface-container border border-outline-variant/20 flex flex-col">
      {/* Top Header & View Switcher */}
      <div className="p-4 sm:p-5 bg-surface-container-lowest/80 dark:bg-card/80 backdrop-blur-md border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3.5 z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-body-md text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3" />
              <span>Google Maps Platform · Rotas Oficiais</span>
            </span>
          </div>
          <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold leading-tight">
            Espaço Lux & Roteiro Costeiro — Rio das Ostras
          </h3>
          <p className="font-body-md text-xs text-secondary">
            Navegue pelos 3 pontos da cobertura fotográfica: cerimônia, falésias ao pôr do sol e making of.
          </p>
        </div>

        {/* View Switcher & Key Config */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
          {/* Quick Tab: Mapa vs Foto */}
          <div className="inline-flex items-center bg-surface-container dark:bg-surface-container-high p-1 rounded-full border border-outline-variant/20 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveView("mapa")}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                activeView === "mapa"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              <Compass className="size-3.5 text-secondary" />
              <span>Mapa Interativo</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView("foto")}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                activeView === "foto"
                  ? "bg-surface-container-lowest dark:bg-card text-on-surface shadow-xs"
                  : "text-secondary hover:text-on-surface"
              }`}
            >
              <Camera className="size-3.5 text-secondary" />
              <span>Cenário Real</span>
            </button>
          </div>

          {/* Key Button / Status */}
          <button
            type="button"
            onClick={() => setIsKeyDialogOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant/30 text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-container transition-all"
            title="Configurar Google Maps API Key / Demo Key"
          >
            <Key className="size-3.5 text-secondary" />
            <span className="hidden sm:inline">
              {apiKey ? "Chave Ativa" : "Conectar API Key"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Container: Map or Static Photo */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-surface-container-lowest overflow-hidden">
        {activeView === "foto" ? (
          /* View A: High-res Wedding Venue Photo */
          <div className="relative w-full h-full group">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ 
                backgroundImage: `url('${WEDDING_LOCATIONS[0].imageUrl}')` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="max-w-xl space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs inline-flex items-center gap-1">
                  <span>🏛️</span>
                  <span>Cenário Oficial de Cerimônia & Recepção</span>
                </span>
                <h3 className="font-headline-sm text-2xl font-bold text-white">
                  Espaço Lux — Rio das Ostras
                </h3>
                <p className="text-sm text-white/80">
                  Altar sob luz natural ao ar livre · Salão integrado para festa · Rota litorânea nas falésias para pôr do sol
                </p>
                <div className="pt-2 flex items-center gap-2.5">
                  <a
                    href={WEDDING_LOCATIONS[0].mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-stone-900 hover:bg-white/90 px-4 py-2 rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Compass className="size-4 text-emerald-700" />
                    <span>Abrir no Google Maps</span>
                  </a>
                  <a
                    href={WEDDING_LOCATIONS[0].wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all active:scale-95 border border-white/25"
                  >
                    <Navigation className="size-4 text-white" />
                    <span>Waze</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : apiKey ? (
          /* View B: Full Interactive Google Maps Platform with @vis.gl/react-google-maps */
          <div className="w-full h-full relative" style={{ width: "100%", height: "100%" }}>
            <APIProvider 
              apiKey={apiKey} 
              libraries={["marker"]}
            >
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={{ lat: -22.529, lng: -41.933 }}
                defaultZoom={13.2}
                gestureHandling="cooperative"
                disableDefaultUI={false}
                colorScheme={isDarkMode ? ColorScheme.DARK : ColorScheme.LIGHT}
                internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
                style={{ width: "100%", height: "100%" }}
              >
                <MapCameraController selectedLocation={selectedLocation} />

                {WEDDING_LOCATIONS.map((loc) => (
                  <LocationMarkerItem
                    key={loc.id}
                    location={loc}
                    isOpen={selectedLocationId === loc.id}
                    onOpen={() => setSelectedLocationId(loc.id)}
                    onClose={() => setSelectedLocationId(null)}
                  />
                ))}
              </Map>
            </APIProvider>
          </div>
        ) : (
          /* View C: Fallback / Zero-Friction Demo Mode (No Key Set Yet) */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-radial from-surface-container-low to-surface-container-high">
            <div className="max-w-md space-y-3">
              <div className="size-12 mx-auto rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
                <Compass className="size-6" />
              </div>
              <h4 className="font-headline-sm text-lg font-bold text-on-surface">
                Mapa Interativo Pronto para Conexão
              </h4>
              <p className="font-body-md text-xs text-secondary leading-relaxed">
                O componente foi totalmente estruturado com <strong className="text-on-surface font-semibold">@vis.gl/react-google-maps</strong> e <strong className="text-on-surface font-semibold">AdvancedMarker</strong>. Para carregar os azulejos vetoriais ao vivo, utilize sua chave de API ou a chave de demonstração gratuita (Maps Demo Key).
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsKeyDialogOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Key className="size-3.5" />
                  <span>Inserir Chave / Demo Key</span>
                </button>
                <a
                  href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_git_agentskills_v1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-card text-on-surface text-xs font-semibold shadow-xs hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Obter Demo Key Grátis</span>
                  <ExternalLink className="size-3 text-secondary" />
                </a>
              </div>

              {/* Direct links to open in external maps */}
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-center gap-2 text-xs font-medium text-secondary">
                <span>Rotas diretas:</span>
                <a
                  href={WEDDING_LOCATIONS[0].mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Google Maps
                </a>
                <span>·</span>
                <a
                  href={WEDDING_LOCATIONS[0].wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  Waze
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quick Location Pills Floating on the Map */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-4 z-10 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none pointer-events-auto">
          <button
            type="button"
            onClick={() => setSelectedLocationId(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-md transition-all whitespace-nowrap active:scale-95 ${
              selectedLocationId === null
                ? "bg-stone-900 text-white border-stone-800"
                : "bg-surface-container-lowest/90 dark:bg-card/90 text-on-surface border-outline-variant/30 hover:bg-surface-container"
            }`}
          >
            <span>📍 Todos os Pontos</span>
          </button>

          {WEDDING_LOCATIONS.map((loc) => {
            const isSelected = selectedLocationId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  setSelectedLocationId(loc.id);
                  if (activeView !== "mapa") setActiveView("mapa");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-md transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? "bg-stone-900 text-white border-stone-800"
                    : "bg-surface-container-lowest/90 dark:bg-card/90 text-on-surface border-outline-variant/30 hover:bg-surface-container"
                }`}
              >
                <span>{loc.icon}</span>
                <span className="truncate max-w-[120px] sm:max-w-none">{loc.title.split("—")[0].trim()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal / Dialog for Custom API Key or Demo Key */}
      {isKeyDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-surface-container-lowest dark:bg-card p-6 border border-outline-variant/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Key className="size-4" />
                </div>
                <h4 className="font-headline-sm text-base font-bold text-on-surface">
                  Configuração Google Maps Platform
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsKeyDialogOpen(false)}
                className="size-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="font-body-md text-xs text-secondary leading-relaxed">
              Você pode inserir sua chave em <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface">VITE_GOOGLE_MAPS_API_KEY</code> no arquivo <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-[11px] text-on-surface">.env.local</code> ou colar uma chave de demonstração abaixo para teste instantâneo:
            </p>

            <form onSubmit={handleSaveKey} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Google Maps API Key / Demo Key:
                </label>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                {apiKey ? (
                  <button
                    type="button"
                    onClick={handleRemoveKey}
                    className="text-xs text-red-500 hover:underline font-semibold"
                  >
                    Desconectar Chave
                  </button>
                ) : (
                  <a
                    href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_git_agentskills_v1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Gerar Demo Key Grátis</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsKeyDialogOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-secondary hover:bg-surface-container"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-xs hover:opacity-90 active:scale-95"
                  >
                    Salvar Chave
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
