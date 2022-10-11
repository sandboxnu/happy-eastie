import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event, EventInfo } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { eventConverter } from '../../../firebase/converters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const eventListData = await getEvents([])
        res.status(200).json({data: eventListData})
    } else if (req.method === 'POST') {
        // TODO: validate body sent in post request
        const requestBody : EventInfo = req.body
        const newEvent = await createEvent(requestBody)
        res.status(201).json({data: newEvent})
    } else {
        res.status(405).json({"error": "unsupported"})
    }
  
}

async function getEvents(queryParams: WhereQuery[]) : Promise<Event[]> {
    return await FirebaseInteractor.getCollectionData('events', eventConverter, queryParams)
}

async function createEvent(event: EventInfo) : Promise<Event> {
    return await FirebaseInteractor.createDocument("events", event, eventConverter)
}
