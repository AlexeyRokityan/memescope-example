import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <div className="fixed inset-0 z-[100] flex">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn('size-[scale(50px)] m-auto animate-spin', className)}
        {...props}
      />
    </div>
  );
}

export { Spinner };
