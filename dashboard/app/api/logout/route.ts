import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/session';

export async function POST(): Promise<NextResponse> {
  await clearSessionCookie();
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001'));
}
