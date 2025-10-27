import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex items-center gap-[scale(8px)] bg-[rgba(255,_255,_255,_0.03)] rounded-full border-secondary-bg border border-solid h-[scale(30px)] max-w-fit p-[scale(5px)_scale(12px)_scale(4px)] focus-within:border-purpure/50 hover:border-purpure/50 transition-colors text-base',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
