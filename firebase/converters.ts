import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore"
import { Event, Resource } from "../models/types"

export const resourceConverter : FirestoreDataConverter<Resource> = {
    toFirestore: (data: Resource) : DocumentData => data,
    fromFirestore: (snap: QueryDocumentSnapshot) : Resource => {
      let data = snap.data() as Resource
      data.id = snap.id
      return data
    }
}

export const eventConverter : FirestoreDataConverter<Event> = {
  toFirestore: (data: Event) : DocumentData => data,
  fromFirestore: (snap: QueryDocumentSnapshot) : Event => {
    let data = snap.data() as Event
    data.id = snap.id
    return data
  }
}