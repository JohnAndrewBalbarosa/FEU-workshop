import { redirect } from 'next/navigation';
import { readSession } from '@/lib/session';
import { LoginForm } from './LoginForm';

export const metadata = { title: 'Sign in · Dashboard' };

export default async function LoginPage() {
  const session = await readSession();
  if (session) redirect('/dashboard');

  return (
    <main className="login">
      <div className="login__panel">
        <header className="login__head">
          <span className="eyebrow">§ DASH · Authenticated area</span>
          <h1>Sign in.</h1>
          <p className="login__sub">
            Personal dashboard. All input is sanitized server-side; credentials
            are checked against an env-only bcrypt hash. There is no client-side
            auth state.
          </p>
        </header>
        <LoginForm />
      </div>
    </main>
  );
}
