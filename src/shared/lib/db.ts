import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");

const globalForDb = global as unknown as { db: Database.Database };

export const db =
  globalForDb.db ||
  new Database(dbPath, {
    // verbose: console.log,
  });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

// Enable foreign keys and WAL mode for high performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export default db;
