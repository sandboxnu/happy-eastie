import type { NextApiRequest, NextApiResponse } from 'next'
import type {Service} from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { WhereQuery } from '../../../firebase/firebaseInteractor'
import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
 
const serviceConverter : FirestoreDataConverter<Service> = {
    toFirestore: (data: Service) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
      let data = snap.data() as Service
      data.id = snap.id
      return data
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[]>
) {
  const incomeLevel = req.query['incomeLevel'] ?? 1000
  const serviceListData = await getServices([{field: "incomeLevel", comparison: "<=", value: incomeLevel},{field: "employed", comparison: "==", value: false}])
  res.status(200).json(serviceListData)
}

async function getServices(queryParams: WhereQuery[]) : Promise<Service[]> {
    const firebaseInteractor = new FirebaseInteractor() 
    const serviceList : Service[] = await firebaseInteractor.getCollectionData('services', serviceConverter, queryParams)
    return serviceList;
}
