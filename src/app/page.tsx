import dynamic from 'next/dynamic';
import { Adsense } from '@ctrl/react-adsense';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import ActiveLayers from '@/components/active-layers';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <div className="flex h-screen min-h-[768px] w-full flex-col">
      <Header />
      <main className="flex grow px-6">
        <div className="min-w-[300px] space-y-6 py-6">
          <Sidebar position="left" />
          {process.env.NODE_ENV === 'production' && (
            <Adsense
              client="ca-pub-7918890133851349"
              slot="1901695133"
              style={{ width: 300, height: 250 }}
              format=""
            />
          )}
        </div>
        <div className="flex grow p-6">
          <div className="relative grow overflow-hidden rounded-md border">
            <Map />
            <ActiveLayers position="left" />
            <ActiveLayers position="right" />
          </div>
        </div>
        <div className="min-w-[300px] space-y-6 py-6">
          <Sidebar position="right" />
        </div>
      </main>
    </div>
  );
}
