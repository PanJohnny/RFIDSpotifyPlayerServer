import SpotifyWebApi from "spotify-web-api-node";

export const spotifyApi:SpotifyWebApi = new SpotifyWebApi({
	clientId: "b68e2f3f6ea1445585f99b6a41be6db2",
	clientSecret: "12e2f1fb2edd44f28600513e315a75c6",
	redirectUri: "http://localhost:3000/callback"
})