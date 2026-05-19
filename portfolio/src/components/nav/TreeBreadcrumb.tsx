import { Link, useLocation } from 'react-router-dom';
import './nav.css';

const LABELS: Record<string, string> = {
  '': 'Index',
  work: 'Work',
  about: 'About',
  receipts: 'Receipts',
  cybersecurity: 'Cybersecurity',
  backend: 'Backend',
  lowlevel: 'C++ · Low-level',
  'ai-engineering': 'AI engineering',
  'agentic-ai': 'Agentic AI',
  webscraping: 'Web scraping',
  polymath: 'Polymath margins',
};

/**
 * Editorial breadcrumb rendered as a literal indented tree of the active path.
 * Only the current path is shown — no sibling links — to keep the site tree-
 * shaped and reduce visual noise.
 */
export function TreeBreadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const nodes: { href: string; label: string; depth: number }[] = [
    { href: '/', label: LABELS[''], depth: 0 },
  ];
  let acc = '';
  parts.forEach((p, i) => {
    acc += `/${p}`;
    nodes.push({ href: acc, label: LABELS[p] ?? p, depth: i + 1 });
  });

  return (
    <nav className="tree-breadcrumb" aria-label="Breadcrumb">
      {nodes.map((n, i) => {
        const isLast = i === nodes.length - 1;
        return (
          <span key={n.href} className="tree-breadcrumb__row mono">
            <span aria-hidden="true" className="tree-breadcrumb__rail">
              {n.depth === 0 ? '/' : `${'  '.repeat(n.depth - 1)}└─`}
            </span>
            {isLast ? (
              <span className="tree-breadcrumb__leaf">{n.label}</span>
            ) : (
              <Link to={n.href}>{n.label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
