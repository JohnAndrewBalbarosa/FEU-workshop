import 'server-only';
import { z } from 'zod';
import { store } from './store';
import { DOMAIN_KEYS, type DomainKey } from './domains';

export const TASK_STATUSES = ['todo', 'doing', 'done'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1).max(200),
  notes: z.string().trim().max(2000).default(''),
  status: z.enum(TASK_STATUSES),
  domain: z.enum(DOMAIN_KEYS),
  /** True when the task is queued for AI domain-classification but not yet processed. */
  pendingAi: z.boolean(),
  createdAt: z.number().int().nonnegative(),
  updatedAt: z.number().int().nonnegative(),
});

export type Task = z.infer<typeof taskSchema>;

const taskListSchema = z.array(taskSchema);
const KEY_TASKS = (user: string): string => `dash:${user}:tasks`;

export async function listTasks(user: string): Promise<Task[]> {
  const raw = await store.get<unknown>(KEY_TASKS(user));
  if (!raw) return [];
  const parsed = taskListSchema.safeParse(raw);
  return parsed.success ? parsed.data : [];
}

async function writeTasks(user: string, tasks: Task[]): Promise<void> {
  await store.set(KEY_TASKS(user), tasks);
}

export interface CreateTaskInput {
  title: string;
  notes: string;
  domain: DomainKey;
  pendingAi: boolean;
}

export async function createTask(user: string, input: CreateTaskInput): Promise<Task> {
  const now = Date.now();
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    notes: input.notes,
    status: 'todo',
    domain: input.domain,
    pendingAi: input.pendingAi,
    createdAt: now,
    updatedAt: now,
  };
  const list = await listTasks(user);
  await writeTasks(user, [task, ...list]);
  return task;
}

export async function updateTask(
  user: string,
  id: string,
  patch: Partial<Pick<Task, 'title' | 'notes' | 'status' | 'domain' | 'pendingAi'>>,
): Promise<Task | null> {
  const list = await listTasks(user);
  const idx = list.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated: Task = { ...list[idx], ...patch, updatedAt: Date.now() };
  const next = [...list];
  next[idx] = updated;
  await writeTasks(user, next);
  return updated;
}

export async function deleteTask(user: string, id: string): Promise<boolean> {
  const list = await listTasks(user);
  const next = list.filter((t) => t.id !== id);
  if (next.length === list.length) return false;
  await writeTasks(user, next);
  return true;
}
