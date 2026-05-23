import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { credentials } from '../data/credentials';
import { highlights } from '../data/highlights';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DropCap } from '../components/ui/DropCap';
import { MarginNote } from '../components/ui/MarginNote';
import { PlaceholderImage } from '../components/ui/PlaceholderImage';
import { useRouteTimeline } from '../hooks/useRouteTimeline';
import './receipts.css';

export function Receipts() {
  const root = useRef<HTMLDivElement>(null);

  useRouteTimeline(root, (tl) => {
    tl.from('.receipts-hero > *', {
      y: 28,
      opacity: 0,
      stagger: 0.07,
      duration: 0.8,
    }).from(
      '.receipts-block',
      { y: 32, opacity: 0, stagger: 0.09, duration: 0.7 },
      '-=0.3',
    );
  });

  return (
    <div ref={root} className="section">
      <div className="shell">
        <Link to="/" className="back-link">← Index of contents</Link>

        <header className="receipts-hero">
          <span className="mono receipts-hero__eyebrow">§ III · Receipts</span>
          <h1 className="receipts-hero__title">
            Evidence room<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <DropCap letter="C">
            ertifications, competitions, transcripts, and field photographs.
            The trail of receipts that backs the writing elsewhere in this
            volume — published as a single ledger, not a slide deck.
          </DropCap>
          <MarginNote number="01">
            All placeholder images are seeded; replace once final scans of
            certificates are uploaded to /public/team/andrew/.
          </MarginNote>
        </header>

        <section className="receipts-block">
          <SectionHeader
            index="01"
            kicker="Credentials"
            title={<>The ledger.</>}
            aside={`${credentials.length} entries`}
          />
          <ol className="credentials-list">
            {credentials.map((c) => (
              <li key={c.num} className="credentials-row">
                <span className="credentials-row__num mono">{c.num}</span>
                <div className="credentials-row__body">
                  <h3 className="credentials-row__title">{c.title}</h3>
                  <p className="credentials-row__detail">{c.detail}</p>
                </div>
                {c.year ? (
                  <span className="credentials-row__year mono">{c.year}</span>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section className="receipts-block">
          <SectionHeader
            index="02"
            kicker="Plates"
            title={<>Field photographs.</>}
            aside={`${highlights.length} plates`}
          />
          <div className="plates">
            {highlights.map((h, i) => (
              <figure
                key={i}
                className={`plate plate--${h.span ?? 'normal'}`}
              >
                <PlaceholderImage
                  src={h.image}
                  seed={h.caption.slice(0, 40)}
                  width={1200}
                  height={800}
                  alt={h.caption}
                />
                <figcaption>
                  <span className="mono">Plate {String(i + 1).padStart(2, '0')}</span>
                  <span>{h.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="receipts-block receipts-colophon">
          <SectionHeader
            index="03"
            kicker="Colophon"
            title={<>Set in three faces.</>}
            aside="End of volume"
          />
          <p className="colophon-copy">
            Display set in <em>Bangers</em>; headings in <em>Outfit</em>; body
            and labels in <em>DM Sans</em>; mono in <em>JetBrains Mono</em>.
            Built with React, Vite, GSAP, and Lenis. Hosted on Vercel. The
            patterns are pure CSS gradients; the page is loud by intent, not
            accident.
          </p>
        </section>
      </div>
    </div>
  );
}
