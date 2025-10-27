import SolIcon from '@icons/sol.svg';
import ZipIcon from '@icons/zip.svg';

export function QuickBuyPanel() {
  return (
    <button className="flex bg-secondary-bg rounded-full text-base hover:bg-purpure/40 transition-colors h-[scale(36px)]">
      <div className="flex items-center p-[scale(12px)_scale(10px)_scale(11px)_scale(12px)] gap-[scale(4px)]">
        <ZipIcon />
        <div className="whitespace-nowrap">Quick Buy</div>
      </div>
      <div className="flex bg-dark-grey items-center rounded-full p-[scale(12px)] gap-[scale(12px)]">
        <div>0</div>
        <SolIcon className="min-w-[scale(14px)]" />
      </div>
    </button>
  );
}
