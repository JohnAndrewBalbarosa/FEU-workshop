import './shinyText.css';

type Props = { text: string; speed?: number; className?: string };

export function ShinyText({ text, speed = 5, className = '' }: Props) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}
