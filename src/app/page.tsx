import dynamic from 'next/dynamic';

import Sidebar from '@/components/sidebar';
import Metadata from '@/components/metadata';
import ActiveLayers from '@/components/active-layers';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <main className="fixed left-0 top-0 flex h-full w-full divide-x">
      <div className="w-1/6 min-w-[360px] grow-0 divide-y">
        <Sidebar />
        <ActiveLayers />
      </div>
      <div className="flex grow flex-col divide-y">
        <div className="relative grow">
          <Map />
        </div>
        <div className="grow-0">
          <Metadata />
        </div>
      </div>
    </main>
  );
}
