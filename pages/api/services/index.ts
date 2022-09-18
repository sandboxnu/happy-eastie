import type { NextApiRequest, NextApiResponse } from 'next'
import type {Service} from '../../../models/types'
import {getCollectionData} from '../../../firebase/firebaseInterface'
import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
 
const serviceConverter : FirestoreDataConverter<Service> = {
    toFirestore: (data: Service) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Service
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[]>
) {
  const serviceListData = await getServices()
  res.status(200).json(serviceListData)
}

async function getServices() : Promise<Service[]> {
    const serviceList : Service[] = await getCollectionData('services', serviceConverter)
    return serviceList;
}
