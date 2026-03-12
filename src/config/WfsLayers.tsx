import L from 'leaflet';
import { ICONS } from '../utils/icons';

export const WFS_LAYERS = {
    sarana_peribadatan: {
        title: 'Sarana Peribadatan',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:sarana_peribadatan',

        pointToLayer: (feature: any, latlng: L.LatLng) => {
            const remark = (feature?.properties?.remark || '').toLowerCase();

            let icon = ICONS.sarana_peribadah_lainnya;

            if (remark.includes('masjid')) {
            icon = ICONS.masjid;
            } else if (remark.includes('gereja')) {
            icon = ICONS.gereja;
            } else if (remark.includes('vihara')) {
            icon = ICONS.vihara;
            }

            return L.marker(latlng, { icon });
        },
    },
    tpa: {
        title: 'TPA',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:tpa',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.tpa }),
    },
    stasiun_kereta_api: {
        title: 'Stasiun Kereta Api',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:stasiun_kereta_api',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.stasiun_kereta_api }),
    },
    terminal_bus: {
        title: 'Terminal Bus',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:terminal_bus',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.terminal_bus }),
    },
    gardu_induk_listrik: {
        title: 'Gardu Induk Listrik',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:gardu_induk_listrik',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.gardu_induk_listrik }),
    },
    pembangkit_listrik: {
        title: 'Pembangkit Listrik',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:pembangkit_listrik',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.pembangkit_listrik }),
    },
    batas_desa: {
        title: 'Batas Desa',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:batas_desa',

        style: {
            color: 'transparent',
            weight: 1,
            fillOpacity: 0
        }
    },

    batas_kecamatan: {
        title: 'Batas Kecamatan',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:batas_kecamatan',

        style: {
            color: 'transparent',
            weight: 1,
            fillOpacity: 0
        }
    },

    batas_kabupaten: {
        title: 'Batas Kabupaten',
        url: 'http://localhost:8080/geoserver/digispatia/wfs',
        typeName: 'digispatia:batas_kabupaten',

        style: {
            color: 'transparent',
            weight: 1,
            fillOpacity: 0
        }
    }
}