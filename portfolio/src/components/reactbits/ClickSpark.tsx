import { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  color?: string;
  count?: number;
  size?: number;
};

export function ClickSpark({ children, color = 'oklch(58% 0.18 28)', count = 10, size = 14 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (let i = 0; i < count; i++) {
        const spark = document.createElement('span');
        spark.style.cssText = `
          position:absolute;left:${cx}px;top:${cy}px;width:2px;height:${size}px;
          background:${color};border-radius:2px;pointer-events:none;
          transform:translate(-50%,-50%) rotate(${(360 / count) * i}deg) translateY(0);
          transition: transform 480ms var(--ease,cubic-bezier(.16,1,.3,1)), opacity 480ms ease;
          opacity:1;`;
        el.appendChild(spark);
        requestAnimationFrame(() => {
          spark.style.transform = `translate(-50%,-50%) rotate(${(360 / count) * i}deg) translateY(-${28 + Math.random() * 14}px)`;
          spark.style.opacity = '0';
        });
        setTimeout(() => spark.remove(), 520);
      }
    };

    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [color, count, size]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
    </div>
  );
}
