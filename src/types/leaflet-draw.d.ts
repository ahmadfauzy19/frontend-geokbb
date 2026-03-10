import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    class Draw extends L.Control {
      constructor(options?: any);
    }
  }

  namespace Draw {
    class Polyline extends L.Handler {
      constructor(map: L.Map, options?: any);
      enable(): void;
      disable(): void;
    }

    class Polygon extends L.Handler {
      constructor(map: L.Map, options?: any);
      enable(): void;
      disable(): void;
    }

    class CircleMarker extends L.Handler {
      constructor(map: L.Map, options?: any);
      enable(): void;
      disable(): void;
    }
  }
}
