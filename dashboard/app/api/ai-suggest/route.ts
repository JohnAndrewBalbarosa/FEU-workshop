import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/session';

/**
 * Placeholder AI domain-classifier endpoint.
 * Auth-gated by middleware AND requireSession() so it can never run unauthenticated.
 * The real classifier (Anthropic / OpenAI) is deferred to the next pass — this
 * route returns 501 so any caller knows the feature is not yet wired.
 */
export async function POST(): Promise<NextResponse> {
  await requireSession();
  return NextResponse.json(
    {
      ok: false,
      status: 'deferred',
      message:
        'AI suggestion is deferred. Classify manually for now; the queued items keep their pending flag and will be processed when the classifier is wired in the next pass.',
    },
    { status: 501 },
  );
}
