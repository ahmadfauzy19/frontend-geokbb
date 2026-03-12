import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import 'leaflet-geometryutil';

import L from 'leaflet';

/* ===== IMPORT BASEMAP CONFIG ===== */
import { BASEMAPS, type BasemapKey } from '../../config/BaseMaps';

/* ===== IMPORT LAYER MANAGER ===== */
import { syncWMSLayers, syncWFSLayers } from './layers';

/* BBOX KBB */
const KBB_BOUNDS = L.latLngBounds(
  [-7.107184410095215, 107.18193054199219],
  [-6.688514709472656, 107.74616241455078]
);


interface Props {
  activeLayers: string[];
  searchResult?: any;
}

const Map = ({ activeLayers, searchResult }: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const basemapLayerRef = useRef<L.TileLayer | null>(null);
  const wmsLayersRef = useRef<Record<string, L.TileLayer.WMS>>({});
  const wfsLayersRef = useRef<Record<string, L.GeoJSON>>({});
  const interactiveWMSRef = useRef<L.TileLayer.WMS[]>([]);
  const searchLayerRef = useRef<L.GeoJSON | null>(null);
  const wfsGroupRef = useRef<L.LayerGroup | null>(null);


  const [basemap, setBasemap] = useState<BasemapKey>('osm');

  /* ================= MAP INIT ================= */
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        center: [-6.9, 107.6],
        zoom: 8,
        zoomControl: false,
      });

      map.fitBounds(KBB_BOUNDS);

      mapRef.current = map;

      /* GROUP UNTUK WFS */
    wfsGroupRef.current = L.layerGroup().addTo(map);

      /* ===== LAT LNG ===== */
      class LatLngControl extends L.Control {
        onAdd() {
          const div = L.DomUtil.create('div', 'latlng-control');
          div.innerHTML = 'Lat: -, Lng: -';
          return div;
        }
      }

      new LatLngControl({ position: 'bottomright' }).addTo(map);

      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        const el = document.querySelector('.latlng-control');
        if (el) {
          el.innerHTML = `Lat: ${e.latlng.lat.toFixed(
            6
          )}, Lng: ${e.latlng.lng.toFixed(6)}`;
        }
      });

      /* ===== ZOOM ===== */
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      /* ===== DRAW ===== */
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        position: 'bottomright',
        draw: {
          polyline: true,
          polygon: true,
          circlemarker: true,
          marker: false,
          circle: false,
          rectangle: false,
        },
        edit: {
          featureGroup: drawnItems,
          remove: true,
        },
      });

      map.addControl(drawControl);

      map.on('draw:created', (e: any) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);

        if (e.layerType === 'polyline') {
          const len = (L.GeometryUtil as any).geodesicLength(
            layer.getLatLngs()
          );
          layer.bindTooltip(
            `Panjang: ${(len / 1000).toFixed(2)} km`,
            { sticky: true }
          );
        }

        if (e.layerType === 'polygon') {
          const area = (L.GeometryUtil as any).geodesicArea(
            layer.getLatLngs()[0]
          );
          layer.bindTooltip(
            `Luas: ${(area / 1_000_000).toFixed(2)} km²`,
            { sticky: true }
          );
        }

        if (e.layerType === 'circlemarker') {
          layer.bindTooltip('Point', { sticky: true });
        }
      });
    }
  }, []);

  /* ================= BASEMAP SWITCH ================= */
  useEffect(() => {
    if (!mapRef.current) return;

    if (basemapLayerRef.current) {
      mapRef.current.removeLayer(basemapLayerRef.current);
    }

    const bm = BASEMAPS[basemap];
    basemapLayerRef.current = L.tileLayer(bm.url, bm.options);
    basemapLayerRef.current.addTo(mapRef.current);
    basemapLayerRef.current.bringToBack();
  }, [basemap]);

  useEffect(() => {
    if (!mapRef.current || !searchResult) return;

    const map = mapRef.current;

    // hapus layer lama
    if (searchLayerRef.current) {
      map.removeLayer(searchLayerRef.current);
    }

    const layer = L.geoJSON(searchResult, {
      style: {
        color: "#00ffff",
        weight: 3
      },
      pointToLayer: (_, latlng) =>
        L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#00ffff",
          color: "#000",
          weight: 1,
          fillOpacity: 0.9
        }),
    }).addTo(map);

    map.fitBounds(layer.getBounds(), { padding: [40, 40] });

    searchLayerRef.current = layer;

  }, [searchResult]);

  /* ================= WMS LAYERS (MAPSET) ================= */
  useEffect(() => {
    if (!mapRef.current) return;

    syncWMSLayers(
      mapRef.current,
      activeLayers,
      wmsLayersRef.current,
      interactiveWMSRef.current
    );
  }, [activeLayers]);

  /* ================= WFS LAYERS ================= */

  useEffect(() => {
  const map = mapRef.current;
  const group = wfsGroupRef.current;

  if (!map || !group) return;

    syncWFSLayers(
      // map,
      activeLayers,
      wfsLayersRef.current,
      group
    );
  }, [activeLayers]);

  return (
    <>
      <div id="map" style={{ height: '100%', width: '100%' }} />

      {/* ===== BASEMAP PANEL ===== */}
      <div className="basemap-panel">
        <div className="basemap-title">Basemap</div>
        <div className="basemap-list">
          {Object.values(BASEMAPS).map((bm) => (
            <button
              key={bm.name}
              className={`basemap-item ${
                basemap === bm.name ? 'active' : ''
              }`}
              onClick={() => setBasemap(bm.name)}
              title={bm.title}
            >
              <img src={bm.image} alt={bm.title} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Map;
