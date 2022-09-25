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
  res: NextApiResponse<Resource[]>
) {
  const incomeLevel = req.query['incomeLevel'] ?? 1000
  const resourceListData = await getResources([{field: "incomeLevel", comparison: "<=", value: incomeLevel},{field: "employed", comparison: "==", value: false}])
  res.status(200).json(resourceListData)
}

async function getResources(queryParams: WhereQuery[]) : Promise<Resource[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const resourceList : Resource[] = await firebaseInteractor.getCollectionData('resources', resourceConverter, queryParams)
    return resourceList;
}
