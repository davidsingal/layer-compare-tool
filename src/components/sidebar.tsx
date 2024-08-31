'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Inputs = {
  service: string;
  name: string;
  url: string;
};

const Sidebar: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <div>
        <label htmlFor="name">Select layer service to compare to the map:</label>
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
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label htmlFor="name">Layer Name:</label>
        <Input {...register('name')} />
      </div>
      <div>
        <label htmlFor="url">Enter the dataset URL:</label>
        <Input {...register('url', { required: true })} type="url" />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Sidebar;
