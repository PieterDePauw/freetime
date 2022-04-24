import NextAuth from "next-auth"
import Google from "../../../helpers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Google.makeGoogleProvider()
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async function ({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token as String,
          refreshToken: account.refresh_token as String,
          accessTokenExpires:
              Date.now() + (account.expires_in as number) * 1000,
          user: user
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Access token has expired, try to update it
      return Google.refreshAccessToken(token)
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken
      return session
    },
  },
})
