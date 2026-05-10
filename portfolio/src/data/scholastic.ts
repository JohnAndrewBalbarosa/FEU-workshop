/**
 * Computed from C:\Users\Drew\Desktop\GradesFeu\src\.cache\solar_data.json
 * (FEU Tech SOLAR scrape, snapshot 2026-04-18). Scale: 4.0 = highest.
 */

export interface TermStat {
  termLabel: string;
  pretty: string;
  courses: number;
  units: number;
  gpa: number;
}

export interface CourseHonor {
  code: string;
  title: string;
  units: number;
  termPretty: string;
}

export interface ScholasticSummary {
  scale: '4.0';
  cumulativeGwa: number;
  totalCourses: number;
  totalUnits: number;
  countFour: number;
  countThreeFive: number;
  highestTerm: TermStat;
  terms: TermStat[];
  /** 4.0-grade core CS / math / specialization courses, in transcript order. */
  coreFours: CourseHonor[];
}

const prettify = (label: string): string => {
  // "1 - 20232024" -> "1T · AY 2023–2024"
  const [term, year] = label.split(' - ');
  const start = year.slice(0, 4);
  const end = year.slice(4);
  return `${term}T · AY ${start}–${end}`;
};

export const TERMS: TermStat[] = [
  { termLabel: '1 - 20232024', pretty: prettify('1 - 20232024'), courses: 8,  units: 17, gpa: 3.676 },
  { termLabel: '2 - 20232024', pretty: prettify('2 - 20232024'), courses: 9,  units: 18, gpa: 3.500 },
  { termLabel: '3 - 20232024', pretty: prettify('3 - 20232024'), courses: 9,  units: 19, gpa: 3.579 },
  { termLabel: '1 - 20242025', pretty: prettify('1 - 20242025'), courses: 11, units: 21, gpa: 3.571 },
  { termLabel: '2 - 20242025', pretty: prettify('2 - 20242025'), courses: 9,  units: 21, gpa: 3.571 },
  { termLabel: '3 - 20242025', pretty: prettify('3 - 20242025'), courses: 9,  units: 21, gpa: 3.786 },
  { termLabel: '1 - 20252026', pretty: prettify('1 - 20252026'), courses: 6,  units: 18, gpa: 3.333 },
  { termLabel: '2 - 20252026', pretty: prettify('2 - 20252026'), courses: 6,  units: 18, gpa: 3.750 },
];

const HIGHEST = TERMS.reduce((best, t) => (t.gpa > best.gpa ? t : best), TERMS[0]);

export const SCHOLASTIC: ScholasticSummary = {
  scale: '4.0',
  cumulativeGwa: 3.598,
  totalCourses: 67,
  totalUnits: 153,
  countFour: 25,
  countThreeFive: 32,
  highestTerm: HIGHEST,
  terms: TERMS,
  coreFours: [
    { code: 'CCS0015',  title: 'Data Structures and Algorithms (Lec)', units: 2, termPretty: '3T · AY 2023–2024' },
    { code: 'CCS0015L', title: 'Data Structures and Algorithms (Lab)', units: 1, termPretty: '3T · AY 2023–2024' },
    { code: 'GED0055',  title: 'Mathematical Analysis',                 units: 3, termPretty: '3T · AY 2023–2024' },
    { code: 'CS0001',   title: 'Discrete Structures 1',                  units: 3, termPretty: '1T · AY 2024–2025' },
    { code: 'CS0003',   title: 'Computer Systems & Architecture (Lec)', units: 2, termPretty: '1T · AY 2024–2025' },
    { code: 'CS0003L',  title: 'Computer Systems & Architecture (Lab)', units: 1, termPretty: '1T · AY 2024–2025' },
    { code: 'CS0007',   title: 'Algorithm',                              units: 3, termPretty: '2T · AY 2024–2025' },
    { code: 'CS0021',   title: 'Discrete Structures 2',                  units: 3, termPretty: '2T · AY 2024–2025' },
    { code: 'CS0023',   title: 'Automata Theory & Formal Languages',     units: 3, termPretty: '3T · AY 2024–2025' },
    { code: 'CS0051',   title: 'Parallel & Distributed Computing',       units: 3, termPretty: '3T · AY 2024–2025' },
    { code: 'CCS0103',  title: 'Technopreneurship (CCS)',                units: 3, termPretty: '3T · AY 2024–2025' },
    { code: 'CS0011',   title: 'Mobile Programming',                     units: 3, termPretty: '1T · AY 2025–2026' },
    { code: 'CS0032',   title: 'Software Engineering 2',                 units: 3, termPretty: '2T · AY 2025–2026' },
    { code: 'CS0035',   title: 'Programming Languages',                  units: 3, termPretty: '2T · AY 2025–2026' },
    { code: 'CS0057',   title: 'CS Specialization 3 — Image Processing', units: 3, termPretty: '2T · AY 2025–2026' },
    { code: 'GED0059',  title: 'Mathematical Methods',                   units: 3, termPretty: '2T · AY 2025–2026' },
  ],
};
