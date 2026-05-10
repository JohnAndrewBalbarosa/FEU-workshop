'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env';
import { issueSession, setSessionCookie } from '@/lib/session';
import { rateLimit } from '@/lib/rate-limit';

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(128),
});

export interface LoginState {
  error: string | null;
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  // 5 attempts per ~minute per IP — bucket refills 1 token / 12s.
  const rl = rateLimit(`login:${ip}`, 5, 1 / 12_000);
  if (!rl.allowed) {
    return { error: `Too many attempts. Try again in ${Math.ceil(rl.retryAfterMs / 1000)}s.` };
  }

  const parsed = loginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { error: 'Invalid input.' };

  const { username, password } = parsed.data;

  // Constant-time-ish: always run bcrypt even on username mismatch.
  const userOk = username === env.username;
  const passOk = await bcrypt.compare(password, env.passwordHash);

  if (!userOk || !passOk) {
    return { error: 'Invalid credentials.' };
  }

  const token = await issueSession(username);
  await setSessionCookie(token);
  redirect('/dashboard');
}
