/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server-only env vars (no NEXT_PUBLIC_ prefix) — never shipped to the client.
  // DASHBOARD_USERNAME, DASHBOARD_PASSWORD_HASH, AUTH_SECRET, KV_* are all read
  // exclusively in server components / route handlers / middleware.
  experimental: {
    serverActions: { bodySizeLimit: '256kb' },
  },
};

export default nextConfig;
