import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


async function refreshAccessToken(token) {
    try{
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log('REFRESHED TOKEN:', refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token || token.refreshToken, //if no refresh token is returned, use the existing one
        };
    }catch(error){

        console.error(error);
        return{
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
} 

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/'
  },
    callbacks: {
        async jwt({ token, account, user }) {
            //initial sign in
            if(account && user){
                return{
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, //convert to ms

                }
            }

            //return previous token if not expired
            if(Date.now() < token.accessTokenExpires){
                console.log('EXISTING TOKEN IS VALID');
                return token;
            }

            // Access token has expired, try to update it
            console.log('EXISTING TOKEN EXPIRED. TRYING TO REFRESH TOKEN...');
            return await refreshAccessToken(token);
        },
        async session({session, token}){
            session.user.accesstoken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    },
});
