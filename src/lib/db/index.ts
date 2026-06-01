import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type AppDb = PostgresJsDatabase<typeof schema>;

let client: postgres.Sql | null = null;
let dbInstance: AppDb | null = null;

/** Drizzle ORM データベースインスタンスを実行時に初期化する */
export function getDb(): AppDb {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!client) {
    client = postgres(process.env.DATABASE_URL);
  }

  if (!dbInstance) {
    dbInstance = drizzle(client, { schema });
  }

  return dbInstance;
}
