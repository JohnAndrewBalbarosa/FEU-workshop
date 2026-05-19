import { Outlet, Link } from 'react-router-dom';

export function WorkLayout() {
  return (
    <>
      <Outlet />
      <section className="section">
        <div className="shell">
          <hr className="rule rule--soft" />
          <Link to="/" className="back-link">← Index of contents</Link>
        </div>
      </section>
    </>
  );
}
