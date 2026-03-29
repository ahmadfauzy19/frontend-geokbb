const url = import.meta.env.VITE_GEOSERVER_URL_WMS;
export const WMS_LAYERS = {
  batas_desa: {
    title: 'Batas Desa Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_desa',
    interactive: true,
  },
  batas_desa_overview: {
    title: 'Batas Desa Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_desa_overview',
    interactive: true,
  },
  batas_kecamatan: {
    title: 'Batas Kecamatan Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_kecamatan',
    interactive: true,
  },
  batas_kecamatan_overview: {
    title: 'Batas Kecamatan Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_kecamatan_overview',
    interactive: true,
  },
  batas_kabupaten: {
    title: 'Batas Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_kabupaten',
    interactive: false,
  },
  batas_kabupaten_overview: {
    title: 'Batas Kabupaten Bandung Barat',
    url: url,
    layers: 'digispatia:batas_kabupaten_overview',
    interactive: false,
  },
  guna_lahan: {
    title: 'Guna Lahan',
    url: url,
    layers: 'digispatia:guna_lahan',
    interactive: false,
  },
  jaringan_jalan: {
    title: 'Jaringan Jalan',
    url: url,
    layers: 'digispatia:jaringan_jalan',
    interactive: false,
  },
  jaringan_rel_kereta_api: {
    title: 'Jaringan Rel Kereta Api',
    url: url,
    layers: 'digispatia:jaringan_rel_kereta_api',
    interactive: false,
  },
  jaringan_listrik: {
    title: 'Jaringan Listrik',
    url: url,
    layers: 'digispatia:jaringan_listrik',
    interactive: false,
  },
  kepadatan_penduduk: {
    title: 'Kepadatan Penduduk',
    url: url,
    layers: 'digispatia:kepadatan_penduduk',
    interactive: false,
  },
};
