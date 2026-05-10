import Link from 'next/link';
import { requireSession } from '@/lib/session';
import { isUsingFallback } from '@/lib/store';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <div className="dash">
      <header className="dash__bar">
        <div className="dash__brand">
          <span className="eyebrow">§ DASH</span>
          <strong>{session.sub}</strong>
        </div>

        <nav className="dash__nav">
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/tasks">Tasks</Link>
          <Link href="/dashboard/goals">Goals</Link>
        </nav>

        <form action="/api/logout" method="post" className="dash__logout">
          <button type="submit" className="btn btn--ghost">Sign out →</button>
        </form>
      </header>

      {isUsingFallback && (
        <div className="dash__warning eyebrow" role="status">
          Storage fallback active — Vercel KV not configured. Data is in-memory and will reset.
        </div>
      )}

      <main className="dash__main">{children}</main>
    </div>
  );
}
