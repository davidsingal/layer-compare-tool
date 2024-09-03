import Script from 'next/script';

const GoogleAdsense: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7918890133851349"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block', height: '300px', width: '250px' }}
        data-ad-client="ca-pub-7918890133851349"
        data-ad-slot="1901695133"
      />
      <Script id="ads">{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
    </>
  );
};

export default GoogleAdsense;
