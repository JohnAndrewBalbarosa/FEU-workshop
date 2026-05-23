/**
 * Scattered decorative emoji/glyphs — a mandatory Maximalism signature.
 * Purely decorative: aria-hidden and pointer-events:none via .floaties.
 * Drop inside a position:relative parent.
 */
interface Shape {
  glyph: string;
  top: string;
  left: string;
  size: string;
  anim: 'float' | 'float-reverse' | 'wiggle' | 'spin-slow' | 'bounce-subtle';
}

const DEFAULT_SHAPES: Shape[] = [
  { glyph: '✦', top: '8%', left: '4%', size: '2.5rem', anim: 'float' },
  { glyph: '★', top: '18%', left: '92%', size: '3.5rem', anim: 'float-reverse' },
  { glyph: '✧', top: '64%', left: '7%', size: '2rem', anim: 'wiggle' },
  { glyph: '◆', top: '78%', left: '88%', size: '2.8rem', anim: 'float' },
  { glyph: '✿', top: '40%', left: '95%', size: '2.2rem', anim: 'spin-slow' },
  { glyph: '●', top: '50%', left: '2%', size: '1.6rem', anim: 'bounce-subtle' },
  { glyph: '✚', top: '90%', left: '46%', size: '2rem', anim: 'wiggle' },
];

const ACCENTS = ['var(--accent)', 'var(--secondary)', 'var(--tertiary)', 'var(--quaternary)', 'var(--quinary)'];

interface FloatingShapesProps {
  shapes?: Shape[];
}

export function FloatingShapes({ shapes = DEFAULT_SHAPES }: FloatingShapesProps) {
  return (
    <div className="floaties" aria-hidden="true">
      {shapes.map((s, i) => (
        <span
          key={`${s.glyph}-${i}`}
          className={`floatie animate-${s.anim}`}
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            color: ACCENTS[i % ACCENTS.length],
            animationDelay: `${(i % 5) * 0.6}s`,
          }}
        >
          {s.glyph}
        </span>
      ))}
    </div>
  );
}
