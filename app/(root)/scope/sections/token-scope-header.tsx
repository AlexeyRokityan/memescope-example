import { DisplayToggle } from '@/features/memescope/display-toggle';
import { FilterPanel } from '@/features/memescope/filters';
import { QuickBuyPanel } from '@/features/memescope/quick-buy';

export function TokenScopeHeaderSection() {
  return (
    <div className="p-[0_scale(24px)]">
      <div className="p-[scale(3px)_0_scale(5px)] border-b border-dark-grey flex items-center justify-between">
        <div>
          <div className="text-large font-medium">Token Scope</div>
          <div className="text-lg text-secondary-text">
            Track token migration progress across launch, bonding, and migration stages
          </div>
        </div>
        <div className="flex items-center gap-[scale(36px)] pt-[scale(2px)]">
          <QuickBuyPanel />
          <div className="flex gap-[scale(8px)]">
            <FilterPanel />
            <DisplayToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
