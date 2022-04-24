import {calendar_v3, google} from "googleapis"
import axios from "axios";
import {URLSearchParams} from "url";
import Google from "next-auth/providers/google";
import {JWT} from "next-auth/jwt";

const clientId = process.env.GOOGLE_CLIENT_ID as string
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string

const scopes = {
  calendar: "https://www.googleapis.com/auth/calendar",
  openid: "openid"
}

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  process.env.GOOGLE_CLIENT_REDIRECT_URL
)

const makeCalendarClient = (token: JWT):calendar_v3.Calendar => {
    oAuth2Client.setCredentials({
        refresh_token: token.refreshToken as string,
        expiry_date: token.accessTokenExpires as number,
        access_token: token.accessToken as string,
        token_type:"Bearer",
        scope: `${scopes.calendar} ${scopes.openid}`,
        }
    )
    return google.calendar({version:"v3", auth:oAuth2Client})
}

const makeGoogleProvider = () => Google({
        clientId,
        clientSecret,
        authorization: {
            params: {
                scope: `${scopes.calendar} ${scopes.openid}`,
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            },
        },
    })


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

export default  {
    scopes,
    refreshAccessToken,
    makeGoogleProvider,
    makeCalendarClient,
}