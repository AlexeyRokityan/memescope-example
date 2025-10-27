'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';
import BellIcon from '@icons/bell.svg';
import LogoIcon from '@icons/logo.svg';
import SettingsIcon from '@icons/settings.svg';
import StarIcon from '@icons/star.svg';

import { Search } from './ui/search';
import { WalletSummary } from './ui/wallet-summary';

const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Discover',
    path: '/discover',
  },
  {
    title: 'Scope',
    path: '/scope',
  },
  {
    title: 'Trackers',
    path: '/trackers',
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="p-[0_scale(24px)]">
      <div className="border-b border-dark-grey p-[scale(18px)_0]">
        <div className="flex justify-between">
          <div className="flex items-center gap-[45px]">
            <Link href="/" className="">
              <LogoIcon className="w-[scale(20px)] ml-[scale(3px)]" />
            </Link>

            <nav>
              <ul className="flex gap-[scale(32px)]">
                {links.map(({ title, path }) => {
                  const isActive =
                    pathname === path || (path !== '/' && pathname?.startsWith(`${path}/`));

                  return (
                    <li key={path} className="flex">
                      <Link
                        href={path}
                        className={cn('text-lg font-medium transition-colors hover:text-purpure', {
                          'text-purpure': isActive,
                        })}
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="mt-[scale(-5px)] flex gap-[scale(16px)]">
            <div className="w-[scale(250px)]">
              <Search />
            </div>
            <div className="flex gap-[scale(16px)]">
              <IconButton>
                <BellIcon />
              </IconButton>
              <IconButton>
                <StarIcon />
              </IconButton>
              <WalletSummary />
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
