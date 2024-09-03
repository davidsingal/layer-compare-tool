'use client';

import Script from 'next/script';

const GoogleAdsense: React.FC = () => {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: 300, height: 250 }}
        data-ad-client="ca-pub-7918890133851349"
        data-ad-slot="1901695133"
      />
      <Script
        id="adsbygoogle-init"
        dangerouslySetInnerHTML={{
          __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `,
        }}
      />
    </>
  );
};

export default GoogleAdsense;
