import { getMemescopeOverview } from '@/lib/api/endpoints/memescope';
import { TokenScopeBoard } from '@/widgets/token-scope-board';

export async function TokenScopeBoardSection() {
  const tokens = await getMemescopeOverview();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <TokenScopeBoard tokens={tokens} />
    </div>
  );
}
