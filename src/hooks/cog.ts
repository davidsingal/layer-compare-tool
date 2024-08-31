import { type MutationOptions, useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

export type PointResponse = {
  coordinates: [number, number];
  values: number[];
  band_names: string[];
};

type PointParams = { lon: number; lat: number; url: string; bidx?: number };

const fetchPointData = (params: PointParams) => {
  const { lon, lat, ...restParams } = params;
  return axios.get<PointResponse>(`https://titiler.xyz/cog/point/${lon},${lat}`, {
    params: restParams,
  });
};

export function usePointMutation(
  config?: Partial<MutationOptions<AxiosResponse<PointResponse>, Error, PointParams>>,
) {
  return useMutation<AxiosResponse<PointResponse>, Error, PointParams>({
    mutationKey: ['data-point'],
    mutationFn: (pointParams) => fetchPointData(pointParams || { lon: 0, lat: 0, url: '' }),
    retry: 0,
    ...(config || {}),
  });
}
