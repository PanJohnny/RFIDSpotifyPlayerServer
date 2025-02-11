import bestSqlite from "best-sqlite3";

// Initialize the database
const db = await bestSqlite.connect("cards.db");

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
export function GET() {
    try {
        const rows = db.run("SELECT * FROM cards WHERE active = 1");
        const lastActiveCard = rows.length > 0 ? rows[rows.length - 1] : null;

        return new Response(JSON.stringify({ data: lastActiveCard }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}