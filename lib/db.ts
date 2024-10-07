import { sql } from "@vercel/postgres";

export type DatabaseClient = {
  query: (text: string, params?: any[]) => Promise<{ rows: any[] }>;
};

let db: DatabaseClient;

export async function getDatabase(): Promise<DatabaseClient> {
  if (!db) {
    if (process.env.VERCEL) {
      db = sql;
    } else {
      const { Pool } = await import("pg");
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
      db = {
        query: (text, params) => pool.query(text, params),
      };
    }
  }
  return db;
}
