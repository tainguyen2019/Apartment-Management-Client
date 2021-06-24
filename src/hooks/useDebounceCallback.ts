import { useRef, useCallback, useEffect } from 'react';

/**
 * Use debounce callback
 * @param {Function} callback Callback
 * @param {number} delay delay time to execute callback
 * @param {boolean} immediate Run callback immediate on the first time
 */
function useDebounceCallback<TArgs extends any[] = []>(
  callback: TypedFunction<TArgs, void>,
  delay: number,
) {
  const timer = useRef<number | null>(null);
  const debouncedCallback = useRef<TypedFunction<TArgs, void> | null>(null);

  const enhancedCallback = useCallback<TypedFunction<TArgs, void>>(
    (...args) => {
      const later = () => {
        timer.current = null;
        return debouncedCallback.current?.apply(null, args);
      };

      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(later, delay);
    },
    [delay],
  );

  useEffect(() => {
    debouncedCallback.current = callback;
  }, [callback]);

  return enhancedCallback;
}

export default useDebounceCallback;
