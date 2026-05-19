import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="section">
      <div className="shell">
        <p className="mono" style={{ fontSize: 'var(--tiny)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          404 · Off the index
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 1.4rem + 5vw, 5rem)', fontWeight: 600, letterSpacing: '-0.03em', margin: '0.5rem 0 1rem' }}>
          Walang nakalap dito<span style={{ color: 'var(--accent)' }}>.</span>
        </h1>
        <p style={{ maxWidth: 'var(--measure)', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          The page you were looking for is either still in draft or never made
          it into this volume. Head back to the index of contents.
        </p>
        <Link to="/" className="back-link">← Index of contents</Link>
      </div>
    </div>
  );
}
