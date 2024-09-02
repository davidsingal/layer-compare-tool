'use client';

import { useState } from 'react';
import { MapProvider } from 'react-map-gl/maplibre';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MapProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </MapProvider>
    </QueryClientProvider>
  );
};

export default Providers;
