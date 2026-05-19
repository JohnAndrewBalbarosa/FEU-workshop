import { useEffect, type RefObject } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * Runs a per-route enter timeline scoped to a ref. Re-fires on pathname change
 * so deep-linking and back/forward navigation both get the animation. Skips
 * entirely when prefers-reduced-motion is set.
 */
export function useRouteTimeline(
  scopeRef: RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline) => void,
): void {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      build(tl);
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
