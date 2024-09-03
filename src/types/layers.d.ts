import type { LayerProps, SourceProps } from 'react-map-gl/maplibre';

export type LayerSpec = {
  id: string;
  service: 'cog' | 'wms' | 'tiles';
  source: SourceProps;
  layer: LayerProps;
};
