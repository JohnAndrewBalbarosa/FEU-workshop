import 'server-only';
import { kv } from '@vercel/kv';
import { env } from './env';

/**
 * Two-mode store: Vercel KV in production, in-memory Map locally so the
 * dashboard works without provisioning KV during development. Both modes
 * implement the same JSON-blob-per-key semantics — the dashboard is
 * single-user so we don't need anything fancier.
 */

interface Backend {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}

class MemoryBackend implements Backend {
  private store = new Map<string, unknown>();
  async get<T>(key: string): Promise<T | null> {
    return (this.store.get(key) as T) ?? null;
  }
  async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }
}

class KvBackend implements Backend {
  async get<T>(key: string): Promise<T | null> {
    const v = await kv.get<T>(key);
    return v ?? null;
  }
  async set<T>(key: string, value: T): Promise<void> {
    await kv.set(key, value);
  }
}

// Singleton — the in-memory store survives between requests on a single
// serverless instance (good enough for local dev / preview).
const globalForStore = globalThis as unknown as { __dashStore?: Backend };
const backend: Backend =
  globalForStore.__dashStore ??
  (env.hasKv ? new KvBackend() : new MemoryBackend());
globalForStore.__dashStore = backend;

export const store = backend;
export const isUsingFallback = !env.hasKv;
