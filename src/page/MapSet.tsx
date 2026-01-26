import { useState } from 'react';
import Map from '../component/map/Map';
import MapsetSidebar from '../component/mapset/MapsetSidebar';
import '../assets/css/Map.css';
import { SearchOutlined } from '@ant-design/icons';

const MapSet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLayers, setActiveLayers] = useState<string[]>(['batas_kecamatan']);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="mapset-container">
      {/* SEARCH FLOATING */}
      <div className="search-floating">
        <input className="search-input" placeholder="Cari Lokasi" />
        <button className="search-btn">
          <SearchOutlined />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="header-aside">
          <div className="header-logo-teks">
            <img src="/Logo.png" className="app-logo" />
            <h1>Geodata KBB</h1>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        {sidebarOpen && (
          <div className="sidebar-content">
            <div className="logo">
              GEODATA <br /> KABUPATEN BANDUNG BARAT
            </div>

            <input className="search" placeholder="Cari Mapset" />

            <MapsetSidebar
              activeLayers={activeLayers}
              toggleLayer={toggleLayer}
            />
          </div>
        )}
      </aside>

      {/* MAP */}
      <main className="map-wrapper">
        <Map activeLayers={activeLayers} />
      </main>
    </div>
  );
};

export default MapSet;
