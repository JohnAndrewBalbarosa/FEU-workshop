'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/session';
import { createTask, updateTask, deleteTask, TASK_STATUSES } from '@/lib/tasks';
import { createGoal, toggleGoal, deleteGoal } from '@/lib/goals';
import { DOMAIN_KEYS } from '@/lib/domains';

/* ------------------------------------------------------------------ */
/* Server Actions for direct form binding return Promise<void> per    */
/* React 19's contract. All input is sanitized server-side via zod;   */
/* parse failures are logged + swallowed so a malformed POST can't    */
/* leak schema details to the client.                                 */
/* ------------------------------------------------------------------ */

function logBadInput(scope: string, err: unknown): void {
  // eslint-disable-next-line no-console
  console.warn(`[dash:${scope}] rejected input:`, err);
}

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(2000),
  domain: z.enum(DOMAIN_KEYS),
  pendingAi: z.union([z.literal('on'), z.literal('off'), z.null()]).transform((v) => v === 'on'),
});

export async function createTaskAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = createTaskSchema.safeParse({
    title: formData.get('title'),
    notes: formData.get('notes') ?? '',
    domain: formData.get('domain'),
    pendingAi: formData.get('pendingAi'),
  });
  if (!parsed.success) { logBadInput('createTask', parsed.error.flatten()); return; }

  await createTask(session.sub, parsed.data);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
}

const updateTaskSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(TASK_STATUSES).optional(),
  domain: z.enum(DOMAIN_KEYS).optional(),
});

export async function updateTaskAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = updateTaskSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status') || undefined,
    domain: formData.get('domain') || undefined,
  });
  if (!parsed.success) { logBadInput('updateTask', parsed.error.flatten()); return; }

  const patch: Parameters<typeof updateTask>[2] = {};
  if (parsed.data.status) patch.status = parsed.data.status;
  if (parsed.data.domain) {
    patch.domain = parsed.data.domain;
    patch.pendingAi = false; // domain explicitly set ⇒ AI no longer needed
  }

  await updateTask(session.sub, parsed.data.id, patch);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
}

const idSchema = z.object({ id: z.string().uuid() });

export async function deleteTaskAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = idSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) { logBadInput('deleteTask', parsed.error.flatten()); return; }
  await deleteTask(session.sub, parsed.data.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/tasks');
}

/* --- Goals --- */

const createGoalSchema = z.object({
  title: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(2000),
  targetDate: z.string().trim().regex(/^(\d{4}-\d{2}-\d{2})?$/, 'Invalid date'),
});

export async function createGoalAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = createGoalSchema.safeParse({
    title: formData.get('title'),
    notes: formData.get('notes') ?? '',
    targetDate: formData.get('targetDate') ?? '',
  });
  if (!parsed.success) { logBadInput('createGoal', parsed.error.flatten()); return; }
  await createGoal(session.sub, parsed.data);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/goals');
}

export async function toggleGoalAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = idSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) { logBadInput('toggleGoal', parsed.error.flatten()); return; }
  await toggleGoal(session.sub, parsed.data.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/goals');
}

export async function deleteGoalAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const parsed = idSchema.safeParse({ id: formData.get('id') });
  if (!parsed.success) { logBadInput('deleteGoal', parsed.error.flatten()); return; }
  await deleteGoal(session.sub, parsed.data.id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/goals');
}
