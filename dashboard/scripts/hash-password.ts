/**
 * Local-only helper: prompts for a password and prints a bcrypt hash to stdout.
 * Paste the hash into Vercel → Project → Settings → Environment Variables as
 * DASHBOARD_PASSWORD_HASH. Run with:  npm run hash-password
 *
 * Never commit the real hash to git.
 */
import bcrypt from 'bcryptjs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, exit } from 'node:process';

async function main(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });
  const password = (await rl.question('Password (will not echo bcrypt round): ')).trim();
  rl.close();

  if (password.length < 12) {
    console.error('\nERROR: pick at least 12 characters.');
    exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  console.log('\n--- copy the line below into Vercel env as DASHBOARD_PASSWORD_HASH ---');
  console.log(hash);
}

main().catch((err: unknown) => {
  console.error(err);
  exit(1);
});
