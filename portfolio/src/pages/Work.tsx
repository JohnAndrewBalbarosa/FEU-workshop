import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { DOMAINS, projects } from '../data/projects';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DropCap } from '../components/ui/DropCap';
import { useRouteTimeline } from '../hooks/useRouteTimeline';
import './work.css';

export function Work() {
  const root = useRef<HTMLDivElement>(null);

  useRouteTimeline(root, (tl) => {
    tl.from('.work-hub__lede > *', {
      y: 22,
      opacity: 0,
      stagger: 0.06,
      duration: 0.7,
    }).from(
      '.work-hub__row',
      { y: 28, opacity: 0, stagger: 0.06, duration: 0.65 },
      '-=0.3',
    );
  });

  return (
    <div ref={root} className="section">
      <div className="shell">
        <SectionHeader
          index="I"
          kicker="Selected work"
          title={<>Receipts in code.</>}
          aside="7 sub-volumes"
        />

        <div className="work-hub__lede">
          <DropCap letter="S">
            even domains, each a different way of approaching the same
            question — does this hold up under inspection? The work below is
            grouped by domain rather than by project so each room can be read
            on its own.
          </DropCap>
        </div>

        <ol className="work-hub">
          {DOMAINS.map((d) => {
            const count = projects.filter((p) =>
              p.slices.some((s) => s.domain === d.key),
            ).length;
            return (
              <li key={d.key} className="work-hub__row">
                <Link to={`/work/${d.key}`} className="work-hub__link">
                  <span className="work-hub__index mono">§ {d.index}</span>
                  <div className="work-hub__body">
                    <span className="work-hub__kicker mono">{d.kicker}</span>
                    <h3 className="work-hub__title">{d.title}</h3>
                    <p className="work-hub__blurb">{d.blurb}</p>
                  </div>
                  <span className="work-hub__count mono">
                    {count} {count === 1 ? 'project' : 'projects'}
                  </span>
                  <span aria-hidden="true" className="work-hub__arrow">→</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
