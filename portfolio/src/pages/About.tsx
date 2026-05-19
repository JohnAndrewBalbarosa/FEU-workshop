import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { SCHOLASTIC } from '../data/scholastic';
import { now } from '../data/now';
import { SectionHeader } from '../components/ui/SectionHeader';
import { DropCap } from '../components/ui/DropCap';
import { PullQuote } from '../components/ui/PullQuote';
import { MarginNote } from '../components/ui/MarginNote';
import { PlaceholderImage } from '../components/ui/PlaceholderImage';
import { useRouteTimeline } from '../hooks/useRouteTimeline';
import './about.css';

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useRouteTimeline(root, (tl) => {
    tl.from('.about-hero > *', {
      y: 28,
      opacity: 0,
      stagger: 0.07,
      duration: 0.8,
    }).from(
      '.about-block',
      { y: 32, opacity: 0, stagger: 0.09, duration: 0.7 },
      '-=0.3',
    );
  });

  const topThreeTerms = [...SCHOLASTIC.terms]
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 3);

  return (
    <div ref={root} className="section">
      <div className="shell">
        <Link to="/" className="back-link">← Index of contents</Link>

        <header className="about-hero">
          <span className="mono about-hero__eyebrow">§ II · About</span>
          <h1 className="about-hero__title">
            The lede<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <p className="about-hero__role mono">{profile.role}</p>
          <figure className="about-hero__portrait">
            <PlaceholderImage
              src={profile.portrait}
              seed={`${profile.name}-portrait`}
              width={900}
              height={1100}
              alt={`Portrait of ${profile.name}`}
            />
            <figcaption>Fig. 01 — Portrait, FEU Tech 2025</figcaption>
          </figure>
        </header>

        <section className="about-block about-block--lede">
          <DropCap letter={profile.bio.charAt(0)}>
            {profile.bio.slice(1)}
          </DropCap>
          <MarginNote number="01">
            Draft autobiography. Expand into three paragraphs before publish —
            origin, working method, where the curiosity is pointing next.
          </MarginNote>
        </section>

        <section className="about-block">
          <SectionHeader
            index="02"
            kicker="Axes"
            title={<>Four axes, kept on one shelf.</>}
            aside="∀ axis ∈ { eng, math, sci, sec }"
          />
          <ul className="axes">
            <li><span className="mono">Engineering</span><b>C++ · TypeScript · Python · Kotlin</b></li>
            <li><span className="mono">Mathematics</span><b>Discrete · Algorithms · Math Methods</b></li>
            <li><span className="mono">Sciences</span><b>Physics · Statistics · CS theory</b></li>
            <li><span className="mono">Security</span><b>CTF · STRIDE · CDSS</b></li>
          </ul>

          <PullQuote attribution="Working motto, kept in a notebook">
            {profile.manifesto}
          </PullQuote>
        </section>

        <section className="about-block">
          <SectionHeader
            index="03"
            kicker="Scholastic"
            title={<>Receipts on a 4.0 scale.</>}
            aside={`GWA ${SCHOLASTIC.cumulativeGwa.toFixed(2)}`}
          />
          <dl className="about-stats">
            <div><dt>Cumulative</dt><dd>{SCHOLASTIC.cumulativeGwa.toFixed(2)} <span className="mono">/ 4.00</span></dd></div>
            <div><dt>Courses</dt><dd>{SCHOLASTIC.totalCourses}</dd></div>
            <div><dt>Units</dt><dd>{SCHOLASTIC.totalUnits}</dd></div>
            <div><dt>4.00 marks</dt><dd>{SCHOLASTIC.countFour}</dd></div>
            <div><dt>3.50 marks</dt><dd>{SCHOLASTIC.countThreeFive}</dd></div>
            <div><dt>Best term</dt><dd>{SCHOLASTIC.highestTerm.pretty.split(' · ')[0]} · {SCHOLASTIC.highestTerm.gpa.toFixed(2)}</dd></div>
          </dl>
          <p className="about-mute mono" style={{ marginTop: '0.75rem' }}>
            Top terms: {topThreeTerms.map((t) => `${t.pretty.split(' · ')[0]} ${t.gpa.toFixed(2)}`).join(' · ')}
          </p>
        </section>

        <section className="about-block">
          <SectionHeader
            index="04"
            kicker="Now"
            title={<>What's on the desk this week.</>}
            aside={`Updated ${new Date().toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })}`}
          />
          <ul className="now-list">
            {now.map((item, i) => (
              <li key={i}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
