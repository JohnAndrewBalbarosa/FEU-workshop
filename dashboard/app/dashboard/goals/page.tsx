import { requireSession } from '@/lib/session';
import { listGoals } from '@/lib/goals';
import { createGoalAction, toggleGoalAction, deleteGoalAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function GoalsPage() {
  const session = await requireSession();
  const goals = await listGoals(session.sub);

  return (
    <div className="dash__page">
      <header className="dash__page-head">
        <span className="eyebrow">§ 02 — Goals</span>
        <h1>Where you&rsquo;re pointing.</h1>
      </header>

      <section className="dash__panel">
        <h2 className="dash__h2">New goal</h2>
        <form action={createGoalAction} className="dash__form">
          <label className="field">
            <span className="field__label">Title</span>
            <input name="title" type="text" required maxLength={200} />
          </label>

          <label className="field">
            <span className="field__label">Notes</span>
            <textarea name="notes" rows={3} maxLength={2000} />
          </label>

          <label className="field">
            <span className="field__label">Target date (optional)</span>
            <input name="targetDate" type="date" />
          </label>

          <button type="submit" className="btn btn--accent">Add goal →</button>
        </form>
      </section>

      <section className="dash__panel">
        <h2 className="dash__h2">All goals <span className="mono">{goals.length}</span></h2>

        {goals.length === 0 ? (
          <p className="dash__empty">No goals yet.</p>
        ) : (
          <ul className="dash__list">
            {goals.map((g) => (
              <li key={g.id} className={`dash__row ${g.done ? 'is-done' : ''}`}>
                <div className="dash__row-main">
                  <strong>{g.done ? '✓ ' : ''}{g.title}</strong>
                  {g.notes && <p className="dash__notes">{g.notes}</p>}
                </div>

                <div className="dash__row-actions">
                  <form action={toggleGoalAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <button type="submit" className="btn btn--ghost">
                      {g.done ? 'Reopen' : 'Mark done'}
                    </button>
                  </form>
                  <form action={deleteGoalAction}>
                    <input type="hidden" name="id" value={g.id} />
                    <button type="submit" className="btn btn--danger">Delete</button>
                  </form>
                </div>

                <span className="dash__row-meta mono">
                  {g.targetDate || 'no target'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
