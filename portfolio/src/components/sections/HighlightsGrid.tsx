import { useRef } from 'react';
import { highlights } from '../../data/highlights';
import { SectionHeader } from '../ui/SectionHeader';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import './highlights.css';

export function HighlightsGrid() {
  const root = useRef<HTMLElement>(null);

  useGsapReveal(root, {
    selector: '.highlight',
    y: 32,
    stagger: 0.06,
    scrollTrigger: true,
  });

  return (
    <section ref={root} className="highlights section" id="highlights">
      <div className="shell">
        <SectionHeader
          index="03"
          kicker="Field notes"
          title="The room, in pictures."
          aside={`${highlights.length} plates`}
        />

        <div className="highlights__grid">
          {highlights.map((h, i) => {
            const span = h.span ?? 'normal';
            return (
              <figure
                key={i}
                className={`highlight highlight--${span}`}
                data-plate={String(i + 1).padStart(2, '0')}
              >
                <div className="highlight__frame">
                  <img src={h.image} alt={h.caption} loading="lazy" />
                </div>
                <figcaption className="highlight__cap">
                  <span className="mono">Pl. {String(i + 1).padStart(2, '0')}</span>
                  <span>{h.caption}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
