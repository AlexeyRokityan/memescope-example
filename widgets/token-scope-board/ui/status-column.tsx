'use client';

import { memo, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import { TokenCard } from '@/entities/token-card';
import { useResponsiveScaleValue } from '@/hooks/use-responsive-scale';
import type { MemescopeStatusType, MemescopeType } from '@/lib/api/endpoints/memescope';
import { applyFilters, type FilterCondition } from '@/widgets/token-scope-board/model/filtering';
import MoonIcon from '@icons/moon.svg';
import PillIcon from '@icons/pill.svg';

import { StatusFilterDialog } from './status-filter-dialog';

const STATUS_LABEL: Record<MemescopeStatusType, string> = {
  new: 'New',
  completing: 'Completing',
  completed: 'Completed',
};

const CARD_BASE_HEIGHT = 103;
const CARD_VERTICAL_SPACING = 8;

type VirtualColumnProps = {
  tokens: MemescopeType[];
  parentRef: MutableRefObject<HTMLElement | null>;
};

const VirtualTokens = memo(({ tokens, parentRef }: VirtualColumnProps) => {
  const scale = useResponsiveScaleValue();
  const baseEstimatedHeight = useMemo(
    () => (CARD_BASE_HEIGHT + CARD_VERTICAL_SPACING) * scale,
    [scale]
  );
  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    getItemKey: (index) => tokens[index]?.id ?? index,
    estimateSize: () => baseEstimatedHeight,
    overscan: 12,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    rowVirtualizer.measure();
  }, [baseEstimatedHeight, rowVirtualizer, tokens.length]);

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            className="absolute left-0 w-full"
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div className={virtualRow.index !== tokens.length - 1 ? 'pb-[scale(8px)]' : undefined}>
              <TokenCard {...tokens[virtualRow.index]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
VirtualTokens.displayName = 'VirtualTokens';

export type StatusColumnProps = {
  status: MemescopeStatusType;
  tokens: MemescopeType[];
};

export function StatusColumn({ status, tokens }: StatusColumnProps) {
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const filteredTokens = useMemo(() => applyFilters(tokens, filters), [tokens, filters]);

  return (
    <section
      ref={scrollContainerRef}
      className="w-full border-r border-dark-grey last:border-none pr-[scale(14px)] last:pr-0 min-w-[scale(436px)] min-h-0 overflow-y-auto overflow-x-hidden pb-[scale(30px)]"
    >
      <div className="sticky top-0 z-[1] flex items-center p-[scale(6px)_0_scale(24px)] justify-between bg-main-bg">
        <div className="flex items-center">
          <PillIcon className="w-[scale(16px)]" />
          <MoonIcon className="w-[scale(16px)] ml-[scale(-4px)]" />
          <div className="ml-[scale(12px)]">{STATUS_LABEL[status]}</div>
        </div>
        <StatusFilterDialog filters={filters} onSave={setFilters} />
      </div>
      <VirtualTokens tokens={filteredTokens} parentRef={scrollContainerRef} />
    </section>
  );
}
