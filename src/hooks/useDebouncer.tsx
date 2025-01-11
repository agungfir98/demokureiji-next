import { useEffect, useState } from "react";

/**
 * create a delays of a value before returning after specified interval of interactivity
 * @template T - type of the value
 * @param {T} value - value that needs to be delays
 * @returns {[T]} An array containing debounced value
 *
 * @example
 * // Debounce a search term that updates 500ms after user stops typing
 * const [searchTerm, setSearchTerm] = useState("");
 * const [debouncedTerm] = useDebouncer(searchTerm, 500);
 *
 * // debouncedTerm will update 500ms after searchTerm changes
 * useEffect(() => {
 *   // Perform search with debouncedTerm
 * }, [debouncedTerm]);
 */
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

/**
 * Creates a debounced version of a callback function that delays its execution until after a specified interval
 * of inactivity.
 *
 * @template T - The type of value that the callback function accepts
 * @param {(v: T) => void} f - The function to debounce
 * @param {number} interval - The number of milliseconds to delay before executing the callback
 * @returns {(v: T) => void} A debounced version of the original function
 *
 * @example
 * // Create a debounced function that logs input after 500ms of inactivity
 * const debouncedLog = useDebouncedCallback((value: string) => {
 *   console.log(value);
 * }, 500);
 *
 * // Call it multiple times - only the last call within 500ms will execute
 * debouncedLog("test1");
 * debouncedLog("test2");
 * debouncedLog("test3"); // Only this one will be logged after 500ms
 */
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
