import ms from "ms";
import { Pool } from "pg";
import { sql } from "@vercel/postgres";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export function getDatabase() {
  if (process.env.VERCEL) {
    return sql;
  } else {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
}
