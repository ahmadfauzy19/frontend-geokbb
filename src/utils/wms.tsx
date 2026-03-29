import L from 'leaflet';
import { WMS_LAYERS } from '../config/WmsLayers';

const LAYER_Z_INDEX: Record<string, number> = {
  // paling bawah
  batas_kabupaten: 100,
  batas_kabupaten_overview: 100,

  batas_kecamatan: 200,
  batas_kecamatan_overview: 200,

  batas_desa: 300,
  batas_desa_overview: 300,

  guna_lahan: 400,

  // flexible (default tinggi)
  jaringan_jalan: 500,
  jaringan_rel_kereta_api: 510,
  jaringan_listrik: 520,
  kepadatan_penduduk: 530,
};

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
        zIndex: LAYER_Z_INDEX[id] || 999, // fallback kalau tidak ada
      });

      layerStore[id].addTo(map);
      // force stacking ulang
      layerStore[id].setZIndex(LAYER_Z_INDEX[id] || 999);

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
