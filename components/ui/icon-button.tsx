import type { PropsWithChildren } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'bg-secondary-bg rounded-full text-base hover:bg-purpure/40 transition-colors',
  {
    variants: {
      variant: {
        default: 'p-[scale(6px)] w-[scale(30px)] h-[scale(30px)]',
        group: 'flex gap-[scale(14px)] p-[scale(11px)_scale(22px)] h-[scale(36px)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type IconButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function IconButton({ children, variant, className }: PropsWithChildren<IconButtonType>) {
  return (
    <button type="button" className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}
