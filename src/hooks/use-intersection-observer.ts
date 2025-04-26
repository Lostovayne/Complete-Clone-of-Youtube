import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = <T extends Element>(
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { targetRef, isIntersecting } as const;
};
