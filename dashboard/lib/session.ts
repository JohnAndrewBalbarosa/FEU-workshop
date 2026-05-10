import 'server-only';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { env } from './env';

const ALG = 'HS256';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export interface Session {
  sub: string;
  iat: number;
  exp: number;
}

function secretKey(): Uint8Array {
  return new TextEncoder().encode(env.authSecret);
}

export async function issueSession(username: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: ALG })
    .setSubject(username)
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_TTL_SECONDS)
    .sign(secretKey());
}

export async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: [ALG] });
    if (typeof payload.sub !== 'string') return null;
    const p = payload as JWTPayload & { iat: number; exp: number };
    return { sub: payload.sub, iat: p.iat, exp: p.exp };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(env.cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(env.cookieName);
}

export async function readSession(): Promise<Session | null> {
  const store = await cookies();
  const tok = store.get(env.cookieName)?.value;
  if (!tok) return null;
  return verifySession(tok);
}

export async function requireSession(): Promise<Session> {
  const s = await readSession();
  if (!s) throw new Error('UNAUTHORIZED');
  return s;
}
