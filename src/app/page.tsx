import dynamic from 'next/dynamic';

import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import ActiveLayers from '@/components/active-layers';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main className="fixed left-0 top-16 grid h-[calc(100vh-64px)] w-full grid-cols-6 divide-x">
        <div className="divide-y overflow-y-auto">
          <Sidebar position="left" />
          <ActiveLayers position="left" />
        </div>
        <div className="relative col-span-4 grow">
          <Map />
        </div>
        <div className="divide-y overflow-y-auto">
          <Sidebar position="right" />
          <ActiveLayers position="right" />
        </div>
      </main>
    </>
  );
}
