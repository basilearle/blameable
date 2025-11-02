import { drizzle } from 'drizzle-orm/node-postgres';

export const db = (connectionString: string) => drizzle(connectionString);
