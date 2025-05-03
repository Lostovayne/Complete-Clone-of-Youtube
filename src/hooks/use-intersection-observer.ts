import { useEffect, useRef, useState } from "react";

  /**
   * @description
   * React hook that uses the Intersection Observer API to observe whether
   * an element is intersecting with the viewport or not.
   *
   * @param {IntersectionObserverInit} [options] - Options for the `IntersectionObserver` constructor.
   * @returns {object} - An object with two properties: `targetRef` and `isIntersecting`.
   *   `targetRef` is a React ref that should be assigned to the element that
   *   you want to observe. `isIntersecting` is a boolean that is `true` if
   *   the element is intersecting with the viewport, and `false` otherwise.
   */
export const useIntersectionObserver = <T extends Element>(options?: IntersectionObserverInit) => {
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
