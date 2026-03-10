import L from 'leaflet';
import { WFS_LAYERS } from '../config/WfsLayers';

export async function syncWFSLayers(
  map: L.Map,
  activeLayers: string[],
  layerStore: Record<string, L.GeoJSON>
) {
  /* ADD */
  for (const id of activeLayers) {
    if (!layerStore[id] && WFS_LAYERS[id as keyof typeof WFS_LAYERS]) {
      const cfg = WFS_LAYERS[id as keyof typeof WFS_LAYERS];

      const params = new URLSearchParams({
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        typename: cfg.typeName,
        outputFormat: 'application/json',
        srsname: 'EPSG:4326',
      });

      const res = await fetch(`${cfg.url}?${params}`);
      const geojson = await res.json();

      const layer = L.geoJSON(geojson, {
        // style: cfg.style,
        // onEachFeature: cfg.onEachFeature,
        pointToLayer: cfg.pointToLayer,
      });

      layerStore[id] = layer;
      layer.addTo(map);
    }
  }

  /* REMOVE */
  Object.keys(layerStore).forEach((id) => {
    if (!activeLayers.includes(id)) {
      map.removeLayer(layerStore[id]);
      delete layerStore[id];
    }
  });
}
