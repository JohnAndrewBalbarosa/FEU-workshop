import 'server-only';
import { z } from 'zod';
import { store } from './store';

export const goalSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(2000).default(''),
  /** ISO date string, YYYY-MM-DD; empty when no target date. */
  targetDate: z.string().trim().max(10),
  done: z.boolean(),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative(),
});

export type Goal = z.infer<typeof goalSchema>;

const goalListSchema = z.array(goalSchema);
const KEY = (user: string): string => `dash:${user}:goals`;

export async function listGoals(user: string): Promise<Goal[]> {
  const raw = await store.get<unknown>(KEY(user));
  if (!raw) return [];
  const parsed = goalListSchema.safeParse(raw);
  return parsed.success ? parsed.data : [];
}

async function writeGoals(user: string, goals: Goal[]): Promise<void> {
  await store.set(KEY(user), goals);
}

export interface CreateGoalInput {
  title: string;
  notes: string;
  targetDate: string;
}

export async function createGoal(user: string, input: CreateGoalInput): Promise<Goal> {
  const now = Date.now();
  const goal: Goal = {
    id: crypto.randomUUID(),
    title: input.title,
    notes: input.notes,
    targetDate: input.targetDate,
    done: false,
    createdAt: now,
    updatedAt: now,
  };
  const list = await listGoals(user);
  await writeGoals(user, [goal, ...list]);
  return goal;
}

export async function toggleGoal(user: string, id: string): Promise<Goal | null> {
  const list = await listGoals(user);
  const idx = list.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  const updated: Goal = { ...list[idx], done: !list[idx].done, updatedAt: Date.now() };
  const next = [...list];
  next[idx] = updated;
  await writeGoals(user, next);
  return updated;
}

export async function deleteGoal(user: string, id: string): Promise<boolean> {
  const list = await listGoals(user);
  const next = list.filter((g) => g.id !== id);
  if (next.length === list.length) return false;
  await writeGoals(user, next);
  return true;
}
