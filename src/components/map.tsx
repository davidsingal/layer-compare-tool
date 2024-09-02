'use client';

import { useRef, useEffect } from 'react';
import Map, { Layer, Source, useMap } from 'react-map-gl/maplibre';
import Compare from '@maplibre/maplibre-gl-compare';
import { useAtom } from 'jotai';

import { leftLayersAtom, rightLayersAtom } from '@/store/layers';

const TIF_URL =
  'https://global-ecosystem-atlas-staging-assets-bucket.s3.eu-west-3.amazonaws.com/latest/EFG_Type/100m/Global_EFG_Type_100m_8bit_wgs84.tif';
// https://titiler.xyz/api.html#/Cloud%20Optimized%20GeoTIFF/tile_cog_tiles__tileMatrixSetId___z___x___y___scale_x_get

const MapComponent: React.FC = () => {
  const compareRef = useRef<Compare | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftLayers] = useAtom(leftLayersAtom);
  const [rightLayers] = useAtom(rightLayersAtom);
  const { leftMap, rightMap } = useMap();

  useEffect(() => {
    if (leftMap && rightMap && containerRef?.current && !compareRef.current) {
      const map = new Compare(
        leftMap.getMap(),
        rightMap.getMap(),
        containerRef.current as HTMLDivElement,
      );
      compareRef.current = map;
    }
  }, [leftMap, rightMap]);

  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-hidden" ref={containerRef}>
      <Map
        id="leftMap"
        initialViewState={{
          longitude: 20,
          latitude: 0,
          zoom: 3,
        }}
        mapStyle={'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          userSelect: 'none',
        }}
      >
        {leftLayers.map((layerSpec) => (
          <Source key={layerSpec.id} {...layerSpec.source}>
            <Layer {...layerSpec.layer} />
          </Source>
        ))}
      </Map>
      <Map
        id="rightMap"
        initialViewState={{
          longitude: 20,
          latitude: 0,
          zoom: 3,
        }}
        mapStyle={'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          userSelect: 'none',
        }}
      >
        {rightLayers.map((layerSpec) => (
          <Source key={layerSpec.id} {...layerSpec.source}>
            <Layer {...layerSpec.layer} />
          </Source>
        ))}
      </Map>
    </div>
  );
};

export default MapComponent;
