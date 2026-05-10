export type Highlight = {
  image: string;
  caption: string;
  span?: 'wide' | 'tall' | 'normal';
};

export const highlights: Highlight[] = [
  {
    image: '/team/andrew/topcit.jpg',
    caption: 'TOPCIT Level 3 passers list — Computer Science track, FEU Tech ACM.',
    span: 'tall'
  },
  {
    image: '/team/andrew/ctf.jpg',
    caption: 'Trend Micro University CTF — preliminary round certificate, Aug 22 2025.'
  },
  {
    image: '/team/andrew/nasa.jpg',
    caption: 'NASA International Space Apps Challenge 2024 — Galactic Problem Solver.',
    span: 'wide'
  },
  {
    image: '/team/andrew/hackyap.jpg',
    caption: 'Hack & Yap with the Pizza & Friends Tech Community at Coffee Chapters.'
  },
  {
    image: '/team/andrew/research.jpg',
    caption: 'Thesis working session with the research team and adviser.'
  },
  {
    image: '/team/andrew/thesis.jpg',
    caption: 'Thesis title meeting with Collin Andrei Yapchulay and Josephine Santander.',
    span: 'wide'
  }
];
