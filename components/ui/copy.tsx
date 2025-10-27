'use client';

import type { PropsWithChildren } from 'react';

import CopyIcon from '@icons/copy.svg';

export type CopyTextType = {
  className?: string;
  text: string;
  onClick?(): void;
};

export function CopyText(props: PropsWithChildren<CopyTextType>) {
  const { children, text, onClick, className } = props;

  const handleClick = async () => {
    try {
      await navigator.clipboard?.writeText(text);
      if (typeof onClick === 'function') onClick();
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      <div className="flex">
        <span>{children || text}</span>
        <CopyIcon className="m-[scale(1px)_0_0_scale(3px)] w-[scale(16px)] max-w-[scale(16px)]" />
      </div>
    </button>
  );
}

export default CopyText;
