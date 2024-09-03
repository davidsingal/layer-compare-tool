import dynamic from 'next/dynamic';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import ActiveLayers from '@/components/active-layers';
import GoogleAdsense from '@/components/google-adsense';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <div className="flex h-full min-h-[768px] w-full flex-col">
      <Header />
      <main className="flex grow px-6">
        <div className="min-w-[300px] space-y-6 py-6">
          <Sidebar position="left" />
          <GoogleAdsense />
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
