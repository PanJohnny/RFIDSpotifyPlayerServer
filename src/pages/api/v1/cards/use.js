import sqlite3 from "sqlite3";
import { spotifyApi } from "../../../../util";

const db = new sqlite3.Database("cards.db");

// Helper function to run SQL queries
function queryDB(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Helper function to get a card by ID
function getCardById(id) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM cards WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export async function POST({ request }) {
    try {
        const { id } = await request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: "Missing required parameter: id" }), { status: 400 });
        }

        let card = await getCardById(id);

        if (!card) {
            // If card doesn't exist, create it with active = 1 and empty fields
            await queryDB("INSERT INTO cards (id, uri, active, action) VALUES (?, ?, ?, ?)", [id, "", 1, ""]);
            return new Response(JSON.stringify({ message: "Card created and activated", id }), { status: 201 });
        } else {
            // Update card to be active
            await queryDB("UPDATE cards SET active = 1 WHERE id = ?", [id]);

            if (card.action) {
                // Execute action if defined
                switch (card.action) {
                    case "play":
                        if (card.uri) await spotifyApi.play({ uris: [card.uri] });
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