import { google } from "googleapis"

export const Scopes = {
  calendar: "https://www.googleapis.com/auth/calendar",
}
export const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CLIENT_REDIRECT_URL
)
