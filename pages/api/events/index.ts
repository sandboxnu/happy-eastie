import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { eventConverter } from '../../../firebase/converters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const eventListData : Event[] = await getEvents([])
        res.status(200).json(eventListData)
    } else if (req.method === 'POST') {
        const requestBody : Event = req.body
        const newEvent = await createEvent(requestBody)
        res.status(201).json(newEvent)
    } else {
        res.status(405).json({"error": "unsupported"})
    }
  
}

async function getEvents(queryParams: WhereQuery[]) : Promise<Event[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const eventList : Event[] = await firebaseInteractor.getCollectionData('events', eventConverter, queryParams)
    return eventList;
}

async function createEvent(event: Event) : Promise<Event> {
    const firebaseInteractor = new FirebaseInteractor()
    const eventInfo : [string, Event] = await firebaseInteractor.createDocument("events", event)
    eventInfo[1].id = eventInfo[0]
    return eventInfo[1]
}
