import Database from 'better-sqlite3';
export { renderers } from '../../../renderers.mjs';

// Initialize the database
const db = new Database('database.db');

// Ensure the table exists
db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        uri TEXT,
        active INTEGER,  -- BOOLEAN is not supported in SQLite
        action TEXT
    )
`);

// GET all cards
function GET() {
    try {
        const cards = db.prepare("SELECT * FROM cards").all();
        return new Response(JSON.stringify(cards), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// POST: Insert a new card
async function POST({ request }) {
    try {
        const { id, uri, active, action } = await request.json();

        const stmt = db.prepare("INSERT INTO cards (id, uri, active, action) VALUES (?, ?, ?, ?)");
        stmt.run(id, uri, active ? 1 : 0, action);

        return new Response(JSON.stringify({ message: "Card added" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// PUT: Update an existing card
async function PUT({ request }) {
    try {
        const { id, uri, active, action } = await request.json();

        const stmt = db.prepare("UPDATE cards SET uri = ?, active = ?, action = ? WHERE id = ?");
        stmt.run(uri, active ? 1 : 0, action, id);

        return new Response(JSON.stringify({ message: "Card updated" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE: Remove a card
async function DELETE({ request }) {
    try {
        const { id } = await request.json();

        const stmt = db.prepare("DELETE FROM cards WHERE id = ?");
        stmt.run(id);

        return new Response(JSON.stringify({ message: "Card deleted" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET,
    POST,
    PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
