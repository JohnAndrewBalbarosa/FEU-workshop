'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from './actions';

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="login__form" autoComplete="off">
      <label className="field">
        <span className="field__label">Username</span>
        <input
          name="username"
          type="text"
          required
          maxLength={64}
          autoComplete="username"
          spellCheck={false}
        />
      </label>

      <label className="field">
        <span className="field__label">Password</span>
        <input
          name="password"
          type="password"
          required
          maxLength={128}
          autoComplete="current-password"
        />
      </label>

      {state.error && (
        <p className="login__error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="btn btn--accent" disabled={pending}>
        {pending ? 'Verifying…' : 'Sign in →'}
      </button>
    </form>
  );
}
