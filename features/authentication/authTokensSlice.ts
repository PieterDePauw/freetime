import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "../store"

interface AuthTokenState {
  token: String
  refreshToken: String
  expireDate: String
}

const initialState: AuthTokenState = {
  token: "",
  refreshToken: "",
  expireDate: "",
}
const authTokensSlice = createSlice({
  name: "authTokens",
  initialState: initialState,
  reducers: {
    authTokensAdded: {
      reducer(state, action: PayloadAction<AuthTokenState>) {
        state = action.payload
      },
      prepare({ token, refreshToken, expireDate }: AuthTokenState) {
        return {
          payload: {
            token,
            refreshToken,
            expireDate,
          },
        }
      },
    },
    authTokensCleared(state, action) {
      state = { token: "", expireDate: "", refreshToken: "" }
    },
  },
})
export const { authTokensAdded, authTokensCleared } = authTokensSlice.actions
export const selectAuthTokens = (state: AppState) => state.authTokens

export default authTokensSlice.reducer
