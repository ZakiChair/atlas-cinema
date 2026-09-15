import { useSyncExternalStore } from 'react';

/** Transform de zoom courant + taille du viewport, en pixels écran. */
export interface ViewTransform {
  k: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

let current: ViewTransform = { k: 1, x: 0, y: 0, width: 1, height: 1 };
const listeners = new Set<() => void>();
let frame = 0;

/** Publie le transform ; les abonnés sont notifiés au plus une fois par frame. */
export function publishView(next: ViewTransform): void {
  current = next;
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    for (const l of listeners) l();
  });
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useViewTransform(): ViewTransform {
  return useSyncExternalStore(subscribe, () => current, () => current);
}
