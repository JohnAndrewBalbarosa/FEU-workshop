import { useRef } from 'react';
import { profile } from '../../data/profile';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import { FloatingShapes } from '../ui/FloatingShapes';
import './masthead.css';

interface MastheadProps {
  variant?: 'full' | 'compact';
}

export function Masthead({ variant = 'full' }: MastheadProps = {}) {
  const root = useRef<HTMLElement>(null);

  useGsapReveal(root, [
    { selector: '.masthead__rule', y: 0, opacity: 0, duration: 1.1, delay: 0.1 },
    { selector: '.masthead__row > *', y: 18, stagger: 0.06, duration: 0.9, delay: 0.25 },
  ]);

  return (
    <header
      ref={root}
      className={`masthead section${variant === 'compact' ? ' masthead--compact' : ''}`}
    >
      {variant === 'full' ? <FloatingShapes /> : null}
      <div className="shell">
        <div className="masthead__top">
          <span className="eyebrow">Vol. 01 · Manila · {new Date().getFullYear()}</span>
          <span className="eyebrow">Personal volume</span>
        </div>

        <hr className="masthead__rule" />

        <div className="masthead__row">
          <div className="masthead__index eyebrow">
            <span>§ 00</span>
            <span>Masthead</span>
          </div>

          <h1 className="masthead__name display">
            John Andrew<br />
            Balbarosa<span className="masthead__period">.</span>
          </h1>

          <p className="masthead__role eyebrow">
            <span>{profile.role.split(' · ')[0]}</span>
            <span>{profile.role.split(' · ')[1] ?? ''}</span>
          </p>

          <div className="masthead__manifesto">
            <p className="lede measure">
              <span className="editorial">“{profile.manifesto}”</span>
            </p>
            <p className="masthead__manifesto-attr eyebrow">
              — Working motto, kept in a notebook
            </p>
          </div>

          <div className="masthead__sidebar">
            <dl className="masthead__facts">
              <div><dt>Located</dt><dd>{profile.location}</dd></div>
              <div><dt>Reading at</dt><dd>{profile.school}</dd></div>
              <div><dt>Field</dt><dd>C++ · TypeScript · Python · Kotlin</dd></div>
            </dl>
          </div>

          <aside className="masthead__axes" aria-label="Polymath axes">
            <header className="masthead__axes-head">
              <span className="mono">∀ axis ∈ &#123; eng, math, sci, sec &#125;</span>
              <span className="mono">σ ≈ broad</span>
            </header>
            <ul className="masthead__axes-list">
              <li><span>Engineering</span><b className="mono">C++ · TS · Py · Kt</b></li>
              <li><span>Mathematics</span><b className="mono">Discrete · Algo · Math Methods</b></li>
              <li><span>Sciences</span><b className="mono">Physics · Stats · CS theory</b></li>
              <li><span>Security</span><b className="mono">CTF · STRIDE · CDSS</b></li>
              <li><span>Receipts</span><b className="mono">25 × 4.00 · GWA 3.60</b></li>
            </ul>
          </aside>

          <div className="masthead__cta">
            <a className="btn btn--accent" href="#work">Selected work →</a>
            <a className="btn btn--ghost" href={profile.socials.github} target="_blank" rel="noreferrer">
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
