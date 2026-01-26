import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { syncWMSLayers } from '../utils/wms';

export const useWmsLayers = (
  map: L.Map | null,
  activeLayers: string[]
) => {
  const layerStore = useRef<Record<string, L.TileLayer.WMS>>({});

  useEffect(() => {
    if (!map) return;

    syncWMSLayers(
      map,
      activeLayers,
      layerStore.current,
      []
    );
  }, [map, activeLayers]);
};
