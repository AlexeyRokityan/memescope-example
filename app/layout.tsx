import type { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import { ResponsiveScaleProvider } from '@/hooks/use-responsive-scale';
import { ThemeProvider } from '@providers/theme-provider';

import './globals.css';

const outfit = Outfit({
  variable: '--font-family',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Memescope Example',
  description: 'Testing example',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${outfit.variable}`}>
        <ThemeProvider>
          <ResponsiveScaleProvider>{children}</ResponsiveScaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
