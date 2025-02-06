import Database from 'better-sqlite3';
export { renderers } from '../../../../renderers.mjs';

// Initialize the database
const db = new Database("cards.db");

// Ensure the table exists
db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        uri TEXT,
        active INTEGER,  -- BOOLEAN is not supported in SQLite
        action TEXT
    )
`);

// Queries the DB for the active cards and returns the last one.
function GET() {
    try {
        const rows = db.prepare("SELECT * FROM cards WHERE active = 1").all();
        const lastActiveCard = rows.length > 0 ? rows[rows.length - 1] : null;

        return new Response(JSON.stringify({ data: lastActiveCard }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
