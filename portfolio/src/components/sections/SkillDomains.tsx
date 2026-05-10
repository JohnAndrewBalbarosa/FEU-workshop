import { memo, useMemo, useRef } from 'react';
import { DOMAINS, projects, type DomainConfig, type Project, type ProjectSlice } from '../../data/projects';
import { SectionHeader } from '../ui/SectionHeader';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import './skills.css';

interface DomainSliceCardProps {
  project: Project;
  slice: ProjectSlice;
  position: number;
  total: number;
}

const DomainSliceCard = memo(function DomainSliceCard({
  project,
  slice,
  position,
  total,
}: DomainSliceCardProps) {
  return (
    <article className="slice">
      <header className="slice__top">
        <span className="slice__pos mono">
          {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <a className="slice__project mono" href={project.url} target="_blank" rel="noreferrer">
          {project.name} ↗
        </a>
      </header>

      <h3 className="slice__headline">{slice.headline}</h3>

      <ul className="slice__bullets">
        {slice.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {slice.tech && slice.tech.length > 0 && (
        <footer className="slice__tech">
          {slice.tech.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </footer>
      )}
    </article>
  );
});

interface DomainSectionProps {
  config: DomainConfig;
  slices: { project: Project; slice: ProjectSlice }[];
}

function DomainSection({ config, slices }: DomainSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGsapReveal(ref, {
    selector: '.slice',
    y: 28,
    stagger: 0.05,
    scrollTrigger: true,
  });

  return (
    <section ref={ref} className="domain section" id={`domain-${config.key}`}>
      <div className="shell">
        <SectionHeader
          index={config.index}
          kicker={config.kicker}
          title={config.title}
          aside={`${slices.length} project ${slices.length === 1 ? 'slice' : 'slices'}`}
        />

        <p className="lede measure" style={{ marginBottom: 'clamp(2rem, 1rem + 3vw, 3.5rem)' }}>
          {config.blurb}
        </p>

        <div className="domain__grid">
          {slices.map(({ project, slice }, i) => (
            <DomainSliceCard
              key={`${project.name}-${slice.headline}`}
              project={project}
              slice={slice}
              position={i + 1}
              total={slices.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillDomains() {
  const grouped = useMemo(() => {
    return DOMAINS.map((config) => ({
      config,
      slices: projects.flatMap((project) =>
        project.slices
          .filter((slice) => slice.domain === config.key)
          .map((slice) => ({ project, slice })),
      ),
    })).filter((group) => group.slices.length > 0);
  }, []);

  return (
    <>
      {grouped.map((group) => (
        <DomainSection key={group.config.key} config={group.config} slices={group.slices} />
      ))}
    </>
  );
}
