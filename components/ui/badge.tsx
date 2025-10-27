import type { PropsWithChildren } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full text-base p-[scale(3px)_scale(4px)] h-[scale(22px)] max-w-max border bg-secondary-bg border-solid border-transparent w-auto',
  {
    variants: {
      variant: {
        default: 'bg-secondary-bg',
        icon: 'w-[scale(22px)]',
        group: 'flex gap-[scale(2px)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type BadgeType = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, children, ...props }: PropsWithChildren<BadgeType>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
