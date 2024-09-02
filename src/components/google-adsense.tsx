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
        strategy="afterInteractive"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7918890133851349"
        data-ad-slot="1901695133"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="ads" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
};

export default GoogleAdsense;
