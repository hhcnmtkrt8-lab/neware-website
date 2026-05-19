import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.join(process.cwd(), "neware.db");
const sqlite = new Database(dbPath);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    product TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

// Create default admin
const checkStmt = sqlite.prepare(`SELECT * FROM admins WHERE username = ?`);
const existing = checkStmt.get("admin");

if (!existing) {
  const hashedPassword = bcrypt.hashSync("neware2026", 10);
  const insertStmt = sqlite.prepare(`
    INSERT INTO admins (username, password, created_at) VALUES (?, ?, ?)
  `);
  insertStmt.run("admin", hashedPassword, new Date().toISOString());
  console.log("Admin account created: admin / neware2026");
} else {
  console.log("Admin account already exists.");
}

console.log("Database initialized successfully!");
sqlite.close();
