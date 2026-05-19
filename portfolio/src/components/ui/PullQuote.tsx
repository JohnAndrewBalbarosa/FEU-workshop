import type { ReactNode } from 'react';
import './magazine.css';

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <aside className="pullquote">
      <p className="pullquote__text editorial">{children}</p>
      {attribution ? (
        <p className="pullquote__attr eyebrow">— {attribution}</p>
      ) : null}
    </aside>
  );
}
