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
        const eventListData : Event[] = await getEvents([])
        res.status(200).json(eventListData)
    } else if (req.method === 'POST') {
        const requestBody : Object = req.body
        console.log(requestBody)
        const newEvent = await createEvent(requestBody as Event)
        res.status(201).json(newEvent)
    } else {
        res.status(402).json({"error": "unsupported"})
    }
  
}

async function getEvents(queryParams: WhereQuery[]) : Promise<Event[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const eventList : Event[] = await firebaseInteractor.getCollectionData('events', eventConverter, queryParams)
    return eventList;
}

async function createEvent(event: Event) : Promise<Event> {
    const firebaseInteractor = new FirebaseInteractor()
    const newEvent = await firebaseInteractor.createEvent(event)
    return newEvent
}
