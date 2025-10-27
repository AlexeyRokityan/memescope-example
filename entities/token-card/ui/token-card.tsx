'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CopyText from '@/components/ui/copy';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import type { MemescopeType } from '@/lib/api/endpoints/memescope';
import { cn, formatNumberCompact } from '@/lib/utils';
import ArrowsIcon from '@icons/arrows.svg';
import BrowserIcon from '@icons/browser.svg';
import CrownIcon from '@icons/crown.svg';
import CubeIcon from '@icons/cube.svg';
import InfographicIcon from '@icons/infographic.svg';
import ProtectIcon from '@icons/protect.svg';
import TargetIcon from '@icons/target.svg';
import TelegramIcon from '@icons/telegram.svg';
import UsersIcon from '@icons/users.svg';
import XIcon from '@icons/x.svg';
import ZipIcon from '@icons/zip.svg';

type TokenCardLayoutProps = HTMLAttributes<HTMLDivElement> & {
  data: MemescopeType;
  interactive?: boolean;
};

const TokenCardLayout = forwardRef<HTMLDivElement, TokenCardLayoutProps>(
  ({ data, interactive = true, className, ...rest }, ref) => {
    const { volume, tx = '', marketCap, watchers, ticker, name } = data;
    const [txFrom = '', txTo = ''] = tx.split('/');

    return (
      <div
        ref={ref}
        className={cn(
          'border border-dark-grey flex gap-[scale(9px)] text-base rounded-[scale(8px)] p-[scale(7px)_scale(7px)_scale(4px)] transition-colors justify-between group',
          interactive ? 'cursor-pointer hover:border-purpure/30' : 'cursor-default',
          className
        )}
        {...rest}
      >
        <div>
          <div className="w-[scale(60px)] h-[scale(60px)] text-xs flex items-center relative before:group-hover:animate-token-input-loading before:inset-[-1px] before:border-1 before:z-[1] before:border before:rounded-[scale(6px)] before:border-dark-grey before:group-hover:border-light-green before:absolute">
            NOTHINGCOIN
          </div>
          <div className="mt-[scale(3px)]">
            <Progress value={67} />
          </div>
          <div className="text-[scale(9px)] text-secondary-text text-center mt-[scale(-3px)]">
            18h 25 m
          </div>
        </div>
        <div>
          <div className="flex gap-[scale(12px)]">
            <div className="mt-[scale(-1px)]">
              <div className="flex">
                <CopyText text="ticker number">
                  <div>{name}</div>
                </CopyText>
                <div className="text-secondary-text ml-[scale(4px)]">{`#${ticker}`}</div>
              </div>
              <div className="flex gap-[scale(3px)] mt-[scale(9px)]">
                <Badge variant="icon">
                  <XIcon className="w-[scale(11px)]" />
                </Badge>
                <Badge variant="icon">
                  <TelegramIcon className="w-[scale(11px)]" />
                </Badge>
                <Badge variant="icon">
                  <BrowserIcon className="w-[scale(12px)]" />
                </Badge>
                <Badge variant="group">
                  <UsersIcon className="w-[scale(17px)]" />
                  <div>{watchers}</div>
                </Badge>
                <Badge
                  variant="group"
                  className="p-[scale(2px)_scale(6px)] gap-[scale(1px)] border-orange bg-orange/10"
                >
                  <CrownIcon className="w-[scale(17px)]" />
                  <div className="text-sm">
                    <span className="text-orange">{txFrom}/</span>
                    <span className="text-[rgb(149,_112,_9)]">{txTo}</span>
                  </div>
                </Badge>
              </div>
            </div>
            <div className="mt-[scale(-6px)] flex flex-col items-end">
              <div className="flex gap-[scale(5px)]">
                <div>MC</div>
                <div className="text-orange">${formatNumberCompact(marketCap)}</div>
              </div>
              <div className="flex gap-[scale(5px)]">
                <div>V</div>
                <div>${formatNumberCompact(volume)}</div>
              </div>
              <div className="flex gap-[scale(5px)]">
                <div>TX</div>
                <div className="flex">
                  <span className="text-light-green">{txFrom}</span>
                  <span>/</span>
                  <span className="text-red">{txTo}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-[scale(10px)] gap-[scale(6px)]">
            <Badge
              className="h-[scale(24px)] gap-[scale(4px)] p-[scale(4px)_scale(5px)]"
              variant="group"
            >
              <InfographicIcon className="w-[scale(16px)]" />
              <div className="text-light-green">13%</div>
            </Badge>
            <Badge
              className="h-[scale(24px)] gap-[scale(4px)] p-[scale(4px)_scale(5px)]"
              variant="group"
            >
              <ArrowsIcon className="w-[scale(14px)]" />
              <div className="text-light-green">0%</div>
            </Badge>
            <Badge
              className="h-[scale(24px)] gap-[scale(4px)] p-[scale(4px)_scale(5px)]"
              variant="group"
            >
              <ProtectIcon className="w-[scale(14px)]" />
              <div className="text-light-green">13%</div>
            </Badge>
            <Badge
              className="h-[scale(24px)] gap-[scale(4px)] p-[scale(4px)_scale(5px)]"
              variant="group"
            >
              <TargetIcon className="w-[scale(14px)]" />
              <div className="text-light-green">0%</div>
            </Badge>
            <Badge
              className="h-[scale(24px)] gap-[scale(4px)] p-[scale(4px)_scale(5px)]"
              variant="group"
            >
              <CubeIcon className="w-[scale(15px)]" />
              <div className="text-light-green">0%</div>
            </Badge>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={cn(
              'bg-secondary-bg border border-transparent transition-colors rounded-[scale(8px)] size-[scale(82px)] flex',
              interactive ? 'group-hover:border-purpure' : ''
            )}
            disabled={!interactive}
          >
            <div className="m-auto">
              <ZipIcon className="w-[scale(15px)] h-auto m-[scale(5px)_auto_scale(0px)]" />
              <div
                className={cn(
                  'transition-all font-medium',
                  interactive ? 'text-[0] group-hover:text-base' : 'text-base'
                )}
              >
                BUY
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
);
TokenCardLayout.displayName = 'TokenCardLayout';

export function TokenCard(props: MemescopeType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TokenCardLayout data={props} interactive />
      </DialogTrigger>
      <DialogContent className="max-w-[scale(560px)]">
        <DialogHeader>
          <DialogTitle>{props.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-[scale(12px)]">
          <TokenCardLayout data={props} interactive={false} />
        </div>
        <DialogFooter className="flex gap-[scale(8px)] justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="link"
              className="h-[scale(32px)] px-[scale(16px)] bg-transparent text-foreground"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="h-[scale(32px)] px-[scale(20px)] bg-light-green text-main-bg"
            >
              Quick Buy
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
