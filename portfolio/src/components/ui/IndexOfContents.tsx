import { Link } from 'react-router-dom';
import './index-of-contents.css';

interface Entry {
  index: string;
  kicker: string;
  title: string;
  blurb: string;
  href: string;
  meta: string;
}

const entries: Entry[] = [
  {
    index: 'I',
    kicker: 'Selected work',
    title: 'Receipts in code.',
    blurb:
      'Seven domains — cybersecurity, backend, low-level, AI engineering, agentic systems, web scraping, and the polymath margins.',
    href: '/work',
    meta: '7 sub-volumes',
  },
  {
    index: 'II',
    kicker: 'About',
    title: 'The lede.',
    blurb:
      'A computer science student at FEU Tech who prefers deterministic structural detection before any AI step. Engineering, math, science, security — kept on the same shelf.',
    href: '/about',
    meta: 'Essay · 4 axes',
  },
  {
    index: 'III',
    kicker: 'Receipts',
    title: 'Evidence room.',
    blurb:
      'Certifications, competitions, transcripts, photographs from the field. The trail that backs the writing.',
    href: '/receipts',
    meta: 'Credentials · plates',
  },
];

export function IndexOfContents() {
  return (
    <ol className="ioc" aria-label="Index of contents">
      {entries.map((e) => (
        <li key={e.href} className="ioc__item">
          <Link to={e.href} className="ioc__link">
            <span className="ioc__index mono">{e.index}.</span>
            <div className="ioc__body">
              <span className="ioc__kicker mono">{e.kicker}</span>
              <h3 className="ioc__title">{e.title}</h3>
              <p className="ioc__blurb">{e.blurb}</p>
            </div>
            <span className="ioc__meta mono">{e.meta}</span>
            <span aria-hidden="true" className="ioc__arrow">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
