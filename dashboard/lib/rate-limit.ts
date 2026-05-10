import 'server-only';

/**
 * In-memory token-bucket rate limiter — survives a single serverless instance
 * but resets on cold start. Good enough as a brute-force speed bump for a
 * personal dashboard. For multi-instance limiting, swap to KV.
 */
const buckets = new Map<string, { tokens: number; updatedAt: number }>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs: number;
}

export function rateLimit(key: string, capacity: number, refillPerMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { tokens: capacity, updatedAt: now };

  const elapsed = now - bucket.updatedAt;
  const refill = elapsed * refillPerMs;
  const tokens = Math.min(capacity, bucket.tokens + refill);

  if (tokens < 1) {
    buckets.set(key, { tokens, updatedAt: now });
    const retryAfterMs = Math.ceil((1 - tokens) / refillPerMs);
    return { allowed: false, retryAfterMs };
  }

  buckets.set(key, { tokens: tokens - 1, updatedAt: now });
  return { allowed: true, retryAfterMs: 0 };
}
