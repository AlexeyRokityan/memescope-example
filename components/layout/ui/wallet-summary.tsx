import BalanceIcon from '@icons/balance.svg';
import ChevronDownIcon from '@icons/chevron-down.svg';
import SolIcon from '@icons/sol.svg';
import WalletIcon from '@icons/wallet.svg';

export function WalletSummary() {
  return (
    <div className="bg-secondary-bg h-[scale(30px)] overflow-hidden flex items-center rounded-full text-lg">
      <button
        type="button"
        className="flex p-[scale(6px)_scale(8px)_scale(6px)_scale(14px)] gap-[scale(9px)] hover:bg-dark-grey rounded-tl-full rounded-bl-full transition-colors"
      >
        <span>
          <WalletIcon className="w-[scale(19px)]" />
        </span>
        <span className="flex gap-[scale(4px)]">
          <SolIcon />
          <span className="">0.00</span>
        </span>
      </button>
      <span className="w-[scale(1px)] bg-main-bg h-full" />
      <button
        type="button"
        className="flex p-[scale(6px)_scale(12px)_scale(6px)_scale(8px)] gap-[scale(10px)] hover:bg-dark-grey rounded-tr-full rounded-br-full transition-colors"
      >
        <span className="flex gap-[scale(4px)]">
          <BalanceIcon />
          <span className="">0.00</span>
        </span>
        <ChevronDownIcon className="w-[14px] m-auto pl-[scale(3px)]" />
      </button>
    </div>
  );
}
