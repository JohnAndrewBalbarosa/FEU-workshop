import type { ReactNode } from 'react';
import './magazine.css';

interface MarginNoteProps {
  number?: string | number;
  children: ReactNode;
}

export function MarginNote({ number, children }: MarginNoteProps) {
  return (
    <aside className="margin-note">
      {number !== undefined ? (
        <span className="margin-note__num mono">{number}</span>
      ) : null}
      <span className="margin-note__body">{children}</span>
    </aside>
  );
}
