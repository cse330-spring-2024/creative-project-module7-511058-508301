import SpotifyApi from 'spotify-web-api-node';

const scopes = [
    "streaming",
    "user-read-playback-state",
].join(',');

const params= {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`; // This is the URL that the user will be redirected to in order to authenticate with Spotify

const spotifyApi = new SpotifyApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    // redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
});

export default spotifyApi;

export {LOGIN_URL};