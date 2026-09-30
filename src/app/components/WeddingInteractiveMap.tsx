// Source: Google Maps Platform Code Assist
import { useState, useEffect } from "react";
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
  Navigation, 
  Compass, 
  Camera, 
  Sparkles
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
    description: "Altar sob luz natural ao ar livre, salão integrado para recepção e suíte para preparação e making-of.",
    position: { lat: -22.5268, lng: -41.9442 },
    pinColor: "#059669",
    pinBorder: "#047857",
    icon: "🏛️",
    timeContext: "Cenário Oficial Confirmado",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3o9roN3Kvm4Rku_yH82u1xMkRST50-Ka4f5d6lio0Ei40Qs_HtP5srKmSg82T20B1G6o-zCng1ZS7FuXsZYXT6yYGCWuDzEoCeSQ8-vx9KjE9KySwKYUWosk7JdLx1YP4fNqRolFMTPBwdSvGiGBVEj88K64SwA5ALtAul_7csaWKfEylxnT92lKrIcGBhdSgPoBwFe1n-xvg4Jc0Pso9CrGGBeaFG6u1cVDkGg9x06ORkwG1qdw",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Espa%C3%A7o+Lux+Rio+das+Ostras+RJ",
    wazeUrl: "https://waze.com/ul?q=Espaço+Lux+Rio+das+Ostras"
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
    map.panTo({ lat: -22.5268, lng: -41.9442 });
    map.setZoom(15.5);
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
  // Read env key or local storage
  const envKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || "";
  const apiKey = (typeof window !== "undefined" ? localStorage.getItem("camila_carlos_gmp_api_key") : null) || envKey;

  const [activeView, setActiveView] = useState<"mapa" | "foto">("mapa");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>("espaco-lux");

  const selectedLocation = WEDDING_LOCATIONS.find((loc) => loc.id === selectedLocationId) || null;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-airbnb-card bg-surface-container border border-outline-variant/20 flex flex-col">
      {/* Top Header & View Switcher */}
      <div className="p-4 sm:p-5 bg-surface-container-lowest/80 dark:bg-card/80 backdrop-blur-md border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3.5 z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-body-md text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="size-3" />
              <span>Google Maps Platform · Rota Oficial</span>
            </span>
          </div>
          <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold leading-tight">
            Espaço Lux — Rio das Ostras
          </h3>
          <p className="font-body-md text-xs text-secondary">
            Cenário oficial da cerimônia e recepção com rotas diretas no Google Maps e Waze com 1 clique.
          </p>
        </div>

        {/* View Switcher: Mapa vs Foto */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
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
        </div>
      </div>

      {/* Main Container: Map or Static Photo */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-surface-container-lowest overflow-hidden">
        {activeView === "foto" || !apiKey ? (
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
        ) : (
          /* View B: Full Interactive Google Maps Platform with @vis.gl/react-google-maps */
          <div className="w-full h-full relative" style={{ width: "100%", height: "100%" }}>
            <APIProvider 
              apiKey={apiKey} 
              libraries={["marker"]}
            >
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={{ lat: -22.5268, lng: -41.9442 }}
                defaultZoom={15.5}
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
        )}

        {/* Quick Location Badge Floating on the Map */}
        <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-4 z-10 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none pointer-events-auto">
          <div className="px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-stone-800 bg-stone-900 text-white shadow-md flex items-center gap-1.5">
            <span>🏛️</span>
            <span>Espaço Lux · Local Oficial Confirmado</span>
          </div>
        </div>
      </div>
    </div>
  );
}
