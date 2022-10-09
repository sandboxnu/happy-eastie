import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { eventConverter } from '../../../firebase/converters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const id : string = req.query['eventId'] as string
        const event : Event | undefined = await getEvent(id)
        if (event) {
            res.status(200).json(event)
        } else {
            res.status(404).json({ error: `Resource ${id} not found`})
        }
    } else if (req.method === 'PUT') {
        const id = req.query['eventId'] as string
        const event : Event = req.body
        const updatedEvent = await modifyEvent(event, id)
        res.status(200).json(updatedEvent)
    } else if (req.method === 'DELETE') {
        const id = req.query['eventId'] as string
        await deleteEvent(id)
        res.status(200).json({"message": `Resource id ${id} deleted successfully`})
    } else {
        res.status(405).json({"error": "unsupported"})
    }
  
}

async function getEvent(id: string) : Promise<Event | undefined> {
    const firebaseInteractor = new FirebaseInteractor()
    const event : Event | undefined = await firebaseInteractor.getDocumentById("events", id, eventConverter)
    return event
}

async function modifyEvent(newEvent: Event, id: string) : Promise<Event> {
    const firebaseInteractor = new FirebaseInteractor()
    const event = await firebaseInteractor.updateDocument("events", newEvent, id)
    event.id = id
    return event
}

async function deleteEvent(id: string) : Promise<void> {
    const firebaseInteractor = new FirebaseInteractor()
    firebaseInteractor.deleteDocument("events", id)
}

