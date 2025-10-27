import { TokenScopeBoardSection, TokenScopeHeaderSection } from './sections';

export default function ScopeWorkspace() {
  return (
    <section className="flex flex-col flex-1 overflow-hidden">
      <TokenScopeHeaderSection />
      <TokenScopeBoardSection />
    </section>
  );
}
