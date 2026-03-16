type Listener = () => void;

export function proxy<T extends object>(initialObject: T): T {
  const listeners = new Set<Listener>();

  return new Proxy(initialObject, {
    set(target, prop, value) {
      if (Reflect.get(target, prop) === value) return true;
      const result = Reflect.set(target, prop, value);
      listeners.forEach((l) => l());
      return result;
    },
    get(target, prop) {
      if (prop === '_listeners') return listeners;
      return Reflect.get(target, prop);
    },
  });
}

export function subscribe(proxyObject: any, callback: Listener) {
  const listeners = proxyObject._listeners as Set<Listener>;
  listeners.add(callback);
  return () => listeners.delete(callback);
}

import { useCallback, useRef, useSyncExternalStore } from 'react';

export function useSnapshot<T extends object>(proxyObject: T): T {
  const lastSnapshot = useRef<T>(undefined);

  const currSnapshot = useSyncExternalStore(
    useCallback(
      (callback) => subscribe(proxyObject, callback),
      [proxyObject],
    ),
    () => {
      const next = { ...proxyObject } as T;
      const prev = lastSnapshot.current;
      if (prev) {
        const keys = Object.keys(next) as (keyof T)[];
        if (!keys.some((k) => next[k] !== prev[k])) return prev;
      }
      return next;
    },
  );

  lastSnapshot.current = currSnapshot;
  return currSnapshot;
}
