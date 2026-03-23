import { useState, useEffect } from 'react';
import L from 'leaflet';
import { useLeafletMap } from '../hooks/UseLeafletMap';
import { useWmsLayers } from '../hooks/UseWmsLayers';
import { useWfsLayers } from '../hooks/UseWfsLayers';
import 'leaflet/dist/leaflet.css';
import '../assets/css/MapOverview.css';

import {
  EnvironmentFilled,
  TeamOutlined,
  ApartmentOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const BIGGER_BOUNDS = L.latLngBounds([
  [-7.29, 107.10],
  [-6.52, 107.85],
]);

const BIGGER_BOUNDS_MOBILE = L.latLngBounds([
  [-7.29, 107.10],
  [-6.45, 107.80],
]);

const overviewData = {
  luasWilayah: '1,305.77 km²',
  jumlahPenduduk: '1,907.800 jiwa',
  jumlahKecamatan: 16,
  jumlahDesa: 165,
};

const MapOverview = () => {

  const [activeOverview, setActiveOverview] = useState<string>('kecamatan');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const layerMap: Record<string, string> = {
    kecamatan: 'batas_kecamatan_overview',
    kepadatan_penduduk: 'kepadatan_penduduk',
    kabupaten: 'batas_kabupaten_overview',
    desa: 'batas_desa_overview'
  };

  const wfsLayerMap: Record<string, string[]> = {
    kecamatan: ['batas_kecamatan'],
    desa: ['batas_desa'],
    kepadatan_penduduk: ['kepadatan_penduduk'],
    kabupaten: [], // kalau belum ada WFS-nya
  };

  const activeLayers = [layerMap[activeOverview]];

  const activeWfsLayers = wfsLayerMap[activeOverview] || [];
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const bounds = isMobile ? BIGGER_BOUNDS_MOBILE : BIGGER_BOUNDS;

  const mapRef = useLeafletMap('map', null, bounds);
  useWmsLayers(mapRef.current, activeLayers);
  useWfsLayers(mapRef.current, activeWfsLayers);

  return (
    <div className="overview-container">

      {/* MOBILE NAVBAR */}
      <div className="overview-navbar">

          <button
            className={`box-info green ${activeOverview === 'kabupaten' ? 'active' : ''}`}
            onClick={() => setActiveOverview('kabupaten')}
          >
            <EnvironmentFilled className="icon" />

            <span className="label">Luas</span>

            <div className="info-box green">
              <h3>{overviewData.luasWilayah}</h3>
            </div>
          </button>


          <button
            className={`box-info blue ${activeOverview === 'kepadatan_penduduk' ? 'active' : ''}`}
            onClick={() => setActiveOverview('kepadatan_penduduk')}
          >
            <TeamOutlined className='icon'/>

            <span className='label'>Penduduk</span>

            <div className="info-box blue">
              <h3>{overviewData.jumlahPenduduk}</h3>
            </div>
          </button>


          <button
            className={`box-info green ${activeOverview === 'kecamatan' ? 'active' : ''}`}
            onClick={() => setActiveOverview('kecamatan')}
          >
            <ApartmentOutlined className='icon'/>

            <span className='label'>Kecamatan</span>

            <div className="info-box green">
              <h3>{overviewData.jumlahKecamatan}</h3>
            </div>
          </button>


          <button
            className={`box-info blue ${activeOverview === 'desa' ? 'active' : ''}`}
            onClick={() => setActiveOverview('desa')}
          >
            <EnvironmentOutlined className='icon'/>

            <span className='label'>Desa</span>

            <div className="info-box blue">
              <h3>{overviewData.jumlahDesa}</h3>
            </div>
          </button>

        </div>

      {/* MAP */}
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      />

      {/* LEFT INFO (DESKTOP) */}
      <div className="info-left">

        <button
          className={`box-info ${activeOverview === 'kabupaten' ? 'active' : ''}`}
          onClick={() => setActiveOverview('kabupaten')}
        >
          <span>Luas Wilayah</span>
          <div className="info-box green">
            <h3>{overviewData.luasWilayah}</h3>
          </div>
        </button>

        <button
          className={`box-info ${activeOverview === 'kepadatan_penduduk' ? 'active' : ''}`}
          onClick={() => setActiveOverview('kepadatan_penduduk')}
        >
          <span>Jumlah Penduduk</span>
          <div className="info-box blue">
            <h3>{overviewData.jumlahPenduduk}</h3>
          </div>
        </button>

      </div>

      {/* RIGHT INFO (DESKTOP) */}
      <div className="info-right">

        <button
          className={`box-info ${activeOverview === 'kecamatan' ? 'active' : ''}`}
          onClick={() => setActiveOverview('kecamatan')}
        >
          <span>Jumlah Kecamatan</span>
          <div className="info-box green">
            <h3>{overviewData.jumlahKecamatan} Kecamatan</h3>
          </div>
        </button>

        <button
          className={`box-info ${activeOverview === 'desa' ? 'active' : ''}`}
          onClick={() => setActiveOverview('desa')}
        >
          <span>Jumlah Desa/Kelurahan</span>
          <div className="info-box blue">
            <h3>{overviewData.jumlahDesa} Desa/Kel</h3>
          </div>
        </button>

      </div>

    </div>
  );
};

export default MapOverview;