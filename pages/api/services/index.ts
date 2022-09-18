import type { NextApiRequest, NextApiResponse } from 'next'
import type {Service} from '../../../models/types'
import {getCollectionData} from '../../../firebase/firebaseInterface'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
 
const serviceConverter = {
    toFireStore: (data: Service) => data,
    fromFireStore: (snap: QueryDocumentSnapshot) => snap.data() as Service
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[]>
) {
  const serviceListData = await getCollectionData('services')
  const response : Service[] = serviceListData.map((snapshot : QueryDocumentSnapshot) => {name: snapshot.get('name')})
  res.status(200).json(response)
}

async function getServices() {
    const serviceList : QueryDocumentSnapshot[] = await getCollectionData('services')
    const data : DocumentData[] = await serviceList.map(doc => doc.data());
    return data;
  }
