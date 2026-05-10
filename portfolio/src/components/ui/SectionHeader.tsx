import type { ReactNode } from 'react';

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  as?: 'h1' | 'h2';
}

/**
 * Editorial Swiss section header — numbered index, hairline rule, optional aside.
 * Used by every section to enforce one consistent header rhythm.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  aside,
  as = 'h2',
}: SectionHeaderProps) {
  const Heading = as;
  return (
    <header className="section-head">
      <div>
        <div className="section-head__index">
          <b>§ {index}</b>
          <span>{kicker}</span>
        </div>
        <Heading className="section-head__title">{title}</Heading>
      </div>
      {aside ? <div className="section-head__aside">{aside}</div> : null}
    </header>
  );
}
