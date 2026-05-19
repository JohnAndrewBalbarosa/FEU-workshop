import { useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { DOMAINS, projects, type Domain } from '../data/projects';
import { DropCap } from '../components/ui/DropCap';
import { MarginNote } from '../components/ui/MarginNote';
import { PlaceholderImage } from '../components/ui/PlaceholderImage';
import { useRouteTimeline } from '../hooks/useRouteTimeline';
import './work.css';

export function WorkDomain() {
  const { domain } = useParams<{ domain: string }>();
  const root = useRef<HTMLDivElement>(null);

  const config = DOMAINS.find((d) => d.key === domain);

  useRouteTimeline(root, (tl) => {
    tl.from('.domain-hero > *', {
      y: 28,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
    }).from(
      '.project-article',
      { y: 36, opacity: 0, stagger: 0.1, duration: 0.7 },
      '-=0.3',
    );
  });

  if (!config) {
    return <Navigate to="/work" replace />;
  }

  const domainKey: Domain = config.key;
  const matched = projects
    .map((p) => ({
      project: p,
      slices: p.slices.filter((s) => s.domain === domainKey),
    }))
    .filter((m) => m.slices.length > 0);

  return (
    <div ref={root} className="section">
      <div className="shell">
        <Link to="/work" className="back-link">← Selected work</Link>

        <header className="domain-hero">
          <span className="mono" style={{ fontSize: 'var(--tiny)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
            § {config.index} · {config.kicker}
          </span>
          <h1 className="domain-hero__title">
            {config.title.replace(/\.$/, '')}<em>.</em>
          </h1>
          <DropCap letter={config.blurb.charAt(0)}>
            {config.blurb.slice(1)}
          </DropCap>
          <MarginNote number="01">
            Draft copy — extend before publish. Each entry below is a slice of
            a larger project filtered to this domain.
          </MarginNote>
        </header>

        {matched.map((m, idx) => (
          <article key={m.project.name} className="project-article">
            <div className="project-article__head">
              <p className="project-article__num">
                Fig. {String(idx + 1).padStart(2, '0')}
              </p>
              <h2 className="project-article__name">{m.project.name}</h2>
              <p className="project-article__lang">{m.project.primaryLanguage}</p>
              <p className="project-article__blurb">{m.project.blurb}</p>
              <a
                href={m.project.url}
                target="_blank"
                rel="noreferrer"
                className="project-article__link"
              >
                Repository →
              </a>
            </div>

            <div className="project-article__body">
              <figure className="project-article__visual">
                <PlaceholderImage
                  seed={`${m.project.name}-${domainKey}`}
                  width={1200}
                  height={720}
                  alt={`Visual for ${m.project.name}`}
                />
                <figcaption>
                  Fig. {String(idx + 1).padStart(2, '0')} ·{' '}
                  {m.project.name} — placeholder plate
                </figcaption>
              </figure>

              {m.slices.map((s, i) => (
                <section key={i} className="slice">
                  <h3 className="slice__headline">{s.headline}</h3>
                  <ul className="slice__bullets">
                    {s.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                  {s.tech && s.tech.length > 0 ? (
                    <div className="slice__tech">
                      {s.tech.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        ))}

        {matched.length === 0 ? (
          <p className="project-article__blurb">
            Walang projects pa under this domain — draft entries coming soon.
          </p>
        ) : null}
      </div>
    </div>
  );
}
