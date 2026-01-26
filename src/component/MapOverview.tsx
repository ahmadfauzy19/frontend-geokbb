import { useState } from 'react';
import { BASEMAPS, type BasemapKey } from '../config/BaseMaps';
import { useLeafletMap } from '../hooks/UseLeafletMap';
import { useWmsLayers } from '../hooks/UseWmsLayers';
import 'leaflet/dist/leaflet.css';
import '../assets/css/Beranda.css';

const MapOverview = () => {
  const [basemap, setBasemap] = useState<BasemapKey>('osm');
  const [open, setOpen] = useState(false);

  /* aktifkan layer apa saja */
  const [activeLayers] = useState<string[]>([
    'batas_kecamatan',
  ]);

  const mapRef = useLeafletMap('map', basemap);
  useWmsLayers(mapRef.current, activeLayers);

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100%' }} />

      {/* BASEMAP SWITCHER */}
      <div className={`basemap-switcher ${open ? 'open' : ''}`}>
        <button
          className="basemap-toggle"
          onClick={() => setOpen(!open)}
        >
          <img src={BASEMAPS[basemap].image} />
        </button>

        {open && (
          <div className="basemap-options">
            {Object.entries(BASEMAPS).map(([key, val]) => (
              <button
                key={key}
                className={basemap === key ? 'active' : ''}
                onClick={() => {
                  setBasemap(key as BasemapKey);
                  setOpen(false);
                }}
              >
                <img src={val.image} />
                <span>{val.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MapOverview;
