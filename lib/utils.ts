import ms from "ms";
import { Pool } from "pg";
import { sql } from "@vercel/postgres";

type DatabaseClient = {
  query: (text: string, params?: any[]) => Promise<{ rows: any[] }>;
};

export function getDatabase(): DatabaseClient {
  if (process.env.VERCEL) {
    return sql;
  } else {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return {
      query: (text, params) => pool.query(text, params),
    };
  }
}

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};
