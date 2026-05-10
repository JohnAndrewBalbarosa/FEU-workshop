import { requireSession } from '@/lib/session';
import { listTasks } from '@/lib/tasks';
import { listGoals } from '@/lib/goals';
import { DOMAIN_LABELS } from '@/lib/domains';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OverviewPage() {
  const session = await requireSession();
  const [tasks, goals] = await Promise.all([
    listTasks(session.sub),
    listGoals(session.sub),
  ]);

  const todo = tasks.filter((t) => t.status === 'todo').length;
  const doing = tasks.filter((t) => t.status === 'doing').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const pendingAi = tasks.filter((t) => t.pendingAi).length;

  const byDomain = new Map<string, number>();
  for (const t of tasks) byDomain.set(t.domain, (byDomain.get(t.domain) ?? 0) + 1);

  return (
    <div className="dash__page">
      <header className="dash__page-head">
        <span className="eyebrow">§ 00 — Overview</span>
        <h1>What&rsquo;s on the desk.</h1>
      </header>

      <section className="dash__metrics">
        <Metric label="Todo" value={todo} />
        <Metric label="Doing" value={doing} accent />
        <Metric label="Done" value={done} />
        <Metric label="Pending AI review" value={pendingAi} />
        <Metric label="Goals open" value={goals.filter((g) => !g.done).length} />
      </section>

      <section className="dash__columns">
        <div>
          <h2 className="dash__h2">By domain</h2>
          <ul className="dash__breakdown">
            {Array.from(byDomain.entries()).map(([d, n]) => (
              <li key={d}>
                <span className="mono">{DOMAIN_LABELS[d as keyof typeof DOMAIN_LABELS] ?? d}</span>
                <span className="mono">{n}</span>
              </li>
            ))}
            {byDomain.size === 0 && <li><span className="dash__empty">No tasks yet.</span></li>}
          </ul>
          <p className="dash__cta">
            <Link href="/dashboard/tasks" className="btn btn--ghost">Manage tasks →</Link>
          </p>
        </div>

        <div>
          <h2 className="dash__h2">Recent goals</h2>
          <ul className="dash__breakdown">
            {goals.slice(0, 5).map((g) => (
              <li key={g.id}>
                <span>{g.done ? '✓' : '○'} {g.title}</span>
                <span className="mono">{g.targetDate || '—'}</span>
              </li>
            ))}
            {goals.length === 0 && <li><span className="dash__empty">No goals yet.</span></li>}
          </ul>
          <p className="dash__cta">
            <Link href="/dashboard/goals" className="btn btn--ghost">Manage goals →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`dash__metric ${accent ? 'is-accent' : ''}`}>
      <span className="dash__metric-num">{value}</span>
      <span className="dash__metric-label">{label}</span>
    </div>
  );
}
