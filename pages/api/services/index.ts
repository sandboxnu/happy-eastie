import type { NextApiRequest, NextApiResponse } from 'next'
import type {Service} from '../../../models/types'
import {getCollectionData, WhereQuery} from '../../../firebase/firebaseInterface'
import { FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase/firestore'
 
const serviceConverter : FirestoreDataConverter<Service> = {
    toFirestore: (data: Service) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Service
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[]>
) {
  const serviceListData = await getServices({field: "incomeLevel", comparison: ">=", value: 0})
  res.status(200).json(serviceListData)
}

async function getServices(queryParams: WhereQuery) : Promise<Service[]> {
    const serviceList : Service[] = await getCollectionData('services', serviceConverter, queryParams)
    return serviceList;
}
