import { redirect } from 'next/navigation';
import { readSession } from '@/lib/session';

export default async function RootPage() {
  const s = await readSession();
  redirect(s ? '/dashboard' : '/login');
}
