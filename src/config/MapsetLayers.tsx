export const MAPSET_LAYERS = {
  lingkungan: {
    label: 'Lingkungan',
    layers: [
      {
        id: 'batas_desa',
        title: 'Batas Desa Kabupaten Bandung Barat',
        source: 'Geodata KBB',
      },
      {
        id: 'batas_kecamatan',
        title: 'Batas Kecamatan Kabupaten Bandung Barat',
        source: 'Geodata KBB',
      },
      {
        id: 'batas_kabupaten',
        title: 'Batas Kabupaten Bandung Barat',
        source: 'Geodata KBB',
      },
      {
        id: 'sarana_peribadatan',
        title: 'Sarana Peribadatan',
        source: 'Geodata KBB',
      },
      {
        id: 'guna_lahan',
        title: 'Guna Lahan',
        source: 'Geodata KBB',
      }
    ],
  },

  transportasi: {
    label: 'Transportasi',
    layers: [
        {
            id: 'jaringan_jalan',
            title: 'Jaringan Jalan',
            source: 'Geodata KBB',
        },
        {
            id: 'jaringan_rel_kereta_api',
            title: 'Jaringan Rel Kereta Api',
            source: 'Geodata KBB',
        },
        {
            id: 'stasiun_kereta_api',
            title: 'Stasiun Kereta Api',
            source: 'Geodata KBB',
        },
        {
            id: 'terminal_bus',
            title: 'Terminal Bus',
            source: 'Geodata KBB',
        },
    ],
  },

  kelistrikan: {
    label: 'Kelistrikan',
    layers: [
        {
            id: 'jaringan_listrik',
            title: 'Jaringan Listrik',
            source: 'Geodata KBB',   
        },
        {
            id: 'gardu_induk_listrik',
            title: 'Gardu Induk Listrik',
            source: 'Geodata KBB',
        },
        {
            id: 'pembangkit_listrik',
            title: 'Pembangkit Listrik',
            source: 'Geodata KBB',
        }
    ],
  },

  sumberDayaAir: {
    label: 'Sumber Daya Air',
    layers: [
        {
            id: 'tpa',
            title: 'Tpa',
            source: 'Geodata KBB',
        }
    ],
  },
};
