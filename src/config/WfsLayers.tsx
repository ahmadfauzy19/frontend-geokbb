import L from 'leaflet';
import { ICONS } from '../utils/icons';

export const WFS_LAYERS = {
    sarana_peribadatan: {
        title: 'Sarana Peribadatan',
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:sarana_peribadatan',

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
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:tpa',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.tpa }),
    },
    stasiun_kereta_api: {
        title: 'Stasiun Kereta Api',
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:stasiun_kereta_api',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.stasiun_kereta_api }),
    },
    terminal_bus: {
        title: 'Terminal Bus',
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:terminal_bus',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.terminal_bus }),
    },
    gardu_induk_listrik: {
        title: 'Gardu Induk Listrik',
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:gardu_induk_listrik',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.gardu_induk_listrik }),
    },
    pembangkit_listrik: {
        title: 'Pembangkit Listrik',
        url: 'http://localhost:8080/geoserver/geodataKBB/wfs',
        typeName: 'geodataKBB:pembangkit_listrik',
        pointToLayer : (_: any, latlng: L.LatLng) =>
            L.marker(latlng, { icon: ICONS.pembangkit_listrik }),
    },  
}