import {NextComponentType, NextPage, NextPageContext} from "next"
import {AppProps} from "next/app"
import {Moment} from "moment"
import {calendar_v3} from "googleapis";

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

export interface Calendar {
  id: string,
  name?: string
}


export namespace FreeBusyCalendar {
  export interface Error {
    domain: string,
    reason: string
  }

  export interface Busy {
    start: string,
    end: string
  }

  export interface Item {
    id: string,
    busy: Busy[],
    errors?: Error[]
  }
}

export type DateTime = Moment

export interface AvailableCalendarSearchParams {
  calendars: Calendar[]
  date: DateTime
  timeRange: [Moment, Moment]
}

// Aliases for Google Api types
export type GoogleCalendar = calendar_v3.Schema$CalendarListEntry
export type GoogleFeeBusyCalendarResponse = calendar_v3.Schema$FreeBusyResponse