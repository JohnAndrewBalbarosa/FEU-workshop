import './gradientText.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
};

export function GradientText({
  children,
  className = '',
  colors = ['oklch(58% 0.18 28)', 'oklch(42% 0.12 250)', 'oklch(58% 0.18 28)']
}: Props) {
  return (
    <span
      className={`gradient-text ${className}`}
      style={{ backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})` }}
    >
      {children}
    </span>
  );
}
