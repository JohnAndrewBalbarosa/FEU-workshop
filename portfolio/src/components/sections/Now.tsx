import { useRef } from 'react';
import { now } from '../../data/now';
import { SectionHeader } from '../ui/SectionHeader';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import './now.css';

export function Now() {
  const root = useRef<HTMLElement>(null);

  useGsapReveal(root, {
    selector: '.now__row',
    y: 18,
    stagger: 0.06,
    scrollTrigger: true,
  });

  return (
    <section ref={root} className="now section" id="now">
      <div className="shell">
        <SectionHeader
          index="11"
          kicker="Currently"
          title="Right now, on the desk."
          aside={`Last updated ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`}
        />

        <ol className="now__list">
          {now.map((line, i) => (
            <li key={i} className="now__row">
              <span className="now__num mono">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="now__line">{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
