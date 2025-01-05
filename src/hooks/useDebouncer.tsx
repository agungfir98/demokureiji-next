import { useEffect, useState } from "react";

export default function useDebouncer<T>(value: T, interval: number): [T] {
  const [v, setValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(value);
    }, interval);

    return () => clearTimeout(handler);
  }, [value, interval]);

  return [v];
}
