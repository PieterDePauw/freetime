import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from "next-auth/jwt";
import Google from "../../../helpers/google"

const listHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({req})
    if (!token) return res.status(401).end()
    const client = Google.makeCalendarClient(token)
    const response = await client.calendarList.list()
    res.status(200).json(response.data.items)
  } else {
    res.status(405).end()
  }
}

export default listHandler