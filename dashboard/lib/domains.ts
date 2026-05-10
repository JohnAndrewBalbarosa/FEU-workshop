/**
 * Mirror of the portfolio's skill-domain registry. Kept in sync by hand —
 * if the portfolio's DOMAINS list changes, update this too.
 */
export const DOMAIN_KEYS = [
  'cybersecurity',
  'backend',
  'lowlevel',
  'ai-engineering',
  'agentic-ai',
  'webscraping',
  'polymath',
  'unassigned',
] as const;

export type DomainKey = (typeof DOMAIN_KEYS)[number];

export const DOMAIN_LABELS: Record<DomainKey, string> = {
  cybersecurity: 'Cybersecurity',
  backend: 'Backend dev',
  lowlevel: 'C++ · low-level',
  'ai-engineering': 'AI engineering',
  'agentic-ai': 'Agentic AI',
  webscraping: 'Web scraping',
  polymath: 'Polymath',
  unassigned: 'Unassigned',
};
