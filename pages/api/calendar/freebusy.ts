import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import Google from "../../../helpers/google";
import {AvailableCalendarSearchParams} from "../../../app/types";
import moment from "moment-timezone";

const freeBusyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = await getToken({req})
    if (!token) return res.status(401).end()
    const {date, timeRange: [start, end], calendars} = req.body as AvailableCalendarSearchParams
    const client = Google.makeCalendarClient(token)
    const startTime = moment(start)
    const endTime = moment(end)
    const datetime = moment(date)
    const timeMin = datetime.hour(startTime.hours()).minute(startTime.minutes()).toISOString()
    const timeMax = datetime.hour(endTime.hours()).minute(endTime.minutes()).toISOString()
    const response = await client.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: calendars.map(c => ({id: c.id})),
      }
    })
    res.status(200).json(response.data)
  } else {
    res.status(405).end()
  }
}

export default freeBusyHandler