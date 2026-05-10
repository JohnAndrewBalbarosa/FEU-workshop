export type Credential = {
  num: string;
  title: string;
  detail: string;
  year?: string;
};

export const credentials: Credential[] = [
  {
    num: '01',
    title: 'TOPCIT Level 3',
    detail: 'Passer · aiming Level 5',
    year: '2025',
  },
  {
    num: '02',
    title: 'Trend Micro University CTF',
    detail: 'Preliminary round participant',
    year: 'Aug 2025',
  },
  {
    num: '03',
    title: 'NASA Space Apps Challenge',
    detail: 'Galactic Problem Solver',
    year: '2024',
  },
  {
    num: '04',
    title: 'FEU Tech ACM',
    detail: 'Student Chapter member · NeoTerritory thesis lead',
    year: 'present',
  },
  {
    num: '05',
    title: 'GWA 3.60 / 4.00',
    detail: '25 × 4.00 grades across 67 courses · 153 units',
    year: 'AY 23–26',
  },
  {
    num: '06',
    title: 'Best term · 3T AY24-25',
    detail: 'GPA 3.79 — Algorithm, Discrete 2, Automata, P&D Computing',
    year: '2025',
  },
];
