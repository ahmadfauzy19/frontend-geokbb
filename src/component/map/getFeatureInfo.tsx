import L from 'leaflet';

export async function getWMSFeatureInfo({
  map,
  layer,
  latlng,
}: {
  map: L.Map;
  layer: L.TileLayer.WMS;
  latlng: L.LatLng;
}) {
  const point = map.latLngToContainerPoint(latlng);
  const size = map.getSize();

  const params: any = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: '',
    transparent: true,
    version: layer.wmsParams.version,
    format: layer.wmsParams.format,
    bbox: map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: layer.wmsParams.layers,
    query_layers: layer.wmsParams.layers,
    info_format: 'application/json',
    x: Math.round(point.x),
    y: Math.round(point.y),
  };

  const baseUrl = (layer as any)._url || (layer as any).options?.url;
  const url =
    baseUrl + L.Util.getParamString(params, baseUrl, true);

  const res = await fetch(url);
  return res.json();
}
