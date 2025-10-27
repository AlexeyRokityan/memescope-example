import type { PropsWithChildren } from 'react';

import { Navbar } from './navbar';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col flex-1">
      <Navbar />
      <main className="flex flex-col flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
