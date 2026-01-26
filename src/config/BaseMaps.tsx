import L from 'leaflet';

/* ================= BASEMAP TYPES ================= */
export type BasemapKey =
  | 'osm'
  | 'esri-topo'
  | 'cartodb-dark'
  | 'cartodb-light'
  | 'esri-imagery';

export interface BasemapItem {
  name: BasemapKey;
  title: string;
  url: string;
  options: L.TileLayerOptions;
  image: string;
}

/* ================= BASEMAP LIST ================= */
export const BASEMAPS: Record<BasemapKey, BasemapItem> = {
  osm: {
    name: 'osm',
    title: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '&copy; OpenStreetMap contributors',
    },
    image: 'https://tile.openstreetmap.org/5/24/12.png',
  },

  'esri-topo': {
    name: 'esri-topo',
    title: 'Esri World Topographic',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 20,
      attribution: 'Tiles © Esri',
    },
    image:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/5/12/24',
  },

  'cartodb-dark': {
    name: 'cartodb-dark',
    title: 'CartoDB Dark Matter',
    url: 'https://cartodb-basemaps-d.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '© CartoDB',
    },
    image:
      'https://cartodb-basemaps-d.global.ssl.fastly.net/dark_all/5/24/12.png',
  },

  'cartodb-light': {
    name: 'cartodb-light',
    title: 'CartoDB Positron (Light)',
    url: 'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
    options: {
      maxZoom: 20,
      attribution: '© CartoDB',
    },
    image:
      'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/5/24/12.png',
  },

  'esri-imagery': {
    name: 'esri-imagery',
    title: 'Esri World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: {
      maxZoom: 20,
      attribution: 'Tiles © Esri',
    },
    image:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/12/24',
  },
};
