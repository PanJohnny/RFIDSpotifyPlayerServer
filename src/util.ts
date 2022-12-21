import SpotifyWebApi from "spotify-web-api-node";
import * as fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = __dirname + "\\..\\..\\temp_data.json";

export const spotifyApi: SpotifyWebApi = new SpotifyWebApi({
	clientId: "b68e2f3f6ea1445585f99b6a41be6db2",
	clientSecret: "12e2f1fb2edd44f28600513e315a75c6",
	redirectUri: "http://10.0.0.17:3000/callback"
})

export interface TempData {
	writing?: boolean;
	data?: string;
	card?: string;
}
export function writeData(data: TempData) {
	const begin = JSON.parse(fs.readFileSync(path).toString("utf-8"))

	if (data.writing !== undefined) {
		begin.writing = data.writing;
	}


	if (data.data) {
		begin.data = data.data;

	}

	if (data.card) {
		begin.card = data.card;
	}

	fs.writeFileSync(path, JSON.stringify(begin))
}

export function readData(): TempData {
	return JSON.parse(fs.readFileSync(path).toString("utf-8"))
}