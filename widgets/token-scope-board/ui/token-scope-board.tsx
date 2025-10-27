import type { MemescopeType } from '@/lib/api/endpoints/memescope';

import { StatusColumn } from './status-column';
import { TOKEN_SCOPE_STATUSES } from '../model/statuses';

type TokenScopeBoardProps = {
  tokens: MemescopeType[];
};

export function TokenScopeBoard({ tokens }: TokenScopeBoardProps) {
  const grouped = TOKEN_SCOPE_STATUSES.map((status) => ({
    status,
    tokens: tokens.filter((token) => token.status === status),
  }));

  return (
    <div className="flex gap-[scale(14px)] w-full p-[scale(18px)_scale(24px)_0] flex-1 overflow-x-auto overflow-y-hidden min-h-0">
      {grouped.map(({ status, tokens: items }) => {
        return <StatusColumn key={status} status={status} tokens={items} />;
      })}
    </div>
  );
}
