import bestSqlite from "best-sqlite3";
import { spotifyApi } from "../../../../util";

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

// Helper function to get a card by ID
function getCardById(id) {
    return db.run("SELECT * FROM cards WHERE id = $id", { id })[0] || null;
}

// Helper function to insert a new card
function insertCard(id) {
    db.run(
        "INSERT INTO cards (id, uri, active, action) VALUES ($id, '', 1, '')",
        { id }
    );
}

// Helper function to update a card's active state
function activateCard(id) {
    db.run("UPDATE cards SET active = 1 WHERE id = $id", { id });
}

export async function POST({ request }) {
    try {
        const { id } = await request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: "Missing required parameter: id" }), { status: 400 });
        }

        let card = getCardById(id);

        if (!card) {
            // If card doesn't exist, create it with active = 1 and empty fields
            insertCard(id);
            return new Response(JSON.stringify({ message: "Card created and activated", id }), { status: 201 });
        } else {
            // Update card to be active
            activateCard(id);

            if (card.action) {
                // Execute action if defined
                switch (card.action) {
                    case "play":
                        if (card.uri) await spotifyApi.play({context_uri: card.uri});
                        break;
                    case "queue":
                        if (card.uri) await spotifyApi.addToQueue(card.uri);
                        break;
                    case "state":
                        const playbackState = await spotifyApi.getMyCurrentPlaybackState();
                        if (playbackState.body.is_playing) {
                            await spotifyApi.pause();
                        } else {
                            await spotifyApi.play();
                        }
                        break;
                }
            }

            return new Response(JSON.stringify({ message: "Card activated", id, action: card.action }), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}