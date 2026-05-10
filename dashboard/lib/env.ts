/**
 * Server-only env reader. Throws on import-time misconfiguration so we never
 * silently boot with missing secrets. NEVER reference these from a client
 * component — they have no NEXT_PUBLIC_ prefix and won't be inlined anyway,
 * but discipline matters.
 */
import 'server-only';

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v;
}

function optional(name: string, fallback: string): string {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

export const env = {
  get username(): string { return required('DASHBOARD_USERNAME'); },
  get passwordHash(): string { return required('DASHBOARD_PASSWORD_HASH'); },
  get authSecret(): string { return required('AUTH_SECRET'); },
  get cookieName(): string { return optional('AUTH_COOKIE_NAME', 'dash_session'); },
  get hasKv(): boolean { return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN); },
};
