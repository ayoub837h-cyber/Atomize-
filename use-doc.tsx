
import { useMemo } from 'react';

/**
 * A simple wrapper to memoize Firebase queries to prevent infinite re-renders.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
