import dynamic from 'next/dynamic';

import Sidebar from '@/components/sidebar';
import Metadata from '@/components/metadata';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <main className="absolute left-0 top-0 flex h-full w-full">
      <div className="w-1/6 min-w-[360px] grow-0">
        <Sidebar />
      </div>
      <div className="flex grow flex-col">
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
