declare module '@maplibre/maplibre-gl-compare' {
  import { Map } from 'maplibre-gl';
  class Compare {
    constructor(leftMap: Map, rightMap: Map, container: HTMLDivElement, options?: object);
    remove(): void;
  }
  export = Compare;
}
