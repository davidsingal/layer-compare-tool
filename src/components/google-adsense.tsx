'use client';

import { Adsense } from '@ctrl/react-adsense';

const GoogleAdsense: React.FC = () => {
  return (
    <Adsense
      client="ca-pub-7918890133851349"
      slot="1901695133"
      style={{ display: 'block', width: 300, height: 250 }}
      adTest={process.env.NODE_ENV === 'production' ? undefined : 'on'}
    />
  );
};

export default GoogleAdsense;
