import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'

const eventConverter : FirestoreDataConverter<Event> = {
    toFirestore: (data: Event) : DocumentData => data,
    fromFirestore: (snap: QueryDocumentSnapshot) : Event => {
      let data = snap.data() as Event
      data.id = snap.id
      return data
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        if (req.query['id']) {
            const id : string = req.query['id'] as string
            const event : Event | undefined = await getEvent(id)
            if (event) {
                res.status(200).json(event)
            } else {
                res.status(404).json({ error: `Resource ${id} not found`})
            }
        } 
        const eventListData : Event[] = await getEvents([])
        res.status(200).json(eventListData)
    } else if (req.method === 'POST') {
        const requestBody : Event = req.body
        const newEvent = await createEvent(requestBody)
        res.status(201).json(newEvent)
    } else if (req.method === 'PUT') {
        const id = req.query['id'] as string
        const event : Event = req.body
        const updatedEvent = await modifyEvent(event, id)
        res.status(200).json(updatedEvent)
    } else if (req.method === 'DELETE') {
        const id = req.query['id'] as string
        await deleteEvent(id)
        res.status(200).json({"message": `Resource id ${id} deleted successfully`})
    } else {
        res.status(405).json({"error": "unsupported"})
    }
  
}

async function getEvents(queryParams: WhereQuery[]) : Promise<Event[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const eventList : Event[] = await firebaseInteractor.getCollectionData('events', eventConverter, queryParams)
    return eventList;
}

async function getEvent(id: string) : Promise<Event | undefined> {
    const firebaseInteractor = new FirebaseInteractor()
    const event : Event | undefined = await firebaseInteractor.getDocumentById("events", id, eventConverter)
    return event
}

async function createEvent(event: Event) : Promise<Event> {
    const firebaseInteractor = new FirebaseInteractor()
    const id = await firebaseInteractor.createDocument("events", event)
    event.id = id
    return event
}

async function modifyEvent(newEvent: Event, id: string) : Promise<Event> {
    const firebaseInteractor = new FirebaseInteractor()
    delete newEvent.id
    const event = await firebaseInteractor.updateDocument("events", newEvent, id)
    event.id = id
    return event
}

async function deleteEvent(id: string) : Promise<void> {
    const firebaseInteractor = new FirebaseInteractor()
    firebaseInteractor.deleteDocument("events", id)
}

