import { requireSession } from '@/lib/session';
import { listTasks } from '@/lib/tasks';
import { DOMAIN_KEYS, DOMAIN_LABELS, type DomainKey } from '@/lib/domains';
import {
  createTaskAction,
  updateTaskAction,
  deleteTaskAction,
} from '../actions';

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const session = await requireSession();
  const tasks = await listTasks(session.sub);

  return (
    <div className="dash__page">
      <header className="dash__page-head">
        <span className="eyebrow">§ 01 — Tasks</span>
        <h1>Tasks &amp; assignments.</h1>
      </header>

      <section className="dash__panel">
        <h2 className="dash__h2">New task</h2>
        <form action={createTaskAction} className="dash__form">
          <label className="field">
            <span className="field__label">Title</span>
            <input name="title" type="text" required maxLength={200} />
          </label>

          <label className="field">
            <span className="field__label">Notes</span>
            <textarea name="notes" rows={3} maxLength={2000} />
          </label>

          <label className="field">
            <span className="field__label">Domain</span>
            <select name="domain" defaultValue="unassigned">
              {DOMAIN_KEYS.map((k) => (
                <option key={k} value={k}>{DOMAIN_LABELS[k]}</option>
              ))}
            </select>
          </label>

          <label className="field field--check">
            <input name="pendingAi" type="checkbox" />
            <span>Queue for AI domain analysis (deferred — manual classification still works)</span>
          </label>

          <button type="submit" className="btn btn--accent">Add task →</button>
        </form>
      </section>

      <section className="dash__panel">
        <h2 className="dash__h2">All tasks <span className="mono">{tasks.length}</span></h2>

        {tasks.length === 0 ? (
          <p className="dash__empty">No tasks yet.</p>
        ) : (
          <ul className="dash__list">
            {tasks.map((t) => (
              <li key={t.id} className="dash__row">
                <div className="dash__row-main">
                  <span className={`dash__chip dash__chip--${t.status}`}>{t.status}</span>
                  <strong>{t.title}</strong>
                  {t.pendingAi && <span className="dash__chip dash__chip--pending">⏳ AI pending</span>}
                  {t.notes && <p className="dash__notes">{t.notes}</p>}
                </div>

                <div className="dash__row-actions">
                  <form action={updateTaskAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <select name="domain" defaultValue={t.domain} aria-label="Domain">
                      {DOMAIN_KEYS.map((k) => (
                        <option key={k} value={k}>{DOMAIN_LABELS[k]}</option>
                      ))}
                    </select>
                    <button type="submit" className="btn btn--ghost">Save</button>
                  </form>

                  <form action={updateTaskAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="status" value={nextStatus(t.status)} />
                    <button type="submit" className="btn btn--ghost">→ {nextStatus(t.status)}</button>
                  </form>

                  <form action={deleteTaskAction}>
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" className="btn btn--danger">Delete</button>
                  </form>
                </div>

                <span className="dash__row-meta mono">
                  {DOMAIN_LABELS[t.domain as DomainKey]} · {fmtDate(t.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function nextStatus(s: string): string {
  if (s === 'todo') return 'doing';
  if (s === 'doing') return 'done';
  return 'todo';
}

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}
