import {NextComponentType, NextPage, NextPageContext} from "next"
import {AppProps} from "next/app"

/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
  authenticationRequired: boolean
}

export type AppAuthProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>
}

export type NextAuthPage = NextPage & AuthEnabledComponentConfig

export interface GoogleCalendar {
  id: string,
  name: string | undefined
}