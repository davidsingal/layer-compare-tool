'use client';

import { useRef, useEffect, useState } from 'react';
import Map, { Layer, Source, useMap } from 'react-map-gl/maplibre';
import Compare from '@maplibre/maplibre-gl-compare';
import { useAtom } from 'jotai';

import layersAtom from '@/store/layers';
import { usePointMutation } from '@/hooks/cog';
import cogValues from '@/data/cog-values.json';

const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

const values: Record<number, { short_name: string; color: number[] }> = cogValues;

const TIF_URL =
  'https://global-ecosystem-atlas-staging-assets-bucket.s3.eu-west-3.amazonaws.com/latest/EFG_Type/100m/Global_EFG_Type_100m_8bit_wgs84.tif';
// https://titiler.xyz/api.html#/Cloud%20Optimized%20GeoTIFF/tile_cog_tiles__tileMatrixSetId___z___x___y___scale_x_get
const COLOR_MAP = Object.fromEntries(
  Object.entries(values).map(([key, value]) => [
    key,
    rgbToHex(value.color[0], value.color[1], value.color[2]),
  ]),
);

const MapComponent: React.FC = () => {
  const compareRef = useRef<Compare | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [layers] = useAtom(layersAtom);
  const { leftMap, rightMap } = useMap();
  const pointMutation = usePointMutation();

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
        onClick={(e) => {
          pointMutation.mutate({ lon: e.lngLat.lng, lat: e.lngLat.lat, url: TIF_URL, bidx: 1 });
        }}
      >
        {layers.map((layerSpec) => (
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
        onClick={(e) => {
          pointMutation.mutate({ lon: e.lngLat.lng, lat: e.lngLat.lat, url: TIF_URL, bidx: 1 });
        }}
      >
        <Source
          type="raster"
          tiles={[
            `${process.env.NEXT_PUBLIC_TTILER}?visible=True\u0026url=${TIF_URL}\u0026bidx=1\u0026colormap=${encodeURIComponent(JSON.stringify(COLOR_MAP))}`,
          ]}
          tileSize={256}
        >
          <Layer id="default-right-layer" type="raster" />
        </Source>
      </Map>
    </div>
  );
};

export default MapComponent;
