import bestSqlite from 'best-sqlite3';

// Initialize the database
const db = await bestSqlite.connect('cards.db');
// Ensure the table exists
db.run(`
    CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        uri TEXT,
        active INTEGER,  -- BOOLEAN is not supported in SQLite
        action TEXT
    )
`);

// Queries the DB for the active cards and sets them to inactive.
export function GET() {
    try {
        db.run('UPDATE cards SET active = 0 WHERE active = 1');
        return new Response(JSON.stringify({ success: true, message: 'Session started' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}