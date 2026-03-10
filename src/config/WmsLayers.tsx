export const WMS_LAYERS = {
  batas_desa: {
    title: 'Batas Desa Kabupaten Bandung Barat',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:batas_desa',
    interactive: true,
  },
  batas_kecamatan: {
    title: 'Batas Kecamatan Kabupaten Bandung Barat',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:batas_kecamatan',
    interactive: true,
  },
  batas_kabupaten: {
    title: 'Batas Kabupaten Bandung Barat',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:batas_kabupaten',
    interactive: false,
  },
  guna_lahan: {
    title: 'Guna Lahan',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:guna_lahan',
    interactive: false,
  },
  jaringan_jalan: {
    title: 'Jaringan Jalan',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:jaringan_jalan',
    interactive: false,
  },
  jaringan_rel_kereta_api: {
    title: 'Jaringan Rel Kereta Api',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:jaringan_rel_kereta_api',
    interactive: false,
  },
  jaringan_listrik: {
    title: 'Jaringan Listrik',
    url: 'http://localhost:8080/geoserver/digispatia/wms',
    layers: 'digispatia:jaringan_listrik',
    interactive: false,
  },
};
