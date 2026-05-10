import { useRef } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { profile } from '../../data/profile';
import { SectionHeader } from '../ui/SectionHeader';
import { useEffect } from 'react';
import './lede.css';

export function Lede() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to('.lede__portrait img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lede',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="lede section" id="about">
      <div className="shell">
        <SectionHeader
          index="01"
          kicker="About"
          title="The lede."
          aside="Manila · 2026"
        />

        <div className="lede__grid">
          <div className="lede__copy">
            <p className="lede" style={{ marginBottom: '1.75rem' }}>
              {profile.bio}
            </p>

            <dl className="lede__facts">
              <div><dt>Role</dt><dd>{profile.role}</dd></div>
              <div><dt>Located</dt><dd>{profile.location}</dd></div>
              <div><dt>Reading at</dt><dd>{profile.school}</dd></div>
              <div><dt>Field notes</dt><dd>C++ · TypeScript · Python · Kotlin</dd></div>
            </dl>
          </div>

          <figure className="lede__portrait">
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              loading="eager"
              fetchPriority="high"
              width="800"
              height="1000"
            />
            <figcaption>
              <span className="mono">Fig. 01</span>
              <span>Portrait — FEU Tech, 2025</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
