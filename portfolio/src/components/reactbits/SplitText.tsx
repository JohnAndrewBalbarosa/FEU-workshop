import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap';

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  splitBy?: 'chars' | 'words';
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'mount' | 'scroll';
  from?: { y?: number; opacity?: number; rotateX?: number };
};

export function SplitText({
  text,
  as = 'span',
  className,
  splitBy = 'chars',
  delay = 0,
  duration = 0.9,
  stagger = 0.025,
  trigger = 'scroll',
  from = { y: 60, opacity: 0, rotateX: -40 }
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const parts =
      splitBy === 'chars'
        ? text.split('').map((c) => (c === ' ' ? ' ' : c))
        : text.split(' ');

    el.innerHTML = parts
      .map(
        (p) =>
          `<span class="st-piece" style="display:inline-block;will-change:transform,opacity;">${p}${
            splitBy === 'words' ? '&nbsp;' : ''
          }</span>`
      )
      .join('');

    const pieces = el.querySelectorAll<HTMLElement>('.st-piece');

    const tween = gsap.fromTo(
      pieces,
      { yPercent: from.y ? 110 : 0, opacity: from.opacity ?? 0, rotateX: from.rotateX ?? 0 },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger:
          trigger === 'scroll'
            ? { trigger: el, start: 'top 85%', once: true }
            : undefined
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text, splitBy, delay, duration, stagger, trigger, from.y, from.opacity, from.rotateX]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className} style={{ display: 'inline-block', overflow: 'hidden' }}>
      {text}
    </Tag>
  );
}
