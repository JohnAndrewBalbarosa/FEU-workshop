import { profile } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import './colophon.css';

interface SocialLink {
  href: string;
  label: string;
  handle: string;
}

const SOCIALS: SocialLink[] = [
  { href: profile.socials.github,   label: 'GitHub',   handle: 'JohnAndrewBalbarosa' },
  { href: profile.socials.linkedin, label: 'LinkedIn', handle: 'jbalbarosa' },
  { href: profile.socials.facebook, label: 'Facebook', handle: 'johnandrew.balbarosa.58' },
];

export function Colophon() {
  return (
    <footer className="colophon section section--dark" id="contact">
      <div className="shell">
        <SectionHeader
          index="13"
          kicker="Colophon"
          title={<><span className="editorial">Say hello.</span> Let&rsquo;s build something deterministic.</>}
        />

        <div className="colophon__grid">
          <div className="colophon__pitch">
            <p className="lede" style={{ color: 'oklch(86% 0.012 60)', marginBottom: '1.75rem' }}>
              Open to research collaborations, CTF teamups, and engineering work
              in C++, TypeScript, or Python. Currently in Manila.
            </p>
            <div className="colophon__cta">
              <a className="btn btn--accent" href="mailto:hello@example.com">
                Send a note →
              </a>
              <a
                className="btn btn--ghost"
                href={import.meta.env.VITE_DASHBOARD_URL ?? '/dashboard'}
                rel="noopener"
                aria-label="Sign in to personal dashboard"
              >
                Sign in (private) →
              </a>
            </div>
          </div>

          <ul className="colophon__links">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.label} →</a>
                <span className="mono">{s.handle}</span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="rule" style={{ borderColor: 'oklch(100% 0 0 / 0.18)', marginBlock: 'clamp(3rem, 2rem + 3vw, 4.5rem)' }} />

        <div className="colophon__foot">
          <span>Set in Outfit, DM Sans &amp; Bangers.</span>
          <span>Built with React · GSAP · Lenis.</span>
          <span>© {new Date().getFullYear()} {profile.name}.</span>
        </div>
      </div>
    </footer>
  );
}
