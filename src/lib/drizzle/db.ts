import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '$env/dynamic/private';
import * as schema from './schema';

const connectionString = env.POSTGRES_URI

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema });

export const createDbClient  = () => {
  const connectionString = env.POSTGRES_URI

  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(connectionString, { prepare: false })
  const db = drizzle(client, { schema });
  return db
}
