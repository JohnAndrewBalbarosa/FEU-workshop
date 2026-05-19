import { Outlet } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { Wordmark } from '../components/nav/Wordmark';
import { TreeBreadcrumb } from '../components/nav/TreeBreadcrumb';
import { RouteTransition } from '../components/ui/RouteTransition';

export function RootLayout() {
  useLenis();
  return (
    <ErrorBoundary>
      <RouteTransition />
      <header className="site-header">
        <div className="shell site-header__inner">
          <Wordmark />
          <TreeBreadcrumb />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <span>© {new Date().getFullYear()} · J.A. Balbarosa</span>
          <span>Set in Fraunces &amp; Inter · Manila</span>
        </div>
      </footer>
    </ErrorBoundary>
  );
}
