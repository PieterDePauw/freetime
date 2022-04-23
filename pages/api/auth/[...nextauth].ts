import axios from "axios"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google"
import { URLSearchParams } from "url"


const clientId = process.env.GOOGLE_CLIENT_ID as string
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {
    const url = "https://oauth2.googleapis.com/token?"
    const response = await axios.post(
      url,
      new URLSearchParams({
        client_id:clientId,
        client_secret:clientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      })
    )
    const refreshTokens = await response.data
    return {
      ...token,
      accessToken: refreshTokens.access_token,
      accessTokenExpires: Date.now() + refreshTokens.expires_in * 1000,
      refreshToken: refreshTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId,
      clientSecret,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar openid",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires:
            Date.now() + (account.expires_in as number) * 1000,
          user,
        }
      }

      // Return previous token if the access token has not expire yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken
      return session
    },
  },
})
