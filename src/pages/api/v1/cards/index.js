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

// Helper function to execute SQL queries
function promiseSQL(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this); // Resolves with `this` to access `lastID` if needed
            }
        });
    });
}

// GET all cards
export async function GET() {
    return new Promise((resolve) => {
        db.all("SELECT * FROM cards", (err, rows) => {
            if (err) {
                resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
            } else {
                resolve(new Response(JSON.stringify(rows), { status: 200 }));
            }
        });
    });
}

// POST: Insert a new card
export async function POST({ request }) {
    try {
        const { id, uri, active, action } = await request.json();

        await promiseSQL(
            "INSERT INTO cards (id, uri, active, action) VALUES (?, ?, ?, ?)",
            [id, uri, active ? 1 : 0, action]
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

        await promiseSQL(
            "UPDATE cards SET uri = ?, active = ?, action = ? WHERE id = ?",
            [uri, active ? 1 : 0, action, id]
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

        await promiseSQL("DELETE FROM cards WHERE id = ?", [id]);

        return new Response(JSON.stringify({ message: "Card deleted" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
