import { useState, useEffect } from 'react';
import Map from '../component/map/Map';
import MapsetSidebar from '../component/mapset/MapsetSidebar';
import '../assets/css/Map.css';
import { SearchOutlined } from '@ant-design/icons';

const MapSet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLayers, setActiveLayers] = useState<string[]>(['batas_kecamatan']);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://127.0.0.1:8000/api/search?q=${searchQuery}`
        );

        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (err) {
        console.error("Search error:", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="mapset-container">
      {/* SEARCH FLOATING */}
      <div className="search-floating">
        <input
          className="search-input"
          placeholder="Cari Lokasi"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="search-btn">
          <SearchOutlined />
        </button>

        {searchQuery && (
          <div className="search-dropdown">

            {loading && (
              <div className="search-item loading">
                🔄 Mencari...
              </div>
            )}

            {!loading && suggestions.length === 0 && (
              <div className="search-item empty">
                ❌ Tidak ditemukan
              </div>
            )}

            {!loading &&
              suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className={`search-item ${activeIndex === idx ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setSelectedResult({
                      type: "FeatureCollection",
                      features: [item]
                    });
                  }}
                >
                  {item.properties.name}
                  <span className="source-tag">
                    {item.properties.source_table}
                  </span>
                </div>
              ))}
          </div>
        )}
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
        <Map activeLayers={activeLayers} searchResult={selectedResult} />
      </main>
    </div>
  );
};

export default MapSet;
