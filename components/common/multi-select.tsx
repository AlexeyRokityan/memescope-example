'use client';

import * as React from 'react';

import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import FilterIcon from '@icons/filter.svg';

export type MultiSelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  placeholder?: string;
  isSearch?: boolean;
  className?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  label = 'Filter',
  placeholder = 'Search option...',
  isSearch = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleValue = (nextValue: string) => {
    if (value.includes(nextValue)) {
      onChange(value.filter((item) => item !== nextValue));
    } else {
      onChange([...value, nextValue]);
    }
  };

  const clearSelection = () => {
    onChange([]);
  };

  const selectionCount = value.length;
  const hasSelection = selectionCount > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          aria-expanded={open}
          className={cn(
            'flex w-fit items-center justify-between rounded-full p-[0_scale(20px)] gap-[scale(20px)]',
            className
          )}
        >
          <span className="flex items-center text-base gap-[scale(8px)]">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            {label}
          </span>
          {hasSelection && (
            <span className="bg-purpure rounded-[scale(4px)] w-[scale(19px)] h-[scale(20)] text-base font-normal text-main-bg">
              {selectionCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[scale(300px)] p-0">
        <Command shouldFilter={isSearch}>
          {isSearch && <CommandInput placeholder={placeholder} />}
          <div className="flex items-center justify-between border-b border-border/60 p-[scale(4px)_scale(8px)] text-base">
            <span>{hasSelection ? `${selectionCount} selected` : 'No filters selected'}</span>
            {hasSelection && (
              <button type="button" className="text-base" onClick={clearSelection}>
                Clear
              </button>
            )}
          </div>
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => {
                const checked = value.includes(opt.value);
                return (
                  <CommandItem
                    key={opt.value}
                    value={`${opt.value} ${opt.label}`}
                    onSelect={() => toggleValue(opt.value)}
                    className="gap-3"
                  >
                    <Checkbox checked={checked} className="pointer-events-none" />
                    {opt.icon && <span className="text-muted-foreground">{opt.icon}</span>}
                    <span className="flex-1 truncate text-sm">{opt.label}</span>
                    {checked && <Check className="h-4 w-4 text-primary" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
