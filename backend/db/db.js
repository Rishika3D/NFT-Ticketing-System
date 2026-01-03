import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Use DATABASE_URL if it exists (Production), otherwise use local parts
const isProduction = process.env.DATABASE_URL;

export const db = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  host: !isProduction ? process.env.DB_HOST : undefined,
  port: !isProduction ? process.env.DB_PORT : undefined,
  database: !isProduction ? process.env.DB_NAME : undefined,
  user: !isProduction ? process.env.DB_USER : undefined,
  password: !isProduction ? process.env.DB_PASSWORD : undefined,
  // 🚨 CRITICAL: SSL is required for Render/Cloud Postgres
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

db.on("connect", () => {
  console.log("🐘 PostgreSQL Connected Successfully");
});

db.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
  process.exit(-1);
});