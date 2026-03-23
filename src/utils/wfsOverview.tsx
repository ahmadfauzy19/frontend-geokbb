import L from 'leaflet';

export const fetchWFS = async (url: string, typeName: string) => {
  const fullUrl = `${url}?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json`;

  const res = await fetch(fullUrl);
  const data = await res.json();

  return data;
};

export const syncWFSLayers = async (
  map: L.Map,
  activeLayers: string[],
  layerStore: Record<string, L.Layer>,
  WFS_LAYERS: any
) => {
  // REMOVE layer yang tidak aktif
  Object.keys(layerStore).forEach((key) => {
    if (!activeLayers.includes(key)) {
      map.removeLayer(layerStore[key]);
      delete layerStore[key];
    }
  });

  // ADD layer baru
  for (const key of activeLayers) {
    if (layerStore[key]) continue;

    const config = WFS_LAYERS[key];
    if (!config) continue;

    try {
      const geojson = await fetchWFS(config.url, config.typeName);

      const layer = L.geoJSON(geojson, {
        pointToLayer: config.pointToLayer,
        style: config.style,

        onEachFeature: (feature, l) => {
            l.on("mouseover", (e: any) => {
                const targetLayer = e.target;

                // highlight
                if (targetLayer.setStyle) {
                targetLayer.setStyle({
                    color: "#ffffff",
                    weight: 2,
                    fillOpacity: 0
                });
                }

                let name = '';

                if (key === 'batas_kecamatan') {
                name =
                    feature.properties?.wadmkc ||
                    feature.properties?.namobj;
                } else if (key === 'batas_desa') {
                name =
                    feature.properties?.wadmkd ||
                    feature.properties?.namobj;
                } else if (key === 'kepadatan_penduduk') {
                    name = config.getName?.(feature.properties);
                }
                

                if (name) {
                targetLayer.bindTooltip(name, {
                    sticky: true,
                    direction: "top",
                    opacity: 0.9
                }).openTooltip();
                }
            });

            l.on("mouseout", (e: any) => {
                if (config.style) {
                    layer.resetStyle(e.target);
                }
            });
        }
      }
    );

      

      layer.addTo(map);
      layerStore[key] = layer;
    } catch (err) {
      console.error('WFS load error:', key, err);
    }
  }
};