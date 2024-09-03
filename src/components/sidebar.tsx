'use client';

import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

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
  service: 'cog' | 'wms';
  name: string;
  url: string;
  band?: number;
  colorMap?: string;
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

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (data.service === 'cog') {
        setLayers([
          ...layers,
          {
            id: data.name,
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
        setLayers([
          ...layers,
          {
            id: data.name,
            service: data.service,
            source: { type: 'raster', tiles: [data.url], tileSize: 256 },
            layer: { type: 'raster' },
          },
        ]);
      }
    },
    [layers, setLayers],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name">Type</label>
        <Controller
          control={control}
          name="service"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cog">Cloud Optimized GeoTIF</SelectItem>
                <SelectItem value="wms">WMS</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="name">Layer Name</label>
        <Input
          {...register('name', { required: 'Name field is required' })}
          className={errors.name && 'border-red-500'}
          placeholder="e.g. Landsat 8"
        />
        {errors.name && <div className="text-sm text-red-500">{errors.name.message}</div>}
      </div>
      <div className="space-y-2">
        <label htmlFor="url">Dataset URL</label>
        <Input
          {...register('url', { required: 'URL field is required' })}
          type="url"
          className={errors.name && 'border-red-500'}
          placeholder='e.g. "https://example.com/{z}/{x}/{y}.png"'
        />
        {errors.url && <div className="text-sm text-red-500">{errors.url.message}</div>}
      </div>
      {watch('service') === 'cog' && (
        <div className="space-y-2">
          <label htmlFor="band">Band</label>
          <Input {...register('band')} type="number" />
        </div>
      )}
      {watch('service') === 'cog' && (
        <div className="space-y-2">
          <label htmlFor="cogStyles">Color map</label>
          <Textarea {...register('colorMap')} placeholder={'{ "key": "#ff0000" }'} />
        </div>
      )}
      <Button type="submit" size="sm">
        Add layer
      </Button>
    </form>
  );
};

export default Sidebar;
