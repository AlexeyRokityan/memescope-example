import { IconButton } from '@/components/ui/icon-button';
import SettingsIcon from '@icons/settings.svg';

export function DisplayToggle() {
  return (
    <IconButton className="flex items-center w-auto" variant="group">
      <SettingsIcon className="min-w-[14px]" />
      Display
    </IconButton>
  );
}
