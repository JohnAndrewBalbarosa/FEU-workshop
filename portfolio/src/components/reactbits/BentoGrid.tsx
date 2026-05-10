import './bento.css';

type Props = { children: React.ReactNode; className?: string };

export function BentoGrid({ children, className = '' }: Props) {
  return <div className={`bento ${className}`}>{children}</div>;
}

export function BentoCell({
  children,
  span = 'normal',
  className = ''
}: {
  children: React.ReactNode;
  span?: 'normal' | 'wide' | 'tall' | 'feature';
  className?: string;
}) {
  return <div className={`bento__cell bento__cell--${span} ${className}`}>{children}</div>;
}
