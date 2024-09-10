'use client';

import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import WMSCapabilities from 'wms-capabilities';
import { useMutation } from '@tanstack/react-query';

import { leftLayersAtom, rightLayersAtom } from '@/store/layers';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Inputs = {
  service: 'cog' | 'wms' | 'tiles';
  layerName: string;
  url: string;
  band?: number;
  colorMap?: string;
  wmsLayer?: string;
};

const Sidebar: React.FC<{ position: 'right' | 'left' }> = ({ position = 'left' }) => {
  const [layers, setLayers] = useAtom(position === 'left' ? leftLayersAtom : rightLayersAtom);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      service: 'cog',
      band: 1,
    },
  });

  const getWMSCapabilities = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(`${url}?service=WMS&request=GetCapabilities`);
      const xml = await response.text();
      const json = new WMSCapabilities(xml, DOMParser).toJSON();
      return json;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (data.service === 'cog') {
        setLayers([
          ...layers,
          {
            id: data.layerName,
            service: data.service,
            source: {
              type: 'raster',
              tiles: [
                `${process.env.NEXT_PUBLIC_TTILER}visible=True\u0026url=${data.url}\u0026bidx=${data.band}\u0026rescale=-2828.0%2C5514.0\u0026colormap=${data.colorMap}`,
              ],
              tileSize: 256,
            },
            layer: {
              type: 'raster',
            },
          },
        ]);
      }
      if (data.service === 'wms') {
        const defaultWMSParams = {
          format: 'image/png',
          service: 'WMS',
          version: '1.1.1',
          request: 'GetMap',
          srs: 'EPSG:3857',
          transparent: true,
          width: 256,
          height: 256,
          layers: data.wmsLayer,
        };
        const wmsParams = new URLSearchParams(
          JSON.parse(JSON.stringify(defaultWMSParams)),
        ).toString();
        const wmsURL = new URL(data.url);
        const wmsURLString = `${wmsURL.origin}${wmsURL.pathname}?bbox={bbox-epsg-3857}&${wmsParams}`;
        setLayers([
          ...layers,
          {
            id: data.layerName,
            service: data.service,
            source: { type: 'raster', tiles: [wmsURLString], tileSize: 256 },
            layer: { type: 'raster' },
          },
        ]);
      }
      if (data.service === 'tiles') {
        setLayers([
          ...layers,
          {
            id: data.layerName,
            service: data.service,
            source: { type: 'raster', tiles: [data.url], tileSize: 256 },
            layer: { type: 'raster' },
          },
        ]);
      }
    },
    [layers, setLayers],
  );

  const handleChange = useCallback(() => {
    if (watch('service') === 'wms') {
      getWMSCapabilities.mutate(watch('url'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <form onChange={handleChange} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label>Type</label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select name={field.name} onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cog">Cloud Optimized GeoTIF</SelectItem>
                <SelectItem value="tiles">Raster tiles</SelectItem>
                <SelectItem value="wms">WMS</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor={`${position}-layerName`}>Layer Name</label>
        <Input
          id={`${position}-layerName`}
          {...register('layerName', { required: 'Layer name field is required' })}
          className={errors.layerName && 'border-red-500'}
          placeholder="e.g. Landsat 8"
        />
        {errors.layerName && <div className="text-sm text-red-500">{errors.layerName.message}</div>}
      </div>
      <div className="space-y-2">
        <label htmlFor={`${position}-url`}>Dataset URL</label>
        <Input
          id={`${position}-url`}
          {...register('url', { required: 'URL field is required' })}
          type="url"
          className={errors.url && 'border-red-500'}
          placeholder='e.g. "https://example.com/{z}/{x}/{y}.png"'
        />
        {errors.url && <div className="text-sm text-red-500">{errors.url.message}</div>}
      </div>
      {watch('service') === 'cog' && (
        <div className="space-y-2">
          <label htmlFor={`${position}-band`}>Band</label>
          <Input
            id={`${position}-band`}
            {...register('band')}
            type="number"
            className={errors.band && 'border-red-500'}
          />
          {errors.band && <div className="text-sm text-red-500">{errors.band.message}</div>}
        </div>
      )}
      {watch('service') === 'cog' && (
        <div className="space-y-2">
          <label htmlFor={`${position}-colorMap`}>Color map</label>
          <Textarea
            id={`${position}-colorMap`}
            {...register('colorMap')}
            placeholder={'{ "key": "#ff0000" }'}
            className={errors.colorMap && 'border-red-500'}
          />
          {errors.colorMap && <div className="text-sm text-red-500">{errors.colorMap.message}</div>}
        </div>
      )}
      {watch('service') === 'wms' && (
        <div className="space-y-2">
          <label>WMS Layer</label>
          <Controller
            control={control}
            name="wmsLayer"
            render={({ field }) => (
              <Select
                disabled={getWMSCapabilities.isPending}
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a WMS Layer" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {getWMSCapabilities.data?.Capability.Layer.Layer.map((layer) => (
                    <SelectItem key={layer.Title} value={layer.Title}>
                      {layer.Title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
      <Button type="submit" size="sm">
        Add layer
      </Button>
    </form>
  );
};

export default Sidebar;
