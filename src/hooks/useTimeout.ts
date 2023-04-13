import { DependencyList, useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useTimeout = (
  callback: () => void,
  delay: number | null,
  deps: DependencyList,
) => {
  const savedCallback = useRef(callback);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const stopTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    stopTimeout();

    timeoutId.current = setTimeout(() => savedCallback.current(), delay);

    return stopTimeout;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, deps]);

  return stopTimeout;
};
