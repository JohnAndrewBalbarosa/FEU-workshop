import type { ReactNode } from 'react';
import './magazine.css';

interface DropCapProps {
  letter: string;
  children: ReactNode;
}

export function DropCap({ letter, children }: DropCapProps) {
  return (
    <p className="dropcap-paragraph">
      <span aria-hidden="true" className="dropcap">
        {letter}
      </span>
      {children}
    </p>
  );
}
