import { useEffect, type RefObject } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

interface RevealOptions {
  selector: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  start?: string;
  once?: boolean;
}

/**
 * Scoped GSAP reveal effect. Skips when prefers-reduced-motion is set.
 * Returns nothing — the effect cleans itself up via gsap.context.
 */
export function useGsapReveal(
  scopeRef: RefObject<HTMLElement | null>,
  options: RevealOptions | RevealOptions[]
): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const list = Array.isArray(options) ? options : [options];
    const ctx = gsap.context(() => {
      list.forEach((opt) => {
        const tween = {
          y: opt.y ?? 24,
          opacity: opt.opacity ?? 0,
          duration: opt.duration ?? 0.9,
          stagger: opt.stagger ?? 0,
          delay: opt.delay ?? 0,
          ease: opt.ease ?? 'expo.out',
          ...(opt.scrollTrigger
            ? {
                scrollTrigger: {
                  trigger: scopeRef.current,
                  start: opt.start ?? 'top 78%',
                  once: opt.once ?? true,
                },
              }
            : {}),
        };
        gsap.from(opt.selector, tween);
      });
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
