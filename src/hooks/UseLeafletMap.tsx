import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { BASEMAPS, type BasemapKey } from '../config/BaseMaps';

/* BBOX KBB */
const KBB_BOUNDS = L.latLngBounds(
  [-7.107184410095215, 107.18193054199219],
  [-6.688514709472656, 107.74616241455078]
);

export const useLeafletMap = (
  mapId: string,
  basemap: BasemapKey
) => {
  const mapRef = useRef<L.Map | null>(null);
  const basemapRef = useRef<L.TileLayer | null>(null);

  const [map, setMap] = useState<L.Map | null>(null);

  /* INIT MAP */
  useEffect(() => {
    if (!mapRef.current) {
      const leafletMap = L.map(mapId, {
        zoomControl: false,
      });

      leafletMap.fitBounds(KBB_BOUNDS);

      mapRef.current = leafletMap;
      setMap(leafletMap);
      
    }
  }, [mapId]);

  /* BASEMAP */
  useEffect(() => {
    if (!map) return;

    if (basemapRef.current) {
        map.removeLayer(basemapRef.current);
    }

    const cfg = BASEMAPS[basemap];

    basemapRef.current = L.tileLayer(
        cfg.url,
        cfg.options
    );

    basemapRef.current.addTo(map);
    basemapRef.current.bringToBack();

}, [map, basemap]);

  return mapRef;
};
