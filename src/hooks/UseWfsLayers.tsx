import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { syncWFSLayers } from '../utils/wfsOverview';
import { WFS_LAYERS } from '../config/WfsLayers';

export const useWfsLayers = (
  map: L.Map | null,
  activeLayers: string[]
) => {
  const layerStore = useRef<Record<string, L.Layer>>({});

  useEffect(() => {
    if (!map) return;

    syncWFSLayers(
      map,
      activeLayers,
      layerStore.current,
      WFS_LAYERS
    );
  }, [map, activeLayers]);
};