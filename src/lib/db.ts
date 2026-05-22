// Database wrapper with dual interface support
// Supports both Drizzle ORM style (db.select, db.insert, etc.) and raw SQLite style (sqlite.prepare())

// In-memory storage for contacts (replaces SQLite)
interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  product: string | null;
  message: string;
  status: string;
  createdAt: string;
}

interface Admin {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

const contacts: Contact[] = [];
const admins: Admin[] = [
  {
    id: 1,
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "$2a$10$placeholder_hash",
    createdAt: new Date().toISOString(),
  },
];
let contactIdCounter = 1;

// Drizzle-style interface
const db = {
  insert: async (table: string, values: Partial<Contact>) => {
    if (table === "contacts") {
      const contact: Contact = {
        id: contactIdCounter++,
        name: values.name || "",
        email: values.email || "",
        company: values.company || null,
        phone: values.phone || null,
        product: values.product || null,
        message: values.message || "",
        status: values.status || "pending",
        createdAt: values.createdAt || new Date().toISOString(),
      };
      contacts.push(contact);
      return contact;
    }
    throw new Error(`Unknown table: ${table}`);
  },
  select: async (table: string) => {
    if (table === "contacts") {
      return contacts.slice().reverse();
    }
    throw new Error(`Unknown table: ${table}`);
  },
  update: async (table: string, set: Partial<Contact>, where?: { id: number }) => {
    if (table === "contacts") {
      const idx = contacts.findIndex((c) => c.id === where?.id);
      if (idx !== -1) {
        contacts[idx] = { ...contacts[idx], ...set };
      }
      return { rowCount: idx !== -1 ? 1 : 0 };
    }
    throw new Error(`Unknown table: ${table}`);
  },
  delete: async (table: string, where?: { id: number }) => {
    if (table === "contacts") {
      const idx = contacts.findIndex((c) => c.id === where?.id);
      if (idx !== -1) {
        contacts.splice(idx, 1);
      }
      return { rowCount: idx !== -1 ? 1 : 0 };
    }
    throw new Error(`Unknown table: ${table}`);
  },
};

// Raw SQLite-style interface for compatibility
class Statement {
  private sql: string;
  private db: { contacts: Contact[]; admins: Admin[] };

  constructor(sql: string, db: { contacts: Contact[]; admins: Admin[] }) {
    this.sql = sql;
    this.db = db;
  }

  get(...params: unknown[]): Admin | undefined {
    if (this.sql.includes("admins")) {
      return this.db.admins.find((a) => a.username === params[0]);
    }
    return undefined;
  }

  run(...params: unknown[]): { changes: number } {
    if (this.sql.includes("DELETE") && this.sql.includes("contacts")) {
      const id = params[0];
      const idx = this.db.contacts.findIndex((c) => c.id === Number(id));
      if (idx !== -1) {
        this.db.contacts.splice(idx, 1);
        return { changes: 1 };
      }
    }
    return { changes: 0 };
  }
}

const storage = { contacts, admins };

const sqlite = {
  prepare: (sql: string) => new Statement(sql, storage),
};

export { db, sqlite };
