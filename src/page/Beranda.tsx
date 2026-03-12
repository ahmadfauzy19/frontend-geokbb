import AppLayout from "../layout/Layout";
import '../assets/css/Beranda.css';
import MapOverview from "../component/MapOverview";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
    const navigate = useNavigate();
    return (
        <AppLayout>
            <div className="beranda">
                <section className="hero">
                    <div className="hero-content">
                        {/* WRAPPER UTAMA (column) */}
                        <div className="hero-inner">
                            
                            {/* BARIS ATAS: teks + gambar */}
                            <div className="hero-row">
                                <div className="hero-text">
                                    <h2>Geodata Kabupaten Bandung Barat</h2>
                                    <p>
                                    Geodata Kabupaten Bandung Barat merupakan platform penyedia
                                    informasi geospasial terintegrasi yang menyajikan data spasial
                                    tematik kondisi fisik, sosial, ekonomi, dan lingkungan wilayah.
                                    </p>
                                </div>

                                <div className="hero-image">
                                    <img
                                    src="/perangkat_laptop.png"
                                    alt="perangkat komputer"
                                    />
                                </div>
                            </div>

                            {/* BARIS BAWAH: button */}
                            <div className="hero-action">
                                <button className="btn-primary" style={{ backgroundColor: '#346CFF' }} onClick={() => navigate("/mapset")}>
                                    Jelajahi Peta Interaktif
                                </button>
                            </div>
                        </div>
                        <div className="hero-section-2">
                            <h1>Overview Kabupaten Bandung Barat</h1>
                            <div className="map-overview">
                                <MapOverview/>
                            </div>
                        </div>
                    </div>

                </section>

                <section className="content">
                    {/* konten bawah */}
                </section>
                </div>
        </AppLayout>
    )
}

export default Beranda;