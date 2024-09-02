'use client';

import GoogleAdsense from '@/components/google-adsense';

const Header: React.FC = () => {
  return (
    <header className="fixed left-0 top-0 z-10 flex h-16 w-full items-center gap-2 bg-foreground px-6 text-background shadow-md">
      <h1 className="text-xl font-bold">Layer Compare Tool</h1>
      <div className="text-background/50">by David Inga</div>
      <div className="flex h-full flex-1 items-center justify-end">
        <GoogleAdsense />
      </div>
    </header>
  );
};

export default Header;
