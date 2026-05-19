import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

/**
 * A full-bleed overlay that runs a vertical wipe whenever the route changes.
 * The overlay is purely visual — it does not block content rendering.
 */
export function RouteTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!ref.current) return;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const el = ref.current;
    gsap.fromTo(
      el,
      { y: '100%' },
      {
        y: '-100%',
        duration: 0.85,
        ease: 'expo.inOut',
      },
    );
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return <div ref={ref} className="route-transition" aria-hidden="true" />;
}
