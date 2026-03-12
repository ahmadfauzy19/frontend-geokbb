import { useState } from 'react';
import L from 'leaflet';
// import { BASEMAPS, type BasemapKey } from '../config/BaseMaps';
import { useLeafletMap } from '../hooks/UseLeafletMap';
import { useWmsLayers } from '../hooks/UseWmsLayers';
import 'leaflet/dist/leaflet.css';
import '../assets/css/Beranda.css';

const BIGGER_BOUNDS = L.latLngBounds([
  [-7.29, 107.10],
  [-6.52, 107.85],
]);

const overviewData = {
  luasWilayah: '829.128 km²',
  jumlahPenduduk: '129.238 jiwa',
  jumlahKecamatan: 16,
  jumlahDesa: 165,
};

const MapOverview = () => {
  // const [basemap] = useState<BasemapKey>('osm');

  const [activeLayers] = useState<string[]>([
    'batas_kecamatan_overview',
  ]);

  const mapRef = useLeafletMap('map', null, BIGGER_BOUNDS);
  useWmsLayers(mapRef.current, activeLayers);

  return (
    <div className="overview-container">
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />

      {/* LEFT INFO */}
      <div className="info-left">
        <div className="box-info"> 
          <span>Luas Wilayah</span>
          <div className="info-box green">
            <h3>{overviewData.luasWilayah}</h3>
          </div>
        </div>
        <div className="box-info">
          <span>Jumlah Penduduk</span>
          <div className="info-box blue">
            <h3>{overviewData.jumlahPenduduk}</h3>
          </div>
        </div>
      </div>

      {/* RIGHT INFO */}
      <div className="info-right">
        <div className="box-info"> 
          <span>Jumlah Kecamatan</span>
          <div className="info-box green">
            <h3>{overviewData.jumlahKecamatan} Kecamatan</h3>
          </div>
        </div>

        <div className="box-info">
          <span>Jumlah Desa/Kelurahan</span>
          <div className="info-box blue">
            <h3>{overviewData.jumlahDesa} Desa/Kel</h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MapOverview;