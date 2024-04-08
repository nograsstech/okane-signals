import 'dotenv/config';
import type { Config } from 'drizzle-kit';
export default {
  schema: 'src/lib/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.POSTGRES_URI ?? ''
  },
} satisfies Config;