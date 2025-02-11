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

// GET all cards
export function GET() {
    try {
        const cards = db.run("SELECT * FROM cards");
        return new Response(JSON.stringify(cards), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// POST: Insert a new card
export async function POST({ request }) {
    try {
        const { id, uri, active, action } = await request.json();

        db.run(
            "INSERT INTO cards (id, uri, active, action) VALUES ($id, $uri, $active, $action)",
            { id, uri, active: active ? 1 : 0, action }
        );

        return new Response(JSON.stringify({ message: "Card added" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// PUT: Update an existing card
export async function PUT({ request }) {
    try {
        const { id, uri, active, action } = await request.json();

        db.run(
            "UPDATE cards SET uri = $uri, active = $active, action = $action WHERE id = $id",
            { uri, active: active ? 1 : 0, action, id }
        );

        return new Response(JSON.stringify({ message: "Card updated" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// DELETE: Remove a card
export async function DELETE({ request }) {
    try {
        const { id } = await request.json();

        db.run("DELETE FROM cards WHERE id = $id", { id });

        return new Response(JSON.stringify({ message: "Card deleted" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}