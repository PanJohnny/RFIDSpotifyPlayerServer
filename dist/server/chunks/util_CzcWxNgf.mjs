import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  // @ts-ignore
  clientId: "b68e2f3f6ea1445585f99b6a41be6db2",
  // @ts-ignore
  clientSecret: "12e2f1fb2edd44f28600513e315a75c6",
  // @ts-ignore
  redirectUri: "http://10.0.0.33/callback"
});

export { spotifyApi as s };
