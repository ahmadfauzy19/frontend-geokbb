import L from 'leaflet';
import { WMS_LAYERS } from '../config/WmsLayers';

export function syncWMSLayers(
  map: L.Map,
  activeLayers: string[],
  layerStore: Record<string, L.TileLayer.WMS>,
  interactiveWMSRef: L.TileLayer.WMS[]
) {
  /* ADD */
  activeLayers.forEach((id) => {
    if (!layerStore[id] && WMS_LAYERS[id as keyof typeof WMS_LAYERS]) {
      const cfg = WMS_LAYERS[id as keyof typeof WMS_LAYERS];

      layerStore[id] = L.tileLayer.wms(cfg.url, {
        layers: cfg.layers,
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        
      });

      layerStore[id].addTo(map);

      if (cfg.interactive) {
        interactiveWMSRef.push(layerStore[id]);
      }
    }
  });

  /* REMOVE */
  Object.keys(layerStore).forEach((id) => {
    if (!activeLayers.includes(id)) {
      const layer = layerStore[id];

      // 1. remove dari map
      map.removeLayer(layer);

      // 2. REMOVE dari interactive list
      const idx = interactiveWMSRef.indexOf(layer);
      if (idx !== -1) {
        interactiveWMSRef.splice(idx, 1);
      }

      // 3. remove store
      delete layerStore[id];
    }
  });
}
