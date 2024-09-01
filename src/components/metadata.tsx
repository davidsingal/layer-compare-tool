'use client';

import { useMutationState } from '@tanstack/react-query';

import cogValues from '@/data/cog-values.json';

import type { PointResponse } from '@/hooks/cog';
import type { AxiosResponse } from 'axios';

const values: Record<number, { short_name: string }> = cogValues;

const Metadata: React.FC = () => {
  const mutations = useMutationState({
    filters: { mutationKey: ['data-point'] },
    select: (mutation) => mutation.state,
  });
  const pointMutation = mutations?.[mutations.length - 1];
  const pointMutationData = pointMutation?.data as AxiosResponse<PointResponse> | undefined;

  return (
    <div className="p-2 text-sm">
      {pointMutation?.status === 'success' && pointMutationData && (
        <div>
          <h3>
            {pointMutationData.data.values[0] !== 0
              ? values[pointMutationData.data.values[0]].short_name
              : 'No data'}
          </h3>
        </div>
      )}
      {pointMutation?.status === 'pending' && <div>Loading...</div>}
      {!pointMutation && <div>Click on the map to get the data point</div>}
    </div>
  );
};

export default Metadata;
