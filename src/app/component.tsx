'use client';

import dynamic from 'next/dynamic';

import Sidebar from '@/components/sidebar';
import ActiveLayers from '@/components/active-layers';
import GoogleAdsense from '@/components/google-adsense';
import { Media } from '@/components/media';

const Map = dynamic(() => import('@/components/map'), { ssr: false });
// const MediaQuery = dynamic(() => import('react-responsive'), { ssr: false });

const Desktop: React.FC = () => (
  <>
    <Media greaterThanOrEqual="lg" className="flex grow px-6">
      <div className="min-w-[300px] space-y-6 py-6">
        <Sidebar position="left" />
        <div className="h-[250px] w-full">
          <GoogleAdsense />
        </div>
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
    </Media>
    <Media lessThan="lg" className="flex grow px-6">
      <div className="py-6">
        <p className="text-md text-center">
          Sorry, this application is only available on Desktop devices.
        </p>
      </div>
    </Media>
  </>
);

export default Desktop;
