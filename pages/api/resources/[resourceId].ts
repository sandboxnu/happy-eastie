import type { NextApiRequest, NextApiResponse } from 'next'
import type {Resource} from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
 
const resourceConverter : FirestoreDataConverter<Resource> = {
    toFirestore: (data: Resource) : DocumentData => data,
    fromFirestore: (snap: QueryDocumentSnapshot) : Resource => {
      let data = snap.data() as Resource
      data.id = snap.id
      return data
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!(req.query['resourceId'] && typeof req.query['resourceId'] === "string")) {
    res.status(400).json({error: "Invalid resourceId: must be of type string"})
  }
  const resourceId : string = req.query['resourceId'] as string
  const resource : Resource | undefined = await getResource(resourceId)
  if (resource) {
    res.status(200).json(resource)
  } else {
    res.status(404).json({ error: `Resource ${resourceId} not found`})
  }
}

async function getResource(id: string) : Promise<Resource | undefined> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resource : Resource | undefined = await firebaseInteractor.getDocumentById('resources', id, resourceConverter)
    return resource
}
