'use client';

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Spinner } from '@/components/ui/spinner';
import { LAYOUT_BASE_WIDTH, calculateResponsiveScale } from '@/lib/utils';

const DEFAULT_SCALE = 1;
const EPSILON = 0.0001;

type ResponsiveScaleContextValue = {
  scale: number;
  isReady: boolean;
};

const ResponsiveScaleContext = createContext<ResponsiveScaleContextValue>({
  scale: DEFAULT_SCALE,
  isReady: false,
});

const readViewportWidth = () =>
  typeof window !== 'undefined' ? window.innerWidth : LAYOUT_BASE_WIDTH;

const applyScale = (scale: number, width: number) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.style.setProperty('--responsive-scale', `${scale}`);
  root.style.setProperty('--viewport-width', `${Math.round(width)}`);
};

function useResponsiveScaleInternal() {
  const scaleRef = useRef(DEFAULT_SCALE);
  const widthRef = useRef<number>(readViewportWidth());
  const frameRef = useRef<number | null>(null);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [isReady, setIsReady] = useState(false);

  const updateScale = useCallback((width: number) => {
    const nextScale = calculateResponsiveScale(width);
    const prevScale = scaleRef.current;

    widthRef.current = width;
    scaleRef.current = nextScale;

    applyScale(nextScale, width);

    if (Math.abs(nextScale - prevScale) >= EPSILON) {
      setScale(nextScale);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    updateScale(readViewportWidth());
  }, [updateScale]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const width = readViewportWidth();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateScale(width);
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScale]);

  return { scale, isReady };
}

export function ResponsiveScaleProvider({ children }: PropsWithChildren) {
  const { scale, isReady } = useResponsiveScaleInternal();
  const value = useMemo(
    () => ({
      scale,
      isReady,
    }),
    [scale, isReady]
  );

  return (
    <ResponsiveScaleContext.Provider value={value}>
      {isReady ? children : <Spinner />}
    </ResponsiveScaleContext.Provider>
  );
}

export function useResponsiveScaleValue() {
  return useContext(ResponsiveScaleContext).scale;
}

export function useResponsiveScale() {
  return useContext(ResponsiveScaleContext);
}
