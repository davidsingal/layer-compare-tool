import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import Providers from '@/app/providers';

import 'maplibre-gl/dist/maplibre-gl.css';
import '@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Raster, COG, WMS Layer Comparison Tool',
  description:
    'A tool to compare Raster, COG and WMS layers. Analyze and visualize geospatial data. Perfect for GIS professionals looking to enhance mapping accuracy and efficiency.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7918890133851349"
        crossOrigin="anonymous"
      />
    </html>
  );
}
