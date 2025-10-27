import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NUMBER_SUFFIXES = [
  { value: 1_000_000_000, suffix: 'B' },
  { value: 1_000_000, suffix: 'M' },
  { value: 1_000, suffix: 'K' },
] as const;

export function formatNumberCompact(value: number): string {
  if (!Number.isFinite(value)) {
    return '0';
  }

  const absoluteValue = Math.abs(value);

  for (const { value: threshold, suffix } of NUMBER_SUFFIXES) {
    if (absoluteValue >= threshold) {
      const compact = Number((value / threshold).toFixed(absoluteValue >= threshold * 10 ? 0 : 1));
      return `${compact}${suffix}`;
    }
  }

  return value.toString();
}

export const LAYOUT_BASE_WIDTH = 1440;
const MIN_RESPONSIVE_SCALE = 1;
const MAX_RESPONSIVE_SCALE = 4;

export function calculateResponsiveScale(width: number, baseWidth = LAYOUT_BASE_WIDTH): number {
  if (!Number.isFinite(width) || width <= 0) {
    return MIN_RESPONSIVE_SCALE;
  }

  const ratio = width / baseWidth;
  const clamped = Math.min(MAX_RESPONSIVE_SCALE, Math.max(MIN_RESPONSIVE_SCALE, ratio));

  return Number(clamped.toFixed(4));
}

type ResponsiveUnit = 'px' | 'rem' | 'em';

export function responsiveSize(value: number, unit: ResponsiveUnit = 'px', scale?: number): string {
  if (!Number.isFinite(value)) {
    return `0${unit}`;
  }

  if (typeof scale === 'number' && Number.isFinite(scale) && scale > 0) {
    return `${value * scale}${unit}`;
  }

  return `calc(var(--responsive-scale) * ${value}${unit})`;
}
