import type { NextApiRequest, NextApiResponse } from 'next'
import type {Resource} from '../../../models/types'
import mongoDbInteractor from '../../../firebase/mongoDbInteractor'
import { WithId } from 'mongodb'

export type ResourceResponse = {
  data?: WithId<Resource>
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

async function getResource(id: string) : Promise<WithId<Resource> | null> {
    return await mongoDbInteractor.getDocument<Resource>('resources', id);
}
