import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { credentials } from '../../data/credentials';
import { SectionHeader } from '../ui/SectionHeader';
import './credentials.css';

export function CredentialsStrip() {
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const distance = track.scrollWidth - track.clientWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance + 200}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="creds section section--dark" id="credentials">
      <div className="shell">
        <SectionHeader
          index="02"
          kicker="Receipts"
          title="Proof, not vibes."
          aside={`${credentials.length} entries`}
        />
      </div>

      <div className="creds__viewport">
        <div className="creds__track" ref={trackRef}>
          {credentials.map((c, i) => (
            <article key={c.num} className="creds__card">
              <header className="creds__card-head">
                <span className="creds__num mono">{c.num}</span>
                <span className="creds__count mono">
                  {String(i + 1).padStart(2, '0')} / {String(credentials.length).padStart(2, '0')}
                </span>
              </header>

              <div className="creds__body">
                <h3 className="creds__title">{c.title}</h3>
                <p className="creds__detail">{c.detail}</p>
              </div>

              {c.year && (
                <footer className="creds__foot">
                  <span className="chip">{c.year}</span>
                </footer>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
