import L from 'leaflet';
import { WFS_LAYERS } from '../config/WfsLayers';

export async function syncWFSLayers(
  // map: L.Map,
  activeLayers: string[],
  layerStore: Record<string, L.GeoJSON>,
  group: L.LayerGroup
) {

  /* REMOVE */
  Object.keys(layerStore).forEach((id) => {
    if (!activeLayers.includes(id)) {

      group.removeLayer(layerStore[id]);
      delete layerStore[id];

    }
  });

  /* ADD */
  for (const id of activeLayers) {

    if (layerStore[id]) continue;

    const cfg = WFS_LAYERS[id as keyof typeof WFS_LAYERS];
    if (!cfg) continue;

    const params = new URLSearchParams({
      service: "WFS",
      version: "1.1.0",
      request: "GetFeature",
      typename: cfg.typeName,
      outputFormat: "application/json",
      srsname: "EPSG:4326",
    });

    const res = await fetch(`${cfg.url}?${params}`);
    const geojson = await res.json();
    if (layerStore[id]) {
      return;
    }

    const layer = L.geoJSON(geojson, {
      ...(cfg as any).pointToLayer && { pointToLayer: (cfg as any).pointToLayer },
      ...(cfg as any).style && { style: (cfg as any).style },

      onEachFeature: (feature, l) => {

        l.on("mouseover", (e: any) => {

          const layer = e.target;

          if (layer.setStyle) {
            layer.setStyle({
              stroke: true,
              color: "#ffffff",
              weight: 2,
              fillOpacity: 0
            });
          }

          const name =
            feature.properties?.namobj ||
            feature.properties?.nama ||
            feature.properties?.name;

          if (name) {
            layer.bindTooltip(name, {
              sticky: true,
              direction: "top"
            }).openTooltip();
          }

        });

        l.on("mouseout", (e: any) => {

          if ((cfg as any).style) {
            (layer as any).resetStyle(e.target);
          }

        });

      }

    });

    layerStore[id] = layer;

    /* ADD KE GROUP */
    layer.addTo(group);

  }

}