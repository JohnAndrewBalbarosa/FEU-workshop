import { useRef } from 'react';
import './tiltedCard.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number;
};

export function TiltedCard({ children, className = '', max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      className={`tilted-card ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div className="tilted-card__inner">{children}</div>
    </div>
  );
}
