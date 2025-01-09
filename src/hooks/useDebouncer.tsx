import { useEffect, useState } from "react";

export function useDebouncer<T>(value: T, interval: number): [T] {
  const [v, setValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(value);
    }, interval);

    return () => clearTimeout(handler);
  }, [value, interval]);

  return [v];
}

export function useDebouncedCallback<T>(
  f: (v: T) => void,
  interval: number
): (v: T) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (value: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      f(value);
    }, interval);
  };
}
