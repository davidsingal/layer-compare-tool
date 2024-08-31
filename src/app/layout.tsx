import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/app/providers';

import 'maplibre-gl/dist/maplibre-gl.css';
import '@maplibre/maplibre-gl-compare/dist/maplibre-gl-compare.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Layer Visualizer',
  description: 'Visualize the layers of a list of sources',
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
    </html>
  );
}
