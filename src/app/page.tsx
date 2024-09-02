import dynamic from 'next/dynamic';

import Sidebar from '@/components/sidebar';
import ActiveLayers from '@/components/active-layers';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function Home() {
  return (
    <>
      <header className="fixed left-0 top-0 z-10 flex h-16 w-full items-center gap-2 bg-foreground px-6 text-background shadow-md">
        <h1 className="text-xl font-bold">Layer Compare Tool</h1>
        <div className="text-background/50">by David Inga</div>
      </header>
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
