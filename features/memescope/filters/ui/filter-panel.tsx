import { IconButton } from '@/components/ui/icon-button';
import FilterIcon from '@icons/filter.svg';

export function FilterPanel() {
  return (
    <IconButton className="flex items-center w-auto" variant="group">
      <FilterIcon className="min-w-[14px]" />
      Filter
    </IconButton>
  );
}
