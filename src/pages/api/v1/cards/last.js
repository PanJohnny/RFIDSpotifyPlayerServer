import sqlite3 from "sqlite3";

const db = new sqlite3.Database("cards.db");

// Ensure the table exists
db.run(`
    CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    uri TEXT,
    active INTEGER,  -- BOOLEAN is not supported in SQLite
    action TEXT
    )
`);

// Queries the DB for the active cards and returns the last one.
export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM cards WHERE active = 1", (err, rows) => {
            if (err) {
                resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
            } else {
                resolve(new Response(JSON.stringify({data: rows[rows.length - 1]}), { status: 200 }));
            }
        });
    });
}