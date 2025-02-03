import SpotifyWebApi from "spotify-web-api-node";

export const spotifyApi: SpotifyWebApi = new SpotifyWebApi({// @ts-ignore
	clientId: import.meta.env.CLIENT_ID,// @ts-ignore
	clientSecret: import.meta.env.CLIENT_SECRET,// @ts-ignore
	redirectUri: import.meta.env.REDIRECT_URI
})

export interface TempData {
	writing?: boolean;
	data?: string;
	card?: string;
}