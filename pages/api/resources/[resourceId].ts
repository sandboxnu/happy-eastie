import type { NextApiRequest, NextApiResponse } from 'next'
import type {Resource} from '../../../models/types'
import FirebaseInteractor from '../../../firebase/firebaseInteractor'
import { resourceConverter } from '../../../firebase/converters'
import MongoDbInteractor from '../../../firebase/mongoDbInteractor'

export type ResourceResponse = {
  data?: Resource
  error?: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResourceResponse>
) {
  const id = req.query['resourceId']
  if (!id || Array.isArray(id)) {
    return res.status(401).json({"error": `Invalid value for required string query param eventId: received ${id}`})
  } 
  const resource = await getResource(id)
  return resource ? res.status(200).json({data: resource}) : res.status(404).json({ error: `Resource ${id} not found`})
}

async function getResource(id: string) : Promise<Resource | null> {
    const db = new MongoDbInteractor();
    return await db.getDocument<Resource>('resources', id);
}
