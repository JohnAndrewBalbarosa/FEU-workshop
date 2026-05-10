import { useRef } from 'react';
import { SCHOLASTIC } from '../../data/scholastic';
import { SectionHeader } from '../ui/SectionHeader';
import { useGsapReveal } from '../../hooks/useGsapReveal';
import './scholastic.css';

const fmtGpa = (n: number): string => n.toFixed(2);

export function Scholastic() {
  const root = useRef<HTMLElement>(null);
  const maxGpa = 4.0;

  useGsapReveal(root, [
    { selector: '.scho__metric', y: 24, stagger: 0.06, scrollTrigger: true },
    { selector: '.scho__term', y: 14, stagger: 0.04, scrollTrigger: true },
  ]);

  return (
    <section ref={root} className="scho section" id="scholastic">
      <div className="shell">
        <SectionHeader
          index="10"
          kicker="Scholastic"
          title="Receipts from the registrar."
          aside={`Scale ${SCHOLASTIC.scale} · ${SCHOLASTIC.totalUnits} units`}
        />

        <div className="scho__metrics">
          <div className="scho__metric">
            <span className="scho__metric-num display">
              {fmtGpa(SCHOLASTIC.cumulativeGwa)}
              <span className="scho__metric-scale mono"> / 4.00</span>
            </span>
            <span className="scho__metric-label">Cumulative GWA</span>
          </div>
          <div className="scho__metric">
            <span className="scho__metric-num display">{SCHOLASTIC.countFour}</span>
            <span className="scho__metric-label">4.00 grades</span>
          </div>
          <div className="scho__metric">
            <span className="scho__metric-num display">{SCHOLASTIC.countThreeFive}</span>
            <span className="scho__metric-label">3.50 grades</span>
          </div>
          <div className="scho__metric">
            <span className="scho__metric-num display">{SCHOLASTIC.totalCourses}</span>
            <span className="scho__metric-label">Courses on record</span>
          </div>
        </div>

        <div className="scho__split">
          <div className="scho__terms">
            <h3 className="scho__sub">
              Per-term GWA <span className="scho__sub-aside mono">↑ best {fmtGpa(SCHOLASTIC.highestTerm.gpa)} · {SCHOLASTIC.highestTerm.pretty}</span>
            </h3>

            <ol className="scho__term-list">
              {SCHOLASTIC.terms.map((t) => {
                const pct = Math.min(100, (t.gpa / maxGpa) * 100);
                const isBest = t.termLabel === SCHOLASTIC.highestTerm.termLabel;
                return (
                  <li key={t.termLabel} className={`scho__term ${isBest ? 'is-best' : ''}`}>
                    <span className="scho__term-label mono">{t.pretty}</span>
                    <span className="scho__term-bar" aria-hidden>
                      <span className="scho__term-bar-fill" style={{ width: `${pct}%` }} />
                    </span>
                    <span className="scho__term-gpa mono">{fmtGpa(t.gpa)}</span>
                    <span className="scho__term-units mono">{t.units}u</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="scho__honors">
            <h3 className="scho__sub">
              4.00 in core CS &amp; math <span className="scho__sub-aside mono">{SCHOLASTIC.coreFours.length} courses</span>
            </h3>

            <ol className="scho__honor-list">
              {SCHOLASTIC.coreFours.map((c) => (
                <li key={c.code} className="scho__honor">
                  <span className="scho__honor-code mono">{c.code}</span>
                  <span className="scho__honor-title">{c.title}</span>
                  <span className="scho__honor-term mono">{c.termPretty}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="scho__source mono">
          Source: FEU Tech SOLAR scrape via <a href="https://github.com/JohnAndrewBalbarosa/GradesFeu" target="_blank" rel="noreferrer">GradesFeu</a> ·
          snapshot 2026-04-18
        </p>
      </div>
    </section>
  );
}
