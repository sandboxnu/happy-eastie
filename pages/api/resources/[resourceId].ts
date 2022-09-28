import type { NextApiRequest, NextApiResponse } from 'next'
import type {Resource} from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
 
const resourceConverter : FirestoreDataConverter<Resource> = {
    toFirestore: (data: Resource) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      let data = snap.data() as Resource
      data.id = snap.id
      return data
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const resourceId = req.query['resourceId'] ?? 'danishes-danishes'
  const resource = await getResource(resourceId as string)
  if (resource) {
    res.status(200).json(resource)
  } else {
    res.status(404).json({ error: 'resource not found' })
  }
}

async function getResource(id: string) : Promise<Resource | undefined> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resource : Resource | undefined = await firebaseInteractor.getDocumentById('resources', id, resourceConverter)
    return resource
}