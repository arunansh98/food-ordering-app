import { useEffect } from "react";

export default function useDebounce(func, args = null, value, delay) {
  useEffect(() => {
    const timer = setTimeout(() => {
      func(...args);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);
}
