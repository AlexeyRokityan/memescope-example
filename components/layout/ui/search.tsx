import React from 'react';

import { cn } from '@/lib/utils';
import SearchIcon from '@icons/search.svg';

export const Search = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center gap-[scale(8px)] bg-[rgba(255,_255,_255,_0.03)] rounded-full border-secondary-bg border border-solid h-[scale(30px)] max-w-fit p-[scale(5px)_scale(12px)_scale(4px)] focus-within:border-purpure/50 hover:border-purpure/50 transition-colors',
          className
        )}
      >
        <SearchIcon className="w-[16px] min-w-[scale(16px)]" />
        <input
          type={type}
          className={cn(
            'h-full transition-all w-[scale(98px)] bg-transparent text-lg focus:w-[scale(200px)]',
            {
              'w-[scale(200px)]': !!value,
            }
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Search.displayName = 'Search';
